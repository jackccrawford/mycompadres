import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import type { Theme } from '../contexts/ThemeContext';
import { getContrastingTextColor } from './colorUtils';
import { typography } from './fontUtils';

/**
 * Converts our custom theme to a react-native-paper compatible theme
 * This ensures that Paper components respect our theming system
 */
export const createPaperTheme = (theme: Theme): MD3Theme => {
  const baseTheme = theme.dark ? { ...MD3DarkTheme } : { ...MD3LightTheme };
  
  // Ensure buttons have good contrast in both light and dark modes
  const buttonTextColor = theme.dark ? '#FFFFFF' : '#FFFFFF';
  
  // CTA color - vibrant orange
  const ctaColor = '#D3824B';
  // Darker shade for hover/active states
  const ctaColorDark = '#B86A38';
  // Lighter shade for highlights
  const ctaColorLight = '#E09B6C';
  
  // Create a Paper theme that uses our custom theme colors
  return {
    ...baseTheme,
    fonts: {
      ...baseTheme.fonts,
      // Apply Montserrat to all text variants in a type-safe way
      displayLarge: {
        ...baseTheme.fonts.displayLarge,
        fontFamily: typography.fontFamily.bold,
      },
      displayMedium: {
        ...baseTheme.fonts.displayMedium,
        fontFamily: typography.fontFamily.bold,
      },
      displaySmall: {
        ...baseTheme.fonts.displaySmall,
        fontFamily: typography.fontFamily.bold,
      },
      headlineLarge: {
        ...baseTheme.fonts.headlineLarge,
        fontFamily: typography.fontFamily.bold,
      },
      headlineMedium: {
        ...baseTheme.fonts.headlineMedium,
        fontFamily: typography.fontFamily.bold,
      },
      headlineSmall: {
        ...baseTheme.fonts.headlineSmall,
        fontFamily: typography.fontFamily.bold,
      },
      titleLarge: {
        ...baseTheme.fonts.titleLarge,
        fontFamily: typography.fontFamily.medium,
      },
      titleMedium: {
        ...baseTheme.fonts.titleMedium,
        fontFamily: typography.fontFamily.medium,
      },
      titleSmall: {
        ...baseTheme.fonts.titleSmall,
        fontFamily: typography.fontFamily.medium,
      },
      bodyLarge: {
        ...baseTheme.fonts.bodyLarge,
        fontFamily: typography.fontFamily.regular,
      },
      bodyMedium: {
        ...baseTheme.fonts.bodyMedium,
        fontFamily: typography.fontFamily.regular,
      },
      bodySmall: {
        ...baseTheme.fonts.bodySmall,
        fontFamily: typography.fontFamily.regular,
      },
      labelLarge: {
        ...baseTheme.fonts.labelLarge,
        fontFamily: typography.fontFamily.medium,
      },
      labelMedium: {
        ...baseTheme.fonts.labelMedium,
        fontFamily: typography.fontFamily.medium,
      },
      labelSmall: {
        ...baseTheme.fonts.labelSmall,
        fontFamily: typography.fontFamily.medium,
      },
    },
    colors: {
      ...baseTheme.colors,
      // Primary color and text
      primary: theme.colors.primary,
      onPrimary: buttonTextColor, // Always use white text on buttons for better contrast
      
      // Containers
      primaryContainer: theme.colors.primaryContainer,
      onPrimaryContainer: theme.colors.onPrimaryContainer,
      
      // Secondary colors
      secondary: theme.colors.secondary,
      onSecondary: buttonTextColor,
      secondaryContainer: theme.dark ? theme.colors.primary + '33' : theme.colors.primary + '22',
      onSecondaryContainer: theme.colors.primary,
      
      // Tertiary colors - now using our CTA color
      tertiary: ctaColor,
      onTertiary: '#FFFFFF',
      tertiaryContainer: theme.dark ? ctaColor + '33' : ctaColor + '22',
      onTertiaryContainer: ctaColor,
      
      // Error states
      error: theme.colors.error,
      onError: '#FFFFFF',
      errorContainer: theme.dark ? '#370000' : '#FFCDD2',
      onErrorContainer: theme.dark ? '#FFCDD2' : '#370000',
      
      // Background and surface
      background: theme.colors.background,
      onBackground: theme.colors.text,
      surface: theme.colors.surface,
      onSurface: theme.colors.onSurface,
      surfaceVariant: theme.dark ? '#303030' : '#EEEEEE',
      onSurfaceVariant: theme.colors.onSurfaceVariant,
      
      // Other UI elements
      outline: theme.colors.outline,
      outlineVariant: theme.dark ? '#505050' : '#CCCCCC',
      shadow: theme.dark ? '#000000' : '#000000',
      scrim: theme.dark ? '#000000' : '#000000',
      inverseSurface: theme.dark ? '#FFFFFF' : '#000000',
      inverseOnSurface: theme.dark ? '#000000' : '#FFFFFF',
      inversePrimary: theme.dark ? theme.colors.primary + 'AA' : theme.colors.primary + '88',
      
      // Elevation levels
      elevation: {
        level0: 'transparent',
        level1: theme.dark ? '#1E1E1E' : '#FFFFFF',
        level2: theme.dark ? '#222222' : '#F5F5F5',
        level3: theme.dark ? '#272727' : '#EEEEEE',
        level4: theme.dark ? '#2C2C2C' : '#E0E0E0',
        level5: theme.dark ? '#313131' : '#D6D6D6',
      }
    },
    // Preserve other theme properties
    dark: theme.dark,
  };
};
