import React, { useEffect, useRef, useState} from "react";
import { 
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform, 
  ActivityIndicator,
  Modal} from "react-native";
import {Formik} from 'formik'; 
import * as yup from 'yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParamList } from "../types/navigation";
import { completeOnboarding } from "../utils/auth";
import Onboardingstyles from "../Styles/OnboardingStyles";

type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const  OnboardingScreen : React.FC<OnboardingScreenProps> = ({navigation}) =>{
  
  const [showPassword, setShowPassword] = useState(false);
  const [loginHover, setLoginHover]= useState(false);

  // field for error animations
  const [formErrorAnim] = useState( new Animated.Value(0)); 
  const [fieldErrorAnim] = useState(new Animated.Value(0)); 

   // Toast notification
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false); // NEW: Simple show/hide state
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);

  // Cleanup function
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
 // Create animated error style
  const formErrorStyle = {
    opacity: formErrorAnim,
    transform: [{
      translateX: formErrorAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-10, 5, 0]
      })
    }]
  };
// Create animated error style
  const fieldErrorStyle ={
    opacity:fieldErrorAnim
  };

// Animation for filed level errors
 useEffect(() => {
    Animated.timing(fieldErrorAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fieldErrorAnim]);

  // Animation for form-level errors
   const animatedFormError = ()=> {
    Animated.sequence([
      Animated.timing(formErrorAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(formErrorAnim, { toValue: 0, duration: 300, useNativeDriver: true, delay: 2000 })
    ]).start();
  } 
  // Show toast function
 const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    
    timeoutRef.current = setTimeout(() => {
      if (isMounted.current) {
        setShowToast(false);
      }
    }, 4000);
  };

   // validation with schema 
  const signupSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phone: yup.string()
      .matches(/^[0-9\s-]{10,15}$/, 'Invalid phone number (10-15 digits)')
      .nullable(),
  });
 
  return(
     <SafeAreaView style={Onboardingstyles.container}>      
        {/* Toast Modal */}
        <Modal
        visible={showToast}
        transparent
        animationType="fade"
        onRequestClose={() => setShowToast(false)}
      >
        <View style={Onboardingstyles.toastContainer}>
          <View style={Onboardingstyles.toast}>
            <Text style={Onboardingstyles.toastText}>{toastMessage}</Text>
            <TouchableOpacity 
              onPress={() => setShowToast(false)}
              style={Onboardingstyles.closeButton}
              accessibilityLabel="Close Toast"
            >
              <Text style={Onboardingstyles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      

      {/*Navbar */}
      <View style={Onboardingstyles.navbar}>
        <Image source={require('../assets/branding/Logo.png')} style={Onboardingstyles.logo}/>
      </View>
      
      {/* Hero Section with Search Bar */}
            <View style={Onboardingstyles.heroSection}>
              <View style={Onboardingstyles.heroContent}>
                <View style={Onboardingstyles.heroTextContainer}>
      
                  <Text 
                  style={Onboardingstyles.heroTitle} 
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  >
                    Little Lemon
                  </Text>
      
                  <Text 
                  style={Onboardingstyles.heroSubtitle}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  >
                   Chicago
                  </Text>
                  
                  <Text style={Onboardingstyles.heroDescription} >
                    Sign Up for seasonal
                    {'\n'}
                    menu reveals, and special
                    {'\n'}
                    events, Chicago's rustic 
                    {'\n'}
                    Mediterranean escape
                    {'\n'}
                    awaits.
                  </Text>
                </View>
                <View style={Onboardingstyles.heroImageContainer}>
                <Image 
                  source={require('../assets/images/Hero image.png')} 
                  style={Onboardingstyles.heroImage} 
                />
                </View>
              </View>
            </View>
      
      {/*Signup Form Scrollable */}
     <KeyboardAvoidingView
        behavior={Platform.OS==='ios'? "padding": "height"}
        style={Onboardingstyles.keyboardAvoid}
        >
          <ScrollView
          contentContainerStyle={Onboardingstyles.scrollContainer}
          keyboardShouldPersistTaps='handled'
          >
            {/*Signup Form Card */}
            <View style={Onboardingstyles.formCard}>
              <Formik
                  initialValues={{ 
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    phone: ''}}

                  validationSchema={signupSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {                       
                      // Clear any existing toast
                      setShowToast(false);
                      if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                      }

                      // Clean phone number (remove non-digit characters)
                      const cleanedValues = {
                        ...values,
                        phone: values.phone ? values.phone.replace(/\D/g, '') : undefined
                      };
                      await completeOnboarding(cleanedValues);

                      //show success Toast
                      displayToast('Account created successfully! Redirecting...');

                     // Navigate after delay
                      timeoutRef.current = setTimeout(() => {
                        navigation.reset({
                          index: 0,
                          routes: [{ name:'Home'}],
                        });
                      }, 2000);
                    } catch (e: any) {
                      console.error('Onboarding error:', e);
                  
                    let message = 'Failed to create account. Please try again.';
                    // Handle error cases
                  if (e.message) {
                    const errorMessage = e.message.toLowerCase();
                    
                    if (errorMessage.includes('email already registered') || 
                        errorMessage.includes('email already exists')) {
                      message = 'This email is already registered. Please login instead.';
                    } else if (errorMessage.includes('password')) {
                      message = 'Password requirements not met. Must be at least 6 characters.';
                    } else if (errorMessage.includes('email') || 
                               errorMessage.includes('invalid email')) {
                      message = 'Invalid email format. Please enter a valid email.';
                    } else if (errorMessage.includes('network') || 
                               errorMessage.includes('request') || 
                               errorMessage.includes('connection')) {
                      message = 'Network error. Please check your internet connection.';
                    }
                  }
                  
                  displayToast(message);
                } finally {
                  setSubmitting(false);
                }
              }}
            >                 
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, isValid }) => (
                    <View style={Onboardingstyles.form}>
                      <View style={Onboardingstyles.inputGroup}>
                        <TextInput
                          style={Onboardingstyles.input}
                          placeholder="First Name*"
                          onChangeText={handleChange('firstName')}
                          onBlur={handleBlur('firstName')}
                          value={values.firstName}
                        />
                        {touched.firstName && errors.firstName && (
                          <Animated.Text style={[Onboardingstyles.error, fieldErrorStyle]}>
                            {errors.firstName}
                          </Animated.Text>
                        )}
                      </View>

                      <View style={Onboardingstyles.inputGroup}>
                        <TextInput
                          style={Onboardingstyles.input}
                          placeholder="Last Name*"
                          onChangeText={handleChange('lastName')}
                          onBlur={handleBlur('lastName')}
                          value={values.lastName}
                        />
                        {touched.lastName && errors.lastName && (
                          <Animated.Text style={[Onboardingstyles.error, fieldErrorStyle]}>
                            {errors.lastName}
                          </Animated.Text>
                        )}
                      </View>
                      
                      <View style={Onboardingstyles.inputGroup}>
                        <TextInput
                          style={Onboardingstyles.input}
                          placeholder="Email*"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                        />
                        {touched.email && errors.email && (
                          <Animated.Text style={[Onboardingstyles.error, fieldErrorStyle]}>
                            {errors.email}
                          </Animated.Text>
                        )}
                      </View>

                      <View style={Onboardingstyles.inputGroup}>
                        <TextInput
                          style={Onboardingstyles.input}
                          placeholder="Password*"
                          secureTextEntry ={!showPassword}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                        />
                        <TouchableOpacity
                          style={Onboardingstyles.passwordToggle}
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          <Text style={Onboardingstyles.toggleText}>
                            {showPassword ? 'Hide' : 'Show'}
                          </Text>
                        </TouchableOpacity>
                        {touched.password && errors.password && (
                          <Animated.Text style={[Onboardingstyles.error, fieldErrorStyle]}>
                            {errors.password}
                          </Animated.Text>
                        )}
                      </View>

                    <View style={Onboardingstyles.inputGroup}>
                        <TextInput
                          style={Onboardingstyles.input}
                          placeholder="Phone (optional)"
                          keyboardType="phone-pad"
                          onChangeText={handleChange('phone')}
                          onBlur={handleBlur('phone')}
                          value={values.phone}
                        />
                        {touched.phone && errors.phone && (
                          <Animated.Text style={[Onboardingstyles.error, fieldErrorStyle]}>
                            {errors.phone}
                          </Animated.Text>
                        )}
                      </View>

              <TouchableOpacity
                style={[
                  Onboardingstyles.submitButton,
                  (isSubmitting || !isValid) && Onboardingstyles.disabledButton
                ]}
                onPress={() => {
                  if (!isValid) {
                    displayToast('Please fill in all required fields correctly');
                    animatedFormError();
                  }
                  handleSubmit();
                }}
                disabled={isSubmitting || !isValid}
                accessibilityLabel="Sign up"
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={Onboardingstyles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
                </View>
              )}

       </Formik>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          onPressIn={() => setLoginHover(true)}
          onPressOut={() => setLoginHover(false)}
          style={[Onboardingstyles.loginLink, loginHover && Onboardingstyles.loginHover]}
        >
          <Text style={Onboardingstyles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
  
  )
};



export default OnboardingScreen