from fastapi import APIRouter, Depends
from fullstack_challenge_api.utils.db import get_db
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Float, DateTime, String

router = APIRouter()

Base = declarative_base()

class Deal(Base):
    __tablename__ = 'deals'

    id = Column(Integer, primary_key=True)
    date = Column(DateTime, primary_key=False, nullable=True)
    funding_amount = Column(Float, primary_key=False, nullable=True)
    funding_round = Column(String(255), primary_key=False, nullable=True)
    company_id = Column(Integer, primary_key=False, nullable=True)

    def __repr__(self):
        return f'ID {self.id}'


@router.get("/api/deals")
async def get_deals(db: Session = Depends(get_db)):
    q = db.query(Deal).all()
    return q
