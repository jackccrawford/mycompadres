import React from 'react';
import { StyleSheet, View, Text, ScrollView, Platform, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from 'react-native-paper';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import XIcon from '../components/icons/XIcon';

const InsightsScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: theme.colors.background }}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}> 
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.primary }]}>Insights</Text>
          <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>Actionable insights to drive your business forward.</Text>
        </Card.Content>
      </Card>
      <View style={styles.footer}>
        <View style={styles.footerDivider} />
        <View style={styles.socialRow}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.linkedin.com/company/managedventures/')}
            style={styles.iconButton}
            accessibilityLabel="LinkedIn"
          >
            <LinkedInIcon size={28} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://x.com/managedventures')}
            style={styles.iconButton}
            accessibilityLabel="X (Twitter)"
          >
            <XIcon size={28} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.footerCopyright, { color: theme.colors.onSurfaceVariant }]}>Copyright {'\u00A9'} 2025 Managed Ventures LLC{Platform.OS === 'web' ? <br /> : '\n'}Doing business as mVara. All rights reserved.</Text>
        <Text style={[styles.footerAddress, { color: theme.colors.onSurfaceVariant }]}>Scottsdale, AZ</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  card: {
    marginBottom: 32,
    elevation: 2,
    borderRadius: 12,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  footer: {
    marginTop: 48,
    marginBottom: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  footerDivider: {
    height: 1,
    width: '100%',
    marginBottom: 24,
    backgroundColor: '#E0E0E0',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconButton: {
    marginHorizontal: 12,
    padding: 4,
    borderRadius: 20,
  },
  footerCopyright: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  footerAddress: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default InsightsScreen;
