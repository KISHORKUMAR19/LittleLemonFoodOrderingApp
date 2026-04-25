import React from 'react';
import { View, Image, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ProfileStyles from '../../Styles/ProfileStyles';

type AvatarPickerProps = {
  currentAvatar?: string;
  onChange: (newAvatar: string) => Promise<void>;
  onRemove: () => Promise<void>;
};

const AvatarPicker: React.FC<AvatarPickerProps> = ({ 
  currentAvatar, 
  onChange, 
  onRemove 
}) => {
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      return;
    }

    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        base64: true,
      });

      if (!pickerResult.canceled && pickerResult.assets?.length) {
        const base64 = pickerResult.assets[0].base64;
        if (!base64) return;
        
        const imageUri = `data:image/jpeg;base64,${base64}`;
        await onChange(imageUri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  return (
    <View style={ProfileStyles.profileSection}>
      <Image 
        source={
          currentAvatar 
            ? { uri: currentAvatar } 
            : require('../../assets/images/Profile.png')
        }
        style={ProfileStyles.profileImage} 
      />
      
      <View style={ProfileStyles.imageActions}>
        <Pressable 
          style={({ pressed }) => [
            ProfileStyles.imageButton,
            { backgroundColor: pressed ? '#F4CE14' : '#495E57' }
          ]}
          onPress={pickImage}
        >
          <Text style={ProfileStyles.buttonText}>Change</Text>
        </Pressable>
        
        <Pressable 
          style={({ pressed }) => [
            ProfileStyles.imageButton,
            { backgroundColor: pressed ? '#FF6B6B' : '#EE9972' }
          ]}
          onPress={onRemove}
        >
          <Text style={ProfileStyles.buttonText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AvatarPicker;