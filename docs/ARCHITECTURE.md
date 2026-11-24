# Architecture (Phase 1)

Browser (React, port 5173) --Axios--> FastAPI (port 8000, /api/v1) --SQLAlchemy--> PostgreSQL

Backend layers (filled in later phases):
- `api/routes/` : URL endpoints
- `schemas/`    : Pydantic data shapes (what goes in/out)
- `models/`     : SQLAlchemy tables
- `services/`   : business logic
- `ml/`         : recommendation model
