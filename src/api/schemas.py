from pydantic import BaseModel
from typing import List


class URLRequest(BaseModel):
    url: str

class FeatureImpact(BaseModel):

    feature: str
    impact: float

class PredictionResponse(BaseModel):

    url: str
    prediction: str
    probability: float
    risk_level: str
    top_features: List[FeatureImpact]