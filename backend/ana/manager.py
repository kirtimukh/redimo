import uuid
from passlib.context import CryptContext
from typing import Optional, Union

from fastapi_users_db_beanie import ObjectIDIDMixin
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, schemas, models, InvalidPasswordException

from bson import ObjectId

from ana.models import User, get_user_db

SECRET = "SECRET"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserManager(ObjectIDIDMixin, BaseUserManager[User, ObjectId]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")

    async def validate_password(
        self, password: str, user: Union[schemas.UC, models.UP]
    ) -> None:
        if not pwd_context.verify(password, user.hashed_password):
            raise InvalidPasswordException("Invalid password")
        return


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
