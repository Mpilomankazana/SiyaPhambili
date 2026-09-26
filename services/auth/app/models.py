from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from .database import Base

<<<<<<< Updated upstream
TODO (Day 1 — ROADMAP.md Phase 3):
- Users table: id (uuid), email (unique), password_hash, role
  ("innovator" | "official" | "super_admin"), created_at
See docs/architecture/erd.md for the target schema.
"""
class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False, default="innovator")
=======
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    
    # Defaulting to 'innovator'. Other roles: 'official', 'admin'
    role = Column(String(50), default="innovator", nullable=False)
    
    # Automatically records the timestamp when the row is created
>>>>>>> Stashed changes
    created_at = Column(DateTime(timezone=True), server_default=func.now())