"""
Cities Endpoints
"""

from fastapi import APIRouter, status
from typing import List
import queries.city

router = APIRouter()

@router.get("/city/{id}", response_model=dict, status_code=status.HTTP_200_OK)
def get_cities_by_name(id: str):
    cities = queries.city.get_city(id)
    return cities
