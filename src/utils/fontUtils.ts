import * as Font from 'expo-font';

export const FONT_NAMES = {
  OUTFIT_REGULAR: 'Outfit-Regular',
  OUTFIT_MEDIUM: 'Outfit-Medium',
  OUTFIT_SEMIBOLD: 'Outfit-SemiBold',
  OUTFIT_BOLD: 'Outfit-Bold',
};

// Font loading function - Compadres brand font
export const loadFonts = async () => {
  try {
    await Font.loadAsync({
      // Load from local assets
      [FONT_NAMES.OUTFIT_REGULAR]: require('../../assets/fonts/Outfit_400Regular.ttf'),
      [FONT_NAMES.OUTFIT_MEDIUM]: require('../../assets/fonts/Outfit_500Medium.ttf'),
      [FONT_NAMES.OUTFIT_SEMIBOLD]: require('../../assets/fonts/Outfit_600SemiBold.ttf'),
      [FONT_NAMES.OUTFIT_BOLD]: require('../../assets/fonts/Outfit_700Bold.ttf'),
    });
    return true;
  } catch (error) {
    console.error('Error loading fonts:', error);
    return false;
  }
};

// Typography scale - Compadres brand (matching wearecompadres.com)
export const typography = {
  fontFamily: {
    regular: FONT_NAMES.OUTFIT_REGULAR,
    medium: FONT_NAMES.OUTFIT_MEDIUM,
    semibold: FONT_NAMES.OUTFIT_SEMIBOLD,
    bold: FONT_NAMES.OUTFIT_BOLD,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    base: 17, // Compadres website default
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    base: 26, // Compadres website default
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};
