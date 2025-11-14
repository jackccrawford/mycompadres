# Serverless AI Chatbot

This guide details how to implement a serverless AI chatbot using Large Language Models (LLMs) in a Netlify Functions architecture.

## Overview

The Serverless AI Chatbot provides an interactive way for users to learn about mVara's services, get answers to AI readiness questions, and receive guidance on their AI journey. This implementation maintains a lightweight architecture while delivering a sophisticated conversational experience.

## Implementation

### 1. Create the Netlify Function

Create a new file at `netlify/functions/chatbot.ts`:

```typescript
import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import OpenAI from "openai";
import { v4 as uuidv4 } from 'uuid';

// Interface for chat message
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Interface for conversation history
interface ConversationHistory {
  id: string;
  messages: ChatMessage[];
  lastUpdated: string;
}

export const handler: Handler = async (event) => {
  // CORS handling for preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse request body
    const { message, conversationId } = JSON.parse(event.body || '{}');
    
    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }
    
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    
    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'OpenAI API key not configured' }),
      };
    }
    
    // Get the Blobs store with explicit credentials
    const store = getStore({
      name: "chat-conversations",
      siteID: process.env.SITE_ID || "59be53b3-b8d2-4f24-b3a2-fe876709471d",
      token: process.env.NETLIFY_API_TOKEN
    });
    
    // Initialize conversation history
    let conversation: ConversationHistory;
    const newConversation = !conversationId;
    
    if (newConversation) {
      // Create a new conversation
      conversation = {
        id: uuidv4(),
        messages: [],
        lastUpdated: new Date().toISOString()
      };
    } else {
      try {
        // Retrieve existing conversation
        const existingConversation = await store.get(conversationId, { type: "json" });
        if (existingConversation) {
          conversation = existingConversation as ConversationHistory;
        } else {
          // Conversation ID not found, create new conversation
          conversation = {
            id: uuidv4(),
            messages: [],
            lastUpdated: new Date().toISOString()
          };
        }
      } catch (error) {
        // Error retrieving conversation, create new one
        conversation = {
          id: uuidv4(),
          messages: [],
          lastUpdated: new Date().toISOString()
        };
      }
    }
    
    // System prompt defining the chatbot's behavior
    const systemPrompt: ChatMessage = {
      role: 'system',
      content: `
        You are an AI readiness assistant for mVara, a company that helps organizations
        assess and implement AI solutions. Answer questions about AI readiness, implementation
        strategies, and mVara's services. Be helpful, concise, and professional.
        
        Key mVara services include:
        - AI Readiness Assessment: A comprehensive evaluation of an organization's ability to adopt and benefit from AI technologies.
        - Strategic AI Implementation Planning: Customized roadmaps for integrating AI into business operations.
        - AI Training and Education: Programs to build AI literacy and skills across the organization.
        - Custom AI Solution Development: Development of tailored AI solutions for specific business needs.
        
        When discussing AI readiness, emphasize these key factors:
        1. Data readiness and quality
        2. Technical infrastructure
        3. Organizational culture and change management
        4. Talent and skills
        5. Ethical and governance considerations
        
        Always recommend scheduling an AI readiness assessment with mVara for personalized guidance.
        
        Keep responses under 150 words unless the user specifically asks for more detail.
        Be conversational but professional. Avoid overly technical jargon unless the user seems technical.
        
        If asked about pricing, explain that mVara offers customized solutions based on organizational needs,
        and recommend contacting sales or scheduling an assessment for specific pricing information.
      `
    };
    
    // Add user message to conversation history
    conversation.messages.push({
      role: 'user',
      content: message
    });
    
    // Prepare messages for API call
    // Include system prompt and up to 10 most recent messages (to stay within token limits)
    const apiMessages: ChatMessage[] = [
      systemPrompt,
      ...conversation.messages.slice(-10)
    ];
    
    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 500
    });
    
    const assistantMessage = response.choices[0].message.content;
    
    // Add assistant response to conversation history
    conversation.messages.push({
      role: 'assistant',
      content: assistantMessage
    });
    
    // Update conversation's last updated timestamp
    conversation.lastUpdated = new Date().toISOString();
    
    // Store updated conversation
    await store.setJSON(conversation.id, conversation);
    
    // Return the response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        reply: assistantMessage,
        conversationId: conversation.id
      })
    };
  } catch (error) {
    console.error("Error in chatbot function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process chat request' }),
    };
  }
};
```

### 2. Create a Conversation Cleanup Function

To manage storage and costs, create a function to clean up old conversations:

