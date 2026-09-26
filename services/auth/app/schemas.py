from pydantic import BaseModel, EmailStr, field_validator


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


class UserRegisterResponse(BaseModel):
    status: str
    message: str
    user_id: str


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    status: str
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: str
    email: EmailStr
    name: str
    role: str