import { createNavigationContainerRef } from '@react-navigation/native';
import { eventEmitter, EVENTS } from '../utils/eventEmitter';

// Create a navigation reference that can be used outside of components
export const navigationRef = createNavigationContainerRef();

/**
 * Navigate to the Home screen from anywhere in the app
 */
export function navigateToHome() {
  if (navigationRef.isReady()) {
    // Use reset to clear the navigation stack
    navigationRef.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  } else {
    // Fall back to event emitter if navigation ref isn't ready
    eventEmitter.emit(EVENTS.NAVIGATE_TO_HOME);
  }
}

/**
 * Navigate to the SalesIntelligenceScreen from anywhere in the app
 */
export function navigateToSalesIntelligence() {
  if (navigationRef.isReady()) {
    navigationRef.navigate('SalesIntelligenceScreen');
  } else {
    // Fall back to event emitter if navigation ref isn't ready
    eventEmitter.emit(EVENTS.NAVIGATE_TO_SALES_INTELLIGENCE);
  }
}

/**
 * Get the current route name
 * @returns The name of the current route or undefined if not available
 */
export function getCurrentRouteName(): string | undefined {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
  return undefined;
}
