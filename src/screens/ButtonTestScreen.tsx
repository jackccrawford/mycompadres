import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { useTheme, Switch, Text as PaperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { CTAButton } from '../components/CTAButton';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

export const ButtonTestScreen = () => {
  const theme = useTheme();
  const { theme: appTheme, setThemeMode } = useAppTheme();
  const [isDarkMode, setIsDarkMode] = useState(appTheme.dark);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setThemeMode(newMode ? 'dark' : 'light');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <PaperText variant="headlineMedium" style={{ color: theme.colors.onBackground }}>
            Button Styles
          </PaperText>
          <View style={styles.themeToggle}>
            <PaperText style={{ color: theme.colors.onBackground, marginRight: 8 }}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </PaperText>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>
        </View>

        <View style={styles.section}>
          <PaperText variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Standard Buttons
          </PaperText>
          
          <View style={styles.buttonRow}>
            <Button 
              label="Primary Button" 
              variant="primary"
              onPress={() => console.log('Primary pressed')}
              style={styles.button}
            />
            
            <Button 
              label="Secondary Button" 
              variant="secondary"
              onPress={() => console.log('Secondary pressed')}
              style={styles.button}
            />
          </View>
        </View>

        <View style={styles.section}>
          <PaperText variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            CTA Buttons (New)
          </PaperText>
          
          <View style={styles.buttonRow}>
            <CTAButton 
              label="CTA Button (Filled)" 
              variant="filled"
              onPress={() => console.log('CTA filled pressed')}
              style={styles.button}
            />
            
            <CTAButton 
              label="CTA Button (Outlined)" 
              variant="outlined"
              onPress={() => console.log('CTA outlined pressed')}
              style={styles.button}
            />
          </View>
        </View>

        <View style={styles.section}>
          <PaperText variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Disabled States
          </PaperText>
          
          <View style={styles.buttonRow}>
            <CTAButton 
              label="CTA Disabled" 
              disabled
              onPress={() => console.log('Should not trigger')}
              style={styles.button}
            />
            
            <Button 
              label="Primary Disabled" 
              disabled
              onPress={() => console.log('Should not trigger')}
              style={styles.button}
            />
          </View>
        </View>

        <View style={styles.section}>
          <PaperText variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            React Native Paper Buttons
          </PaperText>
          
          <View style={styles.buttonRow}>
            <View style={styles.paperButtonWrapper}>
              <PaperText>Primary</PaperText>
            </View>
            
            <View style={styles.paperButtonWrapper}>
              <PaperText>Secondary</PaperText>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 16,
  },
  button: {
    marginBottom: 16,
    minWidth: 200,
  },
  paperButtonWrapper: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    marginBottom: 16,
  },
});