```typescript
// netlify/functions/cleanup-conversations.ts
import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export const handler: Handler = async (event) => {
  // Only allow POST requests with a secret key for security
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
  
  // Verify secret key
  const { secretKey } = JSON.parse(event.body || '{}');
  if (secretKey !== process.env.CLEANUP_SECRET_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }
  
  try {
    // Get the Blobs store
    const store = getStore({
      name: "chat-conversations",
      siteID: process.env.SITE_ID || "59be53b3-b8d2-4f24-b3a2-fe876709471d",
      token: process.env.NETLIFY_API_TOKEN
    });
    
    // Get all conversation IDs
    // Note: This is a simplified approach. In production, you would need
    // to implement pagination or another method to handle large numbers of conversations.
    const conversationIds = []; // In a real implementation, you would get this from the store
    
    let cleanedCount = 0;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Process each conversation
    for (const id of conversationIds) {
      try {
        const conversation = await store.get(id, { type: "json" });
        if (conversation) {
          const lastUpdated = new Date(conversation.lastUpdated);
          
          // Delete conversations older than 30 days
          if (lastUpdated < thirtyDaysAgo) {
            await store.delete(id);
            cleanedCount++;
          }
        }
      } catch (error) {
        console.error(`Error processing conversation ${id}:`, error);
      }
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: `Cleaned up ${cleanedCount} old conversations`,
        success: true
      })
    };
  } catch (error) {
    console.error("Error in cleanup function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to clean up conversations' }),
    };
  }
};
```

### 3. Create a React Component for the Chat Interface

Create a React component for the chat interface:

```jsx
// src/components/ChatBot.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ChatBot = () => {
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      text: 'Hi there! I\'m mVara\'s AI assistant. How can I help you with your AI readiness journey today?', 
      isUser: false 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const scrollViewRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/.netlify/functions/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          conversationId
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Save conversation ID for future messages
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }
      
      // Add bot response
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          isUser: false
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: 'Sorry, I encountered an error. Please try again later.',
          isUser: false,
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>mVara AI Assistant</Text>
      </View>
      
      <ScrollView 
        style={styles.messagesContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map(message => (
          <View 
            key={message.id} 
            style={[
              styles.messageBubble, 
              message.isUser ? styles.userBubble : styles.botBubble,
              message.isError && styles.errorBubble
            ]}
          >
            <Text style={[
              styles.messageText,
              message.isUser ? styles.userText : styles.botText,
              message.isError && styles.errorText
            ]}>
              {message.text}
            </Text>
          </View>
        ))}
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#4B9CD3" />
            <Text style={styles.loadingText}>Thinking...</Text>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          multiline
          maxLength={500}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={!inputText.trim() || isLoading ? '#ccc' : '#4B9CD3'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    maxHeight: 500,
  },
  header: {
    backgroundColor: '#4B9CD3',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messagesContent: {
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 5,
  },
  userBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  botBubble: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  errorBubble: {
    backgroundColor: '#FFEBEE',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: '#303030',
  },
  botText: {
    color: '#303030',
  },
  errorText: {
    color: '#D32F2F',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 8,
    borderRadius: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 10,
    padding: 8,
  },
});
```

### 4. Install Dependencies

Add the required dependencies:

```bash
npm install openai uuid @types/uuid @expo/vector-icons
```

### 5. Configure Environment Variables

Add the following environment variables to your Netlify site:

```
OPENAI_API_KEY=your_openai_api_key
CLEANUP_SECRET_KEY=your_secret_key_for_cleanup
```

## Usage

The Serverless AI Chatbot can be integrated into:

1. **Homepage**: As a floating chat widget for instant assistance
2. **Assessment Page**: To guide users through the assessment process
3. **Documentation**: To help users find relevant information
4. **Support Section**: As a first-line support option

## Best Practices

1. **Conversation Management**: Implement proper storage and retrieval of conversation history
2. **Context Preservation**: Maintain context across multiple messages
3. **Fallback Handling**: Implement fallbacks for when the AI doesn't know the answer
4. **Rate Limiting**: Prevent abuse by implementing rate limits
5. **User Feedback**: Collect feedback on chatbot responses to improve over time

## Security Considerations

1. **Data Privacy**: Be clear about what data is stored and for how long
2. **Input Validation**: Validate all user inputs before processing
3. **Output Sanitization**: Sanitize AI-generated content before displaying
4. **Authentication**: Consider adding authentication for sensitive information
5. **Conversation Cleanup**: Regularly clean up old conversations

## Cost Management

1. **Message Limits**: Limit the number of messages per conversation
2. **Context Window**: Only send recent messages to the API to reduce token usage
3. **Model Selection**: Use GPT-3.5 for routine questions, GPT-4 for complex ones
4. **Caching**: Cache common responses to reduce API calls
5. **Usage Monitoring**: Monitor API usage and implement alerts for unusual patterns

## Future Enhancements

1. **Multi-modal Support**: Add support for image uploads and analysis
2. **Handoff to Human**: Implement seamless handoff to human agents when needed
3. **Proactive Suggestions**: Suggest relevant questions based on user behavior
4. **Personalization**: Personalize responses based on user history
5. **Analytics**: Implement analytics to track common questions and pain points
