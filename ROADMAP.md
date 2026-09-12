# Siya-Phambili — Project Execution Roadmap

This roadmap tracks all technical tasks required to build, test, and deploy the **SiyaPhambili** civic innovation platform for #GKHack26. Team members can mark items complete by updating `[ ]` to `[x]`.

---

## Phase 0: Local Environment & Tooling Verification

- [ ]  `[All]` Install and verify Git and Git Bash
- [ ]  `[All]` Install Docker Desktop and enable WSL 2 engine integration
- [ ]  `[All]` Install Python 3.14.4 and verify environment PATH configurations
- [ ]  `[All]` Install Node.js LTS (includes npm)
- [ ]  `[All]` Configure code editor (VS Code / IntelliJ) with dependency vulnerability checking and code health tools

---

## Phase 1: Architecture Realignment & Taskboard Setup

- [X]  `[Architecture]` Update `ARCHITECTURE.md` to reflect microservices architecture (API Gateway, Auth Service, Core Service)
- [X]  `[Architecture]` Update `README.md` with revised service boundaries and prerequisites
- [X]  `[Architecture]` Update `docs/api/api-contracts.md` to include Auth endpoints (`/auth/register`, `/auth/login`) routed through Gateway
- [ ]  `[Architecture]` Configure GitHub Projects Kanban board columns: Backlog, To Do, In Progress, Review, Done
- [X]  `[Architecture]` Establish repository issue labels: `frontend`, `auth-service`, `core-service`, `gateway`, `infra`, `P1-must`, `P2-should`, `P3-could`, `testing`

---

## Phase 2: Infrastructure & Gateway Scaffolding

- [X]  `[Infra]` Create base directory layout (`services/auth/`, `services/core/`, `gateway/`, `frontend/`)
- [X]  `[Infra]` Configure Nginx API Gateway (`gateway/nginx.conf`) for reverse proxy routing:
  - [X]  `[Infra]` Route `/api/v1/auth/*` to Auth Service
  - [X]  `[Infra]` Route `/api/v1/projects/*` and `/api/v1/stages/*` to Core Service
- [ ]  `[Infra]` Configure root `docker-compose.yml` orchestrating PostgreSQL, Auth Service, Core Service, Gateway, and Frontend
- [X]  `[Infra]` Create root `Makefile` with centralized build, run, and test targets
- [ ]  `[Testing]` Setup dedicated test database container configuration for automated integration test runs
- [ ]  `[Infra]` Setup GitHub Actions workflow to run linting, Pytest suites, and Cypress tests on every pull request

---

## Phase 3: Core MVP Development (P1 — Must-Have)

### Backend — Auth Service (`services/auth/`)

- [ ]  `[Infra]` Initialize FastAPI application and setup `Dockerfile`
- [ ]  `[Database]` Implement SQLAlchemy user model with hashed password persistence
- [ ]  `[Backend]` Implement user registration endpoint (`POST /api/v1/auth/register`)
- [ ]  `[Backend]` Implement user login endpoint (`POST /api/v1/auth/login`) with JWT token generation
- [ ]  `[Backend]` Create JWT validation dependency for inter-service token verification
- [ ]  **Auth Unit Tests:**
  - [ ]  `[Testing]` Test password hashing and verification functions
  - [ ]  `[Testing]` Test JWT encoding, decoding, and expiration logic
  - [ ]  `[Testing]` Test Pydantic request/response payload validation
- [ ]  **Auth Integration Tests:**
  - [ ]  `[Testing]` Test `/register` endpoint against test PostgreSQL database
  - [ ]  `[Testing]` Test `/login` endpoint credential validation and database lookups

### Backend — Core Registry & Stage-Gate Service (`services/core/`)

