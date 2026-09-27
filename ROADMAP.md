# SiyaPhambili — Development Roadmap

> **Project:** SiyaPhambili
> **Architecture:** React + Nginx Gateway + FastAPI Auth/Core Services + PostgreSQL

---

# Milestone 1: Project Strategy & Architecture

## 1. Roadmap Status Legend

Use the following status indicators throughout this document:

* [ ]  **Not Started**

* [~] **In Progress**

* [X]  **Complete**

* [!] **Blocked**
* [>] **Deferred to Post-MVP**

### Priority

* 🔴 **CRITICAL** —
* 🟠 **HIGH** —
* 🟡 **MEDIUM** —
* ⚪ **POST-MVP** —

---

## 2. Hackathon Objective

The objective of the hackathon is **not** to complete the entire long-term SiyaPhambili platform.

The objective is to produce a working vertical slice demonstrating the core value of the platform.

The MVP must demonstrate:

```text
Visitor
   ↓
Browse Innovation Registry
   ↓
View Project
   ↓
Contact Innovator


Innovator
   ↓
Register
   ↓
Login
   ↓
Submit Project
   ↓
View Dashboard


Official
   ↓
Login
   ↓
Review Project
   ↓
Advance Project Stage
   ↓
Stage History Recorded
```

The system should work end-to-end:

```text
React ontendFrontend
       ↓
Nginx API Gateway
       ↓
FastAPI Services
       ↓
PostgreSQL
       ↓
FastAPI Services
       ↓
Nginx
       ↓
React Frontend
```

### MVP Completion Definition

The MVP is considered functionally complete when:

* [X]  🔴 Users can register.
* [X]  🔴 Users can log in.
* [X]  🔴 JWT authentication works.
* [X]  🔴 Roles are enforced.
* [X]  🔴 Users can submit projects.
* [ ]  🔴 Projects are stored in PostgreSQL.
* [X]  🔴 Public users can browse projects.
* [X]  🔴 Users can view project details.
* [X]  🔴 Projects can progress through stage gates.
* [X]  🔴 Stage transitions are recorded.
* [X]  🔴 Users can submit contact requests.
* [X]  🔴 The React frontend consumes the real API.
* [X]  🔴 The complete service stack starts through Compose and the API is reachable through Nginx/Vite.
* [X]  🔴 Demo data seed scripts exist; seeding the current local database is pending `DEMO_USER_PASSWORD` configuration.
* [ ]  🔴 The primary demo journey works without manual database manipulation.

> **Verification note (2026-09-27):** Auth/Core tests, frontend lint/build, Docker image builds, Compose startup, PostgreSQL migrations, and API reads through the gateway and both Vite ports (5173/5174) have been verified. Runtime inspection found and fixed the missing `users.consent_given_at` column, missing Core `email-validator` dependency in the old image, `localhost:5174` CORS/proxy mismatch, and `/health` being shadowed by the Core `/{project_id}` route. The local stack currently has sectors but no demo users/projects because `DEMO_USER_PASSWORD` is absent; the complete register→submit→review→contact browser flow remains unverified.

---

## 3. Hackathon Scope Freeze

During the MVP phase:

* [ ]  🔴 Freeze the core architecture.
* [ ]  🔴 Do not introduce additional microservices.
* [ ]  🔴 Do not redesign the database unnecessarily.
* [ ]  🔴 Do not replace the existing frontend technology.
* [ ]  🔴 Do not introduce Kubernetes.
* [ ]  🔴 Do not build advanced notification infrastructure.
* [ ]  🔴 Do not build enterprise IAM.
* [ ]  🔴 Do not spend significant time polishing documentation before the MVP works.
* [ ]  🔴 Do not add features simply because they are listed in the long-term roadmap.

### Rule

> **If a feature does not directly contribute to the three core user journeys, it should not interrupt the MVP critical path.**

---

## 4. MVP Architecture

### Target Architecture

