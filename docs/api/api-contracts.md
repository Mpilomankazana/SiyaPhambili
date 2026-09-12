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

### 2.1. Retrieve All Projects (The Registry)
*   **Endpoint:** `GET /projects`
*   **Purpose:** Fetches a list of all hackathon solutions.
*   **Query Parameters:** `?sector_id={id}&stage={stage}` (Optional filtering)
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
          "created_at": "2026-09-25T16:00:00Z"
        }
      ]
    }
    ```

### 2.2. Register a New Solution
*   **Endpoint:** `POST /projects`
*   **Purpose:** Submits a new hackathon project to the registry.
*   **Headers:** `Authorization: Bearer <innovator_jwt>`
*   **Request Payload:**
    ```json
    {
      "title": "SiyaPhambili",
      "sector_id": 1,
      "problem_statement": "Siloed civic innovation projects lack visibility."
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

### 2.3. Advance Project Stage
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