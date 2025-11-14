#!/bin/bash

# Test script for email personalization with different domains

# Create a directory for test results
mkdir -p test-results

# Function to test a specific email domain
test_domain() {
  local name="Test User"
  local email="test@$1"
  local message="Hello, I'm interested in AI readiness assessment."
  
  echo "Testing domain: $1"
  echo "Email: $email"
  echo "------------------------------------"
  
  # Send request to the contact function and save the full response
  local response=$(curl -s -X POST http://localhost:9999/.netlify/functions/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$name\",\"email\":\"$email\",\"message\":\"$message\"}")
  
  # Extract the email HTML content using jq
  local email_html=$(echo $response | jq -r '.debug_email_html // "No email HTML found"')
  
  # Save the email HTML to a file
  echo "$email_html" > "test-results/$1.html"
  
  # Print the response message
  echo "Response message: $(echo $response | jq -r '.message')"
  echo "Email HTML saved to test-results/$1.html"
  
  echo ""
  echo "------------------------------------"
  echo ""
}

# Test various domains
test_domain "healthcare.org"
test_domain "bank.com"
test_domain "tech-startup.io"
test_domain "university.edu"
test_domain "manufacturing.net"
test_domain "retail-chain.com"
test_domain "law-firm.com"
test_domain "gmail.com"  # Personal domain for comparison
