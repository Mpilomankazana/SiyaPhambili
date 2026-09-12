````mermaid
graph TD
    subgraph External Network
        UI[React Frontend Client]
    end

    subgraph Docker Compose Internal Network
        GW[Nginx API Gateway :8000]
        Auth[Auth Service FastAPI :8001]
        Core[Core Registry Service FastAPI :8002]
        DB[(PostgreSQL Database :5432)]
    end

    UI -- HTTP Requests --> GW
    GW -- /api/v1/auth/* --> Auth
    GW -- /api/v1/projects/* --> Core
    GW -- /api/v1/stages/* --> Core
    Auth -- Read/Write Credentials --> DB
    Core -- Read/Write Registry Data --> DB
````
