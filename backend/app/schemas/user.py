"""Shapes of the data for users and login tokens."""
import re
from datetime import datetime

from pydantic import BaseModel, ConfigDict, field_validator

EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class UserCreate(BaseModel):
    """Data we accept when someone registers."""
    name: str
    email: str
    password: str

    @field_validator("name")
    @classmethod
    def check_name(cls, value):
        value = value.strip()
        if len(value) < 2:
            raise ValueError("Name must be at least 2 characters")
        return value

    @field_validator("email")
    @classmethod
    def check_email(cls, value):
        value = value.strip().lower()
        if not EMAIL_PATTERN.match(value):
            raise ValueError("Enter a valid email address")
        return value

    @field_validator("password")
    @classmethod
    def check_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters")
        if len(value.encode("utf-8")) > 72:  # bcrypt can only use the first 72 bytes
            raise ValueError("Password is too long (maximum 72 characters)")
        return value


class UserOut(BaseModel):
    """Data we send back. It never includes the password."""
    id: int
    name: str
    email: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"