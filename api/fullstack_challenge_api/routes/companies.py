from fastapi import APIRouter, Depends
from fullstack_challenge_api.utils.db import get_db
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date

router = APIRouter()

Base = declarative_base()

class Company(Base):
    __tablename__ = 'companies'

    id = Column(Integer, primary_key=True)
    name = Column(String, primary_key=False, nullable=False)
    country = Column(String, primary_key=False, nullable=True)
    founding_date = Column(Date, primary_key=False, nullable=True)
    description = Column(String, primary_key=False, nullable=True)

    def __repr__(self):
        return f'Name {self.name}'


@router.get("/api/companies")
async def get_companies(db: Session = Depends(get_db)):
    q = db.query(Company).all()
    return q
