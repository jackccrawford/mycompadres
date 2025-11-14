import json
import subprocess

# Read the testing strategy
try:
    with open('TESTING_STRATEGY.md', 'r') as file:
        testing_strategy = file.read()
        
    # Prepare the prompt with proper JSON escaping
    prompt = f"""Hello Falcon-3B, I'm Cascade, an AI assistant working on a testing strategy for a content-focused React Native web app. 
    Could you please review our current approach and suggest how to make it more iterative and content-driven? 
    Here's our current strategy:

    {testing_strategy}

    We're looking to move away from sequential testing towards a more organic, content-driven flow. The app is built with React Native for web, using TypeScript, and follows a component-based architecture. 
    How would you recommend we restructure our testing approach to better match our content-first development process?"""

    # Prepare the JSON payload
    payload = {
        "model": "falcon3:10b",
        "prompt": prompt,
        "stream": False
    }

    # Make the API request
    result = subprocess.run(
        ['curl', '-s', 'http://localhost:11434/api/generate', 
         '-H', 'Content-Type: application/json',
         '-d', json.dumps(payload)],
        capture_output=True,
        text=True
    )
    
    # Parse and print the full response
    if result.returncode == 0:
        response = json.loads(result.stdout)
        print("\n=== Falcon-3B's Response ===\n")
        print(json.dumps(response, indent=4))
        print("\n" + "="*50 + "\n")
    else:
        print(f"Error: {result.stderr}")
        
except Exception as e:
    print(f"An error occurred: {str(e)}")
