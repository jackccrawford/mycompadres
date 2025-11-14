# Assessment Analysis with LLMs

This guide details how to implement AI-powered analysis of assessment requests using Large Language Models (LLMs) in a serverless architecture.

## Overview

The Assessment Analysis feature uses AI to analyze customer assessment requests and generate personalized insights and recommendations. This enhances the value of mVara's assessment process without requiring manual analysis for each submission.

## Implementation

### 1. Create the Netlify Function

Create a new file at `netlify/functions/analyze-assessment.ts`:

```typescript
import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import OpenAI from "openai";

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
    // Parse request ID from request body
    const { requestId } = JSON.parse(event.body || '{}');
    
    if (!requestId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Request ID is required' }),
      };
    }
    
    // Get the Blobs store with explicit credentials
    const store = getStore({
      name: "assessment-requests",
      siteID: process.env.SITE_ID || "59be53b3-b8d2-4f24-b3a2-fe876709471d",
      token: process.env.NETLIFY_API_TOKEN
    });
    
    // Retrieve the assessment data
    const assessmentData = await store.get(requestId, { type: "json" });
    
    if (!assessmentData) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Assessment request not found' }),
      };
    }
    
    // Check if we already have an analysis for this request
    try {
      const existingAnalysis = await store.get(`${requestId}-analysis`, { type: "json" });
      if (existingAnalysis) {
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            analysis: existingAnalysis.analysis,
            cached: true
          })
        };
      }
    } catch (error) {
      // No existing analysis, continue to generate a new one
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
    
    // Construct the prompt
    const prompt = `
      As an AI readiness expert at mVara, analyze this assessment request:
      
      Company: ${assessmentData.company || 'Not provided'}
      Industry: ${assessmentData.industry || 'Not provided'}
      Company Size: ${assessmentData.employees || 'Not provided'} employees
      Revenue Range: ${assessmentData.revenue || 'Not provided'}
      
      Key Challenges:
      ${assessmentData.challenges || 'Not specified'}
      
      Additional Information:
      ${assessmentData.message || 'None provided'}
      
      Based on this information, provide:
      1. A brief assessment of their current AI readiness
      2. Three specific recommendations for their AI journey
      3. Potential quick wins they could implement in the next 3 months
      
      Format your response in clear sections with headers.
    `;
    
    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    });
    
    const analysisText = response.choices[0].message.content;
    
    // Store the analysis in Blobs for future reference
    await store.setJSON(`${requestId}-analysis`, {
      requestId,
      analysis: analysisText,
      timestamp: new Date().toISOString(),
      model: "gpt-4"
    });
    
    // Return the analysis
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        analysis: analysisText,
        cached: false
      })
    };
  } catch (error) {
    console.error("Error analyzing assessment:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to analyze assessment' }),
    };
  }
};
```

### 2. Install Dependencies

Add the OpenAI SDK to your project:

```bash
npm install openai
```

### 3. Configure Environment Variables

Add the following environment variables to your Netlify site:

```
OPENAI_API_KEY=your_openai_api_key
```

### 4. Create a Frontend Component

Create a component to display the AI analysis:

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';

export const AssessmentAnalysis = ({ requestId }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalysis = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/.netlify/functions/analyze-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch analysis');
      }
      
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Format the analysis text with proper styling
  const renderAnalysis = () => {
    if (!analysis) return null;
    
    // Split by headers (lines ending with :)
    const sections = analysis.split(/^(.*:)$/m);
    
    return sections.map((section, index) => {
      if (section.trim().endsWith(':')) {
        // This is a header
        return (
          <Text key={index} style={styles.sectionHeader}>
            {section.trim()}
          </Text>
        );
      } else if (section.trim()) {
        // This is content
        return (
          <Text key={index} style={styles.sectionContent}>
            {section.trim()}
          </Text>
        );
      }
      return null;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Readiness Analysis</Text>
      
      {!analysis && !loading && (
        <Button 
          title="Generate Analysis" 
          onPress={fetchAnalysis} 
        />
      )}
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4B9CD3" />
          <Text style={styles.loadingText}>
            Analyzing your assessment data...
          </Text>
        </View>
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button 
            title="Try Again" 
            onPress={fetchAnalysis} 
          />
        </View>
      )}
      
      {analysis && (
        <View style={styles.analysisContainer}>
          {renderAnalysis()}
        </View>
      )}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4B9CD3',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 4,
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 10,
  },
  analysisContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#4B9CD3',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 16,
  },
});
```

## Usage

The Assessment Analysis feature can be integrated into:

1. **Admin Dashboard**: For internal review of customer assessments
2. **Customer Portal**: To provide immediate feedback to customers
3. **Email Follow-ups**: To include AI insights in follow-up communications

## Best Practices

1. **Prompt Engineering**: Refine the prompt over time to improve analysis quality
2. **Error Handling**: Implement robust error handling for API failures
3. **Caching**: Cache analysis results to reduce API costs
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **User Consent**: Clearly communicate that AI is being used to analyze data

## Security Considerations

1. **Data Privacy**: Ensure sensitive customer data is handled securely
2. **API Key Security**: Store the OpenAI API key securely in environment variables
3. **Input Validation**: Validate all inputs before sending to the OpenAI API
4. **Output Sanitization**: Sanitize AI-generated content before displaying to users

## Cost Management

1. **Caching**: Cache analysis results to avoid redundant API calls
2. **Token Optimization**: Optimize prompts to use fewer tokens
3. **Model Selection**: Use GPT-3.5 for simpler analyses, GPT-4 for complex ones
4. **Batch Processing**: Consider batch processing for multiple assessments

## Future Enhancements

1. **Customized Analysis**: Tailor analysis based on industry or company size
2. **Comparative Insights**: Compare assessment to industry benchmarks
3. **Action Plan Generation**: Generate detailed action plans based on analysis
4. **Multi-modal Analysis**: Incorporate other data sources (e.g., documents, images)
5. **Human-in-the-loop**: Add capability for human experts to review and refine AI analysis
