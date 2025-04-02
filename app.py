from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
from pydantic import BaseModel

# Load trained model and scaler
model = tf.keras.models.load_model("student_performance_model.h5")
scaler = joblib.load("scaler.pkl")

# Define FastAPI app
app = FastAPI()

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to ["http://localhost:5173"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define expected input data format
class StudentData(BaseModel):
    G1: int
    G2: int
    age: int
    Medu: int
    Fedu: int
    studytime: int
    failures: int
    freetime: int
    goout: int
    Dalc: int
    Walc: int
    health: int
    absences: int

# API Route for predicting student performance
@app.post("/predict")
def predict_performance(student: StudentData):
    # Convert input to DataFrame
    student_data = pd.DataFrame([student.dict()])
    
    # Normalize input
    student_scaled = scaler.transform(student_data)
    
    # Predict G3 score
    prediction = model.predict(student_scaled)
    
    return {"Predicted Final Grade (G3)": round(prediction[0][0])}

# Root endpoint
@app.get("/")
def home():
    return {"message": "Welcome to the Student Performance Prediction API!"}
