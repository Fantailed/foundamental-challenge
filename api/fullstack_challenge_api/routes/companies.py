from fastapi import APIRouter, Depends
from fullstack_challenge_api.utils.db import get_db
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Text
from typing import Optional
from pydantic import BaseModel
import datetime

router = APIRouter()

Base = declarative_base()


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), primary_key=False, nullable=True)
    country = Column(String(255), primary_key=False, nullable=True)
    founding_date = Column(DateTime, primary_key=False, nullable=True)
    description = Column(Text, primary_key=False, nullable=True)

    def __repr__(self):
        return f"Name {self.name}"


class PatchCompanyRequest(BaseModel):
    id: int
    name: Optional[str] = None
    description: Optional[str] = None
    country: Optional[str] = None
    founding_date: Optional[datetime.datetime] = None


@router.get("/api/companies")
async def get_companies(db: Session = Depends(get_db)):
    q = db.query(Company).all()
    return q


@router.patch("/api/companies")
async def update_item(companyPatch: PatchCompanyRequest, db: Session = Depends(get_db)):
    company_entry = db.query(Company).filter(Company.id == companyPatch.id)

    if not company_entry.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f'There is no existing company with {id}; patch not possible.')
    company_entry = company_entry.first()

    for attr, value in companyPatch.dict().items():
        # Uncomment this to avoid being able to unset values
        # if value:
        setattr(company_entry, attr, value)

    db.commit()
    return {"code": "success", "message": "Company edited."}
