import uuid

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text, Uuid
from sqlalchemy.sql import func

from .database import Base


class Sector(Base):
    __tablename__ = "sectors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    # Auth owns users; Core stores the verified JWT subject without a cross-service FK.
    user_id = Column(String(36), nullable=False, index=True)
    sector_id = Column(Integer, ForeignKey("sectors.id"), nullable=False)
    title = Column(String(255), nullable=False)
    problem_statement = Column(Text, nullable=False)
    current_stage = Column(String(50), default="Idea", nullable=False)
    license_type = Column(String(50), default="Other", nullable=False)
    license_note = Column(Text, nullable=True)
    contact_required = Column(Boolean, default=False, nullable=False)
    visibility = Column(String(30), default="public", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class StageGateHistory(Base):
    __tablename__ = "stage_gate_history"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(Uuid(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    updated_by = Column(String(36), nullable=False)
    previous_stage = Column(String(50), nullable=False)
    new_stage = Column(String(50), nullable=False)
    verification_notes = Column(Text, nullable=True)
    transitioned_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class ContactRequest(Base):
    __tablename__ = "contact_requests"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(Uuid(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    requested_by = Column(String(36), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(20), default="pending", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)