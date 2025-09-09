from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pydantic import BaseModel
from datetime import datetime
import os

FORECAST_DIR = 'modeling StockAI/forecast_result/'

app = FastAPI()

class ForecastRequest(BaseModel):
    stock: str
    startDate: str
    endDate: str  # FastAPI/Pydantic automatically parses ISO format

# Aktifkan CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # atau ["http://localhost:3000"] biar lebih aman
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSV sekali saat startup
df = pd.read_csv("stocks_with_names.csv")

@app.get("/stocks")
def get_all_stocks():
    return df.to_dict(orient="records")

@app.post("/forecast")
def get_forecast(request: ForecastRequest):
    stock = request.stock.upper()
    file_path = os.path.join(FORECAST_DIR, f"{stock}_forecast.csv")

    # Load CSV
    df = pd.read_csv(file_path, parse_dates=["timestamp"])

    # Filter by date range
    start_date = pd.to_datetime(request.startDate)
    end_date = pd.to_datetime(request.endDate)
    result = df[(df["timestamp"] >= start_date) & (df["timestamp"] <= end_date)]

    # Format timestamp to YYYY-MM-DD
    result["timestamp"] = result["timestamp"].dt.strftime("%Y-%m-%d")

    # Return JSON
    return {
        "stock": stock,
        "forecast": result.to_dict(orient="records")
    }
