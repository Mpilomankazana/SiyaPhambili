import sys
import os

# Dynamically append the parent directory to Python's path to resolve absolute imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models import User

# Connect to the internal Docker network database
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://siyaphambili_admin:hackathon_secret_2026@siyaphambili_db:5432/siyaphambili_db"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def seed_data():
    db = SessionLocal()
    try:
        # Check if the demo user already exists to prevent duplicate errors
        existing_user = db.query(User).filter(User.email == "admin@siyaphambili.org").first()
        
        if not existing_user:
            print("Seeding demo admin user...")
            demo_user = User(
                email="admin@siyaphambili.org",
                password_hash="mock_hashed_password_for_now",
                name="Hackathon Judge",
                role="admin"
            )
            db.add(demo_user)
            db.commit()
            print("Demo user seeded successfully!")
        else:
            print("Demo user already exists. Skipping seed.")
    except Exception as e:
        print(f"An error occurred during seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Starting database seed process...")
    seed_data()