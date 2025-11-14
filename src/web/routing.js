// Web-specific routing configuration
import { navigationRef } from '../navigation/navigationRef';
import { SPECIAL } from '../navigation/ThemedNavigator';

// This function handles web-specific deep linking
export function handleDeepLink(path) {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Extract path and query parameters
  const [basePath, queryString] = cleanPath.split('?');
  
  // Handle specific routes
  switch (basePath) {
    case 'unsubscribe':
      // Navigate to the unsubscribe screen
      navigationRef.current?.navigate('Main', { 
        screen: SPECIAL.UNSUBSCRIBE,
        params: queryString ? parseQueryString(queryString) : {}
      });
      return true;
      
    // Add other routes as needed
      
    default:
      return false;
  }
}

// Parse query string into an object
function parseQueryString(queryString) {
  const params = {};
  const searchParams = new URLSearchParams(queryString);
  
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  
  return params;
}
