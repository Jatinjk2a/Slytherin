from fastapi import APIRouter, HTTPException, status, Depends
from pymongo.errors import DuplicateKeyError

from models.auth_models import UserRegister, UserLogin, TokenResponse, UserPublic
from models.db_models import UserDB
from auth import hash_password, verify_password, create_access_token, get_current_user
from database import users_collection
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["Auth"])


def _user_to_public(user_doc: dict) -> UserPublic:
    return UserPublic(
        id=user_doc.get("_id", user_doc.get("id", "")),
        full_name=user_doc["full_name"],
        email=user_doc["email"],
        created_at=user_doc["created_at"],
    )


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(body: UserRegister):
    """Create a new user account and return a JWT."""
    if users_collection is None:
        raise HTTPException(status_code=503, detail="Database unavailable.")

    existing = await users_collection.find_one({"email": body.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user_db = UserDB(
        full_name=body.full_name,
        email=body.email,
        hashed_password=hash_password(body.password),
    )

    try:
        await users_collection.insert_one(user_db.model_dump(by_alias=True))
    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )
    except Exception as e:
        logger.error(f"Failed to create user: {e}")
        raise HTTPException(status_code=500, detail="Failed to create user.")

    token_data = {"sub": user_db.id, "email": user_db.email, "name": user_db.full_name}
    token = create_access_token(token_data)

    user_doc = user_db.model_dump(by_alias=True)
    return TokenResponse(access_token=token, user=_user_to_public(user_doc))


@router.post("/login", response_model=TokenResponse)
async def login(body: UserLogin):
    """Authenticate and return a JWT."""
    if users_collection is None:
        raise HTTPException(status_code=503, detail="Database unavailable.")

    user_doc = await users_collection.find_one({"email": body.email})
    if not user_doc or not verify_password(body.password, user_doc.get("hashed_password", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    token_data = {
        "sub": str(user_doc["_id"]),
        "email": user_doc["email"],
        "name": user_doc["full_name"],
    }
    token = create_access_token(token_data)

    return TokenResponse(access_token=token, user=_user_to_public(user_doc))


@router.get("/me", response_model=UserPublic)
async def get_me(current_user: dict = Depends(get_current_user)):
    """Return the currently authenticated user's profile."""
    if users_collection is None:
        # Return from token payload if DB is down
        return UserPublic(
            id=current_user["sub"],
            full_name=current_user.get("name", ""),
            email=current_user.get("email", ""),
            created_at=None,
        )

    user_doc = await users_collection.find_one({"_id": current_user["sub"]})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found.")
    return _user_to_public(user_doc)
