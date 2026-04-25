import { StyleSheet, Dimensions,Platform } from 'react-native';
import { FONTS } from '../utils/fonts';

const {width} = Dimensions.get('window');

const Onboardingstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navbar: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    marginTop: 40,
  },
  logo: {
    width: 180,
    height: 56,
    resizeMode: 'contain',
  },
  heroSection: {
    backgroundColor: '#495E57',
    padding: 20,
    paddingTop:10,
    paddingBottom:10,  
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 20,
    maxWidth:'75%',  // ensure text doesn't compete with image
  
  },
  heroTitle: {
    fontSize: 64,
    fontFamily: FONTS.markaziTextMedium,
    color: '#F4CE14',
    lineHeight: 60, // Slightly reduced to prevent overflow
    marginTop: -5, // Compensate for line height
    marginBottom: -15, // Bring subtitle closer
    includeFontPadding: false, // Remove extra padding (Android)
  },
  heroSubtitle: {
   fontSize: 40,
   fontFamily: FONTS.markaziTextRegular,
   color: '#EDEFEE',
   lineHeight: 40,
   marginBottom: 10,
   includeFontPadding: false, // Removing extra for padding (Android)
  },
  heroDescription: {
    fontSize: 16,
    fontFamily: FONTS.karlaRegular,
    color: '#EDEFEE',
    lineHeight: 24,
    
  },
   heroImageContainer: {
    position: 'absolute',
    right:-1,
    top: '60%', // Center vertically
    transform: [{ translateY: -75 }], // Half of image height (150/2=75)
  },
  heroImage: {
   width: 140,
   height: 160,
   resizeMode: 'cover',
   borderRadius: 16,
  },
  keyboardAvoid: {
    flex: 1,
    
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  form: {
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    fontFamily: FONTS.karlaRegular,
    backgroundColor: '#FFFFFF',
  },
  error: {
    color: '#FF0000',
    marginTop: 5,
    fontFamily: FONTS.karlaRegular,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#495E57',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#AAAAAA',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: FONTS.karlaMedium,
  },
  loginLink: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 8,
  },
  loginHover: {
    backgroundColor: '#F0F0F0',
  },
  loginText: {
    color: '#495E57',
    fontSize: 16,
    fontFamily: 'Karla-Bold',
  },
 
  toastContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  toast: {
    backgroundColor: '#F4CE14',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  toastText: {
    color: '#333333',
    fontSize: 16,
    fontFamily: FONTS.karlaMedium,
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(68, 69, 72, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
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

export default Onboardingstyles;