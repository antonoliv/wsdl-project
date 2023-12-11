"""
Retrieve endpoints
"""

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.endpoints import cities
from api.endpoints import sites

api_router = APIRouter()

api_router.include_router(cities.router)
api_router.include_router(sites.router)


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)