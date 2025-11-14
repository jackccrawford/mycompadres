import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.footer, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        © 2025 Compadres
      </Text>
      <Text style={[styles.subtext, { color: theme.colors.onSurfaceVariant }]}>
        {/* Easy to update - placeholder for company info */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  subtext: {
    fontSize: 10,
    marginTop: 4,
  },
});
