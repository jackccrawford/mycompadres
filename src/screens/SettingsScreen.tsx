import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text as RNText, TouchableOpacity, ScrollView, Linking, Platform, TextInput, Modal, FlatList, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { eventEmitter, EVENTS } from '../utils/eventEmitter';
import { Moon, Sun, Layout, ChevronRight, Info, ExternalLink, Smartphone, Text as TextIcon, Monitor, CheckCircle2, Palette, Droplets, Leaf, Flame, Heart, CircleDashed, X } from 'lucide-react-native';
import type { ThemeMode, PaletteType } from '../contexts/ThemeContext';

export const SettingsScreen = () => {
  const route = useRoute();
  const params = route.params as { openPaletteModal?: boolean | number } | undefined;
  const { theme, setTheme, setThemeMode, setHeaderTitle, setPaletteType } = useTheme();
  const [paletteModalVisible, setPaletteModalVisible] = useState(false);
  
  // Check if we should open the palette modal from navigation params
  useEffect(() => {
    if (params?.openPaletteModal) {
      // Open the palette modal when the parameter is present
      setPaletteModalVisible(true);
    }
  }, [params?.openPaletteModal]);

  // Listen for the event to open the palette modal
  useEffect(() => {
    const openPaletteModal = () => {
      setPaletteModalVisible(true);
    };
    
    // Subscribe to the event
    eventEmitter.on(EVENTS.OPEN_PALETTE_MODAL, openPaletteModal);
    
    // Cleanup when component unmounts
    return () => {
      eventEmitter.off(EVENTS.OPEN_PALETTE_MODAL, openPaletteModal);
    };
  }, []);
  const [licenseModalVisible, setLicenseModalVisible] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(theme.headerTitle || 'mVara');
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    colorPreviewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    colorPreview: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
    },
    section: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 8,
      marginLeft: 8,
      letterSpacing: 0.1,
      textTransform: 'uppercase',
    },
    card: {
      borderRadius: 12,
      overflow: 'hidden',
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
      }),
    },
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
    },
    settingsItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    settingsItemRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    settingsItemTitle: {
      fontSize: 16,
      fontWeight: '400',
    },
    settingsItemValue: {
      fontSize: 14,
      fontWeight: '400',
    },
    titleEditContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    titleInput: {
      fontSize: 14,
      fontWeight: '400',
      padding: 4,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderRadius: 4,
      width: 120,
    },
    charCount: {
      fontSize: 12,
      fontWeight: '500',
      width: 24,
      textAlign: 'right',
    },
    footer: {
      textAlign: 'center',
      padding: 16,
      fontSize: 14,
      opacity: 0.7,
      lineHeight: 20,
    },
    themeButton: {
      padding: 16,
      borderRadius: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
    },
    themeContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    themeText: {
      fontSize: 16,
      fontWeight: '500',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 20,
    },
    modalContent: {
      width: '100%',
      maxHeight: '80%',
      borderRadius: 16,
      padding: 16,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5E5',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    closeButton: {
      padding: 8,
    },
    paletteList: {
      gap: 12,
    },
    paletteItem: {
      padding: 16,
      borderRadius: 12,
      borderWidth: 2,
    },
    paletteItemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8,
    },
    paletteColorPreview: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 8,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
    },
    paletteItemTitle: {
      fontSize: 16,
      fontWeight: '500',
      flex: 1,
    },
    paletteItemDescription: {
      fontSize: 14,
    },
    backButton: {
      padding: 8,
    },
    licenseScrollView: {
      flex: 1,
      width: '100%',
    },
    licenseScrollViewContent: {
      paddingHorizontal: 16,
      paddingBottom: 40,
      paddingTop: 8,
    },
    licenseText: {
      fontSize: 14,
      lineHeight: 22,
      marginBottom: 16,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
      textAlign: 'left',
      width: '100%',
    },
  });
  
  const palettes = [
    { 
      id: 'default' as PaletteType, 
      name: 'Default', 
      icon: <Palette size={24} color={theme.colors.primary} />,
      description: 'mVara brand theme' 
    },
    { 
      id: 'forest' as PaletteType, 
      name: 'Forest', 
      icon: <Leaf size={24} color="#2D6A4F" />,
      description: 'Natural green hues' 
    },
    { 
      id: 'amber' as PaletteType, 
      name: 'Amber', 
      icon: <Flame size={24} color="#F59E0B" />,
      description: 'Warm orange tones' 
    },
    { 
      id: 'rose' as PaletteType, 
      name: 'Rose', 
      icon: <Heart size={24} color="#BE185D" />,
      description: 'Pink and purple accents' 
    },
    { 
      id: 'monochrome' as PaletteType, 
      name: 'Monochrome', 
      icon: <CircleDashed size={24} color={theme.dark ? "#FFFFFF" : "#000000"} />,
      description: 'High contrast, accessibility-focused' 
    }
  ];

  // License modal content from LICENSE file
  const licenseContent = `PROPRIETARY LICENSE AGREEMENT

Copyright © 2025 Managed Ventures LLC. All Rights Reserved.

This software and its documentation, including all content, code, design, and associated materials (the "Software"), are the confidential and proprietary information of Managed Ventures LLC ("Company").

This proprietary license agreement ("Agreement") governs the use of the Software. By accessing, downloading, installing, copying, or otherwise using the Software, you agree to be bound by the terms of this Agreement.

1. OWNERSHIP
   All right, title, and interest in and to the Software, including all intellectual property rights, are and shall remain the exclusive property of the Company. The Software is protected by copyright, trade secret, and other intellectual property laws.

2. LICENSE GRANT
   Subject to the terms and conditions of this Agreement, the Company grants you a limited, non-transferable, non-sublicensable, revocable license to use the Software solely for your internal business purposes.

3. RESTRICTIONS
   You shall not, and shall not permit any third party to:
   a) Copy, modify, adapt, translate, or create derivative works of the Software;
   b) Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Software;
   c) Rent, lease, distribute, sell, resell, assign, or otherwise transfer rights to the Software;
   d) Remove any proprietary notices or labels from the Software;
   e) Use the Software for any purpose not expressly permitted by this Agreement.

4. CONFIDENTIALITY
   The Software contains valuable trade secrets and proprietary information of the Company. You shall maintain the confidentiality of the Software and shall not disclose the Software to any third party without the prior written consent of the Company.

5. WARRANTY DISCLAIMER
   THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. THE COMPANY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.

6. LIMITATION OF LIABILITY
   IN NO EVENT SHALL THE COMPANY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOST PROFITS, LOSS OF USE, LOSS OF DATA, OR BUSINESS INTERRUPTION, ARISING OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THIS AGREEMENT.

7. TERMINATION
   This Agreement shall continue until terminated. The Company may terminate this Agreement at any time if you breach any provision of this Agreement. Upon termination, you shall cease all use of the Software and destroy all copies of the Software in your possession or control.

8. GENERAL
   This Agreement shall be governed by and construed in accordance with the laws of the United States and the State of California, without giving effect to any principles of conflicts of law. Any dispute arising out of or relating to this Agreement shall be subject to the exclusive jurisdiction of the state and federal courts located in California.

Managed Ventures LLC
18291 N Pima Rd, Suite 110-411
Scottsdale, AZ 85258
legal@managedv.com`;

  const openProprietaryLicense = () => {
    // Show the license modal
    setLicenseModalVisible(true);
  };

  const handleTitlePress = () => {
    setTempTitle(theme.headerTitle);
    setIsEditingTitle(true);
  };

  const handleTitleSubmit = () => {
    setHeaderTitle(tempTitle);
    setIsEditingTitle(false);
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const getThemeIcon = () => {
    if (theme.themeMode === 'system') return <Smartphone size={24} color={theme.colors.onSurface} />;
    return theme.dark ?
      <Moon size={24} color={theme.colors.onSurface} /> :
      <Sun size={24} color={theme.colors.onSurface} />;
  };

  const getThemeText = () => {
    switch (theme.themeMode) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      default: return 'System';
    }
  };

  const remainingChars = 20 - (tempTitle?.length || 0);
  const charsColor = remainingChars <= 3 ? theme.colors.error :
    remainingChars <= 5 ? theme.colors.info :
      theme.colors.onSurfaceVariant;

  const renderSettingsItem = (
    icon: React.ReactNode,
    title: string,
    value?: string | React.ReactNode,
    onPress?: () => void,
    showChevron: boolean = true,
    rightIcon?: React.ReactNode,
    customContent?: React.ReactNode
  ) => (
    <TouchableOpacity
      style={[styles.settingsItem, { borderBottomColor: theme.colors.outline + '20' }]}
      onPress={onPress}
      disabled={!onPress && !customContent}
    >
      <View style={styles.settingsItemLeft}>
        {icon}
        <RNText style={[styles.settingsItemTitle, { color: theme.colors.onSurface }]}>{title}</RNText>
      </View>
      <View style={styles.settingsItemRight}>
        {customContent || (
          <>
            {value && (
              typeof value === 'string' ? 
                <RNText style={[styles.settingsItemValue, { color: theme.colors.onSurfaceVariant }]}>{value}</RNText>
              : value
            )}
            {rightIcon || (showChevron && <ChevronRight size={20} color={theme.colors.onSurfaceVariant} />)}
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  const ThemeToggle = () => {
    const ThemeIcon = {
      'light': Sun,
      'dark': Moon,
      'system': Monitor
    }[theme.themeMode];

    const nextMode: ThemeMode = {
      'light': 'dark',
      'dark': 'system',
      'system': 'light'
    }[theme.themeMode] as ThemeMode;

    return (
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => setThemeMode(nextMode)}
      >
        <View style={styles.settingsItemLeft}>
          <Layout size={24} color={theme.colors.onSurface} />
          <RNText style={[styles.settingsItemTitle, { color: theme.colors.onSurface }]}>
            Mode
          </RNText>
        </View>
        <ThemeIcon size={24} color={theme.colors.onSurface} />
      </TouchableOpacity>
    );
  };

  // Get color for each palette item based on its icon color or use a default
  const getPaletteColor = (paletteType?: PaletteType): string => {
    // Handle undefined palette type
    if (!paletteType) {
      return '#4B9CD3'; // mVara brand color
    }
    
    switch (paletteType) {
      case 'default': return '#4B9CD3'; // mVara brand color
      case 'forest': return '#2D6A4F';  // Forest green
      case 'amber': return '#F59E0B';   // Amber orange
      case 'rose': return '#BE185D';    // Rose pink
      case 'monochrome': return theme.dark ? '#FFFFFF' : '#000000'; // Monochrome
      default: return theme.colors.primary;
    }
  };

  const renderPaletteItem = ({ item }: { item: typeof palettes[0] }) => {
    // Get the primary color for this palette based on its type
    const previewColor = getPaletteColor(item.id as PaletteType);
    
    return (
      <TouchableOpacity
        style={[styles.paletteItem, { 
          backgroundColor: theme.colors.surface,
          borderColor: theme.paletteType === item.id ? theme.colors.primary : theme.colors.border
        }]}
        onPress={() => {
          setPaletteType(item.id);
          setPaletteModalVisible(false);
        }}
      >
        <View style={styles.paletteItemHeader}>
          <View style={[styles.paletteColorPreview, { backgroundColor: previewColor }]} />
          {item.icon}
          <RNText style={[styles.paletteItemTitle, { color: theme.colors.onSurface }]}>
            {item.name}
          </RNText>
          {theme.paletteType === item.id && (
            <CheckCircle2 size={20} color={theme.colors.primary} />
          )}
        </View>
        <RNText style={[styles.paletteItemDescription, { color: theme.colors.onSurfaceVariant }]}>
          {item.description}
        </RNText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* License Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={licenseModalVisible}
        onRequestClose={() => setLicenseModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface, height: '90%', maxWidth: 600, width: '100%' }]}>
            <View style={styles.modalHeader}>
              <RNText style={[styles.modalTitle, { color: theme.colors.primary }]}>Proprietary License</RNText>
              <TouchableOpacity 
                onPress={() => setLicenseModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color={theme.colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>
            <ScrollView 
              style={styles.licenseScrollView}
              contentContainerStyle={styles.licenseScrollViewContent}
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
            >
              <RNText style={[styles.licenseText, { color: theme.colors.onSurface }]}>
                {licenseContent}
              </RNText>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Palette Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={paletteModalVisible}
        onRequestClose={() => setPaletteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface, height: '90%', maxWidth: 600, width: '100%' }]}>
            <View style={styles.modalHeader}>
              <RNText style={[styles.modalTitle, { color: theme.colors.primary }]}>Select Color Palette</RNText>
              <TouchableOpacity 
                onPress={() => setPaletteModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color={theme.colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={palettes}
              renderItem={renderPaletteItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.paletteList}
            />
          </View>
        </View>
      </Modal>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.section}>
          <RNText style={[styles.sectionTitle, { color: theme.colors.primary }]}>About</RNText>
          <View style={[styles.card, { backgroundColor: theme.colors.surface, elevation: 2 }]}>
            {/* Header Title option removed from UI but code preserved for future use */}
            {renderSettingsItem(
              <Info size={24} color={theme.colors.onSurface} />,
              'Version',
              '1.0.0',
              undefined,
              false
            )}

            {renderSettingsItem(
              <Info size={24} color={theme.colors.onSurface} />,
              'License',
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RNText style={{ color: theme.colors.onSurfaceVariant }}>View</RNText>
                <ChevronRight size={20} color={theme.colors.onSurfaceVariant} />
              </View>,
              openProprietaryLicense,
              false,
              undefined
            )}
          </View>
        </View>

        <RNText style={[styles.footer, { color: theme.colors.onSurfaceVariant }]}>mVara{'\n'}{'\n'}
          Copyright © 2025{'\n'} 
          Managed Ventures LLC{'\n'}
          All rights reserved{'\n'}
          Scottsdale | Arizona | USA
        </RNText>
      </ScrollView>
    </>
  );
};
