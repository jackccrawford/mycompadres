import React, { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import { BrandName } from '../components/BrandName/BrandName';

/**
 * Utility type for BrandName component props for type safety
 */
type BrandNameSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Processes a string to replace instances of "mVara" with the styled BrandName component
 * This ensures consistent branding throughout the application
 * 
 * @param text The text to process
 * @param size The size of the brand name component
 * @param color The color to apply to the text (except the V which will always be brand blue)
 * @returns An array of React elements with the styled brand name
 */
export const formatTextWithBranding = (
  text: string,
  size: BrandNameSize = 'medium',
  color?: string
): ReactNode[] => {
  if (!text) return [];
  
  // Split the text by "mVara" (case sensitive)
  const parts = text.split(/(mVara)/g);
  
  // Map each part to either text or the BrandName component
  return parts.map((part, index) => {
    if (part === 'mVara') {
      return React.createElement(BrandName, {
        key: `brand-${index}`,
        size,
        color,
        inheritFontSize: true,
        style: { display: 'inline' }
      });
    }
    return React.createElement(Text, { key: `text-${index}` }, part);
  });
};

/**
 * A component that renders text with automatic styling of "mVara" occurrences
 */
export const BrandedText: React.FC<{
  children: string;
  size?: BrandNameSize;
  style?: TextStyle;
}> = ({ children, size = 'medium', style }) => {
  // Extract color from style if present
  const color = style?.color as string | undefined;
  
  return React.createElement(
    Text, 
    { style }, 
    formatTextWithBranding(children, size, color)
  );
};
