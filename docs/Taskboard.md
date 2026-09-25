# SiyaPhambili - Master Build Taskboard
**GKHack26 · Day 1: 25 Sept · Day 2: 26 Sept · Day 3: 27 Sept (Centurion)**
**Team Fantastic 4:** Musa & Mpilo (APIs & Backend), Lerato (Infrastructure & Pipeline), Anele & Tlhompho (Frontend & Architecture)

**Internal split within the pairs** (the board still assigns individual tasks, so someone has to own each one - adjust if we split differently):
- **Musa** → Auth service tasks. **Mpilo** → Core service tasks (registry, stage-gate, contact requests, database models).
- **Anele** → UI/page-building (forms, views, styling). **Tlhompho** → frontend architecture and cross-cutting concerns (routing, access control, admin dashboard, testing).
- **Lerato** owns anything infra/pipeline: Docker, CI, deployments, running migrations, seed data - not writing the backend models themselves, but making sure they run.

## How to use this board

Each step below has the same shape:
- **User Story** - who wants this and why
- **Scenarios** - Given/When/Then acceptance criteria (these become our pytest and Cypress tests almost line-for-line)
- **Tasks** - Name, Description, How to build it, Owner, Priority, Day
- **Tests to write** - the actual pytest/unit test names, so "write tests" isn't a vague leftover task

Priority: `P1` = required for the demo to work. `P2` = strengthens it, don't block on it. `P3` = only if ahead of schedule.

## Contents

