import React, { useState, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SalesIntelligenceScreen } from '../screens/SalesIntelligenceScreen';
import { StrategicImpactScreen } from '../screens/StrategicImpactScreen';
import { CompetitiveEdgeScreen } from '../screens/CompetitiveEdgeScreen';
import { ImplementationRealityScreen } from '../screens/ImplementationRealityScreen';
import { WindsurfPartnershipScreen } from '../screens/WindsurfPartnershipScreen';
import { UnsubscribeScreen } from '../screens/UnsubscribeScreen';
import InsightsScreen from '../screens/InsightsScreen';
import { useTheme, ThemeMode } from '../contexts/ThemeContext';
import { eventEmitter, EVENTS } from '../utils/eventEmitter';
import { Home, Settings, Menu, ChevronLeft, Bell, BellDot, Sun, Moon, Monitor, Palette, ArrowLeft, Code, Users, BookOpen, TrendingUp, Briefcase, Book, Rocket } from 'lucide-react-native';
import { Platform, TouchableOpacity, View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { getAccessibleHeaderColors } from '../utils/colorUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Define screens accessible from the drawer
const menuItems = [
  { label: 'Sales Intel', value: 'SalesIntelligenceScreen', icon: 'trending-up', screen: 'SalesIntelligenceScreen' },
];

const CustomDrawerContent = (props: any) => {
  const { theme } = useTheme();

  // Get current screen state
  const state = props.state;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      {menuItems.map((item) => {
        return (
          <DrawerItem
            key={item.value}
            label={item.label}
            icon={({ size }) => {
              // Use appropriate icon based on the item and theme
              if (item.icon === 'trending-up') {
                return <TrendingUp stroke={theme.colors.onSurface} width={size} height={size} />;
              }
              return null;
            }}
            onPress={() => {
              if (item.screen) {
                // Navigate to the screen within the Main tab navigator
                props.navigation.navigate('Main', { screen: item.screen });
              }
              props.navigation.closeDrawer();
            }}
            pressColor={`${theme.colors.primary}20`}
            pressOpacity={0.9}
            labelStyle={[
              styles.drawerItemText,
              {
                color: theme.colors.onSurface
              }
            ]}
            style={[
              styles.drawerItem,
              // No selected state styling
            ]}
          />
        );
      })}
    </DrawerContentScrollView>
  );
};

const HeaderBell = () => {
  const { theme } = useTheme();
  const [isActive, setIsActive] = useState(false);
  
  // Get accessible header colors
  const headerColors = useMemo(() => {
    return getAccessibleHeaderColors(theme.colors.primary);
  }, [theme.colors.primary]);

  return (
    <TouchableOpacity
      onPress={() => setIsActive(!isActive)}
      style={{ marginRight: 16 }}
    >
      {isActive ? (
        <BellDot size={24} color={theme.colors.primary} />
      ) : (
        <Bell size={24} color={headerColors.text} />
      )}
    </TouchableOpacity>
  );
};

/**
 * HeaderPaletteToggle component for color palette selection
 */
const HeaderPaletteToggle = () => {
  const { theme } = useTheme();
  
  // Get accessible header colors
  const headerColors = useMemo(() => {
    return getAccessibleHeaderColors(theme.colors.primary);
  }, [theme.colors.primary]);

  return (
    <TouchableOpacity
      onPress={() => {
        // Emit the event to open the palette modal
        eventEmitter.emit(EVENTS.OPEN_PALETTE_MODAL);
      }}
      style={{ marginRight: 24 }}
      accessibilityLabel="Open color palette"
      accessibilityHint="Opens the color palette selection modal"
    >
      <Palette size={24} color={headerColors.text} />
    </TouchableOpacity>
  );
};

/**
 * HeaderThemeToggle component for theme mode switching
 * Toggles between light and dark modes only
 */
export const HeaderThemeToggle = () => {
  const { theme, setThemeMode } = useTheme();
  
  const toggleTheme = () => {
    // Toggle between light and dark modes only
    const newMode = theme.themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };
  
  // Determine icon and color based on current theme
  const ThemeIcon = theme.dark ? Sun : Moon;
  const iconColor = theme.dark ? '#FFFFFF' : theme.colors.onSurfaceVariant;
  
  return (
    <TouchableOpacity
      style={{ marginRight: 16, padding: 8 }}
      onPress={toggleTheme}
      accessibilityLabel={`Switch to ${theme.dark ? 'light' : 'dark'} mode`}
      accessibilityHint={`Changes the app theme to ${theme.dark ? 'light' : 'dark'} mode`}
    >
      <ThemeIcon size={24} color={iconColor} />
    </TouchableOpacity>
  );
};

/**
 * HeaderBackButton component for navigation
 * Provides a back button in the header
 */
