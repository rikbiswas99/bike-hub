"""Reads settings from the .env file so we never hard-code secrets."""
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# Always find backend/.env, no matter which folder you run the command from
ENV_FILE = Path(__file__).resolve().parents[2] / ".env"


class Settings(BaseSettings):
    APP_NAME: str = "BIKE-HUB API"
    DEBUG: bool = True
    DATABASE_URL: str = "postgresql+psycopg2://postgres:password@localhost:5432/bikehub"
    SECRET_KEY: str = "change-me"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    CORS_ORIGINS: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=str(ENV_FILE), extra="ignore")

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]


settings = Settings()