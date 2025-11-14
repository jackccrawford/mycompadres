import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { globalTextStyles } from '../styles/globalStyles';

export const ImplementationRealityScreen = () => {
  const { theme } = useTheme();

  const Pillar = ({ number, name, description, subPillars }: any) => (
    <View style={styles.pillarContainer}>
      <View style={styles.pillarHeader}>
        <Text style={[globalTextStyles.h3, { color: theme.colors.text }]}>
          {number}. {name}
        </Text>
      </View>
      <Text style={[globalTextStyles.body, { color: theme.colors.text, marginBottom: 12, opacity: 0.9 }]}>
        {description}
      </Text>
      {subPillars && subPillars.length > 0 && (
        <View style={styles.subPillarsContainer}>
          {subPillars.map((sub: string, idx: number) => (
            <Text key={idx} style={[globalTextStyles.bodySmall, { color: theme.colors.text, opacity: 0.8, marginBottom: 6 }]}>
              • {sub}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[globalTextStyles.h2, { color: theme.colors.text, marginBottom: 8 }]}>
          Growth Partnership
        </Text>
        <Text style={[globalTextStyles.h4, { color: theme.colors.text, marginBottom: 8 }]}>
          = Optimisation & Growth
        </Text>
        <Text style={[globalTextStyles.body, { color: theme.colors.text, marginBottom: 32, opacity: 0.9 }]}>
          The Compadres Framework: 6 Pillars for Business Growth
        </Text>

        <Pillar
          number={1}
          name="Purpose"
          description="Why you exist and what drives your business forward."
          subPillars={['Vision & Mission', 'Core Values']}
        />

        <Pillar
          number={2}
          name="People"
          description="Your team, culture, and leadership capabilities."
          subPillars={['Team Structure', 'Culture & Engagement']}
        />

        <Pillar
          number={3}
          name="Process"
          description="Systems, operations, and how work gets done."
          subPillars={['Operations', 'Systems & Tools']}
        />

        <Pillar
          number={4}
          name="Performance"
          description="Financial metrics, KPIs, and business health."
          subPillars={['Financial Performance', 'Key Metrics']}
        />

        <Pillar
          number={5}
          name="Product"
          description="Your offerings, innovation, and market fit."
          subPillars={['Product/Service Quality', 'Innovation & Development']}
        />

        <Pillar
          number={6}
          name="Profit"
          description="Growth, sustainability, and long-term value creation."
          subPillars={['Revenue Growth', 'Profitability & Scale']}
        />
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
  pillarContainer: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  pillarHeader: {
    marginBottom: 8,
  },
  subPillarsContainer: {
    marginTop: 8,
    paddingLeft: 12,
  },
});
