import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import { Text } from './Text';
import { useTheme } from '../contexts/ThemeContext';
import * as Haptics from 'expo-haptics';
import { StarShape } from './StarShape';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.min(300, SCREEN_WIDTH - 40);

export const DraggablePatternCard = () => {
  const { theme } = useTheme();
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [isDragging, setIsDragging] = useState(false);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const nextStarId = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        // Start with current position
        const currentOffset = {
          x: (pan.x as any)._value || 0,
          y: (pan.y as any)._value || 0,
        };
        pan.setOffset(currentOffset);
        pan.setValue({ x: 0, y: 0 });
        
        // Scale up slightly
        Animated.spring(scale, {
          toValue: 1.1,
          friction: 5,
          useNativeDriver: true,
        }).start();
        
        setIsDragging(true);
      },
      onPanResponderMove: (_, gestureState) => {
        // Update position
        pan.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
        
        // Add star at current position
        if (isDragging) {
          const newStar = {
            id: nextStarId.current++,
            x: gestureState.moveX - 50, // Adjust for card position
            y: gestureState.moveY - 100, // Adjust for card position
          };
          setStars(prev => [...prev.slice(-8), newStar]); // Keep last 8 stars
        }
      },
      onPanResponderRelease: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        pan.flattenOffset();
        
        // Animate back to center
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: true,
        }).start();
        
        // Scale back to normal
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }).start();
        
        setIsDragging(false);
        setStars([]);
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              { scale }
            ]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.title}>Gesture Patterns</Text>
        <Text style={styles.description}>
          Drag me around! 
        </Text>
        
        {/* Star trail effect */}
        {stars.map((star, index) => (
          <StarShape
            key={index}
            style={[
              { position: 'absolute', width: 40, height: 40 },
              { left: star.x - 10, top: star.y - 10 }
            ]}
            size={40}
            color="#ffffff"
          />
        ))}
      </Animated.View>
    </View>
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
  star: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
});