```text
                    ┌──────────────────────┐
                    │   React Frontend     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Nginx Gateway     │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
           ┌────────────────┐     ┌────────────────┐
           │  Auth Service  │     │  Core Service  │
           │    FastAPI     │     │    FastAPI     │
           └───────┬────────┘     └────────┬───────┘
                   │                       │
                   └───────────┬───────────┘
                               ▼
                       ┌───────────────┐
                       │  PostgreSQL   │
                       └───────────────┘
```

### Architecture Tasks

* [X]  🔴 Verify Docker Compose starts all required services.
* [X]  🔴 Verify Auth Service starts.
* [X]  🔴 Verify Core Service starts.
* [X]  🔴 Verify PostgreSQL starts.
* [X]  🔴 Verify Nginx starts.
* [X]  🔴 Verify frontend starts.
* [X]  🔴 Verify Nginx routes `/api/v1/auth/*` correctly.
* [X]  🔴 Verify Nginx routes `/api/v1/projects/*` correctly.
* [X]  🔴 Verify frontend communicates through the gateway.
* [X]  🟠 Remove unnecessary architecture blockers.

* [>] ⚪ Additional microservices.

### MVP Architecture Principle

The existing two-service architecture is sufficient:

```text
Auth Service
    ├── User
    ├── Registration
    └── Authentication

Core Service
    ├── Sectors
    ├── Projects
    ├── Stage Gates
    └── Contact Requests
```

Do not add more services during the hackathon.

---

# Milestone 2: Database & Backend MVP

## 5. Database MVP

The MVP requires only five core entities.

```text
Users
   │
   ├───────────────┐
   │               │
   ▼               ▼
Projects      Contact Requests
   │
   ├───────────────► Stage Gate History
   │
   ▼
Sectors
```

### 5.1 Users

Required fields:

```text
id
email
password_hash
name
role
created_at
```

Tasks:

* [X]  🔴 Create SQLAlchemy User model.
* [X]  🔴 Configure unique email.
* [X]  🔴 Implement password hash storage.
* [X]  🔴 Implement role.
* [X]  🔴 Create database migration.
* [X]  🔴 Verify user creation.

---

### 5.2 Sectors

Required fields:

```text
id
name
description
```

Tasks:

* [X]  🔴 Create Sector model.
* [X]  🔴 Create migration.
* [X]  🔴 Seed initial sectors.
* [X]  🔴 Implement sector retrieval.

Suggested seed data:

```text
Agriculture
Education
Healthcare
Technology
Community Development
```

---

### 5.3 Projects

Required fields:

```text
id
user_id
sector_id
title
description
problem_statement
solution
current_stage
visibility
created_at
updated_at
```

Tasks:

* [X]  🔴 Create Project model.
* [X]  🔴 Create relationships.
* [X]  🔴 Create migration.
* [X]  🔴 Implement project creation.
* [X]  🔴 Implement project retrieval.
* [X]  🔴 Implement project listing.

* [X]  🔴 Implement project ownership.

* [ ]  🟠 Implement project update.
* [X]  🟠 Implement search/filter.

---

### 5.4 Stage Gate History

Required fields:

```text
id
project_id
changed_by
previous_stage
new_stage
notes
created_at
```

Tasks:

* [X]  🔴 Create StageGateHistory model.
* [X]  🔴 Create migration.
* [X]  🔴 Record every valid stage transition.
* [X]  🔴 Retrieve project stage history.

---

### 5.5 Contact Requests

Required fields:

```text
id
project_id
requester_name
requester_email
message
created_at
```

Tasks:

* [X]  🔴 Create ContactRequest model.
* [X]  🔴 Create migration.
* [X]  🔴 Implement contact request endpoint.
* [X]  🔴 Associate request with project.

---

## 6. Database & Migration Infrastructure

* [X]  🔴 Connect SQLAlchemy metadata to Alembic.
* [X]  🔴 Generate initial migration.
* [X]  🔴 Run migration against PostgreSQL database.
* [X]  🔴 Verify application tables exist.
* [X]  🔴 Create seed script.
* [X]  🔴 Seed sectors.
* [X]  🟠 Seed demonstration projects.
* [X]  🟠 Add development/demo users.
* [ ]  🟡 Add migration rollback verification.

