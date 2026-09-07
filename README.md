# SiyaPhambili — "We Move Forward"

A Civic Innovation Bridge Platform for South Africa, built for **Geekulcha Annual Hackathon 2026 (#GKHack26)** Gov Innovation Platform challenge.

## Prototype
https://siya-phambili-prototype.onrender.com


## The Problem

South Africa doesn't have an innovation problem it has an implementation problem. Hackathons across the country produce genuinely strong prototypes every year, but almost all of them disappear the moment prize money is handed out. There's no public registry of what's been built, no mechanism connecting a winning solution to the government department that actually needs it, and no accountability for whether stated interest ever turns into real deployment.

## What We're Building

SiyaPhambili starts as a public, searchable registry of South African hackathon solutions filterable by sector, technology, and stage populated from day one with real data, including this year's #GKHack26 cohort. From there, it adds a stage-gate tracking pipeline (**Idea → Prototype → Pilot → Scale → Implemented**) so government departments, universities, and sponsors can discover relevant solutions, and the public can hold institutions accountable for following through.

## Tech Stack

**Frontend**
- React (Single Page Application)
- Material-UI (Component Library)
- Cypress (Acceptance Testing)

**Backend**
- Python (FastAPI)
- SQLAlchemy & Alembic (ORM & Migrations)

**Infrastructure & Database**
- PostgreSQL (Relational Database)
- Docker & Docker Compose (Containerization)

**DevOps & Hosting**
- Render (Cloud Hosting)
- GitHub Actions (CI/CD Pipelines)
- Makefile (Task Automation)

## Documentation

For a deep dive into our architecture and technical decisions, please review our documentation:
- **`ARCHITECTURE.md`:** The complete repository directory tree and structural boundaries.
- **`docs/adr/`:** Architecture Decision Records (ADRs) detailing our technical choices.
- **`docs/architecture/`:** C4 Model system visualizations mapping our containers and components.
- **`docs/api/`:** API contracts defining the frontend and backend integration.

## Local Development Setup

*(Instructions for Docker and Makefile will be added here as we scaffold the codebase.)*

## Team — Fantastic_Four

- Mpilo
- Lerato
- Musa
- Anele
- Tlhompho

## Status

In active development for #GKHack26 (25–27 September 2026, Centurion). Follow this repo for progress.

## License

MIT