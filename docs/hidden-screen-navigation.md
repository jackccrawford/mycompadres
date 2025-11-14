# Hidden Screen Navigation Implementation Guide

This document outlines the approach for implementing hidden screens with custom navigation in the mVara website. This pattern is useful for screens that should not appear in the main tab navigation but need to be accessible through specific actions.

## Current Implementation

We have two hidden screens in the application:

1. **Sales Intelligence Screen** (Easter egg, accessible via double-tap on logo)
2. **Windsurf Partnership Screen** (Accessible via "Discover How Windsurf Can Help Your Business" button)

## Implementation Steps

### 1. Define Screen Constants

In `src/navigation/ThemedNavigator.tsx`, add the screen name to the `TAB_NAMES` object:

```typescript
export const TAB_NAMES = {
  HOME: TAB[0],
  STRATEGIC_IMPACT: TAB[1],
  COMPETITIVE_EDGE: TAB[2],
  IMPLEMENTATION_REALITY: TAB[3],
  ABOUT: TAB[4],
  SALES_INTELLIGENCE: SPECIAL.EASTER_EGG,
  WINDSURF_PARTNERSHIP: 'WindsurfPartnership'
};
```

### 2. Create Event for Navigation

In `src/utils/eventEmitter.ts`, add a navigation event:

```typescript
export const EVENTS = {
  OPEN_PALETTE_MODAL: 'open_palette_modal',
  NAVIGATE_TO_SALES_INTELLIGENCE: 'navigate_to_sales_intelligence',
  NAVIGATE_TO_HOME: 'navigate_to_home',
  NAVIGATE_TO_WINDSURF: 'navigate_to_windsurf',
};
```

### 3. Add Event Listener in TabNavigator

In `src/navigation/ThemedNavigator.tsx`, add a listener for the navigation event:

```typescript
// Listen for the navigate to windsurf partnership event
const windsurfListener = () => {
  console.log('windsurfListener called');
  try {
    // Navigate to the Windsurf Partnership screen
    console.log('Attempting to navigate to:', TAB_NAMES.WINDSURF_PARTNERSHIP);
    navigation.navigate(TAB_NAMES.WINDSURF_PARTNERSHIP);
    console.log('Navigation completed');
  } catch (error) {
    console.error('Navigation error:', error);
  }
};

// Subscribe to events
eventEmitter.on(EVENTS.NAVIGATE_TO_HOME, homeListener);
eventEmitter.on(EVENTS.NAVIGATE_TO_SALES_INTELLIGENCE, salesIntelListener);
eventEmitter.on(EVENTS.NAVIGATE_TO_WINDSURF, windsurfListener);

// Clean up listeners when component unmounts
return () => {
  eventEmitter.off(EVENTS.NAVIGATE_TO_HOME, homeListener);
  eventEmitter.off(EVENTS.NAVIGATE_TO_SALES_INTELLIGENCE, salesIntelListener);
  eventEmitter.off(EVENTS.NAVIGATE_TO_WINDSURF, windsurfListener);
};
```

### 4. Add Screen to TabNavigator

In `src/navigation/ThemedNavigator.tsx`, add the screen to the TabNavigator but hide it from the tab bar:

```typescript
<Tab.Screen
  name={TAB_NAMES.WINDSURF_PARTNERSHIP}
  component={WindsurfPartnershipScreen}
  options={{
    tabBarButton: () => null, // Hide from tab bar, only accessible via button
    headerShown: false, // Hide the header completely since we have a custom back button
  }}
/>
```

### 5. Implement Trigger for Navigation

In the source component (e.g., HomeScreen.tsx), add a function to trigger navigation:

```typescript
// Function to navigate to Windsurf Partnership screen
const shareWindsurfDownload = () => {
  // Navigate to the Windsurf Partnership screen using event emitter
  eventEmitter.emit(EVENTS.NAVIGATE_TO_WINDSURF);
};

// Connect to a button or other UI element
<Button
  mode="outlined"
  onPress={shareWindsurfDownload}
  style={[styles.partnershipButton, { borderColor: theme.colors.primary }]}
  labelStyle={{ color: theme.colors.primary }}
>
  Discover How Windsurf Can Help Your Business
</Button>
```

### 6. Add Custom Back Button to the Hidden Screen

In the hidden screen component (e.g., WindsurfPartnershipScreen.tsx):

1. Import necessary components:

```typescript
import { TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
```

2. Add a back button handler:

```typescript
// Function to handle back button press
const handleBackPress = () => {
  navigation.goBack();
};
```

3. Add the back button to the UI:

```typescript
<TouchableOpacity 
  style={styles.backButton} 
  onPress={handleBackPress}
  accessibilityLabel="Go back"
  accessibilityHint="Returns to the previous screen"
>
  <ArrowLeft size={24} color={theme.colors.text} />
</TouchableOpacity>
```

4. Add styles for the back button:

```typescript
backButton: {
  marginBottom: 16,
  padding: 8,
  borderRadius: 20,
  alignSelf: 'flex-start',
},
```

## Testing

To test the implementation:

1. Click the trigger button/element to navigate to the hidden screen
2. Verify the screen appears correctly
3. Click the back button to return to the previous screen
4. Verify the navigation works as expected

## Best Practices

1. **Consistent Style**: Ensure the back button matches the style of other back buttons in the app
2. **Accessibility**: Include proper accessibility labels and hints
3. **Event Cleanup**: Always clean up event listeners when components unmount
4. **Error Handling**: Include try/catch blocks for navigation operations
5. **Debugging**: Add console logs during development to track navigation flow

## Troubleshooting

If navigation is not working:

1. Check console logs for errors
2. Verify the screen is properly registered in the TabNavigator
3. Ensure the event emitter is correctly set up and subscribed
4. Check that the screen component is properly imported and exported
