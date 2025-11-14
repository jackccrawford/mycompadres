import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
  Modal,
  Share,
  Pressable,
  SafeAreaView,
  Dimensions,
  Alert,
  TextInput
} from 'react-native';
import {
  DownloadShareModal
} from '../components/DownloadShareModal';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { eventEmitter, EVENTS } from '../utils/eventEmitter';
import { Card, Button, Title, Paragraph, Divider, Surface, Chip, Switch } from 'react-native-paper';
import { TrendingUp, Activity, Users, Zap, Clock, Briefcase, Star, Award, ArrowUp, Code, Calendar, DollarSign, User, Sun, Moon } from 'react-native-feather';
import { useTheme } from '../contexts/ThemeContext';
import { VideoCarousel } from '../components/VideoCarousel';
import { typography } from '../utils/fontUtils';
import { YouTubeEmbed } from '../components/YouTubeEmbed';
import { TAB_NAMES } from '../navigation/ThemedNavigator';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import XIcon from '../components/icons/XIcon';
import { PrivacyModal } from './Home/PrivacyModal';
import { TosModal } from './Home/TosModal';
import { CookieBanner } from './Home/CookieBanner';
import { HeroSection } from './Home/HeroSection';
import { PartnershipSection } from './Home/PartnershipSection';
import { ImpactMetricsSection } from './Home/ImpactMetricsSection';
import { CTAButton } from '../components/CTAButton';
import styles from './HomeScreen.styles';
import { config } from '../config/env';

