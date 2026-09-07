# SiyaPhambili — API & Component Contracts

This document defines the strict REST API contracts between the React frontend and the FastAPI backend. All JSON payloads must match these structures exactly to ensure seamless integration.

## Base URL
All API requests in the local development environment will be routed to:
`http://localhost:8000/api/v1`

---

## 1. Project Registry Endpoints

### 1.1. Retrieve All Projects (The Registry)
*   **Endpoint:** `GET /projects`
*   **Purpose:** Fetches a list of all hackathon solutions.
*   **Query Parameters:** `?sector={sector}&stage={stage}` (Optional filtering)
*   **Response Payload (200 OK):**
    ```json
    {
      "status": "success",
      "data": [
        {
          "id": "uuid",
          "name": "SiyaPhambili",
          "team_name": "Fantastic_four",
          "sector": "Gov Innovation",
          "current_stage": "Prototype",
          "created_at": "2026-09-25T16:00:00Z"
        }
      ]
    }
    ```

### 1.2. Register a New Solution
*   **Endpoint:** `POST /projects`
*   **Purpose:** Submits a new hackathon project to the registry.
*   **Request Payload:**
    ```json
    {
      "name": "SiyaPhambili",
      "team_name": "Fantastic_four",
      "description": "Civic Innovation Bridge Platform",
      "sector": "Gov Innovation"
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
*   **Error Codes:** `422 Unprocessable Entity` (Missing required fields).

---

## 2. Stage-Gate Pipeline Endpoints

### 2.1. Advance Project Stage
*   **Endpoint:** `PUT /projects/{id}/stage`
*   **Purpose:** Updates the technology readiness/implementation stage of a solution (Idea → Prototype → Pilot → Scale → Implemented).
*   **Request Payload:**
    ```json
    {
      "new_stage": "Pilot",
      "approved_by": "Government Official ID",
      "notes": "Prototype validated at BCX HQs."
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
*   **Error Codes:** `400 Bad Request` (Invalid stage transition), `404 Not Found` (Project ID does not exist).