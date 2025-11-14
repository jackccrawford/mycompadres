import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, ImageStyle, StyleProp } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface CompadresLogoProps {
  variant?: 'white' | 'dark' | 'auto';
  style?: StyleProp<ImageStyle>;
  width?: number;
  height?: number;
}

export const CompadresLogo = ({ 
  variant = 'auto',
  style,
  width = 200,
  height = 60
}: CompadresLogoProps) => {
  const { theme } = useTheme();
  
  // Use orange logo (orange foreground, white background)
  // Same logo for both light and dark modes
  const logoSource: ImageSourcePropType = require('../assets/compadres-logo-orange.png');
  
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
