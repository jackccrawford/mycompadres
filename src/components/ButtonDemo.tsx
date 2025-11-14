import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from './Button';
import { Text } from './Text';
import { useTheme } from '../contexts/ThemeContext';

export const ButtonDemo = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Button Variants</Text>
      
      <View style={styles.row}>
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
        
        <Button 
          label="CTA Button" 
          variant="cta" 
          onPress={() => console.log('CTA pressed')}
          style={styles.button}
        />
      </View>
      
      <Text style={[styles.heading, { color: theme.colors.text, marginTop: 20 }]}>Disabled States</Text>
      
      <View style={styles.row}>
        <Button 
          label="Primary Disabled" 
          variant="primary" 
          disabled
          style={styles.button}
        />
        
        <Button 
          label="Secondary Disabled" 
          variant="secondary" 
          disabled
          style={styles.button}
        />
        
        <Button 
          label="CTA Disabled" 
          variant="cta" 
          disabled
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  button: {
    marginBottom: 16,
  }
});
