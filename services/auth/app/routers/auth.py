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
