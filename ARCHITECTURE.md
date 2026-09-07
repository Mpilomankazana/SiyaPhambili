# SiyaPhambili — Repository Architecture

This document outlines the directory structure and file organization for the SiyaPhambili monorepo. It serves as a visual guide for all team members to understand where code, configurations, and documentation reside.

## Directory Tree

```text
siyaphambili/
├── docs/                        # Project documentation
│   ├── adr/                     # Architecture Decision Records (ADRs)
│   ├── api/                     # API contracts and specifications
│   └── architecture/            # System architecture diagrams
├── frontend/                    # React Single Page Application (UI)
│   ├── public/                  # Static assets (images, icons)
│   ├── src/                     # React components, contexts, and API clients
│   ├── cypress/                 # Acceptance testing suites
│   ├── package.json             # Node.js dependencies and frontend scripts
│   └── Dockerfile               # Container configuration for the frontend
├── backend/                     # FastAPI Application (API)
│   ├── app/                     # Core backend logic
│   │   ├── routers/             # API endpoint definitions
│   │   ├── services/            # Business logic and stage-gate rules
│   │   ├── models/              # SQLAlchemy database models
│   │   └── main.py              # FastAPI application entry point
│   ├── tests/                   # Pytest integration testing suites
│   ├── alembic/                 # Database migration scripts
│   ├── requirements.txt         # Python dependencies
│   └── Dockerfile               # Container configuration for the backend
├── .github/                     # GitHub Actions CI/CD workflows
├── docker-compose.yml           # Local infrastructure orchestration (PostgreSQL + Backend + Frontend)
├── Makefile                     # Centralized task automation commands
├── ARCHITECTURE.md              # This file
└── README.md                    # Main project overview and setup instructions
```

## Core Boundaries

*   **Root Level:** Reserved strictly for repository-wide configuration (Docker, Make, Git, CI/CD).
*   **`frontend/`:** Dedicated to the React application. Interacts with the backend exclusively via HTTP requests defined in `docs/api/`.
*   **`backend/`:** Dedicated to the FastAPI service and PostgreSQL database interactions.