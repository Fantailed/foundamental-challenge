from fastapi import APIRouter, Depends
from fullstack_challenge_api.utils.db import get_db
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Float, DateTime, String

from .companies import Company
from .deals import Deal

router = APIRouter()


@router.get("/api/company_deals")
async def get_company_deals(db: Session = Depends(get_db)):
    q = db.query(Deal.id, Deal.date, Deal.funding_amount, Deal.funding_round, Company.name).join(Deal, Company.id == Deal.company_id).all()

    return q
