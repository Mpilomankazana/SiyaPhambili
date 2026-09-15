"""
JWT verification for protected Core Service routes.

IMPORTANT: JWT_SECRET_KEY and JWT_ALGORITHM here MUST match the values
used by the Auth Service (services/auth/app/core/security.py) — the
Gateway does not validate tokens itself, so each service verifies
independently. Keep both in sync via the shared .env file.

TODO (Day 1 — ROADMAP.md Phase 3):
- decode_and_verify_token(token) -> payload (raises 401 on failure)
- get_current_user / require_role("official") FastAPI dependencies
"""
import os

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-me-before-the-hackathon")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
