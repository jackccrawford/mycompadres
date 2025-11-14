import * as Font from 'expo-font';

export const FONT_NAMES = {
  MONTSERRAT_REGULAR: 'Montserrat-Regular',
  MONTSERRAT_MEDIUM: 'Montserrat-Medium',
  MONTSERRAT_BOLD: 'Montserrat-Bold',
};

// Font loading function 
export const loadFonts = async () => {
  try {
    await Font.loadAsync({
      // Load from local assets
      [FONT_NAMES.MONTSERRAT_REGULAR]: require('../../assets/fonts/Montserrat-Regular.ttf'),
      [FONT_NAMES.MONTSERRAT_MEDIUM]: require('../../assets/fonts/Montserrat-Medium.ttf'),
      [FONT_NAMES.MONTSERRAT_BOLD]: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });
    return true;
  } catch (error) {
    console.error('Error loading fonts:', error);
    return false;
  }
};

// Typography scale
export const typography = {
  fontFamily: {
    regular: FONT_NAMES.MONTSERRAT_REGULAR,
    medium: FONT_NAMES.MONTSERRAT_MEDIUM,
    bold: FONT_NAMES.MONTSERRAT_BOLD,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
};
