from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.core.security import create_access_token, hash_password, verify_password
from app.models import User
from app.schemas import Token, UserCreate, UserOut

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(data: UserCreate, db: Session = Depends(get_db)):
    """Create a new account."""
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="This email is already registered")

    user = User(name=data.name, email=data.email, hashed_password=hash_password(data.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Log in. The form field called 'username' holds the EMAIL."""
    user = db.query(User).filter(User.email == form.username.strip().lower()).first()
    if user is None or not verify_password(form.password, user.hashed_password):
        # Same message for both cases, so nobody can guess which emails exist
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return Token(access_token=create_access_token(user.id))


@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    """Who am I? Works only with a valid token."""
    return current_user