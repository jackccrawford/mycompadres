import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { ToastProvider } from './src/components/Toast/ToastProvider';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { ThemedNavigator } from './src/navigation/ThemedNavigator';
import { createPaperTheme } from './src/utils/paperThemeUtils';
import { navigationRef } from './src/navigation/navigationRef';
import { loadFonts } from './src/utils/fontUtils';
import { View, Text, Platform } from 'react-native';
import { handleDeepLink } from './src/web/routing';

// Wrapper component to access the theme context
const ThemedApp = () => {
  const { theme } = useTheme();
  const paperTheme = createPaperTheme(theme);

  // Handle deep linking for web platform
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Handle initial URL
      const path = window.location.pathname + window.location.search;
      if (path !== '/') {
        handleDeepLink(path);
      }

      // Handle URL changes (history API)
      const handleLocationChange = () => {
        const newPath = window.location.pathname + window.location.search;
        if (newPath !== '/') {
          handleDeepLink(newPath);
        }
      };

      window.addEventListener('popstate', handleLocationChange);
      return () => {
        window.removeEventListener('popstate', handleLocationChange);
      };
    }
  }, []);

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer ref={navigationRef}>
        <ToastProvider>
          <ThemedNavigator />
        </ToastProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Load fonts on initialization
    async function prepareFonts() {
      const loaded = await loadFonts();
      setFontsLoaded(loaded);
    }
    prepareFonts();
  }, []);

  // For web, we'll always render even if fonts aren't loaded
  // For native apps, we might want to show a loading screen
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          {fontsLoaded ? (
            <ThemedApp />
          ) : (
            <View>
              <Text>Loading...</Text>
            </View>
          )}
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
