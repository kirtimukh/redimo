import bson
from beanie import Document
from fastapi_users import schemas
from fastapi_users.db import BeanieBaseUser, BeanieUserDatabase


class User(BeanieBaseUser, Document):
    pass


async def get_user_db():
    yield BeanieUserDatabase(User)


# Schemas; for FastAPI to use to validate IO
class UserRead(schemas.BaseUser[bson.ObjectId]):
    pass


class UserCreate(schemas.BaseUserCreate):
    pass


class UserUpdate(schemas.BaseUserUpdate):
    pass