export const HomeScreen = () => {
  const { theme, setTheme, setThemeMode } = useTheme();
  const navigation = useNavigation<BottomTabNavigationProp<any>>();
  const isDark = theme.dark;
  const [isDarkMode, setIsDarkMode] = useState(isDark);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [buttonIsPressed, setButtonIsPressed] = useState(false);
  const [downloadShareVisible, setDownloadShareVisible] = useState<boolean>(false);
  const [shareContent, setShareContent] = useState({ title: '', message: '', url: '' });
  const [shareMessage, setShareMessage] = useState<string>('');
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState<boolean>(false);
  const [tosVisible, setTosVisible] = useState<boolean>(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState<boolean>(false);
  const [assessmentEmail, setAssessmentEmail] = useState<string>('');
  const [honeypotWebsite, setHoneypotWebsite] = useState<string>(''); // Honeypot field - bots will fill this
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [showCookieNotice, setShowCookieNotice] = useState<boolean>(true);
  const [showTestModal, setShowTestModal] = useState(false);

  // Add toggle theme function
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    // Use the proper ThemeContext API to set the theme mode
    setThemeMode(newMode ? 'dark' : 'light');
  };

  // Hidden easter egg navigation
  const navigateToSalesIntelligence = () => {
    // @ts-ignore - Type safety will be handled by the navigator
    navigation.navigate('SalesIntelligenceScreen');
  };

  // Check if the device is a mobile device (including mobile web browsers)
  const isMobileDevice = () => {
    if (Platform.OS !== 'web') return true;

    // Check for touch capability first (most reliable for modern devices)
    if ('ontouchstart' in window) return true;

    // Fallback to user agent check for older browsers
    const userAgent = navigator.userAgent.toLowerCase();
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
  };

  // Check if Web Share API is available
  const isWebShareAvailable = () => {
    return Platform.OS === 'web' && navigator.share !== undefined;
  };

  // Function to navigate to Windsurf Partnership screen in-app using correct tab name
  const goToWindsurfPartnership = () => {
    // Use the navigation prop to go to the WindsurfPartnership tab route (hidden tab)
    navigation.navigate('WindsurfPartnership');
  };

  // Function to share Windsurf download link with platform-specific behavior
  const shareWindsurfDownloadLink = () => {
    const downloadUrl = 'https://windsurf.com/refer?referral_code=877ab5e4f5';
    const message = 'Install Windsurf on your Mac, Windows, or Linux and be among the first to define the next generation of work. Download:\n' + downloadUrl;
    setShareMessage(message);

    const isDesktopWeb = Platform.OS === 'web' && !isMobileDevice();

    if (!isDesktopWeb) {
      if (Platform.OS !== 'web') {
        // Use native Share API on native mobile platforms
        Share.share({
          message: message,
          url: downloadUrl
        }).catch((error: Error) => {
          console.error('Error sharing:', error);
        });
      } else if (isWebShareAvailable()) {
        // For mobile web, use the Web Share API if available
        navigator.share({
          title: 'Download Windsurf!',
          text: message,
          url: downloadUrl
        }).catch((error: Error) => {
          console.error('Error sharing:', error);
          // Fall back to custom share modal if Web Share API fails
          setDownloadShareVisible(true);
        });
      } else {
        // Use custom download share modal as fallback
        setDownloadShareVisible(true);
      }
    } else {
      // On desktop web, open the download link directly in a new tab
      window.open(downloadUrl, '_blank');
    }
  };

  // Listen for the double-tap event on the logo
  useEffect(() => {
    // Subscribe to the event
    eventEmitter.on(EVENTS.NAVIGATE_TO_SALES_INTELLIGENCE, navigateToSalesIntelligence);

    // Cleanup when component unmounts
    return () => {
      eventEmitter.off(EVENTS.NAVIGATE_TO_SALES_INTELLIGENCE, navigateToSalesIntelligence);
    };
  }, []);

  // Check if cookie notice has been accepted before
  useEffect(() => {
    if (Platform.OS === 'web') {
      const cookiePreference = localStorage.getItem('mvara-cookie-preference');
      if (cookiePreference === 'accepted' || cookiePreference === 'declined') {
        setShowCookieNotice(false);
      }
    }
  }, []);

  // Function to accept cookies
  const acceptCookies = () => {
    setShowCookieNotice(false);
    if (Platform.OS === 'web') {
      localStorage.setItem('mvara-cookie-preference', 'accepted');
    }
  };

  // Function to decline cookies
  const declineCookies = () => {
    setShowCookieNotice(false);
    if (Platform.OS === 'web') {
      localStorage.setItem('mvara-cookie-preference', 'declined');
      // In a real implementation, you would disable any non-essential cookies here
    }
  };

  // Set the tab title to "Home" for user visibility
  useEffect(() => {
    navigation.setOptions?.({
      title: 'Home',
    });
  }, [navigation]);

  const API_URL = config.apiBaseUrl;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          { backgroundColor: theme.colors.background },
          showCookieNotice && styles.scrollViewWithCookieNotice
        ]}
      >
        {/* Hero Section */}
        <HeroSection onAssessmentPress={() => setShowAssessmentModal(true)} />

        {/* Executive Challenges Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            EXECUTIVE CHALLENGES
          </Text>

          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <View style={styles.challengeItem}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
                  <Clock width={24} height={24} color="#FFFFFF" />
                </View>
                <View style={styles.challengeTextContainer}>
                  <Text style={[styles.challengeTitle, { color: theme.colors.onSurface }]}>
                    Accelerating Time-to-Market
                  </Text>
                  <Text style={[styles.challengeDescription, { color: theme.colors.onSurfaceVariant }]}>
                    Competitive pressure to deliver faster with existing resources
                  </Text>
                </View>
              </View>

              <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />

              <View style={styles.challengeItem}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
                  <Users width={24} height={24} color="#FFFFFF" />
                </View>
                <View style={styles.challengeTextContainer}>
                  <Text style={[styles.challengeTitle, { color: theme.colors.onSurface }]}>
                    Talent Optimization
                  </Text>
                  <Text style={[styles.challengeDescription, { color: theme.colors.onSurfaceVariant }]}>
                    Maximizing productivity of high-cost knowledge workers
                  </Text>
                </View>
              </View>

              <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />

              <View style={styles.challengeItem}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
                  <TrendingUp width={24} height={24} color="#FFFFFF" />
                </View>
                <View style={styles.challengeTextContainer}>
                  <Text style={[styles.challengeTitle, { color: theme.colors.onSurface }]}>
                    AI Transformation ROI
                  </Text>
                  <Text style={[styles.challengeDescription, { color: theme.colors.onSurfaceVariant }]}>
                    Demonstrating measurable returns on AI investments
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        <PartnershipSection onDiscover={goToWindsurfPartnership} />

        <ImpactMetricsSection onCalculate={() => navigation.navigate('Edge')} />

        {/* Executive Success Stories */}
        {/*
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>EXECUTIVE SUCCESS STORIES</Text>
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.testimonial, { color: theme.colors.onSurfaceVariant }]}>"mVara's AI transformation strategy allowed us to compress our product development cycle by 40% while maintaining the same headcount. The ROI was evident within the first quarter."</Text>
              <Text style={[styles.testimonialAuthor, { color: theme.colors.onSurface }]}>— CTO, Fortune 500 Technology Company</Text>
              <Divider style={[styles.divider, { backgroundColor: theme.colors.outline, marginVertical: 16 }]} />
              <Text style={[styles.testimonial, { color: theme.colors.onSurfaceVariant }]}>"As a CFO, I was skeptical about another AI initiative. mVara's approach was different - focused on measurable outcomes and quick wins that built credibility for larger transformation."</Text>
              <Text style={[styles.testimonialAuthor, { color: theme.colors.onSurface }]}>— CFO, Global Manufacturing Enterprise</Text>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="outlined" 
                onPress={() => navigation.navigate('Impact')}
                style={{ borderColor: theme.colors.primary }}
                labelStyle={{ color: theme.colors.primary }}
              >
                View Case Studies
              </Button>
            </Card.Actions>
          </Card>
        </View>
        */}

        {/* AI Assessment CTA */}
        <View style={styles.section}>
          <Card style={[styles.ctaCard, { backgroundColor: theme.colors.primaryContainer }]}>
            <Card.Content>
              <Text style={[styles.ctaTitle, { color: theme.colors.onPrimaryContainer }]}>
                AI Readiness Assessment
              </Text>
              <Text style={[styles.ctaDescription, { color: theme.colors.onPrimaryContainer }]}>
                Get a personalized analysis of your organization's AI transformation potential
              </Text>
            </Card.Content>
            <Card.Actions style={{ width: '100%' }}>
              <View style={styles.assessmentButtonContainer}>
                <CTAButton
                  label="AI Readiness Assessment"
                  onPress={() => setShowAssessmentModal(true)}
                  style={styles.assessmentButton}
                />
              </View>
            </Card.Actions>
          </Card>
        </View>
        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: theme.colors.surface }]}>
          <Divider style={styles.footerDivider} />
          <View style={[styles.footerLinks, { marginBottom: 8 }]}>
            <TouchableOpacity
              accessibilityRole="link"
              onPress={() => Linking.openURL('https://www.linkedin.com/company/mvara')}
              style={{ marginHorizontal: 8 }}
            >
              <LinkedInIcon size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="link"
              onPress={() => Linking.openURL('https://x.com/mvaraai')}
              style={{ marginHorizontal: 8 }}
            >
              <XIcon size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.footerCopyright, { color: theme.colors.onSurfaceVariant, textAlign: 'center' }]}>Copyright {'\u00A9'} 2025 mVara. All rights reserved.</Text>
          <Text style={[styles.footerAddress, { color: theme.colors.onSurfaceVariant, textAlign: 'center' }]}>Irvine, California | Scottsdale, Arizona</Text>
        </View>
      </ScrollView>

      {/* Assessment Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAssessmentModal}
        onRequestClose={() => setShowAssessmentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: theme.dark ? theme.colors.surface : 'white' }]}
            onStartShouldSetResponder={() => true}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[styles.modalTitle, { color: theme.colors.onSurface, flex: 1 }]}>Get AI Assessment</Text>
              <TouchableOpacity
                style={[styles.closeButton, theme.dark ? { backgroundColor: 'rgba(255, 255, 255, 0.1)' } : {}]}
                onPress={() => setShowAssessmentModal(false)}
                accessibilityLabel="Close modal"
              >
                <Text style={{ fontSize: 24, color: theme.dark ? '#FFFFFF' : theme.colors.onSurface }}>×</Text>
              </TouchableOpacity>
            </View>
            <Text style={[
              styles.modalText,
              { color: theme.dark ? 'rgba(255, 255, 255, 0.9)' : theme.colors.onSurfaceVariant }
            ]}>Our AI Readiness Assessment provides a rapid analysis of your organization's potential for AI-powered knowledge work transformation.</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.dark ? 'rgba(255, 255, 255, 0.9)' : theme.colors.outline,
                  color: theme.dark ? '#FFFFFF' : theme.colors.onSurface
                }
              ]}
              placeholder="Enter your work email"
              placeholderTextColor={theme.colors.onSurfaceVariant}
              value={assessmentEmail}
              onChangeText={setAssessmentEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              returnKeyType="send"
              onSubmitEditing={() => {
                if (!isSubmitting && assessmentEmail) {
                  setIsSubmitting(true);
                  setSubmitError('');
                  setSubmitSuccess(false);
                  fetch(`${config.apiBaseUrl}/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email: assessmentEmail,
                      name: 'AI Assessment Request',
                      message: 'Requesting AI Assessment',
                      website: honeypotWebsite, // Honeypot field
                    }),
                  })
                    .then(async (res) => {
                      if (!res.ok) throw new Error('Submission failed');
                      setSubmitSuccess(true);
                    })
                    .catch((err) => setSubmitError(err.message))
                    .finally(() => setIsSubmitting(false));
                }
              }}
              editable={!isSubmitting && !submitSuccess}
            />
            {/* Honeypot field - hidden from users, bots will fill it */}
            <TextInput
              style={{ position: 'absolute', left: -9999, opacity: 0, height: 0 }}
              placeholder="Website"
              value={honeypotWebsite}
              onChangeText={setHoneypotWebsite}
              tabIndex={-1}
              autoComplete="off"
            />
            {submitError ? (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>{submitError}</Text>
            ) : null}
            {!submitSuccess ? (
              <CTAButton
                label={isSubmitting ? 'Submitting...' : 'Submit Request'}
                onPress={() => {
                  if (!isSubmitting && assessmentEmail) {
                    setIsSubmitting(true);
                    setSubmitError('');
                    setSubmitSuccess(false);
                    
                    fetch(`${config.apiBaseUrl}/contact`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        email: assessmentEmail,
                        name: 'AI Assessment Request',
                        message: 'Requesting AI Assessment',
                        website: honeypotWebsite, // Honeypot field
                      }),
                    })
                      .then(async (res) => {
                        if (!res.ok) throw new Error('Submission failed');
                        setSubmitSuccess(true);
                      })
                      .catch((err) => setSubmitError(err.message))
                      .finally(() => setIsSubmitting(false));
                  }
                }}
                disabled={isSubmitting}
                style={{ 
                  width: '100%', 
                  maxWidth: 320, 
                  alignSelf: 'center', 
                  marginTop: 16,
                  borderRadius: 9999 // Ensuring pill shape
                }}
              />
            ) : (
              <View style={styles.successContainer}>
                <Text style={[
                  styles.successText,
                  { color: theme.dark ? '#FFFFFF' : theme.colors.primary }
                ]}>Thank you! We've received your request and will follow up soon.</Text>
                <CTAButton
                  label="Close"
                  onPress={() => {
                    setShowAssessmentModal(false);
                    setTimeout(() => {
                      setAssessmentEmail('');
                      setSubmitSuccess(false);
                    }, 300);
                  }}
                  style={{ 
                    width: '100%', 
                    maxWidth: 320, 
                    alignSelf: 'center', 
                    marginTop: 16,
                    borderRadius: 9999 // Ensuring pill shape
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>

      <PrivacyModal
        visible={privacyPolicyVisible}
        onClose={() => setPrivacyPolicyVisible(false)}
      />

      <TosModal
        visible={tosVisible}
        onClose={() => setTosVisible(false)}
      />

      {/* Download Share Modal */}
      <DownloadShareModal
        visible={downloadShareVisible}
        onDismiss={() => setDownloadShareVisible(false)}
        message={shareContent.message}
        url={shareContent.url}
        title={shareContent.title || 'Save Download Link'}
      />

      <CookieBanner
        visible={showCookieNotice}
        onAccept={acceptCookies}
        onDecline={declineCookies}
        onViewPolicy={() => setPrivacyPolicyVisible(true)}
      />

      {/* Test Modal for Windsurf Button Click */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showTestModal}
        onRequestClose={() => setShowTestModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: 'white' }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>
              Button Clicked!
            </Text>
            <Text style={[styles.modalText, { color: theme.colors.onSurfaceVariant }]}>
              The Windsurf button was clicked successfully.
            </Text>
            <Button
              mode="contained"
              onPress={() => {
                setShowTestModal(false);
                // Continue with navigation after confirmation
                navigation.navigate(TAB_NAMES.WINDSURF_PARTNERSHIP as never);
              }}
              style={{ marginTop: 16, backgroundColor: theme.colors.primary }}
            >
              Continue to Windsurf Partnership
            </Button>
            <Button
              mode="outlined"
              onPress={() => setShowTestModal(false)}
              style={{ marginTop: 8, borderColor: theme.colors.primary }}
              labelStyle={{ color: theme.colors.primary }}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};