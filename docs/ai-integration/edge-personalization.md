# Edge-Based Personalization

This guide details how to implement AI-powered personalization at the edge using Netlify Edge Functions.

## Overview

Edge-Based Personalization delivers customized content to users based on their characteristics, behavior, or preferences. By running this logic at the CDN edge (closer to users), you can provide personalized experiences with minimal latency while maintaining a lightweight architecture.

## Implementation

### 1. Create an Edge Function

Create a new file at `netlify/edge-functions/personalize.js`:

```javascript
import { Cookie } from 'netlify:edge';

// Helper function to extract industry from URL or cookies
function getIndustry(request, context) {
  // Check URL parameters first
  const url = new URL(request.url);
  const industryParam = url.searchParams.get('industry');
  
  if (industryParam) {
    // Store in cookie for future visits
    context.cookies.set({
      name: 'user_industry',
      value: industryParam,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });
    return industryParam;
  }
  
  // Check cookies
  const industryCookie = context.cookies.get('user_industry');
  if (industryCookie) {
    return industryCookie;
  }
  
  return null;
}

// Helper function to get personalized content for an industry
function getPersonalizedContent(industry) {
  // In a production environment, this could fetch from a CMS or API
  // For simplicity, we're using a static mapping
  const industryContent = {
    healthcare: {
      headline: "AI Solutions for Healthcare",
      benefits: [
        "Reduce administrative burden with AI-powered documentation",
        "Improve patient outcomes with predictive analytics",
        "Enhance diagnostic accuracy with computer vision"
      ],
      caseStudy: "A leading hospital reduced patient wait times by 35% using our AI scheduling system."
    },
    finance: {
      headline: "AI Transformation for Financial Services",
      benefits: [
        "Detect fraud patterns in real-time with machine learning",
        "Automate compliance reporting and reduce regulatory risk",
        "Personalize customer experiences with AI-driven insights"
      ],
      caseStudy: "A global bank increased fraud detection by 47% while reducing false positives by 29%."
    },
    manufacturing: {
      headline: "AI-Powered Manufacturing Excellence",
      benefits: [
        "Optimize production schedules with predictive maintenance",
        "Reduce quality issues with computer vision inspection",
        "Streamline supply chain with AI demand forecasting"
      ],
      caseStudy: "A manufacturing plant reduced downtime by 23% and improved yield by 15% with our AI solutions."
    },
    retail: {
      headline: "Retail Transformation Through AI",
      benefits: [
        "Personalize customer experiences across all channels",
        "Optimize inventory with demand prediction",
        "Enhance in-store experiences with computer vision"
      ],
      caseStudy: "A retail chain increased conversion rates by 18% using our AI-powered recommendation engine."
    },
    default: {
      headline: "Transform Your Business with AI",
      benefits: [
        "Streamline operations with intelligent automation",
        "Gain competitive insights with advanced analytics",
        "Enhance customer experiences with AI-powered personalization"
      ],
      caseStudy: "Organizations implementing AI readiness strategies see an average 32% improvement in operational efficiency."
    }
  };
  
  return industryContent[industry] || industryContent.default;
}

// Main edge function
export default async (request, context) => {
  // Only process HTML pages
  if (!request.headers.get('accept')?.includes('text/html')) {
    return context.next();
  }
  
  // Get the user's industry
  const industry = getIndustry(request, context);
  
  // If no industry is detected, serve the page as-is
  if (!industry) {
    return context.next();
  }
  
  // Get the original response
  const response = await context.next();
  
  // Get the HTML content
  const page = await response.text();
  
  // Get personalized content
  const personalizedContent = getPersonalizedContent(industry);
  
  // Replace placeholder with personalized content
  let personalizedPage = page;
  
  // Replace headline placeholder
  personalizedPage = personalizedPage.replace(
    '<h1 id="hero-headline">Transform Your Business with AI</h1>',
    `<h1 id="hero-headline">${personalizedContent.headline}</h1>`
  );
  
  // Replace benefits placeholder
  const benefitsList = personalizedContent.benefits
    .map(benefit => `<li class="benefit-item">${benefit}</li>`)
    .join('');
  
  personalizedPage = personalizedPage.replace(
    '<ul id="benefits-list"><!-- BENEFITS_PLACEHOLDER --></ul>',
    `<ul id="benefits-list">${benefitsList}</ul>`
  );
  
  // Replace case study placeholder
  personalizedPage = personalizedPage.replace(
    '<div id="case-study-placeholder"></div>',
    `<div id="case-study" class="case-study-box">
      <h3>Success Story</h3>
      <p>${personalizedContent.caseStudy}</p>
    </div>`
  );
  
  // Return the personalized page
  return new Response(personalizedPage, response);
};
```

### 2. Configure the Edge Function

Add the configuration to your `netlify.toml` file:

