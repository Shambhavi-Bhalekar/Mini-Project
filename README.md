# 🏥 MediMitra – AI-Powered Healthcare Platform

MediMitra is a full-stack healthcare web application that integrates AI-based tumor detection with hospital management features. The platform enables patients to upload medical scans for automated tumor segmentation and risk analysis, while providing appointment booking, chatbot assistance, and health record management.

> Built to demonstrate full-stack development, machine learning integration, and REST-based microservice architecture.

---

## 📌 Problem Statement

Early tumor detection and medication verification are critical in healthcare, yet manual diagnosis can be time-consuming and prone to delays.

MediMitra aims to:
- Assist doctors with AI-based tumor segmentation
- Provide patients with actionable risk insights
- Enable fully digital appointment management
- Offer chatbot-based assistance and support

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS |
| **ML Backend** | Python, FastAPI, PyTorch |
| **AI Model** | U-Net (Biomedical Image Segmentation) |
| **Image Processing** | OpenCV, NumPy |

---

## 🧠 AI Model – Tumor Detection

### Model: U-Net (CNN for Image Segmentation)

**Why U-Net?**
- Designed specifically for biomedical image segmentation
- Captures both contextual and spatial information via encoder-decoder architecture
- Performs well with limited annotated medical datasets

### Inference Pipeline

```
Image Upload → Preprocessing (resize, normalize) → U-Net Inference
    → Segmentation Mask → Heatmap Overlay → Risk Classification
```

**Input:** MRI / CT scan image  
**Output:** Segmented tumor region, heatmap visualization, risk classification result

---

## ✨ Core Features

### 🔬 AI Tumor Detection
- Upload MRI/CT scan images
- Automated tumor segmentation using U-Net
- Heatmap visualization of affected regions
- Risk level classification output

### 📅 Doctor Appointment Booking
- Smart availability-based scheduling
- Booking confirmation and follow-up reminders

### 🤖 AI Chatbot Assistant
- Personalized medical guidance responses
- Escalation pathway to doctor consultation

### 💊 Prescription & Risk Verification
- AI-based prescription analysis
- Cross-referencing with patient risk factors

### 👥 Community Support Platform
- Patient interaction space
- Q&A support system

---

## 🏗 System Architecture

```
User (Browser)
     ↓
Next.js Frontend (Port 3000)
     ↓  REST API
Python ML Backend (FastAPI/Flask)
     ↓
U-Net Model Inference
     ↓
Segmentation + Risk Analysis Response
```

---

## 📂 Project Structure

```
Mini-Project/
│
├── backend/
│   ├── models/              # Saved ML model weights
│   ├── inference.py         # Inference pipeline
│   ├── unet_wrapper.py      # U-Net model integration
│   ├── main.py              # API entry point
│   └── requirements.txt     # Python dependencies
│
└── src/
    ├── app/                 # Next.js App Router pages
    ├── components/          # Reusable UI components
    ├── hooks/               # Custom React hooks
    ├── lib/                 # Utility functions
    └── types/               # TypeScript type definitions
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone <your-repo-link>
cd Mini-Project
```

### 2. Frontend Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Backend Setup

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python main.py
```

---

## 🌟 Learning Outcomes

- Practical implementation of U-Net architecture for medical image segmentation
- REST-based ML microservice design and integration
- Frontend–backend communication across a full-stack application
- Medical image preprocessing techniques (normalization, mask generation, heatmap overlay)
- Debugging and resolving real-world ML deployment issues

---

## 📜 License

This project is developed for educational and research purposes.
