# SiyaPhambili — "We Move Forward"

A Civic Innovation Bridge Platform for South Africa, built for **Geekulcha Annual Hackathon 2026 (#GKHack26#GKHack26)** Gov Innovation Platform challenge.

## Prototype

https://siya-phambili-prototype.onrender.com

## The Problem

South Africa doesn't have an innovation problem it has an implementation problem. Hackathons across the country produce genuinely strong prototypes every year, but almost all of them disappear the moment prize money is handed out. There's no public registry of what's been built, no mechanism connecting a winning solution to the government department that actually needs it, and no accountability for whether stated interest ever turns into real deployment.

## What We're Building

SiyaPhambili starts as a public, searchable registry of South African hackathon solutions filterable by sector, technology, and stage populated from day one with real data, including this year's #GKHack26 cohort. From there, it adds a stage-gate tracking pipeline (**Idea → Prototype → Pilot → Scale → Implemented**) so government departments, universities, and sponsors can discover relevant solutions, and the public can hold institutions accountable for following through.

## Tech Stack

**Frontend**

- React (Single Page Application)
- Tailwind CSS v4 (Utility-first Component Styling)

**Backend Microservices & Gateway**
...

**Backend Microservices & Gateway**

- Nginx (API Gateway & Reverse Proxy)
- Python / FastAPI (Isolated Auth & Core Services)
- SQLAlchemy & Alembic (ORM & Migrations)

**Database & Infrastructure**

- PostgreSQL (Relational Database)
- Docker & Docker Compose (Container Orchestration)

**Testing**

- Pytest (Backend Unit & Integration Testing)
- Cypress (Frontend & E2E Acceptance Testing)

**DevOps & Hosting**

- Render (Cloud Hosting)
- GitHub Actions (CI/CD Pipelines)
- Makefile (Task Automation)

## Prerequisites

Before starting development, ensure all team members have the following installed:

- Git & Git Bash
- Docker Desktop (Configured for WSL 2 on Windows)
- Python 3.14.4
- Node.js LTS (Includes npm)

## Documentation

For a deep dive into our architecture and technical decisions, please review our documentation:

- **`ROADMAP.md`:** The project execution roadmap and task tracking.
- **`ARCHITECTURE.md`:** The complete repository directory tree and microservice boundaries.
- **`docs/adr/`:** Architecture Decision Records (ADRs) detailing our technical choices.
- **`docs/architecture/`:** C4 Model system visualizations mapping our containers and components.
- **`docs/api/`:** API contracts defining the frontend, gateway, and backend integrations.
- **`docs/popia-notes.md`:** POPIA compliance — data collected, consent, retention.
- **`docs/ip-and-user-protection-notes.md`:** How submitted solutions and their owners are protected — and what that protection doesn't cover.
- **`SECURITY.md`:** Platform/account security — auth, transport, secrets, scanning.

## Local Development Setup

1. Copy `.env.example` to `.env` and replace the placeholder passwords and JWT secret.
2. Start the services with `docker compose up --build -d`.
3. Compose runs each service's migrations after PostgreSQL is healthy. Seed the demo super-admin, official, innovator, sectors, and public projects:

   ```bash
   make seed
   ```

The seed script requires `DEMO_USER_PASSWORD` to be set to at least 12 characters. The demo accounts are `admin@siyaphambili.org`, `official@siyaphambili.org`, and `innovator@siyaphambili.org`; all use that configured password. Do not use the example values outside local development. `make migrate` safely reapplies both services' additive migrations without resetting existing data. Auth preserves its existing `alembic_version` history (and repairs the previously missing consent column); Core uses a separate `core_alembic_version` table because both services share PostgreSQL.

## Note: `prototype/` vs `frontend/`

The repo currently contains two frontend lineages:

- **`prototype/`** — a pre-existing Create React App / UXPin export, retained as visual/product reference only.
- **`frontend/`** — the active Vite + React application, wired to the real API through the Nginx gateway.

The production application remains `frontend/`; `prototype/` is not deployed as a competing frontend.

## Team: Fantastic 4

- Mpilo -> *Backend*
- Musa -> *Backend*
- Lerato -> *Infrastructure && Database*
- Anele -> *Frontend*
- Tlhompho -> *Full-Stack Engineer*

## Status

In active development for #GKHack26 (25–27 September 2026, Centurion). Follow this repo for progress.

## License

MIT
