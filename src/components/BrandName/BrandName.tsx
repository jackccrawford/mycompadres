import React from 'react';
import { Text, View, Platform, StyleSheet } from 'react-native';
import { typography } from '../../utils/fontUtils';

interface BrandNameProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: string;
  style?: any;
  fontSize?: number; // Allow direct font size control
  inheritFontSize?: boolean; // Allow inheriting font size from parent
}

/**
 * A component for displaying the stylized "mVara" brand name with the "V" 
 * highlighted in the brand color. This ensures consistent branding across the app.
 */
export const BrandName: React.FC<BrandNameProps> = ({ 
  size = 'medium', 
  color = 'inherit',
  style = {},
  fontSize: customFontSize,
  inheritFontSize = false
}) => {
  // Define font size based on the size prop or custom size
  const predefinedFontSize = {
    small: typography.fontSize.sm,
    medium: typography.fontSize.md,
    large: typography.fontSize.lg,
    xlarge: typography.fontSize.xxl,
  }[size];
  
  // Use custom font size if provided, else use predefined size
  const fontSize = customFontSize || predefinedFontSize;

  // Set the color for the main text
  const textColor = color === 'inherit' ? undefined : color;
  
  // The brand blue color for the "V"
  const brandBlue = '#3c78d8';

  const isWeb = Platform.OS === 'web';
  
  return (
    <View style={[styles.container, style]}>
      <Text style={[
        styles.text, 
        { 
          ...(inheritFontSize ? {} : { fontSize }),
          color: textColor,
          fontFamily: typography.fontFamily.regular
        }
      ]}>
        <Text style={{ 
          fontFamily: typography.fontFamily.regular,
          ...(isWeb ? { letterSpacing: -0.3 } : {})
        }}>m</Text>
        <Text style={{ 
          color: brandBlue, 
          fontFamily: typography.fontFamily.regular,
          ...(isWeb ? { letterSpacing: -0.5 } : {})
        }}>V</Text>
        <Text style={{ 
          fontFamily: typography.fontFamily.regular,
          ...(isWeb ? { letterSpacing: -0.3 } : {})
        }}>ara</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? { display: 'inline' as any } : {})
  },
  text: {
    flexDirection: 'row',
  }
});
