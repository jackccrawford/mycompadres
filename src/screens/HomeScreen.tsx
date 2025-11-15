// Copy the entire SalesIntelligenceScreen.tsx and adapt the UI
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, ActivityIndicator, Animated } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Mic, MicOff } from 'react-native-feather';

// Simple Compadres prompt - just Clive's question
const COMPADRES_PROMPT = `You are Clive, a business advisor for Compadres. You help entrepreneurs and business leaders identify the one thing that would change the course of their life or business.

VOICE OUTPUT: Your responses will be spoken aloud. Never use markdown formatting (no asterisks, underscores, bold, italics). Speak naturally in plain text only.

YOUR OPENING: You've just asked: "If we could change one thing in your life or business that would change the course of your life or business, what would that be?"

STYLE: Warm, thoughtful, deeply listening. This is about transformation, not tactics. Keep responses to 2-3 sentences. Ask follow-up questions that go deeper.`;

// Connection states
type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
type MicStatus = 'inactive' | 'listening' | 'processing' | 'speaking';

export const HomeScreen = () => {
  const { theme } = useTheme();

  // State management
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [micStatus, setMicStatus] = useState<MicStatus>('inactive');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGeneratingToken, setIsGeneratingToken] = useState<boolean>(false);

  // Refs for WebSocket and audio
  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioWorkletNodeRef = useRef<AudioWorkletNode | null>(null);

  // Animation for mic button pulse
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  // Pulse animation when listening
  useEffect(() => {
    if (micStatus === 'listening') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [micStatus]);

  const cleanup = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioWorkletNodeRef.current) {
      audioWorkletNodeRef.current.disconnect();
      audioWorkletNodeRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const connectToDeepgram = async () => {
    try {
      setIsGeneratingToken(true);
      setErrorMessage(null);
      setConnectionStatus('connecting');

      // Get token from Netlify function
      const response = await fetch('/.netlify/functions/deepgram-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to get token');
      
      const { token } = await response.json();

      // Connect to Deepgram Agent API
      const ws = new WebSocket('wss://agent.deepgram.com/agent', [
        'token',
        token
      ]);

      ws.onopen = async () => {
        console.log('WebSocket connected');
        
        // Configure agent
        ws.send(JSON.stringify({
          type: 'SettingsConfiguration',
          audio: {
            input: {
              encoding: 'linear16',
              sample_rate: 16000
            },
            output: {
              encoding: 'linear16',
              sample_rate: 24000,
              container: 'none'
            }
          },
          agent: {
            listen: { model: 'nova-2' },
            think: {
              provider: { type: 'open_ai' },
              model: 'gpt-4o',
              instructions: COMPADRES_PROMPT
            },
            speak: { model: 'aura-asteria-en' }
          }
        }));

        // Start microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const audioContext = new AudioContext({ sampleRate: 16000 });
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);
        
        await audioContext.audioWorklet.addModule('/audio-processor.js');
        const workletNode = new AudioWorkletNode(audioContext, 'audio-processor');
        audioWorkletNodeRef.current = workletNode;

        workletNode.port.onmessage = (event) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(event.data);
          }
        };

        source.connect(workletNode);
        workletNode.connect(audioContext.destination);

        setConnectionStatus('connected');
        setMicStatus('listening');
        setIsGeneratingToken(false);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.type === 'UserStartedSpeaking') {
            setMicStatus('listening');
          } else if (message.type === 'AgentThinking') {
            setMicStatus('processing');
          } else if (message.type === 'AgentStartedSpeaking') {
            setMicStatus('speaking');
          } else if (message.type === 'AgentAudioDone') {
            setMicStatus('listening');
          } else if (message.type === 'Audio' && message.data) {
            // Play audio
            const audioData = Uint8Array.from(atob(message.data), c => c.charCodeAt(0));
            const audioBuffer = audioContextRef.current!.createBuffer(1, audioData.length / 2, 24000);
            const channelData = audioBuffer.getChannelData(0);
            
            for (let i = 0; i < audioData.length; i += 2) {
              const sample = (audioData[i] | (audioData[i + 1] << 8));
              channelData[i / 2] = sample / 32768;
            }
            
            const source = audioContextRef.current!.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current!.destination);
            source.start();
          }
        } catch (error) {
          console.error('Message handling error:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setErrorMessage('Connection error');
        setConnectionStatus('error');
        setIsGeneratingToken(false);
      };

      ws.onclose = () => {
        console.log('WebSocket closed');
        setConnectionStatus('disconnected');
        setMicStatus('inactive');
        cleanup();
      };

      wsRef.current = ws;

    } catch (error) {
      console.error('Connection error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to connect');
      setConnectionStatus('error');
      setIsGeneratingToken(false);
    }
  };

  const disconnect = () => {
    cleanup();
    setConnectionStatus('disconnected');
    setMicStatus('inactive');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.question, { color: theme.colors.text }]}>
          If we could change one thing in your life or business that would change the course of your life or business, what would that be?
        </Text>
        
        {errorMessage && (
          <Text style={[styles.error, { color: '#F44336' }]}>
            {errorMessage}
          </Text>
        )}

        <View style={styles.micButtonContainer}>
          {connectionStatus === 'disconnected' || connectionStatus === 'error' ? (
            <TouchableOpacity
              onPress={connectToDeepgram}
              disabled={isGeneratingToken}
              style={[
                styles.micButton,
                { backgroundColor: '#4A90E2', opacity: isGeneratingToken ? 0.6 : 1 }
              ]}
            >
              {isGeneratingToken ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
              ) : (
                <Mic width={48} height={48} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          ) : connectionStatus === 'connecting' ? (
            <View style={[styles.micButton, { backgroundColor: '#FFC107' }]}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          ) : (
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity
                onPress={disconnect}
                style={[
                  styles.micButton,
                  {
                    backgroundColor: micStatus === 'speaking'
                      ? '#9C27B0'
                      : micStatus === 'listening'
                        ? '#4A90E2'
                        : '#F44336'
                  }
                ]}
              >
                <MicOff width={48} height={48} color="#FFFFFF" />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
        
        <Text style={[styles.tapText, { color: theme.colors.text }]}>
          {connectionStatus === 'connected' 
            ? (micStatus === 'speaking' ? 'Listening...' : 'Tap to end')
            : 'Tap to speak'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  question: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 36,
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  micButtonContainer: {
    marginBottom: 16,
  },
  micButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
