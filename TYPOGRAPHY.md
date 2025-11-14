# Typography System - MyCompadres

**Brand Font:** Outfit (from wearecompadres.com)

---

## Font Family

**Outfit** - Modern, geometric sans-serif  
**Source:** Google Fonts via `@expo-google-fonts/outfit`

**Weights:**
- Regular (400)
- Medium (500)
- SemiBold (600)
- Bold (700)

---

## Base Styles (from wearecompadres.com)

```css
font-family: Outfit;
font-size: 17px;
line-height: 26px;
font-weight: 400;
```

---

## Typography Scale

### Font Sizes
```typescript
xs: 12px
sm: 14px
md: 16px
base: 17px  // Compadres default
lg: 18px
xl: 20px
xxl: 24px
xxxl: 32px
```

### Line Heights
```typescript
xs: 16px
sm: 20px
md: 24px
base: 26px  // Compadres default
lg: 28px
xl: 32px
xxl: 36px
xxxl: 40px
```

---

## Text Styles

### Headings
```typescript
// H1 - Page titles
h1: {
  fontFamily: Outfit Bold
  fontSize: 32px
  lineHeight: 40px
  fontWeight: 700
}

// H2 - Section titles
h2: {
  fontFamily: Outfit Bold
  fontSize: 24px
  lineHeight: 36px
  fontWeight: 700
}

// H3 - Subsection titles
h3: {
  fontFamily: Outfit SemiBold
  fontSize: 20px
  lineHeight: 32px
  fontWeight: 600
}

// H4 - Card titles
h4: {
  fontFamily: Outfit SemiBold
  fontSize: 18px
  lineHeight: 28px
  fontWeight: 600
}
```

### Body Text
```typescript
// Body (default)
body: {
  fontFamily: Outfit Regular
  fontSize: 17px
  lineHeight: 26px
  fontWeight: 400
}

// Body Small
bodySmall: {
  fontFamily: Outfit Regular
  fontSize: 14px
  lineHeight: 20px
  fontWeight: 400
}

// Body Medium
bodyMedium: {
  fontFamily: Outfit Medium
  fontSize: 17px
  lineHeight: 26px
  fontWeight: 500
}

// Body Large
bodyLarge: {
  fontFamily: Outfit Regular
  fontSize: 18px
  lineHeight: 28px
  fontWeight: 400
}
```

### UI Elements
```typescript
// Button text
button: {
  fontFamily: Outfit SemiBold
  fontSize: 16px
  fontWeight: 600
}

// Caption text
caption: {
  fontFamily: Outfit Regular
  fontSize: 12px
  lineHeight: 16px
  fontWeight: 400
}

// Label text
label: {
  fontFamily: Outfit Medium
  fontSize: 14px
  fontWeight: 500
}
```

---

## Usage

### Import
```typescript
import { globalTextStyles, getTextStyle } from '../styles/globalStyles';
import { typography } from '../utils/fontUtils';
```

### Basic Usage
```tsx
import { Text } from 'react-native';
import { globalTextStyles } from '../styles/globalStyles';

// Heading
<Text style={globalTextStyles.h1}>Welcome to MyCompadres</Text>

// Body text
<Text style={globalTextStyles.body}>Your AI companion team</Text>

// With color
<Text style={[globalTextStyles.h2, { color: theme.colors.primary }]}>
  Orange Heading
</Text>
```

### Helper Function
```tsx
import { getTextStyle } from '../styles/globalStyles';

<Text style={getTextStyle('h1', theme.colors.text)}>
  Themed Heading
</Text>
```

### Custom Styles
```tsx
<Text style={[
  globalTextStyles.body,
  { 
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 16,
  }
]}>
  Centered body text
</Text>
```

---

## Font Loading

**Location:** `src/utils/fontUtils.ts`

```typescript
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit';

export const loadFonts = async () => {
  await Font.loadAsync({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });
};
```

**Loaded in:** `App.tsx` (before rendering)

---

## Design Principles

### Consistency
- Use predefined styles from `globalTextStyles`
- Don't create custom font sizes unless necessary
- Stick to the scale

### Hierarchy
- H1 for page titles
- H2 for major sections
- H3 for subsections
- Body for content
- Caption for metadata

### Readability
- Base font size: 17px (Compadres standard)
- Line height: 26px (1.53 ratio)
- Generous spacing between elements
- High contrast text colors

### Accessibility
- Minimum font size: 12px (captions)
- Sufficient line height for readability
- High contrast ratios (WCAG AAA)
- Support for system font scaling

---

## Brand Alignment

**Compadres Website:**
- Font: Outfit
- Base size: 17px
- Line height: 26px
- Weight: 400 (regular)

**MyCompadres App:**
- ✅ Same font family (Outfit)
- ✅ Same base size (17px)
- ✅ Same line height (26px)
- ✅ Same weight scale (400-700)

**Result:** Perfect brand consistency

---

## Next Steps

1. ✅ Install Outfit font
2. ✅ Create typography scale
3. ✅ Define global text styles
4. 🚧 Apply to all screens
5. 🚧 Test font loading
6. 🚧 Verify brand consistency

---

**Built with Outfit. Built for compadres.**
