"""
This module contains the main functions for processing PDFs and generating responses to questions.
"""
from langchain.llms import OpenAI  
import spacy
import en_core_web_sm
import PyPDF2  

# Replace with your OpenAI API key
openai_api_key = "OPENAI_API_KEY"
model_name = "gpt-3.5-turbo-0125"  # Choose appropriate model (consider limitations)

llm = OpenAI(
    api_key=openai_api_key,
    model_name=model_name
)
# nlp = spacy.load("en_core_web_sm")
nlp = en_core_web_sm.load()
conversation_context = {}

def preprocess_text(text):
    """
    This function performs cleaning steps like removing stop words, punctuation, etc.
    """
    doc = nlp(text)
    cleaned_text = " ".join([token.text.lower() for token in doc if not token.is_stop])
    return cleaned_text


def process_uploaded_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as f:
            pdf_reader = PyPDF2.PdfReader(f)
            pdf_text = ""
            for page in pdf_reader.pages:
                pdf_text += page.extract_text()
        preprocessed_text = pdf_text  
        preprocessed_text = preprocess_text(preprocessed_text)  
        conversation_context["pdf_content"] = preprocessed_text  

        return conversation_context["pdf_content"]
    except FileNotFoundError:
        print("Error: PDF file not found.")
        return None
    
def extract_relevant_info(question, pdf_content):
    """
    This function uses spaCy for advanced NLP techniques to extract relevant information from the context (PDF content).
    """
    # Load spaCy English model
    nlp = spacy.load("en_core_web_sm")

    # Process the PDF content using spaCy
    doc = nlp(pdf_content)

    # Lowercase the question for case-insensitive matching
    question = question.lower()
    # Extract named entities from the question
     # Split keywords from the question
    keywords = question.split()
    question_entities = [keyword for keyword in keywords]
    print(question_entities)
    # Identify relevant sentences based on named entities
    relevant_sentences = []
    # print(doc.sents)
    for sentence in doc.sents:
        if any(entity in sentence.text.lower() for entity in question_entities):
            relevant_sentences.append(sentence.text)

    # Return a string concatenating the relevant sentences (or an empty string if none found)
    return ". ".join(relevant_sentences)


def analyze_question_and_context(question, context):
    """
    This function analyzes the question and context to identify relevant information.
    - highlighting sections of the PDF most relevant to the question.
    """
    relevant_info = extract_relevant_info(question, context)
    return relevant_info


def generate_response(llm_model, prompt):
    response = llm_model.generate(
        prompts=prompt,
        max_tokens=1024,  # maximum response length
        n=1,
        stop=None,
        temperature=0.7  # Controls response randomness (0 - deterministic, 1 - random)
    )
    response = response.generations[0]
    response = response[0].text
    return response
