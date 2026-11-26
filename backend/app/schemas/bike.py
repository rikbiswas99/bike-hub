"""Schemas = the shape of the data the API sends back (Pydantic)."""
from typing import Optional

from pydantic import BaseModel, ConfigDict


class BrandOut(BaseModel):
    id: int
    name: str
    country: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class BikeOut(BaseModel):
    id: int
    name: str
    category: str
    engine_cc: Optional[int] = None
    power_bhp: Optional[float] = None
    torque_nm: Optional[float] = None
    mileage_kmpl: Optional[float] = None
    top_speed_kmph: Optional[int] = None
    weight_kg: Optional[int] = None
    fuel_tank_litres: Optional[float] = None
    price_inr: Optional[int] = None
    image_url: Optional[str] = None
    brand: BrandOut

    model_config = ConfigDict(from_attributes=True)