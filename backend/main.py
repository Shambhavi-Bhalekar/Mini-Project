# backend/main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from inference import predict_from_pil
from PIL import Image
import io

app = FastAPI(title="Brain Tumor Segmentation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict in production
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    pil_img = Image.open(io.BytesIO(contents)).convert("RGB")
    result = predict_from_pil(pil_img)
    # result = { "before": datauri, "after": datauri }
    return result
