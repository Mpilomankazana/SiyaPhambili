"""
Core Service routes — Registry & Stage-Gate.

TODO (Day 2 — ROADMAP.md Phase 3):
- GET  /projects                (registry listing, filterable)
- POST /projects                (submit a new solution)
- PUT  /projects/{id}/stage     (advance stage, official/super_admin only)
See docs/api/api-contracts.md for exact payloads and status codes,
and docs/architecture/stage_gate_state.md for the allowed transitions.
"""
from fastapi import APIRouter

router = APIRouter()
