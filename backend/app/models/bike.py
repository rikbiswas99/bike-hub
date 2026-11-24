from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.orm import relationship

from app.core.database import Base


class Bike(Base):
    __tablename__ = "bikes"

    id = Column(Integer, primary_key=True, index=True)
    brand_id = Column(Integer, ForeignKey("brands.id"), nullable=False)
    name = Column(String(100), nullable=False)
    category = Column(String(30), nullable=False)
    engine_cc = Column(Integer)
    power_bhp = Column(Float)
    torque_nm = Column(Float)
    mileage_kmpl = Column(Float)
    top_speed_kmph = Column(Integer)
    weight_kg = Column(Integer)
    fuel_tank_litres = Column(Float)
    price_inr = Column(Integer)
    image_url = Column(String(300))
    created_at = Column(DateTime, server_default=func.now())

    brand = relationship("Brand", back_populates="bikes")