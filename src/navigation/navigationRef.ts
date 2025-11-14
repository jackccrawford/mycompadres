import { createNavigationContainerRef, NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { eventEmitter, EVENTS } from '../utils/eventEmitter';

// Define a basic type for navigation params
type RootStackParamList = {
  Home: undefined;
  SalesIntelligenceScreen: undefined;
  [key: string]: undefined | object;
};

// Create a navigation reference that can be used outside of components
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Navigate to a specific screen
 * @param name Name of the screen to navigate to
 * @param params Parameters to pass to the screen
 */
export function navigate(name: keyof RootStackParamList, params?: object) {
  if (navigationRef.isReady()) {
    // For nested navigators, we need to handle navigation differently
    if (name === 'Home') {
      // Navigate to the Main screen first (Drawer Navigator), then to Home tab
      navigationRef.navigate('Main' as never, {
        screen: 'TabNavigator',
        params: {
          screen: 'Home'
        }
      } as never);
    } else if (name === 'SalesIntelligenceScreen') {
      // Navigate to the Main screen first (Drawer Navigator), then to SalesIntelligenceScreen
      // For deeply nested screens, we need to specify the full path
      navigationRef.navigate('Main' as never, {
        screen: 'TabNavigator',
        params: {
          screen: 'SalesIntelligenceScreen'
        }
      } as never);
    } else {
      // For other screens, use standard navigation
      navigationRef.navigate(name as never, params as never);
    }
  } else {
    // We can store the navigation for when the ref is ready
    console.warn('Navigation attempted before navigationRef was ready');
  }
}

/**
 * Reset the navigation state to a specific screen
 * @param name Name of the screen to reset to
 * @param params Parameters to pass to the screen
 */
export function resetTo(name: keyof RootStackParamList, params?: object) {
  if (navigationRef.isReady()) {
    // For nested navigators, we need to handle reset differently
    if (name === 'Home') {
      // Reset to the Main screen with Home tab as the active screen
      navigationRef.reset({
        index: 0,
        routes: [{ 
          name: 'Main',
          state: {
            routes: [{ 
              name: 'TabNavigator',
              state: {
                routes: [{ name: 'Home' }],
                index: 0
              }
            }],
            index: 0,
          }
        }],
      });
    } else if (name === 'SalesIntelligenceScreen') {
      // Reset to the Main screen with SalesIntelligenceScreen as the active screen
      navigationRef.reset({
        index: 0,
        routes: [{ 
          name: 'Main',
          state: {
            routes: [{ 
              name: 'TabNavigator',
              state: {
                routes: [{ name: 'SalesIntelligenceScreen' }],
                index: 0
              }
            }],
            index: 0,
          }
        }],
      });
    } else {
      // For other screens, use standard reset
      navigationRef.reset({
        index: 0,
        routes: [{ name: name as never, params: params as never }],
      });
    }
  } else {
    console.warn('Navigation reset attempted before navigationRef was ready');
  }
}

/**
 * Go back to the previous screen
 */
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  } else {
    // If we can't go back, we should go to the home screen
    resetTo('Home');
  }
}

/**
 * Get the current route name
 * @returns The name of the current route or undefined if not available
 */
export function getCurrentRouteName(): string | undefined {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name as string;
  }
  return undefined;
}
