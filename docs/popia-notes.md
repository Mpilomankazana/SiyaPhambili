# SiyaPhambili — POPIA Compliance Notes (Working Draft)

This is a working draft to support the platform's POPIA-compliance claim
in the pitch deck. It is not legal advice — have a mentor or the team's
most policy-literate member sanity-check it before the demo.

## Data we collect

| Field | Where | Purpose |
|---|---|---|
| Email | `Users.email` | Login identifier, account recovery |
| Password (hashed) | `Users.password_hash` | Authentication — never stored or transmitted in plaintext |
| Role | `Users.role` | Access control (innovator / official / super_admin) |
| Project details | `Projects.*` | The registry itself — title, sector, problem statement |
| Verification notes | `StageGateHistory.verification_notes` | Accountability trail for stage-gate approvals |

## Lawful basis

Processing is based on **consent** (the user actively registers and
submits a project) and, for officials, **legitimate interest** in
tracking public-sector accountability for civic innovation adoption.

## Consent capture

- Add a `consent_given_at` timestamp to `Users`, set at registration,
  alongside a checkbox on the registration form describing what the
  platform does with submitted data.
- See `docs/architecture/erd.md` and `docs/api/api-contracts.md` for
  the corresponding schema/API note.

## Data minimization

- Only email + password are collected at registration — no phone
  numbers, ID numbers, or physical addresses unless a future feature
  explicitly requires them.
- Project submissions collect only what's needed to populate the
  public registry (title, sector, problem statement, team info).

## Retention & erasure

- TODO before the hackathon ends: decide a retention period (e.g.
  "for the duration of the pilot programme plus 12 months") and state
  it in the UI's consent copy.
- TODO: a documented process (even a manual one, e.g. "email
  privacy@siyaphambili.org") for a user to request account/data
  deletion — full self-service erasure is a stretch goal, not a TRL 3
  requirement, but the *process* should exist and be stated.

## What's explicitly out of scope for the hackathon build

- Encryption at rest beyond what Render/Postgres provide by default.
- A dedicated data protection officer workflow.
- Cross-border data transfer assessments (all infra is in one Render
  region for the demo).
