import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { globalTextStyles } from '../styles/globalStyles';

export const StrategicImpactScreen = () => {
  const { theme } = useTheme();

  const handleAssessment = () => {
    console.log('Navigate to assessment');
    // TODO: Navigate to AssessmentScreen
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[globalTextStyles.h2, { color: theme.colors.text, marginBottom: 16 }]}>
          Entrepreneur Program
        </Text>
        <Text style={[globalTextStyles.h4, { color: theme.colors.text, marginBottom: 8 }]}>
          = Founder Focus
        </Text>
        <Text style={[globalTextStyles.body, { color: theme.colors.text, marginBottom: 24 }]}>
          For early stage Entrepreneurs feeling lost, struggling to find or follow your purpose.
        </Text>
        
        <Text style={[globalTextStyles.bodyMedium, { color: theme.colors.text, marginBottom: 16 }]}>
          We bring clarity and purpose – (re)capturing the energy and passion that started your journey.
        </Text>
        
        <Text style={[globalTextStyles.body, { color: theme.colors.text, marginBottom: 32 }]}>
          Through an Introductory Engagement: uncover or rediscover your purpose; drive ambitious 3 year plan; 90 day accountability cycles.
        </Text>

        {/* Assessment CTA */}
        <TouchableOpacity
          style={styles.assessmentButton}
          onPress={handleAssessment}
          activeOpacity={0.8}
        >
          <Text style={[globalTextStyles.bodyLarge, { color: '#FFFFFF', fontWeight: '600' }]}>
            Take Entry Assessment
          </Text>
        </TouchableOpacity>
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
  assessmentButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});
