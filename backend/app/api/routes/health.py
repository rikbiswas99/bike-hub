from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("")
def health_check():
    """Simple check: is the server running?"""
    return {"status": "ok", "app": settings.APP_NAME}


@router.get("/db")
def database_check(db: Session = Depends(get_db)):
    """Extra check: can the server talk to PostgreSQL?"""
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception:
        return {"status": "error", "database": "not connected"}
