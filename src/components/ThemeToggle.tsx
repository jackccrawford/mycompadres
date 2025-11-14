import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react-native';

interface ThemeToggleProps {
  size?: number;
  color?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 24, 
  color
}) => {
  const { theme, toggleTheme, currentTheme } = useTheme();
  
  // Determine which icon to show based on the current theme setting
  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Moon size={size} color={color || '#000'} testID="theme-toggle-icon" />;
      case 'dark':
        return <Sun size={size} color={color || '#fff'} testID="theme-toggle-icon" />;
      case 'system':
        return <Monitor size={size} color={color || (currentTheme === 'dark' ? '#fff' : '#000')} testID="theme-toggle-icon" />;
      default:
        return <Sun size={size} color={color || '#000'} testID="theme-toggle-icon" />;
    }
  };

  // Determine the color based on the current applied theme
  const getIconColor = () => {
    if (color) return color;
    return currentTheme === 'dark' ? '#fff' : '#000';
  };

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={styles.button}
      accessibilityLabel="Toggle theme"
      accessibilityRole="button"
      testID="theme-toggle-button"
    >
      {getIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
  },
});

export default ThemeToggle;
