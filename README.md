# mVara Website Responsive Web App

A modern, well-structured React Native starter app that follows Material Design 3 principles.

[![Windsurf](https://img.shields.io/badge/Built%20with-Windsurf-0066CC.svg)](https://codeium.com/windsurf)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.76.6-blue.svg?style=flat&logo=react)](https://reactnative.dev/)
[![Material Design](https://img.shields.io/badge/Material%20Design-v3-000000.svg?style=flat&logo=materialdesign&logoColor=white)](https://m3.material.io/)
[![Expo](https://img.shields.io/badge/Expo-52.0.30-black.svg?style=flat&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Markdown](https://img.shields.io/badge/Markdown-000000?style=flat&logo=markdown&logoColor=white)](https://www.markdownguide.org/)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red)](https://opensource.org/)
[![Documentation](https://img.shields.io/badge/docs-latest-brightgreen.svg)](https://mvara-website-rwa.github.io/docs)
[![X](https://img.shields.io/badge/Follow-@jackccrawford-000000.svg?style=flat&logo=x)](https://x.com/jackccrawford)
[![ManagedV](https://img.shields.io/badge/By-ManagedV-4DFFD2.svg?style=flat)](https://www.managedv.com)

## Recent Updates

### April 2025: Improved In-App Navigation for Windsurf Partnership
- The "See Windsurf in Action" button in the Home > Partnership section now navigates directly to the in-app Windsurf Partnership screen (not an external link).
- Navigation uses the correct hidden tab route key (`WindsurfPartnership`) for seamless, back-arrow-enabled in-app experience.
- All navigation is handled via React Navigation 7.x, matching the latest codebase patterns.
- Event emitter logic for navigation is deprecated in favor of direct navigation prop usage for this flow.

### Responsive Image Handling
- The hero section and other major image displays use a custom ResponsiveImage component.
- This pattern ensures images maintain aspect ratio and resize smoothly across all web/mobile platforms.
- See `/src/screens/Home/HeroSection.tsx` for implementation details and code comments.

## Features

- 🎨 **Material Design 3**: Complete implementation of MD3 theming, components, and interactions
- 🌓 **Smart Theming**: Intuitive theme switching with automatic system theme detection
- 📱 **Navigation**: Production-ready drawer and tab navigation setup using React Navigation
- 📦 **Zero Config**: Ready to use with minimal setup required
- 🔒 **TypeScript**: Type-safe codebase with modern TypeScript practices

## Quick Start

```bash
# Clone the repository
git clone https://github.com/jackccrawford/mvara-website-rwa.git

# Install dependencies
cd mvara-website-rwa
npm install

# Start the development server
npx expo start --clear
```
Scan barcode to launch the Expo Go app on your iOS or Android device.

## Build and Deployment

### Web Deployment (Netlify)

```bash
# Build for web
npx expo export:web

# Deploy to Netlify as a draft (for testing)
netlify deploy --dir=web-build

# Deploy to production
netlify deploy --prod --dir=web-build
```

### Expo Go Deployment

The app is configured to work with Expo Go for development and testing:

```bash
# Start Expo development server
npx expo start

# Build a preview for Expo Go
npx expo export
```

> **Note**: Maintain the current package versions if the app is working correctly. The warnings about package updates are suggestions, not requirements, and updating packages can sometimes break working functionality.



=======
### Production Deployment with Netlify CLI

To deploy your latest Expo/React Native Web build to Netlify production:

1. **Export your static web build (from project root):**
   ```bash
   npx expo export
   ```
   This creates a `dist` directory with your static site files.

2. **Deploy to Netlify production:**
   ```bash
   netlify deploy --prod --dir=dist --site=yournetlifyid
   ```
   - Replace the `--site` value with your actual Netlify site ID if it changes.
   - The deploy directory is always `dist` (not `dist/web`).


3. **Result:**
   - Your site will be live at your Netlify production URL after a successful deploy.

> **Tip:** If you see errors about missing directories, check that you exported to `dist` and not another folder.

### Known Issues

### Platform Priorities

When implementing new features or addressing issues, follow this platform priority list:

1. **Highest Priority**: Device Web RWA in Chrome or Safari browser
2. **High Priority**: Desktop Web in any browser
3. **Medium Priority**: iOS native (not targeted for App Store release in near term)
4. **Low Priority**: Android (smaller market share)

This prioritization helps focus development efforts on the platforms most critical to the user experience.

## Customization

### Settings

The app includes a comprehensive settings screen with:
- Theme switching (Light/Dark/System) with intuitive icon-based toggle
- Custom header title configuration
- Direct links to GitHub and license information

### Color System

The app implements a carefully designed color system that:
- Provides optimal contrast in both light and dark modes
- Uses consistent patterns for selected/unselected states
- Follows Material Design 3 color token guidelines

### Theming

The app uses Material Design 3 theming system. You can customize the theme by modifying `src/theme/theme.ts`:

```typescript
const lightTheme = {
  colors: {
    primary: '#006495',
    // ... other color tokens
  },
  // ... other theme properties
};
```

### Navigation

Navigation is set up using React Navigation v7.x. The main navigation structure is defined in `src/navigation/ThemedNavigator.tsx`.

---

<p align="center">
  <i>Copyright 2025 Managed Ventures LLC.</i><br>
  <i>Scottsdale, AZ, USA</i>
</p>