- [🔴 Step 0: Official Sonke Deadlines](#step-0--official-sonke-deadlines-check-this-first-every-few-hours)
- [Pre-Hackathon (Done)](#pre-hackathon-recap---done-before-25-sept)
- Step A: Auth Service - Registration
- Step B: Auth Service - Login & JWT
- Step C: Core Service - Database Layer
- Step D: Core Service - Submit & List Projects
- Step E: Core Service - Stage-Gate Advancement
- Step F: Core Service - Contact Requests
- Step G: Auth Service - Role Management
- Step H: Frontend Shell & Routing
- Step I: Deployment & Demo
- [Step J: Legal, Compliance & Accessibility](#step-j--legal-compliance--accessibility)
- [Step K: Repo Housekeeping](#step-k--repo-housekeeping)
- [Step L: Pitch Deck](#step-l--pitch-deck-slide-by-slide)
- [Cross-cutting: TRL 3](#cross-cutting-what-trl-3-needs-to-actually-be-true-by-day-3)
- [Day-by-day sequencing](#suggested-day-by-day-sequencing)

## STEP 0 - Official Sonke Deadlines (check this first, every few hours)

Source: the actual Sonke event guidelines, not assumed. These are hard deadlines with real consequences ("No submission → No Pitching. No finale. No prizes.") - treat this step as higher priority than any feature work when a deadline is close.

**Update:** the judging criteria are now confirmed (pulled straight from the Sonke "Criteria" tab, 6 criterions as suspected). The "TRL 3" framing we've been using is still not an official criterion by that name, but it maps closest to "Technical Implementation" below - treat it as our own proxy for that line item, not as a slide judges expect to see labelled "TRL 3".

**Official judging criteria (max 70 points, incl. bonus):**

| Criterion | Points | What it's really asking |
|---|---|---|
| Innovation and Creativity | 0-15 | Is this new or a real improvement on what exists, and does it have impact potential for our intended users? |
| Technical Implementation | 0-15 | Does it actually work, are our technology choices fit for scale, and is it efficient? |
| Usability and Design | 0-10 | Is it easy to use, does it look good, and could someone use it tomorrow? |
| Security and Ethics | 0-10 | Have we considered real risks, mitigations, and policies? |
| Business and Presentation | 0-15 | Do we have a sound, sellable business case - would a judge actually buy it? |
| Bonus: Use of Quantum Tech | 0-5 | Have we outlined (or better, implemented) any quantum tech integration? |

| Name | Description | How to do it | Owner | Deadline |
|---|---|---|---|---|
| Arrive & check in | Physical: be at the venue before 15:30 with ID/passport/driver's licence and our donation item. Virtual: use the VIRTUAL CHECK-IN button on Sonke to register our weekend participation. | Confirm as a team which of us are physical vs. virtual for Day 1, then make sure each person follows the matching check-in path before 15:30 | Whole team | Day 1, before 15:30 |
| Problem statement session with mentors | Refine the problem statement to ≤2 paragraphs, must cite real data from a credible source or lived experience | Have a draft ready *before* the session, not written live - pull from our ADRs/README's existing problem framing | Mpilo + whoever's on-site | Day 1, 19:00–20:00 |
| Attend DevLabs workshops | Mandatory for all teams | Split across sessions since we're 5 people - pick what's most relevant (security/SSDLC-adjacent and business-model-adjacent sessions are good bets given what's due right after) | All | Day 2, 11:00–12:00 |
| Submit SSDLC (Secure System Development Lifecycle) | Shows how security was built into the flow, not bolted on | We already have this in substance - `SECURITY.md` - and Sonke already shows a stub page marked "✅ Created," so open it and replace the placeholder with the real, condensed content rather than leaving it as-is | Mpilo | Day 2, 12:30 |
| War Room check-in | 12 minutes with a panel on current progress and scope guidance | Prepare a tight, honest status summary - what's working end-to-end right now, not a pitch. This is a check-in, not a sales moment. | Tlhompho | Day 2, 14:00–17:00 (room TBC by email) |
| Lean Business Canvas | Filled in on Sonke, needs real figures - a monthly fee, a cost estimate | Sonke already shows this as "✅ Created," so it's a stub, not new work - open it and put in real numbers. Team decision: what would this actually cost to run (hosting/infra estimate from Lerato) and what would a government department or sponsor plausibly pay? | Mpilo + Lerato | Day 2, ~21:30 |
| Record demo video | Under 90 seconds, linked in the deck or project overview | Record by end of Day 2 as a buffer - final submission is 08:59 Sunday, right before pitching starts, too risky to leave for Sunday morning | Tlhompho | Before Day 3, hard cutoff 08:59 |
| Final submission | Presentation slides (10+, less for Round 1) covering Problem Statement, Solution, User Journey Story, Technological Architecture, Competitive Analysis, Data Privacy Policies + demo video link | Assign 1-2 people to own the actual submit action so nothing's missed - per the guidelines, don't leave this to "whoever's around." Sonke's submission page shows we've already got 1 file uploaded, so confirm what that file is before assuming it's covered. | Lerato + Mpilo | Day 3, 08:59 SAST hard deadline |
| Sales pitch (Round 1) | 3 minutes, framed as a sale: ~20s problem w/ evidence → solution + how it works → cost/ask → what makes it stand out → 50s live demo | Script and rehearse this separately from the slide deck - it's judged as "pay full / pay half / not buying," not as a technical walkthrough | Whoever pitches (decide today) | Day 3, 10:00–12:30 |
| Finale (if Top 12) | 5 min presentation (demo-focused) + 3 min Q&A | Only relevant if we advance | Whole team | Day 3, 13:15–15:30 |
| Keep Sonke updated | Post major milestones as we hit them, ideally by midnight each night | Two-minute habit, not a task - whoever's still online each night | Whoever's online | Ongoing |

**If we get stuck:** email sonke@geekulcha.dev, post in the open Sonke channels, or (if virtual) flag Lisa Bashizi as the Virtual Support Centre lead. There's also a facilitator desk and mentors on-site physically.

## Pre-Hackathon Recap - Done Before 25 Sept

Already built and merged, no action needed today: Dockerfiles for all 4 services, `.env.example`, Auth/Core FastAPI skeletons with `/health` checks, Alembic scaffold for Core, Vite+React+MUI frontend skeleton, CI pipeline (lint/test/build + `bandit`/`pip-audit`/`npm audit`/`gitleaks`), Nginx gateway with CORS + security headers + rate limiting, non-root Docker containers, `docs/popia-notes.md`, `docs/ip-and-user-protection-notes.md`, `SECURITY.md`. If any teammate hasn't run `make up` successfully yet this morning, that's the very first thing to fix before touching any step below.

---

## STEP A - Auth Service: Registration

**User Story:** As an Innovator, I want to create an account with my email and a password, so that I can submit solutions under my own identity.

**Scenarios:**
```
Scenario: Successful registration
 Given I am not registered
 When I POST /api/v1/auth/register with a valid email and password
 Then I receive a 201 response
 And a Users row is created with a bcrypt-hashed password
 And consent_given_at is set to the current server time

Scenario: Duplicate email
 Given a user already exists with email "a@b.com"
 When I POST /api/v1/auth/register with email "a@b.com"
 Then I receive a 409 response
 And no new row is created

Scenario: Weak password rejected
 Given I submit a password shorter than 8 characters
 When I POST /api/v1/auth/register
 Then I receive a 422 response with a validation error
```

| Name | Description | How to build it | Owner | Priority | Day |
|---|---|---|---|---|---|
| User SQLAlchemy model | Define `Users` table: id (uuid), email (unique), password_hash, role, created_at, consent_given_at | Fill in `services/auth/app/models.py`. Use `Column(String, unique=True, nullable=False)` on email so the DB itself rejects duplicates as a backstop. | Musa | P1 | 1 |
| Password hashing helper | `hash_password(plain) -> str` and `verify_password(plain, hashed) -> bool` | Fill in `services/auth/app/core/security.py` using `passlib.context.CryptContext(schemes=["bcrypt"])`. Never write our own hashing. | Musa | P1 | 1 |
| Register schema | Pydantic model validating email format + min password length | `services/auth/app/schemas.py` - `EmailStr` from `pydantic[email]` (already in requirements.txt) + `constr(min_length=8)` | Musa | P1 | 1 |
| Register endpoint | `POST /register` - validate, hash password, insert row, return 201 | Fill in `services/auth/app/routers/auth.py`. Catch `IntegrityError` from the DB unique constraint and return 409, don't let it 500. | Musa | P1 | 1 |
| Alembic migration for Users | Generate the actual migration once the model exists | `alembic revision --autogenerate -m "create users table"` then `alembic upgrade head` inside the auth-service container | Musa | P1 | 1 |

**Tests to write (`services/auth/tests/test_register.py`):**
- `test_register_success_returns_201`
- `test_register_duplicate_email_returns_409`
- `test_register_weak_password_returns_422`
- `test_register_password_is_hashed_not_plaintext` - assert `password_hash != plaintext` in the DB row
- `test_register_sets_consent_given_at`

---

## STEP B - Auth Service: Login & JWT

**User Story:** As a registered user, I want to log in and receive a token, so that I can access protected parts of the platform without re-entering my password every request.

**Scenarios:**
```
Scenario: Successful login
 Given I am registered with email "a@b.com" and password "hunter2000"
 When I POST /api/v1/auth/login with those credentials
 Then I receive a 200 response with an access_token
 And the token, when decoded, contains my user id and role

Scenario: Wrong password
 Given I am registered
 When I POST /api/v1/auth/login with the wrong password
 Then I receive a 401 response
 And no token is returned

Scenario: Token expires
 Given I have a token issued more than JWT_EXPIRY_MINUTES ago
 When I use it on a protected endpoint
 Then I receive a 401 response
```

| Name | Description | How to build it | Owner | Priority | Day |
|---|---|---|---|---|---|
| JWT create/decode helpers | `create_access_token(user_id, role) -> str`, `decode_access_token(token) -> payload` | Fill in `services/auth/app/core/security.py` using `python-jose`, reading `JWT_SECRET_KEY`/`JWT_ALGORITHM`/`JWT_EXPIRY_MINUTES` from `.env` (already stubbed) | Musa | P1 | 1 |
| Login endpoint | `POST /login` - verify password, issue JWT | `services/auth/app/routers/auth.py`. Return the same generic 401 for "user not found" and "wrong password" - don't leak which one it was. | Musa | P1 | 1 |
| `get_current_user` dependency | Reusable FastAPI dependency both services import to decode + validate the token | Put this in `services/auth/app/core/security.py` (auth's own routes) **and** a matching copy in `services/core/app/security.py` (already stubbed) - they must use the identical `JWT_SECRET_KEY`/`JWT_ALGORITHM` | Musa + Mpilo | P1 | 1 |
| Frontend AuthContext | Store the token in memory (React state, not localStorage) after login, attach it to every API call | Fill in `frontend/src/contexts/AuthContext.jsx`; `services/api.js` should read the token via an Axios request interceptor | Anele | P1 | 1 |

**Tests to write (`services/auth/tests/test_login.py`):**
- `test_login_success_returns_token`
- `test_login_wrong_password_returns_401`
- `test_login_nonexistent_user_returns_401` (same message as wrong password)
- `test_token_contains_user_id_and_role`
- `test_expired_token_rejected` - freeze time or set a 0-second expiry and assert 401

---

## STEP C - Core Service: Sectors, Projects & Stage-Gate History (Database Layer)

**User Story:** As the platform, I need a database structure that can hold a project, track which sector it belongs to, and record every stage change with who authorized it.

| Name | Description | How to build it | Owner | Priority | Day |
|---|---|---|---|---|---|
| Sector model | `id, name, description` | `services/core/app/models.py` | Mpilo | P1 | 1 |
| Project model | `id, user_id (fk), sector_id (fk), title, problem_statement, current_stage, license_type, license_note, contact_required, visibility, created_at` | Same file - see `docs/architecture/erd.md` for the exact field list already agreed | Mpilo | P1 | 1 |
| StageGateHistory model | `id, project_id (fk), updated_by (fk), previous_stage, new_stage, verification_notes, transitioned_at` | Same file | Mpilo | P1 | 1 |
| ContactRequest model | `id, project_id (fk), requested_by (fk), message, status, created_at` | Same file | Mpilo | P1 | 2 |
| Seed a Sectors list | A handful of real sectors (e.g. "Health", "Education", "Government Innovation") so the submission form has something to select from | A short seed script or an Alembic data migration, run once after `alembic upgrade head` - Lerato runs it against the models Mpilo defines | Lerato | P1 | 1 |
| Core service migration | Generate + run the migration for all four tables above | `alembic revision --autogenerate -m "core schema"` inside `services/core`, then `alembic upgrade head` | Lerato | P1 | 1 |

**Tests to write (`services/core/tests/test_models.py`):**
- `test_project_requires_valid_sector_id` (FK constraint)
- `test_stage_gate_history_requires_valid_project_id`
- `test_default_current_stage_is_idea` - a newly created project starts at "Idea"

---

## STEP D - Core Service: Submit & List Projects (Controlled Disclosure)

**User Story:** As an Innovator, I want to submit my solution and control how much of it is publicly visible, so that I can be discovered without exposing everything to everyone.

**Scenarios:**
```
Scenario: Submit a project
 Given I am logged in as an Innovator
 When I POST /api/v1/projects with title, sector_id, problem_statement, license_type, contact_required, visibility
 Then I receive a 201 response
 And the project's user_id is my own id, taken from my JWT - not from the request body

Scenario: license_note only accepted with license_type "Other"
 Given I submit license_type "MIT" and a license_note
 When the request is validated
 Then I receive a 422 response

Scenario: Public registry hides full detail
 Given a project exists with a problem_statement
 When an unauthenticated visitor calls GET /api/v1/projects
 Then the response does not include problem_statement
 And it does include title, sector, current_stage, license_type, contact_required

Scenario: Owner sees full detail
 Given I am the owner of a project
 When I call GET /api/v1/projects/{id}
 Then the response includes problem_statement

Scenario: Non-owner, non-official is denied full detail
 Given I am logged in as a different Innovator
 When I call GET /api/v1/projects/{id} on someone else's project
 Then I receive a 403 response
```

| Name | Description | How to build it | Owner | Priority | Day |
|---|---|---|---|---|---|
| ProjectCreate / Summary / Detail schemas | Three separate Pydantic models - don't reuse one schema for all three response shapes | `services/core/app/schemas.py`. `ProjectSummaryResponse` excludes `problem_statement`; `ProjectDetailResponse` includes it. | Mpilo | P1 | 2 |
| `POST /projects` | Create a project owned by the calling user | `services/core/app/routers/projects.py`. Take `user_id` from `get_current_user`, never from the body - this is the ownership guarantee from `docs/ip-and-user-protection-notes.md`. | Mpilo | P1 | 2 |
| `license_note` validation | Reject `license_note` unless `license_type == "Other"` | A Pydantic `@field_validator` on `ProjectCreateRequest` | Mpilo | P1 | 2 |
| `GET /projects` | List all projects, summary fields only, filterable by `sector_id`/`stage` | `services/core/app/routers/projects.py`. This endpoint returns the same shape regardless of who's asking - no auth required. | Mpilo | P1 | 2 |
| `GET /projects/{id}` | Full detail - owner or official/super_admin only | Same file. Check `current_user.id == project.user_id or current_user.role in ("official", "super_admin")`, else 403. | Mpilo | P1 | 2 |
| Frontend submission form | Title, sector dropdown, problem statement, license_type radio, license_note (conditional), contact_required toggle, visibility toggle, consent/disclaimer text | `frontend/src/pages/SubmitProject.jsx` (new file). The disclaimer text is the exact wording from `docs/ip-and-user-protection-notes.md` §3, shortened for UI. | Anele | P1 | 2 |
| Frontend Registry view | Cards showing summary fields only, filter by sector/stage | `frontend/src/pages/Registry.jsx` (new file) | Anele | P1 | 2 |
| Frontend Project Detail view | Full detail page - call `GET /projects/{id}`, handle the 403 case gracefully | `frontend/src/pages/ProjectDetail.jsx` (new file) | Tlhompho | P1 | 2 |

**Tests to write (`services/core/tests/test_projects.py`):**
- `test_create_project_sets_owner_from_jwt_not_body`
- `test_create_project_license_note_rejected_without_other`
- `test_list_projects_excludes_problem_statement`
- `test_get_project_detail_owner_sees_problem_statement`
- `test_get_project_detail_non_owner_gets_403`
- `test_get_project_detail_official_sees_problem_statement`
- `test_filter_projects_by_sector`

---

## STEP E - Core Service: Stage-Gate Advancement

**User Story:** As an Official, I want to move a solution through Idea → Prototype → Pilot → Scale → Implemented, so that there's an accountable record of government engagement with it.

**Scenarios:**
```
Scenario: Valid forward transition
 Given a project is at stage "Idea"
 When an Official PUTs /projects/{id}/stage with new_stage "Prototype"
 Then the response is 200
 And current_stage becomes "Prototype"
 And a StageGateHistory row is created recording who did it

Scenario: Invalid transition rejected
 Given a project is at stage "Idea"
 When an Official PUTs new_stage "Scale" (skipping stages)
 Then the response is 400

Scenario: Non-official cannot advance a stage
 Given I am logged in as an Innovator
 When I PUT /projects/{id}/stage
 Then the response is 403
```

| Name | Description | How to build it | Owner | Priority | Day |
|---|---|---|---|---|---|
| Stage transition rules | A small map of valid `{current_stage: [allowed_next_stages]}` | `services/core/app/models.py` or a new `app/stage_rules.py` - matches `docs/architecture/stage_gate_state.md` | Mpilo | P1 | 2 |
| `PUT /projects/{id}/stage` | Validate transition, update project, insert StageGateHistory row in the same transaction | `services/core/app/routers/projects.py`. Role-check first (`official`/`super_admin`), then transition-validity check. | Mpilo | P1 | 2 |
| Frontend Stage-Gate component | Shows current stage visually (e.g. a stepper), and for officials, a button to advance with a verification-notes field | `frontend/src/components/StageGateStatus.jsx` | Anele | P1 | 2 |

**Tests to write (`services/core/tests/test_stage_gate.py`):**
- `test_valid_transition_updates_stage_and_logs_history`
- `test_skip_stage_transition_returns_400`
- `test_backward_transition_returns_400`
- `test_non_official_cannot_advance_stage`
- `test_history_records_correct_updated_by`

---

## STEP F - Core Service: Contact Requests

**User Story:** As an Official, I want to request contact with a project's team without seeing their personal email, so that innovators keep control over who reaches them.

**Scenarios:**
```
Scenario: Official sends a contact request
 Given I am logged in as an Official
 When I POST /projects/{id}/contact-requests with a message
 Then the response is 201
 And a ContactRequest row is created with status "pending"

Scenario: Innovator sees requests to their project
 Given a ContactRequest exists for my project
 When I GET /projects/{id}/contact-requests as the owner
 Then I see the requester's identity and message

Scenario: Non-owner cannot view contact requests
 Given I am not the project owner
 When I GET /projects/{id}/contact-requests
 Then I receive a 403
```

| Name | Description | How to build it | Owner | Priority | Day |
|---|---|---|---|---|---|
| `POST /projects/{id}/contact-requests` | Create-only for P1 - no accept/decline logic yet | `services/core/app/routers/contact_requests.py` (already stubbed, just needs the body) | Mpilo | P1 | 2 |
| `GET /projects/{id}/contact-requests` | Owner-only list of requests received | Same file | Mpilo | P1 | 2 |
| Frontend: innovator's requests view | A simple list on the innovator's dashboard/project page | `frontend/src/pages/ContactRequests.jsx` (new file) | Tlhompho | P1 | 2 |
| Accept/decline lifecycle | `PUT /contact-requests/{id}` to change status | Same router file | Mpilo | P2 | 2 (if time) |

**Tests to write (`services/core/tests/test_contact_requests.py`):**
- `test_official_can_create_contact_request`
- `test_innovator_can_create_contact_request_returns_403` (only officials/sponsors, per the API contract)
- `test_owner_can_view_their_contact_requests`
- `test_non_owner_gets_403_viewing_contact_requests`

---

## STEP G - Auth Service: Role Management

**User Story:** As a super_admin, I want to promote a user to Official, so that they can review and advance submissions.

| Name | Description | How to build it | Owner | Priority | Day |
|---|---|---|---|---|---|
| `PUT /users/{id}/role` | super_admin-only role change | `services/auth/app/routers/auth.py` | Musa | P2 | 2 |
| Frontend admin dashboard | List of users with a role dropdown | `frontend/src/pages/AdminDashboard.jsx` (new file) | Tlhompho | P2 | 2 |

**Tests to write:**
- `test_super_admin_can_change_role`
- `test_non_admin_cannot_change_role_returns_403`

---

## STEP H - Frontend Shell & Routing

| Name | Description | How to build it | Owner | Priority | Day |
|---|---|---|---|---|---|
| React Router setup | Routes for `/login`, `/register`, `/`, `/projects/:id`, `/submit`, `/admin` | `frontend/src/App.jsx` - replace the placeholder content | Tlhompho | P1 | 1 |
| Login/Register pages | Forms calling the Auth Service through the gateway | `frontend/src/pages/Login.jsx`, `Register.jsx` (new files) | Anele | P1 | 1 |
| Protected route wrapper | Redirect to `/login` if no token; redirect if role doesn't match a route's requirement | `frontend/src/components/ProtectedRoute.jsx` (new file) | Tlhompho | P1 | 1 |
| Toast/error handling | Consistent error display across API failures | MUI `Snackbar`, wired through `services/api.js`'s Axios interceptor | Tlhompho | P2 | 2 |

**Tests to write (`frontend/src/**/*.test.jsx`, Vitest + React Testing Library):**
- `renders login form and submits credentials`
- `redirects unauthenticated user away from /submit`
- `shows validation error on weak password`
- `registry card does not render a "view full details" link for non-authenticated users`

---

## STEP I - Deployment & Demo (Day 3)

| Name | Description | How to build it | Owner | Priority | Day |
|---|---|---|---|---|---|
| Render Postgres | Managed database instance | Render dashboard - copy the connection string into Render's env vars for both services | Lerato | P1 | 3 |
| Deploy all 4 services | Auth, Core, Gateway, Frontend as separate Render services | Each already has a Dockerfile - Render can build straight from them | Lerato | P1 | 3 |
| Production smoke test | Manually walk through register → submit → advance stage on the live URL | Tlhompho | P1 | 3 |
| Cypress E2E suite | Registration+login, submission appears on registry, official advances stage, unauthorized access blocked | New `frontend/cypress/` folder - not yet in the repo, needs `npm install cypress --save-dev` | Tlhompho | P1 | 3 |
| Pitch deck | Problem, Solution, TRL 3 evidence, Architecture (reuse the Mermaid diagrams), User Journey, Go-to-Market | Whole team | P1 | 3 |
| Demo rehearsal | Full run-through on the deployed URL, not localhost | Whole team | P1 | 3 |

---

## STEP J - Legal, Compliance & Accessibility

**User Story:** As any user (innovator, official, or judge reviewing the site), I want the platform to be usable, transparent about data handling, and honest about its claims, so that I can trust and actually use it.

This step turns the compliance checklist from earlier into real, buildable tasks. None of it blocks Steps A–E functionally, but a judge or an official can hit these within seconds of opening the site, so it's worth real time on Day 3 once the core loop works.

| Name | Description | How to build it | Owner | Priority | Day |
|---|---|---|---|---|---|
| Privacy policy page | A real page, not just an internal doc | Turn `docs/popia-notes.md` into `frontend/src/pages/PrivacyPolicy.jsx`, plain language, linked from the footer and the registration form | Tlhompho | P1 | 3 |
| Terms & Conditions page | Explains what submitting means, ties into license_type/contact_required | `frontend/src/pages/Terms.jsx`, linked from the footer and the submission form | Tlhompho | P1 | 3 |
| Registration consent checkbox | Make `consent_given_at` (already a backend field) a real, visible checkbox with a link to the privacy policy | Add to the Register form built in Step H | Anele | P1 | 2 |
| Colour contrast check | Make sure text is readable against its background everywhere | Run the built UI through a free contrast checker (e.g. WebAIM) once pages exist; fix anything under WCAG AA (4.5:1 for body text) | Anele | P1 | 3 |
| Alt text on images | Every `<img>` has a meaningful `alt` attribute | Sweep the frontend once components are built; empty `alt=""` is fine for purely decorative images | Anele | P1 | 3 |
| Keyboard-friendly forms | Tab order works, every input/button is reachable without a mouse | Manual check: Tab through Login, Register, and Submit forms | Anele | P2 | 3 |
| Clear button labels | No icon-only buttons without a text label or `aria-label` | Sweep during Step H/D frontend build | Anele | P2 | 2 |
| Check copyright on prototype/ images | The old UXPin-exported `prototype/` folder may include stock/placeholder images not cleared for use | Quick manual review before demo day; swap or remove anything uncertain | Tlhompho | P1 | 3 |
| Check 3rd-party embeds | Confirm what's actually being pulled from outside (e.g. Google Fonts in `frontend/index.html`) | Review `frontend/index.html` and `theme.js`; if only Google Fonts, note it in the privacy policy, nothing else needed | Tlhompho | P2 | 3 |
| Remove unsupported claims | Re-read README/pitch copy for anything overstating what's built (e.g. "POPIA-compliant" vs "POPIA-aligned, self-assessed") | Whole team, final pass Day 3 | All | P1 | 3 |
| Real contact/business details | Since there's no registered company, add a "Built by Team Fantastic 4" section with a real contact method (team email or GitHub) | Footer component | Tlhompho | P2 | 3 |
| Cookies/tracking policy | **Only needed if we add analytics or tracking cookies.** If the site sets no cookies beyond the JWT held in memory, skip this entirely - don't add a cookie banner for nothing to disclose. | Confirm as a team: are we adding any analytics? If no, mark this task done-by-default. | All | - | - |

---

## STEP K - Repo Housekeeping

| Name | Description | How to build it | Owner | Priority | Day |
|---|---|---|---|---|---|
| Resolve `prototype/` vs `frontend/` | Decide: is `prototype/` archived reference only, or does `frontend/` adopt specific screens from it? | Team discussion, then update the note already sitting in `README.md` | All | P1 | 1 |
| Add a repo `LICENSE` file | Separate from `license_type` on individual project submissions - this is the license for the SiyaPhambili codebase itself | Check if GKHack26 requires one; if so, MIT is the simplest default for a hackathon repo | Lerato | P2 | 1 |
| Fill in README's "Local Development Setup" | Still a placeholder comment | Add the actual `git clone` → `cp .env.example .env` → `make up` steps | Lerato | P2 | 1 |
| Auth service migration ownership | Decide: does `auth-service` get its own Alembic setup, or does `core-service`'s migration manage the shared database including `Users`? | Team decision - flagged as an open gap; resolve before Step A's migration task | Musa + Lerato | P1 | 1 |

---

## STEP L - Pitch Deck & Demo Video (Slide by Slide)

**User Story:** As the judging panel, I want a clear, evidence-backed pitch with real slides, a short demo video, and an honest sales pitch, so that I can assess SiyaPhambili fairly against the "Build For Use" theme and the other 53 teams in the same Gov Innovation Platform challenge.

**Confirmed slide list, per the official Sonke guidelines** (10+ slides, fewer for Round 1): Problem Statement (with charts/data - real source or lived experience), Solution offering, User Journey Story, Technological Architecture, Competitive Analysis, Data Privacy Policies. The TRL 3 framing used elsewhere in this doc is not one of the official criteria by that name - keep it as our own internal quality bar (it's our proxy for the "Technical Implementation" criterion), not a slide judges are told to expect.

| Name | Description | How to build it | Owner | Priority | Day |
|---|---|---|---|---|---|
| Problem Statement slide | The siloed civic-innovation visibility gap, with a chart/stat and a credible source or lived experience | Pull straight from the Day 1 mentor-refined version (Step 0) - don't rewrite it separately | Mpilo | P1 | 3 |
| Solution slide | SiyaPhambili in one sentence, then the three-pillar framing: discoverability, controlled disclosure, provenance | Reuse the framing from `docs/ip-and-user-protection-notes.md` | Mpilo | P1 | 3 |
| User Journey Story slide | Walk through one persona (e.g. an Official) end to end | Base it on the Gherkin scenarios already written in Steps D/E/F | Anele | P1 | 3 |
| Technological Architecture slide | The real system diagram | Reuse `docs/architecture/network_diagram.md` and `c4-model.md` Mermaid diagrams directly - don't redraw from scratch | Tlhompho | P1 | 3 |
| Competitive Analysis slide | Name what else exists (other civic-tech registries, manual government processes, or literally some of the other 53 teams in this same challenge track) and say concretely why controlled disclosure + contact requests + provenance is different | This is not optional polish - with 53 teams in the same challenge category, this slide is doing real work | Mpilo | P1 | 3 |
| Data Privacy Policies slide | Summarize `docs/popia-notes.md` for a slide audience | Condense, don't paste the whole doc | Anele | P1 | 3 |
| Demo video (<90s) | Screen recording of register → submit → discover → advance stage, or our best working slice of that | Record by end of Day 2, not Sunday morning - see Step 0 | Tlhompho | P1 | 2 (buffer) / 3 (hard cutoff) |
| Sales pitch script (3 min) | Separate from the slide deck - problem (20s, evidence) → solution + how it works → cost/ask → differentiation → live demo (50s) | Write and rehearse this as its own script; it's judged as a sale, not a technical walkthrough | Whoever pitches | P1 | 3 |
| Known limitations slide (optional but strong) | Name what's out of scope, per `docs/ip-and-user-protection-notes.md`'s "what this does NOT protect against" section | Judges respect teams that name their own trade-offs | Mpilo | P2 | 3 |
| Quantum tech bonus mention (optional, +5) | Sonke awards up to 5 bonus points for outlining or implementing quantum tech integration - a named criterion we hadn't accounted for | Only chase this once Steps A-I are solid; even a plausible, honest one-line "where quantum could fit our roadmap" note on the Known Limitations or Architecture slide may be enough for partial credit - don't overclaim | Mpilo | P3 | 3 |

---

## Cross-cutting: internal quality bar (TRL 3 framing maps to "Technical Implementation")

This section uses TRL 3 as our own useful internal target for "does the core function actually work," borrowed from general hackathon judging norms. It's not a named line item in Sonke's official criteria (see Step 0), but it's a reasonable proxy for how we'll score on "Technical Implementation" - so it's still worth optimising for, just not worth presenting to judges as if it's their own rubric item. The critical function it points at is still the right one to aim for: **an innovator can register a solution with their own controlled-disclosure settings, and an official can discover, review, and formally advance it, with every step attributable.** If Steps A, B, C, D, and E are done, that's true. Step F (contact requests) makes the pitch stronger but isn't required for this internal bar - don't let it eat time from A–E, or from Step 0's hard deadlines.

## Suggested day-by-day sequencing

- **Day 1 (25 Sept):** Steps A, B, C, H, plus Step K's two decisions (prototype/ vs frontend/, auth migration ownership) - settle these *before* lunch, they block other work. Also: the 19:00 mentor session from Step 0 needs a draft problem statement ready beforehand. By end of day, register/login work end-to-end and the DB schema is migrated.
- **Day 2 (26 Sept):** Steps D, E, F, G - by end of day, the full submit → discover → advance → contact-request loop works. Slot in Step J's registration consent checkbox and clear-button-labels pass while frontend forms are already open.
- **Day 3 (27 Sept):** Step I (deploy, test, rehearse, submit), Step J's remaining items (privacy/T&Cs pages, accessibility sweep, copyright/claims check), Step L (pitch deck). This is a full day even before counting deck-building - start the deploy step early, not after lunch.
