#!/usr/bin/env bash

# Script to test personalized email prompt with various small local LLMs via Ollama

mkdir -p test-results/llm

# List of simple domains for testing
domains=(
  "healthcare.org"
  "bank.com"
  "tech-startup.io"
  "university.edu"
)

# List of small Ollama models
models=(
  falcon3:7b
  falcon3:3b
  falcon3:1b
  exaone-deep:2.4b
  deepcoder:1.5b
  smollm2:1.7b
  smollm2:360m
  nemotron-mini:latest
  phi:latest
  phi:2.7b
  granite3.2:latest
  deepscaler:latest
  mistral:7b
  phi4-mini:latest
  llama3.2:latest
  llama3:8b
  neural-chat:7b
  codellama:7b
)

# Prompt components
read -r -d '' system_msg << 'SYS'
You are an email personalization assistant for mVara, a company that helps organizations with AI readiness assessments.
Your task is to generate personalized email content based on the recipient's email domain.
Analyze the domain to determine the industry or business type, then create appropriate personalized content.
RESPOND ONLY WITH A JSON OBJECT containing the requested fields.
DO NOT use any markdown formatting in your response - no triple backticks, no asterisks, no underscores, no code blocks.
The JSON object should be the entire response, not wrapped in any formatting.
SYS

for model in "${models[@]}"; do
  for domain in "${domains[@]}"; do
    echo "--- Testing $model for $domain ---"
    # Combine system and user prompts into a single variable
    prompt=$(cat <<EOF
$system_msg

Generate personalized email content for a user with the email domain "$domain".

Return a JSON object with these fields:
- heading: A personalized heading related to AI readiness for their industry (use specific wording, no placeholders)
- introText: A personalized introduction paragraph mentioning their industry if identifiable (use specific wording, no placeholders)
- challengeText: A paragraph about industry-specific challenges or opportunities with AI (use specific wording, no placeholders)
- callToActionText: Text describing what will be discussed in a discovery call (use specific wording, no placeholders)
- industry: The identified industry or business type

IMPORTANT FORMATTING RULES:
1. Use plain text only - no markdown formatting whatsoever
2. Do not wrap your response in triple backticks
3. Do not use asterisks or underscores for emphasis
4. Do not include any HTML tags
5. Do not include any placeholders like [industry] or [specific area] - use actual specific content
6. The response should be a clean JSON object only
EOF
    )
    ollama run "$model" -p "$prompt" > "test-results/llm/${model//[:]/_}_${domain}.json"
  done
done
