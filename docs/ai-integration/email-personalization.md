# Intelligent Email Personalization

This guide details how to implement AI-powered email personalization using Large Language Models (LLMs) in a serverless architecture.

## Overview

The Intelligent Email Personalization feature uses AI to generate highly personalized email content based on customer assessment data. This enhances customer engagement by providing tailored communications without requiring manual content creation for each customer.

## Implementation

### 1. Enhance the Contact Function

Modify the existing `netlify/functions/contact.ts` file to include AI-powered email personalization:

```typescript
import { Handler, HandlerEvent } from "@netlify/functions";
import { Resend } from "resend";
import { getStore } from "@netlify/blobs";
import { v4 as uuidv4 } from 'uuid';
import OpenAI from "openai";

// Existing imports and interface definitions...

// Function to generate personalized email content using AI
async function generatePersonalizedEmail(email: string, name: string, data: any): Promise<string> {
  // If OpenAI API key is not available, fall back to template-based email
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY not defined. Using template-based email instead.");
    return generateTemplateEmail(email, name, data);
  }
  
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    
    // Determine if this is a business or personal email
    const isBusinessEmail = isBusinessDomain(email);
    
    // Create a prompt based on the available data
    const prompt = `
      Create a personalized email for ${name} who works at ${data.company || 'their company'}.
      They're in the ${data.industry || 'unspecified'} industry with ${data.employees || 'an unknown number of'} employees.
      
      Their main challenges with AI are: ${data.challenges || 'not specified'}.
      Additional context from their message: ${data.message || 'None provided'}
      
      This is a ${isBusinessEmail ? 'business' : 'personal'} email address.
      
      Write a warm, professional email that:
      1. Thanks them for their interest in mVara's AI readiness assessment
      2. Acknowledges their specific situation and challenges
      3. Explains how mVara can help address their unique AI challenges
      4. Invites them to schedule a discovery call using this link: ${process.env.CALENDLY_URL || 'https://calendly.com/jack-mvara/ai-2025-discussion'}
      
      The email should be concise (max 300 words), actionable, and personalized to their specific situation.
      Use a warm, professional tone aligned with mVara's brand.
      
      Format the email as HTML with appropriate paragraph breaks (<p> tags).
      Do not include any email headers, subject line, or signature - just the body content.
    `;
    
    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 800
    });
    
    // Get the generated email content
    const emailContent = response.choices[0].message.content.trim();
    
    // Store the generated email for reference
    const store = getStore({
      name: "generated-emails",
      siteID: process.env.SITE_ID || "59be53b3-b8d2-4f24-b3a2-fe876709471d",
      token: process.env.NETLIFY_API_TOKEN
    });
    
    await store.setJSON(uuidv4(), {
      email,
      name,
      timestamp: new Date().toISOString(),
      content: emailContent,
      data
    });
    
    return emailContent;
  } catch (error) {
    console.error("Error generating personalized email:", error);
    // Fall back to template-based email on error
    return generateTemplateEmail(email, name, data);
  }
}

// Fallback function to generate email from templates (existing logic)
function generateTemplateEmail(email: string, name: string, data: any): string {
  const isBusinessDomain = isBusinessEmail(email);
  
  // mVara brand blue color
  const mVaraBrandBlue = '#4B9CD3';
  
  // Common HTML header and footer
  const htmlHeader = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0 auto; padding: 0; color: #333333;">
      <!-- Header with Logo - White background with blue bottom border -->
      <div style="background-color: #FFFFFF; padding: 20px; border-bottom: 4px solid ${mVaraBrandBlue}; text-align: left;">
        <img src="https://mvara.ai/mvara-logo-white.png" alt="mVara Logo" style="height: 40px; width: auto;" />
      </div>
      
      <div style="padding: 20px;">
        <!-- Progress Bar -->
        <div style="background-color: #f0f0f0; height: 8px; border-radius: 4px; margin: 20px 0;">
          <div style="background-color: ${mVaraBrandBlue}; width: 25%; height: 100%; border-radius: 4px;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 12px; color: #666666;">
          <span style="font-weight: bold; color: ${mVaraBrandBlue};">Step 1: Done!</span>
          <span>Step 2: Discover</span>
          <span>Step 3: Assess</span>
          <span>Step 4: Execute</span>
        </div>
  `;
  
  // Rest of the existing template generation logic...
  
  // Return the complete HTML email
  return htmlHeader + (isBusinessDomain ? businessContent : personalContent) + htmlFooter;
}

