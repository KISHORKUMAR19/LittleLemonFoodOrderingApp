import { StyleSheet, Dimensions } from 'react-native';
import { FONTS } from '../utils/fonts';

const { width } = Dimensions.get('window');

const HomeStyles = StyleSheet.create({
  // 1. Container Styles
  container: {
    flex: 1,
    backgroundColor: '#FFF', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEFEE',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 20
  },
  
  // 2. Navigation Bar Styles
  navbar: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginTop: 25
  },
  logoContainer: { 
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 56,
    resizeMode: 'contain',
    left: 10
  },
  profileContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 8
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 100,
    marginTop: 4,
  },
  
  // 3. Hero Section Styles
  heroSection: {
    backgroundColor: '#495E57',
    padding: 20,
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 20,
    maxWidth: '75%',
  },
  heroTitle: {
    fontSize: 64,
    fontFamily: FONTS.markaziTextMedium,
    color: '#F4CE14',
    lineHeight: 60,
    marginTop: -5,
    marginBottom: -15,
    includeFontPadding: false,
  },
  heroSubtitle: {
    fontSize: 40,
    fontFamily: FONTS.markaziTextRegular,
    color: '#EDEFEE',
    lineHeight: 40,
    marginBottom: 10,
    includeFontPadding: false,
  },
  heroDescription: {
    fontSize: 16,
    fontFamily: FONTS.karlaRegular,
    color: '#EDEFEE',
    lineHeight: 24,
  },
  heroImageContainer: {
    position: 'absolute',
    right: -1,
    top: '60%',
    transform: [{ translateY: -75 }],
  },
  heroImage: {
    width: 140,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  
  // 4. Search Bar Styles
  searchContainer: {
    backgroundColor: '#EDEFEE',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTS.karlaRegular,
    color: '#333',
    height: '100%',
  },
  
  // 5. Order Section Styles
  orderTitle: {
    fontSize: 22,
    fontFamily: FONTS.karlaBold,
    color: '#333',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  
  // 6. Category Filter Styles
  categoryWraper: {
    maxHeight: 50,
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  categoryButton: {
    backgroundColor: '#EDEFEE',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EDEFEE',
    height: 40,
    justifyContent: 'center'
  },
  activeCategory: {
    backgroundColor: '#495E57',
    borderColor: '#495E57',
  },
  categoryText: {
    fontSize: 16,
    fontFamily: FONTS.karlaMedium,
    color: '#495E57',
  },
  activeCategoryText: {
    color: '#FFF',
  },
  
  // 7. Menu List Styles
  menuContainer: {
    flex: 1,
  },
  menuList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: '#EDEFEE',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEFEE',
  },
  menuTextContainer: {
    flex: 1,
    paddingRight: 15,
  },
  menuItemTitle: {
    fontSize: 18,
    fontFamily: FONTS.karlaBold,
    color: '#333',
    marginBottom: 5,
  },
  menuItemDescription: {
    fontSize: 16,
    fontFamily: FONTS.karlaRegular,
    color: '#6E6E6E',
    marginBottom: 10,
    lineHeight: 20,
  },
  menuItemPrice: {
    fontSize: 18,
    fontFamily: FONTS.karlaBold,
    color: '#495E57',
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    resizeMode: 'cover',
    alignSelf: 'center',
    
  },
  
  // 8. Loading Indicators
  menuLoader: {
    marginVertical: 10,
  },
  filterLoader: {
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default HomeStyles