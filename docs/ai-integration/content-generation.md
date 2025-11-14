# AI-Powered Content Generation

This guide details how to implement AI-powered content generation using Large Language Models (LLMs) with Netlify Build Plugins.

## Overview

The AI-Powered Content Generation feature uses AI to automatically generate fresh, relevant content during the build process. This allows the mVara website to maintain up-to-date AI insights, tips, and resources without manual content creation for each build.

## Implementation

### 1. Create a Netlify Build Plugin

First, create a directory for your build plugin:

```bash
mkdir -p netlify-plugins/ai-content-generator
```

### 2. Create the Plugin Files

Create the manifest file at `netlify-plugins/ai-content-generator/manifest.yml`:

```yaml
name: netlify-plugin-ai-content-generator
inputs:
  - name: contentTypes
    description: Types of content to generate (tips, insights, faq)
    required: false
    default: tips
  - name: outputPath
    description: Path to output the generated content
    required: false
    default: src/data/ai-content
  - name: refreshInterval
    description: How often to regenerate content (always, daily, weekly)
    required: false
    default: weekly
```

Create the plugin implementation at `netlify-plugins/ai-content-generator/index.js`:

```javascript
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);

// Content generation prompts
const CONTENT_PROMPTS = {
  tips: "Generate 5 practical AI implementation tips for businesses in 2025. Each tip should be 2-3 sentences with a clear, actionable recommendation. Format as JSON array of objects with 'title' and 'description' fields.",
  insights: "Generate 3 insightful observations about the current state of AI adoption in enterprises. Each insight should be a paragraph of 3-4 sentences discussing trends, challenges, or opportunities. Format as JSON array of objects with 'title' and 'content' fields.",
  faq: "Generate 5 frequently asked questions about AI readiness assessments, along with concise answers (2-3 sentences each). Format as JSON array of objects with 'question' and 'answer' fields."
};

// Helper function to check if content needs refreshing
async function shouldRefreshContent(filePath, refreshInterval) {
  try {
    const fileStats = await stat(filePath);
    const fileDate = new Date(fileStats.mtime);
    const now = new Date();
    
    switch (refreshInterval) {
      case 'always':
        return true;
      case 'daily':
        // Check if file is older than 1 day
        return (now - fileDate) > 24 * 60 * 60 * 1000;
      case 'weekly':
        // Check if file is older than 7 days
        return (now - fileDate) > 7 * 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  } catch (error) {
    // File doesn't exist, so it needs to be generated
    return true;
  }
}

// Main plugin module
module.exports = {
  async onPreBuild({ inputs, utils }) {
    const contentTypes = inputs.contentTypes.split(',').map(type => type.trim());
    const outputPath = inputs.outputPath;
    const refreshInterval = inputs.refreshInterval;
    
    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      utils.build.failPlugin('OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.');
      return;
    }
    
    // Initialize OpenAI client
    const openai = new OpenAI({ apiKey });
    
    // Ensure output directory exists
    try {
      await mkdir(outputPath, { recursive: true });
      console.log(`Created output directory: ${outputPath}`);
    } catch (error) {
      // Directory already exists or cannot be created
      if (error.code !== 'EEXIST') {
        utils.build.failPlugin(`Failed to create output directory: ${error.message}`);
        return;
      }
    }
    
    // Generate content for each requested type
    for (const contentType of contentTypes) {
      if (!CONTENT_PROMPTS[contentType]) {
        console.warn(`Unknown content type: ${contentType}. Skipping.`);
        continue;
      }
      
      const outputFilePath = path.join(outputPath, `${contentType}.json`);
      
      // Check if content needs refreshing
      const needsRefresh = await shouldRefreshContent(outputFilePath, refreshInterval);
      if (!needsRefresh) {
        console.log(`Content type ${contentType} is up to date. Skipping generation.`);
        continue;
      }
      
      console.log(`Generating content for type: ${contentType}`);
      
      try {
        // Call OpenAI API to generate content
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a helpful AI assistant that generates content for the mVara website, which focuses on AI readiness assessments and implementation strategies for businesses." },
            { role: "user", content: CONTENT_PROMPTS[contentType] }
          ],
          temperature: 0.7,
          max_tokens: 1000
        });
        
        // Extract and parse the generated content
        const generatedText = response.choices[0].message.content.trim();
        let contentData;
        
        try {
          // Try to parse as JSON
          contentData = JSON.parse(generatedText);
        } catch (parseError) {
          // If parsing fails, wrap the text in a basic structure
          console.warn(`Failed to parse generated content as JSON. Using raw text.`);
          contentData = { 
            content: generatedText,
            format: "raw" 
          };
        }
        
        // Add metadata
        const contentWithMetadata = {
          data: contentData,
          metadata: {
            generated: new Date().toISOString(),
            type: contentType,
            refreshInterval
          }
        };
        
        // Write to file
        await writeFile(
          outputFilePath, 
          JSON.stringify(contentWithMetadata, null, 2),
          'utf8'
        );
        
        console.log(`Successfully generated ${contentType} content and saved to ${outputFilePath}`);
      } catch (error) {
        utils.build.failPlugin(`Failed to generate ${contentType} content: ${error.message}`);
        return;
      }
    }
    
    console.log('AI content generation completed successfully!');
  }
};
```

