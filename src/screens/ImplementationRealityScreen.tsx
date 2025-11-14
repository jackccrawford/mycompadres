import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import XIcon from '../components/icons/XIcon';
import { Linking, TouchableOpacity } from 'react-native';

export const ImplementationRealityScreen = () => {
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
              30-Day Implementation Roadmap
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              Our implementation approach focuses on quick wins and early results, with minimal resource requirements.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined">View Roadmap</Button>
          </Card.Actions>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface, marginBottom: 8 }}>
              Operational Integration
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              mVara integrates seamlessly with your existing workflows with minimal disruption. No rip-and-replace required.
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface, marginBottom: 8 }}>
              Team Empowerment
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              Your existing teams become more effective with mVara. No specialized AI expertise required.
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface, marginBottom: 8 }}>
              Control & Governance
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              Executive dashboards provide visibility and appropriate governance frameworks.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained">Request Implementation Blueprint</Button>
          </Card.Actions>
        </Card>
      </ScrollView>

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
});
