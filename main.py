from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import os

MODEL_PATH = os.path.join("models", "best_random_forest_model.pkl")
model = joblib.load(MODEL_PATH)

# Defining input schema
class HeartDiseaseRiskInput(BaseModel):
    Age: float
    Sex: float
    Cp: float
    Trestbps: float
    Chol: float
    Fbs: float
    Restecg: float
    Thalach: float
    Restecg: float
    Exang: float
    Oldpeak: float
    Slope: float
    Ca: float
    Thal: float

# Create FastAPI app
app = FastAPI(title="Heart Disease Risk Prediction API")

# 👇 Add CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Heart Disease Risk Prediction API is running"}

@app.post("/predict")
def predict(data: HeartDiseaseRiskInput):
    features = np.array([[
        data.Age,
        data.Sex,
        data.Cp,
        data.Trestbps,
        data.Chol,
        data.Fbs,
        data.Restecg,
        data.Thalach,
        data.Exang,
        data.Oldpeak,
        data.Slope,
        data.Ca,
        data.Thal
    ]])
    
    prediction = model.predict(features)[0]
    return {"prediction": int(prediction)}
