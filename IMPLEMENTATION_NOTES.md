# Implementation Notes - MyCompadres UI Polish

**Date:** November 14, 2025  
**Session:** UI Foundation & Branding

---

## ✅ Completed

### 1. Header Layout
**Structure:**
```
[Logo (double-tap easter egg)]    [Theme Toggle] [Profile Icon]
```

- **Profile Icon:** User icon when logged out, profile picture when logged in
- **Theme Toggle:** Sun/Moon icon, white color on orange header
- **Logo:** White variant, supports double-tap easter egg
- **All icons:** White (#FFFFFF) on orange header

### 2. Logo System
**CompadresLogo Component:**
- Supports `variant` prop: `'white' | 'dark' | 'auto'`
- Auto-detection based on theme
- Both files currently white (ready for client branding)
- Structure ready for customizable theming

**Files:**
- `src/assets/compadres-logo-white.png` (current)
- `src/assets/compadres-logo-dark.png` (placeholder for future)

### 3. Footer Component
**Location:** `src/components/Footer.tsx`

**Content:**
```
© 2025 Compadres
[Placeholder for company info]
```

**Easy to edit** - just update the text in Footer.tsx

### 4. Tab Structure
**Current (5 visible tabs):**
1. Home (placeholder for Voice screen)
2. Wins (Strategic Impact)
3. Edge (Competitive Edge)
4. Blueprint (Implementation Reality)
5. Insights (About)

**Hidden:**
- Sales Intelligence (easter egg via double-tap logo)
- Windsurf Partnership
- Unsubscribe

**Bottom Tab Selection:**
- Active tab: Compadres orange (#FF571E)
- Inactive tabs: Gray
- Already configured in CustomTabBar

### 5. Easter Egg
**Double-tap logo** → Navigate to Sales Intelligence screen
- Working as designed
- Can be repurposed for any hidden feature

---

## 🎨 Branding Ready

### Fonts (To Add)
**Primary:** Montserrat (bold, headers)  
**Secondary:** Open Sans (body text)

**Implementation:**
```bash
# Install fonts
npm install @expo-google-fonts/montserrat @expo-google-fonts/open-sans

# Load in App.tsx
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';
```

### Color System
**Orange:** `#FF571E` (primary, fixed in both modes)  
**Light mode:** White backgrounds, black text  
**Dark mode:** Black backgrounds, white text (DEFAULT)

**Header:** Always orange with white text/icons

---

## 📱 Layout Patterns

### Landing Page (Home)
**Target:** No scroll, all content visible in viewport

**Structure:**
```tsx
<View style={{ height: '100vh', justifyContent: 'space-between' }}>
  <Header /> {/* Orange, fixed */}
  
  <View style={{ flex: 1, justifyContent: 'center' }}>
    {/* Center content - Orb + metric */}
  </View>
  
  <Footer /> {/* Copyright */}
</View>
```

### Other Tabs
**Scrolling content allowed** - use ScrollView or FlatList

### Cards (MD3)
**Already available** via `react-native-paper`:
```tsx
import { Card } from 'react-native-paper';

<Card style={{ margin: 16 }}>
  <Card.Content>
    <Text>Content</Text>
  </Card.Content>
</Card>
```

---

## 🔐 Auth Integration (TODO)

### Profile Icon States
```typescript
// Not logged in
<User size={24} color="#FFFFFF" />

// Logged in with profile picture
<Image 
  source={{ uri: profilePicture }} 
  style={{ 
    width: 32, 
    height: 32, 
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF'
  }} 
/>
```

### Profile Picture Upload
**Settings Screen:**
- Tap profile picture → image picker
- Upload to backend
- Update user profile
- Refresh header

### Login Flow
1. Tap profile icon (not logged in)
2. Open login modal
3. Email/password or OAuth
4. JWT → session token
5. Store in AsyncStorage
6. Update header with profile picture

---

## 📋 Next Steps

### Immediate
- [ ] Add Montserrat and Open Sans fonts
- [ ] Create no-scroll landing page layout
- [ ] Replace mvara content with Compadres screens
- [ ] Implement voice interface (one-click orb)

### Settings Screen
- [ ] Profile picture upload
- [ ] Name edit (save button)
- [ ] Email display (locked, "Contact support")
- [ ] Password change flow
- [ ] Theme toggle
- [ ] Notification preferences

### Voice Screen
- [ ] Copy audio code from mvara SalesIntelligenceScreen
- [ ] Remove "Connect" button
- [ ] Make orb one-click
- [ ] Update Deepgram config for Compadres prompt

### Branding
- [ ] Get official Compadres white logo PNG
- [ ] Get Compadres dark logo PNG (for client branding)
- [ ] Apply Montserrat/Open Sans fonts
- [ ] Review wearecompadres.com for style consistency

---

## 🎯 Design Principles

### Minimalism
- No scroll on landing page
- Tight metrics (no fluff)
- Voice primary, text optional
- Clean, focused UI

### Founder-Focused
- Respect cognitive load
- Quick access to key info
- No typing burden
- Metrics auto-surface

### Accessibility
- Text transcript available
- High contrast (WCAG AAA)
- Screen reader support
- Keyboard navigation

### Customizable
- Client branding ready
- Logo variants supported
- Theme system extensible
- Easy to white-label

---

## 🔧 Technical Notes

### Safe Areas
**DO NOT MODIFY** CustomTabBar safe area logic - it's perfected.

### Theme System
Simple binary: light ↔ dark. No system detection.

### Navigation
Header via tab navigator (not separate component). Bottom tabs enabled.

### Package Manager
npm only (locked via `packageManager` field).

---

**Built by compadres, for compadres.**
