import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import MenuItemsDetailsStyles from '../Styles/MenuItemDetailsStyles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Pressable } from 'react-native-gesture-handler';

type MenuItemDetailsProps = NativeStackScreenProps<RootStackParamList, 'MenuItemDetails'>;

const MenuItemDetailsScreen: React.FC<MenuItemDetailsProps> = ({  route, navigation}) => {
  const { menuItem} = route.params;

  const getImageSource = () => {
    switch(menuItem.image) {
      case 'greekSalad.jpg':
        return require('../assets/images/Greek salad.png');
      case 'bruschetta.jpg':
        return require('../assets/images/Bruschetta.jpg');
      case 'grilledFish.jpg':
        return require('../assets/images/Grilled fish.png');
      case 'pasta.jpg':
        return require('../assets/images/Pasta.png');
      case 'lemonDessert.jpg':
        return require('../assets/images/Lemon dessert.png');
      default:
        return require('../assets/images/Pasta.png');
    }
  };

  return (
    <ScrollView style={MenuItemsDetailsStyles.container}>
      <View style={MenuItemsDetailsStyles.imageContainer}>
        <Pressable onPress={() => navigation.goBack()} style={MenuItemsDetailsStyles.navButton}>
          <AntDesign name="leftcircle" size={40} color="#495E57" />
        </Pressable>
      <Image 
        source={getImageSource()}
        style={MenuItemsDetailsStyles.image}       
      />
      </View>
      
      <View style={MenuItemsDetailsStyles.content}>
        <View style={MenuItemsDetailsStyles.header}>
          <Text style={MenuItemsDetailsStyles.title}>{menuItem.title}</Text>
          <Text style={MenuItemsDetailsStyles.price}>${menuItem.price}</Text>
        </View>
        
        <View style={MenuItemsDetailsStyles.categoryContainer}>
          <Text style={MenuItemsDetailsStyles.category}>{menuItem.category}</Text>
        </View>
        
        <Text style={MenuItemsDetailsStyles.description}>{menuItem.description}</Text>
      </View>
    </ScrollView>
  );
};


export default MenuItemDetailsScreen;