### Definition of Done

A fresh environment should be able to run:

```bash
docker compose up
```

and initialize the database without manually creating tables.

---

## 7. Authentication MVP

### 7.1 Registration

Endpoint:

```text
POST /api/v1/auth/register
```

Tasks:

* [X]  🔴 Validate registration payload.
* [X]  🔴 Validate email.
* [X]  🔴 Validate password.
* [X]  🔴 Hash password.
* [X]  🔴 Save user.
* [X]  🔴 Reject duplicate email.
* [X]  🔴 Return appropriate response.

---

### 7.2 Login

Endpoint:

```text
POST /api/v1/auth/login
```

Tasks:

* [X]  🔴 Verify email.
* [X]  🔴 Verify password.
* [X]  🔴 Generate JWT.
* [X]  🔴 Include user ID in token.
* [X]  🔴 Include role in token.
* [X]  🔴 Reject invalid credentials.
* [X]  🔴 Return authentication response.

---

### 7.3 Authenticated User

Endpoint:

```text
GET /api/v1/auth/me
```

Tasks:

* [X]  🔴 Implement JWT dependency.
* [X]  🔴 Decode token.
* [X]  🔴 Validate expiration.
* [X]  🔴 Retrieve user.
* [X]  🔴 Return authenticated user.
* [X]  🔴 Reject missing token.
* [X]  🔴 Reject invalid token.

---

## 8. Authorization & Roles

MVP roles:

```text
innovator
official
super_admin
```

### Innovator

* [X]  🔴 Register/login.
* [X]  🔴 Create projects.
* [X]  🔴 View own projects.
* [ ]  🟠 Update own projects.

### Official

* [X]  🔴 Login.
* [X]  🔴 View projects.
* [X]  🔴 Review projects.
* [X]  🔴 Advance project stage.

### Admin

* [ ]  🟠 Login.
* [ ]  🟠 Full administrative access.

### Public

* [X]  🔴 View public projects.
* [X]  🔴 View project details.
* [X]  🔴 Submit contact requests.

### Security Rule

Authorization must be enforced server-side.

The frontend must never be treated as the authority for permissions.

---

## 9. Core Project API

### Project Creation

```text
POST /api/v1/projects
```

Tasks:

* [X]  🔴 Require authentication.
* [X]  🔴 Validate project payload.
* [X]  🔴 Associate project with authenticated user.
* [X]  🔴 Validate sector.
* [X]  🔴 Store project.
* [X]  🔴 Return created project.

---

### Project Registry

```text
GET /api/v1/projects
```

Tasks:

* [X]  🔴 Return public projects.
* [X]  🔴 Return project summary.
* [X]  🟠 Filter by sector.
* [X]  🟠 Filter by stage.
* [X]  🟠 Search by title/description.

---

### Project Details

```text
GET /api/v1/projects/{id}
```

Tasks:

* [X]  🔴 Retrieve project.
* [X]  🔴 Return project details.
* [ ]  🔴 Return sector information.
* [X]  🔴 Handle project not found.

---

### Project Update

```text
PUT /api/v1/projects/{id}
```

Tasks:

* [ ]  🟠 Require authentication.
* [ ]  🟠 Verify ownership or administrative role.
* [ ]  🟠 Update allowed fields.

---

## 10. Stage-Gate MVP

The stage machine is:

```text
Idea
  ↓
Prototype
  ↓
Pilot
  ↓
Scale
  ↓
Implemented
```

Tasks:

* [X]  🔴 Define allowed stages.
* [X]  🔴 Define valid forward transitions.
* [X]  🔴 Prevent invalid transitions.
* [X]  🔴 Require authorized user.
* [X]  🔴 Update current stage.
* [X]  🔴 Record StageGateHistory.
* [X]  🔴 Store transition notes.
* [X]  🔴 Return updated project.
* [X]  🔴 Implement stage history endpoint.

