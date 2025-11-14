import React from 'react';
import { View, StyleSheet, useWindowDimensions, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// Define breakpoints for responsive design
const BREAKPOINTS = {
  MOBILE: 576,
  TABLET: 768,
  DESKTOP: 992,
  LARGE_DESKTOP: 1200
};

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ 
  children, 
  style, 
  testID 
}) => {
  const { width } = useWindowDimensions();
  const { currentTheme } = useTheme();
  
  // Determine the current device type based on screen width
  const isMobile = width < BREAKPOINTS.MOBILE;
  const isTablet = width >= BREAKPOINTS.MOBILE && width < BREAKPOINTS.DESKTOP;
  const isDesktop = width >= BREAKPOINTS.DESKTOP;

  // Apply different styles based on device type
  const getResponsiveStyles = () => {
    if (isMobile) {
      return styles.mobile;
    } else if (isTablet) {
      return styles.tablet;
    } else {
      return styles.desktop;
    }
  };

  // Apply different background colors based on theme
  const getThemeStyles = () => {
    return {
      backgroundColor: currentTheme === 'dark' ? '#121212' : '#ffffff',
    };
  };

  return (
    <View 
      style={[styles.container, getResponsiveStyles(), getThemeStyles(), style]}
      testID={testID}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  mobile: {
    padding: 16,
  },
  tablet: {
    padding: 24,
    maxWidth: 768,
    alignSelf: 'center',
  },
  desktop: {
    padding: 32,
    maxWidth: 1200,
    alignSelf: 'center',
  },
});

export default ResponsiveLayout;
