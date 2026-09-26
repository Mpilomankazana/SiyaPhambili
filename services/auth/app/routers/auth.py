from app.schemas import UserRegisterRequest, UserLoginRequest, TokenResponse
from app.core.security import hash_password, verify_password, create_access_token
from sqlalchemy.orm import Session
from fastapi import Depends
from app.database import get_db
from fastapi import APIRouter

router = APIRouter()
new_user = User(
    id=uuid.uuid4(),
    email=payload.email,
    password_hash=hash_password(payload.password),
    name=payload.name,
    role="innovator"
)

@router.post("/login", response_model=TokenResponse, status_code=status.HTTP_200_OK)
def login(payload: UserLoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    access_token = create_access_token(user_id=str(user.id), role=user.role)
    return TokenResponse(status="success", access_token=access_token)