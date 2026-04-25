import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { loginUser } from '../utils/auth';
import { useAuth } from '../context/AuthContext';
import LoginStyles from '../Styles/LoginStyles';



type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { login } = useAuth();
  const [loginHover, setLoginHover] = useState(false);
  const [errorAnim] = useState(new Animated.Value(0));
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Validation schema
  const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // Animation for error messages
  const animateError = () => {
    Animated.sequence([
      Animated.timing(errorAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(errorAnim, { toValue: 0, duration: 300, useNativeDriver: true, delay: 2000 })
    ]).start();
  };
  // Create animated error style
  const errorStyle = {
    opacity: errorAnim,
    transform: [{
      translateX: errorAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-10, 5, 0]
      })
    }]
  };

  // Shake animation function
  const animateLoginError = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.navbar}>
        <Image source={require('../assets/branding/Logo.png')} style={LoginStyles.logo} />
      </View>

      <View style={LoginStyles.content}>
        <View style={LoginStyles.header}>
          <Text style={LoginStyles.title}>Login</Text>
          <Text style={LoginStyles.subtitle}>Welcome back</Text>
        </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={async (values) => {
            try {
              setIsSubmitting(true);
              setLoginError(null);
              
              const success = await loginUser(values.email, values.password);
              if (success) {
                login(); // Update auth context
                navigation.reset({
                  index: 0,
                  routes: [{name:'Home'}],
                });
              } else {
                animateLoginError();
                setLoginError('Invalid email or password');
              }
            } catch (e: any) {
              animateLoginError();
              if (e.message === 'Email not registered') {
                setLoginError('Email not found. Please sign up first.');
              } else if (e.message === 'Incorrect password') {
                setLoginError('Incorrect password. Please try again.');
              } else {
                setLoginError('Login failed. Please try again.');
              }
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <Animated.View 
              style={[
                LoginStyles.form, 
                { transform: [{ translateX: shakeAnimation }] }
              ]}
            >
              {/* Form fields */}
              
              <View style={LoginStyles.inputGroup}>
                <TextInput
                  style={[
                    LoginStyles.input,
                    loginError && LoginStyles.inputError
                  ]}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={LoginStyles.error}>{errors.email}</Text>
                )}
              </View>

              <View style={LoginStyles.inputGroup}>
                <TextInput
                  style={[
                    LoginStyles.input,
                    loginError && LoginStyles.inputError
                  ]}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <TouchableOpacity
                  style={LoginStyles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={LoginStyles.toggleText}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
                {touched.password && errors.password && (
                  <Text style={LoginStyles.error}>{errors.password}</Text>
                )}
              </View>

              {loginError && (
                <Text style={LoginStyles.loginError}>{loginError}</Text>
              )}

              <TouchableOpacity 
                style={[
                  LoginStyles.submitButton,
                  loginError && LoginStyles.submitButtonError,
                  isSubmitting && LoginStyles.disabledButton
                ]} 
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={LoginStyles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          )}
        </Formik>

        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding')}
          onPressIn={() => setLoginHover(true)}
          onPressOut={() => setLoginHover(false)}
          style={[LoginStyles.signupLink, loginHover && LoginStyles.loginHover]}
        >
          <Text style={LoginStyles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default LoginScreen;