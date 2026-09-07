# 8. Use SQLAlchemy and Alembic

**Status:** Accepted
**Date:** 2026-09-06

**Context:** Interacting with the PostgreSQL database using raw SQL queries can lead to messy, hard-to-maintain code during rapid development.
**Decision:** We will use SQLAlchemy as our Object-Relational Mapper (ORM) and Alembic for database migrations.

**Consequences:** 
* Developers can interact with database tables using clean Python classes.
* We can safely alter the database schema during the hackathon without dropping data.