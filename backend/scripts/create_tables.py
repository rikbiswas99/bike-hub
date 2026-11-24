"""Creates all tables in PostgreSQL.
Run from the backend folder:  python -m scripts.create_tables"""
from sqlalchemy import inspect, text

from app.core.database import Base, engine
from app.models import Bike, Brand  # noqa: F401  (loads the models)


def main():
    # 1. Check the connection first, with a clear message if it fails
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
    except Exception as error:
        print("COULD NOT CONNECT TO THE DATABASE.")
        print("Check DATABASE_URL in backend/.env (user, password, port, database name).")
        print("Details:", str(error).splitlines()[0])
        raise SystemExit(1)

    # 2. Create the tables
    Base.metadata.create_all(bind=engine)
    print("Connected to:", engine.url.render_as_string(hide_password=True))
    print("Tables in database:", ", ".join(sorted(inspect(engine).get_table_names())))


if __name__ == "__main__":
    main()