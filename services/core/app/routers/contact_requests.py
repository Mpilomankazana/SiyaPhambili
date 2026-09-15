"""
Contact-request routes — lets an official/sponsor ask to be introduced
to a project's team WITHOUT the platform ever exposing the innovator's
raw email address. The innovator sees the request and chooses whether
to respond.

TODO (Day 2/3 — see docs/ip-and-user-protection-notes.md):
- POST /projects/{id}/contact-requests   (official/super_admin only)
- GET  /projects/{id}/contact-requests   (project owner only)
"""
from fastapi import APIRouter

router = APIRouter()