Example:

```text
PUT /api/v1/projects/{id}/stage
```

Request:

```json
{
  "new_stage": "Pilot",
   "verification_notes": "Pilot requirements verified."
}
```

The system should:

```text
Validate
   ↓
Authorize
   ↓
Check current stage
   ↓
Check requested transition
   ↓
Update project
   ↓
Create history record
   ↓
Return result
```

---

## 11. Contact Request MVP

The contact system should protect the innovator's direct contact information.

Flow:

```text
Public User
     │
     ▼
Project
     │
     ▼
Contact Request
     │
     ▼
Innovator
```

Tasks:

* [X]  🔴 Create contact request endpoint.
* [X]  🔴 Validate requester information.
* [X]  🔴 Associate request with project.
* [X]  🔴 Store request.
* [X]  🟠 Provide authenticated innovator access to requests.

* [>] ⚪ Email notifications.

For the hackathon, storing the request is sufficient.

---

# Milestone 3: Frontend MVP

## 12. Frontend Routes

The active frontend should become the actual application.

### Required Routes

```text
/
├── Landing / Registry
├── /login
├── /register
├── /projects
├── /projects/:id
├── /projects/new
├── /dashboard
└── /partners
```

Tasks:

* [X]  🔴 Configure React Router.
* [X]  🔴 Configure API client.
* [X]  🔴 Configure authentication context.

* [X] 🔴 Implement login.
* [X] 🔴 Implement registration.
* [X] 🔴 Store authentication state.

* [X]  🔴 Implement logout.
* [X]  🔴 Implement protected routes.

---

## 13. Public Registry

The registry is one of the primary product screens.

Tasks:

* [X]  🔴 Display projects from real API.
* [X]  🔴 Display project title.
* [X]  🔴 Display sector.
* [X]  🔴 Display stage.
* [X]  🔴 Display short public summary.
* [X]  🔴 Open project details.
* [X]  🟠 Search projects.
* [X]  🟠 Filter by sector.
* [X]  🟠 Filter by stage.
* [ ]  🟡 Add pagination.

### Important

Do not use hard-coded mock projects in the final MVP.

The registry should demonstrate:

```text
React
 ↓
Nginx
 ↓
Core API
 ↓
PostgreSQL
```

---

## 14. Project Details

Tasks:

* [X]  🔴 Display project information.
* [X]  🔴 Display sector.
* [X]  🔴 Display current stage.
* [X]  🔴 Display stage progress.
* [ ]  🔴 Display project owner/organization information where appropriate.
* [X]  🔴 Provide contact request action.
* [X]  🟠 Display stage history.

Suggested visual:

```text
Idea
  ✓
Prototype
  ✓
Pilot
  ●
Scale
  ○
Implemented
  ○
```

---

## 15. Innovator Dashboard

Tasks:

* [X]  🔴 Display authenticated user's projects.
* [X]  🔴 Display current project stages.
* [X]  🔴 Provide "Submit Project".
* [X]  🔴 Provide project details.
* [ ]  🟠 Provide project editing.
* [X]  🟠 Display contact requests.

---

## 16. Project Submission

Required form:

```text
Project Title
Sector
Problem Statement
Solution
Description
Visibility
```

Tasks:

* [X]  🔴 Create submission form.
* [X]  🔴 Validate required fields.
* [X]  🔴 Submit to API.
* [X]  🔴 Display success state.
* [X]  🔴 Redirect to project details/dashboard.
* [X]  🔴 Handle API errors.

---

## 17. Official/Admin Review

The admin/official experience only needs to support the MVP stage-gate workflow.

Tasks:

* [X]  🔴 Display submitted projects.
* [X]  🔴 Open project.
* [X]  🔴 Display current stage.
* [X]  🔴 Select next stage.
* [X]  🔴 Add verification notes.
* [X]  🔴 Submit transition.
* [X]  🔴 Display updated stage.
* [X]  🟠 Display stage history.

