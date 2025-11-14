# Code Audit Notes

**Date**: 2025-04-21

## Project Setup & Config

- `package.json`: script `"dev": "./scripts/start.sh"` references missing file `scripts/start.sh`.
- Both `index.ts` and `index.js` exist with identical content (duplicate entry points).
- Dev dependency `react-native-dotenv` present, but no `.env` file or usage detected.
- Dependencies align with Expo SDK 52; verify no unused packages.
- `tsconfig.json`: extends `expo/tsconfig.base`, strict mode and alias `@/*` correctly configured.
- `babel.config.js`: uses `babel-preset-expo` and Reanimated plugin as expected.
- `metro.config.js`: default Expo Metro config.

## Entry Points

- Both `index.ts` and `index.js` exist with identical code registering the root component (`registerRootComponent(App)`), causing duplicate entry points. Consider removing one and updating the `main` field in `package.json` accordingly.
- In `App.tsx`:
  - `fontsLoaded` gates rendering of the main app, showing a basic `View`/`Text` fallback. Comments indicate web should render immediately, but the code still blocks. Consider updating logic or styling the loading view.

## App.tsx

- `ThemedApp` composes `PaperProvider` → `NavigationContainer` → `ToastProvider` → `ThemedNavigator` correctly.
- `fontsLoaded` gates rendering: although comment says "For web, we'll always render", code still blocks initial render on web. Consider using platform check to bypass or styling.
- Fallback loading view uses unstyled `<View><Text>Loading...</Text></View>`; add full-screen container or spinner for better UX.
- `prepareFonts` async function lacks error handling; consider try/catch and logging.

## Navigation (ThemedNavigator.tsx)

- Architecture: `DrawerNavigator` wraps `TabNavigator` with a `CustomDrawerContent` and hidden main header.
- `CustomDrawerContent`: Only one menu item (Sales Intel). No selected-item styling; icon mapping is hardcoded. Future items need proper highlighting and icon support.
- **HeaderBell**: Toggles between `Bell`/`BellDot` icons but has no external behavior (e.g. navigate to notifications). Consider adding a handler.
- **HeaderPaletteToggle** and **HeaderThemeToggle**: Defined but ensure they reflect system vs. custom palettes. `HeaderBackButton` exists but isn't used on hidden screens (e.g. Windsurf Partnership), causing no back navigation.
- **TabNavigator**:
  - Uses `Rocket` icon for both Competitive Edge and Insights; Insights should use a distinct icon (e.g., `BookOpen`).
  - Routes use `TAB_NAMES.ABOUT` for Insights, which is semantically confusing—rename to `INSIGHTS`.
  - Hidden screens (`SalesIntelligence`, `WindsurfPartnership`) use `tabBarButton: () => null`; Partnership also hides header completely, losing back-button.
  - `screenOptions` provide consistent header styling and toggle button, but no cleanup of event listeners in `TabNavigator`’s navigation events.
- Styles: Inline styles dominate; only drawer styles are centralized. Consider unifying styles in a stylesheet.

## Context Providers

- `PatternContext.unused.tsx` is unused; consider removing or implementing.
- **ThemeContext.tsx**:
  - Contains large `palettes` object with multiple palette types; consider moving palettes definitions to a separate file for maintainability.
  - Uses `AsyncStorage` to persist the entire `Theme` object under key `'theme'`; ensure versioning/migrations if schema changes.
  - `loadTheme` effect normalizes `headerTitle` but writes back on load; could cause storage churn.
  - `getThemeColors` handles invalid `paletteType` with a warning, good defensive coding.
  - `useEffect` recalculating theme on `[theme.themeMode, colorScheme, theme.paletteType]`; updating `theme` inside effect might trigger extra renders—confirm no infinite loops.
  - No cleanup needed for these effects.
  - `useTheme` throws if outside provider; correct.

## Reusable UI Components

- `Button.tsx`:
  - Styles via `StyleSheet.create` inside `useMemo` is efficient, but hardcoded white label (`#FFF`) should use theme.colors.onPrimary.
  - `variant='secondary'` border color uses `theme.colors.primary`, good.
  - Disabled label opacity uses `theme.colors.text + '80'`, consider using `onSurfaceVariant` or theme opacity utilities.
- `Text.tsx`:
  - Static colors (`#000`, `#666`) ignore dark mode and theme; should derive from theme.colors.text and onSurfaceVariant.
- `ThemeToggle.tsx`:
  - Uses `Sun`/`Moon` icons; ensure accessible `accessibilityLabel` and reflect system vs. user mode.
- `DownloadButton.tsx`:
  - Wraps `Button`; verify correct URL and error handling on web and native.
- `DownloadShareModal.tsx` & `WebShareModal.tsx`:
  - Ensure modal styling matches theme, accessibility labels, and dynamic share handlers use correct URLs (`mvara.ai`, X, LinkedIn).
- Other components (`DownloadShareModal`, `AnimationPatternCard`, `InteractiveCard`, `ValueCarousel`, `VideoCarousel`):
  - Large files: plan targeted review for theme usage, performance (FlatList vs ScrollView), and accessibility.

## Screens

- **HomeScreen.tsx**:
  - Extremely large (1,379 lines) combining business logic, privacy/TOS content, and UI. Extract privacy/TOS content into separate modules or JSON.
  - Static text and links hardcoded; consider using constants or config.
  - Inline styles and platform media queries mixed; centralize in stylesheet or use `ResponsiveLayout` component.
  - Multiple state hooks (privacy, modals, cookieNotice); consider grouping related state or using reducers.
  - Accessibility: missing `accessibilityLabel` on many `TouchableOpacity` elements.

- **SettingsScreen.tsx**, **InsightsScreen.tsx**, **CompetitiveEdgeScreen.tsx**, etc.:
  - Consistent use of `Surface` and `Chip` components from Paper; verify theme integration.
  - Hardcoded typography and spacing instead of theme spacing and text variants.
  - Repeated style patterns across screens; extract common styles.
  - Verify CTA button handlers match CTA_BUTTONS_TABLE.md.

- Hidden screens (`SalesIntelligenceScreen.tsx`, `WindsurfPartnershipScreen.tsx`):
  - Partnership screen hides header but lacks custom back button; implement `HeaderBackButton` to enable navigation.
  - Sales intel screen triggered via event emitter; ensure event unsubscription on unmount.

- Performance: large screens likely hinder initial bundle size; consider code-splitting or lazy loading screens.

## Next Steps

- Review utility functions in `src/utils` for naming, duplication, and side-effects.
- Audit test coverage in `__tests__` and `tests` directories.
- Finalize audit and address high-priority refactors.
