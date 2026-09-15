# SiyaPhambili — Security Notes (Working Draft)

Living document tracking security decisions and known gaps. Useful
both as an engineering reference and as source material for the
pitch deck's architecture section — judges notice teams that can
name their own trade-offs.

## Authentication & authorization

- Passwords hashed with bcrypt (`passlib`) — never stored or logged
  in plaintext (`services/auth/app/core/security.py`).
- JWTs signed with a shared `JWT_SECRET_KEY` (HS256). Both services
  read the *same* secret from `.env` — the Gateway does not validate
  tokens itself, so `core-service` independently verifies every
  protected request (see `docs/architecture/network_diagram.md`).
- Role checks (`innovator` / `official` / `super_admin`) must be
  enforced **server-side** on every protected endpoint, not just
  hidden in the UI — e.g. `PUT /projects/{id}/stage` re-checks the
  caller's role from the verified JWT, it does not trust a role field
  sent by the client.
- Access tokens are short-lived (`JWT_EXPIRY_MINUTES=60` by default).
  No refresh-token flow yet — acceptable for a demo, a known gap for
  production.

## Transport & edge protections (`gateway/nginx.conf`)

- CORS restricted to the known frontend origin (not `*`).
- Security headers on every response: `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Content-Security-Policy`,
  `Strict-Transport-Security` (the last one only bites once served
  over HTTPS — Render provides this on deploy).
- Rate limiting on `/api/v1/auth/*` (5 req/s per IP, burst 10) to
  slow down credential-stuffing / brute-force login attempts.

## Data layer

- SQLAlchemy ORM only — no raw string-interpolated SQL, so standard
  SQL injection is not a live risk (ADR 0003/0008).
- `StageGateHistory` gives an append-only audit trail of who
  authorized each stage transition.
- State-machine transition rules are enforced in `core-service`
  application code; see `docs/adr/0011-stage-gate-audit-trigger-design.md`
  for a proposed DB-level backstop, not built (not required for TRL 3).

## Secrets management

- `.env` is gitignored; only `.env.example` (placeholder values) is
  committed.
- `JWT_SECRET_KEY` in `.env.example` is a placeholder — **generate a
  real random value before the hackathon** (e.g. `openssl rand -hex 32`)
  and never commit the real one.
- CI runs `gitleaks` on every PR to catch a committed secret before
  it reaches `main`.

## Dependency & code scanning (CI)

- `pip-audit` — flags known CVEs in pinned Python dependencies.
- `npm audit` — same, for the frontend.
- `bandit` — static analysis of our own Python code (not deps) for
  common issues (hardcoded secrets, unsafe deserialization, etc).
- All three are currently permissive (`|| true`) so CI stays green
  against the empty scaffolding — tighten to hard-fail once real code
  lands during the hackathon.

## Containers

- All three custom images (`auth-service`, `core-service`, `frontend`)
  run as a non-root user, not container-default root.

## Explicitly out of scope for the hackathon build

- Refresh tokens / token revocation list.
- Multi-factor authentication.
- Web Application Firewall in front of the Gateway.
- Penetration testing — self-assessed only.
- Full dependency SBOM generation.

These are reasonable follow-ups to name in the pitch deck as
"identified, not yet built" — that reads as maturity, not as a gap
you're hiding.
