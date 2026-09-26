from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.sql import func

from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    
    # Roles are assigned by the Auth service; registration always creates innovators.
    role = Column(String(50), default="innovator", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    consent_given_at = Column(DateTime(timezone=True), nullable=True)