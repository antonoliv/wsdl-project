"""
Touristic Sites Endpoints
"""


from fastapi import APIRouter, status
import queries.site
from typing import List

router = APIRouter()

@router.get("/sites", response_model=List[dict], status_code=status.HTTP_200_OK)
def get_sites():
    sites = queries.site.get_sites()
    return sites

@router.get("/site/{id}", response_model=dict, status_code=status.HTTP_200_OK)
def get_sites(id: str):
    details = queries.site.get_site_details(id)
    print(details)
    return details

@router.post("/search-sites", response_model=List[dict], status_code=status.HTTP_200_OK)
def search_sites(query: dict):
    sites = queries.site.search_sites(query)
    return sites

