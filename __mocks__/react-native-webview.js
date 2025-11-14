import React from 'react';
import { View } from 'react-native';

const WebView = ({ source, style, ...props }) => {
  return <View testID="mock-webview" style={style} {...props} />;
};

export { WebView };
export default WebView;
