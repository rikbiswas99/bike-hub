from sqlalchemy import Column, DateTime, Integer, String, func

from app.core.database import Base


class User(Base):
    """Table: users (people who register on BIKE-HUB)"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)  # never the real password
    created_at = Column(DateTime, server_default=func.now())