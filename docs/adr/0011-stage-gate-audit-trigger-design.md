# 11. Stage-Gate Audit Trigger (Design Note, Not Yet Implemented)

## Status
Proposed — design note only, no implementation before the hackathon.

## Context
`current_stage` on `Projects` and the append-only `StageGateHistory` table
are currently enforced only by application logic in the Core Service
(the state machine in `docs/architecture/stage_gate_state.md`). Nothing
at the database level stops a future second write path — a script, a
different service, a manual DB edit — from setting `current_stage` to
an invalid value or skipping a stage without a matching
`StageGateHistory` row.

## Decision (proposed, for post-hackathon or if time allows)
Add a PostgreSQL trigger on `Projects` that:
1. Rejects any `UPDATE` to `current_stage` that isn't one of the five
   valid forward transitions defined in the state diagram.
2. On a valid transition, automatically inserts the corresponding
   `StageGateHistory` row rather than relying on the application to
   do so in a separate statement — closing the gap where a partial
   failure could update the stage without logging it.

## Consequences
- Pro: stage-gate integrity holds even if application code has a bug
  or a new write path is added later.
- Con: business logic split across the app layer and the database is
  harder to reason about and test; adds real implementation time that
  competes with feature work during the hackathon.

## Hackathon scope
Not required for TRL 3 — the state machine enforced in the Core
Service is sufficient to demonstrate the concept. Documented here so
it can be mentioned as an identified hardening step in the pitch deck
without spending build time on it.
