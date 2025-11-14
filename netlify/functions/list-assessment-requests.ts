import { Handler, HandlerEvent, HandlerResponse } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { validateEmail } from "../utils/openai-client";

interface AssessmentRequest {
  id: string;
  email: string;
  name: string;
  timestamp: string;
  message?: string;
  phone?: string;
  company?: string;
  industry?: string;
  employees?: string;
  revenue?: string;
  challenges?: string;
  emailAnalysis?: {
    isBusinessEmail: boolean;
    isPersonal: boolean;
    shouldSendMarketing: boolean;
    confidence: number;
  };
}

// Function to get all assessment requests
async function getAllAssessmentRequests() {
  try {
    const siteId = process.env.SITE_ID || "59be53b3-b8d2-4f24-b3a2-fe876709471d";
    const netlifyApiToken = process.env.NETLIFY_API_TOKEN;
    
    if (!netlifyApiToken) {
      return { error: "NETLIFY_API_TOKEN is not defined" };
    }
    
    // Get the store with explicit credentials
    const store = getStore({
      name: "assessment-requests",
      siteID: siteId,
      token: netlifyApiToken
    });
    
    // Use the known request IDs from the logs
    const knownRequestIds = [
      "4a329492-764a-4611-bd65-75e6115368b5"
    ];
    
    // Get details for each request ID
    const records: AssessmentRequest[] = [];
    for (const requestId of knownRequestIds) {
      try {
        const data = await store.get(requestId, { type: 'json' });
        if (data) {
          // Create the base record
          const record: AssessmentRequest = {
            id: requestId,
            email: data.email || 'Unknown',
            name: data.name || 'Unknown',
            timestamp: data.timestamp || 'Unknown',
            message: data.message,
            phone: data.phone,
            company: data.company,
            industry: data.industry,
            employees: data.employees,
            revenue: data.revenue,
            challenges: data.challenges
          };
          
          // Add email analysis if OpenAI API is available
          if (process.env.OPENAI_API_KEY && data.email) {
            try {
              const emailValidation = await validateEmail(data.email);
              if (!emailValidation.usedFallback) {
                record.emailAnalysis = {
                  isBusinessEmail: emailValidation.isBusinessEmail,
                  isPersonal: emailValidation.isPersonal,
                  shouldSendMarketing: emailValidation.shouldSendMarketing,
                  confidence: emailValidation.confidence
                };
              }
            } catch (error) {
              console.error(`Error analyzing email ${data.email}:`, error);
            }
          }
          
          records.push(record);
        }
      } catch (error) {
        console.error(`Error getting data for request ID ${requestId}:`, error);
      }
    }
    
    return { records };
  } catch (error) {
    console.error("Error getting assessment requests:", error);
    return { error: "Failed to retrieve assessment requests" };
  }
}

// Function to generate HTML table from records
function generateHtmlTable(records: AssessmentRequest[]) {
  // Sort records by timestamp (newest first)
  records.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  
  // Generate table rows
  const tableRows = records.map(record => {
    // Format timestamp
    const timestamp = new Date(record.timestamp).toLocaleString();
    
    // Format email analysis if available
    let emailAnalysisHtml = '';
    if (record.emailAnalysis) {
      emailAnalysisHtml = `
        <div class="email-analysis">
          <span class="badge ${record.emailAnalysis.isBusinessEmail ? 'business' : 'personal'}">
            ${record.emailAnalysis.isBusinessEmail ? 'Business' : 'Personal'}
          </span>
          <span class="badge ${record.emailAnalysis.shouldSendMarketing ? 'marketing-yes' : 'marketing-no'}">
            ${record.emailAnalysis.shouldSendMarketing ? 'Marketing OK' : 'No Marketing'}
          </span>
          <span class="confidence">
            Confidence: ${Math.round(record.emailAnalysis.confidence * 100)}%
          </span>
        </div>
      `;
    }
    
    return `
      <tr>
        <td>${timestamp}</td>
        <td>
          ${record.email}
          ${emailAnalysisHtml}
        </td>
        <td>${record.name}</td>
        <td>${record.company || '-'}</td>
        <td>${record.industry || '-'}</td>
        <td>${record.employees || '-'}</td>
        <td>${record.revenue || '-'}</td>
        <td>${record.message || '-'}</td>
        <td>${record.challenges || '-'}</td>
        <td>${record.phone || '-'}</td>
        <td>${record.id}</td>
      </tr>
    `;
  }).join('');
  
  // Generate full HTML page
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>mVara Assessment Requests</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f5f5f5;
        }
        h1 {
          color: #4B9CD3;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background-color: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #4B9CD3;
          color: white;
          position: sticky;
          top: 0;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
        .container {
          max-width: 100%;
          overflow-x: auto;
        }
        .timestamp {
          white-space: nowrap;
        }
        .email-analysis {
          margin-top: 5px;
          font-size: 12px;
        }
        .badge {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 3px;
          margin-right: 5px;
          font-weight: bold;
        }
        .business {
          background-color: #4B9CD3;
          color: white;
        }
        .personal {
          background-color: #f0ad4e;
          color: white;
        }
        .marketing-yes {
          background-color: #5cb85c;
          color: white;
        }
        .marketing-no {
          background-color: #d9534f;
          color: white;
        }
        .confidence {
          color: #777;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <h1>mVara Assessment Requests</h1>
      <div class="container">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Email</th>
              <th>Name</th>
              <th>Company</th>
              <th>Industry</th>
              <th>Employees</th>
              <th>Revenue</th>
              <th>Message</th>
              <th>Challenges</th>
              <th>Phone</th>
              <th>Request ID</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `;
}

export const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
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
    // Get all assessment requests
    const result = await getAllAssessmentRequests();
    
    if ('error' in result) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: result.error }),
      };
    }
    
    // Generate HTML table
    const html = generateHtmlTable(result.records);
    
    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Content-Type": "text/html",
      },
      body: html,
    };
  } catch (error) {
    console.error("Error in list-assessment-requests:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
