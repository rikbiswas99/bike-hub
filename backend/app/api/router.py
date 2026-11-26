"""Collects all route files in one place."""
from fastapi import APIRouter

from app.api.routes import bikes, health

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(bikes.router)
# Later phases: auth, listings, recommendations...