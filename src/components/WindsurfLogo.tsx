import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, ImageStyle, StyleProp } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface WindsurfLogoProps {
  variant?: 'black' | 'white';
  style?: StyleProp<ImageStyle>;
  width?: number;
  height?: number;
}

export const WindsurfLogo = ({ 
  variant = 'white', 
  style,
  width = 200,
  height = 60
}: WindsurfLogoProps) => {
  const { theme } = useTheme();
  
  // Automatically select the appropriate logo based on theme if variant is not specified
  const effectiveVariant = variant === 'white' || variant === 'black' 
    ? variant 
    : theme.dark ? 'white' : 'black';
  
  // Import the appropriate logo based on the variant
  const logoSource: ImageSourcePropType = effectiveVariant === 'white'
    ? require('../assets/windsurf_logo_white_wordmark.png')
    : require('../assets/windsurf_logo_black_wordmark.png');
  
  return (
    <Image
      source={logoSource}
      style={[
        styles.logo,
        { width, height },
        style
      ]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
});