Do not build a large administrative dashboard during the MVP.

---

## 18. Reuse Existing Prototype

The existing:

```text
prototype/
```

contains useful UX/product work.

Tasks:

* [ ]  🔴 Review prototype UI.
* [ ]  🔴 Identify reusable layouts/components.
* [X]  🔴 Recreate required MVP screens in `frontend/`.
* [X]  🔴 Preserve useful SiyaPhambili branding.
* [X]  🔴 Do not maintain two competing production frontends.
* [X]  [>] Treat `prototype/` as design/reference material after migration.

The production application remains:

```text
frontend/
```

---

# Milestone 4: Infrastructure, Testing & Demo

## 19. Seed / Demo Data

The application must not appear empty during the demonstration.

Tasks:

* [X]  🔴 Create seed script.
* [X]  🔴 Create sectors.
* [X]  🔴 Create demo users.
* [X]  🔴 Create demo projects.
* [X]  🔴 Give projects different stages.
* [ ]  🔴 Verify projects appear in registry.
* [X]  🟠 Create fictional, locally relevant South African innovation examples.

Suggested stages:

```text
Project A → Idea
Project B → Prototype
Project C → Pilot
Project D → Scale
```

This allows the stage-gate system to be demonstrated immediately.

---

## 20. Testing — MVP Critical Path

We are not attempting complete test coverage during the hackathon.

We are testing the paths that can break the demo.

### Authentication

* [X]  🔴 Registration succeeds.
* [X]  🔴 Duplicate email rejected.
* [X]  🔴 Login succeeds.
* [X]  🔴 Incorrect password rejected.
* [X]  🔴 Invalid JWT rejected.
* [X]  🔴 Expired JWT rejected.

### Projects

* [X]  🔴 Authenticated user can create project.
* [X]  🔴 Public user can list projects.
* [X]  🔴 Public user can view project.
* [ ]  🔴 Unauthorized user cannot modify another user's project.

### Stage Gates

* [X]  🔴 Valid transition succeeds.
* [X]  🔴 Invalid transition rejected.
* [X]  🔴 Unauthorized transition rejected.
* [X]  🔴 Stage history is created.

### Contact

* [X]  🔴 Contact request succeeds.
* [X]  🔴 Invalid project rejected.
* [X]  🔴 Request is persisted.

---

## 21. Integration Testing

The most important test is:

```text
Browser
   ↓
Frontend
   ↓
Nginx
   ↓
Auth/Core
   ↓
PostgreSQL
```

Tasks:

* [ ]  🔴 Register through frontend.
* [ ]  🔴 Login through frontend.
* [ ]  🔴 Create project through frontend.
* [ ]  🔴 View project through frontend.
* [ ]  🔴 Advance project stage.
* [ ]  🔴 Submit contact request.
* [ ]  🔴 Verify data exists in PostgreSQL.
* [ ]  🔴 Restart containers.
* [ ]  🔴 Verify data persists.

---

## 22. Security MVP

Tasks:

* [X]  🔴 Passwords are hashed.
* [X]  🔴 JWT secret comes from environment.
* [X]  🔴 `.env` is not committed.
* [ ]  🔴 Rotate exposed development credentials if necessary.
* [X]  🔴 Verify authorization server-side.
* [X]  🔴 Validate API input.
* [X]  🔴 Configure local CORS allowlists.
* [X]  🔴 Keep database credentials out of source code.
* [ ]  🔴 Verify Gitleaks.
* [ ]  🟠 Run Bandit.
* [ ]  🟠 Run pip-audit.
* [ ]  🟠 Run npm audit.

---

## 23. Docker / Local Environment

Tasks:

* [X]  🔴 `docker compose up` works.
* [X]  🔴 PostgreSQL starts.
* [X]  🔴 Auth starts.
* [X]  🔴 Core starts.
* [X]  🔴 Gateway starts.
* [X]  🔴 Frontend starts.
* [X]  🔴 Services can communicate.
* [X]  🔴 Database migrations can run.
* [ ]  🔴 Demo users/projects can be seeded (requires `DEMO_USER_PASSWORD`).
* [X]  🟠 Fix Makefile commands.
* [X]  🟠 Add convenient migration and seed commands.

