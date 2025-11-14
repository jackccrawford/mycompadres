#!/usr/bin/env node

const { execSync } = require('child_process');

// Function to run a command and return its output
function runCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return null;
  }
}

// Get the list of tokens
console.log("Fetching unsubscribe records...\n");
const listOutput = runCommand('netlify blobs:list unsubscribes');

if (!listOutput) {
  console.error("Failed to retrieve unsubscribe list");
  process.exit(1);
}

// Parse the table to extract tokens
const lines = listOutput.split('\n');
const tokenLines = lines.filter(line => 
  line.includes('|') && 
  !line.includes('Key') && 
  !line.includes('---') &&
  line.trim() !== ''
);

// Extract tokens from the table
const tokens = tokenLines.map(line => {
  const parts = line.trim().split('|');
  if (parts.length >= 2) {
    return parts[0].trim();
  }
  return null;
}).filter(token => token !== null);

if (tokens.length === 0) {
  console.log("No unsubscribe records found.");
  process.exit(0);
}

console.log(`Found ${tokens.length} unsubscribe records:\n`);
console.log("EMAIL                           | TIMESTAMP                  | TOKEN");
console.log("--------------------------------|----------------------------|---------------------------");

// Get details for each token
tokens.forEach(token => {
  try {
    const details = runCommand(`netlify blobs:get unsubscribes "${token}"`);
    if (details) {
      try {
        const data = JSON.parse(details);
        const email = data.email || 'Unknown';
        const timestamp = data.timestamp 
          ? new Date(data.timestamp).toLocaleString() 
          : 'Unknown';
        
        console.log(`${email.padEnd(30)} | ${timestamp.padEnd(26)} | ${token}`);
      } catch (e) {
        console.log(`Error parsing data for token: ${token}`);
      }
    }
  } catch (error) {
    console.log(`Error retrieving details for token: ${token}`);
  }
});

console.log("\nDone!");
