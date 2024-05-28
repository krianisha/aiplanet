# main.py
"""
this file contains the main application code for the FastAPI application.
"""
import os
import fitz
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile, Depends
from database import engine, get_db
import database
import models
from fastapi.middleware.cors import CORSMiddleware
from pdf_question_answering import process_uploaded_pdf, analyze_question_and_context, generate_response, llm

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PDFMetadata(BaseModel):
    filename: str
    # pdf_id: int

models.Base.metadata.create_all(bind=engine)

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...), db: database.SessionLocal = Depends(get_db)):
    file_path = f"C:/Users/enwin/Enwin Code/PDF_application/uploads/{file.filename}"
    with open(file_path, "wb") as pdf_file:
        pdf_file.write(file.file.read())

    pdf_metadata = {"filename": file.filename}
    
    # Store document metadata in the database
    db_pdf = models.PDFDocument(**pdf_metadata)
    db.add(db_pdf)
    db.commit()
    db.refresh(db_pdf)

    return {"message": "PDF uploaded successfully", "metadata": pdf_metadata}

@app.post("/ask-question/")
async def ask_question(data: dict):
    question = data.get('question')
    pdf_metadata = PDFMetadata(**data.get('pdf_metadata'))
    print(pdf_metadata)
    file_path = f"C:/Users/enwin/Enwin Code/PDF_application/uploads/{pdf_metadata.filename}"
    context = process_uploaded_pdf(file_path)
    relevant_info = analyze_question_and_context(question, context)
    prompt = f"Here is some relevant information from the PDF: {relevant_info}. Based on this and the context of our conversation, answer the user's question: {question}"
    response = generate_response(llm, [prompt])
    return {"answer": response}
