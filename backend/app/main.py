
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for BIKE-HUB: bike recommendations and used bike marketplace.",
    version="0.1.0",
)

# CORS: lets the React website (port 5173) call this API (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/", tags=["Root"])
def root():
    return {"message": "Welcome to BIKE-HUB API. Visit /docs for documentation."}
