/**
 * Environment Configuration
 * 
 * This file manages environment-specific configuration values.
 * 
 * To switch between environments:
 * 
 * 1. Development (local):
 *    - Uses localhost:9999 for Netlify Functions
 *    - Start the functions server with: netlify functions:serve
 *    - Place whitepaper in public/downloads/
 * 
 * 2. Production (Netlify):
 *    - Uses relative path /.netlify/functions
 *    - Functions are automatically deployed to Netlify
 *    - Whitepaper should be in public/downloads/ before deployment
 *    - No additional configuration needed
 * 
 * To switch environments, change isDevelopment to true/false
 */

const isDevelopment = process.env.NODE_ENV !== 'production';

export const config = {
  // API endpoints
  apiBaseUrl: isDevelopment
    ? 'http://localhost:9999/.netlify/functions'  // Development
    : '/.netlify/functions',                      // Production

  // Assets
  //  whitepaperUrl: '/downloads/mvara_whitepaper.pdf',  // Relative to public directory
};
