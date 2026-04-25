import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Switch,
  Animated, 
  Alert } from 'react-native';
import ProfileStyles from '../Styles/ProfileStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getCurrentUser, updateUser, deleteAccount, } from '../utils/auth';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AvatarPicker from '../components/ProfileScreen/AvatarPicker';
import useFeedback from '../hooks/ProfileScreen/useFeedback';
import { UserData } from '../types';



type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;



// Define the NotificationPreferences type
type NotificationPreferences = {
  orderStatuses: boolean;
  passwordChanges: boolean;
  specialOffers: boolean;
  newsLetter: boolean;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { logout: contextLogout } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsLetter: true
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //Feedback hook
  const { feedbackMessage, fadeAnim, showFeedback } = useFeedback();
  

   const loadData = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUserData(currentUser);
      }
      
      const storedPrefs = await AsyncStorage.getItem('notificationPreferences');
      if (storedPrefs) {
        setPreferences(JSON.parse(storedPrefs));
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      showFeedback('Failed to load profile data');
    }
  }, [showFeedback]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  // Handle update of user profile
  const handleUpdate = async () => {
  if (!userData) return;
  
  // Validation
  if (!userData.firstName || !userData.lastName || !userData.email) {
    showFeedback('Please fill all required fields');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    showFeedback('Please enter a valid email');
    return;
  }
  
  try {
    // Prepare data without password if empty
    const updateData: Partial<UserData> = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      avatar: userData.avatar
    };
    
    // Only include password if it's set
    if (userData.password) {
      updateData.password = userData.password;
    }

    const success = await updateUser(updateData);
    if (success) {
      showFeedback('Profile updated successfully');
      setIsEditing(false);
    } else {
      showFeedback('Failed to update profile');
    }
  } catch (error) {
    console.error('Update error:', error);
    showFeedback('Error updating profile');
  }
};

  // Save notification preferences
  const savePreferences = useCallback(async (newPreferences: NotificationPreferences) => {
    try {
      await AsyncStorage.setItem('notificationPreferences', JSON.stringify(newPreferences));
      setPreferences(newPreferences);
      showFeedback('Preferences saved');
    } catch (error) {
      console.error('Failed to save preferences:', error);
      showFeedback('Failed to save preferences');
    }
  }, [showFeedback]);

  

  // Handle preference changes
  const handlePreferenceChange = useCallback((preference: keyof NotificationPreferences, value: boolean) => {
    const newPreferences = { ...preferences, [preference]: value };
    savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  // Handle account deletion
  const handleDeleteAccount = useCallback(() => {
    if (!userData) return;
    
    Alert.alert(
      'Delete Account',
      'Are you sure? This will permanently remove your account.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await deleteAccount(userData.email);
              if (success) {
                await contextLogout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Welcome' }],
                });
              } else {
                showFeedback('Failed to delete account');
              }
            } catch (error) {
              console.error('Delete error:', error);
              showFeedback('Error deleting account');
            }
          }
        },
      ]
    );
  }, [userData, contextLogout, navigation, showFeedback]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      await contextLogout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (e) {
      console.error('Logout error:', e);
    }
  }, [contextLogout, navigation]);

  if (!userData) {
    return (
      <SafeAreaView style={ProfileStyles.safeArea}>
        <View style={ProfileStyles.loadingContainer}>
          <Text style={ProfileStyles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={ProfileStyles.safeArea}>
      <View style={ProfileStyles.navbar}>
        <Pressable onPress={() => navigation.goBack()} style={ProfileStyles.navButton}>
          <AntDesign name="leftcircle" size={32} color="#495E57" />
        </Pressable> 
        <Image 
          source={require('../assets/branding/Logo.png')} 
          style={ProfileStyles.logo} 
        />       
      </View>

      <ScrollView 
        style={ProfileStyles.scrollContainer}
        contentContainerStyle={ProfileStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={ProfileStyles.card}>
          <Text style={ProfileStyles.cardHeader}>Personal Information</Text>

            {/* AvatarPicker component */}
          <AvatarPicker
            currentAvatar={userData.avatar}
            onChange={async (newAvatar) => {
              setUserData(prev => prev ? { ...prev, avatar: newAvatar } : null);
              await updateUser({ avatar: newAvatar });
              showFeedback('Avatar updated!');
            }}
            onRemove={async () => {
              setUserData(prev => prev ? { ...prev, avatar: undefined } : null);
              await updateUser({ avatar: undefined });
              showFeedback('Avatar removed');
            }}
          />        
          
          {/* Form section */}
          <View style={ProfileStyles.form}>
            <View style={ProfileStyles.inputGroup}>
              <Text style={ProfileStyles.inputLabel}>First Name *</Text>
              <TextInput
                style={[
                  ProfileStyles.input,
                  isEditing ? ProfileStyles.editingInput : ProfileStyles.staticInput
                ]}
                value={userData.firstName}
                onChangeText={(text) => setUserData({...userData,firstName: text})}
                editable={isEditing}
                placeholder="Enter first name"
              />
            </View>

            <View style={ProfileStyles.inputGroup}>
              <Text style={ProfileStyles.inputLabel}>Last Name *</Text>
              <TextInput
                style={[
                  ProfileStyles.input,
                  isEditing ? ProfileStyles.editingInput : ProfileStyles.staticInput
                ]}
                value={userData.lastName}
                onChangeText={(text) => setUserData({...userData, lastName: text})}
                editable={isEditing}
                placeholder="Enter last name"
              />
            </View>

            <View style={ProfileStyles.inputGroup}>
              <Text style={ProfileStyles.inputLabel}>Email *</Text>
              <TextInput
                style={[
                  ProfileStyles.input,
                  ProfileStyles.disabledInput
                ]}
                value={userData.email}
                editable={false}
              />
            </View>

            <View style={ProfileStyles.inputGroup}>
              <Text style={ProfileStyles.inputLabel}>Phone Number</Text>
              <TextInput
                style={[
                  ProfileStyles.input,
                  isEditing ? ProfileStyles.editingInput : ProfileStyles.staticInput
                ]}
                value={userData.phone || ''}
                onChangeText={(text) => setUserData({...userData, phone: text})}
                keyboardType="phone-pad"
                editable={isEditing}
                placeholder="Enter phone number"
              />
            </View>

            {isEditing && (
              <View style={ProfileStyles.inputGroup}>
                <Text style={ProfileStyles.inputLabel}>Change Password</Text>
                <View style={ProfileStyles.passwordContainer}>
                  <TextInput
                    style={[
                      ProfileStyles.input,
                      ProfileStyles.passwordInput,
                      isEditing ? ProfileStyles.editingInput : ProfileStyles.staticInput
                    ]}
                    value={userData.password}
                    onChangeText={(text) => setUserData({...userData, password: text})}
                    secureTextEntry={!showPassword}
                    editable={isEditing}
                    placeholder="Enter new password"
                  />
                  <Pressable
                    style={ProfileStyles.toggleButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={ProfileStyles.toggleText}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </Pressable>
                </View>
                <Text style={ProfileStyles.passwordHint}>
                  {userData.password ? 'Password will be updated' : 'Leave blank to keep current password'}
                </Text>
              </View>
            )}

            <View style={ProfileStyles.buttonGroup}>
              <Pressable
                style={({ pressed }) => [
                  ProfileStyles.editButton,
                  { 
                    backgroundColor: pressed ? '#F4CE14' : isEditing ? '#495E57' : '#EDEFEE',
                    marginRight: 10
                  }
                ]}
                onPress={() => isEditing ? handleUpdate() : setIsEditing(true)}
              >
                <Text style={[ProfileStyles.buttonText, isEditing ? {color: 'white'} : {color: '#333'}]}>
                  {isEditing ? 'Save Changes' : 'Edit Information'}
                </Text>
              </Pressable>
              
              {isEditing && (
                <Pressable
                  style={({ pressed }) => [
                    ProfileStyles.editButton,
                    { backgroundColor: pressed ? '#FF6B6B' : '#EE9972' }
                  ]}
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={ProfileStyles.buttonText}>Cancel</Text>
                </Pressable>
              )}
            </View>
            
            <Animated.Text style={[ProfileStyles.feedbackText, { opacity: fadeAnim }]}>
            {feedbackMessage}
            </Animated.Text>

          </View>
        </View>

        <View style={ProfileStyles.notificationSection}>
          <Text style={ProfileStyles.sectionHeader}>Email notifications</Text>
          
          <View style={ProfileStyles.preferenceRow}>
            <Text style={ProfileStyles.preferenceLabel}>Order statuses</Text>
            <Switch
              value={preferences.orderStatuses}
              onValueChange={(value) => handlePreferenceChange('orderStatuses', value)}
              trackColor={{ false: '#767577', true: '#495E57' }}
              thumbColor={preferences.orderStatuses ? '#F4CE14' : '#f4f3f4'}
            />
          </View>
          
          <View style={ProfileStyles.preferenceRow}>
            <Text style={ProfileStyles.preferenceLabel}>Password changes</Text>
            <Switch
              value={preferences.passwordChanges}
              onValueChange={(value) => handlePreferenceChange('passwordChanges', value)}
              trackColor={{ false: '#767577', true: '#495E57' }}
              thumbColor={preferences.passwordChanges ? '#F4CE14' : '#f4f3f4'}
            />
          </View>
          
          <View style={ProfileStyles.preferenceRow}>
            <Text style={ProfileStyles.preferenceLabel}>Special offers</Text>
            <Switch
              value={preferences.specialOffers}
              onValueChange={(value) => handlePreferenceChange('specialOffers', value)}
              trackColor={{ false: '#767577', true: '#495E57' }}
              thumbColor={preferences.specialOffers ? '#F4CE14' : '#f4f3f4'}
            />
          </View>
          
          <View style={ProfileStyles.preferenceRow}>
            <Text style={ProfileStyles.preferenceLabel}>Newsletter</Text>
            <Switch
              value={preferences.newsLetter}
              onValueChange={(value) => handlePreferenceChange('newsLetter', value)}
              trackColor={{ false: '#767577', true: '#495E57' }}
              thumbColor={preferences.newsLetter ? '#F4CE14' : '#f4f3f4'}
            />
          </View>
          
          <Animated.Text style={[ProfileStyles.feedbackText, { opacity: fadeAnim }]}>
            {feedbackMessage}
          </Animated.Text>
        </View>
        
        <Pressable
          style={({ pressed }) => [
            ProfileStyles.logoutButton,
            { backgroundColor: pressed ? '#FF6B6B' : '#EE9972' }
          ]}
          onPress={handleLogout}
        >
          <Text style={ProfileStyles.buttonText}>Logout</Text>
        </Pressable>
        
        <Pressable
          style={({ pressed }) => [
            ProfileStyles.deleteButton,
            { backgroundColor: pressed ? '#B00020' : '#FF5252' }
          ]}
          onPress={handleDeleteAccount}
        >
          <Text style={ProfileStyles.buttonText}>Delete Account</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};



export default ProfileScreen;