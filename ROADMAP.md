# SiyaPhambili — Development Roadmap

> **Project:** SiyaPhambili
> **Architecture:** React + Nginx Gateway + FastAPI Auth/Core Services + PostgreSQL

---

# 1. Roadmap Status Legend

Use the following status indicators throughout this document:

* [ ] **Not Started**
* [~] **In Progress**
* [x] **Complete**
* [!] **Blocked**
* [>] **Deferred to Post-MVP**

### Priority

* 🔴 **CRITICAL** — MVP cannot be considered complete without this.
* 🟠 **HIGH** — Required for a strong MVP/demo.
* 🟡 **MEDIUM** — Implement if time permits.
* ⚪ **POST-MVP** — Do not allow this to interrupt the hackathon critical path.

---

# 2. Hackathon Objective

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
React Frontend
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

* [ ] 🔴 Users can register.
* [ ] 🔴 Users can log in.
* [ ] 🔴 JWT authentication works.
* [ ] 🔴 Roles are enforced.
* [ ] 🔴 Users can submit projects.
* [ ] 🔴 Projects are stored in PostgreSQL.
* [ ] 🔴 Public users can browse projects.
* [ ] 🔴 Users can view project details.
* [ ] 🔴 Projects can progress through stage gates.
* [ ] 🔴 Stage transitions are recorded.
* [ ] 🔴 Users can submit contact requests.
* [ ] 🔴 The React frontend consumes the real API.
* [ ] 🔴 The complete system works through the Nginx gateway.
* [ ] 🔴 Demo data exists.
* [ ] 🔴 The primary demo journey works without manual database manipulation.

---

# 3. Hackathon Scope Freeze

During the MVP phase:

* [ ] 🔴 Freeze the core architecture.
* [ ] 🔴 Do not introduce additional microservices.
* [ ] 🔴 Do not redesign the database unnecessarily.
* [ ] 🔴 Do not replace the existing frontend technology.
* [ ] 🔴 Do not introduce Kubernetes.
* [ ] 🔴 Do not build advanced notification infrastructure.
* [ ] 🔴 Do not build enterprise IAM.
* [ ] 🔴 Do not spend significant time polishing documentation before the MVP works.
* [ ] 🔴 Do not add features simply because they are listed in the long-term roadmap.

### Rule

> **If a feature does not directly contribute to the three core user journeys, it should not interrupt the MVP critical path.**

---

# 4. MVP Architecture

## 4.1 Target Architecture

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

## 4.2 Architecture Tasks

* [ ] 🔴 Verify Docker Compose starts all required services.
* [ ] 🔴 Verify Auth Service starts.
* [ ] 🔴 Verify Core Service starts.
* [ ] 🔴 Verify PostgreSQL starts.
* [ ] 🔴 Verify Nginx starts.
* [ ] 🔴 Verify frontend starts.
* [ ] 🔴 Verify Nginx routes `/api/v1/auth/*` correctly.
* [ ] 🔴 Verify Nginx routes `/api/v1/projects/*` correctly.
* [ ] 🔴 Verify frontend communicates through the gateway.
* [ ] 🟠 Remove unnecessary architecture blockers.
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

# 5. Database MVP

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

## 5.1 Users

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

* [ ] 🔴 Create SQLAlchemy User model.
* [ ] 🔴 Configure unique email.
* [ ] 🔴 Implement password hash storage.
* [ ] 🔴 Implement role.
* [ ] 🔴 Create database migration.
* [ ] 🔴 Verify user creation.

---

## 5.2 Sectors

Required fields:

```text
id
name
description
```

Tasks:

* [ ] 🔴 Create Sector model.
* [ ] 🔴 Create migration.
* [ ] 🔴 Seed initial sectors.
* [ ] 🔴 Implement sector retrieval.

Suggested seed data:

```text
Agriculture
Education
Healthcare
Technology
Community Development
```

---

## 5.3 Projects

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

* [ ] 🔴 Create Project model.
* [ ] 🔴 Create relationships.
* [ ] 🔴 Create migration.
* [ ] 🔴 Implement project creation.
* [ ] 🔴 Implement project retrieval.
* [ ] 🔴 Implement project listing.
* [🔴] Implement project ownership.
* [ ] 🟠 Implement project update.
* [ ] 🟠 Implement search/filter.

---

## 5.4 Stage Gate History

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

