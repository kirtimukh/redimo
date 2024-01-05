from fastapi import APIRouter, Depends

from auth.manager import fastapi_users, auth_backend, current_active_user
from auth.models import User
from auth.schemas import UserCreate, UserRead

router = APIRouter()

router.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/jwt", tags=["auth"]
)
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_reset_password_router(),
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_verify_router(UserRead),
    tags=["auth"],
)


@router.get("/authenticated")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}! {str(current_active_user)}"}
