import os
os.environ.setdefault("JWT_SECRET_KEY", "test-only-auth-secret")
os.environ.setdefault("DATABASE_URL", "sqlite://")

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.security import hash_password
from app.database import Base, get_db
from app.main import app
from app.models import User


def test_auth_registration_login_profile_and_role_promotion():
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
    try:
        with TestingSession() as db:
            super_admin = User(
                email="admin@example.org",
                name="Test Admin",
                password_hash=hash_password("StrongAdminPass123!"),
                role="super_admin",
            )
            db.add(super_admin)
            db.commit()
            super_admin_id = super_admin.id

        with TestClient(app) as client:
            registration = client.post(
                "/register",
                json={
                    "email": "innovator@example.org",
                    "password": "StrongInnovator123!",
                    "name": "  Test Innovator  ",
                    "consent_accepted": True,
                },
            )
            assert registration.status_code == 201, registration.text
            user_id = registration.json()["user_id"]

            missing_consent = client.post(
                "/register",
                json={
                    "email": "other@example.org",
                    "password": "StrongInnovator123!",
                    "name": "Other Innovator",
                    "consent_accepted": False,
                },
            )
            assert missing_consent.status_code == 422

            login = client.post(
                "/login",
                json={"email": "innovator@example.org", "password": "StrongInnovator123!"},
            )
            assert login.status_code == 200
            innovator_headers = {"Authorization": f"Bearer {login.json()['access_token']}"}

            profile = client.get("/me", headers=innovator_headers)
            assert profile.status_code == 200
            assert profile.json()["id"] == user_id
            assert profile.json()["role"] == "innovator"

            forbidden_promotion = client.put(
                f"/users/{user_id}/role",
                json={"role": "official"},
                headers=innovator_headers,
            )
            assert forbidden_promotion.status_code == 403

            admin_login = client.post(
                "/login",
                json={"email": "admin@example.org", "password": "StrongAdminPass123!"},
            )
            admin_headers = {"Authorization": f"Bearer {admin_login.json()['access_token']}"}
            promotion = client.put(
                f"/users/{user_id}/role",
                json={"role": "official"},
                headers=admin_headers,
            )
            assert promotion.status_code == 200

            refreshed_login = client.post(
                "/login",
                json={"email": "innovator@example.org", "password": "StrongInnovator123!"},
            )
            refreshed_headers = {
                "Authorization": f"Bearer {refreshed_login.json()['access_token']}"
            }
            assert client.get("/me", headers=refreshed_headers).json()["role"] == "official"

        with TestingSession() as db:
            user = db.query(User).filter(User.id == int(user_id)).one()
            assert user.name == "Test Innovator"
            assert user.role == "official"
            assert user.consent_given_at is not None
            assert db.query(User).filter(User.id == super_admin_id).one().role == "super_admin"
    finally:
        app.dependency_overrides.clear()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()