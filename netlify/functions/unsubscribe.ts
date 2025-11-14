import { Handler, HandlerEvent, HandlerResponse } from "@netlify/functions";
import { Resend } from "resend";
import { getStore } from "@netlify/blobs";
import { validateEmail } from "../utils/openai-client";

const resendApiKey = process.env.RESEND_API_KEY;
const siteId = process.env.SITE_ID || "59be53b3-b8d2-4f24-b3a2-fe876709471d";
const netlifyApiToken = process.env.NETLIFY_API_TOKEN;

if (!resendApiKey) {
  console.warn(
    "RESEND_API_KEY is not defined. Emails will not be sent. Add the key in Netlify env vars or .env.local."
  );
}

if (!netlifyApiToken) {
  console.warn(
    "NETLIFY_API_TOKEN is not defined. Netlify Blobs will not work. Add the token in Netlify env vars."
  );
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface UnsubscribeData {
  email: string;
  timestamp: string;
}

// Store unsubscribe data in Netlify Blobs
async function storeUnsubscribe(token: string, email: string) {
  try {
    if (!netlifyApiToken) {
      console.error("Cannot store unsubscribe data: NETLIFY_API_TOKEN is not defined");
      return false;
    }

    // Get the "unsubscribes" store with explicit siteID and token
    const store = getStore({
      name: "unsubscribes",
      siteID: siteId,
      token: netlifyApiToken
    });
    
    // Store the unsubscribe data with timestamp
    const data: UnsubscribeData = {
      email,
      timestamp: new Date().toISOString()
    };
    
    // Set the data in the store with the token as the key
    await store.setJSON(token, data);
    
    console.log(`Stored unsubscribe data for token ${token} and email ${email}`);
    return true;
  } catch (error) {
    console.error("Error storing unsubscribe data:", error);
    return false;
  }
}

// Send admin notification email
async function sendAdminNotification(token: string, email: string) {
  if (!resend) {
    console.warn("Cannot send admin notification: RESEND_API_KEY is not defined");
    return false;
  }

  try {
    // Validate the email using OpenAI if available
    let emailInfo = "";
    
    if (process.env.OPENAI_API_KEY) {
      try {
        const validation = await validateEmail(email);
        if (!validation.usedFallback) {
          emailInfo = `
            <p><strong>Email Analysis:</strong></p>
            <ul>
              <li>Type: ${validation.isBusinessEmail ? 'Business' : 'Personal'}</li>
              <li>Marketing Appropriate: ${validation.shouldSendMarketing ? 'Yes' : 'No'}</li>
              ${validation.securityConcerns ? `<li>Security Concerns: ${validation.securityConcerns}</li>` : ''}
            </ul>
          `;
        }
      } catch (error) {
        console.error("Error validating email:", error);
      }
    }

    // Send admin notification email with unsubscribe details
    await resend.emails.send({
      from: "mVara Notifications <no-reply@mvara.ai>",
      to: ["jack@mvara.ai"],
      subject: "Unsubscribe Request Received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Unsubscribe Request</h2>
          <p>A user has unsubscribed from mVara emails:</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Token:</strong> ${token}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          ${emailInfo}
        </div>
      `,
    });
    
    console.log(`Sent admin notification for unsubscribe: ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return false;
  }
}

export const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    // Extract token and email from query parameters
    const token = event.queryStringParameters?.token;
    const email = event.queryStringParameters?.email;

    if (!token) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing token parameter" }),
      };
    }

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing email parameter" }),
      };
    }

    // Store unsubscribe data in Netlify Blobs
    const storedSuccessfully = await storeUnsubscribe(token, email);

    // Send admin notification
    const notificationSent = await sendAdminNotification(token, email);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Unsubscribe successful",
        storedSuccessfully,
        notificationSent,
      }),
    };
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
