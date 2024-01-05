from beanie import BeanieObjectId
from fastapi_users import schemas


# Schemas; for FastAPI to use to validate IO
class UserRead(schemas.BaseUser[BeanieObjectId]):
    pass


class UserCreate(schemas.BaseUserCreate):
    pass


class UserUpdate(schemas.BaseUserUpdate):
    pass
