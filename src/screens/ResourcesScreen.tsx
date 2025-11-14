import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform, Image, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Card, Button, Title, Paragraph, Chip, Modal, Portal, List } from 'react-native-paper';
import { Book, FileText, Video, Download, ExternalLink, MessageSquare } from 'lucide-react-native';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import XIcon from '../components/icons/XIcon';

// Define resource interface for type safety
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide' | 'case-study';
  icon: React.ReactNode;
  url?: string;
  downloadable?: boolean;
}

export const ResourcesScreen = () => {
  const { theme } = useTheme();
  const [chatVisible, setChatVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [resourceModalVisible, setResourceModalVisible] = useState(false);

  // Resource categories
  const resourceCategories = [
    {
      title: "Getting Started",
      description: "Essential resources for new users",
      resources: [
        {
          id: 'quick-start',
          title: 'Quick Start Guide',
          description: 'A comprehensive guide to get you up and running with mVara in under 30 minutes.',
          type: 'guide',
          icon: <FileText size={24} color={theme.colors.primary} />,
          downloadable: true
        },
        {
          id: 'intro-video',
          title: 'Introduction to mVara',
          description: 'A 5-minute video overview of mVara and how it can transform your business.',
          type: 'video',
          icon: <Video size={24} color={theme.colors.primary} />,
          url: 'https://example.com/intro-video'
        }
      ]
    },
    {
      title: "Case Studies",
      description: "Real-world success stories",
      resources: [
        {
          id: 'enterprise-case',
          title: 'Enterprise Integration Success',
          description: 'How a Fortune 500 company streamlined their development process with mVara.',
          type: 'case-study',
          icon: <FileText size={24} color={theme.colors.primary} />
        },
        {
          id: 'startup-case',
          title: 'Startup Growth Story',
          description: 'How a tech startup accelerated their development cycle by 40% using mVara.',
          type: 'case-study',
          icon: <FileText size={24} color={theme.colors.primary} />
        }
      ]
    },
    {
      title: "Best Practices",
      description: "Optimize your workflow",
      resources: [
        {
          id: 'code-truth',
          title: 'Code is Truth: A Practical Guide',
          description: 'Learn how to implement the "Code is Truth" principle in your development process.',
          type: 'article',
          icon: <Book size={24} color={theme.colors.primary} />,
          downloadable: true
        },
        {
          id: 'communication-patterns',
          title: 'Effective Communication Patterns',
          description: 'Strategies for bridging the gap between technical and business stakeholders.',
          type: 'guide',
          icon: <Book size={24} color={theme.colors.primary} />,
          downloadable: true
        }
      ]
    }
  ];

  const toggleChatVisibility = () => {
    setChatVisible(!chatVisible);
  };

  const showResourceDetails = (resource: Resource) => {
    setSelectedResource(resource);
    setResourceModalVisible(true);
  };

  const hideResourceDetails = () => {
    setResourceModalVisible(false);
  };

  const handleResourceAction = (resource: Resource) => {
    if (resource.url) {
      Linking.openURL(resource.url).catch(err => console.error('Error opening URL:', err));
    } else if (resource.downloadable) {
      // In a real app, this would trigger a download
      console.log('Downloading resource:', resource.title);
      // Show a toast or notification
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Portal>
        {/* Resource Details Modal */}
        <Modal
          visible={resourceModalVisible}
          onDismiss={hideResourceDetails}
          contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}
        >
          {selectedResource && (
            <View>
              <View style={styles.resourceHeader}>
                {selectedResource.icon}
                <Text style={[styles.resourceTitle, { color: theme.colors.onSurface }]}>
                  {selectedResource.title}
                </Text>
              </View>
              
              <Text style={[styles.resourceDescription, { color: theme.colors.onSurfaceVariant, marginBottom: 16 }]}>
                {selectedResource.description}
              </Text>
              
              <Divider style={{ marginVertical: 16 }} />
              
              <View style={styles.resourceTypeContainer}>
                <Chip 
                  style={[styles.resourceTypeChip, { backgroundColor: theme.colors.primaryContainer }]}
                  textStyle={{ color: theme.colors.onPrimaryContainer }}
                >
                  {selectedResource.type === 'article' ? 'Article' : 
                   selectedResource.type === 'video' ? 'Video' : 
                   selectedResource.type === 'guide' ? 'Guide' : 'Case Study'}
                </Chip>
                {selectedResource.downloadable && (
                  <Chip 
                    style={[styles.resourceTypeChip, { backgroundColor: theme.colors.secondaryContainer, marginLeft: 8 }]}
                    textStyle={{ color: theme.colors.onSecondaryContainer }}
                  >
                    Downloadable
                  </Chip>
                )}
              </View>
              
              <View style={styles.modalActions}>
                <Button 
                  mode="outlined" 
                  onPress={hideResourceDetails}
                  style={{ borderColor: theme.colors.primary }}
                  labelStyle={{ color: theme.colors.primary }}
                >
                  Close
                </Button>
                {(selectedResource.url || selectedResource.downloadable) && (
                  <Button 
                    mode="contained" 
                    onPress={() => handleResourceAction(selectedResource)}
                    style={{ backgroundColor: theme.colors.primary, marginLeft: 12 }}
                    labelStyle={{ color: '#FFFFFF' }}
                    icon={({ size, color }) => selectedResource.url ? 
                      <ExternalLink size={size} color={color} /> : 
                      <Download size={size} color={color} />}
                  >
                    {selectedResource.url ? 'View Resource' : 'Download'}
                  </Button>
                )}
              </View>
            </View>
          )}
        </Modal>

        {/* mVara Assistant Chat Modal */}
        <Modal
          visible={chatVisible}
          onDismiss={() => setChatVisible(false)}
          contentContainerStyle={[styles.chatModalContainer, { backgroundColor: theme.colors.background }]}
        >
          <View style={styles.chatModalHeader}>
            <Text style={[styles.chatModalTitle, { color: theme.colors.onSurface }]}>
              mVara Assistant
            </Text>
            <Text style={[styles.chatModalSubtitle, { color: theme.colors.onSurfaceVariant }]}>
              Get help finding the right resources for your needs
            </Text>
            <Button 
              mode="text" 
              onPress={() => setChatVisible(false)}
              style={styles.closeButton}
            >
              Close
            </Button>
          </View>
          <View style={styles.chatContainer}>
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>
                Chat functionality has been removed. Please contact support for assistance.
              </Text>
            </View>
          </View>
        </Modal>
      </Portal>

      <ScrollView 
        style={styles.scrollView}
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Hero Section */}
        <View style={[styles.heroBanner, { backgroundColor: theme.colors.primary }]}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Resources</Text>
            <Text style={styles.heroSubtitle}>
              Everything you need to succeed with mVara
            </Text>
            <Chip 
              style={[styles.chip, { backgroundColor: 'rgba(255,255,255,0.2)' }]} 
              textStyle={{ color: '#FFFFFF' }}
            >
              Guides, case studies, and best practices
            </Chip>
          </View>
        </View>

        {/* Resource Categories */}
        {resourceCategories.map((category, index) => (
          <View key={index} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
              {category.title.toUpperCase()}
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.onSurfaceVariant }]}>
              {category.description}
            </Text>
            
            {category.resources.map((resource) => (
              <Card 
                key={resource.id} 
                style={[styles.card, { backgroundColor: theme.colors.surface }]}
                onPress={() => showResourceDetails(resource)}
              >
                <Card.Content>
                  <View style={styles.resourceCardHeader}>
                    {resource.icon}
                    <View style={styles.resourceCardTitleContainer}>
                      <Title style={{ color: theme.colors.onSurface }}>{resource.title}</Title>
                      <Chip 
                        style={[styles.miniChip, { backgroundColor: theme.colors.primaryContainer }]}
                        textStyle={{ color: theme.colors.onPrimaryContainer, fontSize: 12 }}
                      >
                        {resource.type === 'article' ? 'Article' : 
                         resource.type === 'video' ? 'Video' : 
                         resource.type === 'guide' ? 'Guide' : 'Case Study'}
                      </Chip>
                    </View>
                  </View>
                  <Paragraph style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}>
                    {resource.description}
                  </Paragraph>
                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                  <Button 
                    mode="text"
                    onPress={() => showResourceDetails(resource)}
                    labelStyle={{ color: theme.colors.primary }}
                  >
                    View Details
                  </Button>
                  {(resource.url || resource.downloadable) && (
                    <Button 
                      mode="outlined"
                      onPress={() => handleResourceAction(resource)}
                      style={{ borderColor: theme.colors.primary }}
                      labelStyle={{ color: theme.colors.primary }}
                      icon={({ size, color }) => resource.url ? 
                        <ExternalLink size={size} color={color} /> : 
                        <Download size={size} color={color} />}
                    >
                      {resource.url ? 'Visit' : 'Download'}
                    </Button>
                  )}
                </Card.Actions>
              </Card>
            ))}
          </View>
        ))}

        {/* Need Help Section */}
        <View style={styles.section}>
          <Card style={[styles.helpCard, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Card.Content>
              <View style={styles.helpCardContent}>
                <View style={styles.helpCardTextContainer}>
                  <Title style={{ color: theme.colors.onSurfaceVariant }}>Need personalized help?</Title>
                  <Paragraph style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>
                    Our mVara assistant can help you find exactly what you're looking for.
                  </Paragraph>
                </View>
                <Button 
                  mode="contained" 
                  onPress={toggleChatVisibility}
                  style={{ backgroundColor: theme.colors.primary }}
                  labelStyle={{ color: '#FFFFFF' }}
                  icon={({ size, color }) => <MessageSquare size={size} color={color} />}
                >
                  Chat with Assistant
                </Button>
              </View>
            </Card.Content>
          </Card>
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
  chip: {
    marginTop: 8,
  },
  section: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 8,
    letterSpacing: 0.1,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    marginLeft: 8,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  resourceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceCardTitleContainer: {
    flex: 1,
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  miniChip: {
    height: 24,
  },
  helpCard: {
    marginBottom: 32,
    borderRadius: 8,
  },
  helpCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  helpCardTextContainer: {
    flex: 1,
    marginRight: 16,
    marginBottom: Platform.OS === 'web' ? 0 : 16,
  },
  // Modal styles
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resourceTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  resourceDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  resourceTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  resourceTypeChip: {
    margin: 4,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  // Chat modal styles
  chatModalContainer: {
    margin: 20,
    borderRadius: 8,
    flex: 0.8,
    overflow: 'hidden',
  },
  chatModalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  chatModalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  chatModalSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  chatContainer: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