Useful commands should include:

```bash
make build
make up
make down
make logs
make test
make lint
make seed
make migrate
```

---

## 24. CI/CD

Only the critical CI checks should block the MVP.

Tasks:

* [ ]  🟠 Verify GitHub Actions runs.
* [X]  🟠 Run backend tests.
* [X]  🟠 Run frontend build.
* [X]  🟠 Run lint.
* [ ]  🟠 Run security checks.

* [>] ⚪ Full production CI/CD pipeline.
* [>] ⚪ Automated deployment pipeline.
* [>] ⚪ Advanced release automation.

### Important

During the hackathon, CI should not become a blocker because of unrelated warnings.

However, after the MVP is stable, `|| true` should be removed from checks that are intended to enforce quality.

---

## 25. Deployment

Deployment comes **after local end-to-end functionality**.

Tasks:

* [ ]  🔴 Verify production environment variables.
* [ ]  🔴 Verify database configuration.
* [ ]  🔴 Verify CORS.
* [ ]  🔴 Verify gateway routing.
* [ ]  🟠 Deploy backend services.
* [ ]  🟠 Deploy frontend.
* [ ]  🟠 Verify public URL.
* [ ]  🟠 Verify database persistence.
* [ ]  🟠 Run complete demo flow remotely.

Do not redesign the deployment architecture during the final hours.

---

## 26. Demo Preparation

The final demo should be scripted.

### Demo Flow

#### Step 1 — Public Registry

* [ ]  🔴 Open SiyaPhambili.
* [ ]  🔴 Show populated registry.
* [ ]  🔴 Search/filter projects.
* [ ]  🔴 Open a project.

#### Step 2 — Innovator

* [ ]  🔴 Register/login.
* [ ]  🔴 Open dashboard.
* [ ]  🔴 Submit project.
* [ ]  🔴 Show project appearing in registry.

#### Step 3 — Official

* [ ]  🔴 Login as official.
* [ ]  🔴 Open project.
* [ ]  🔴 Review project.
* [ ]  🔴 Move project from Idea → Prototype.
* [ ]  🔴 Show stage history.

#### Step 4 — Contact

* [ ]  🔴 Submit contact request.
* [ ]  🔴 Demonstrate that the request is associated with the project.

#### Step 5 — Architecture

* [ ]  🟠 Show architecture diagram.
* [ ]  🟠 Explain microservices.
* [ ]  🟠 Explain PostgreSQL.
* [ ]  🟠 Explain stage-gate workflow.
* [ ]  🟠 Explain security/privacy approach.

---

## 27. Time Allocation

Assuming approximately 40 hours remain:


| Phase                   |       Target |
| ------------------------- | -------------: |
| Scope freeze            |       1 hour |
| Database                |      5 hours |
| Authentication          |      5 hours |
| Core API                |      6 hours |
| Frontend                |      7 hours |
| Integration             |      4 hours |
| Stage Gate + Contact UX |      3 hours |
| Testing/Security        |      3 hours |
| Deployment              |      3 hours |
| Demo hardening          |      3 hours |
| **Total**               | **40 hours** |

The remaining time should act as contingency rather than as an invitation to add features.

---

## 28. Emergency Cut List

If the team falls behind, remove features in this order.

### First to cut

* [>] Advanced analytics
* [>] Pagination
* [>] Advanced filtering
* [>] Advanced admin dashboard
* [>] Email notifications
* [>] Complex contact workflow
* [>] Advanced profile management

### Do NOT cut

* [ ]  🔴 Authentication
* [ ]  🔴 Project creation
* [ ]  🔴 Project registry
* [ ]  🔴 Project details
* [ ]  🔴 Stage gates
* [ ]  🔴 PostgreSQL persistence
* [ ]  🔴 Frontend/API integration

