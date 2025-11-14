import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BrandedText } from '../../utils/brandUtils';
import { typography } from '../../utils/fontUtils';

/**
 * Component displaying the transformation paragraph with branded text
 */
export const TransformParagraph = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transform Your Knowledge Workers</Text>
      <BrandedText style={styles.paragraph}>
        mVara helps organizations revolutionize productivity for every employee using document, spreadsheet, and presentation software. We focus on your brightest and most productive employees first, empowering them to double their productivity in days and multiply their contributions to your bottom line by 10x within months.
      </BrandedText>
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
    fontSize: typography.fontSize.xl,
    marginBottom: 16,
    color: '#000000',
  },
  paragraph: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.md,
    color: '#000000',
  },
});
