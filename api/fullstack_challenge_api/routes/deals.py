import datetime
from fastapi import APIRouter, Depends
from fullstack_challenge_api.utils.db import get_db
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Float, DateTime, String
from typing import Optional
from pydantic import BaseModel
from fastapi.exceptions import HTTPException

router = APIRouter()

Base = declarative_base()


class Deal(Base):
    __tablename__ = "deals"

    id = Column(Integer, primary_key=True)
    date = Column(DateTime, primary_key=False, nullable=True)
    funding_amount = Column(Float, primary_key=False, nullable=True)
    funding_round = Column(String(255), primary_key=False, nullable=True)
    company_id = Column(Integer, primary_key=False, nullable=True)

    def __repr__(self):
        return f"ID {self.id}"


class PatchDealRequest(BaseModel):
    id: int
    date: Optional[datetime.datetime]
    funding_amount: Optional[float]
    funding_round: Optional[str]
    company_id: Optional[int]


@router.get("/api/deals")
async def get_deals(db: Session = Depends(get_db)):
    q = db.query(Deal).all()
    return q


# TODO: Refactor to function to avoid code duplication
@router.patch("/api/deals")
async def update_item(dealPatch: PatchDealRequest, db: Session = Depends(get_db)):
    print("Patch request came in:", dealPatch)
    deal_entry = db.query(Deal).filter(Deal.id == dealPatch.id)

    if not deal_entry.first():
        raise HTTPException(
            status_code=404,
            detail=f"There is no existing deal with ID={dealPatch.id}; patch not possible.",
        )
    deal_entry = deal_entry.first()

    for attr, value in dealPatch.dict(exclude_unset=True).items():
        setattr(deal_entry, attr, value)

    db.commit()
    return {"code": "success", "message": "Deal edited."}
