"""
Pydantic request/response schemas for the Core Service.

TODO (Day 1/2 — ROADMAP.md Phase 3):
- ProjectCreateRequest (title, sector_id, problem_statement,
  license_type, license_note, contact_required, visibility) —
  validate license_note is only accepted when license_type == "Other"
- ProjectSummaryResponse (public/list fields only — no problem_statement)
- ProjectDetailResponse (adds problem_statement — owner/official only)
- StageTransitionRequest / StageTransitionResponse
- ContactRequestCreate / ContactRequestResponse
See docs/api/api-contracts.md for exact payload shapes and
docs/ip-and-user-protection-notes.md for the summary-vs-detail split.
"""
