import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models import User
from app.core.security import hash_password

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://siyaphambili_admin:hackathon_secret_2026@siyaphambili_db:5432/siyaphambili_db"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

DEMO_PASSWORD = "password123"

DEMO_USERS = [
    {"email": "admin@siyaphambili.org", "name": "Hackathon Judge", "role": "admin"},
    {"email": "official@siyaphambili.org", "name": "Demo Official", "role": "official"},
]


def seed_data():
    db = SessionLocal()
    try:
        for u in DEMO_USERS:
            existing_user = db.query(User).filter(User.email == u["email"]).first()
            if existing_user:
                print(f"{u['email']} already exists. Skipping.")
                continue
            print(f"Seeding {u['role']}: {u['email']}...")
            demo_user = User(
                email=u["email"],
                password_hash=hash_password(DEMO_PASSWORD),
                name=u["name"],
                role=u["role"],
            )
            db.add(demo_user)
        db.commit()
        print("Seeding complete.")
    except Exception as e:
        print(f"An error occurred during seeding: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    print("Starting database seed process...")
    seed_data()