import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Text } from './Text';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../contexts/ThemeContext';
import { Check, X, RefreshCw } from 'lucide-react-native';
import { StarShape } from './StarShape';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONFETTI_COUNT = 12;

type FeedbackState = 'idle' | 'loading' | 'success' | 'error';

interface Confetti {
  x: Animated.Value;
  y: Animated.Value;
  rotate: Animated.Value;
  scale: Animated.Value;
}

export const FeedbackPatternCard = () => {
  const { theme } = useTheme();
  const [state, setState] = useState<FeedbackState>('idle');
  const progress = useRef(new Animated.Value(0)).current;
  const shake = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const textOpacity = useRef(new Animated.Value(1)).current;
  const textSlide = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = useState('Tap to try your luck! 🎰');

  const createConfetti = () => {
    const items: Confetti[] = Array(CONFETTI_COUNT).fill(0).map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      rotate: new Animated.Value(0),
      scale: new Animated.Value(0),
    }));
    setConfetti(items);
    return items;
  };

  const animateConfetti = (items: Confetti[]) => {
    const animations = items.map((item, i) => {
      const angle = (i / CONFETTI_COUNT) * Math.PI * 2;
      const radius = 100 + Math.random() * 50;
      
      return Animated.parallel([
        Animated.sequence([
          Animated.spring(item.scale, {
            toValue: 1,
            useNativeDriver: true,
            tension: 40,
          }),
          Animated.timing(item.scale, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            delay: 500,
          }),
        ]),
        Animated.timing(item.x, {
          toValue: Math.cos(angle) * radius,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(item.y, {
          toValue: Math.sin(angle) * radius,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(item.rotate, {
          toValue: Math.random() * 4 * Math.PI,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]);
    });

    return Animated.stagger(50, animations);
  };

  const animateText = (newMessage: string, isSuccess: boolean) => {
    // Slide out current text
    Animated.parallel([
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(textSlide, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMessage(newMessage);
      textSlide.setValue(20);
      
      // Slide in new text
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(textSlide, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // If it's a success message, schedule the reset
      if (isSuccess) {
        setTimeout(() => {
          animateText('Tap to try your luck! 🎰', false);
        }, 1500);
      }
    });
  };

  const runFeedbackSequence = async () => {
    if (state === 'loading') return;
    
    // Reset animations
    progress.setValue(0);
    shake.setValue(0);
    scale.setValue(1);
    
    // Start loading
    setState('loading');
    animateText('Processing...', false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Animate progress
    Animated.timing(progress, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Simulate random success/error
    await new Promise(resolve => setTimeout(resolve, 1500));
    const success = Math.random() > 0.5;

    if (success) {
      setState('success');
      animateText('🎉 You win! 🎉', true);
      // Double haptic for success!
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 200);
      
      // Create and animate confetti
      const confettiItems = createConfetti();
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.2,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
      
      animateConfetti(confettiItems).start();
    } else {
      setState('error');
      animateText('Try again!', true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Animated.sequence([
        Animated.timing(shake, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // Reset after delay
    setTimeout(() => {
      setState('idle');
      setConfetti([]);
    }, 2000);
  };

  const getStatusColor = () => {
    switch (state) {
      case 'success':
        return theme.colors.success || '#4CAF50';
      case 'error':
        return theme.colors.error || '#F44336';
      default:
        return theme.colors.primary;
    }
  };

  const getIcon = () => {
    switch (state) {
      case 'loading':
        return <ActivityIndicator color={theme.colors.primary} />;
      case 'success':
        return <Check color={theme.colors.success || '#4CAF50'} />;
      case 'error':
        return <X color={theme.colors.error || '#F44336'} />;
      default:
        return <RefreshCw color={theme.colors.primary} />;
    }
  };

  return (
    <Pressable onPress={runFeedbackSequence}>
      <View style={styles.container}>
        {/* Confetti layer */}
        {confetti.map((item, index) => (
          <Animated.View
            key={index}
            style={[
              styles.confetti,
              {
                transform: [
                  { translateX: item.x },
                  { translateY: item.y },
                  { rotate: item.rotate.interpolate({
                    inputRange: [0, Math.PI * 2],
                    outputRange: ['0deg', '360deg'],
                  })},
                  { scale: item.scale },
                ],
              },
            ]}
          >
            <StarShape size={16} color={theme.colors.primary} />
          </Animated.View>
        ))}
        
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.background,
              borderColor: getStatusColor(),
              transform: [
                { scale },
                { translateX: shake },
              ],
            },
          ]}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Feedback Patterns</Text>
            <Animated.Text 
              style={[
                styles.description,
                {
                  opacity: textOpacity,
                  transform: [{ translateX: textSlide }],
                },
              ]}
            >
              {message}
            </Animated.Text>
          </View>
          
          <View style={styles.iconContainer}>
            {getIcon()}
            <Animated.View
              style={[
                styles.progressBar,
                {
                  backgroundColor: getStatusColor(),
                  transform: [
                    { scaleX: progress },
                  ],
                },
              ]}
            />
          </View>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
    marginVertical: 8,
  },
  confetti: {
    position: 'absolute',
    zIndex: 1,
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 16,
    height: 24,
  },
  progressBar: {
    position: 'absolute',
    bottom: -16,
    left: 0,
    right: 0,
    height: 2,
    transform: [{ scaleX: 0 }],
  },
});
