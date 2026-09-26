from passlib.context import CryptContext
import os

from datetime import datetime, timedelta, timezone
from jose import JWTError,jwt

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

if not JWT_SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY must be set")

JWT_EXPIRY_MINUTES = int(os.getenv("JWT_EXPIRY_MINUTES", "60"))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)



def hash_password(password:str):
    return pwd_context.hash(password)

def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)

def create_access_token(data: dict, expires_delt: timedelta | None = None) -> str:
    to_encode = data.copy()

    if expires_delt:
        expire =datetime.now(timezone.utc) + expires_delt
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=JWT_EXPIRY_MINUTES)

    to_encode["exp"] = expire
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

def decode_access_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
    except JWTError:
        return None

def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    payload = decode_access_token(token)

    if payload is None or not payload.get("sub"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers={"www-Authenticate": "Bearer"})
    return payload
