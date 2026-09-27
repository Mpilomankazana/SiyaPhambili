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
                "description": "A civic service to make innovation easier to discover.",
                "problem_statement": "Solutions are hard to discover.",
                "solution": "Publish and progress projects through an accountable registry.",
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
            assert "solution" not in listing.json()["data"][0]
            assert listing.json()["data"][0]["description"] == payload["description"]
            assert len(client.get("/?search=discover").json()["data"]) == 1
            assert len(client.get(f"/?sector_id={sector_id}&stage=Idea").json()["data"]) == 1

            public_detail = client.get(f"/{project_id}")
            assert public_detail.status_code == 200
            assert "problem_statement" not in public_detail.json()["data"]

            owner_detail = client.get(
                f"/{project_id}", headers=auth_header("innovator", owner_id)
            )
            assert owner_detail.json()["data"]["problem_statement"] == payload["problem_statement"]
            assert owner_detail.json()["data"]["solution"] == payload["solution"]

            owned_projects = client.get("/mine", headers=auth_header("innovator", owner_id))
            assert owned_projects.status_code == 200
            assert owned_projects.json()["data"][0]["id"] == project_id

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

            stage_history = client.get(f"/{project_id}/stage-history")
            assert stage_history.status_code == 200
            assert stage_history.json()["data"][0]["updated_by"] == official_id
            assert stage_history.json()["data"][0]["verification_notes"] == "Verified"

            invalid_transition = client.put(
                f"/{project_id}/stage",
                json={"new_stage": "Scale"},
                headers=auth_header("official", official_id),
            )
            assert invalid_transition.status_code == 400

            contact = client.post(
                f"/{project_id}/contact-requests",
                json={
                    "requester_name": "Public Partner",
                    "requester_email": "partner@example.org",
                    "message": "We would like to discuss a pilot.",
                    "consent_accepted": True,
                },
            )
            assert contact.status_code == 201

            missing_contact_consent = client.post(
                f"/{project_id}/contact-requests",
                json={
                    "requester_name": "No Consent",
                    "requester_email": "no-consent@example.org",
                    "message": "Please call me.",
                },
            )
            assert missing_contact_consent.status_code == 422

            missing_project_contact = client.post(
                f"/{uuid4()}/contact-requests",
                json={
                    "requester_name": "Public Partner",
                    "requester_email": "partner@example.org",
                    "message": "We would like to discuss a pilot.",
                    "consent_accepted": True,
                },
            )
            assert missing_project_contact.status_code == 404

            official_contact = client.post(
                f"/{project_id}/contact-requests",
                json={"message": "We can support the next stage."},
                headers=auth_header("official", official_id),
            )
            assert official_contact.status_code == 201

            owner_requests = client.get(
                f"/{project_id}/contact-requests", headers=auth_header("innovator", owner_id)
            )
            assert owner_requests.status_code == 200
            requests = owner_requests.json()["data"]
            official_request = next(item for item in requests if item["requested_by"] == official_id)
            assert official_request["message"] == "We can support the next stage."
            public_request = next(item for item in requests if item["requested_by"] == "public")
            assert public_request["requested_by"] == "public"
            assert public_request["requester_email"] == "partner@example.org"
            assert public_request["consent_given_at"] is not None

            other_user_requests = client.get(
                f"/{project_id}/contact-requests", headers=auth_header("innovator")
            )
            assert other_user_requests.status_code == 403

        with TestingSession() as db:
            assert db.query(StageGateHistory).count() == 1
            assert db.query(ContactRequest).count() == 2
            project = db.query(Project).one()
            assert project.user_id == owner_id
            assert project.current_stage == "Prototype"
    finally:
        app.dependency_overrides.clear()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()