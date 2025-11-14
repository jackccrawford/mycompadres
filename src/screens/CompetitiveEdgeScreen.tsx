import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { globalTextStyles } from '../styles/globalStyles';

export const CompetitiveEdgeScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[globalTextStyles.h2, { color: theme.colors.text, marginBottom: 16 }]}>
          Business Advisory
        </Text>
        <Text style={[globalTextStyles.h4, { color: theme.colors.text, marginBottom: 8 }]}>
          = Commercial Clarity
        </Text>
        <Text style={[globalTextStyles.body, { color: theme.colors.text, marginBottom: 24 }]}>
          For Business owners and Entrepreneurs finding a disconnect between your purpose and your business results.
        </Text>
        
        <Text style={[globalTextStyles.bodyMedium, { color: theme.colors.text, marginBottom: 16 }]}>
          We bring clarity through practical, tactical advice to get your business back on track – commercial rigour.
        </Text>
        
        <Text style={[globalTextStyles.body, { color: theme.colors.text }]}>
          Through a Unique Advisory: Wisdom, Creative Commercial Clarity, Curated Introductions and Opportunities.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
});
