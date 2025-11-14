import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { Home } from 'lucide-react-native';

/**
 * UnsubscribeScreen handles email unsubscribe requests
 * It processes the token from the URL and makes an API call to unsubscribe the user
 */
export const UnsubscribeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const processUnsubscribe = async () => {
      try {
        // For web platform, extract token from URL
        let token = '';
        let email = '';
        if (Platform.OS === 'web') {
          const urlParams = new URLSearchParams(window.location.search);
          token = urlParams.get('token') || '';
          email = urlParams.get('email') || '';
        }

        if (!token) {
          setError('No unsubscribe token found. Please check your link or contact support.');
          setIsLoading(false);
          return;
        }

        // Call the unsubscribe API endpoint
        const response = await fetch(`/.netlify/functions/unsubscribe?token=${token}&email=${encodeURIComponent(email)}`);
        
        if (response.ok) {
          setSuccess(true);
        } else {
          setError('Failed to process your unsubscribe request. Please try again or contact support.');
        }
      } catch (err) {
        setError('An error occurred while processing your request. Please try again later.');
        console.error('Unsubscribe error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    processUnsubscribe();
  }, []);

  const navigateToHome = () => {
    // @ts-ignore - Navigation typing issue
    navigation.navigate('Main', { screen: 'Tab0' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={[styles.loadingText, { color: theme.colors.onSurface }]}>
              Processing your unsubscribe request...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.contentContainer}>
            <Text style={[styles.title, { color: theme.colors.error }]}>Error</Text>
            <Text style={[styles.message, { color: theme.colors.onSurface }]}>{error}</Text>
            <Button 
              mode="contained" 
              onPress={navigateToHome}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              labelStyle={{ color: theme.colors.onSurface }}
            >
              Return to Home
            </Button>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>Unsubscribed</Text>
            <Text style={[styles.message, { color: theme.colors.onSurface }]}>
              You have been successfully unsubscribed from mVara communications.
            </Text>
            <Text style={[styles.subMessage, { color: theme.colors.onSurfaceVariant }]}>
              If you receive further emails, please contact{' '}
              <Text style={{ color: theme.colors.primary }}>support@mvara.ai</Text>
            </Text>
            <Button 
              mode="contained" 
              onPress={navigateToHome}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              labelStyle={{ color: theme.colors.onSurface }}
              icon={({ size, color }) => (
                <Home size={size} color={color} />
              )}
            >
              Return to Home
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: '100%',
  },
  card: {
    width: '100%',
    maxWidth: 500,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  subMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
});
