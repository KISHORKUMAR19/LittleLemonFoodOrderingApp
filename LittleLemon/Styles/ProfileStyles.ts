import { StyleSheet, Dimensions } from 'react-native';
import { FONTS } from '../utils/fonts';

const ProfileStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EDEFEE',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: FONTS.karlaRegular,
    fontSize: 18,
    color: '#495E57',
  },
  navbar: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginTop: 10,
    
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  logo: {
    width: 180,
    height: 56,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal:'auto'
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    fontSize: 24,
    fontFamily: FONTS.karlaBold,
    color: '#333',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  imageActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageButton: {
    width: '48%',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  form: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontFamily: FONTS.karlaBold,
    fontSize: 16,
    color: '#495E57',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: FONTS.karlaRegular,
    backgroundColor: '#FAFAFA',
  },
  staticInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingLeft: 0,
    color: '#333',
  },
  editingInput: {
    backgroundColor: '#FFF',
    borderColor: '#495E57',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  toggleButton: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#EDEFEE',
  },
  toggleText: {
    fontFamily: FONTS.karlaBold,
    fontSize: 14,
    color: '#495E57',
  },
  passwordHint: {
    fontFamily: FONTS.karlaRegular,
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  notificationSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 20,
    fontFamily: FONTS.karlaBold,
    color: '#333',
    marginBottom: 15,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  preferenceLabel: {
    fontFamily: FONTS.karlaRegular,
    fontSize: 16,
    color: '#333',
  },
  feedbackText: {
    marginTop: 10,
    fontFamily: FONTS.karlaRegular,
    fontSize: 14,
    color: '#495E57',
    textAlign: 'center',
  },
  logoutButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONTS.karlaBold,
  },
});

export default ProfileStyles;