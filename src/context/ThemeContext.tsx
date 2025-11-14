import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

// Define theme types
export type ThemeType = 'light' | 'dark' | 'system';

// Define the context shape
interface ThemeContextType {
  theme: ThemeType;
  currentTheme: 'light' | 'dark'; // The actual theme being applied (resolved from system if needed)
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  currentTheme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

// Theme storage key
const THEME_STORAGE_KEY = 'mvara_theme_preference';

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeType;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = 'system' 
}) => {
  const [theme, setThemeState] = useState<ThemeType>(initialTheme);
  const systemTheme = useColorScheme() as 'light' | 'dark';
  
  // The actual theme to apply (resolves 'system' to the actual system theme)
  const currentTheme = theme === 'system' ? systemTheme || 'light' : theme;

  // Load saved theme preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setThemeState(savedTheme as ThemeType);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };

    loadTheme();
  }, []);

  // Save theme preference when it changes
  const setTheme = async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // Toggle between light, dark, and system themes
  const toggleTheme = () => {
    const nextTheme: ThemeType = 
      theme === 'light' ? 'dark' : 
      theme === 'dark' ? 'system' : 'light';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
