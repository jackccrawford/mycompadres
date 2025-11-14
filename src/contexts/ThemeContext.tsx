import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';
export type PaletteType = 'default' | 'ocean' | 'forest' | 'amber' | 'rose' | 'monochrome';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
    success: string;
    error: string;
    info: string;
    // MD3 colors
    surface: string;
    onSurface: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    outline: string;
    onSurfaceVariant: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  dark: boolean;
  themeMode: ThemeMode;
  headerTitle: string;
  paletteType?: PaletteType;
  // No legacy modes
}

// Define color palettes for both light and dark modes
const palettes = {
  default: {
    light: {
      primary: '#4B9CD3', // mVara brand color
      secondary: '#5856D6',
      background: '#FFFFFF',
      text: '#000000',
      border: '#E5E5E5',
      success: '#4CAF50',
      error: '#F44336',
      info: '#2196F3',
      surface: '#FFFFFF',
      onSurface: '#000000',
      primaryContainer: '#E3F2FD',
      onPrimaryContainer: '#000000',
      outline: '#79747E',
      onSurfaceVariant: '#49454F',
    },
    dark: {
      primary: '#4B9CD3', // mVara brand color preserved in dark mode
      secondary: '#5856D6',
      background: '#000000',
      text: '#FFFFFF',
      border: '#333333',
      success: '#4CAF50',
      error: '#F44336',
      info: '#2196F3',
      surface: '#222222',
      onSurface: '#FFFFFF',
      primaryContainer: '#1A237E',
      onPrimaryContainer: '#FFFFFF',
      outline: '#938F99',
      onSurfaceVariant: '#BCBEC2',
    }
  },
  ocean: {
    light: {
      primary: '#0077B6',
      secondary: '#48CAE4',
      background: '#FFFFFF',
      text: '#000000',
      border: '#E5E5E5',
      success: '#4CAF50',
      error: '#F44336',
      info: '#03045E',
      surface: '#FFFFFF',
      onSurface: '#000000',
      primaryContainer: '#CAF0F8',
      onPrimaryContainer: '#03045E',
      outline: '#79747E',
      onSurfaceVariant: '#49454F',
    },
    dark: {
      primary: '#90E0EF',
      secondary: '#48CAE4',
      background: '#000000',
      text: '#FFFFFF',
      border: '#333333',
      success: '#4CAF50',
      error: '#F44336',
      info: '#ADE8F4',
      surface: '#121212',
      onSurface: '#FFFFFF',
      primaryContainer: '#0077B6',
      onPrimaryContainer: '#CAF0F8',
      outline: '#938F99',
      onSurfaceVariant: '#8E8E93',
    }
  },
  forest: {
    light: {
      primary: '#2D6A4F',
      secondary: '#40916C',
      background: '#FFFFFF',
      text: '#000000',
      border: '#E5E5E5',
      success: '#4CAF50',
      error: '#F44336',
      info: '#74C69D',
      surface: '#FFFFFF',
      onSurface: '#000000',
      primaryContainer: '#D8F3DC',
      onPrimaryContainer: '#1B4332',
      outline: '#79747E',
      onSurfaceVariant: '#49454F',
    },
    dark: {
      primary: '#74C69D',
      secondary: '#40916C',
      background: '#000000',
      text: '#FFFFFF',
      border: '#333333',
      success: '#4CAF50',
      error: '#F44336',
      info: '#95D5B2',
      surface: '#121212',
      onSurface: '#FFFFFF',
      primaryContainer: '#2D6A4F',
      onPrimaryContainer: '#D8F3DC',
      outline: '#938F99',
      onSurfaceVariant: '#8E8E93',
    }
  },
  amber: {
    light: {
      primary: '#F59E0B',
      secondary: '#FBBF24',
      background: '#FFFFFF',
      text: '#000000',
      border: '#E5E5E5',
      success: '#4CAF50',
      error: '#F44336',
      info: '#FCD34D',
      surface: '#FFFFFF',
      onSurface: '#000000',
      primaryContainer: '#FEF3C7',
      onPrimaryContainer: '#92400E',
      outline: '#79747E',
      onSurfaceVariant: '#49454F',
    },
    dark: {
      primary: '#FBBF24',
      secondary: '#F59E0B',
      background: '#000000',
      text: '#FFFFFF',
      border: '#333333',
      success: '#4CAF50',
      error: '#F44336',
      info: '#FCD34D',
      surface: '#121212',
      onSurface: '#FFFFFF',
      primaryContainer: '#92400E',
      onPrimaryContainer: '#FEF3C7',
      outline: '#938F99',
      onSurfaceVariant: '#8E8E93',
    }
  },
  rose: {
    light: {
      primary: '#BE185D',
      secondary: '#DB2777',
      background: '#FFFFFF',
      text: '#000000',
      border: '#E5E5E5',
      success: '#4CAF50',
      error: '#F44336',
      info: '#F472B6',
      surface: '#FFFFFF',
      onSurface: '#000000',
      primaryContainer: '#FCE7F3',
      onPrimaryContainer: '#831843',
      outline: '#79747E',
      onSurfaceVariant: '#49454F',
    },
    dark: {
      primary: '#F472B6',
      secondary: '#DB2777',
      background: '#000000',
      text: '#FFFFFF',
      border: '#333333',
      success: '#4CAF50',
      error: '#F44336',
      info: '#FBCFE8',
      surface: '#121212',
      onSurface: '#FFFFFF',
      primaryContainer: '#9D174D',
      onPrimaryContainer: '#FCE7F3',
      outline: '#938F99',
      onSurfaceVariant: '#8E8E93',
    }
  },
  monochrome: {
    light: {
      primary: '#000000',
      secondary: '#333333',
      background: '#FFFFFF',
      text: '#000000',
      border: '#CCCCCC',
      success: '#333333',
      error: '#000000',
      info: '#666666',
      surface: '#FFFFFF',
      onSurface: '#000000',
      primaryContainer: '#EEEEEE',
      onPrimaryContainer: '#000000',
      outline: '#666666',
      onSurfaceVariant: '#333333',
    },
    dark: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      background: '#000000',
      text: '#FFFFFF',
      border: '#333333',
      success: '#CCCCCC',
      error: '#FFFFFF',
      info: '#999999',
      surface: '#121212',
      onSurface: '#FFFFFF',
      primaryContainer: '#333333',
      onPrimaryContainer: '#FFFFFF',
      outline: '#999999',
      onSurfaceVariant: '#CCCCCC',
    }
  }
};