### 3. Configure the Plugin in netlify.toml

Add the plugin configuration to your `netlify.toml` file:

```toml
[[plugins]]
package = "./netlify-plugins/ai-content-generator"

  [plugins.inputs]
  contentTypes = "tips,insights,faq"
  outputPath = "src/data/ai-content"
  refreshInterval = "weekly"
```

### 4. Install Dependencies

Install the required dependencies:

```bash
npm install openai --save-dev
```

### 5. Create React Components to Display the Content

Create a component to display the AI-generated tips:

```jsx
// src/components/AITips.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

// Import the generated content
// Note: This import path will depend on your project structure
import aiTipsData from '../data/ai-content/tips.json';

export const AITips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, you might fetch this dynamically
    // instead of importing it
    if (aiTipsData && aiTipsData.data) {
      setTips(aiTipsData.data);
    }
    setLoading(false);
  }, []);
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#4B9CD3" />
        <Text style={styles.loadingText}>Loading AI tips...</Text>
      </View>
    );
  }
  
  if (!tips || tips.length === 0) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>AI Implementation Tips</Text>
      
      {tips.map((tip, index) => (
        <View key={index} style={styles.tipCard}>
          <Text style={styles.tipTitle}>{tip.title}</Text>
          <Text style={styles.tipDescription}>{tip.description}</Text>
        </View>
      ))}
      
      <Text style={styles.footer}>
        Last updated: {new Date(aiTipsData.metadata.generated).toLocaleDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4B9CD3',
  },
  tipCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4B9CD3',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  tipDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  footer: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    textAlign: 'right',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
});
```

### 6. Configure Environment Variables

Add the following environment variable to your Netlify site:

```
OPENAI_API_KEY=your_openai_api_key
```

## Usage

The AI-Powered Content Generation can be used to create:

1. **AI Implementation Tips**: Practical advice for organizations implementing AI
2. **Industry Insights**: Analysis of AI trends in different industries
3. **FAQ Content**: Common questions and answers about AI readiness
4. **Case Studies**: Synthetic case studies based on real-world patterns
5. **Best Practices**: Evolving best practices for AI implementation

## Best Practices

1. **Content Review**: Periodically review generated content for quality and accuracy
2. **Prompt Engineering**: Refine prompts over time to improve content quality
3. **Version Control**: Keep track of content changes across builds
4. **Fallback Content**: Maintain static fallback content in case of API failures
5. **Content Diversity**: Rotate prompts to ensure content variety

## Security Considerations

1. **API Key Security**: Store the OpenAI API key securely in environment variables
2. **Content Validation**: Validate generated content before publishing
3. **Sensitive Information**: Ensure no sensitive information is included in prompts
4. **Attribution**: Clearly indicate AI-generated content to users

## Cost Management

1. **Refresh Intervals**: Use appropriate refresh intervals to minimize API calls
2. **Content Batching**: Generate multiple content pieces in a single API call
3. **Token Optimization**: Optimize prompts to use fewer tokens
4. **Caching**: Implement effective caching strategies
5. **Model Selection**: Use the appropriate model for the content complexity

## Future Enhancements

1. **Content Personalization**: Generate content tailored to user segments
2. **Multi-modal Content**: Include AI-generated images alongside text
3. **Interactive Content**: Create interactive content experiences
4. **Content Scheduling**: Schedule content generation for specific dates or events
5. **Feedback Loop**: Incorporate user feedback to improve content quality