The principle is:

> **Cut breadth before cutting the core vertical slice.**

---

# Milestone 5: Post-Hackathon Roadmap

## 29. Post-Hackathon Stabilization

Once the MVP has been demonstrated, return to the broader roadmap.

### Architecture

* [>] Evaluate database-per-service architecture.
* [>] Refine C4 diagrams.
* [>] Reconcile architecture documentation.
* [>] Improve service boundaries.
* [>] Introduce stronger observability.

### Backend

* [>] Complete API implementation.
* [>] Improve validation.
* [>] Add pagination.
* [>] Add advanced filtering.
* [>] Improve error handling.
* [>] Add refresh tokens.
* [>] Improve authorization model.

### Frontend

* [>] Complete UI/UX.
* [>] Accessibility.
* [>] Responsive refinement.
* [>] Loading/error states.
* [>] Advanced dashboards.
* [>] Profile management.

### Testing

* [>] Expand unit coverage.
* [>] Integration test suite.
* [>] Cypress E2E suite.
* [>] Security testing.
* [>] Performance testing.

### DevOps

* [>] Harden CI.
* [>] Remove permissive `|| true` checks.
* [>] Automated deployment.
* [>] Monitoring.
* [>] Logging.
* [>] Backup/recovery strategy.

---

## 30. Production Hardening

These are explicitly outside the hackathon MVP.

* [>] Production-grade secrets management.
* [>] Database backups.
* [>] Disaster recovery.
* [>] Rate-limit refinement.
* [>] Advanced audit logging.
* [>] Security monitoring.
* [>] Vulnerability scanning.
* [>] Dependency management.
* [>] Production observability.
* [>] Availability monitoring.
* [>] Data retention policies.
* [>] Full POPIA implementation.
* [>] Data deletion workflows.

---

## 31. Future Enhancements

The original product roadmap remains relevant after the MVP.

Potential future capabilities include:

* [>] Notifications.
* [>] Email integration.
* [>] Rich project profiles.
* [>] File/document uploads.
* [>] Advanced search.
* [>] Analytics dashboards.
* [>] Innovation pipeline analytics.
* [>] Organisation profiles.
* [>] Sponsor workflows.
* [>] Government/official workflows.
* [>] Advanced stage-gate verification.
* [>] Collaboration features.
* [>] Public statistics.
* [>] Geographic discovery.
* [>] Mobile/PWA improvements.

---

## 32. Release Strategy

The hackathon MVP should receive a release tag.

Suggested:

```text
v0.1.0-mvp
```

Tasks:

* [ ]  🟠 Confirm MVP acceptance criteria.
* [ ]  🟠 Freeze MVP branch.
* [ ]  🟠 Run final tests.
* [ ]  🟠 Verify deployment.
* [ ]  🟠 Tag release.
* [ ]  🟠 Create release notes.

Future releases:

```text
v0.1.0-mvp
v0.2.0-stabilization
v0.3.0-production-hardening
v1.0.0
```

---

## 33. Definition of Success

The hackathon is successful if a judge can watch the following without us manually manipulating the database:

```text
1. Open SiyaPhambili
          ↓
2. Browse projects
          ↓
3. Register as innovator
          ↓
4. Submit project
          ↓
5. Project appears in registry
          ↓
6. Official reviews project
          ↓
7. Project advances through stage
          ↓
8. Stage history is recorded
          ↓
9. Public user views project
          ↓
10. Public user submits contact request
```

The system must demonstrate that these actions are backed by the actual:

```text
React
   ↓
Nginx
   ↓
FastAPI
   ↓
PostgreSQL
```

rather than mocked frontend data.

---

## 34. Final Hackathon Rule

> ### Build the smallest complete SiyaPhambili.
>
> Do not attempt to build the entire SiyaPhambili platform.

The hackathon MVP should prove the central product concept:

**Discover → Submit → Review → Progress → Connect**

Everything beyond that becomes the next release.
