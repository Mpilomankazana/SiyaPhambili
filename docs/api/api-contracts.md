# SiyaPhambili — API & Component Contracts

This document defines the strict REST API contracts between the React frontend and the FastAPI backend microservices. All requests are routed through the Nginx API Gateway.

## Base URL
All API requests in the local development environment will be routed to:
`http://localhost:8000/api/v1`

---

## 1. Authentication Service Endpoints

### 1.1. User Registration
*   **Endpoint:** `POST /auth/register`
*   **Purpose:** Creates a new user account.
*   **POPIA note:** registration must present consent copy (see `docs/popia-notes.md`); on submit, the service sets `Users.consent_given_at` server-side — it is not client-supplied.
*   **Request Payload:**
    ```json
    {
      "email": "innovator@example.com",
      "password": "securepassword123"
    }
    ```
*   **Response Payload (201 Created):**
    ```json
    {
      "status": "success",
      "data": {
        "id": "uuid",
        "email": "innovator@example.com",
        "role": "innovator"
      }
    }
    ```

### 1.2. User Login
*   **Endpoint:** `POST /auth/login`
*   **Purpose:** Authenticates a user and issues a JWT.
*   **Request Payload:**
    ```json
    {
      "email": "innovator@example.com",
      "password": "securepassword123"
    }
    ```
*   **Response Payload (200 OK):**
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "token_type": "bearer",
      "role": "innovator"
    }
    ```

### 1.3. Update User Role (Admin Only)
*   **Endpoint:** `PUT /auth/users/{id}/role`
*   **Purpose:** Allows a super_admin to elevate users to officials.
*   **Headers:** `Authorization: Bearer <super_admin_jwt>`
*   **Request Payload:**
    ```json
    {
      "role": "official"
    }
    ```
*   **Response Payload (200 OK):**
    ```json
    {
      "status": "success",
      "message": "User role updated successfully."
    }
    ```

---

## 2. Core Registry & Stage-Gate Endpoints

### 2.1. Retrieve All Projects (The Registry — Summary View)
*   **Endpoint:** `GET /projects`
*   **Purpose:** Fetches a list of all hackathon solutions.
*   **Query Parameters:** `?sector_id={id}&stage={stage}` (Optional filtering)
*   **Visibility rule:** this endpoint always returns **summary fields only**, regardless of caller — no `problem_statement`, no team info. It lets the registry stay publicly discoverable without publishing every team's full write-up to anyone who scrapes the endpoint. See `docs/ip-and-user-protection-notes.md`.
*   **Response Payload (200 OK):**
    ```json
    {
      "status": "success",
      "data": [
        {
          "id": "uuid",
          "title": "SiyaPhambili",
          "sector_id": 1,
          "current_stage": "Prototype",
          "license_type": "Other",
          "contact_required": true,
          "created_at": "2026-09-25T16:00:00Z"
        }
      ]
    }
    ```

### 2.2. Retrieve a Single Project (Detail View)
*   **Endpoint:** `GET /projects/{id}`
*   **Purpose:** Full detail for one solution.
*   **Visibility rule:** an unauthenticated or `innovator`-role caller who is **not** the owner gets a `403` (or the summary fields only — pick one and keep it consistent; `403` is simpler to reason about). The project's own owner, or any `official`/`super_admin`, gets the full record:
*   **Response Payload (200 OK):**
    ```json
    {
      "status": "success",
      "data": {
        "id": "uuid",
        "title": "SiyaPhambili",
        "sector_id": 1,
        "current_stage": "Prototype",
        "license_type": "Other",
        "license_note": "Contact team for reuse terms",
        "contact_required": true,
        "problem_statement": "Siloed civic innovation projects lack visibility.",
        "created_at": "2026-09-25T16:00:00Z"
      }
    }
    ```

### 2.3. Register a New Solution
*   **Endpoint:** `POST /projects`
*   **Purpose:** Submits a new hackathon project to the registry.
*   **Headers:** `Authorization: Bearer <innovator_jwt>`
*   **Ownership:** the authenticated user's id is taken from the verified JWT and stored as `user_id` — never accepted from the request body. Only this user (or an official/super_admin) may later modify the project.
*   **`license_note` rule:** ignored/rejected unless `license_type` is `"Other"`.
*   **Request Payload:**
    ```json
    {
      "title": "SiyaPhambili",
      "sector_id": 1,
      "problem_statement": "Siloed civic innovation projects lack visibility.",
      "license_type": "Other",
      "license_note": "Contact team for reuse terms",
      "contact_required": true,
      "visibility": "public"
    }
    ```
*   **Response Payload (201 Created):**
    ```json
    {
      "status": "success",
      "message": "Project registered successfully.",
      "project_id": "uuid"
    }
    ```
*   **Error Codes:** `422 Unprocessable Entity` (Missing required fields, or `license_note` set without `license_type: "Other"`).

### 2.4. Advance Project Stage
*   **Endpoint:** `PUT /projects/{id}/stage`
*   **Purpose:** Updates the technology readiness/implementation stage of a solution.
*   **Headers:** `Authorization: Bearer <official_jwt>`
*   **Request Payload:**
    ```json
    {
      "new_stage": "Pilot",
      "verification_notes": "Prototype validated at BCX HQs."
    }
    ```
*   **Response Payload (200 OK):**
    ```json
    {
      "status": "success",
      "current_stage": "Pilot",
      "updated_at": "2026-09-26T10:00:00Z"
    }
    ```
*   **Error Codes:** `401 Unauthorized` (Missing token), `403 Forbidden` (User is not an official), `400 Bad Request` (Invalid stage transition).

### 2.5. Request Contact With a Project's Team
*   **Endpoint:** `POST /projects/{id}/contact-requests`
*   **Purpose:** Lets an official/sponsor request an introduction **without** the platform exposing the innovator's raw email address publicly. The innovator sees the request (and requester's identity) and chooses whether to respond — the platform never auto-discloses contact details. Most relevant when `contact_required: true`, but available regardless of `license_type`.
*   **Headers:** `Authorization: Bearer <official_jwt>`
*   **Request Payload:**
    ```json
    {
      "message": "We'd like to discuss piloting this in our department."
    }
    ```
*   **Response Payload (201 Created):**
    ```json
    {
      "status": "success",
      "message": "Contact request sent to the project owner."
    }
    ```
