import { FONTS } from "../utils/fonts";
import { StyleSheet } from "react-native";

const MenuItemsDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    position: 'relative',
  },
  navButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontFamily: FONTS.markaziTextMedium,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 28,
    fontFamily: FONTS.markaziTextMedium,
    color: '#495E57',
  },
  categoryContainer: {
    backgroundColor: '#495E57',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginBottom: 25,
  },
  category: {
    fontSize: 18,
    fontFamily: FONTS.karlaBold,
    color: '#F4CE14',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 18,
    fontFamily: FONTS.karlaRegular,
    color: '#333',
    lineHeight: 26,
  },
});

export default MenuItemsDetailsStyles