* [ ] 🔴 Create StageGateHistory model.
* [ ] 🔴 Create migration.
* [ ] 🔴 Record every valid stage transition.
* [ ] 🔴 Retrieve project stage history.

---

## 5.5 Contact Requests

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

* [ ] 🔴 Create ContactRequest model.
* [ ] 🔴 Create migration.
* [ ] 🔴 Implement contact request endpoint.
* [ ] 🔴 Associate request with project.

---

# 6. Database & Migration Infrastructure

* [ ] 🔴 Connect SQLAlchemy metadata to Alembic.
* [ ] 🔴 Generate initial migration.
* [ ] 🔴 Run migration against clean PostgreSQL database.
* [ ] 🔴 Verify all five tables exist.
* [ ] 🔴 Create seed script.
* [ ] 🔴 Seed sectors.
* [ ] 🟠 Seed demonstration projects.
* [ ] 🟠 Add development/demo users.
* [ ] 🟡 Add migration rollback verification.

### Definition of Done

A fresh environment should be able to run:

```bash
docker compose up
```

and initialize the database without manually creating tables.

---

# 7. Authentication MVP

## 7.1 Registration

Endpoint:

```text
POST /api/v1/auth/register
```

Tasks:

* [ ] 🔴 Validate registration payload.
* [ ] 🔴 Validate email.
* [ ] 🔴 Validate password.
* [ ] 🔴 Hash password.
* [ ] 🔴 Save user.
* [ ] 🔴 Reject duplicate email.
* [ ] 🔴 Return appropriate response.

---

## 7.2 Login

Endpoint:

```text
POST /api/v1/auth/login
```

Tasks:

* [ ] 🔴 Verify email.
* [ ] 🔴 Verify password.
* [ ] 🔴 Generate JWT.
* [ ] 🔴 Include user ID in token.
* [ ] 🔴 Include role in token.
* [ ] 🔴 Reject invalid credentials.
* [ ] 🔴 Return authentication response.

---

## 7.3 Authenticated User

Endpoint:

```text
GET /api/v1/auth/me
```

Tasks:

* [ ] 🔴 Implement JWT dependency.
* [ ] 🔴 Decode token.
* [ ] 🔴 Validate expiration.
* [ ] 🔴 Retrieve user.
* [ ] 🔴 Return authenticated user.
* [ ] 🔴 Reject missing token.
* [ ] 🔴 Reject invalid token.

---

# 8. Authorization & Roles

MVP roles:

```text
innovator
official
admin
```

## Innovator

* [ ] 🔴 Register/login.
* [ ] 🔴 Create projects.
* [ ] 🔴 View own projects.
* [ ] 🟠 Update own projects.

## Official

* [ ] 🔴 Login.
* [ ] 🔴 View projects.
* [ ] 🔴 Review projects.
* [ ] 🔴 Advance project stage.

## Admin

* [ ] 🟠 Login.
* [ ] 🟠 Full administrative access.

## Public

* [ ] 🔴 View public projects.
* [ ] 🔴 View project details.
* [ ] 🔴 Submit contact requests.

### Security Rule

Authorization must be enforced server-side.

The frontend must never be treated as the authority for permissions.

---

# 9. Core Project API

## Project Creation

```text
POST /api/v1/projects
```

Tasks:

* [ ] 🔴 Require authentication.
* [ ] 🔴 Validate project payload.
* [ ] 🔴 Associate project with authenticated user.
* [ ] 🔴 Validate sector.
* [ ] 🔴 Store project.
* [ ] 🔴 Return created project.

---

## Project Registry

```text
GET /api/v1/projects
```

Tasks:

* [ ] 🔴 Return public projects.
* [ ] 🔴 Return project summary.
* [ ] 🟠 Filter by sector.
* [ ] 🟠 Filter by stage.
* [ ] 🟠 Search by title/description.

---

## Project Details

```text
GET /api/v1/projects/{id}
```

Tasks:

* [ ] 🔴 Retrieve project.
* [ ] 🔴 Return project details.
* [ ] 🔴 Return sector information.
* [ ] 🔴 Handle project not found.

---

## Project Update

```text
PUT /api/v1/projects/{id}
```

Tasks:

* [ ] 🟠 Require authentication.
* [ ] 🟠 Verify ownership or administrative role.
* [ ] 🟠 Update allowed fields.

