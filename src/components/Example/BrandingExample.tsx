import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BrandName } from '../BrandName';
import { BrandedText } from '../../utils/brandUtils';
import { typography } from '../../utils/fontUtils';

/**
 * Example component demonstrating the use of Montserrat font and branded text
 */
export const BrandingExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Font & Branding Examples</Text>
      
      {/* Examples of direct BrandName component usage */}
      <View style={styles.section}>
        <Text style={styles.subheading}>BrandName Component Examples:</Text>
        <View style={styles.row}>
          <BrandName size="small" />
          <BrandName size="medium" />
          <BrandName size="large" />
          <BrandName size="xlarge" />
        </View>
      </View>
      
      {/* Examples of the BrandedText utility */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Automatic Brand Styling in Text:</Text>
        <BrandedText style={styles.paragraph}>
          Welcome to mVara, where we provide world-class AI solutions. 
          At mVara, we believe that technology should work for you.
        </BrandedText>
      </View>
      
      {/* Examples of Montserrat font usage */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Montserrat Font Examples:</Text>
        <Text style={styles.regular}>Regular text in Montserrat</Text>
        <Text style={styles.medium}>Medium text in Montserrat</Text>
        <Text style={styles.bold}>Bold text in Montserrat</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    marginBottom: 20,
  },
  subheading: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    marginBottom: 10,
  },
  section: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  paragraph: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.md,
  },
  regular: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    marginBottom: 5,
  },
  medium: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    marginBottom: 5,
  },
  bold: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    marginBottom: 5,
  },
});
