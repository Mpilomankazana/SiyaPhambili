"""
SQLAlchemy models for the Core Registry & Stage-Gate Service.

TODO (Day 1 — ROADMAP.md Phase 3):
- Sector: id, name, description
- Project: id (uuid), user_id (fk, owner — never client-supplied),
  sector_id (fk), title, problem_statement, current_stage,
  license_type ("MIT" | "All Rights Reserved" | "Other"),
  license_note (free text, only meaningful when license_type="Other"),
  contact_required (bool, orthogonal to license_type),
  visibility ("public" | "restricted"), created_at
- StageGateHistory: id, project_id (fk), updated_by (fk), previous_stage,
  new_stage, verification_notes, transitioned_at
- ContactRequest: id, project_id (fk), requested_by (fk), message,
  status ("pending" | "accepted" | "declined"), created_at
See docs/architecture/erd.md for the target schema and
docs/ip-and-user-protection-notes.md for why visibility/license_type/
contact_required/ContactRequest exist.
"""