// Modify the handler function to use the AI-powered email generation
export const handler: Handler = async (event: HandlerEvent) => {
  // Existing CORS and request validation logic...
  
  try {
    // Parse the request body
    const requestBody = JSON.parse(event.body || '{}');
    const { email, name, message, phone, company, industry, employees, revenue, challenges } = requestBody;
    
    // Store the assessment request in Netlify Blobs
    await storeAssessmentRequest(email, name || '', {
      message,
      phone,
      company,
      industry,
      employees,
      revenue,
      challenges
    });
    
    // Generate a unique token for unsubscribe
    const token = uuidv4();
    const unsubscribeUrl = `https://mvara.ai/unsubscribe?token=${token}&email=${encodeURIComponent(email)}`;
    
    if (!resend) {
      console.error("Resend not initialized – cannot send email");
    } else {
      try {
        // Generate AI-powered email content
        const emailHtml = await generatePersonalizedEmail(email, name, {
          message,
          phone,
          company,
          industry,
          employees,
          revenue,
          challenges
        });
        
        // Determine subject line based on email type
        const subject = isBusinessEmail(email) 
          ? "Your Organization's AI Readiness Journey with mVara"
          : "Your AI Readiness Journey with mVara";
        
        // Send the email
        await resend.emails.send({
          from: "mVara <no-reply@mvara.ai>",
          to: [email],
          subject: subject,
          html: emailHtml,
          headers: {
            "List-Unsubscribe": `<${unsubscribeUrl}>`,
          },
        });
        
        // Rest of the existing email sending logic...
      } catch (err) {
        console.error("Failed to send email via Resend", err);
        return {
          statusCode: 502,
          headers,
          body: JSON.stringify({ error: "Unable to send email" }),
        };
      }
    }
    
    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Thank you for your interest! We will reach out to you as soon as possible.'
      }),
    };
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
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

### 4. Create a Fallback System

Implement a robust fallback system to ensure emails are always sent, even if the AI service is unavailable:

```typescript
// Function to determine if AI-powered email generation should be used
function shouldUseAI(data: any): boolean {
  // Check if OpenAI API key is available
  if (!process.env.OPENAI_API_KEY) {
    return false;
  }
  
  // Check if we have enough data for personalization
  const hasEnoughData = Boolean(
    data.company || 
    data.industry || 
    data.employees || 
    data.challenges || 
    (data.message && data.message.length > 50)
  );
  
  return hasEnoughData;
}

// In the handler function:
let emailHtml;
if (shouldUseAI(requestData)) {
  try {
    emailHtml = await generatePersonalizedEmail(email, name, requestData);
  } catch (error) {
    console.error("AI email generation failed, falling back to template:", error);
    emailHtml = generateTemplateEmail(email, name, requestData);
  }
} else {
  emailHtml = generateTemplateEmail(email, name, requestData);
}
```

## Usage

The Intelligent Email Personalization feature can be used for:

1. **Onboarding Emails**: Welcome new users with personalized content
2. **Assessment Follow-ups**: Provide tailored feedback based on assessment data
3. **Re-engagement Campaigns**: Create personalized re-engagement emails for inactive users

## Best Practices

1. **Prompt Engineering**: Refine the prompt over time to improve email quality
2. **A/B Testing**: Compare AI-generated emails with template-based ones for engagement
3. **Human Review**: Implement a review process for AI-generated emails
4. **Gradual Rollout**: Start with a small percentage of emails using AI
5. **Content Guidelines**: Establish clear guidelines for AI-generated content

## Security Considerations

1. **Data Privacy**: Ensure customer data is handled securely
2. **API Key Security**: Store the OpenAI API key securely in environment variables
3. **Content Filtering**: Implement filters to prevent inappropriate content
4. **Audit Trail**: Maintain a record of all AI-generated emails

## Cost Management

1. **Selective Use**: Only use AI for high-value communications
2. **Caching**: Cache common responses for similar customer profiles
3. **Token Optimization**: Optimize prompts to use fewer tokens
4. **Model Selection**: Use GPT-3.5 for routine emails, GPT-4 for complex ones

## Future Enhancements

1. **Multilingual Support**: Generate emails in the recipient's preferred language
2. **Tone Customization**: Adjust tone based on customer preferences
3. **Dynamic Content**: Include dynamic content blocks based on customer interests
4. **Performance Tracking**: Track performance metrics of AI vs. template emails
5. **Continuous Learning**: Implement feedback loops to improve email personalization
