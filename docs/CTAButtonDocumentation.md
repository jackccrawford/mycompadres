# mVara CTA Button Documentation

## Overview

This document provides comprehensive guidance on using the Call-to-Action (CTA) button system in the mVara website. The system includes a specialized `CTAButton` component that uses a vibrant orange color (`#D3824B`) to draw attention to important actions.

## Button Color Scheme

The CTA button system uses the following colors:

- **Primary CTA Color**: `#D3824B` (vibrant orange)
- **Text Color**: `#FFFFFF` (white) for filled buttons
- **Border Color**: Matches the CTA color for outlined variant

## Components

### 1. CTAButton Component

The `CTAButton` component is a specialized button designed for high-visibility call-to-action elements. It maintains the pill shape design language of the mVara website.

**Location**: `/src/components/CTAButton.tsx`

**Props**:
- `label` (string, required): The text to display on the button
- `variant` ('filled' | 'outlined', default: 'filled'): Button style variant
- `style` (ViewStyle, optional): Additional styles to apply to the button
- `textStyle` (TextStyle, optional): Additional styles to apply to the button text
- `disabled` (boolean, optional): Whether the button is disabled
- All standard Pressable props are also supported

**Usage Example**:
```tsx
import { CTAButton } from '../components/CTAButton';

// Basic usage
<CTAButton
  label="Get Started"
  onPress={() => handlePress()}
/>

// With variant
<CTAButton
  label="Learn More"
  variant="outlined"
  onPress={() => handlePress()}
/>

// With custom styling
<CTAButton
  label="Submit"
  onPress={() => handleSubmit()}
  style={{ 
    width: '100%',
    maxWidth: 320,
    alignSelf: 'center',
    marginTop: 16
  }}
/>
```

### 2. Theme Integration

The CTA color is integrated into the theme system as the tertiary color in the Material Design 3 theme. This allows using the tertiary color for CTA buttons throughout the app while maintaining compatibility with both dark and light modes.

**Location**: `/src/utils/paperThemeUtils.ts`

The theme defines:
- `tertiary`: The main CTA color (`#D3824B`)
- `onTertiary`: The text color for CTA buttons (`#FFFFFF`)
- `tertiaryContainer`: A lighter/darker version of the CTA color for containers
- `onTertiaryContainer`: Text color for tertiary containers

## Button Variants

### Filled CTA Button

The default variant with a solid orange background and white text.

```tsx
<CTAButton
  label="Get Started"
  onPress={() => handlePress()}
/>
```

### Outlined CTA Button

A more subtle variant with a transparent background, orange border, and orange text.

```tsx
<CTAButton
  label="Learn More"
  variant="outlined"
  onPress={() => handlePress()}
/>
```

## Button States

The CTAButton component handles the following states:

1. **Default**: Normal appearance
2. **Pressed**: Slightly darker with reduced shadow
3. **Disabled**: Gray appearance with no shadow

## Styling Guidelines

1. **Maintain Pill Shape**: Always use `borderRadius: 9999` for CTA buttons to maintain the pill shape design
2. **Width**: For full-width buttons, use `width: '100%'` with `maxWidth: 320` for consistency
3. **Spacing**: Use `marginVertical: 8` or `marginTop: 16` for proper spacing
4. **Alignment**: Use `alignSelf: 'center'` to center buttons in their containers

## Demo Components

### ButtonDemo Component

A component that showcases all button variants for testing and reference.

**Location**: `/src/components/ButtonDemo.tsx`

### ButtonTestScreen

A screen that demonstrates all button styles in both light and dark modes.

**Location**: `/src/screens/ButtonTestScreen.tsx`

## Implementation Examples

### Assessment Button on HomeScreen

```tsx
<CTAButton
  label="AI Readiness Assessment"
  onPress={() => setShowAssessmentModal(true)}
  style={styles.assessmentButton}
/>
```

### Submit Button in Modal

```tsx
<CTAButton
  label={isSubmitting ? 'Submitting...' : 'Submit Request'}
  onPress={handleSubmit}
  disabled={isSubmitting}
  style={{ 
    width: '100%', 
    maxWidth: 320, 
    alignSelf: 'center', 
    marginTop: 16,
    borderRadius: 9999 // Ensuring pill shape
  }}
/>
```

## Best Practices

1. **Use Sparingly**: Reserve CTA buttons for the most important actions on each screen
2. **Consistent Labeling**: Use clear, action-oriented labels (e.g., "Get Started", "Submit", "Learn More")
3. **Maintain Shape**: Always ensure the pill shape is preserved (borderRadius: 9999)
4. **Accessibility**: Ensure buttons have appropriate hit areas (minimum 44×44 points)
5. **Responsive Design**: Adapt button width based on screen size while maintaining consistent styling

## Debugging

If buttons don't appear correctly:

1. Check that the `borderRadius` is set to `9999` for pill shape
2. Verify the theme is properly configured with the CTA color as tertiary
3. Ensure the button has appropriate padding and dimensions
4. Test in both light and dark modes to ensure proper contrast

## Migration Guide

When updating existing buttons to use the CTA style:

1. Import the CTAButton component
2. Replace existing Button components with CTAButton
3. Move the button text to the `label` prop
4. Transfer any custom styling to the `style` prop
5. Ensure the pill shape is maintained
