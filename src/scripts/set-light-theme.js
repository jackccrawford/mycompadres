// Set the theme to light mode
const AsyncStorage = require('@react-native-async-storage/async-storage');

async function setLightTheme() {
  try {
    // Get the current theme
    const currentThemeStr = await AsyncStorage.getItem('theme');
    let currentTheme = null;
    
    if (currentThemeStr) {
      currentTheme = JSON.parse(currentThemeStr);
    }
    
    // Update the theme mode to 'light'
    const newTheme = {
      ...(currentTheme || {}),
      themeMode: 'light'
    };
    
    // Save it back to AsyncStorage
    await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
    console.log('Theme successfully set to light mode');
    console.log('Please restart the app to see the changes');
  } catch (error) {
    console.error('Error setting theme:', error);
  }
}

setLightTheme();
