import React from 'react';
import { 
  StyleSheet, 
  Platform,
  StyleProp,
  ViewStyle,
  Pressable,
  PressableProps,
} from 'react-native';
import { Text } from './Text';
import { useTheme } from 'react-native-paper';

export interface CTAButtonProps extends PressableProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  variant?: 'filled' | 'outlined';
}

/**
 * A specialized Call-to-Action button component that uses the tertiary color
 * from the theme (vibrant orange #D3824B) and includes visual enhancements
 * like shadows and hover effects.
 */
export const CTAButton: React.FC<CTAButtonProps> = ({ 
  label,
  style,
  textStyle,
  variant = 'filled',
  disabled,
  ...props 
}) => {
  const theme = useTheme();
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variant === 'filled' ? styles.filledButton : styles.outlinedButton,
        {
          backgroundColor: variant === 'filled' 
            ? theme.colors.tertiary 
            : 'transparent',
          borderColor: theme.colors.tertiary,
          opacity: (pressed || disabled) ? 0.8 : 1,
          shadowColor: theme.dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: pressed ? 0.4 : 0.8,
          shadowRadius: 2,
          elevation: pressed ? 1 : 3,
          transform: [{ translateY: pressed ? 0 : -1 }],
        },
        disabled && styles.disabledButton,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text
        style={[
          styles.label,
          variant === 'filled' ? styles.filledLabel : styles.outlinedLabel,
          { 
            color: variant === 'filled' 
              ? '#FFFFFF' 
              : theme.colors.tertiary,
            textShadowColor: variant === 'filled' ? 'rgba(0,0,0,0.2)' : 'transparent',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 1,
          },
          disabled && styles.disabledLabel,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 9999, // Changed to pill shape (very large border radius)
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
    }),
  },
  filledButton: {
    borderColor: 'transparent',
  },
  outlinedButton: {
    backgroundColor: 'transparent',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    borderColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  filledLabel: {},
  outlinedLabel: {},
  disabledLabel: {
    color: '#888888',
  },
});
