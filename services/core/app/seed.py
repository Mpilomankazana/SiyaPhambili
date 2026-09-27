import sys
import os

# Dynamically append the parent directory to Python's path to resolve absolute imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.database import DATABASE_URL
from app.models import Project, Sector

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

DEMO_INNOVATOR_EMAIL = "innovator@siyaphambili.org"
INITIAL_SECTORS = [
    ("Agriculture", "Innovations in farming, food security, and agricultural supply chains."),
    ("Education", "Solutions for ed-tech, skills development, and accessible learning."),
    ("Healthcare", "Digital health records, medical access, and wellness technologies."),
    ("Technology", "Core software, connectivity, and digital infrastructure."),
    ("Community Development", "Civic engagement, local governance, and community empowerment."),
]
DEMO_PROJECTS = [
    {
        "title": "Mahlathi Water Watch",
        "sector": "Agriculture",
        "stage": "Idea",
        "description": "A community water-alert service that helps smallholder farmers plan irrigation and protect crops.",
        "problem": "Smallholder farmers often receive local water alerts too late to protect crops.",
        "solution": "Combine local rainfall, dam-level, and community reports into clear SMS and mobile alerts for participating farmers.",
        "license": "Other",
        "contact_required": True,
    },
    {
        "title": "LearnLink Offline",
        "sector": "Education",
        "stage": "Prototype",
        "description": "Offline-first learning resources designed for schools with unreliable internet access.",
        "problem": "Learners in low-connectivity communities need access to lessons when the internet is unavailable.",
        "solution": "Cache curriculum-aligned lessons on low-cost devices and synchronize learner progress when connectivity returns.",
        "license": "MIT",
        "contact_required": False,
    },
    {
        "title": "Clinic Queue Companion",
        "sector": "Healthcare",
        "stage": "Pilot",
        "description": "A simple queue companion that helps community-clinic patients plan their visit.",
        "problem": "Patients at busy community clinics need clearer information about queue progress and return times.",
        "solution": "Give clinics a lightweight dashboard to share queue estimates and notify patients when their turn approaches.",
        "license": "Other",
        "contact_required": True,
    },
    {
        "title": "WardWorks Civic Reports",
        "sector": "Community Development",
        "stage": "Scale",
        "description": "A transparent civic-reporting channel for tracking local infrastructure issues through resolution.",
        "problem": "Residents need a reliable way to report local infrastructure issues and follow their resolution.",
        "solution": "Route verified reports to municipal teams, publish status updates, and let residents follow progress by reference number.",
        "license": "All Rights Reserved",
        "contact_required": True,
    },
]


def seed_data():
    db = SessionLocal()
    try:
        existing_sectors = {sector.name for sector in db.query(Sector).all()}
        for name, description in INITIAL_SECTORS:
            if name not in existing_sectors:
                db.add(Sector(name=name, description=description))
        db.flush()

        innovator_id = db.execute(
            text("SELECT id FROM users WHERE email = :email"),
            {"email": DEMO_INNOVATOR_EMAIL},
        ).scalar_one_or_none()
        if innovator_id is None:
            raise RuntimeError("Demo innovator account missing; run auth-service seed first.")

        sectors = {sector.name: sector.id for sector in db.query(Sector).all()}
        for project_data in DEMO_PROJECTS:
            exists = db.query(Project).filter(
                Project.user_id == str(innovator_id),
                Project.title == project_data["title"],
            ).first()
            if exists:
                continue
            db.add(Project(
                user_id=str(innovator_id),
                sector_id=sectors[project_data["sector"]],
                title=project_data["title"],
                description=project_data["description"],
                problem_statement=project_data["problem"],
                solution=project_data["solution"],
                current_stage=project_data["stage"],
                license_type=project_data["license"],
                contact_required=project_data["contact_required"],
                visibility="public",
            ))

        db.commit()
        print("Sectors and demo projects seeded (existing records preserved).")
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_data()