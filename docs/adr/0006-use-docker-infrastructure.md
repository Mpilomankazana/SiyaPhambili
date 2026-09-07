# 6. Use Docker for Local Infrastructure

**Status:** Accepted
**Date:** 2026-09-06

**Context:** The team needs a consistent way to run the PostgreSQL database locally without conflicting with different operating systems (Windows, Linux, macOS).
**Decision:** We will use Docker and Docker Compose to containerize our local infrastructure.

**Consequences:** 
* Guarantees that "it works on my machine" applies to the entire team.
* Requires team members to install Docker Desktop or Docker Engine locally.