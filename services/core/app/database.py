import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Connect to the internal Docker network database
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://siyaphambili_admin:hackathon_secret_2026@siyaphambili_db:5432/siyaphambili_db"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()