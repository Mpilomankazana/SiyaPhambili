from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from .database import Base

class Sector(Base):
    __tablename__ = "sectors"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    sector_id = Column(Integer, ForeignKey("sectors.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    problem_statement = Column(Text, nullable=False)
    solution = Column(Text, nullable=False)
    current_stage = Column(String(50), default="Idea", nullable=False)
    visibility = Column(String(50), default="public", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class StageGateHistory(Base):
    __tablename__ = "stage_gate_history"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    changed_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    previous_stage = Column(String(50), nullable=False)
    new_stage = Column(String(50), nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ContactRequest(Base):
    __tablename__ = "contact_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    requester_name = Column(String(255), nullable=False)
    requester_email = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())