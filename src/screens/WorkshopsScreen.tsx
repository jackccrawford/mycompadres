import React from 'react';
import { StyleSheet, View, Text, ScrollView, Platform, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Card, Button, Title, Paragraph, Divider, Chip, Avatar } from 'react-native-paper';
import { Users, Calendar, Clock, Award, CheckCircle, Zap } from 'lucide-react-native';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import XIcon from '../components/icons/XIcon';
import { Linking } from 'react-native';

export const WorkshopsScreen = () => {
  const { theme } = useTheme();

  // Workshop outcomes
  const workshopOutcomes = [
    {
      title: "Shared Mental Models",
      description: "Create a common understanding between technical and business teams",
      icon: <Users size={24} color={theme.colors.primary} />
    },
    {
      title: "Ecological Integration",
      description: "Learn to enhance existing systems rather than replacing them",
      icon: <Zap size={24} color={theme.colors.primary} />
    },
    {
      title: "Translation Protocols",
      description: "Establish effective communication patterns between different stakeholders",
      icon: <CheckCircle size={24} color={theme.colors.primary} />
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "The JumpStart workshop transformed how our teams communicate. We've eliminated countless misunderstandings and accelerated our development process.",
      author: "Sarah Chen",
      role: "CTO, HealthTech Solutions",
      avatar: "SC"
    },
    {
      quote: "By focusing on enhancing our existing systems rather than replacing them, we've achieved remarkable improvements with minimal disruption.",
      author: "Michael Rodriguez",
      role: "VP Engineering, DataFlow Systems",
      avatar: "MR"
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Hero Section */}
        <View style={[styles.heroBanner, { backgroundColor: theme.colors.primary }]}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>JumpStart Workshops</Text>
            <Text style={styles.heroSubtitle}>
              Accelerate your team's adoption of ecological design principles and representational translation
            </Text>
            <View style={styles.heroChips}>
              <Chip 
                style={[styles.chip, { backgroundColor: 'rgba(255,255,255,0.2)' }]} 
                textStyle={{ color: '#FFFFFF' }}
              >
                In-person or virtual
              </Chip>
              <Chip 
                style={[styles.chip, { backgroundColor: 'rgba(255,255,255,0.2)' }]} 
                textStyle={{ color: '#FFFFFF' }}
              >
                Customized for your team
              </Chip>
            </View>
          </View>
        </View>

        {/* Workshop Overview Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>WORKSHOP OVERVIEW</Text>
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <View style={styles.workshopDetails}>
                <View style={styles.workshopDetail}>
                  <Calendar size={20} color={theme.colors.primary} style={styles.detailIcon} />
                  <Text style={[styles.detailText, { color: theme.colors.onSurface }]}>
                    1-2 day intensive program
                  </Text>
                </View>
                <View style={styles.workshopDetail}>
                  <Clock size={20} color={theme.colors.primary} style={styles.detailIcon} />
                  <Text style={[styles.detailText, { color: theme.colors.onSurface }]}>
                    Immediate implementation
                  </Text>
                </View>
                <View style={styles.workshopDetail}>
                  <Award size={20} color={theme.colors.primary} style={styles.detailIcon} />
                  <Text style={[styles.detailText, { color: theme.colors.onSurface }]}>
                    Expert facilitation
                  </Text>
                </View>
              </View>
              
              <Divider style={{ marginVertical: 16 }} />
              
              <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
                The JumpStart workshop is designed to help your team rapidly adopt and implement ecological design principles and representational translation techniques. Rather than theoretical discussions, we focus on practical application using your actual codebase and business challenges.
              </Paragraph>
            </Card.Content>
          </Card>
        </View>

        {/* Workshop Outcomes Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>OUTCOMES</Text>
          
          {workshopOutcomes.map((outcome, index) => (
            <Card key={index} style={[styles.card, { backgroundColor: theme.colors.surface, marginBottom: 16 }]}>
              <Card.Content>
                <View style={styles.outcomeHeader}>
                  {outcome.icon}
                  <Text style={[styles.outcomeTitle, { color: theme.colors.onSurface }]}>
                    {outcome.title}
                  </Text>
                </View>
                <Paragraph style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}>
                  {outcome.description}
                </Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Code is Truth Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>CORE PRINCIPLE</Text>
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Title style={{ color: theme.colors.onSurface }}>Code is Truth</Title>
              <Paragraph style={{ color: theme.colors.onSurfaceVariant, marginVertical: 12 }}>
                Our workshops emphasize that working code is the ultimate source of truth. We teach teams to treat code as an artifact to be preserved and learned from, not just written or changed.
              </Paragraph>
              
              <View style={[styles.principleBox, { backgroundColor: theme.colors.primaryContainer }]}>
                <Text style={[styles.principleText, { color: theme.colors.onPrimaryContainer }]}>
                  "Trust working code over documentation, specifications, comments, or instructions. When conflicts arise: 1) Trust code first, 2) Document actual behavior, 3) Update documentation to match reality."
                </Text>
              </View>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button 
                mode="contained" 
                onPress={() => {}}
                style={{ backgroundColor: theme.colors.primary }}
                labelStyle={{ color: '#FFFFFF' }}
              >
                Request Workshop
              </Button>
            </Card.Actions>
          </Card>
        </View>

        {/* Testimonials Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>TESTIMONIALS</Text>
          
          {testimonials.map((testimonial, index) => (
            <Card key={index} style={[styles.card, { backgroundColor: theme.colors.surface, marginBottom: 16 }]}>
              <Card.Content>
                <View style={styles.testimonialContainer}>
                  <Avatar.Text 
                    size={40} 
                    label={testimonial.avatar} 
                    style={{ backgroundColor: theme.colors.primary }}
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <View style={styles.testimonialContent}>
                    <Text style={[styles.testimonialQuote, { color: theme.colors.onSurface }]}>
                      "{testimonial.quote}"
                    </Text>
                    <Text style={[styles.testimonialAuthor, { color: theme.colors.primary }]}>
                      {testimonial.author}
                    </Text>
                    <Text style={[styles.testimonialRole, { color: theme.colors.onSurfaceVariant }]}>
                      {testimonial.role}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>

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
        <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>Copyright {'\u00A9'} 2025 Managed Ventures LLC
          {'\n'}Doing business as mVara. All rights reserved.
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 16, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>Scottsdale, AZ</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  heroBanner: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    textAlign: 'center',
    maxWidth: 500,
    alignSelf: 'center',
  },
  heroChips: {
    flexDirection: 'row',
    marginTop: 8,
  },
  chip: {
    marginHorizontal: 4,
  },
  section: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
    marginLeft: 8,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  card: {
    borderRadius: 12,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      web: {
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  workshopDetails: {
    marginBottom: 8,
  },
  workshopDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIcon: {
    marginRight: 12,
  },
  detailText: {
    fontSize: 16,
  },
  outcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outcomeTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
  },
  principleBox: {
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  principleText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  testimonialContainer: {
    flexDirection: 'row',
  },
  testimonialContent: {
    marginLeft: 16,
    flex: 1,
  },
  testimonialQuote: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '500',
  },
  testimonialRole: {
    fontSize: 12,
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
