# Import every model here so SQLAlchemy knows about all tables.
from app.models.brand import Brand
from app.models.bike import Bike
from app.models.user import User

__all__ = ["Brand", "Bike", "User"]