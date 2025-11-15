const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Explicitly disable static rendering for web to prevent expo-router detection
// This fixes the build issue where Expo tries to pre-render the initial route
// and incorrectly detects expo-router requirements
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,  // Disable for web to prevent SSR/SSG detection
    },
  }),
};

// Force single-page app mode for web (no static generation)
if (!config.web) {
  config.web = {};
}
config.web.output = 'single';

module.exports = config;
