import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Clipboard, Platform, Share } from 'react-native';
import { Portal, Modal, Text, Button, IconButton } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { Copy, X, Facebook, Linkedin, Mail, Instagram } from 'lucide-react-native';

interface WebShareModalProps {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  title?: string;
}

export const WebShareModal = ({ visible, onDismiss, message, title = 'Share Your Results' }: WebShareModalProps) => {
  // If native sharing is available, use it immediately when the modal becomes visible
  React.useEffect(() => {
    if (visible) {
      tryNativeShare();
    }
  }, [visible]);

  // Try to use native sharing if available
  const tryNativeShare = async () => {
    // Check if we're on a platform that supports native sharing
    if (Platform.OS !== 'web') {
      // For native mobile platforms
      try {
        await Share.share({
          message: message,
        });
        // Close the modal after sharing
        onDismiss();
        return true;
      } catch (error) {
        console.error('Error sharing:', error);
        // Continue showing the modal as fallback
        return false;
      }
    } else if (typeof navigator !== 'undefined' && navigator.share) {
      // For web platforms with Web Share API (mostly mobile browsers)
      try {
        await navigator.share({
          text: message,
        });
        // Close the modal after sharing
        onDismiss();
        return true;
      } catch (error) {
        console.error('Error sharing:', error);
        // Continue showing the modal as fallback
        return false;
      }
    }
    // If we reach here, native sharing is not available
    return false;
  };
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openShareUrl = (platform: string) => {
    let url = '';
    const encodedMessage = encodeURIComponent(message);
    
    switch (platform) {
      case 'x':
        url = `https://x.com/intent/tweet?text=${encodedMessage}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedMessage}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('Sales Intelligence Game')}&summary=${encodedMessage}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct web sharing API like others
        // This opens Instagram app or website, but user will need to manually paste the content
        url = `https://instagram.com/`;
        // Copy the message to clipboard for easier sharing
        Clipboard.setString(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent('My Sales Intelligence Game Results')}&body=${encodedMessage}`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank');
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
          <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
            <Copy width={18} height={18} stroke={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        
        {copied && (
          <Text style={[styles.copiedText, { color: theme.colors.primary }]}>
            Copied to clipboard!
          </Text>
        )}
        
        <Text style={[styles.shareText, { color: theme.dark ? '#AAAAAA' : '#666666' }]}>
          Share via:
        </Text>
        
        <View style={styles.socialButtons}>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: '#000000' }]} 
            onPress={() => openShareUrl('x')}
          >
            <X width={24} height={24} stroke="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: '#4267B2' }]} 
            onPress={() => openShareUrl('facebook')}
          >
            <Facebook width={24} height={24} stroke="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: '#0077B5' }]} 
            onPress={() => openShareUrl('linkedin')}
          >
            <Linkedin width={24} height={24} stroke="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: '#D44638' }]} 
            onPress={() => openShareUrl('email')}
          >
            <Mail width={24} height={24} stroke="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: '#E1306C' }]} 
            onPress={() => openShareUrl('instagram')}
          >
            <Instagram width={24} height={24} stroke="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <Button 
          mode="outlined" 
          onPress={onDismiss} 
          style={{ marginTop: 20 }}
          textColor={theme.colors.primary}
        >
          Close
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
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
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    position: 'relative',
  },
  copyButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  copiedText: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  shareText: {
    marginBottom: 12,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
});
