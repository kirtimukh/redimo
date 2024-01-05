from passlib.context import CryptContext
from typing import Optional, Union

import redis.asyncio

from fastapi import Depends, Request
from fastapi_users import (
    BaseUserManager,
    schemas,
    models,
    FastAPIUsers,
)
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    RedisStrategy,
)

from fastapi_users_db_beanie import ObjectIDIDMixin
from beanie import BeanieObjectId

from app.config import Config
from app.logger import get_logger
from auth.models import User, get_user_db

service_name = "auth"
logger = get_logger(service_name)

SECRET = Config.SECRET_KEY
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")
redis = redis.asyncio.from_url(Config.REDIS_AUTH_HOST, decode_responses=True)


def get_redis_strategy() -> RedisStrategy:
    return RedisStrategy(redis, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="redis_auth",
    transport=bearer_transport,
    get_strategy=get_redis_strategy,
)


class UserManager(ObjectIDIDMixin, BaseUserManager[User, BeanieObjectId]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        logger.info(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        logger.info(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        logger.info(
            f"Verification requested for user {user.id}. Verification token: {token}"
        )

    async def validate_password(
        self, password: str, user: Union[schemas.UC, models.UP]
    ) -> None:
        return


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)


fastapi_users = FastAPIUsers[User, BeanieObjectId](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)
