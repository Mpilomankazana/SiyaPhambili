# 3. Use PostgreSQL for Database

**Status:** Accepted
**Date:** 2026-09-06

**Context:** To prove technical viability and move away from hardcoded mock data, we need a reliable relational database to track the hackathon pipeline.
**Decision:** We will use PostgreSQL, orchestrated locally via Docker.

**Consequences:** 
* Ensures strong data integrity and relational mapping.
* Integrates seamlessly with our Python backend via SQLAlchemy.