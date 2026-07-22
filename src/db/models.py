from sqlalchemy import Column, Integer, String, Float,DateTime
from src.db.database import Base
from datetime import datetime

class ScanHistory(Base):

    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)

    url = Column(String, nullable=False)

    prediction = Column(String, nullable=False)

    probability = Column(Float, nullable=False)

    risk_level = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)