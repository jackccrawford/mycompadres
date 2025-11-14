# MyCompadres PWA Migration Status

**From:** mvara-website-rwa  
**To:** MyCompadres PWA  
**Date:** November 14, 2025

---

## ✅ Completed

### 1. Project Setup
- Cloned mvara-website-rwa to ~/Dev/mycompadres
- Removed node_modules, .expo, .git (clean slate)

### 2. Theme System
- **Added Compadres orange palette** (`#FF571E`)
  - Light mode: white backgrounds, black text
  - Dark mode: black backgrounds, white text (DEFAULT)
  - Orange primary color fixed in both modes
- **Removed system mode** - only light/dark toggle
- **Updated default theme** to Compadres dark mode
- **Simplified theme logic** - no system detection

### 3. Navigation
- **Enabled bottom tab bar** (was hidden in mvara)
- **Fixed header to orange** (`#FF571E`) in both modes
- **White text always** on orange header
- **Safe area logic preserved** (don't touch!)

### 4. Branding
- **Created CompadresLogo component** (white only, no theme switching)
- **Logo path:** `src/assets/compadres-logo-white.png` (NEEDS FILE)

---

## 🚧 Next Steps

### 5. Content Migration
- [ ] Strip mvara screens (Strategic Impact, Competitive Edge, etc.)
- [ ] Create placeholder screens:
  - Voice screen (tap orb to talk)
  - Metrics screen
  - Resources screen
  - Settings screen
- [ ] Update tab structure (3-4 tabs max)

### 6. Voice Interface
- [ ] Copy working audio code from mvara SalesIntelligenceScreen
- [ ] Remove "Connect" button - make orb one-click
- [ ] Update Deepgram config for Compadres AI prompt
- [ ] Test audio streaming on web

### 7. Settings Screen
- [ ] Account section (name editable, email locked, password change)
- [ ] Preferences (theme toggle, notifications)
- [ ] Support section (contact placeholder)
- [ ] Sign out button

### 8. Assets Needed
- [ ] `src/assets/compadres-logo-white.png` (white logo for orange header)
- [ ] Update favicon/PWA icons
- [ ] Update manifest.json

### 9. Deployment
- [ ] Update package.json (name, description)
- [ ] Configure Netlify deployment
- [ ] Set up environment variables (Deepgram API key)
- [ ] Test PWA manifest

---

## 🎨 Design System

### Colors
```typescript
Orange:  #FF571E  // Primary (fixed in both modes)
Light:   #FFFFFF  // Backgrounds in light mode
Dark:    #000000  // Backgrounds in dark mode
```

### Header
- Background: `#FF571E` (always)
- Text: `#FFFFFF` (always)
- Logo: White PNG (always)

### Content Areas
- Light mode: white backgrounds, black text
- Dark mode: black backgrounds, white text

### Tab Bar
- Follows theme (light/dark)
- Active tab: orange accent
- Icons: Lucide React Native

---

## 🔧 Technical Notes

### Safe Area
**DO NOT MODIFY** the safe area logic in:
- `CustomTabBar` component (lines 227-316 in ThemedNavigator.tsx)
- Took days to perfect, works correctly

### Bottom Tab Navigation
- Enabled via `tabBar={(props) => <CustomTabBar {...props} />}`
- Hidden screens use `tabBarButton: () => null`
- Header implemented via tab navigator (not separate component)

### Theme Toggle
- Simple binary: light ↔ dark
- No system detection
- Icon changes: Sun (dark mode) / Moon (light mode)

### Logo Component
- Always white PNG
- No theme-based switching
- Sized for header (100x50 default)

---

## 📦 Installation

```bash
cd ~/Dev/mycompadres
bun install
bun start
```

---

## 🤝 Compadres

Built by compadres, for compadres.

- Jack: Vision & direction
- Clive: Founder's instinct
- Aurora: Architecture
- Meridian: Implementation
- The network: Consciousness
