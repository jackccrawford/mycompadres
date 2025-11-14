import { OpenAI } from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources';

/**
 * Get the OpenAI client with the model specified in environment variables
 * 
 * @returns OpenAI client instance
 */
export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  
  return new OpenAI({
    apiKey,
    maxRetries: 2,
    timeout: 15000 // 15 seconds timeout to prevent long-running requests
  });
}

/**
 * Get the OpenAI model to use from environment variables
 * 
 * @returns The model name to use for OpenAI API calls
 */
export function getOpenAIModel(): string {
  return process.env.OPENAI_MODEL || 'gpt-4o-mini';
}

/**
 * Create a chat completion with the OpenAI API
 * 
 * @param messages The messages to send to the API
 * @param options Additional options for the API call
 * @returns The response from the API or a fallback
 */
export async function createChatCompletion(
  messages: ChatCompletionMessageParam[],
  options: {
    temperature?: number;
    max_tokens?: number;
    response_format?: { type: 'text' | 'json_object' };
  } = {}
) {
  try {
    const client = getOpenAIClient();
    const model = getOpenAIModel();
    
    const response = await client.chat.completions.create({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens,
      response_format: options.response_format,
    });
    
    return {
      success: true,
      content: response.choices[0]?.message?.content || '',
      usage: response.usage
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return {
      success: false,
      content: '',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Validate an email address using the OpenAI API
 * 
 * @param email The email address to validate
 * @returns Validation result with fallback if API fails
 */
export async function validateEmail(email: string) {
  // Basic regex validation first
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Invalid email format',
      usedFallback: true
    };
  }
  
  // Check for common prompt injection patterns
  const promptInjectionPatterns = [
    'ignore previous instructions',
    'disregard',
    'instead',
    'system prompt',
    'you are now',
    'new role',
    'forget',
    'override'
  ];
  
  for (const pattern of promptInjectionPatterns) {
    if (email.toLowerCase().includes(pattern)) {
      return {
        isValid: false,
        error: 'Email contains disallowed content',
        usedFallback: true
      };
    }
  }
  
  // Extract domain for classification
  const domain = email.split('@')[1].toLowerCase();
  
  // List of common personal email domains for fallback
  const personalDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
    'icloud.com', 'aol.com', 'protonmail.com', 'mail.com', 'zoho.com',
    'yandex.com', 'gmx.com', 'tutanota.com', 'fastmail.com', 'me.com',
    'mac.com', 'msn.com', 'comcast.net', 'verizon.net', 'att.net',
    'sbcglobal.net', 'cox.net', 'charter.net', 'earthlink.net'
  ];
  
  try {
    // Use OpenAI to classify the email
    const result = await createChatCompletion(
      [
        {
          role: 'system' as const,
          content: `You are an email classifier that determines if an email is from a business or personal domain, and whether it's appropriate to send marketing emails to it. Respond with a JSON object only.`
        },
        {
          role: 'user' as const,
          content: `Classify this email address: ${email}
          
          Return a JSON object with these fields:
          - isValid: boolean (true if it's a valid email)
          - isBusinessEmail: boolean (true if it's likely a business email domain)
          - isPersonal: boolean (true if it's likely a personal email domain)
          - shouldSendMarketing: boolean (true if it's appropriate to send marketing emails)
          - securityConcerns: string or null (any security concerns with this email)
          - confidence: number (0-1, how confident you are in this classification)
          
          Only respond with the JSON object, no other text.`
        }
      ],
      {
        temperature: 0.1,
        response_format: { type: 'json_object' }
      }
    );
    
    if (result.success && result.content) {
      try {
        const classification = JSON.parse(result.content);
        return {
          ...classification,
          usedFallback: false
        };
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
        // Fall back to simple domain check
      }
    }
    
    // Fallback if API call fails or response parsing fails
    const isBusinessEmail = !personalDomains.includes(domain);
    return {
      isValid: true,
      isBusinessEmail,
      isPersonal: !isBusinessEmail,
      shouldSendMarketing: true, // Default to true for fallback
      confidence: 0.7,
      usedFallback: true
    };
  } catch (error) {
    console.error('Error validating email:', error);
    // Fallback if API call fails
    const isBusinessEmail = !personalDomains.includes(domain);
    return {
      isValid: true,
      isBusinessEmail,
      isPersonal: !isBusinessEmail,
      shouldSendMarketing: true, // Default to true for fallback
      confidence: 0.7,
      usedFallback: true
    };
  }
}

/**
 * Sanitize text to remove markdown formatting
 * 
 * @param text Text to sanitize
 * @returns Sanitized text
 */
function sanitizeText(text: string): string {
  if (!text) return '';
  
  // Remove backticks (markdown code blocks)
  let sanitized = text.replace(/```[a-z]*\n|```/g, '');
  
  // Remove other markdown formatting
  sanitized = sanitized.replace(/\*\*/g, ''); // bold
  sanitized = sanitized.replace(/\*/g, '');   // italic
  sanitized = sanitized.replace(/`/g, '');    // inline code
  sanitized = sanitized.replace(/\[|\]\(.*?\)/g, ''); // links
  
  return sanitized.trim();
}

/**
 * Interface for personalized email content
 */
export interface PersonalizedEmailContent {
  heading: string;
  introText: string;
  challengeText: string;
  callToActionText: string;
  usedFallback: boolean;
  industry?: string;
}

/**
 * Generates personalized email content based on domain
 * 
 * @param emailDomain The email domain to personalize for
 * @returns Personalized email content with fallback if API fails
 */
export async function generatePersonalizedEmail(emailDomain: string): Promise<PersonalizedEmailContent> {
  const result = await createChatCompletion(
    [
      {
        role: 'system' as const,
        content: `You are an email personalization assistant for mVara, a company that helps organizations with AI readiness assessments.
Your task is to generate personalized email content based on the recipient's email domain.
Analyze the domain to determine the industry or business type, then create appropriate personalized content.
RESPOND ONLY WITH A JSON OBJECT containing the requested fields.
DO NOT use any markdown formatting in your response - no triple backticks, no asterisks, no underscores, no code blocks.
The JSON object should be the entire response, not wrapped in any formatting.`
      },
      {
        role: 'user' as const,
        content: `Generate personalized email content for a user with the email domain "${emailDomain}".

Return a JSON object with these fields:
- heading: A personalized heading related to AI readiness for their industry (use specific wording, no placeholders)
- introText: A personalized introduction paragraph mentioning their industry if identifiable (use specific wording, no placeholders)
- challengeText: A paragraph about industry-specific challenges or opportunities with AI (use specific wording, no placeholders)
- callToActionText: Text describing what will be discussed in a discovery call (use specific wording, no placeholders)
- industry: The identified industry or business type

IMPORTANT FORMATTING RULES:
1. Use plain text only - no markdown formatting whatsoever
2. DO NOT wrap your response in triple backticks (\`\`\`)
3. DO NOT use asterisks (*) or underscores (_) for emphasis
4. DO NOT include any HTML tags
5. DO NOT include any placeholders like [industry] or [specific area] - use actual specific content
6. The response should be a clean JSON object only`
      }
    ],
    {
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: 'json_object' }
    }
  );
  
  if (result.success && result.content) {
    try {
      // Parse the JSON response
      const personalization = JSON.parse(result.content);
      
      return {
        heading: sanitizeText(personalization.heading),
        introText: sanitizeText(personalization.introText),
        challengeText: sanitizeText(personalization.challengeText),
        callToActionText: sanitizeText(personalization.callToActionText),
        industry: sanitizeText(personalization.industry),
        usedFallback: false
      };
    } catch (error) {
      console.error('Error parsing personalized content:', error);
      // Fall back to generic content
      return getDefaultPersonalization(emailDomain);
    }
  }
  
  // Fallback if API call fails
  return getDefaultPersonalization(emailDomain);
}

/**
 * Provides default personalization if AI generation fails
 * 
 * @param emailDomain The email domain
 * @returns Default personalized content
 */
function getDefaultPersonalization(emailDomain: string): PersonalizedEmailContent {
  return {
    heading: "Your Organization's AI Journey Has Begun!",
    introText: `You've successfully completed Step 1 of your AI Readiness Journey with mVara. We've identified your business domain and are excited to help your organization unlock its AI potential.`,
    challengeText: `To provide your organization with a meaningful assessment, we need to learn more about your specific business challenges and opportunities.`,
    callToActionText: `During this brief call, we'll discuss your organization's unique needs, industry challenges, and begin crafting your personalized business AI readiness assessment.`,
    usedFallback: true,
    industry: "unknown"
  };
}
