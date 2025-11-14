import React from 'react';
import { View, Text, Image, StyleSheet, Platform, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useTheme } from '../../contexts/ThemeContext';
import { YouTubeEmbed } from '../../components/YouTubeEmbed';
import { Shield, ArrowRightLeft, Lightbulb } from 'lucide-react-native';

export interface PartnershipSectionProps {
  onDiscover: () => void;
}

export const PartnershipSection: React.FC<PartnershipSectionProps> = ({ onDiscover }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Premier Reseller Partner</Text>
      <View style={styles.cardWrapper}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.partnershipContainer}>
              {/* Logo container with improved visibility */}
              <View style={styles.partnerLogoContainer}>
                <Image
                  source={theme.dark
                    ? require('../../assets/windsurf_logo_white_wordmark.png')
                    : require('../../assets/windsurf_logo_black_wordmark.png')
                  }
                  style={styles.windsurfLogo}
                  resizeMode="contain"
                />
              </View>

              <Text style={[styles.partnershipTagline, { color: theme.colors.onSurface }]}>
                Enterprise-grade AI built for business reality
              </Text>

              <View style={styles.videoContainer}>
                <YouTubeEmbed
                  videoId="uSL8lsDf354"
                  fullWidth={true}
                  height={315}
                />
              </View>

              <View style={styles.benefitsContainer}>
                <View style={styles.benefitItem}>
                  <Shield
                    color={theme.colors.primary}
                    size={32}
                    style={styles.benefitIcon}
                  />
                  <Text style={[styles.benefitText, { color: theme.colors.onSurfaceVariant }]}>
                    Secure knowledge infrastructure built for your enterprise data
                  </Text>
                </View>

                <View style={styles.benefitItem}>
                  <ArrowRightLeft
                    color={theme.colors.primary}
                    size={32}
                    style={styles.benefitIcon}
                  />
                  <Text style={[styles.benefitText, { color: theme.colors.onSurfaceVariant }]}>
                    Seamless integration with existing workflows and systems
                  </Text>
                </View>

                <View style={styles.benefitItem}>
                  <Lightbulb
                    color={theme.colors.primary}
                    size={32}
                    style={styles.benefitIcon}
                  />
                  <Text style={[styles.benefitText, { color: theme.colors.onSurfaceVariant }]}>
                    AI that respects your governance and compliance requirements
                  </Text>
                </View>
              </View>

              <Button
                mode="contained"
                onPress={onDiscover}
                style={[
                  styles.partnershipButton,
                  {
                    backgroundColor: theme.dark ? '#232E85' : '#1A237E',
                    borderColor: 'transparent',
                    alignSelf: 'center',
                  }
                ]}
                labelStyle={{ color: theme.dark ? '#fff' : '#fff', fontWeight: 'bold' }}
              >
                Joint Value Proposition
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 24,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  card: {
    borderRadius: 12,
  },
  cardWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  partnershipContainer: {
    padding: 24,
    alignItems: 'center',
  },
  partnerLogoContainer: {
    width: 280,
    height: 80,
    marginBottom: 16,
    // Ensure logo is properly visible
    zIndex: 10,
  },
  windsurfLogo: {
    width: '100%',
    height: '100%'
  },
  partnershipTagline: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  videoContainer: {
    width: '100%',
    maxWidth: '100%',
    height: 315,
    marginVertical: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  benefitsContainer: {
    width: '100%',
    marginVertical: 24,
    ...Platform.select({
      web: {
        '@media (min-width: 768px)': {
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        },
      },
    }),
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    ...Platform.select({
      web: {
        '@media (min-width: 768px)': {
          width: '31%',
          minHeight: 120,
          alignItems: 'flex-start',
        },
      },
    }),
  },
  benefitIcon: {
    marginRight: 12,
  },
  benefitText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
  partnershipButton: {
    marginTop: 16,
  },
});
