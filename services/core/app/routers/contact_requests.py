from datetime import datetime, timezone
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ContactRequest, Project
from app.schemas import (
	ContactRequestCreate,
	ContactRequestCreateResponse,
	ContactRequestListResponse,
	ContactRequestResponse,
)
from app.security import bearer_scheme, decode_and_verify_token, get_current_user, get_subject_id
from fastapi.security import HTTPAuthorizationCredentials

router = APIRouter()


@router.post(
	"/{project_id}/contact-requests",
	response_model=ContactRequestCreateResponse,
	status_code=status.HTTP_201_CREATED,
)
def create_contact_request(
	project_id: UUID,
	payload: ContactRequestCreate,
	db: Session = Depends(get_db),
	credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
):
	project = db.query(Project).filter(Project.id == project_id).first()
	if project is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
	current_user = decode_and_verify_token(credentials.credentials) if credentials else None
	role = current_user.get("role") if current_user else None
	is_owner = current_user is not None and current_user.get("sub") == project.user_id
	is_official = role in {"official", "super_admin"}
	if project.visibility != "public" and not (is_owner or is_official):
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
	if not is_official and not (payload.requester_name and payload.requester_email):
		raise HTTPException(
			status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
			detail="Name and email are required for public contact requests",
		)
	if not is_official and not payload.consent_accepted:
		raise HTTPException(
			status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
			detail="Consent is required to share your contact details with the project owner",
		)

	request = ContactRequest(
		project_id=project.id,
		requested_by=get_subject_id(current_user) if current_user else "public",
		requester_name=payload.requester_name,
		requester_email=payload.requester_email,
		message=payload.message,
		consent_given_at=datetime.now(timezone.utc) if payload.consent_accepted else None,
	)
	db.add(request)
	db.commit()
	return ContactRequestCreateResponse(
		message="Contact request sent to the project owner."
	)


@router.get(
	"/{project_id}/contact-requests",
	response_model=ContactRequestListResponse,
)
def list_contact_requests(
	project_id: UUID,
	db: Session = Depends(get_db),
	current_user: dict = Depends(get_current_user),
):
	project = db.query(Project).filter(Project.id == project_id).first()
	if project is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
	if project.user_id != get_subject_id(current_user):
		raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not project owner")

	requests = (
		db.query(ContactRequest)
		.filter(ContactRequest.project_id == project.id)
		.order_by(ContactRequest.created_at.desc())
		.all()
	)
	return {"data": requests}
