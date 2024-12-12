# f"""Create a comprehensive and detailed study plan for {subject}. Please structure your response as follows:

# 1. COURSE OVERVIEW
#    - Main objectives and learning goals
#    - Prerequisites (if any)
#    - Estimated total duration
#    - Required materials and resources

# 2. DETAILED TOPIC BREAKDOWN
#    - List all major topics and subtopics
#    - Specify the importance and complexity of each topic
#    - Recommended time allocation for each topic

# 3. WEEKLY STUDY SCHEDULE
#    Week 1:
#    - Detailed daily breakdown of topics
#    - Specific learning activities
#    - Practice exercises and assignments
#    - Time allocation per activity
#    [Continue this format for subsequent weeks]

# 4. STUDY METHODS AND STRATEGIES
#    - Recommended learning techniques for each topic
#    - Practice exercises and problem-solving approaches
#    - Note-taking strategies
#    - Memory retention techniques
#    - Self-assessment methods

# 5. LEARNING RESOURCES
#    For each topic, provide:
#    - Recommended textbooks (with chapters/sections)
#    - Online courses and tutorials
#    - Video lectures and demonstrations
#    - Practice websites and tools
#    - Additional reference materials

# 6. PROGRESS TRACKING
#    - Milestones and checkpoints
#    - Assessment criteria
#    - Practice tests and quizzes
#    - Project ideas and practical applications

# 7. SUPPLEMENTARY MATERIALS
#    - Additional reading materials
#    - Interactive tools and software
#    - Community resources and study groups
#    - Expert blogs and forums

# Please provide specific details, examples, and practical tips for each section. Include time estimates and difficulty levels where appropriate."""


from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
from PyPDF2 import PdfReader

app = Flask(__name__)
CORS(app)

API_KEY = "AIzaSyBnRrXAScEIdhc_IkHgKgkNw96n8XXn8xk"
API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

def extract_text_from_pdf(pdf_file):
    try:
        reader = PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return None


def get_study_plan(subject, context):
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
    }

    data = {
        "contents": [{
            "parts": [{
                "text": f"Create a detailed study plan for {subject}. Please include topics, methods, timeline and reference material links for each part. Here is the context: {context}"
            }]
        }]
    }

    try:
        response = requests.post(API_URL, headers=headers, json=data)
        response.raise_for_status()

        result = response.json()

        if ("candidates" in result and
            len(result["candidates"]) > 0 and
            "content" in result["candidates"][0] and
            "parts" in result["candidates"][0]["content"] and
            len(result["candidates"][0]["content"]["parts"]) > 0):
            return result["candidates"][0]["content"]["parts"][0]["text"]
        else:
            return "Sorry, I couldn't generate a study plan at the moment. Please try again."

    except requests.exceptions.RequestException as e:
        return "Sorry, there was an error generating the study plan. Please try again later."
    except json.JSONDecodeError as e:
        return "Sorry, there was an error processing the response. Please try again later."

@app.route('/api/generate-study-plan', methods=['POST'])
def generate_study_plan():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'PDF file is required'}), 400

        pdf_file = request.files['file']
        subject = request.form.get('subject', '')

        if not subject:
            return jsonify({'error': 'Subject is required'}), 400

        # Extract text from PDF
        extracted_text = extract_text_from_pdf(pdf_file)
        if not extracted_text:
            return jsonify({'error': 'Unable to extract text from PDF'}), 400

        # Generate study plan based on the extracted text
        plan = get_study_plan(subject, extracted_text)

        return jsonify({'study_plan': plan}), 200

    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'An internal server error occurred.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
