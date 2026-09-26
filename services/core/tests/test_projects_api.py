import os
from datetime import datetime, timedelta, timezone
from uuid import uuid4

os.environ.setdefault("JWT_SECRET_KEY", "test-only-core-secret")
os.environ.setdefault("DATABASE_URL", "sqlite://")

from fastapi.testclient import TestClient
from jose import jwt
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app
from app.models import ContactRequest, Project, Sector, StageGateHistory


TEST_SECRET = os.environ["JWT_SECRET_KEY"]


def make_token(role: str, subject: str | None = None) -> str:
    return jwt.encode(
        {
            "sub": subject or str(uuid4()),
            "role": role,
            "exp": datetime.now(timezone.utc) + timedelta(minutes=5),
        },
        TEST_SECRET,
        algorithm="HS256",
    )


def auth_header(role: str, subject: str | None = None) -> dict[str, str]:
    return {"Authorization": f"Bearer {make_token(role, subject)}"}


def test_core_mvp_project_and_contact_flows():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSession = sessionmaker(autoflush=False, autocommit=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    def override_get_db():
        db = TestingSession()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    owner_id = str(uuid4())
    official_id = str(uuid4())

    try:
        with TestingSession() as db:
            sector = Sector(name="Education", description="Learning")
            db.add(sector)
            db.commit()
            db.refresh(sector)
            sector_id = sector.id

        with TestClient(app) as client:
            assert client.get("/sectors").json()["data"][0]["name"] == "Education"

            payload = {
                "title": "Registry demo",
                "sector_id": sector_id,
                "problem_statement": "Solutions are hard to discover.",
                "license_type": "Other",
                "license_note": "Contact the team for reuse terms",
                "contact_required": True,
                "visibility": "public",
            }
            created = client.post("/", json=payload, headers=auth_header("innovator", owner_id))
            assert created.status_code == 201, created.text
            project_id = created.json()["project_id"]

            listing = client.get("/")
            assert listing.status_code == 200
            assert "problem_statement" not in listing.json()["data"][0]

            public_detail = client.get(f"/{project_id}")
            assert public_detail.status_code == 200
            assert "problem_statement" not in public_detail.json()["data"]

            owner_detail = client.get(
                f"/{project_id}", headers=auth_header("innovator", owner_id)
            )
            assert owner_detail.json()["data"]["problem_statement"] == payload["problem_statement"]

            denied_transition = client.put(
                f"/{project_id}/stage",
                json={"new_stage": "Prototype"},
                headers=auth_header("innovator", owner_id),
            )
            assert denied_transition.status_code == 403

            transition = client.put(
                f"/{project_id}/stage",
                json={"new_stage": "Prototype", "verification_notes": "Verified"},
                headers=auth_header("official", official_id),
            )
            assert transition.status_code == 200, transition.text
            assert transition.json()["current_stage"] == "Prototype"

            invalid_transition = client.put(
                f"/{project_id}/stage",
                json={"new_stage": "Scale"},
                headers=auth_header("official", official_id),
            )
            assert invalid_transition.status_code == 400

            contact = client.post(
                f"/{project_id}/contact-requests",
                json={"message": "We would like to discuss a pilot."},
                headers=auth_header("official", official_id),
            )
            assert contact.status_code == 201

            owner_requests = client.get(
                f"/{project_id}/contact-requests", headers=auth_header("innovator", owner_id)
            )
            assert owner_requests.status_code == 200
            assert owner_requests.json()["data"][0]["requested_by"] == official_id

            other_user_requests = client.get(
                f"/{project_id}/contact-requests", headers=auth_header("innovator")
            )
            assert other_user_requests.status_code == 403

        with TestingSession() as db:
            assert db.query(StageGateHistory).count() == 1
            assert db.query(ContactRequest).count() == 1
            project = db.query(Project).one()
            assert project.user_id == owner_id
            assert project.current_stage == "Prototype"
    finally:
        app.dependency_overrides.clear()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()