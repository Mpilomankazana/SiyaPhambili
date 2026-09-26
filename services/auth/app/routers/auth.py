"""
Auth Service routes.

TODO (Day 1 — ROADMAP.md Phase 3):
- POST /register
- POST /login
- PUT  /users/{id}/role   (super_admin only)
See docs/api/api-contracts.md for exact payloads and status codes.
"""
from fastapi import APIRouter

router = APIRouter()
new_user = User(
    id=uuid.uuid4(),
    email=payload.email,
    password_hash=hash_password(payload.password),
    name=payload.name,
    role="innovator"
)