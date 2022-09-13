from fastapi import APIRouter

from . import companies
from . import deals
from . import views

backend_router = APIRouter()
backend_router.include_router(companies.router, tags=["companies"])
backend_router.include_router(deals.router, tags=["deals"])
backend_router.include_router(views.router, tags=["views"])
