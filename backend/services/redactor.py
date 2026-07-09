import re

def find_sensitive_info(text):

    patterns = {
        "email": r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        "phone": r"\b\d{10}\b",
        "aadhaar": r"\b\d{4}\s?\d{4}\s?\d{4}\b",
        "pan": r"\b[A-Z]{5}[0-9]{4}[A-Z]\b",
    }

    results = {}

    for key, pattern in patterns.items():
        results[key] = re.findall(pattern, text)

    return results