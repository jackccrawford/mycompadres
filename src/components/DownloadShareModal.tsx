import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Clipboard, Platform } from 'react-native';
import { Portal, Modal, Text, Button, IconButton } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { Copy, X, Mail, MessageSquare } from 'react-native-feather';

interface DownloadShareModalProps {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  url: string;
  title?: string;
}

export const DownloadShareModal = ({ 
  visible, 
  onDismiss, 
  message, 
  url,
  title = 'Save Download Link' 
}: DownloadShareModalProps) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmail = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent('Windsurf Download Link')}&body=${encodeURIComponent(message)}`;
    window.open(emailUrl, '_blank');
  };

  const sendSMS = () => {
    // SMS deep links work differently across platforms
    let smsUrl;
    
    if (Platform.OS === 'ios') {
      smsUrl = `sms:&body=${encodeURIComponent(message)}`;
    } else {
      // Android and others
      smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    }
    
    window.open(smsUrl, '_blank');
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContainer,
          { backgroundColor: theme.dark ? '#222222' : '#FFFFFF' }
        ]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.dark ? '#FFFFFF' : '#000000' }]}>
            {title}
          </Text>
          <IconButton
            icon={() => <X width={20} height={20} stroke={theme.dark ? '#FFFFFF' : '#000000'} />}
            onPress={onDismiss}
            size={20}
          />
        </View>
        
        <View style={[styles.messageContainer, { backgroundColor: theme.dark ? '#333333' : '#F5F5F5' }]}>
          <Text style={{ color: theme.dark ? '#FFFFFF' : '#000000' }}>{message}</Text>
        </View>
        
        <View style={[styles.linkContainer, { backgroundColor: theme.dark ? '#333333' : '#F5F5F5' }]}>
          <Text 
            style={{ 
              color: theme.colors.primary, 
              flex: 1,
              textDecorationLine: 'underline'
            }}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {url}
          </Text>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
            <Copy width={18} height={18} stroke={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        
        {copied && (
          <Text style={[styles.copiedText, { color: theme.colors.primary }]}>
            Link copied to clipboard!
          </Text>
        )}
        
        <Text style={[styles.shareText, { color: theme.dark ? '#AAAAAA' : '#666666' }]}>
          Save for later via:
        </Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]} 
            onPress={handleCopy}
          >
            <Copy width={24} height={24} stroke="#FFFFFF" />
            <Text style={styles.actionButtonText}>Copy Link</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#4285F4' }]} 
            onPress={sendEmail}
          >
            <Mail width={24} height={24} stroke="#FFFFFF" />
            <Text style={styles.actionButtonText}>Email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#4CAF50' }]} 
            onPress={sendSMS}
          >
            <MessageSquare width={24} height={24} stroke="#FFFFFF" />
            <Text style={styles.actionButtonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
    maxWidth: 500,
    alignSelf: 'center',
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  messageContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  copyButton: {
    padding: 4,
  },
  copiedText: {
    alignSelf: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  shareText: {
    marginBottom: 12,
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    marginBottom: 8,
    minWidth: 120,
  },
  actionButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '500',
  },
});
