import { StyleSheet, Dimensions } from 'react-native';
import { FONTS } from '../utils/fonts';

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  navbar: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'White',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginTop:20
  },
  logo: {
    width: 180,
    height: 56,
    resizeMode: 'contain',
    marginTop:20
  },
  content: {
    flex: 1,
    padding: 20,
    
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 64,
    fontFamily: FONTS.markaziTextMedium,
    color: '#495E57',
    textAlign: 'center',
    
  },
  subtitle: {
    fontSize: 40,
    fontFamily:FONTS.markaziTextRegular,
    color: '#495E57',
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Karla-Regular',
  },
  inputError: {
    borderColor: 'red',
    backgroundColor: '#FFF0F0',
  },
  loginError: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Karla-Bold',
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontFamily: 'Karla-Italic',
  },
  submitButton: {
    backgroundColor: '#495E57',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  disabledButton: {
    backgroundColor: '#AAAAAA',
  },
  submitButtonError: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Karla-Bold',
  },
  signupLink: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 8,
  },
  loginHover: {
    backgroundColor: '#F0F0F0',
  },
  signupText: {
    color: '#495E57',
    fontSize: 16,
    fontFamily: 'Karla-Bold',
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  toggleText: {
    color: '#495E57',
    fontFamily: 'Karla-Bold',
  },
});
export default LoginStyles;