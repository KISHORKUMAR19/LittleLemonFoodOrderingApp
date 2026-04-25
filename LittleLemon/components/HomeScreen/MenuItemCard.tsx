import React, { use } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import HomeStyles from '../../Styles/HomeStyles';
import { useNavigation } from '@react-navigation/native'; // Add this import



// Local image mapping
const LOCAL_IMAGES: Record<string, any> = {
  "Greek Salad": require('/home/giwrgosp/Desktop/LittleLemonGo/assets/images/Greek salad.png'),
  "Bruschetta": require('/home/giwrgosp/Desktop/LittleLemonGo/assets/images/Bruschetta.jpg'),
  "Grilled Fish": require('/home/giwrgosp/Desktop/LittleLemonGo/assets/images/Grilled fish.png'),
  "Pasta": require('/home/giwrgosp/Desktop/LittleLemonGo/assets/images/Pasta.png'),
  "Lemon Dessert": require('/home/giwrgosp/Desktop/LittleLemonGo/assets/images/Lemon dessert.png'),
};

export const MenuItemCard = ({ item }: { item: any }) => {
  // Access navigation object from hook
  const navigation = useNavigation();
  
  const imageSource = LOCAL_IMAGES[item.title] || 
    require('/home/giwrgosp/Desktop/LittleLemonGo/assets/images/Pasta.png');
  
  return (
    <Pressable 
      style={HomeStyles.menuItem}
      onPress={() => navigation.navigate('MenuItemDetails', { menuItem: item })}
    >
      <View style={HomeStyles.menuTextContainer}>
        <Text style={HomeStyles.menuItemTitle}>{item.title}</Text>
        <Text style={HomeStyles.menuItemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={HomeStyles.menuItemPrice}>${item.price}</Text>
      </View>
      <Image
        source={imageSource}
        style={HomeStyles.menuItemImage}
      />
    </Pressable>
  );
};

export const MemoizedMenuItem = React.memo(MenuItemCard);

export default{
  MemoizedMenuItem,
  MenuItemCard}