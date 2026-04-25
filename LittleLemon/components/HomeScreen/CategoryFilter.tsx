import React from 'react';
import { View, ScrollView, Pressable, Text } from 'react-native';
import HomeStyles from '../../Styles/HomeStyles';

const categories = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Specials'];

export const CategoryFilter = ({ 
  activeCategories, 
  toggleCategory 
}: { 
  activeCategories: string[]; 
  toggleCategory: (category: string) => void 
}) => (
  <View style={HomeStyles.categoryWraper}>
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={HomeStyles.categoriesContainer}
    >
      {categories.map(category => (
        <Pressable
          key={category}
          style={[
            HomeStyles.categoryButton,
            activeCategories.includes(category) && HomeStyles.activeCategory
          ]}
          onPress={() => toggleCategory(category)}
        >
          <Text style={[
            HomeStyles.categoryText,
            activeCategories.includes(category) && HomeStyles.activeCategoryText
          ]}>
            {category}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  </View>
);

export default CategoryFilter;