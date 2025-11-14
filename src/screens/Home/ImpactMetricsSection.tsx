import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { useTheme } from '../../contexts/ThemeContext';

export interface ImpactMetricsSectionProps {
  onCalculate: () => void;
}

export const ImpactMetricsSection: React.FC<ImpactMetricsSectionProps> = ({ onCalculate }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>BUSINESS IMPACT</Text>
      <View style={styles.cardWrapper}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>  
          <Card.Content>
            <View style={styles.contentContainer}>
              <Text style={[styles.leadText, { color: theme.colors.onSurface }]}>
                Organizations using Windsurf with mVara extensions see transformative results across key performance indicators
              </Text>
              
              <View style={styles.featuredMetricContainer}>
                <Text style={[styles.featuredMetricValue, { color: theme.colors.primary }]}>
                  3.2x
                </Text>
                <Text style={[styles.featuredMetricLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Knowledge Worker Productivity
                </Text>
              </View>
              
              <Text style={[styles.supportingText, { color: theme.colors.onSurfaceVariant }]}>
                Imagine your most effective teams operating at more than triple their current capacity—without adding headcount or burning out.
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { 
    marginVertical: 24, 
    paddingHorizontal: 24 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 16 
  },
  card: { 
    borderRadius: 12,
  },
  cardWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
  leadText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 800,
  },
  featuredMetricContainer: {
    alignItems: 'center',
    marginVertical: 24,
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
  },
  featuredMetricValue: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuredMetricLabel: {
    fontSize: 20,
    fontWeight: '500',
  },
  supportingText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
    maxWidth: 700,
  },
});
