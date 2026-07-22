from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from src.api.schemas import URLRequest, PredictionResponse
from src.services.predictor import PhishingPredictor
from src.db.database import SessionLocal
from src.db.models import ScanHistory

from typing import Optional


app = FastAPI(
    title="PhishHook API",
    version="2.0"
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

predictor = PhishingPredictor("models/xgb_model.pkl")

@app.get("/")
def health():
    return {"status": "healthy"}

@app.post("/scan-url", response_model=PredictionResponse)
def scan_url(
    request: URLRequest,
    db: Session = Depends(get_db)
):
    if not request.url.startswith("http"):
        raise HTTPException(
            status_code=400,
            detail="Invalid URL format"
        )

    result = predictor.predict(request.url)

    if result["prediction"] == "error":
        raise HTTPException(
            status_code=500,
            detail="Prediction failed"
        )

    scan = ScanHistory(
        url=request.url,
        prediction=result["prediction"],
        probability=result["probability"],
        risk_level=result["risk_level"]
    )

    db.add(scan)
    db.commit()
    db.refresh(scan)

    return PredictionResponse(
        url=request.url,
        prediction=result["prediction"],
        probability=result["probability"],
        risk_level=result["risk_level"],
        top_features=result["top_features"]
    )

@app.get("/history")
def get_history(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    risk: Optional[str] = None,
    prediction: Optional[str] = None,
    db: Session = Depends(get_db)
):

    query = db.query(ScanHistory)

    if risk:
        query = query.filter(ScanHistory.risk_level == risk.lower())

    if prediction:  
        query = query.filter(
            ScanHistory.prediction == prediction.lower()
        )

    history = (
        query
        .order_by(ScanHistory.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    return [
        {
            "id": item.id,
            "url": item.url,
            "prediction": item.prediction,
            "probability": item.probability,
            "risk_level": item.risk_level,
            "created_at": item.created_at,
        }
        for item in history
    ]

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "PhishHook API"
    }