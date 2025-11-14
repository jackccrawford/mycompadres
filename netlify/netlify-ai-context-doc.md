# Netlify Development Reference

This document serves as a reference for Netlify development concepts, APIs, and best practices used in the mVara website. It consolidates key information to help with future development and maintenance.

## Table of Contents

- [Netlify Functions](#netlify-functions)
- [Netlify Blobs](#netlify-blobs)
- [Edge Functions](#edge-functions)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

## Netlify Functions

Netlify Functions are serverless Lambda functions that can be deployed without configuring or managing infrastructure. They're perfect for handling form submissions, API calls, and other server-side tasks.

### Basic Structure

```typescript
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Process the request
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success" })
  };
};
```

### Key Concepts

- **Event Object**: Contains request information like HTTP method, headers, body, and query parameters
- **Context Object**: Contains information about the function execution context
- **Response Object**: Must include a statusCode and can include body, headers, etc.

### Function Locations

- Functions should be placed in the `/netlify/functions/` directory
- Each function is deployed to a URL path matching its filename: `/.netlify/functions/[filename]`

### CORS Handling

```typescript
// Handle CORS preflight
if (event.httpMethod === 'OPTIONS') {
  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
    body: '',
  };
}
```

## Netlify Blobs

Netlify Blobs is a key-value store for persisting data without setting up a separate database. It's ideal for storing form submissions, user preferences, and other application data.

### Basic Usage

```typescript
import { getStore } from "@netlify/blobs";

// Get a store with explicit credentials
const store = getStore({
  name: "store-name",
  siteID: process.env.SITE_ID,
  token: process.env.NETLIFY_API_TOKEN
});

// Store JSON data
await store.setJSON("key", { data: "value" });

// Retrieve JSON data
const data = await store.get("key", { type: "json" });

// Store string data
await store.set("key", "string value");

// Retrieve string data
const stringData = await store.get("key");

// Delete data
await store.delete("key");
```

### CLI Commands

```bash
# List all keys in a store
netlify blobs:list store-name

# Get a specific key's value
netlify blobs:get store-name key

# Set a key's value
netlify blobs:set store-name key value

# Delete a key
netlify blobs:delete store-name key
```

### Important Notes

- Each store is a separate namespace for your data
- Keys must be strings
- Values can be strings, Buffers, or JSON-serializable objects
- The `list()` method may not be available in all versions of the library
- Always provide explicit `siteID` and `token` parameters to avoid authentication issues

## Edge Functions

Edge Functions run at the CDN edge, closer to users, for improved performance. They're ideal for personalization, A/B testing, and other tasks that need to be performed before content reaches the browser.

### Configuration

Edge functions are configured with a path pattern and only paths matching those patterns will run the edge function. Path and excludedPath support substring patterns or the URLPattern syntax from the web platform.

```json
{
  "path": string | string[], // URLPattern expression defining paths where the edge function should run. Must start with '/'.
  "excludedPath": string | string[], // Optional. Defines paths to exclude from execution. Must start with '/'.
  "pattern": RegExp | RegExp[], // Alternative to `path`. Uses regex for path matching.
  "excludedPattern": RegExp | RegExp[] // Optional. Defines regex patterns to exclude certain routes.
}
```

### Function Locations

Edge functions should be placed in the `/netlify/edge-functions/` directory.

## Environment Variables

Environment variables are used to store configuration and sensitive information that shouldn't be committed to the repository.

### Common Environment Variables

- `NETLIFY_API_TOKEN`: Personal access token for Netlify API access
- `SITE_ID`: Netlify site ID (e.g., "59be53b3-b8d2-4f24-b3a2-fe876709471d")
- `RESEND_API_KEY`: API key for Resend email service

### Setting Environment Variables

1. **Local Development**: Create a `.env.local` file in the project root
2. **Netlify UI**: Set variables in Site settings > Build & deploy > Environment
3. **Netlify CLI**: Use `netlify env:set KEY VALUE`

### Accessing Environment Variables

```typescript
// In Netlify Functions
const apiKey = process.env.API_KEY;

// In Edge Functions
export default async (request, context) => {
  const apiKey = Netlify.env.get("API_KEY");
};
```

## Deployment

### Manual Deployment

```bash
# Build the project
npx expo export

# Deploy to Netlify
netlify deploy --prod --dir=dist --site=59be53b3-b8d2-4f24-b3a2-fe876709471d
```

### Continuous Deployment

Netlify can automatically deploy your site when you push to your repository. Configure this in the Netlify UI under Site settings > Build & deploy > Continuous deployment.

### Deployment Contexts

Netlify supports different deployment contexts:

- **Production**: The main branch of your repository
- **Deploy Previews**: Pull/merge requests
- **Branch Deploys**: Non-production branches

Each context can have its own configuration in `netlify.toml`.

## Best Practices

1. **Environment Variables**: Never hardcode sensitive information
2. **Error Handling**: Always include proper error handling in functions
3. **CORS**: Configure CORS headers for functions that need to be accessed from other domains
4. **Logging**: Use console.log for debugging, but be mindful of sensitive information
5. **Function Size**: Keep functions small and focused on a single task
6. **Cold Starts**: Be aware of cold start times for functions that need to be fast
7. **Rate Limiting**: Implement rate limiting for public-facing functions
8. **Testing**: Test functions locally before deploying

## Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Netlify Blobs Documentation](https://docs.netlify.com/blobs/overview/)
- [Netlify Edge Functions Documentation](https://docs.netlify.com/edge-functions/overview/)
- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)
- [Netlify CLI Documentation](https://docs.netlify.com/cli/get-started/)
