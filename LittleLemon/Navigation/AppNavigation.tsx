
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../Screens/welcome';
import homeScreen from '../Screens/home';
import OnboardingScreen from '../Screens/onboarding';
import LoginScreen from '../Screens/login';
import ProfileScreen from '../Screens/profile';
import { useAuth } from '../context/AuthContext'; // Add this
import { RootStackParamList } from '../types/navigation';
import MenuItemDetailsScreen from '../Screens/menuItemDetail';
import { FONTS } from '../utils/fonts';

const stack = createStackNavigator<RootStackParamList>();


export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth(); // Use context

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#495E57" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <stack.Navigator 
        screenOptions={{headerShown: false}}
        initialRouteName={isAuthenticated? 'Home' : 'Welcome'}
        
      >
        <stack.Screen name='Welcome' component={WelcomeScreen}/>
        <stack.Screen name='Onboarding' component={OnboardingScreen}/>
        <stack.Screen name='Login' component={LoginScreen}/>
        <stack.Screen name='Home' component={homeScreen}/>
        <stack.Screen name='Profile' component={ProfileScreen}/>
        <stack.Screen 
        name='MenuItemDetails'
        component={MenuItemDetailsScreen}
        options={({ route }) => ({ 
          title: route.params.menuItem.title,
          headerStyle: {
            backgroundColor: '#495E57',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontFamily: FONTS.karlaBold,
            fontSize: 20,
          },
        })}
      />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEFEE',
  },
});