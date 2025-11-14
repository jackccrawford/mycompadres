import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { useTheme } from '../../contexts/ThemeContext';
import { Clock, Users, TrendingUp } from 'react-native-feather';

export const ExecChallengesSection: React.FC = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>EXECUTIVE CHALLENGES</Text>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>  
        <Card.Content>
          <View style={styles.challengeItem}>
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>  
              <Clock width={24} height={24} color="#FFFFFF" />
            </View>
            <View style={styles.challengeTextContainer}>
              <Text style={[styles.challengeTitle, { color: theme.colors.onSurface }]}>Accelerating Time-to-Market</Text>
              <Text style={[styles.challengeDescription, { color: theme.colors.onSurfaceVariant }]}>Competitive pressure to deliver faster with existing resources</Text>
            </View>
          </View>
          <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
          <View style={styles.challengeItem}>
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>  
              <Users width={24} height={24} color="#FFFFFF" />
            </View>
            <View style={styles.challengeTextContainer}>
              <Text style={[styles.challengeTitle, { color: theme.colors.onSurface }]}>Talent Optimization</Text>
              <Text style={[styles.challengeDescription, { color: theme.colors.onSurfaceVariant }]}>Maximizing productivity of high-cost knowledge workers</Text>
            </View>
          </View>
          <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
          <View style={styles.challengeItem}>
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>  
              <TrendingUp width={24} height={24} color="#FFFFFF" />
            </View>
            <View style={styles.challengeTextContainer}>
              <Text style={[styles.challengeTitle, { color: theme.colors.onSurface }]}>AI Transformation ROI</Text>
              <Text style={[styles.challengeDescription, { color: theme.colors.onSurfaceVariant }]}>Demonstrating measurable returns on AI investments</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    overflow: 'hidden',
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  challengeTextContainer: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
  },
  divider: {
    marginVertical: 12,
  },
});
