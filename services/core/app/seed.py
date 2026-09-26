import sys
import os

# Dynamically append the parent directory to Python's path to resolve absolute imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base, DATABASE_URL
from app.models import Sector

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def seed_sectors():
    db = SessionLocal()
    try:
        # Define the exact seed data from the MVP roadmap
        initial_sectors = [
            {"name": "Agriculture", "description": "Innovations in farming, food security, and agricultural supply chains."},
            {"name": "Education", "description": "Solutions for ed-tech, skills development, and accessible learning."},
            {"name": "Healthcare", "description": "Digital health records, medical access, and wellness technologies."},
            {"name": "Technology", "description": "Core software, connectivity, and digital infrastructure."},
            {"name": "Community Development", "description": "Civic engagement, local governance, and community empowerment."}
        ]

        # Check if the database is already seeded to prevent duplicate entries
        existing_sectors = db.query(Sector).count()
        
        if existing_sectors == 0:
            print("Seeding initial sectors...")
            for sector_data in initial_sectors:
                new_sector = Sector(
                    name=sector_data["name"],
                    description=sector_data["description"]
                )
                db.add(new_sector)
            
            db.commit()
            print("Sectors seeded successfully!")
        else:
            print(f"Database already contains {existing_sectors} sectors. Skipping seed.")
            
    except Exception as e:
        print(f"An error occurred during seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Starting core database seed process...")
    seed_sectors()