---

# 10. Stage-Gate MVP

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

* [ ] 🔴 Define allowed stages.
* [ ] 🔴 Define valid forward transitions.
* [ ] 🔴 Prevent invalid transitions.
* [ ] 🔴 Require authorized user.
* [ ] 🔴 Update current stage.
* [ ] 🔴 Record StageGateHistory.
* [ ] 🔴 Store transition notes.
* [ ] 🔴 Return updated project.
* [ ] 🔴 Implement stage history endpoint.

Example:

```text
POST /api/v1/projects/{id}/stage
```

Request:

```json
{
  "new_stage": "Pilot",
  "notes": "Pilot requirements verified."
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

# 11. Contact Request MVP

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

* [ ] 🔴 Create contact request endpoint.
* [ ] 🔴 Validate requester information.
* [ ] 🔴 Associate request with project.
* [ ] 🔴 Store request.
* [ ] 🟠 Provide authenticated innovator access to requests.
* [>] ⚪ Email notifications.

For the hackathon, storing the request is sufficient.

---

# 12. Frontend MVP

The active frontend should become the actual application.

## Required Routes

```text
/
├── Landing / Registry
├── /login
├── /register
├── /projects
├── /projects/:id
├── /projects/new
├── /dashboard
└── /admin/projects/:id
```

Tasks:

* [ ] 🔴 Configure React Router.
* [ ] 🔴 Configure API client.
* [ ] 🔴 Configure authentication context.
* [ ] 🔴 Implement login.
* [ ] 🔴 Implement registration.
* [ ] 🔴 Store authentication state.
* [ ] 🔴 Implement logout.
* [ ] 🔴 Implement protected routes.

---

# 13. Public Registry

The registry is one of the primary product screens.

Tasks:

* [ ] 🔴 Display projects from real API.
* [ ] 🔴 Display project title.
* [ ] 🔴 Display sector.
* [ ] 🔴 Display stage.
* [ ] 🔴 Display short description.
* [ ] 🔴 Open project details.
* [ ] 🟠 Search projects.
* [ ] 🟠 Filter by sector.
* [ ] 🟠 Filter by stage.
* [ ] 🟡 Add pagination.

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

# 14. Project Details

Tasks:

* [ ] 🔴 Display project information.
* [ ] 🔴 Display sector.
* [ ] 🔴 Display current stage.
* [ ] 🔴 Display stage progress.
* [ ] 🔴 Display project owner/organization information where appropriate.
* [ ] 🔴 Provide contact request action.
* [ ] 🟠 Display stage history.

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

# 15. Innovator Dashboard

Tasks:

* [ ] 🔴 Display authenticated user's projects.
* [ ] 🔴 Display current project stages.
* [ ] 🔴 Provide "Submit Project".
* [ ] 🔴 Provide project details.
* [ ] 🟠 Provide project editing.
* [ ] 🟠 Display contact requests.

---

# 16. Project Submission

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

* [ ] 🔴 Create submission form.
* [ ] 🔴 Validate required fields.
* [ ] 🔴 Submit to API.
* [ ] 🔴 Display success state.
* [ ] 🔴 Redirect to project details/dashboard.
* [ ] 🔴 Handle API errors.

---

# 17. Official/Admin Review

The admin/official experience only needs to support the MVP stage-gate workflow.

Tasks:

* [ ] 🔴 Display submitted projects.
* [ ] 🔴 Open project.
* [ ] 🔴 Display current stage.
* [ ] 🔴 Select next stage.
* [ ] 🔴 Add verification notes.
* [ ] 🔴 Submit transition.
* [ ] 🔴 Display updated stage.
* [ ] 🟠 Display stage history.

Do not build a large administrative dashboard during the MVP.

---

# 18. Reuse Existing Prototype

The existing:

```text
prototype/
```

contains useful UX/product work.

Tasks:

* [ ] 🔴 Review prototype UI.
* [ ] 🔴 Identify reusable layouts/components.
* [ ] 🔴 Recreate required MVP screens in `frontend/`.
* [ ] 🔴 Preserve useful SiyaPhambili branding.
* [ ] 🔴 Do not maintain two competing production frontends.
* [ ] [>] Treat `prototype/` as design/reference material after migration.

The production application remains:

```text
frontend/
```

---

# 19. Seed / Demo Data

The application must not appear empty during the demonstration.

Tasks:

* [ ] 🔴 Create seed script.
* [ ] 🔴 Create sectors.
* [ ] 🔴 Create demo users.
* [ ] 🔴 Create demo projects.
* [ ] 🔴 Give projects different stages.
* [ ] 🔴 Verify projects appear in registry.
* [ ] 🟠 Create realistic South African innovation examples.

Suggested stages:

```text
Project A → Idea
Project B → Prototype
Project C → Pilot
Project D → Scale
```

This allows the stage-gate system to be demonstrated immediately.

---

# 20. Testing — MVP Critical Path

We are not attempting complete test coverage during the hackathon.

We are testing the paths that can break the demo.

## Authentication

* [ ] 🔴 Registration succeeds.
* [ ] 🔴 Duplicate email rejected.
* [ ] 🔴 Login succeeds.
* [ ] 🔴 Incorrect password rejected.
* [ ] 🔴 Invalid JWT rejected.
* [ ] 🔴 Expired JWT rejected.

## Projects

* [ ] 🔴 Authenticated user can create project.
* [ ] 🔴 Public user can list projects.
* [ ] 🔴 Public user can view project.
* [ ] 🔴 Unauthorized user cannot modify another user's project.

## Stage Gates

* [ ] 🔴 Valid transition succeeds.
* [ ] 🔴 Invalid transition rejected.
* [ ] 🔴 Unauthorized transition rejected.
* [ ] 🔴 Stage history is created.

## Contact

* [ ] 🔴 Contact request succeeds.
* [ ] 🔴 Invalid project rejected.
* [ ] 🔴 Request is persisted.

---

# 21. Integration Testing

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

* [ ] 🔴 Register through frontend.
* [ ] 🔴 Login through frontend.
* [ ] 🔴 Create project through frontend.
* [ ] 🔴 View project through frontend.
* [ ] 🔴 Advance project stage.
* [ ] 🔴 Submit contact request.
* [ ] 🔴 Verify data exists in PostgreSQL.
* [ ] 🔴 Restart containers.
* [ ] 🔴 Verify data persists.

---

# 22. Security MVP

Tasks:

* [ ] 🔴 Passwords are hashed.
* [ ] 🔴 JWT secret comes from environment.
* [ ] 🔴 `.env` is not committed.
* [ ] 🔴 Rotate exposed development credentials if necessary.
* [ ] 🔴 Verify authorization server-side.
* [ ] 🔴 Validate API input.
* [ ] 🔴 Configure CORS correctly.
* [ ] 🔴 Keep database credentials out of source code.
* [ ] 🔴 Verify Gitleaks.
* [ ] 🟠 Run Bandit.
* [ ] 🟠 Run pip-audit.
* [ ] 🟠 Run npm audit.

---

# 23. Docker / Local Environment

Tasks:

* [ ] 🔴 `docker compose up` works.
* [ ] 🔴 PostgreSQL starts.
* [ ] 🔴 Auth starts.
* [ ] 🔴 Core starts.
* [ ] 🔴 Gateway starts.
* [ ] 🔴 Frontend starts.
* [ ] 🔴 Services can communicate.
* [ ] 🔴 Database migrations can run.
* [ ] 🔴 Seed data can be loaded.
* [ ] 🟠 Fix Makefile commands.
* [ ] 🟠 Add convenient development commands.

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

# 24. CI/CD

Only the critical CI checks should block the MVP.

Tasks:

* [ ] 🟠 Verify GitHub Actions runs.
* [ ] 🟠 Run backend tests.
* [ ] 🟠 Run frontend build.
* [ ] 🟠 Run lint.
* [ ] 🟠 Run security checks.
* [>] ⚪ Full production CI/CD pipeline.
* [>] ⚪ Automated deployment pipeline.
* [>] ⚪ Advanced release automation.

### Important

During the hackathon, CI should not become a blocker because of unrelated warnings.

However, after the MVP is stable, `|| true` should be removed from checks that are intended to enforce quality.

---

# 25. Deployment

Deployment comes **after local end-to-end functionality**.

Tasks:

* [ ] 🔴 Verify production environment variables.
* [ ] 🔴 Verify database configuration.
* [ ] 🔴 Verify CORS.
* [ ] 🔴 Verify gateway routing.
* [ ] 🟠 Deploy backend services.
* [ ] 🟠 Deploy frontend.
* [ ] 🟠 Verify public URL.
* [ ] 🟠 Verify database persistence.
* [ ] 🟠 Run complete demo flow remotely.

Do not redesign the deployment architecture during the final hours.

---

# 26. Demo Preparation

The final demo should be scripted.

## Demo Flow

### Step 1 — Public Registry

* [ ] 🔴 Open SiyaPhambili.
* [ ] 🔴 Show populated registry.
* [ ] 🔴 Search/filter projects.
* [ ] 🔴 Open a project.

### Step 2 — Innovator

* [ ] 🔴 Register/login.
* [ ] 🔴 Open dashboard.
* [ ] 🔴 Submit project.
* [ ] 🔴 Show project appearing in registry.

### Step 3 — Official

* [ ] 🔴 Login as official.
* [ ] 🔴 Open project.
* [ ] 🔴 Review project.
* [ ] 🔴 Move project from Idea → Prototype.
* [ ] 🔴 Show stage history.

### Step 4 — Contact

* [ ] 🔴 Submit contact request.
* [ ] 🔴 Demonstrate that the request is associated with the project.

### Step 5 — Architecture

* [ ] 🟠 Show architecture diagram.
* [ ] 🟠 Explain microservices.
* [ ] 🟠 Explain PostgreSQL.
* [ ] 🟠 Explain stage-gate workflow.
* [ ] 🟠 Explain security/privacy approach.

---

# 27. Time Allocation

Assuming approximately 40 hours remain:

| Phase                   |       Target |
| ----------------------- | -----------: |
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

# 28. Emergency Cut List

If the team falls behind, remove features in this order.

## First to cut

* [>] Advanced analytics
* [>] Pagination
* [>] Advanced filtering
* [>] Advanced admin dashboard
* [>] Email notifications
* [>] Complex contact workflow
* [>] Advanced profile management

## Do NOT cut

* [ ] 🔴 Authentication
* [ ] 🔴 Project creation
* [ ] 🔴 Project registry
* [ ] 🔴 Project details
* [ ] 🔴 Stage gates
* [ ] 🔴 PostgreSQL persistence
* [ ] 🔴 Frontend/API integration

The principle is:

> **Cut breadth before cutting the core vertical slice.**

---

# 29. Post-Hackathon Stabilization

Once the MVP has been demonstrated, return to the broader roadmap.

## Architecture

* [>] Evaluate database-per-service architecture.
* [>] Refine C4 diagrams.
* [>] Reconcile architecture documentation.
* [>] Improve service boundaries.
* [>] Introduce stronger observability.

## Backend

* [>] Complete API implementation.
* [>] Improve validation.
* [>] Add pagination.
* [>] Add advanced filtering.
* [>] Improve error handling.
* [>] Add refresh tokens.
* [>] Improve authorization model.

## Frontend

* [>] Complete UI/UX.
* [>] Accessibility.
* [>] Responsive refinement.
* [>] Loading/error states.
* [>] Advanced dashboards.
* [>] Profile management.

## Testing

* [>] Expand unit coverage.
* [>] Integration test suite.
* [>] Cypress E2E suite.
* [>] Security testing.
* [>] Performance testing.

## DevOps

* [>] Harden CI.
* [>] Remove permissive `|| true` checks.
* [>] Automated deployment.
* [>] Monitoring.
* [>] Logging.
* [>] Backup/recovery strategy.

---

# 30. Production Hardening

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

# 31. Future Enhancements

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

# 32. Release Strategy

The hackathon MVP should receive a release tag.

Suggested:

```text
v0.1.0-mvp
```

Tasks:

* [ ] 🟠 Confirm MVP acceptance criteria.
* [ ] 🟠 Freeze MVP branch.
* [ ] 🟠 Run final tests.
* [ ] 🟠 Verify deployment.
* [ ] 🟠 Tag release.
* [ ] 🟠 Create release notes.

Future releases:

```text
v0.1.0-mvp
v0.2.0-stabilization
v0.3.0-production-hardening
v1.0.0
```

---

# 33. Definition of Success

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

# 34. Final Hackathon Rule

> ## Build the smallest complete SiyaPhambili.
>
> Do not attempt to build the entire SiyaPhambili platform.

The hackathon MVP should prove the central product concept:

**Discover → Submit → Review → Progress → Connect**

Everything beyond that becomes the next release.
