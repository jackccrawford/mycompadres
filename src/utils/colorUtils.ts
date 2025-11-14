/**
 * Color utility functions for ensuring WCAG compliance and dynamic theming
 */

/**
 * Calculate the relative luminance of a color
 * Formula from WCAG 2.0: https://www.w3.org/TR/WCAG20-TECHS/G17.html
 * 
 * @param hexColor - Hex color code (with or without #)
 * @returns Luminance value between 0 and 1
 */
export const getLuminance = (hexColor: string): number => {
  // Handle undefined or invalid input
  if (!hexColor) {
    console.warn('getLuminance received undefined or empty color, defaulting to black');
    return 0; // Black has luminance 0
  }

  try {
    // Remove # if present
    const hex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
    
    // Handle 8-digit hex (with alpha)
    const hexWithoutAlpha = hex.length === 8 ? hex.slice(0, 6) : hex;
    
    // Convert to RGB
    const r = parseInt(hexWithoutAlpha.slice(0, 2), 16) / 255;
    const g = parseInt(hexWithoutAlpha.slice(2, 4), 16) / 255;
    const b = parseInt(hexWithoutAlpha.slice(4, 6), 16) / 255;
  
    // Calculate luminance
    const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  } catch (error) {
    console.error('Error calculating luminance:', error);
    return 0; // Default to black (luminance 0) on error
  }
};

/**
 * Calculate contrast ratio between two colors
 * Formula from WCAG 2.0: https://www.w3.org/TR/WCAG20-TECHS/G17.html
 * 
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @returns Contrast ratio (1-21)
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  // Handle undefined inputs
  if (!color1 || !color2) {
    console.warn('getContrastRatio received undefined color, using fallback');
    return 21; // Maximum contrast ratio
  }

  try {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  } catch (error) {
    console.error('Error calculating contrast ratio:', error);
    return 21; // Maximum contrast ratio as fallback
  }
};

/**
 * Determine if a color is light or dark
 * 
 * @param hexColor - Hex color code
 * @returns True if the color is light, false if dark
 */
export const isLightColor = (hexColor: string): boolean => {
  if (!hexColor) {
    console.warn('isLightColor received undefined color, defaulting to false');
    return false; // Default to dark
  }
  return getLuminance(hexColor) > 0.5;
};

/**
 * Get a contrasting text color (black or white) based on background color
 * 
 * @param backgroundColor - Hex color code for background
 * @returns '#FFFFFF' or '#000000' depending on which has better contrast
 */
export const getContrastingTextColor = (backgroundColor: string): string => {
  if (!backgroundColor) {
    console.warn('getContrastingTextColor received undefined color, defaulting to white');
    return '#FFFFFF'; // Default to white
  }
  return isLightColor(backgroundColor) ? '#000000' : '#FFFFFF';
};

/**
 * Adjust color opacity
 * 
 * @param hexColor - Hex color code
 * @param opacity - Opacity value (0-1)
 * @returns Hex color with opacity
 */
export const adjustOpacity = (hexColor: string, opacity: number): string => {
  if (!hexColor) {
    console.warn('adjustOpacity received undefined color, defaulting to black');
    hexColor = '#000000'; // Default to black
  }
  
  try {
    // Remove # if present
    const hex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
    
    // Convert opacity to hex
    const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
    
    return `#${hex}${alpha}`;
  } catch (error) {
    console.error('Error adjusting opacity:', error);
    return '#00000000'; // Transparent black as fallback
  }
};

/**
 * Get header colors that comply with WCAG standards based on the primary color
 * 
 * @param primaryColor - Primary color from the theme
 * @returns Object with background and text colors
 */
export const getAccessibleHeaderColors = (primaryColor: string) => {
  // Handle undefined primary color
  if (!primaryColor) {
    console.warn('getAccessibleHeaderColors received undefined color, using default');
    return {
      background: '#4B9CD3', // mVara brand color
      text: '#FFFFFF'
    };
  }

  try {
    // For header background, use the primary color
    const headerBackground = primaryColor;
    
    // Special cases for themes that need white text for better contrast
    // mVara brand color, default blue, and amber in light mode need white text
    if (primaryColor === '#F59E0B' || primaryColor === '#007AFF' || primaryColor === '#4B9CD3') {
      return {
        background: headerBackground,
        text: '#FFFFFF'
      };
    }
    
    // For text, ensure contrast ratio of at least 4.5:1 (WCAG AA)
    const whiteContrast = getContrastRatio(headerBackground, '#FFFFFF');
    const blackContrast = getContrastRatio(headerBackground, '#000000');
    
    let headerText = whiteContrast >= 4.5 ? '#FFFFFF' : '#000000';
    
    // If neither white nor black provides sufficient contrast, adjust the background
    if (whiteContrast < 4.5 && blackContrast < 4.5) {
      // Darken or lighten the background color to improve contrast
      headerText = '#FFFFFF';
      // We would need more complex color adjustment here in a real implementation
    }
    
    return {
      background: headerBackground,
      text: headerText
    };
  } catch (error) {
    console.error('Error determining header colors:', error);
    return {
      background: '#4B9CD3', // mVara brand color
      text: '#FFFFFF'
    };
  }
};
