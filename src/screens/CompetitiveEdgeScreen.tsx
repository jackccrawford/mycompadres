import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, Button, ProgressBar } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Clock, Award } from 'lucide-react-native';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import XIcon from '../components/icons/XIcon';
import { Linking, TouchableOpacity } from 'react-native';

export const CompetitiveEdgeScreen = () => {
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
              Market Differentiation
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
              How AI-enhanced knowledge work creates sustainable competitive advantage
            </Text>
            
            <View style={[styles.exampleContainer, { backgroundColor: `${theme.colors.primary}10` }]}>
              <View style={styles.exampleHeader}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
                  <TrendingUp size={24} color="#FFFFFF" />
                </View>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface, flex: 1, marginLeft: 12 }}>
                  Industry-Specific Differentiation
                </Text>
              </View>
              
              <View style={styles.competitivePosition}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8 }}>
                  Your Position vs. Industry Average
                </Text>
                <View style={styles.positionMarkers}>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    Behind
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    Average
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    Leading
                  </Text>
                </View>
                <ProgressBar
                  progress={0.85}
                  color={theme.colors.primary}
                  style={{ height: 8, borderRadius: 4 }}
                />
                <View style={styles.positionLabel}>
                  <Text variant="bodySmall" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                    Your potential position with mVara
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface, marginBottom: 8 }}>
              Why AI Now?
            </Text>
            
            <View style={styles.aiNowContainer}>
              <View style={styles.aiNowItem}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
                  <Clock size={24} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 4 }}>
                    AI Capability vs. Cost Inflection Point
                  </Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                    We've reached the critical moment where AI capabilities have surged while costs have decreased dramatically
                  </Text>
                </View>
              </View>
              
              <View style={styles.costOfWaiting}>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 8 }}>
                  Cost of Waiting (Per Month)
                </Text>
                <View style={styles.costBar}>
                  <View 
                    style={[
                      styles.costFill, 
                      { 
                        width: '75%', 
                        backgroundColor: theme.colors.error 
                      }
                    ]} 
                  />
                </View>
                <Text variant="bodyMedium" style={{ color: theme.colors.error, fontStyle: 'italic', marginTop: 4 }}>
                  $250,000 in lost productivity per 100 knowledge workers
                </Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained">
              Calculate Your Cost of Waiting
            </Button>
          </Card.Actions>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface, marginBottom: 8 }}>
              First-Mover Advantage
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
              The 18-month advantage window for early adopters
            </Text>
            
            <View style={styles.timelineContainer}>
              <View style={[styles.timelinePoint, { backgroundColor: theme.colors.primary }]}>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>NOW</Text>
              </View>
              <View style={[styles.timelineLine, { backgroundColor: theme.colors.outline }]} />
              <View style={[styles.timelinePoint, { backgroundColor: theme.colors.outline }]}>
                <Text style={{ color: theme.colors.onSurface }}>+6M</Text>
              </View>
              <View style={[styles.timelineLine, { backgroundColor: theme.colors.outline }]} />
              <View style={[styles.timelinePoint, { backgroundColor: theme.colors.outline }]}>
                <Text style={{ color: theme.colors.onSurface }}>+12M</Text>
              </View>
              <View style={[styles.timelineLine, { backgroundColor: theme.colors.outline }]} />
              <View style={[styles.timelinePoint, { backgroundColor: theme.colors.outline }]}>
                <Text style={{ color: theme.colors.onSurface }}>+18M</Text>
              </View>
            </View>
            
            <View style={styles.advantageContainer}>
              <View style={[styles.advantageItem, { backgroundColor: `${theme.colors.primary}10` }]}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
                  <Award size={24} color="#FFFFFF" />
                </View>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginVertical: 8 }}>
                  Early Adopter Advantage
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  Companies implementing AI knowledge work solutions now will establish an 18-month competitive lead
                </Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined">
              Access Market Position Analysis
            </Button>
          </Card.Actions>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
              Talent Attraction & Retention
            </Text>
            
            <View style={styles.talentItem}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 4 }}>
                Employer Brand Impact
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
                How providing AI tools affects your ability to attract top talent
              </Text>
            </View>
            
            <View style={styles.talentItem}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 4 }}>
                Changing Expectations
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
                Top knowledge workers now expect AI-enhanced environments
              </Text>
            </View>
            
            <View style={styles.talentItem}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 4 }}>
                Executive Recruiting Edge
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Gain advantage in attracting executive talent through AI leadership
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Footer */}
        <View style={[{ marginTop: 48, marginBottom: 24, paddingHorizontal: 16, alignItems: 'center', backgroundColor: theme.colors.surface }]}>  
          <View style={{ height: 1, width: '100%', backgroundColor: theme.colors.outline, marginBottom: 24 }} />
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
  exampleContainer: {
    borderRadius: 12,
    padding: 16,
  },
  exampleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  competitivePosition: {
    marginTop: 8,
  },
  positionMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  positionLabel: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  aiNowContainer: {
    marginTop: 16,
  },
  aiNowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  costOfWaiting: {
    marginTop: 8,
  },
  costBar: {
    height: 12,
    backgroundColor: `rgba(0, 0, 0, 0.05)`,
    borderRadius: 6,
    overflow: 'hidden',
  },
  costFill: {
    height: '100%',
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  timelinePoint: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineLine: {
    height: 2,
    flex: 1,
  },
  advantageContainer: {
    marginTop: 8,
  },
  advantageItem: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  talentItem: {
    marginBottom: 8,
  },
});
