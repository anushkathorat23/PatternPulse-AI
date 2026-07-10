# 🚀 PatternPulse AI

> AI-Powered Construction Drawing Classification & Secure PDF Redaction

PatternPulse AI is a full-stack AI application that automatically classifies construction drawing PDFs into their respective disciplines and detects/redacts sensitive information before documents are shared.

## 🌐 Live Demo

**Frontend:** https://pattern-pulse-ai.vercel.app

**Backend API:** https://patternpulse-ai.onrender.com/docs

---

## ✨ Features

- 📄 Upload construction drawing PDFs
- 🤖 AI-powered document classification
- 📊 Confidence score prediction
- 🔍 Sensitive information detection
- 🔒 Automatic PDF redaction
- 📥 Download redacted PDFs
- 👀 Dynamic PDF preview
- 🌐 Fully deployed web application

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- FastAPI
- Python

### Machine Learning
- Scikit-learn
- TF-IDF Vectorizer
- Logistic Regression

### PDF Processing
- PyMuPDF (fitz)
- Regex

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```
PatternPulse-AI
│
├── backend
│   ├── api
│   ├── services
│   ├── utils
│   ├── outputs
│   ├── uploads
│   ├── app.py
│   └── requirements.txt
│
├── frontend
│   ├── index.html
│   ├── upload.html
│   ├── processing.html
│   ├── results.html
│   ├── styles.css
│   └── JavaScript files
│
├── models
│   ├── classifier.pkl
│   └── vectorizer.pkl
│
└── README.md
```

---

## ⚙️ How It Works

1. Upload a construction drawing PDF.
2. Extract text from the document.
3. AI model predicts the discipline.
4. Sensitive information is detected.
5. Sensitive data is redacted.
6. Download the secure redacted PDF.

---

## 🎯 Supported Disciplines

- 🏗 Architectural
- 🏛 Structural
- ⚡ Electrical
- 🚰 Plumbing
- ❄ Mechanical
- 🔥 Fire Protection

---

## 📸 Screenshots

### 🏠 Home Page

![Home](assets/screenshots/home.png)

### 📤 Upload Page

![Upload](assets/screenshots/upload.png)

### ⚙️ Processing Page

![Processing](assets/screenshots/processing.png)

### 📊 Results Page

![Results](assets/screenshots/results.png)

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/anushkathorat23/PatternPulse-AI.git
```

Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
```

Run FastAPI

```bash
uvicorn app:app --reload
```

Open the frontend

```
frontend/index.html
```

---

## 🔮 Future Enhancements

- OCR Support
- User Authentication
- Multi-file Processing
- Dashboard Analytics
- Cloud Storage Integration

---

## 👩‍💻 Developer

**Anushka Thorat**

Computer Engineering Student

GitHub:
https://github.com/anushkathorat23

---

⭐ If you found this project useful, consider giving it a star!
