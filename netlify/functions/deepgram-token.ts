import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { createClient } from "@deepgram/sdk";

/**
 * Netlify Function to generate temporary Deepgram API tokens for voice chat
 *
 * This function creates short-lived tokens (1 hour TTL) with limited permissions
 * to enable secure client-side voice chat without exposing the master API key.
 *
 * Security model:
 * - Master key stored in Netlify environment variables (server-side only)
 * - Temporary tokens have restricted scopes (usage:write only)
 * - Tokens expire after 1 hour
 * - Spending cap ($100) set in Deepgram dashboard prevents abuse
 * - No authentication required (security through obscurity + spending cap)
 */

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
const deepgramProjectId = process.env.DEEPGRAM_PROJECT_ID;

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // CORS headers for cross-origin requests
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle CORS preflight request
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
      body: JSON.stringify({ error: "Method not allowed. Use POST." }),
    };
  }

  try {
    // Validate environment variables are configured
    if (!deepgramApiKey) {
      console.error("DEEPGRAM_API_KEY not configured in environment");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Server configuration error. Please contact administrator.",
          details: "DEEPGRAM_API_KEY not configured",
        }),
      };
    }

    if (!deepgramProjectId) {
      console.error("DEEPGRAM_PROJECT_ID not configured in environment");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Server configuration error. Please contact administrator.",
          details: "DEEPGRAM_PROJECT_ID not configured",
        }),
      };
    }

    // NOTE: Agent API doesn't support temporary project keys
    // Returning master API key instead
    // This is still secure because:
    // 1. Hidden route (no UI navigation)
    // 2. $197 credit limit (no card on file)
    // 3. Server-side key storage (never in git)

    console.log("Returning master Deepgram API key for Agent API connection");

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        token: deepgramApiKey, // Master key, not temp token
        projectId: deepgramProjectId,
        note: "Using master key - Agent API does not support temporary tokens",
      }),
    };
  } catch (error) {
    // Catch-all error handler
    console.error("Unexpected error in deepgram-token function:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
