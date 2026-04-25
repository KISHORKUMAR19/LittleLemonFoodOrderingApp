import * as Font from "expo-font";

export const loadFonts = async () => {
    await Font.loadAsync({
        [FONTS.karlaRegular] : require('../assets/fonts/Karla-Regular.ttf'),
        [FONTS.karlaBold] : require('../assets/fonts/Karla-Bold.ttf'),
        [FONTS.karlaExtraBold] : require('../assets/fonts/Karla-ExtraBold.ttf'),
        [FONTS.karlaMedium]: require('../assets/fonts/Karla-Medium.ttf'),
        [FONTS.markaziTextRegular] : require('../assets/fonts/MarkaziText-Regular.ttf'),
        [FONTS.markaziTextMedium] : require('../assets/fonts/MarkaziText-Medium.ttf'),
    });
};

export const FONTS = {
    karlaRegular: 'karla-Regular',
    karlaBold: 'karla-Bold',
    karlaExtraBold: 'karla-ExtraBold',
    karlaMedium: 'karla-medium',
    markaziTextRegular: 'MarkaziText-Regular',
    markaziTextMedium: 'MarkaziText-Medium',
}

export const FontsLoaded =() => Font.isLoaded(FONTS.markaziTextRegular);