from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models import Bike, Brand
from app.schemas import BikeOut, BrandOut

router = APIRouter(tags=["Bikes"])


@router.get("/bikes", response_model=List[BikeOut])
def list_bikes(
    brand: Optional[str] = Query(None, description="Brand name, e.g. Honda"),
    category: Optional[str] = Query(None, description="e.g. Sport, Commuter"),
    min_price: Optional[int] = Query(None, ge=0),
    max_price: Optional[int] = Query(None, ge=0),
    search: Optional[str] = Query(None, description="Part of the bike name"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """List bikes. All filters are optional and can be combined."""
    query = db.query(Bike).options(joinedload(Bike.brand)).join(Brand)

    if brand:
        query = query.filter(Brand.name.ilike(brand))
    if category:
        query = query.filter(Bike.category.ilike(category))
    if min_price is not None:
        query = query.filter(Bike.price_inr >= min_price)
    if max_price is not None:
        query = query.filter(Bike.price_inr <= max_price)
    if search:
        query = query.filter(Bike.name.ilike(f"%{search}%"))

    return query.order_by(Bike.id).offset(skip).limit(limit).all()


@router.get("/bikes/categories", response_model=List[str])
def list_categories(db: Session = Depends(get_db)):
    """All bike categories (used by the filter dropdown)."""
    rows = db.query(Bike.category).distinct().order_by(Bike.category).all()
    return [r[0] for r in rows]


@router.get("/bikes/{bike_id}", response_model=BikeOut)
def get_bike(bike_id: int, db: Session = Depends(get_db)):
    """Get one bike by its id."""
    bike = (
        db.query(Bike)
        .options(joinedload(Bike.brand))
        .filter(Bike.id == bike_id)
        .first()
    )
    if bike is None:
        raise HTTPException(status_code=404, detail="Bike not found")
    return bike


@router.get("/brands", response_model=List[BrandOut])
def list_brands(db: Session = Depends(get_db)):
    """All brands (used by the filter dropdown)."""
    return db.query(Brand).order_by(Brand.name).all()