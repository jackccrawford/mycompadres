import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { Resend } from "resend";
import crypto from "node:crypto";
import fs from "fs";
import path from "path";
import { getStore } from "@netlify/blobs";
import { v4 as uuidv4 } from 'uuid';
import { validateEmail, generatePersonalizedEmail } from "../utils/openai-client";

interface RequestBody {
  name: string;
  email: string;
  company?: string;
  message: string;
  phone?: string;
  industry?: string;
  employees?: string;
  revenue?: string;
  challenges?: string;
  website?: string; // Honeypot field - should always be empty
}

interface PersonalizedEmailContent {
  heading: string;
  introText: string;
  challengeText: string;
  callToActionText: string;
  usedFallback: boolean;
  industry: string;
}

const resendApiKey = process.env.RESEND_API_KEY;
const calendlyUrl = process.env.CALENDLY_URL || "https://calendly.com/jack-mvara/ai-2025-discussion";

if (!resendApiKey) {
  console.warn(
    "RESEND_API_KEY is not defined. Emails will not be sent. Add the key in Netlify env vars or .env.local."
  );
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// List of common personal email domains - kept for fallback if AI classification fails
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
  'icloud.com', 'aol.com', 'protonmail.com', 'proton.me', 'mail.com',
  'zoho.com', 'yandex.com', 'gmx.com', 'tutanota.com', 'fastmail.com',
  'me.com', 'mac.com', 'msn.com', 'comcast.net', 'verizon.net',
  'att.net', 'sbcglobal.net', 'cox.net', 'charter.net', 'earthlink.net'
];

// Legacy function kept for fallback if AI classification fails
function isBusinessEmail(email: string): boolean {
  try {
    const domain = email.split('@')[1].toLowerCase();
    return !PERSONAL_EMAIL_DOMAINS.includes(domain);
  } catch (error) {
    // Fallback to false if there's any parsing error
    console.error('Error parsing email domain:', error);
    return false;
  }
}

// Generate email content based on whether it's a business or personal email
async function generateEmailContent(email: string, name: string, unsubscribeUrl: string, calendlyUrl: string): Promise<{ subject: string, html: string }> {
  // Use AI to classify the email
  let isBusinessDomain = false;
  let useAIPersonalization = false;
  
  try {
    // Only attempt AI classification if OpenAI API key is available
    if (process.env.OPENAI_API_KEY) {
      const emailValidation = await validateEmail(email);
      
      if (!emailValidation.usedFallback) {
        isBusinessDomain = emailValidation.isBusinessEmail;
        useAIPersonalization = true;
      } else {
        // Fall back to simple domain check if AI validation failed
        isBusinessDomain = isBusinessEmail(email);
      }
    } else {
      // Fall back to simple domain check if no API key
      isBusinessDomain = isBusinessEmail(email);
    }
  } catch (error) {
    console.error('Error during email validation:', error);
    // Fall back to simple domain check
    isBusinessDomain = isBusinessEmail(email);
  }

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

  const htmlFooter = `
        <p>Looking forward to guiding you through your AI transformation journey,</p>
        
        <p>
          <strong>Jack Crawford</strong><br />
          CEO, mVara
        </p>
        
        <!-- Footer -->
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />
        <p style="font-size: 12px; color: #666666; text-align: center;">
          If you'd rather not hear from us, you can <a href="${unsubscribeUrl}" style="color: #666666;">unsubscribe here</a>.
        </p>
      </div>
    </div>
  `;

  // Business-specific content
  if (isBusinessDomain) {
    const subject = "You've Completed Step 1 of Your Organization's AI Readiness Journey!";
    
    // Try to use AI personalization if available
    if (useAIPersonalization && process.env.OPENAI_API_KEY) {
      try {
        const domain = email.split('@')[1];
        const personalization = await generatePersonalizedEmail(domain);
        
        if (!personalization.usedFallback) {
          // Log the personalized content for debugging
          console.log('Using AI personalized content for domain:', domain, 'Industry:', personalization.industry);
          
          // Create the personalized content using our template with the AI-generated text
          const personalizedContent = `
            <h1 style="color: ${mVaraBrandBlue}; font-size: 24px; margin-bottom: 20px;">${personalization.heading}</h1>
            
            <p>${personalization.introText}</p>
            
            <p><strong>What happens next?</strong> ${personalization.challengeText}</p>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="${calendlyUrl}" style="background-color: ${mVaraBrandBlue}; color: #ffffff; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block;">Continue to Step 2: Schedule Your 30-Minute Business Discovery</a>
            </div>
            
            <p>${personalization.callToActionText}</p>
          `;
          
          return { subject, html: htmlHeader + personalizedContent + htmlFooter };
        }
      } catch (error) {
        console.error('Error generating personalized email:', error);
        // Fall back to standard template if personalization fails
      }
    }
    
    // Standard business content template (fallback)
    const businessContentTemplate = `
      <h1 style="color: ${mVaraBrandBlue}; font-size: 24px; margin-bottom: 20px;">Your Organization's AI Journey Has Begun!</h1>
      
      <p>You've successfully completed Step 1 of your AI Readiness Journey with mVara. We've identified your business domain and are excited to help your organization unlock its AI potential.</p>
      
      <p><strong>What happens next?</strong> To provide your organization with a meaningful assessment, we need to learn more about your specific business challenges and opportunities.</p>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${calendlyUrl}" style="background-color: ${mVaraBrandBlue}; color: #ffffff; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block;">Continue to Step 2: Schedule Your 30-Minute Business Discovery</a>
      </div>
      
      <p>During this brief call, we'll discuss your organization's unique needs, industry challenges, and begin crafting your personalized business AI readiness assessment.</p>
    `;
    
    // Use standard template if AI personalization is not available or fails
    return { subject, html: htmlHeader + businessContentTemplate + htmlFooter };
  }
  // Personal email content
  else {
    const subject = "You've Completed Step 1 of Your AI Readiness Journey!";
    const personalContent = `
      <h1 style="color: ${mVaraBrandBlue}; font-size: 24px; margin-bottom: 20px;">Your AI Journey Has Begun!</h1>
      
      <p>You've successfully completed Step 1 of your AI Readiness Journey with mVara. We're excited to learn more about your interest in AI transformation.</p>
      
      <p><strong>What happens next?</strong> To provide you with a meaningful assessment, we'd like to understand your specific goals and the context in which you're exploring AI solutions.</p>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${calendlyUrl}" style="background-color: ${mVaraBrandBlue}; color: #ffffff; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block;">Continue to Step 2: Schedule Your 30-Minute Discovery Call</a>
      </div>
      
      <p>During this brief call, we'll discuss your specific interests in AI, whether for personal projects, entrepreneurial ventures, or organizational implementation.</p>
    `;

    return { subject, html: htmlHeader + personalContent + htmlFooter };
  }
}

