from fastapi import FastAPI
import os
from services.classifier import predict_discipline
from services.extractor import extract_text
from api.upload import router as upload_router
from services.redactor import find_sensitive_info
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="PatternPulse AI API",
    description="AI-Powered Construction Drawing Classification & Secure PDF Redaction",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("outputs", exist_ok=True)
os.makedirs("outputs/redacted_pdfs", exist_ok=True)
app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

@app.get("/")
def home():
    return {
        "message": "Welcome to PatternPulse AI Backend"
    }
@app.get("/test-classifier")
def test_classifier():

    text = extract_text("sample.pdf")

    prediction = predict_discipline(text)

    return {
        "prediction": prediction
    }    
@app.get("/test-redaction")
def test_redaction():

    text = extract_text("sample.pdf")

    sensitive = find_sensitive_info(text)

    return sensitive

app.include_router(upload_router)