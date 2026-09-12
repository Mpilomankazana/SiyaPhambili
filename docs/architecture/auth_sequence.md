````mermaid
sequenceDiagram
    participant UI as React Frontend
    participant GW as Nginx Gateway
    participant Auth as Auth Service (FastAPI)
    participant DB as PostgreSQL

    UI->>GW: POST /api/v1/auth/login (email, password)
    GW->>Auth: Forward to Internal Port (8001)
    Auth->>DB: Query User by Email
    DB-->>Auth: Return User Record & Password Hash
    
    Auth->>Auth: Verify Password Hash
    
    alt Valid Credentials
        Auth->>Auth: Generate Signed JWT
        Auth-->>GW: 200 OK + {access_token, role}
        GW-->>UI: 200 OK + Token Payload
        UI->>UI: Store JWT in AuthContext
    else Invalid Credentials
        Auth-->>GW: 401 Unauthorized
        GW-->>UI: 401 Unauthorized
        UI->>UI: Display Error Message
    end

