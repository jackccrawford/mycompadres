import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

interface VideoData {
  id: string;
  title: string;
}

interface VideoCarouselProps {
  autoPlay?: boolean;
  autoRotate?: boolean;
  rotationInterval?: number;
  height?: number | string;
  width?: number | string;
}

// Helper function to detect mobile web browsers
const isWebMobile = () => {
  if (Platform.OS !== 'web') return false;
  
  // Check for touch capability first (most reliable for modern devices)
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return true;
  
  // Fallback to user agent check for older browsers
  if (typeof navigator !== 'undefined') {
    const userAgent = navigator.userAgent.toLowerCase();
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
  }
  
  return false;
};

export const VideoCarousel = ({
  autoPlay = false,
  autoRotate = true,
  rotationInterval = 15000, // 15 seconds
  height = 315,
  width = '100%',
}: VideoCarouselProps) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // For swipe gesture handling
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isMobile = Platform.OS !== 'web' || (Platform.OS === 'web' && isWebMobile());
  
  // Sample videos - these could be fetched from an API in a real application
  const videos: VideoData[] = [
    {
      id: 'uSL8lsDf354',
      title: 'Windsurf: I Built a Company in 60 Days',
    },
    {
      id: 'TZ8UVFiTfdU',
      title: 'Windsurf: Wave 7 Cascade on JetBrains',
    },
  ];

  // Handle rotation of videos
  useEffect(() => {
    if (autoRotate && videos.length > 1) {
      // Clear any existing timer
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
      
      // Set up a new timer
      autoRotateTimerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
        setLoading(true); // Reset loading state for the new video
      }, rotationInterval);
    }
    
    // Clean up timer on unmount
    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [autoRotate, rotationInterval, videos.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    setLoading(true);
    resetAutoRotateTimer();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setLoading(true);
    resetAutoRotateTimer();
  };

  const resetAutoRotateTimer = () => {
    if (autoRotate && autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
      autoRotateTimerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
        setLoading(true);
      }, rotationInterval);
    }
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  // Generate YouTube embed URL without autoplay to avoid disturbing users
  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?si=7mdnnMS_d1x4Ni9w&rel=0`;
  };



  // Handle touch start event for swipe detection
  const handleTouchStart = (e: GestureResponderEvent) => {
    touchStartXRef.current = e.nativeEvent.pageX;
    touchStartYRef.current = e.nativeEvent.pageY;
  };

  // Handle touch end event for swipe detection
  const handleTouchEnd = (e: GestureResponderEvent) => {
    if (touchStartXRef.current === null) return;
    
    const touchEndX = e.nativeEvent.pageX;
    const touchEndY = e.nativeEvent.pageY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - (touchStartYRef.current || 0);
    
    // Only register horizontal swipes where the horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Swipe right - go to previous
        handlePrevious();
      } else {
        // Swipe left - go to next
        handleNext();
      }
    }
    
    // Reset touch coordinates
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // For web platform, we can use an iframe directly
  const renderWebVideo = () => {
    const currentVideo = videos[currentIndex];
    
    return (
      <View 
        style={styles.videoContainer}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        )}
        <iframe 
          src={getYouTubeEmbedUrl(currentVideo.id)}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
          onLoad={handleLoadEnd}
          style={{ borderRadius: 8 }}
        />
      </View>
    );
  };

  // For native platforms, we need to use WebView
  const renderNativeVideo = () => {
    const currentVideo = videos[currentIndex];
    
    return (
      <View 
        style={styles.videoContainer}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        )}
        <WebView
          source={{ uri: getYouTubeEmbedUrl(currentVideo.id) }}
          style={styles.webView}
          onLoad={handleLoadEnd}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { height: height, width: width } as any]}>
      {/* Video Player */}
      {Platform.OS === 'web' ? renderWebVideo() : renderNativeVideo()}
      
      {/* Navigation Controls - Only show on non-mobile or web non-mobile */}
      {!isMobile && (
        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.navButton, { backgroundColor: theme.dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)' }]} 
            onPress={handlePrevious}
          >
            <ChevronLeft width={24} height={24} stroke={theme.dark ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navButton, { backgroundColor: theme.dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)' }]} 
            onPress={handleNext}
          >
            <ChevronRight width={24} height={24} stroke={theme.dark ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
        </View>
      )}
      
      {/* Video Title */}
      <View style={[styles.titleContainer, { backgroundColor: theme.dark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }]}>
        <Text style={[styles.title, { color: theme.dark ? '#FFFFFF' : '#000000' }]}>
          {videos[currentIndex].title}
        </Text>
      </View>
      
      {/* Indicators */}
      <View style={styles.indicators}>
        {videos.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.indicator, 
              { 
                backgroundColor: index === currentIndex ? theme.colors.primary : 'rgba(150,150,150,0.5)',
                width: index === currentIndex ? 24 : 8
              }
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 16,
    ...Platform.select({
      web: {
        WebkitTapHighlightColor: 'transparent', // Removes tap highlight on mobile web
      },
    }),
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
    borderRadius: 8,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    zIndex: 5,
    pointerEvents: 'none',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'auto',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    padding: 8,
    borderRadius: 4,
    zIndex: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  indicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
