import os
import sys
from dotenv import load_dotenv
import google.generativeai as genai

# Ensure proper encoding for output
sys.stdout.reconfigure(encoding='utf-8')

# Load environment variables
load_dotenv()

# Configure the API key
genai.configure(api_key=os.getenv("GENAI_API_KEY"))

# Get Pokémon name from command-line argument
pokemon_name = sys.argv[1] if len(sys.argv) > 1 else "Unknown"

# Prepare the prompt with explicit instruction for plain text
prompt = f"Provide a brief description of the Pokémon {pokemon_name}. Use only standard ASCII characters and avoid any special symbols or accented characters."

try:
    # Method 1: Try the current API (gemini-flash)
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(
        prompt,
        generation_config=genai.types.GenerationConfig(
            temperature=0.7,
            max_output_tokens=300,
        )
    )
    # Print the generated description with encoding handling
    output_text = response.text.encode('ascii', 'ignore').decode('ascii')
    print(output_text)
    
except Exception as e:
    print(f"Modern API failed: {e}")
    
    # Method 2: Try legacy text generation (for older versions)
    try:
        response = genai.generate_text(
            model="models/text-bison-001",
            prompt=prompt,
            temperature=0.7,
            max_output_tokens=300
        )
        output_text = response.result.encode('ascii', 'ignore').decode('ascii')
        print(output_text)
        
    except Exception as e2:
        print(f"Legacy API also failed: {e2}")
        
        # Method 3: Try even older palm API structure
        try:
            import google.ai.generativelanguage as glm
            import google.generativeai as genai
            
            defaults = {
                'model': 'models/text-bison-001',
                'temperature': 0.7,
                'candidate_count': 1,
                'max_output_tokens': 300,
            }
            
            response = genai.generate_text(**defaults, prompt=prompt)
            output_text = response.result.encode('ascii', 'ignore').decode('ascii')
            print(output_text)
            
        except Exception as e3:
            print(f"All methods failed. Error: {e3}")
            print("Please update google-generativeai: pip install --upgrade google-generativeai")