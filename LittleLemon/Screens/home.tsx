import { 
  View, 
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  FlatList,
  TextInput,
  RefreshControl
} from "react-native";
import HomeStyles from "../Styles/HomeStyles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types/navigation";
import { useAuth } from "../context/AuthContext";
import { useFocusEffect } from '@react-navigation/native';
import { filterMenuItemsByCategory, saveMenuItems, createTable } from "../database";
import { MenuItemDisplay } from "../types";
import { fetch } from 'expo/fetch';
import CategoryFilter from "../components/HomeScreen/CategoryFilter";
import { MemoizedMenuItem } from "../components/HomeScreen/MenuItemCard";
import { getCurrentUser } from "../utils/auth";
import { UserData } from "../types";




type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
   
  
  // State & Refs
  const { isAuthenticated } = useAuth();
  const [User, setUser] = useState<UserData|null>(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemDisplay[]>([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  
  const isMounted = useRef(true);
  const activeCategoriesRef = useRef<string[]>([]);
  const searchTextRef = useRef('');
  
 
  // Load Function 
  const loadUserData = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      if (isMounted.current) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);
   // handles theInitial load on mount
  useEffect(() => {
    isMounted.current = true;
    loadUserData();
    return () => {
      isMounted.current = false;
    };
  }, [loadUserData]);

  // Reload user data when screen focuses
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [loadUserData])
  );


  // Update refs when state changes
  useEffect(() => {
    activeCategoriesRef.current = activeCategories;
    searchTextRef.current = searchText;
  }, [activeCategories, searchText]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  
  // Data Fetching Functions
 
  const fetchMenuData = useCallback(async () => {
    try {
      setRefreshing(true);
      await createTable();
      
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json',
      );
      
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      const menuItems = data.menu.map((item: any) => ({
        title: item.name,
        price: item.price,
        description: item.description, 
        image: item.image,
        category: item.category
      }));
      
      await saveMenuItems(menuItems);
      return menuItems;
    } catch (error) {
      console.error('Error fetching menu data:', error);
      return [];
    } finally {
      if (isMounted.current) setRefreshing(false);
    }
  }, []);

  
  // Menu Loading Functions
  
  const loadMenuItems = useCallback(async () => {
    try {
      const filteredItems = await filterMenuItemsByCategory(
        searchTextRef.current, 
        activeCategoriesRef.current
      );
      
      if (isMounted.current) {
        const uniqueItems = filteredItems.map((item, index) => ({
          ...item,
          key: `${item.title}-${index}`,
        }));
        setMenuItems(uniqueItems);
      }
    } catch (error) {
      console.error('Error loading menu items:', error);
    } finally {
      if (isMounted.current) {
        setLoadingMenu(false);
        setIsFiltering(false);
      }
    }
  }, []);

  
  // Initial Data Loading
  useEffect(() => {
    let isActive = true;
    const init = async () => {     
      await fetchMenuData();
      if (isActive) {
        await loadMenuItems();
      }
    };
    
    init();
    
    return () => {
      isActive = false;
    };
  }, []);

  
  // Debounced Search & Filtering
  useEffect(() => {
    let isActive = true;
    setIsFiltering(true);
    const timer = setTimeout(() => {
      if (isActive) {
        loadMenuItems();       
      }
    }, 300); // 300ms debounce time
    
    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [searchText, activeCategories]);

  
  // Refresh Handler
  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchMenuData();
      await loadMenuItems();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      if (isMounted.current) {
        setRefreshing(false);
      }
    }
  }, [fetchMenuData, loadMenuItems ]);

  
  // Category Toggle
  const toggleCategory = (category: string) => {
    setActiveCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
 // Authentication Check
  useFocusEffect(
    useCallback(() => {
      const checkAuth = async () => {
        if (!isAuthenticated) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          });
        } else {
          setLoading(false);
        }
      };

      checkAuth();
    }, [isAuthenticated, navigation])
  );

 // Render Components
  if (loading) {
    return (
      <View style={HomeStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#495E57" />
      </View>
    );
  }

  

  return (
    <View style={HomeStyles.container}>
      {/* Top Navigation Bar */}
      <View style={HomeStyles.navbar}>
        <View style={HomeStyles.logoContainer}>
          <Image 
            source={require('../assets/branding/Logo.png')} 
            style={HomeStyles.logo}
          />
        </View>
        <Pressable 
          style={HomeStyles.profileContainer}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image  
          source={
            User?.avatar
              ? { uri:User.avatar } 
              : require('../assets/images/Profile.png') 
          }
            style={HomeStyles.profileImage} 
          />
        </Pressable>
      </View>

      {/* Hero Section */}
      <View style={HomeStyles.heroSection}>
        <View style={HomeStyles.heroContent}>
          <View style={HomeStyles.heroTextContainer}>
            <Text 
              style={HomeStyles.heroTitle} 
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              Little Lemon
            </Text>
            <Text 
              style={HomeStyles.heroSubtitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              Chicago
            </Text>
            <Text style={HomeStyles.heroDescription}>
              We are a family owned Mediterranean restaurant,{'\n'}focused on traditional{'\n'} 
              recipes served with a {'\n'}modern twist.
            </Text>
          </View>
          <View style={HomeStyles.heroImageContainer}>
            <Image 
              source={require('../assets/images/Hero image.png')} 
              style={HomeStyles.heroImage} 
            />
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={HomeStyles.searchContainer}>
          <TextInput
            style={HomeStyles.searchInput}
            placeholder="Search menu..."
            placeholderTextColor="#6E6E6E"
            value={searchText}
            onChangeText={setSearchText}
          />
          <MaterialIcons name="search" size={28} color="#495E57" /> 
        </View>
      </View>

      {/* Main Content */}
      <View style={HomeStyles.contentContainer}>
        {/* Order Title */}
        <Text style={HomeStyles.orderTitle}>ORDER FOR DELIVERY!</Text>
        
        {/* Category Filter component */}
        <CategoryFilter
          activeCategories={activeCategories}
          toggleCategory={toggleCategory}
        />

       {/* Menu Items flat List with refresh control */}
        
        {isFiltering ? (
          <ActivityIndicator size="small" color="#495E57" style={HomeStyles.filterLoader} />
        ) : null}
        
        {loadingMenu ? (
          <ActivityIndicator size="large" color="#495E57" style={HomeStyles.menuLoader} />
        ) : (
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.key || item.title}
            renderItem={({ item }) => <MemoizedMenuItem item={item} />}
            contentContainerStyle={HomeStyles.menuList}
            style={HomeStyles.menuContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#495E57']}
                tintColor="#495E57"
              />
            }
          />       
        )}
      </View>
    </View>
  );
};
    
export default HomeScreen;