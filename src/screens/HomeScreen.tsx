import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Mic, MicOff } from 'react-native-feather';
import { useTheme } from '../contexts/ThemeContext';
import { globalTextStyles } from '../styles/globalStyles';

const conversationSteps = [
  {
    type: 'question',
    text: 'If we could change one thing in your life or business that would change the course of your life or business, what would that be?',
  },
  {
    type: 'user',
    text: 'User: "I\'m struggling with team alignment"',
  },
  {
    type: 'ai',
    text: 'Team alignment is crucial for growth. Tell me more about where the disconnect is happening - is it around vision, daily operations, or something else?',
  },
  {
    type: 'user',
    text: 'User: "It\'s the vision - they don\'t see where we\'re going"',
  },
  {
    type: 'ai',
    text: 'That\'s a Purpose pillar challenge. Let\'s explore your vision clarity. When you think about your 3-year plan, can you articulate it in one sentence?',
  },
  {
    type: 'user',
    text: 'User: "Not really, it\'s fuzzy"',
  },
  {
    type: 'ai',
    text: 'Perfect place to start. The Entrepreneur Program focuses exactly on this - crystallizing your purpose. Would you like to take the Entry Assessment?',
  },
];

export const HomeScreen = () => {
  const { theme } = useTheme();
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState<'idle' | 'listening' | 'speaking'>('idle');
  const [conversationStep, setConversationStep] = useState(0);

  const handleMicPress = () => {
    if (isListening) {
      setIsListening(false);
      setStatus('idle');
    } else {
      setIsListening(true);
      setStatus('listening');
      
      // Simulate conversation
      setTimeout(() => {
        setStatus('speaking');
        setTimeout(() => {
          setConversationStep((prev) => (prev + 1) % conversationSteps.length);
          setIsListening(false);
          setStatus('idle');
        }, 2000);
      }, 1500);
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'listening':
        return 'Listening...';
      case 'speaking':
        return 'Speaking...';
      default:
        return 'Tap to speak';
    }
  };

  const currentStep = conversationSteps[conversationStep];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Conversation Text */}
        <Text style={[
          currentStep.type === 'user' ? globalTextStyles.bodyLarge : globalTextStyles.h3,
          styles.questionText,
          { color: theme.colors.text, opacity: currentStep.type === 'user' ? 0.8 : 1 }
        ]}>
          {currentStep.text}
        </Text>

        {/* Mic Button */}
        <TouchableOpacity
          style={[
            styles.micButton,
            isListening && styles.micButtonActive
          ]}
          onPress={handleMicPress}
          activeOpacity={0.8}
        >
          <Mic width={64} height={64} stroke="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>

        {/* Status Text */}
        <Text style={[globalTextStyles.bodyLarge, styles.statusText, { color: theme.colors.text }]}>
          {getStatusText()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  micButtonActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
  },
  statusText: {
    marginTop: 24,
    textAlign: 'center',
  },
  questionText: {
    textAlign: 'center',
    marginBottom: 48,
    paddingHorizontal: 24,
    lineHeight: 28,
  },
});
