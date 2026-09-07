# SiyaPhambili — System Architecture (C4 Model)

This document outlines the visual software architecture for **SiyaPhambili** using the C4 Model approach (Context, Containers, Components). Diagrams are written using native Mermaid syntax and render directly on GitHub.

---

## Level 1: System Context Diagram

The System Context diagram illustrates how SiyaPhambili fits into the broader ecosystem, identifying the primary user roles and their interactions with the platform.

```mermaid
flowchart TD
    subgraph Users
        Citizen[Citizen / Public User<br>Discovers solutions and tracks public delivery]
        Official[Government Official / Sponsor<br>Identifies innovations and reviews stage gates]
        Innovator[Hackathon Innovator<br>Registers and updates project progress]
    end

    System[SiyaPhambili Platform<br>Civic Innovation Registry & Stage-Gate Tracker]

    Citizen -->|Searches registry & views progress| System
    Official -->|Reviews solutions & updates stage gates| System
    Innovator -->|Submits project details & updates status| System
```

---

## Level 2: Container Diagram

The Container diagram zooms into the SiyaPhambili system boundary to display the high-level software containers, their responsibilities, and how they communicate over network protocols.

```mermaid
flowchart LR
    subgraph SiyaPhambili Boundary
        Frontend[React Single Page Application<br>Material-UI & Axios<br>Consumer-facing UI for browsing and management]
        Backend[FastAPI Application<br>Python / Uvicorn<br>Exposes REST endpoints & enforces stage-gate logic]
        Database[(PostgreSQL Database<br>Relational storage for projects, users, & audits)]
    end

    ClientBrowser[Client Web Browser] -->|HTTPS| Frontend
    Frontend -->|JSON / REST over HTTP| Backend
    Backend -->|SQL via SQLAlchemy ORM| Database
```

---

## Level 3: Component Diagram (FastAPI Backend)

The Component diagram breaks down the internal structure of the FastAPI backend application container into its modular parts.

```mermaid
flowchart TD
    subgraph FastAPI Container
        Router[API Routers<br>Registry, Projects, Stages, Auth]
        Service[Business Logic & Stage-Gate Services<br>Validation & state transition rules]
        ORM[Data Access Layer<br>SQLAlchemy Models & Alembic Migrations]
    end

    Client[Frontend HTTP Requests] --> Router
    Router --> Service
    Service --> ORM
    ORM --> DB[(PostgreSQL Database)]
```

---

## Architecture Summary

| Container | Technology | Responsibility |
| :--- | :--- | :--- |
| **Frontend** | React, Material-UI, Axios | Delivers an accessible, consumer-facing interface for registry browsing and tracking. |
| **Backend API** | Python, FastAPI | Serves REST endpoints, validates stage transitions, and powers automatic Swagger documentation. |
| **Database** | PostgreSQL | Persists relational data models for projects, sectors, and stage-gate progression. |
| **Container Engine** | Docker Compose | Standardizes the local PostgreSQL runtime environment across all developer machines. |