// Store assessment request in Netlify Blobs
async function storeAssessmentRequest(email: string, name: string, data: any) {
  try {
    const siteId = process.env.SITE_ID || "59be53b3-b8d2-4f24-b3a2-fe876709471d";
    const netlifyApiToken = process.env.NETLIFY_API_TOKEN;
    
    if (!netlifyApiToken) {
      console.warn("NETLIFY_API_TOKEN is not defined. Assessment request will not be stored in Blobs.");
      return false;
    }
    
    // Get the "assessment-requests" store with explicit credentials
    const store = getStore({
      name: "assessment-requests",
      siteID: siteId,
      token: netlifyApiToken
    });
    
    // Generate a unique ID for this request
    const requestId = uuidv4();
    
    // Store the request data with timestamp
    const requestData = {
      id: requestId,
      email,
      name,
      timestamp: new Date().toISOString(),
      ...data
    };
    
    // Log the data being stored for debugging
    console.log(`Attempting to store assessment request with ID: ${requestId}`);
    
    try {
      // Set the data in the store with the requestId as the key
      await store.setJSON(requestId, requestData);
      console.log(`Successfully stored assessment request for ${email} with ID: ${requestId}`);
      return true;
    } catch (storeError) {
      console.error("Error storing data in Blobs:", storeError);
      
      // Try an alternative approach with a string value
      try {
        await store.set(requestId, JSON.stringify(requestData));
        console.log(`Successfully stored assessment request as string for ${email} with ID: ${requestId}`);
        return true;
      } catch (stringError) {
        console.error("Error storing string data in Blobs:", stringError);
        return false;
      }
    }
  } catch (error) {
    console.error("Error in storeAssessmentRequest:", error);
    return false;
  }
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse request body
    const requestBody: RequestBody = JSON.parse(event.body || "{}");
    const { name, email, message, company, phone, industry, employees, revenue, challenges, website } = requestBody;

    // HONEYPOT: If "website" field is filled, it's a bot
    if (website) {
      console.log('Bot detected via honeypot field:', { email, website });
      return {
        statusCode: 200, // Return 200 to not alert bots
        headers,
        body: JSON.stringify({
          message: "Thank you for your interest! We will reach out to you as soon as possible."
        }),
      };
    }

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Name, email, and message are required" }),
      };
    }

    // Generate a unique token for unsubscribe link
    const unsubscribeToken = crypto.createHash('sha256').update(`${email}:${Date.now()}`).digest('hex');
    const unsubscribeUrl = `https://mvara.ai/unsubscribe?token=${unsubscribeToken}&email=${encodeURIComponent(email)}`;

    // Store the assessment request in Netlify Blobs
    const requestId = uuidv4();
    const stored = await storeAssessmentRequest(email, name, {
      message,
      company,
      phone,
      industry,
      employees,
      revenue,
      challenges,
      timestamp: new Date().toISOString(),
    });

    // If Resend API key is not available, return success but no email sent
    if (!resend) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: "Thank you for your interest! We will reach out to you as soon as possible.",
          note: "Email sending is disabled. Add RESEND_API_KEY to enable.",
          requestId,
        }),
      };
    } else {
      try {
        // Generate email content based on domain type
        const emailContent = await generateEmailContent(email, name, unsubscribeUrl, calendlyUrl);

        // For testing purposes, include the email HTML in the response
        const debugMode = process.env.NODE_ENV === 'development' || event.queryStringParameters?.debug === 'true';
        
        // Send the email
        await resend.emails.send({
          from: "mVara <no-reply@mvara.ai>",
          to: [email],
          subject: emailContent.subject,
          html: emailContent.html,
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            message: "Thank you for your interest! We will reach out to you as soon as possible.",
            requestId,
            debug_email_html: debugMode ? emailContent.html : undefined
          }),
        };
      } catch (error) {
        console.error("Error sending email:", error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            error: "Failed to send email",
            message: "Your information has been received, but we encountered an issue sending the confirmation email.",
            requestId,
          }),
        };
      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
