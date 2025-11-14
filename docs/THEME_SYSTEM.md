# Theme System Documentation

## Overview

The mVara Website RWA implements a comprehensive theme system that supports light and dark modes, system theme detection, and custom color palettes. This document details the actual implementation and behavior of the theme system.

## Core Components

### ThemeContext

**Location**: `src/contexts/ThemeContext.tsx`

The ThemeContext is the central piece of the theme system, providing:

- Theme state management
- Theme switching functionality
- Theme persistence
- System theme detection

#### Theme Types

```typescript
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
}
```

#### Context API

The ThemeContext provides the following API:

```typescript
export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setHeaderTitle: (title: string) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setPaletteType: (paletteType: PaletteType) => void;
}
```

## Theme Implementation

### Color Palettes

The theme system includes multiple color palettes, each with light and dark variants:

- **Default**: The primary mVara brand colors
- **Ocean**: A blue-focused color scheme
- **Forest**: A green-focused color scheme
- **Amber**: An amber/gold color scheme
- **Rose**: A pink/rose color scheme
- **Monochrome**: A grayscale color scheme

Each palette defines colors for both light and dark modes, ensuring proper contrast and visual hierarchy.

### Theme Detection and Switching

The theme system automatically detects the device's theme preference using React Native's `useColorScheme` hook:

```typescript
const colorScheme = useColorScheme();
```

When the theme mode is set to 'system', the application will automatically switch between light and dark themes based on the device's preference:

```typescript
const isDark = theme.themeMode === 'system' ? systemIsDark : theme.themeMode === 'dark';
```

### Theme Persistence

The user's theme preference is persisted using AsyncStorage:

```typescript
const setTheme = async (newTheme: Theme) => {
  try {
    await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
    setThemeState(newTheme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};
```

On application startup, the saved theme is loaded from AsyncStorage:

```typescript
useEffect(() => {
  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        setThemeState(parsedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };
  loadTheme();
}, []);
```

## Using the Theme System

### Accessing the Theme

Components can access the current theme using the `useTheme` hook:

```typescript
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Hello World</Text>
    </View>
  );
};
```

### Changing the Theme

The theme can be changed using the `setThemeMode` function:

```typescript
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, setThemeMode } = useTheme();
  
  const toggleTheme = () => {
    const newMode = theme.themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };
  
  return (
    <Button onPress={toggleTheme}>
      Toggle Theme
    </Button>
  );
};
```

## Header Theming

The header adapts to the current theme:

- **Light Mode**: White background (#FFFFFF) with gray text/icons
- **Dark Mode**: Black background (#000000) with white text/icons

The header logo also changes based on the theme:

```typescript
const logoSource = theme.dark 
  ? require('../assets/mvara-logo-black.png')
  : require('../assets/mvara-logo-white.png');
```

## Best Practices

### Theme-Aware Components

All components should adapt to the current theme:

```typescript
const MyButton = ({ title, onPress }) => {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity 
      style={{ 
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: 8
      }}
      onPress={onPress}
    >
      <Text style={{ color: theme.dark ? '#FFFFFF' : '#000000' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
```

### Performance Considerations

To prevent unnecessary re-renders, use the `useMemo` hook for derived values:

```typescript
const buttonStyle = useMemo(() => ({
  backgroundColor: theme.colors.primary,
  padding: theme.spacing.md,
  borderRadius: 8
}), [theme.colors.primary, theme.spacing.md]);
```

### Accessibility

Ensure proper contrast ratios between text and background colors:

- Light mode text on dark backgrounds
- Dark mode text on light backgrounds

## Troubleshooting

### Theme Not Applying

If theme changes aren't reflected in the UI:

1. Verify that the component is using the `useTheme` hook
2. Check that theme-dependent styles are properly applied
3. Ensure the component re-renders when the theme changes

### Inconsistent Theme Behavior

If the theme behaves inconsistently across the application:

1. Check for hardcoded colors in component styles
2. Verify that all components are using the theme context
3. Ensure that theme changes are properly propagated to all components
