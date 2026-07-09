from fastapi import APIRouter, UploadFile, File
import shutil
from pathlib import Path
from services.classifier import predict_discipline
from services.redactor import find_sensitive_info
from services.pdf_redactor import redact_pdf
from uuid import uuid4

from services.extractor import extract_text

router = APIRouter()

UPLOAD_FOLDER = Path("uploads")
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    # Save uploaded PDF
    file_path = UPLOAD_FOLDER / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from uploaded PDF
    extracted_text = extract_text(file_path)

    # Predict discipline
    prediction, confidence = predict_discipline(extracted_text)

    # Find sensitive information
    sensitive = find_sensitive_info(extracted_text)

    # Merge all detected sensitive values into one list
    words_to_redact = []

    for values in sensitive.values():
        words_to_redact.extend(values)

    # Create output folder
    OUTPUT_FOLDER = Path("outputs/redacted_pdfs")
    OUTPUT_FOLDER.mkdir(parents=True, exist_ok=True)

    # Path for redacted PDF
    redacted_file = OUTPUT_FOLDER / f"{uuid4().hex}_{file.filename}"

    # Redact the PDF
    redact_pdf(file_path, redacted_file, words_to_redact)    

    return {
    "message": "Processing completed successfully!",
    "filename": file.filename,
    "discipline": prediction,
    "confidence": f"{confidence}%",
    "detected_sensitive_info": sensitive,
    "redacted_pdf": str(redacted_file)
}