import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  TouchableOpacityProps,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Text } from './Text';
import { useTheme } from '../contexts/ThemeContext';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'cta';
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({ 
  label,
  variant = 'primary',
  style,
  disabled,
  ...props 
}) => {
  const { theme } = useTheme();
  
  // CTA color - vibrant orange
  const ctaColor = '#D3824B';
  // Darker shade for hover/active states
  const ctaColorDark = '#B86A38';
  // Lighter shade for highlights
  const ctaColorLight = '#E09B6C';
  
  const buttonStyles = React.useMemo(() => StyleSheet.create({
    button: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.spacing.sm,
      minWidth: 120,
      alignItems: 'center',
      justifyContent: 'center',
      ...Platform.select({
        web: {
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
          ':active': {
            transform: 'translateY(0px)',
          },
        },
      }),
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    cta: {
      backgroundColor: ctaColor,
      borderRadius: theme.spacing.md,
      // Add subtle shadow for depth in both light and dark modes
      shadowColor: theme.dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 3,
      // Add subtle gradient effect using border
      borderWidth: 1,
      borderColor: theme.dark ? ctaColorDark : ctaColorLight,
      borderBottomColor: ctaColorDark,
      borderTopColor: ctaColorLight,
    },
    disabled: {
      backgroundColor: theme.colors.border,
      borderColor: theme.colors.border,
      shadowOpacity: 0,
      elevation: 0,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
    },
    primaryLabel: {
      color: '#FFF',
    },
    secondaryLabel: {
      color: theme.colors.primary,
    },
    ctaLabel: {
      color: '#FFF',
      fontWeight: '700',
      // Add subtle text shadow for better contrast in both modes
      textShadowColor: 'rgba(0,0,0,0.2)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 1,
    },
    disabledLabel: {
      color: theme.colors.text + '80', // 50% opacity
    },
  }), [theme]);

  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        buttonStyles[variant],
        disabled && buttonStyles.disabled,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text
        style={[
          buttonStyles.label,
          buttonStyles[`${variant}Label`],
          disabled && buttonStyles.disabledLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