const HeaderBackButton = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  
  // Get accessible header colors
  const headerColors = useMemo(() => {
    return getAccessibleHeaderColors(theme.colors.primary);
  }, [theme.colors.primary]);
  
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ marginLeft: 16 }}
      accessibilityLabel="Go back"
      accessibilityHint="Returns to the previous screen"
    >
      <ChevronLeft size={24} color={headerColors.text} />
    </TouchableOpacity>
  );
};

// Tab navigation constants - generic structure
export const TAB = {
  0: 'Tab0',
  1: 'Tab1',
  2: 'Tab2',
  3: 'Tab3',
  4: 'Tab4'
};

// Special content
export const SPECIAL = {
  EASTER_EGG: 'EasterEgg',
  UNSUBSCRIBE: 'Unsubscribe'
};

// Tab header titles - content layer
export const TAB_HEADERS = {
  [TAB[0]]: 'mVara',
  [TAB[1]]: 'Wins',
  [TAB[2]]: 'Edge',
  [TAB[3]]: 'Blueprint',
  [TAB[4]]: 'Insights',
  [SPECIAL.EASTER_EGG]: 'Enterprise Value Simulator',
  [SPECIAL.UNSUBSCRIBE]: 'Unsubscribe',
  'WindsurfPartnership': 'Windsurf Partnership'
};

// For backward compatibility during refactoring
export const TAB_NAMES = {
  HOME: TAB[0],
  STRATEGIC_IMPACT: TAB[1],
  COMPETITIVE_EDGE: TAB[2],
  IMPLEMENTATION_REALITY: TAB[3],
  ABOUT: TAB[4],
  SALES_INTELLIGENCE: SPECIAL.EASTER_EGG,
  WINDSURF_PARTNERSHIP: 'WindsurfPartnership',
  UNSUBSCRIBE: SPECIAL.UNSUBSCRIBE
};

/**
 * Custom Tab Bar component for bottom navigation
 */
