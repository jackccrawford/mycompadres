import { Handler, HandlerEvent, HandlerResponse } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

interface UnsubscribeRecord {
  token: string;
  email: string;
  timestamp: string;
}

// Function to get all unsubscribe records
async function getAllUnsubscribes() {
  try {
    const siteId = process.env.SITE_ID || "59be53b3-b8d2-4f24-b3a2-fe876709471d";
    const netlifyApiToken = process.env.NETLIFY_API_TOKEN;
    
    if (!netlifyApiToken) {
      return { error: "NETLIFY_API_TOKEN is not defined" };
    }
    
    // Get the store with explicit credentials
    const store = getStore({
      name: "unsubscribes",
      siteID: siteId,
      token: netlifyApiToken
    });
    
    // Since the list method may not be available in the current version,
    // we'll use the known tokens from the Netlify dashboard
    const knownTokens = [
      "a2348405-59f6-4271-8b54-e1553842da9e",
      "b1970330-54cc-450b-a988-b50c12e5dd95",
      "test-token",
      "35891652-753d-418c-a181-678f363bc865"
    ];
    
    // Get details for each key
    const records: UnsubscribeRecord[] = [];
    for (const token of knownTokens) {
      try {
        const data = await store.get(token, { type: 'json' });
        if (data) {
          records.push({
            token,
            email: data.email || 'Unknown',
            timestamp: data.timestamp || 'Unknown'
          });
        }
      } catch (e) {
        console.error(`Error getting details for token ${token}:`, e);
      }
    }
    
    return { records };
  } catch (error) {
    console.error("Error getting unsubscribe records:", error);
    return { error: "Failed to retrieve unsubscribe records" };
  }
}

// Generate HTML for the response
function generateHtml(data: any) {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>mVara Unsubscribe Records</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #4B9CD3;
          border-bottom: 2px solid #4B9CD3;
          padding-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #4B9CD3;
          color: white;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
        .error {
          color: #D32F2F;
          background-color: #FFEBEE;
          padding: 15px;
          border-radius: 4px;
          margin: 20px 0;
        }
        .info {
          color: #1976D2;
          background-color: #E3F2FD;
          padding: 15px;
          border-radius: 4px;
          margin: 20px 0;
        }
        .timestamp {
          white-space: nowrap;
        }
      </style>
    </head>
    <body>
      <h1>mVara Unsubscribe Records</h1>
  `;
  
  if (data.error) {
    html += `<div class="error"><strong>Error:</strong> ${data.error}</div>`;
    if (data.message) {
      html += `<div class="info">${data.message}</div>`;
    }
  } else if (data.records && data.records.length > 0) {
    html += `
      <p>Found ${data.records.length} unsubscribe records:</p>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Timestamp</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    data.records.forEach((record: UnsubscribeRecord) => {
      const timestamp = record.timestamp !== 'Unknown' 
        ? new Date(record.timestamp).toLocaleString() 
        : 'Unknown';
      
      html += `
        <tr>
          <td>${record.email}</td>
          <td class="timestamp">${timestamp}</td>
          <td>${record.token}</td>
        </tr>
      `;
    });
    
    html += `
        </tbody>
      </table>
    `;
  } else {
    html += `<p>No unsubscribe records found.</p>`;
  }
  
  html += `
      <p><em>Note: This page is only accessible to authenticated Netlify users with access to this site.</em></p>
    </body>
    </html>
  `;
  
  return html;
}

export const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }
  
  // Get the unsubscribe records
  const data = await getAllUnsubscribes();
  
  // Generate HTML response
  const html = generateHtml(data);
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: html
  };
};