const defaultTheme: Theme = {
  colors: palettes.default.dark,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  dark: true,
  themeMode: 'dark',
  headerTitle: 'mVara',
  paletteType: 'default',
  // No legacy modes
};

// Dark theme colors are now defined in the palettes object

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setHeaderTitle: (title: string) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setPaletteType: (paletteType: PaletteType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          const parsedTheme = JSON.parse(savedTheme);

          // Use the default theme's header title as the source of truth
          if (parsedTheme.headerTitle !== defaultTheme.headerTitle) {
            parsedTheme.headerTitle = defaultTheme.headerTitle;
            // Save the updated theme back to AsyncStorage
            await AsyncStorage.setItem('theme', JSON.stringify(parsedTheme));
          }

          setThemeState(parsedTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  const getThemeColors = (mode: ThemeMode, systemIsDark: boolean, paletteType: PaletteType | undefined) => {
    const isDark = mode === 'system' ? systemIsDark : mode === 'dark';

    // Handle undefined palette type
    let actualPaletteType = paletteType || 'default';

    // No legacy modes

    // Safety check: if the palette doesn't exist, use the default palette
    if (!palettes[actualPaletteType]) {
      console.warn(`Palette type '${actualPaletteType}' not found, using default palette`);
      actualPaletteType = 'default';
    }

    // Use the selected palette
    const baseColors = isDark ? palettes[actualPaletteType].dark : palettes[actualPaletteType].light;

    // Ensure the palette's primary color is properly set
    return baseColors;
  };

  useEffect(() => {
    const systemIsDark = colorScheme === 'dark';
    const isDark = theme.themeMode === 'system' ? systemIsDark : theme.themeMode === 'dark';

    const newTheme = {
      ...theme,
      dark: isDark,
      colors: getThemeColors(theme.themeMode, systemIsDark, theme.paletteType)
    };
    setThemeState(newTheme);
  }, [theme.themeMode, colorScheme, theme.paletteType]);

  const setTheme = async (newTheme: Theme) => {
    try {
      // We don't need to override colors here as they'll be set by the useEffect
      await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    const newTheme = { ...theme, themeMode: mode };
    setTheme(newTheme);
  };

  const setHeaderTitle = async (title: string) => {
    const newTheme = { ...theme, headerTitle: title };
    setTheme(newTheme);
  };

  const setPaletteType = async (paletteType: PaletteType | undefined) => {
    // If undefined is passed, use default palette type
    const actualPaletteType = paletteType || 'default';

    const newTheme = {
      ...theme,
      paletteType: actualPaletteType,
      // No legacy modes
    };
    setTheme(newTheme);
  };

  const contextValue = {
    theme,
    setTheme,
    setThemeMode,
    setHeaderTitle,
    setPaletteType,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
