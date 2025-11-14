import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Activity, Users, Zap } from 'lucide-react-native';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import XIcon from '../components/icons/XIcon';
import { Linking } from 'react-native';

export const StrategicImpactScreen = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background }
        ]}
      >
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface, marginBottom: 8 }}>
              Organizational Outcomes
            </Text>
            
            <View style={styles.outcomeRow}>
              <View style={[styles.outcomeItem, { backgroundColor: `${theme.colors.primary}10` }]}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
                  <TrendingUp size={24} color="#FFFFFF" />
                </View>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginVertical: 8 }}>
                  Revenue Impact
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  Direct effect on top-line growth through enhanced knowledge work
                </Text>
              </View>
              
              <View style={[styles.outcomeItem, { backgroundColor: `${theme.colors.primary}10` }]}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
                  <Activity size={24} color="#FFFFFF" />
                </View>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginVertical: 8 }}>
                  Competitive Positioning
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  Market differentiation through AI-enhanced knowledge work
                </Text>
              </View>
            </View>
            
            <View style={styles.outcomeRow}>
              <View style={[styles.outcomeItem, { backgroundColor: `${theme.colors.primary}10` }]}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
                  <Users size={24} color="#FFFFFF" />
                </View>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginVertical: 8 }}>
                  Talent Optimization
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  Maximum value from existing talent investments
                </Text>
              </View>
              
              <View style={[styles.outcomeItem, { backgroundColor: `${theme.colors.primary}10` }]}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
                  <Zap size={24} color="#FFFFFF" />
                </View>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginVertical: 8 }}>
                  Innovation Acceleration
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  Compress innovation cycles from years to months
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
              Executive Success Outcomes
            </Text>
            
            <View style={styles.successItem}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 4 }}>
                Performance Metrics Impact
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
                How AI knowledge work transformation directly affects your executive performance metrics
              </Text>
            </View>
            
            <View style={styles.successItem}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 4 }}>
                Career Advancement Implications
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
                Leading successful transformation positions you as an innovation leader
              </Text>
            </View>
            
            <View style={styles.successItem}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 4 }}>
                Personal Productivity Enhancements
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
                Executive workflow optimizations that save hours per week
              </Text>
            </View>
            
            <View style={styles.successItem}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 4 }}>
                Board Perception Management
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Enhance how the board views your strategic technology initiatives
              </Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained">
              Calculate Your Value
            </Button>
          </Card.Actions>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
              Executive Dashboard Preview
            </Text>
            
            <View style={styles.dashboardPreview}>
              <View style={styles.metricsRow}>
                <View style={styles.metric}>
                  <Text variant="headlineMedium" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                    68%
                  </Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
                    Faster Time-to-Market
                  </Text>
                </View>
                
                <Divider style={{ height: '70%', width: 1, backgroundColor: theme.colors.outline }} />
                
                <View style={styles.metric}>
                  <Text variant="headlineMedium" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                    3.2x
                  </Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
                    Knowledge Worker Output
                  </Text>
                </View>
                
                <Divider style={{ height: '70%', width: 1, backgroundColor: theme.colors.outline }} />
                
                <View style={styles.metric}>
                  <Text variant="headlineMedium" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                    42%
                  </Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
                    Cost Reduction
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined">
              Schedule Strategic Assessment
            </Button>
          </Card.Actions>
        </Card>

        {/* Footer */}
        <View style={[{ marginTop: 48, marginBottom: 24, paddingHorizontal: 16, alignItems: 'center', backgroundColor: theme.colors.surface }]}>  
          <Divider style={{ height: 1, width: '100%', marginBottom: 24 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>  
            <TouchableOpacity
              accessibilityRole="link"
              onPress={() => Linking.openURL('https://www.linkedin.com/company/mvara')}
              style={{ marginHorizontal: 8 }}
            >
              <LinkedInIcon size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="link"
              onPress={() => Linking.openURL('https://x.com/mvaraai')}
              style={{ marginHorizontal: 8 }}
            >
              <XIcon size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>Copyright {'\u00A9'} 2025 Managed Ventures LLC
            {'\n'}Doing business as mVara. All rights reserved.
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 16, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>Scottsdale, AZ</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  outcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  outcomeItem: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  successItem: {
    marginBottom: 8,
  },
  dashboardPreview: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: `rgba(0, 0, 0, 0.03)`,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
  },
  metric: {
    alignItems: 'center',
    width: '30%',
  },
});
