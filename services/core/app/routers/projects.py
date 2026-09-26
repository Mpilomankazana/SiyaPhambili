from datetime import datetime, timezone
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Project, Sector, StageGateHistory
from app.schemas import (
	ProjectCreateRequest,
	ProjectCreateResponse,
	ProjectDetailResponse,
	ProjectListResponse,
	ProjectSummaryResponse,
	SectorListResponse,
	StageTransitionRequest,
	StageTransitionResponse,
)
from app.security import (
	bearer_scheme,
	decode_and_verify_token,
	get_current_user,
	get_subject_id,
	require_role,
)

router = APIRouter()

STAGE_TRANSITIONS = {
	"Idea": "Prototype",
	"Prototype": "Pilot",
	"Pilot": "Scale",
	"Scale": "Implemented",
}


@router.get("/sectors", response_model=SectorListResponse)
def list_sectors(db: Session = Depends(get_db)):
	sectors = db.query(Sector).order_by(Sector.name).all()
	return {"data": sectors}


@router.get("/", response_model=ProjectListResponse)
def list_projects(
	sector_id: int | None = Query(default=None, gt=0),
	stage: str | None = Query(default=None, max_length=50),
	db: Session = Depends(get_db),
):
	query = db.query(Project).filter(Project.visibility == "public")
	if sector_id is not None:
		query = query.filter(Project.sector_id == sector_id)
	if stage is not None:
		query = query.filter(Project.current_stage == stage)
	return {"data": query.order_by(Project.created_at.desc()).all()}


@router.post(
	"/",
	response_model=ProjectCreateResponse,
	status_code=status.HTTP_201_CREATED,
)
def create_project(
	payload: ProjectCreateRequest,
	db: Session = Depends(get_db),
	current_user: dict = Depends(require_role("innovator")),
):
	sector = db.query(Sector).filter(Sector.id == payload.sector_id).first()
	if sector is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sector not found")

	project = Project(
		user_id=get_subject_id(current_user),
		sector_id=payload.sector_id,
		title=payload.title,
		problem_statement=payload.problem_statement,
		current_stage="Idea",
		license_type=payload.license_type,
		license_note=payload.license_note,
		contact_required=payload.contact_required,
		visibility=payload.visibility,
	)
	db.add(project)
	db.commit()
	db.refresh(project)
	return ProjectCreateResponse(
		message="Project registered successfully.",
		project_id=project.id,
	)


@router.get("/{project_id}")
def get_project(
	project_id: UUID,
	credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
	db: Session = Depends(get_db),
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

	response_model = (
		ProjectDetailResponse if is_owner or is_official else ProjectSummaryResponse
	)
	return {
		"status": "success",
		"data": response_model.model_validate(project),
	}


@router.put(
	"/{project_id}/stage",
	response_model=StageTransitionResponse,
)
def advance_project_stage(
	project_id: UUID,
	payload: StageTransitionRequest,
	db: Session = Depends(get_db),
	current_user: dict = Depends(require_role("official", "super_admin")),
):
	project = db.query(Project).filter(Project.id == project_id).first()
	if project is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

	expected_stage = STAGE_TRANSITIONS.get(project.current_stage)
	if payload.new_stage != expected_stage:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Invalid stage transition",
		)

	updated_at = datetime.now(timezone.utc)
	db.add(
		StageGateHistory(
			project_id=project.id,
			updated_by=get_subject_id(current_user),
			previous_stage=project.current_stage,
			new_stage=payload.new_stage,
			verification_notes=payload.verification_notes,
			transitioned_at=updated_at,
		)
	)
	project.current_stage = payload.new_stage
	project.updated_at = updated_at
	db.commit()
	db.refresh(project)
	return StageTransitionResponse(
		current_stage=project.current_stage,
		updated_at=project.updated_at,
	)