```toml
[[edge_functions]]
path = "/*"
function = "personalize"
```

### 3. Update Your HTML Templates

Modify your HTML templates to include placeholders for personalized content:

```html
<!-- In your hero section -->
<h1 id="hero-headline">Transform Your Business with AI</h1>

<!-- In your benefits section -->
<ul id="benefits-list"><!-- BENEFITS_PLACEHOLDER --></ul>

<!-- In your case study section -->
<div id="case-study-placeholder"></div>
```

### 4. Create an Industry Selection Component

Create a component to allow users to select their industry:

```jsx
// src/components/IndustrySelector.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'next/router';

const industries = [
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'finance', name: 'Financial Services' },
  { id: 'manufacturing', name: 'Manufacturing' },
  { id: 'retail', name: 'Retail & E-commerce' },
  { id: 'technology', name: 'Technology' }
];

export const IndustrySelector = () => {
  const router = useRouter();
  
  const handleIndustrySelect = (industryId) => {
    // Add the industry parameter to the current URL
    const currentPath = router.pathname;
    router.push({
      pathname: currentPath,
      query: { ...router.query, industry: industryId }
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Your Industry</Text>
      <Text style={styles.subheading}>We'll personalize your experience</Text>
      
      <View style={styles.buttonContainer}>
        {industries.map((industry) => (
          <TouchableOpacity
            key={industry.id}
            style={styles.industryButton}
            onPress={() => handleIndustrySelect(industry.id)}
          >
            <Text style={styles.buttonText}>{industry.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  industryButton: {
    backgroundColor: '#4B9CD3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});
```

### 5. Enhance with AI-Powered Personalization

For more advanced personalization, create a Netlify Function that uses AI to generate personalized content:

```typescript
// netlify/functions/generate-personalized-content.ts
import { Handler } from "@netlify/functions";
import OpenAI from "openai";

export const handler: Handler = async (event) => {
  // CORS handling
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
    const { industry, userBehavior } = JSON.parse(event.body || '{}');
    
    if (!industry) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Industry is required' }),
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
    
    // Create prompt for personalized content
    const prompt = `
      Generate personalized content for a visitor to the mVara AI readiness website.
      
      Industry: ${industry}
      User behavior: ${userBehavior || 'First-time visitor'}
      
      Generate the following in JSON format:
      1. A compelling headline focused on AI readiness for this industry (max 10 words)
      2. Three specific benefits of AI readiness assessment for this industry (each 10-15 words)
      3. A brief case study or success story relevant to this industry (max 30 words)
      4. A personalized call-to-action message (max 15 words)
      
      Format your response as a valid JSON object with the following structure:
      {
        "headline": "string",
        "benefits": ["string", "string", "string"],
        "caseStudy": "string",
        "cta": "string"
      }
    `;
    
    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });
    
    // Parse the generated content
    const generatedContent = JSON.parse(response.choices[0].message.content);
    
    // Return the personalized content
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(generatedContent)
    };
  } catch (error) {
    console.error("Error generating personalized content:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate personalized content' }),
    };
  }
};
```

## Usage

Edge-Based Personalization can be used for:

1. **Industry-Specific Content**: Show different content based on the user's industry
2. **Geolocation Personalization**: Customize content based on the user's location
3. **Referral Source Adaptation**: Tailor the experience based on where the user came from
4. **Return Visitor Recognition**: Show different content to returning visitors
5. **A/B Testing**: Implement A/B tests without client-side JavaScript

## Best Practices

1. **Performance First**: Keep edge functions lightweight to minimize processing time
2. **Progressive Enhancement**: Ensure the site works well even without personalization
3. **Caching Strategy**: Use appropriate caching strategies for personalized content
4. **User Preferences**: Allow users to change or reset their personalization preferences
5. **Testing**: Test personalization across different browsers and devices

## Security Considerations

1. **Cookie Security**: Use secure, HTTP-only cookies for storing user preferences
2. **Data Minimization**: Only store necessary information for personalization
3. **User Consent**: Be transparent about personalization and get user consent when needed
4. **Privacy Regulations**: Ensure compliance with GDPR, CCPA, and other regulations

## Cost Management

1. **Efficient Edge Functions**: Keep edge functions small and efficient
2. **Caching**: Implement effective caching to reduce function executions
3. **Static Fallbacks**: Use static content as fallbacks when appropriate
4. **Selective Personalization**: Only personalize high-impact page elements

## Future Enhancements

1. **Machine Learning Models**: Deploy lightweight ML models at the edge
2. **Real-time Personalization**: Adjust content based on real-time user behavior
3. **Multi-variate Testing**: Implement sophisticated testing frameworks
4. **Personalized Images**: Dynamically select images based on user preferences
5. **Integration with CMS**: Pull personalized content from a headless CMS
