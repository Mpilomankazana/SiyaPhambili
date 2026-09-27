from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator, model_validator

class UserRegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    consent_accepted: Literal[True]


class ProjectCreateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=1, max_length=255)
    sector_id: int = Field(gt=0)
    description: str = Field(min_length=1, max_length=2000)
    problem_statement: str = Field(min_length=1)
    solution: str = Field(min_length=1)
    license_type: Literal["MIT", "All Rights Reserved", "Other"] = "Other"
    license_note: str | None = None
    contact_required: bool = False
    visibility: Literal["public", "restricted"] = "public"

    @field_validator("title", "description", "problem_statement", "solution")
    @classmethod
    def strip_required_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Field must not be empty")
        return value

    @field_validator("license_note")
    @classmethod
    def strip_license_note(cls, value: str | None) -> str | None:
        return value.strip() if value and value.strip() else None

    @model_validator(mode="after")
    def validate_license_note(self):
        if self.license_note is not None and self.license_type != "Other":
            raise ValueError("license_note is only allowed when license_type is 'Other'")
        return self


class ProjectSummaryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    title: str
    description: str | None
    sector_id: int
    current_stage: str
    license_type: str
    contact_required: bool
    created_at: datetime


class ProjectDetailResponse(ProjectSummaryResponse):
    problem_statement: str
    solution: str | None
    license_note: str | None
    visibility: str


class ProjectListResponse(BaseModel):
    status: Literal["success"] = "success"
    data: list[ProjectSummaryResponse]


class ProjectDetailListResponse(BaseModel):
    status: Literal["success"] = "success"
    data: list[ProjectDetailResponse]


class SectorResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None


class SectorListResponse(BaseModel):
    status: Literal["success"] = "success"
    data: list[SectorResponse]


class ProjectCreateResponse(BaseModel):
    status: Literal["success"] = "success"
    message: str
    project_id: UUID


class StageTransitionRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    new_stage: Literal["Prototype", "Pilot", "Scale", "Implemented"]
    verification_notes: str | None = Field(default=None, max_length=2000)


class StageTransitionResponse(BaseModel):
    status: Literal["success"] = "success"
    current_stage: str
    updated_at: datetime


class StageHistoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    updated_by: str
    previous_stage: str
    new_stage: str
    verification_notes: str | None
    transitioned_at: datetime


class StageHistoryListResponse(BaseModel):
    status: Literal["success"] = "success"
    data: list[StageHistoryResponse]


class ContactRequestCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    message: str = Field(min_length=1, max_length=4000)
    requester_name: str | None = Field(default=None, min_length=1, max_length=255)
    requester_email: EmailStr | None = None
    consent_accepted: bool = False

    @field_validator("message")
    @classmethod
    def strip_message(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Message must not be empty")
        return value


class ContactRequestResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    requested_by: str
    requester_name: str | None
    requester_email: EmailStr | None
    message: str
    status: str
    created_at: datetime
    consent_given_at: datetime | None


class ContactRequestCreateResponse(BaseModel):
    status: Literal["success"] = "success"
    message: str


class ContactRequestListResponse(BaseModel):
    status: Literal["success"] = "success"
    data: list[ContactRequestResponse]
