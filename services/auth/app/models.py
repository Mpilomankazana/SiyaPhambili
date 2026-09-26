"""
SQLAlchemy models for the Auth Service.

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
    created_at = Column(DateTime(timezone=True), server_default=func.now())