import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface StarShapeProps {
  size: number;
  color: string;
  style?: any;
}

export const StarShape: React.FC<StarShapeProps> = ({ size, color, style }) => {
  // Sparkle star path (✨ style) with 6 points and rays
  const sparkleStarPath = `
    M12 0 L13.5 9 L22.5 10.5 L13.5 12 L12 21 L10.5 12 L1.5 10.5 L10.5 9 Z
    M12 4 L12.5 8 L16.5 8.5 L12.5 9 L12 13 L11.5 9 L7.5 8.5 L11.5 8 Z
  `;
  
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d={sparkleStarPath}
          fill={color}
        />
      </Svg>
    </View>
  );
};
