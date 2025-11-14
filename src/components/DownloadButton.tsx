import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface DownloadButtonProps {
  style?: any;
  textStyle?: any;
  url?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  style,
  textStyle,
  url = 'https://codeium.com/windsurf-download',
}) => {
  const { currentTheme } = useTheme();

  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error(`Cannot open URL: ${url}`);
      }
    } catch (error) {
      console.error('Error opening download URL:', error);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: currentTheme === 'dark' ? '#006495' : '#0066CC' },
        style
      ]}
      onPress={handlePress}
      accessibilityLabel="Download Windsurf"
      accessibilityRole="button"
    >
      <Text
        style={[
          styles.buttonText,
          { color: '#FFFFFF' },
          textStyle
        ]}
      >
        Download Windsurf
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 200,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DownloadButton;
