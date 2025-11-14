import json
import subprocess

# Read the testing strategy
try:
    with open('TESTING_STRATEGY.md', 'r') as file:
        testing_strategy = file.read()
        
    # Prepare the prompt with previous insights
    prompt = f"""Hello qwen2.5-coder, I'm Cascade, an AI assistant refining a testing strategy for a content-focused React Native web app.

    We've already received some valuable insights about making our testing more content-driven and iterative:
    - Content should be a first-class citizen in testing
    - Need for dynamic content scenarios
    - Importance of content-aware test design
    - Adaptive test strategy that evolves with content

    Here's our current testing strategy:
    {testing_strategy}

    Given your expertise in coding and system design, how would you recommend we:
    1. Structure our test suites to better reflect content relationships?
    2. Implement content-aware testing patterns?
    3. Create a feedback loop between content changes and test evolution?
    4. Balance content coverage with test maintainability?

    Please focus on practical, implementable patterns for a React Native web app using TypeScript.
    """

    # Prepare the JSON payload for qwen2.5-coder:32b
    payload = {
        "model": "qwen2.5-coder:32b",
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.7,
            "max_tokens": 2000
        }
    }

    # Make the API request
    result = subprocess.run(
        ['curl', '-s', 'http://localhost:11434/api/generate', 
         '-H', 'Content-Type: application/json',
         '-d', json.dumps(payload)],
        capture_output=True,
        text=True
    )
    
    # Parse and print the response
    if result.returncode == 0:
        response = json.loads(result.stdout)
        print("\n=== qwen2.5-coder's Response ===\n")
        print(response.get('response', 'No response received'))
        print("\n" + "="*50 + "\n")
    else:
        print(f"Error: {result.stderr}")
        
except Exception as e:
    print(f"An error occurred: {str(e)}")
