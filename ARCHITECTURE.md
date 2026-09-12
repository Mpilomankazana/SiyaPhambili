# SiyaPhambili — Architecture

This document outlines the strict directory structure and file organization for the SiyaPhambili microservices repository. It serves as the single source of truth for the development team during the hackathon.

## Directory Tree

```text
siyaphambili/
├── docs/                        # Project documentation
│   ├── adr/                     # Architecture Decision Records
│   ├── api/api-contracts.md     # REST API payloads and endpoints
│   └── architecture/            # System architecture diagrams
├── gateway/                     # Nginx API Gateway (Reverse Proxy)
│   ├── nginx.conf               # Routing definitions and CORS
│   └── Dockerfile               # Container configuration for Gateway
├── frontend/                    # React Single Page Application
│   ├── public/                  # Public static assets
│   ├── src/                     # Source code for React
│   │   ├── assets/              # Images and global stylesheets
│   │   ├── components/          # Reusable UI elements
│   │   ├── contexts/            # Global state management (JWT Auth)
│   │   ├── pages/               # Main route views
│   │   ├── services/            # Axios/Fetch API client functions
│   │   ├── App.jsx              # Main React router configuration
│   │   └── main.jsx             # React DOM entry point
│   ├── package.json             # Node.js dependencies
│   ├── vite.config.js           # Vite bundler configuration
│   └── Dockerfile               # Container configuration for Frontend
├── services/                    # Backend Microservices
│   ├── auth/                    # Authentication Service
│   │   ├── app/                 # Auth application code
│   │   │   ├── core/            # Password hashing and JWT logic
│   │   │   ├── routers/         # Login and registration endpoints
│   │   │   ├── database.py      # PostgreSQL connection setup
│   │   │   ├── models.py        # SQLAlchemy Users table schema
│   │   │   ├── schemas.py       # Pydantic data validation models
│   │   │   └── main.py          # FastAPI application instance
│   │   ├── tests/               # Pytest unit tests for Auth
│   │   ├── requirements.txt     # Python dependencies for Auth
│   │   └── Dockerfile           # Container configuration for Auth
│   └── core/                    # Core Registry Service
│       ├── app/                 # Core application code
│       │   ├── routers/         # Projects and stages endpoints
│       │   ├── database.py      # PostgreSQL connection setup
│       │   ├── models.py        # SQLAlchemy Projects tables
│       │   ├── schemas.py       # Pydantic data validation models
│       │   └── main.py          # FastAPI application instance
│       ├── tests/               # Pytest unit tests for Core
│       ├── alembic/             # Database migration configurations
│       ├── requirements.txt     # Python dependencies for Core
│       └── Dockerfile           # Container configuration for Core
├── .github/                     # GitHub configurations
│   └── workflows/               # CI/CD automation pipelines
│       └── ci.yml               # Linting and testing workflow
├── docker-compose.yml           # Multi-container orchestration
├── Makefile                     # Task automation commands
├── ROADMAP.md                   # Project execution tracker
├── ARCHITECTURE.md              # This repository architecture file
└── README.md                    # Main setup instructions
```
