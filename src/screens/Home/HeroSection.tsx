import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Image, Dimensions, Pressable } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

// Utility for responsive font scaling
const responsiveFontSize = (base: number, width: number, min: number = 16, max: number = 36): number => {
  // Example: base is the font size for 400px width, scale up/down linearly
  const scale = width / 400;
  const size = Math.round(base * scale);
  return Math.max(min, Math.min(size, max));
};

export interface HeroSectionProps {
  onAssessmentPress: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAssessmentPress }) => {
  const { theme } = useTheme();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  // Function to calculate image size based on window width
  const calculateImageSize = () => {
    const currentWidth = Dimensions.get('window').width;
    const imageWidth = 1536;
    const imageHeight = 1024;
    const scaledHeight = (currentWidth / imageWidth) * imageHeight;
    setImageSize({ width: currentWidth, height: scaledHeight });
    setWindowWidth(currentWidth);
  };

  useEffect(() => {
    calculateImageSize();
    if (Platform.OS === 'web') {
      window.addEventListener('resize', calculateImageSize);
      return () => {
        window.removeEventListener('resize', calculateImageSize);
      };
    }
  }, []);

  const content = {
    title: "AI Advisory & Enablement for Modern Enterprises",
    subtitle: "Guiding your organization’s AI journey—powered with Windsurf.",
    badge: "Official Windsurf Partner"
  };

  // Responsive font sizes
  const taglineFontSize = responsiveFontSize(22, windowWidth, 22, 96);
  const subtitleFontSize = responsiveFontSize(18, windowWidth, 16, 36);
  const taglineMargin = responsiveFontSize(8, windowWidth, 8, 28);
  const subtitleMargin = responsiveFontSize(16, windowWidth, 16, 28);

  return (
    <View style={styles.heroSection}>
      {/* Background image with scrim and content */}
      <View style={[styles.imageWrapper, { height: imageSize.height }]}> 
        <Image
          source={require('../../assets/images/execs-hologram.png')}
          style={[styles.heroImage, { width: imageSize.width, height: imageSize.height }]}
          resizeMode="cover"
        />
        
        {/* Scrim overlay */}
        <View style={styles.scrim} />
        
        {/* Minimal Overlay Content */}
        <View style={styles.overlayContent}>
          {/* Main headline */}
          <Text style={[styles.heroTagline, { fontSize: taglineFontSize, marginBottom: taglineMargin }]}>{content.title}</Text>
          {/* (Optional) Short subheadline */}
          <Text style={[styles.heroSubtitle, { fontSize: subtitleFontSize, marginBottom: subtitleMargin }]}>{content.subtitle}</Text>
        </View>
      </View>

      {/* Absolutely positioned logo container - rendered AFTER the image wrapper */}
      <View 
        style={[
          styles.absoluteLogoContainer, 
          { 
            bottom: 12 + (imageSize.height - windowWidth * 0.67) / 2, // Adjust for image aspect ratio
            right: 16,
            width: windowWidth < 500 ? 120 : 160,
            height: windowWidth < 500 ? 28 : 32,
          }
        ]}
        pointerEvents="box-none"
      >
        <Pressable
          onPress={() => {
            if (Platform.OS === 'web') {
              window.open('https://windsurf.com/refer?referral_code=877ab5e4f5', '_blank');
            }
          }}
          accessibilityRole="link"
          accessibilityLabel="Visit Windsurf partnership page (opens in new tab)"
          style={styles.pressableStyle}
        >
          <Image
            source={require('../../assets/windsurf_logo_white_wordmark.png')}
            style={styles.logoImage}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  imageWrapper: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 1,
  },
  overlayContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  heroTagline: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    maxWidth: 1000,
    lineHeight: 32,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  logoImage: {
    width: '100%', 
    height: '100%', 
    resizeMode: 'contain',
  },
  absoluteLogoContainer: {
    position: 'absolute',
    zIndex: 999,
    // Ensure it's on top in all platforms
    ...Platform.select({
      web: {
        // @ts-ignore - React Native Web specific
        willChange: 'transform',
      },
      android: {
        elevation: 10,
      }
    }),
  },
  pressableStyle: {
    width: '100%', 
    height: '100%',
  }
});