const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  
  // Skip rendering the tab bar for hidden screens
  if (state.routes[state.index].name === TAB_NAMES.SALES_INTELLIGENCE) {
    return null;
  }

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: theme.dark ? '#121212' : '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: theme.dark ? '#333333' : '#E0E0E0',
      paddingBottom: Math.max(insets.bottom, 8),
      paddingTop: 8,
      elevation: 8,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    }}>
      {state.routes.map((route, index) => {
        // Skip rendering tab button for hidden screens
        if (route.name === TAB_NAMES.SALES_INTELLIGENCE || route.name === TAB_NAMES.WINDSURF_PARTNERSHIP || route.name === TAB_NAMES.UNSUBSCRIBE) {
          return null;
        }
        
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (typeof options.tabBarLabel === 'string' 
                ? options.tabBarLabel 
                : route.name)
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Get the icon component from options
        const Icon = options.tabBarIcon ? 
          options.tabBarIcon({ 
            focused: isFocused, 
            color: isFocused ? '#FF571E' : (theme.dark ? '#999999' : '#666666'), 
            size: 24 
          }) : 
          null;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={`${label} tab`}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 4,
              borderTopWidth: 3,
              borderTopColor: isFocused ? '#FF571E' : 'transparent',
              // @ts-ignore - web only
              outlineStyle: 'none',
            }}
          >
            {Icon}
            <Text style={{
              color: isFocused ? '#FF571E' : (theme.dark ? '#999999' : '#666666'),
              fontSize: 12,
              marginTop: 4,
              fontWeight: isFocused ? '600' : '400',
            }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

/**
 * Tab Navigator component that provides the main app navigation
 */
const TabNavigator = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  // Use proper typing for navigation to avoid type errors
  const navigation = useNavigation<any>();
  
  // Directly set header colors for maximum reliability
  // This ensures the header styling works correctly in both light and dark modes
  const headerBackgroundColor = theme.dark ? '#000000' : '#FFFFFF';
  const headerTextColor = theme.dark ? '#FFFFFF' : '#49454F'; // Using a specific gray color for light mode
  
  // Memoize header colors to prevent unnecessary re-renders
  const headerColors = useMemo(() => {
    return {
      backgroundColor: headerBackgroundColor,
      textColor: headerTextColor,
    };
  }, [theme.dark]);
  
  // Set up event listeners for navigation
  React.useEffect(() => {
    // Listen for the navigate to home event
    const homeListener = () => {
      // @ts-ignore - Type safety handled by navigator
      navigation.navigate('Home');
    };
    
    // Listen for the navigate to sales intelligence event
    const salesIntelListener = () => {
      try {
        // For cross-platform compatibility, we need to handle navigation differently
        // The key is that we're already IN the TabNavigator component when this event fires
        // So we can directly navigate to the screen within this navigator
        
        // Get the current route name to avoid unnecessary navigation
        const currentRouteName = navigation.getCurrentRoute()?.name;
        
        // Since we're already in the TabNavigator, we can directly navigate to the screen
        navigation.jumpTo(TAB_NAMES.SALES_INTELLIGENCE);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    };
    
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
  }, [navigation])
  
  /**
   * HeaderLogo component with double-tap detection for easter egg
   * Uses appropriate logo image based on current theme
   */
  const HeaderLogo = () => {
    const [lastTap, setLastTap] = useState(0);
    const DOUBLE_TAP_DELAY = 300; // ms between taps to count as double-tap
    // Use navigation hook at the top level of the component
    const navigation = useNavigation<any>();
    const { theme } = useTheme();
    
    const handleLogoPress = () => {
      const now = Date.now();
      const DOUBLE_PRESS_DELAY = 300;
      
      if (now - lastTap < DOUBLE_PRESS_DELAY) {
        // Double tap detected - navigate to easter egg
        try {
          // On mobile platforms, we need to be explicit about the navigation path
          // This ensures cross-platform compatibility
          navigation.getParent()?.navigate('Main', {
            screen: TAB_NAMES.SALES_INTELLIGENCE
          });
        } catch (error) {
          console.error('Navigation error:', error);
          // Fallback to event emitter as a last resort
          eventEmitter.emit(EVENTS.NAVIGATE_TO_SALES_INTELLIGENCE);
        }
      }
      
      setLastTap(now);
    };
    
    // Use the appropriate logo based on theme mode
    // For light mode, use the white background logo
    // For dark mode, use the orange logo
    const logoSource = theme.dark 
      ? require('../assets/compadres-logo-orange.png')
      : require('../assets/compadres-logo-orange.png');
    
    return (
      <TouchableOpacity 
        onPress={handleLogoPress}
        style={{ paddingHorizontal: 12, paddingVertical: 12 }}
        accessibilityLabel="mVara logo"
        accessibilityHint="Double tap to access special features"
      >
        <Image
          source={logoSource}
          style={{
            height: 50,
            width: 100,
            resizeMode: 'contain',
            tintColor: undefined // No tint in any mode
          }}
        />
      </TouchableOpacity>
    );
  };
  
  // Use the logo component as the header title
  const renderTitle = () => <HeaderLogo />;

  return (
    <Tab.Navigator
      initialRouteName={TAB_NAMES.HOME}
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: headerBackgroundColor,
          shadowColor: 'transparent',
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: headerTextColor,
        headerTitle: renderTitle,
        headerRight: () => <HeaderThemeToggle />,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.outline,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      }}
    >
      <Tab.Screen
        name={TAB_NAMES.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
          tabBarLabel: 'Voice',
        }}
      />
      <Tab.Screen
        name={TAB_NAMES.STRATEGIC_IMPACT}
        component={StrategicImpactScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Briefcase size={size} color={color} />
          ),
          tabBarLabel: 'Entrepreneur',
        }}
      />
      <Tab.Screen
        name={TAB_NAMES.COMPETITIVE_EDGE}
        component={CompetitiveEdgeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Users size={size} color={color} />
          ),
          tabBarLabel: 'Advisory',
        }}
      />
      <Tab.Screen
        name={TAB_NAMES.IMPLEMENTATION_REALITY}
        component={ImplementationRealityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TrendingUp size={size} color={color} />
          ),
          tabBarLabel: 'Growth',
        }}
      />
      <Tab.Screen
        name={TAB_NAMES.ABOUT}
        component={InsightsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
          tabBarLabel: 'Settings',
        }}
      />
      <Tab.Screen
        name={TAB_NAMES.SALES_INTELLIGENCE}
        component={SalesIntelligenceScreen}
        options={{
          tabBarButton: () => null, // Hide from tab bar, only accessible via easter egg
        }}
      />
      <Tab.Screen
        name={TAB_NAMES.WINDSURF_PARTNERSHIP}
        component={WindsurfPartnershipScreen}
        options={{
          tabBarButton: () => null, // Hide from tab bar, only accessible via button
          headerTitle: 'Windsurf Partnership',
          headerShown: false, // Hide the header completely since we have a custom back button
        }}
      />
      <Tab.Screen
        name={TAB_NAMES.UNSUBSCRIBE}
        component={UnsubscribeScreen}
        options={{
          tabBarButton: () => null, // Hide from tab bar, only accessible via URL
          headerTitle: 'Unsubscribe',
          headerShown: true,
          headerStyle: {
            backgroundColor: headerBackgroundColor,
            shadowColor: 'transparent',
            elevation: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: headerTextColor,
        }}
      />
    </Tab.Navigator>
  );
};

export const ThemedNavigator = () => {
  const { theme } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.surface,
          width: Platform.OS === 'web' ? 280 : '80%',
          maxWidth: 350,
          minWidth: 250,
        },
        overlayColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Drawer.Screen
        name="Main"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    marginHorizontal: 12,
    marginVertical: 0,
    borderRadius: 28,
  },
  drawerItemText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});
