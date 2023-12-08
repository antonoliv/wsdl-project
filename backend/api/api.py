"""
Retrieve endpoints
"""

from fastapi import APIRouter, FastAPI
from api.endpoints import cities
from api.endpoints import sites

api_router = APIRouter()

api_router.include_router(cities.router)
api_router.include_router(sites.router)


app = FastAPI()
app.include_router(api_router)