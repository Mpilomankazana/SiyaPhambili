"""
Password hashing and JWT helpers, shared by the Auth Service's own
endpoints and (via the same JWT_SECRET_KEY) verifiable by the Core
Service on protected routes.

TODO (Day 1 — ROADMAP.md Phase 3):
- hash_password / verify_password (passlib bcrypt context)
- create_access_token / decode_access_token (python-jose)
  using JWT_SECRET_KEY / JWT_ALGORITHM / JWT_EXPIRY_MINUTES from env.
"""
import os

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-me-before-the-hackathon")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRY_MINUTES = int(os.getenv("JWT_EXPIRY_MINUTES", "60"))
