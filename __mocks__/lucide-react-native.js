// Mock for lucide-react-native icons in Jest tests
const React = require('react');

// Create mock components for all lucide icons
const mockIcon = (iconName) => {
  const MockIcon = (props) => React.createElement('View', { testID: `${iconName}Icon`, ...props });
  MockIcon.displayName = iconName;
  return MockIcon;
};

module.exports = {
  ArrowLeft: mockIcon('ArrowLeft'),
  Mic: mockIcon('Mic'),
  MicOff: mockIcon('MicOff'),
  Wifi: mockIcon('Wifi'),
  WifiOff: mockIcon('WifiOff'),
  Phone: mockIcon('Phone'),
  PhoneOff: mockIcon('PhoneOff'),
  Moon: mockIcon('Moon'),
  Sun: mockIcon('Sun'),
  Menu: mockIcon('Menu'),
  X: mockIcon('X'),
  Home: mockIcon('Home'),
  Info: mockIcon('Info'),
  Mail: mockIcon('Mail'),
  Shield: mockIcon('Shield'),
  // Add other icons as needed
};
