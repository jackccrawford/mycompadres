import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export interface CookieBannerProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onViewPolicy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ visible, onAccept, onDecline, onViewPolicy }) => {
  const { theme } = useTheme();
  if (!visible) return null;
  return (
    <View style={[styles.cookieNotice, { backgroundColor: theme.colors.surface }]}>  
      <TouchableOpacity style={styles.cookieNoticeClose} onPress={onDecline} accessibilityLabel="Close cookie notification">
        <Text style={[styles.cookieNoticeAccept, { color: theme.colors.onSurfaceVariant }]}>×</Text>
      </TouchableOpacity>
      <Text style={[styles.cookieNoticeText, { color: theme.colors.onSurface }]}>  
        We use cookies to improve your experience. You may accept or decline. {'\n'}
        <Text style={{ color: theme.colors.primary }} onPress={onViewPolicy} accessibilityRole="link">See privacy policy</Text>
      </Text>
      <View style={styles.cookieNoticeActions}>
        <TouchableOpacity onPress={onAccept} style={[styles.cookieNoticeButton, { backgroundColor: theme.colors.primary, marginRight: 8 }]}>  
          <Text style={[styles.cookieNoticeAccept, { color: theme.colors.onPrimary }]}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDecline} style={[styles.cookieNoticeButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.outline }]}>  
          <Text style={[styles.cookieNoticeAccept, { color: theme.colors.onSurface }]}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cookieNotice: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      web: {
        boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  cookieNoticeClose: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
    zIndex: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cookieNoticeText: {
    fontSize: 14,
    flex: 1,
  },
  cookieNoticeActions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  cookieNoticeButton: {
    padding: 8,
    borderRadius: 8,
    minWidth: 80,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cookieNoticeAccept: {
    fontSize: 14,
    fontWeight: '500',
  },
});
