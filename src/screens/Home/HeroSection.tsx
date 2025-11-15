import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Mic } from 'react-native-feather';
import { useTheme } from '../../contexts/ThemeContext';

export interface HeroSectionProps {
  onAssessmentPress: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAssessmentPress }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.heroSection, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.question, { color: theme.colors.text }]}>
          If we could change one thing in your life or business that would change the course of your life or business, what would that be?
        </Text>
        
        <TouchableOpacity 
          style={[styles.micButton, { backgroundColor: theme.colors.primary }]}
          onPress={onAssessmentPress}
        >
          <Mic width={48} height={48} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={[styles.tapText, { color: theme.colors.text }]}>
          Tap to speak
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    minHeight: 600,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    maxWidth: 600,
    alignItems: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 36,
  },
  micButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  tapText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
