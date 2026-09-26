import uuid

from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    
    # Defaulting to 'innovator'. Other roles: 'official', 'admin'
    role = Column(String(50), default="innovator", nullable=False)
    
    # Automatically records the timestamp when the row is created
    created_at = Column(DateTime(timezone=True), server_default=func.now())