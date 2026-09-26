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
from app.security import get_current_user, get_subject_id, require_role

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
	current_user: dict = Depends(require_role("official", "super_admin")),
):
	project = db.query(Project).filter(Project.id == project_id).first()
	if project is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

	request = ContactRequest(
		project_id=project.id,
		requested_by=get_subject_id(current_user),
		message=payload.message,
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
