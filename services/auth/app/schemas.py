"""
Pydantic request/response schemas for the Auth Service.

TODO (Day 1 — ROADMAP.md Phase 3):
- UserRegisterRequest / UserRegisterResponse
- UserLoginRequest / TokenResponse
- RoleUpdateRequest
See docs/api/api-contracts.md for the exact payload shapes.
"""
class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str

    @field_validator("name")
    @classmethod
    def name_must_not_be_empty(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Name must not be empty")
        return value
    
    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")
        return value