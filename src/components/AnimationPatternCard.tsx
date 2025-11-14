import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Pressable,
  Dimensions,
  Easing,
} from 'react-native';
import { Text } from './Text';
import { useTheme } from '../contexts/ThemeContext';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.min(300, SCREEN_WIDTH - 40);

type AnimationState = 
  | 'spring' 
  | 'keyframe' 
  | 'interpolate' 
  | 'parallel'
  | 'sequence';

export const AnimationPatternCard = () => {
  const { theme } = useTheme();
  const [currentAnimation, setCurrentAnimation] = useState<AnimationState>('spring');
  
  // Animation values
  const springValue = useRef(new Animated.Value(0)).current;
  const keyframeValue = useRef(new Animated.Value(0)).current;
  const interpolateValue = useRef(new Animated.Value(0)).current;
  const parallelScale = useRef(new Animated.Value(1)).current;
  const parallelRotate = useRef(new Animated.Value(0)).current;

  // Text fade values
  const textOpacity = useRef(new Animated.Value(1)).current;
  const textSlide = useRef(new Animated.Value(0)).current;

  const descriptions = {
    spring: "Spring physics for natural motion",
    keyframe: "Multi-step keyframe animations",
    interpolate: "Smooth value interpolation",
    parallel: "Multiple animations in parallel",
    sequence: "Sequenced animation chain",
  };

  const [description, setDescription] = useState(descriptions.spring);

  const animateText = (newText: string) => {
    Animated.sequence([
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
      ]),
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
      ]),
    ]).start();
    
    setTimeout(() => setDescription(newText), 200);
  };

  const runSpringAnimation = () => {
    setCurrentAnimation('spring');
    animateText(descriptions.spring);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    Animated.spring(springValue, {
      toValue: 1,
      tension: 20,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      springValue.setValue(0);
    });
  };

  const runKeyframeAnimation = () => {
    setCurrentAnimation('keyframe');
    animateText(descriptions.keyframe);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    Animated.sequence([
      Animated.timing(keyframeValue, {
        toValue: 1,
        duration: 400,
        easing: Easing.cubic,
        useNativeDriver: true,
      }),
      Animated.timing(keyframeValue, {
        toValue: -1,
        duration: 400,
        easing: Easing.cubic,
        useNativeDriver: true,
      }),
      Animated.timing(keyframeValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.cubic,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const runInterpolateAnimation = () => {
    setCurrentAnimation('interpolate');
    animateText(descriptions.interpolate);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    Animated.timing(interpolateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      interpolateValue.setValue(0);
    });
  };

  const runParallelAnimation = () => {
    setCurrentAnimation('parallel');
    animateText(descriptions.parallel);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    Animated.parallel([
      Animated.sequence([
        Animated.timing(parallelScale, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(parallelScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(parallelRotate, {
        toValue: 4,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      parallelRotate.setValue(0);
    });
  };

  // Auto-cycle through animations
  useEffect(() => {
    const animations = [
      runSpringAnimation,
      runKeyframeAnimation,
      runInterpolateAnimation,
      runParallelAnimation,
    ];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      animations[currentIndex]();
      currentIndex = (currentIndex + 1) % animations.length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAnimatedStyle = () => {
    switch (currentAnimation) {
      case 'spring':
        return {
          transform: [
            { scale: springValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.5],
            })},
          ],
        };
      case 'keyframe':
        return {
          transform: [
            { translateX: keyframeValue.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [-50, 0, 50],
            })},
          ],
        };
      case 'interpolate':
        return {
          transform: [
            { scale: interpolateValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 1.2, 1],
            })},
            { rotate: interpolateValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            })},
          ],
        };
      case 'parallel':
        return {
          transform: [
            { scale: parallelScale },
            { rotate: parallelRotate.interpolate({
              inputRange: [0, 4],
              outputRange: ['0deg', '720deg'],
            })},
          ],
        };
      default:
        return {};
    }
  };

  return (
    <Pressable
      onPress={() => {
        switch (currentAnimation) {
          case 'spring':
            runSpringAnimation();
            break;
          case 'keyframe':
            runKeyframeAnimation();
            break;
          case 'interpolate':
            runInterpolateAnimation();
            break;
          case 'parallel':
            runParallelAnimation();
            break;
        }
      }}
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
            },
            getAnimatedStyle(),
          ]}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Animation Patterns</Text>
            <Animated.Text
              style={[
                styles.description,
                {
                  opacity: textOpacity,
                  transform: [{ translateX: textSlide }],
                },
              ]}
            >
              {description}
            </Animated.Text>
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
  card: {
    width: CARD_WIDTH,
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
});
