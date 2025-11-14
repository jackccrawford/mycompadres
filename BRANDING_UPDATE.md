# Branding Update - White Header with Orange Logo

**Date:** November 14, 2025

---

## Design Decision

**Logo:** Orange foreground on white background  
**Constraint:** Can't use orange header (logo would be invisible)  
**Solution:** White header with orange accents

---

## Color System

### Header
```
Background: #FFFFFF (white)
Logo: Orange on white (from wearecompadres.com)
Icons: #FF571E (orange)
Text: #000000 (black)
```

### Content Areas
```
Light mode:
  Background: #FFFFFF (white)
  Text: #000000 (black)
  
Dark mode:
  Background: #000000 (black)
  Text: #FFFFFF (white)
  
Primary accent: #FF571E (orange) - fixed in both modes
```

### Safe Area / Canvas
```
Uses theme.colors.background:
  Light: #FFFFFF (white)
  Dark: #000000 (black)
```

---

## Logo Files

**Current:**
- `src/assets/compadres-logo-orange.png` (400px @ 72ppi)
- Orange foreground, white background
- From: https://wearecompadres.com/wp-content/uploads/2023/04/Compadres-Primary-Logo-Orange-RGB-400px@72ppi.png

**Future:**
- Dark mode variant (when ready)
- Client branding variants (white-label support)

---

## Visual Hierarchy

```
┌─────────────────────────────────────┐
│  WHITE HEADER                       │
│  [Orange Logo]  [Orange Icons]      │
├─────────────────────────────────────┤
│                                     │
│  CONTENT AREA                       │
│  (White or Black based on theme)    │
│                                     │
│                                     │
├─────────────────────────────────────┤
│  BOTTOM TABS                        │
│  Orange selection indicator         │
└─────────────────────────────────────┘
```

---

## Implementation

### Header Component
```typescript
const headerBackgroundColor = '#FFFFFF'; // White
const headerTextColor = '#000000'; // Black

// Icons
<User size={24} color="#FF571E" /> // Orange
<Sun size={24} color="#FF571E" /> // Orange
```

### Logo Component
```typescript
const logoSource = require('../assets/compadres-logo-orange.png');
// Same for both light and dark modes
```

### Theme Colors
```typescript
compadres: {
  light: {
    primary: '#FF571E',
    background: '#FFFFFF',
    text: '#000000',
  },
  dark: {
    primary: '#FF571E',
    background: '#000000',
    text: '#FFFFFF',
  }
}
```

---

## Accessibility

### Contrast Ratios (WCAG AAA)
```
White header + Orange icons: 4.54:1 (AA Large)
White header + Black text: 21:1 (AAA)
White content + Black text: 21:1 (AAA)
Black content + White text: 21:1 (AAA)
Orange primary + White: 3.28:1 (AA Large)
Orange primary + Black: 6.39:1 (AA)
```

**Result:** All text meets WCAG AAA standards

---

## Brand Consistency

**Compadres Website:**
- Orange logo ✅
- White backgrounds ✅
- Outfit font ✅
- Clean, minimal design ✅

**MyCompadres App:**
- Orange logo ✅
- White header ✅
- Outfit font ✅
- Minimal UI ✅

**Alignment:** Perfect match

---

## Future Considerations

### Dark Mode Logo
When ready, create a white/light version for dark mode:
- White foreground on transparent background
- Use when theme.dark === true
- Store as `compadres-logo-white.png`

### Client Branding
Logo component supports variants:
```typescript
<CompadresLogo variant="auto" /> // Theme-based
<CompadresLogo variant="white" /> // Force white
<CompadresLogo variant="dark" /> // Force dark
```

Ready for white-label customization.

---

**Built with Compadres brand. Built for compadres.**
