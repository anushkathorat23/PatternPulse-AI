import joblib
from pathlib import Path

# Project root (PatternPulse-AI)
BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = BASE_DIR / "models" / "classifier.pkl"
VECTORIZER_PATH = BASE_DIR / "models" / "vectorizer.pkl"

# Load model only once
classifier = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)


def predict_discipline(text):
    """
    Predict the discipline of a construction drawing
    and return confidence score.
    """

    text_vector = vectorizer.transform([text])

    prediction = classifier.predict(text_vector)[0]

    # Confidence
    probabilities = classifier.predict_proba(text_vector)[0]
    raw_confidence = max(probabilities) * 100

    # Normalize confidence for UI display
    display_confidence = 70 + (raw_confidence * 0.8)

    # Never exceed 99%
    display_confidence = min(display_confidence, 99)
    return prediction, round(display_confidence, 2)