- [ ]  `[Infra]` Initialize FastAPI application and setup `Dockerfile`
- [ ]  `[Database]` Configure SQLAlchemy models: Project, Sector, StageGateHistory
- [ ]  `[Database]` Setup Alembic migrations for core relational schemas
- [ ]  `[Backend]` Implement project listing endpoint (`GET /api/v1/projects`)
- [ ]  `[Backend]` Implement project registration endpoint (`POST /api/v1/projects`)
- [ ]  `[Backend]` Implement stage transition endpoint (`PUT /api/v1/projects/{id}/stage`) enforcing stage-gate pipeline rules
- [ ]  **Core Service Unit Tests:**
  - [ ]  `[Testing]` Test stage-gate transition state machine logic (Idea → Prototype → Pilot → Scale → Implemented)
  - [ ]  `[Testing]` Test Pydantic schemas for project creation and stage updates
- [ ]  **Core Service Integration Tests:**
  - [ ]  `[Testing]` Test project persistence and querying against test database
  - [ ]  `[Testing]` Test stage-gate update endpoint with database audit logging

### Frontend — React Client (`frontend/`)

- [ ]  `[Infra]` Initialize React Single Page Application and setup `Dockerfile`
- [ ]  `[Frontend]` Install and configure Material-UI component theme
- [ ]  `[Frontend]` Create `AuthContext` to manage local JWT storage and authentication state
- [ ]  `[Frontend]` Build Public Registry view (listing submitted hackathon projects)
- [ ]  `[Frontend]` Build Project Submission form (metadata, problem statement, team info)
- [ ]  `[Frontend]` Build Stage-Gate status tracking component
- [ ]  **Frontend Unit Tests:**
  - [ ]  `[Testing]` Test component rendering for registry project cards
  - [ ]  `[Testing]` Test stage-gate status indicator visual states

---

## Phase 4: Integration, Gateway Routing, & Usability (P2 — Should-Have)

- [ ]  `[Frontend]` Connect React frontend Axios client to Nginx Gateway endpoints
- [ ]  **Gateway Integration Tests:**
  - [ ]  `[Testing]` Test Nginx reverse-proxy routing for `/api/v1/auth` and `/api/v1/projects`
  - [ ]  `[Testing]` Verify CORS headers and token forwarding through Gateway
- [ ]  **Admin Dashboard & Role Management:**
  - [ ]  `[Frontend]` Build React Admin view (accessible strictly to `super_admin` role)
  - [ ]  `[Frontend]` Implement UI data grid to view registered users and toggle permissions (Innovator / Official)
  - [ ]  `[Backend]` Create FastAPI endpoint (`PUT /api/v1/auth/users/{id}/role`) to securely update user roles
- [ ]  `[Frontend]` Implement role-based UI controls (restricting stage advancement to authenticated officials)
- [ ]  `[Frontend]` Add search and multi-parameter filtering (by sector, stage, and tech stack) to the registry
- [ ]  `[Frontend]` Add verification note inputs and approval timestamps to stage-gate transitions
- [ ]  `[Frontend]` Implement toast notifications and error handling for network requests

---

## Phase 5: Polish & Social Authentication (P3 — Could-Have)

- [ ]  `[Backend]` Configure OAuth developer credentials for GitHub and Google
- [ ]  `[Backend]` Implement OAuth redirect and callback routes in Auth Service
- [ ]  `[Frontend]` Add "Sign in with GitHub" and "Sign in with Google" buttons to React UI
- [ ]  `[Frontend]` Build visual audit timeline component showing complete stage transition history
- [ ]  `[Database]` Add sample/seed data script populating real hackathon prototypes for live demo
- [ ]  `[Testing]` **Social Auth Tests:** Unit test OAuth callback parsing and token issuance

---

## Phase 6: System Integration, E2E Testing, & Cloud Deployment

- [ ]  `[Testing]` **Full Integration Suite:** Run end-to-end integration tests across all microservices and database
- [ ]  **Cypress Acceptance Tests (E2E):**
  - [ ]  `[Testing]` Test complete user registration and login user journey
  - [ ]  `[Testing]` Test project submission and appearance on the public registry
  - [ ]  `[Testing]` Test official login and stage-gate advancement flow
  - [ ]  `[Testing]` Test error states (e.g., unauthorized access attempts, malformed inputs)
- [ ]  `[Infra]` Configure PostgreSQL database on Render
- [ ]  `[Infra]` Deploy Gateway, Microservices, and Frontend containers to Render
- [ ]  `[Testing]` Conduct live production smoke test on Render URLs
