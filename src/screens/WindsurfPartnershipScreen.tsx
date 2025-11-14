import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Platform,
  Linking,
  Dimensions,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Card, Button, Divider, Surface, Chip } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { YouTubeEmbed } from '../components/YouTubeEmbed';
import { Check, Shield, Zap, Briefcase, Server, Users, Code, ArrowLeft } from 'lucide-react-native';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import XIcon from '../components/icons/XIcon';

export const WindsurfPartnershipScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  // Function to handle back button press
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Function to handle assessment request
  const requestAssessment = () => {
    // Navigate back to home screen and trigger assessment modal
    navigation.navigate('Home' as never);
    // We'll need to add an event emitter to trigger the assessment modal
    setTimeout(() => {
      // This is a placeholder - we'll need to implement this event
      // eventEmitter.emit(EVENTS.OPEN_ASSESSMENT_MODAL);
    }, 300);
  };

  // Function to handle demo scheduling
  const scheduleDemo = () => {
    Linking.openURL('https://calendly.com/mvara-demo/windsurf-strategic-demo');
  };

  // Function to handle executive brief download
  const downloadBrief = () => {
    Linking.openURL('https://mvara.com/resources/windsurf-executive-brief.pdf');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          accessibilityLabel="Go back"
          accessibilityHint="Returns to the previous screen"
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <View style={[styles.logoContainer, { flexDirection: 'row', alignItems: 'center', gap: 16 }]}>
            {theme.dark ? (
              <>
                <Image
                  source={require('../assets/mvara-logo-black.png')}
                  style={[styles.logo, { marginTop: 0, marginRight: 12, height: 32, width: 80 }]}
                  resizeMode="contain"
                />
                <Image
                  source={require('../assets/windsurf_logo_white_wordmark.png')}
                  style={[styles.logo, { marginTop: 4, height: 40, width: 130 }]}
                  resizeMode="contain"
                />
              </>
            ) : (
              <>
                <Image
                  source={require('../assets/mvara-logo-white.png')}
                  style={[styles.logo, { marginTop: 0, marginRight: 12, height: 32, width: 80 }]}
                  resizeMode="contain"
                />
                <Image
                  source={require('../assets/windsurf_logo_black_wordmark.png')}
                  style={[styles.logo, { marginTop: 4, height: 40, width: 130 }]}
                  resizeMode="contain"
                />
              </>
            )}
          </View>

          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>
            Accelerate Growth, Mitigate Risk, and Optimize Talent with AI-Assisted Knowledge Work
          </Text>
        </View>

        {/* Executive Value Proposition */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
              EXECUTIVE VALUE PROPOSITION
            </Text>
            <Text style={[styles.valueProposition, { color: theme.colors.onSurface }]}>
              "Transform unstructured knowledge into a single source of truth—so your decisions, workflows, and innovations always align with reality."
            </Text>

            <Text style={[styles.bodyText, { color: theme.colors.onSurfaceVariant }]}>
              In today's rapidly evolving market, executives grapple with siloed data, compliance challenges, and shrinking talent pools. Windsurf's AI platform addresses these challenges head-on, bridging knowledge gaps and reinforcing your governance strategy—all while future-proofing your operations.
            </Text>
          </Card.Content>
        </Card>

        {/* Key Executive Challenges */}
        <Text style={[styles.mainSectionTitle, { color: theme.colors.text }]}>
          KEY EXECUTIVE CHALLENGES & HOW WINDSURF DELIVERS
        </Text>

        {/* Challenge 1 */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.challengeHeader}>
              <Zap size={24} color={theme.colors.primary} />
              <Text style={[styles.challengeTitle, { color: theme.colors.onSurface }]}>
                1. Eliminate Operational Inefficiencies & Hidden Costs
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Cut operational backlogs by up to 40%—freeing your teams to focus on revenue-driving initiatives
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Break down knowledge silos that slow progress, reducing time-to-market by up to 30%
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Seamlessly integrate disparate systems to accelerate critical processes by 35%
              </Text>
            </View>

            <View style={styles.testimonial}>
              <Text style={[styles.testimonialText, { color: theme.colors.onSurfaceVariant }]}>
                "Organizations using Windsurf have reduced processing times by 30%—freeing staff to focus on high-value interactions that increased customer satisfaction scores by 22%."
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Challenge 2 */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.challengeHeader}>
              <Shield size={24} color={theme.colors.primary} />
              <Text style={[styles.challengeTitle, { color: theme.colors.onSurface }]}>
                2. Enhance Governance & Risk Management
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                <Text style={{ fontWeight: 'bold' }}>
                  "Code is Truth" Foundation:
                </Text> Eliminate misalignment between documentation and reality, cutting down on hidden costs and error-prone manual processes
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                <Text style={{ fontWeight: 'bold' }}>
                  Proactive Risk Prevention:
                </Text> Transparent workflows and real-time monitoring identify potential issues before they impact operations
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Create audit-ready systems with full traceability that reduce compliance preparation time by 50%
              </Text>
            </View>

            {/* Adding security point from ChatGPT's feedback */}
            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                <Text style={{ fontWeight: 'bold' }}>
                  Enterprise-Grade Security:
                </Text> Built-in encryption, role-based access controls, and compliance frameworks (GDPR, SOX, HIPAA) ensure your data remains protected
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Challenge 3 */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.challengeHeader}>
              <Users size={24} color={theme.colors.primary} />
              <Text style={[styles.challengeTitle, { color: theme.colors.onSurface }]}>
                3. Protect & Leverage Organizational Knowledge
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Transform tacit knowledge into explicit, accessible organizational assets that survive employee turnover
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Reduce dependency on individual specialists by 75%, ensuring business continuity during transitions
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Create an institutional memory that provides consistent decision-making across teams, regardless of personnel changes
              </Text>
            </View>

            {/* Adding cultural impact point from ChatGPT's feedback */}
            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Foster a culture of continuous learning, enabling employees to upskill rather than fear job displacement
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Challenge 4 */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.challengeHeader}>
              <Briefcase size={24} color={theme.colors.primary} />
              <Text style={[styles.challengeTitle, { color: theme.colors.onSurface }]}>
                4. Drive Innovation & Strategic Agility
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Enable rapid experimentation with new initiatives at 40% lower cost and 60% faster deployment
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                <Text style={{ fontWeight: 'bold' }}>
                  Future-Proof Your Organization:
                </Text> Deploy AI-driven workflows that adapt to changing regulations, customer needs, and market trends—without overhauling existing infrastructure
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Position your organization as an AI-forward workplace to attract top talent, improving retention by 25%
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Windsurf Advantage */}
        <Text style={[styles.mainSectionTitle, { color: theme.colors.text }]}>
          THE WINDSURF ADVANTAGE
        </Text>

        {/* Immediate Impact */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
              IMMEDIATE IMPACT
            </Text>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Measurable productivity gains within the first 30 days—one customer saw a 25% rise in on-time deliverables within their first month
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                No specialized AI expertise required—Windsurf slots into your existing environment without major process overhaul
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Integrates with existing workflows without disrupting operations or requiring expensive retraining
              </Text>
            </View>

            {/* Adding integration point from ChatGPT's feedback */}
            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Seamlessly integrates with your existing CRM, ERP, and collaboration platforms—no new silos or fragmented systems
              </Text>
            </View>

            {/* Adding ROI point from ChatGPT's feedback */}
            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Most clients see a 3x return on investment within the first year, with minimal additional overhead
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Executive-Level Control */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
              EXECUTIVE-LEVEL CONTROL
            </Text>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Comprehensive dashboards provide visibility into AI usage and impact across your organization
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Governance frameworks ensure consistent implementation and compliance across teams
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Strategic resource allocation insights for optimizing talent deployment and identifying high-ROI opportunities
              </Text>
            </View>

            {/* Adding scalability point from ChatGPT's feedback */}
            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                <Text style={{ fontWeight: 'bold' }}>
                  Enterprise Scalability:
                </Text> Designed to scale from pilot projects to global enterprise deployments without requiring massive re-architecture
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Video Section */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
              JACK CRAWFORD, mVara CEO
            </Text>

            <View style={styles.videoContainer}>
              <YouTubeEmbed
                videoId="uSL8lsDf354"
                width={Platform.OS === 'web' ? 560 : Dimensions.get('window').width - 64}
                height={315}
              />
            </View>
          </Card.Content>
        </Card>

        {/* Implementation Path */}
        <Text style={[styles.mainSectionTitle, { color: theme.colors.text }]}>
          IMPLEMENTATION PATH
        </Text>

        {/* Phase 1 */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.phaseTitle, { color: theme.colors.primary }]}>
              PHASE 1: DISCOVERY & ASSESSMENT (1-2 WEEKS)
            </Text>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Identify highest-value workflows for initial implementation
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Establish baseline metrics and success criteria
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Develop customized integration strategy
              </Text>
            </View>

            <View style={styles.outcome}>
              <Text style={[styles.outcomeText, { color: theme.colors.primary }]}>
                OUTCOME: A clear roadmap to ROI with identified key metrics and quick wins
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Phase 2 */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.phaseTitle, { color: theme.colors.primary }]}>
              PHASE 2: PILOT IMPLEMENTATION (30 DAYS)
            </Text>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Deploy Windsurf in one critical process area
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Train key personnel and establish governance protocols
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Document initial efficiency gains and ROI
              </Text>
            </View>

            <View style={styles.outcome}>
              <Text style={[styles.outcomeText, { color: theme.colors.primary }]}>
                OUTCOME: Documented efficiency gains and user adoption rates with minimal disruption
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Phase 3 */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.phaseTitle, { color: theme.colors.primary }]}>
              PHASE 3: MEASURED EXPANSION (60-90 DAYS)
            </Text>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Scale based on validated metrics from pilot phase
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Implement cross-functional knowledge sharing
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Check size={18} color={theme.colors.primary} style={styles.bulletIcon} />
              <Text style={[styles.bulletText, { color: theme.colors.onSurfaceVariant }]}>
                Establish long-term performance benchmarks
              </Text>
            </View>

            <View style={styles.outcome}>
              <Text style={[styles.outcomeText, { color: theme.colors.primary }]}>
                OUTCOME: Strategic scaling plan for broader teams and more complex processes with predictable results
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* BEGIN TEMP HIDE NEXT STEPS SECTION */}
        {/* 
        <Text style={[styles.mainSectionTitle, { color: theme.colors.text }]}> 
          NEXT STEPS
        </Text>

        <View style={styles.ctaContainer}>
          <Button
            mode="contained"
            onPress={requestAssessment}
            style={[styles.ctaButton, { backgroundColor: theme.colors.primary }]}
            labelStyle={{ color: theme.colors.text }}
          >
            Request Executive Assessment
          </Button>
          <Text style={[styles.ctaDescription, { color: theme.colors.onSurfaceVariant }]}> 
            Within 48 hours, we'll deliver a custom roadmap detailing your biggest ROI opportunities.
          </Text>

          <Button
            mode="outlined"
            onPress={scheduleDemo}
            style={[styles.ctaButton, { borderColor: theme.colors.primary, marginTop: 24 }]}
            labelStyle={{ color: theme.colors.primary }}
          >
            Schedule Strategic Demo
          </Button>
          <Text style={[styles.ctaDescription, { color: theme.colors.onSurfaceVariant }]}> 
            We'll focus on your top 1-2 workflows, walking through real use cases tailored to your environment.
          </Text>

          <Button
            mode="outlined"
            onPress={downloadBrief}
            style={[styles.ctaButton, { borderColor: theme.colors.primary, marginTop: 24 }]}
            labelStyle={{ color: theme.colors.primary }}
          >
            Download Executive Brief
          </Button>
          <Text style={[styles.ctaDescription, { color: theme.colors.onSurfaceVariant }]}> 
            Get a concise, data-driven guide covering best practices and lessons learned from our partners.
          </Text>
        </View>
        */}
        {/* END TEMP HIDE NEXT STEPS SECTION */}

        {/* BEGIN TEMP HIDE TRUSTED BY SECTION */}
        {/*
        <Card style={[styles.card, { backgroundColor: theme.colors.surface, marginBottom: 40 }]}> 
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary, textAlign: 'center' }]}> 
              TRUSTED BY INDUSTRY LEADERS
            </Text>
            <Text style={[styles.comingSoon, { color: theme.colors.onSurfaceVariant, textAlign: 'center' }]}> 
              Client logos coming soon
            </Text>
          </Card.Content>
        </Card>
        */}
        {/* END TEMP HIDE TRUSTED BY SECTION */}

        {/* Footer */}
        <View style={[{ marginTop: 48, marginBottom: 24, paddingHorizontal: 16, alignItems: 'center', backgroundColor: theme.colors.surface }]}>
          <View style={{ height: 1, width: '100%', backgroundColor: theme.colors.outline, marginBottom: 24 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
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
          <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>Copyright {'\u00A9'} 2025 mVara. All rights reserved.
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 16, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>Irvine, California | Scottsdale, Arizona</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heroContainer: {
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  logoContainer: {
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  logo: {
    height: 60,
    width: 200,
    resizeMode: 'contain',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'left',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 1,
  },
  mainSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
    letterSpacing: 1,
  },
  valueProposition: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 16,
    lineHeight: 28,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bulletIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  testimonial: {
    marginTop: 16,
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#888',
  },
  testimonialText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  outcome: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  outcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  ctaContainer: {
    marginVertical: 24,
  },
  ctaButton: {
    borderRadius: 28,
    paddingVertical: 8,
  },
  ctaDescription: {
    fontSize: 14,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  comingSoon: {
    fontSize: 16,
    marginTop: 16,
  },
  backButton: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
});
