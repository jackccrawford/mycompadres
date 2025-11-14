import React from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

interface YouTubeEmbedProps {
  videoId: string;
  height?: number;
  width?: number;
  autoplay?: boolean;
  fullWidth?: boolean;
}

export const YouTubeEmbed = ({ 
  videoId, 
  height = 220,
  width = 320,
  autoplay = false,
  fullWidth = false
}: YouTubeEmbedProps) => {
  const autoplayParam = autoplay ? '1' : '0';
  
  // For web, we can use an iframe
  if (Platform.OS === 'web') {
    return (
      <View style={[
        styles.container, 
        fullWidth ? { width: '100%', height } : { width, height }
      ]}>
        <iframe
          style={{...styles.iframe, border: 'none'}}
          src={`https://www.youtube.com/embed/${videoId}?si=3RogzhPpWc0kf8Ym`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </View>
    );
  }
  
  // For native, we use WebView
  return (
    <View style={[
      styles.container, 
      fullWidth ? { width: '100%', height } : { width, height }
    ]}>
      <WebView
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&rel=0` }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 8,
  },
  iframe: {
    width: '100%',
    height: '100%',
  },
  webview: {
    flex: 1,
  },
});
