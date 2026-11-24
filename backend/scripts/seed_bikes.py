"""Adds SAMPLE bikes (approximate values, for learning only).
Run from the backend folder:  python -m scripts.seed_bikes
Safe to run again: it only adds what is missing."""
from app.core.database import SessionLocal
from app.models import Bike, Brand

BRANDS = [
    ("Honda", "Japan"), ("Yamaha", "Japan"), ("Royal Enfield", "India"),
    ("Bajaj", "India"), ("TVS", "India"), ("KTM", "Austria"),
]

# (brand, name, category, cc, bhp, torque, mileage, top speed, weight, tank, price)
BIKES = [
    ("Honda", "Shine 125", "Commuter", 124, 10.7, 11.0, 55, 100, 114, 10.5, 85000),
    ("Honda", "Unicorn", "Commuter", 162, 12.7, 14.6, 50, 105, 138, 13.0, 112000),
    ("Yamaha", "FZ-S V3", "Sport", 149, 12.4, 13.3, 45, 115, 136, 13.0, 125000),
    ("Yamaha", "R15 V4", "Sport", 155, 18.4, 14.2, 40, 140, 142, 11.0, 185000),
    ("Royal Enfield", "Classic 350", "Cruiser", 349, 20.2, 27.0, 35, 114, 195, 13.0, 195000),
    ("Royal Enfield", "Himalayan 450", "Adventure", 452, 39.5, 40.0, 30, 150, 196, 17.0, 285000),
    ("Bajaj", "Pulsar 150", "Sport", 149, 14.0, 13.25, 47, 115, 144, 15.0, 115000),
    ("Bajaj", "Platina 110", "Commuter", 115, 8.6, 9.8, 70, 90, 117, 11.0, 70000),
    ("TVS", "Apache RTR 160 4V", "Sport", 160, 17.4, 14.8, 42, 118, 145, 12.0, 125000),
    ("KTM", "Duke 200", "Sport", 199, 25.0, 19.3, 35, 135, 159, 13.4, 200000),
]


def main():
    db = SessionLocal()
    try:
        # Brands: add only the ones that are missing
        brand_map = {}
        new_brands = 0
        for name, country in BRANDS:
            brand = db.query(Brand).filter_by(name=name).first()
            if brand is None:
                brand = Brand(name=name, country=country)
                db.add(brand)
                new_brands += 1
            brand_map[name] = brand
        db.flush()  # gives new brands their ids

        # Bikes: add only the ones that are missing
        new_bikes = 0
        for (brand, name, cat, cc, bhp, tq, mil, top, wt, tank, price) in BIKES:
            exists = (
                db.query(Bike)
                .filter_by(name=name, brand_id=brand_map[brand].id)
                .first()
            )
            if exists:
                continue
            db.add(Bike(
                brand_id=brand_map[brand].id, name=name, category=cat,
                engine_cc=cc, power_bhp=bhp, torque_nm=tq, mileage_kmpl=mil,
                top_speed_kmph=top, weight_kg=wt, fuel_tank_litres=tank,
                price_inr=price,
            ))
            new_bikes += 1

        db.commit()
        print(f"Added {new_bikes} bikes and {new_brands} brands.")
        print(f"Total in database: {db.query(Brand).count()} brands, {db.query(Bike).count()} bikes.")
    finally:
        db.close()


if __name__ == "__main__":
    main()