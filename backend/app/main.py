import asyncio
from contextlib import asynccontextmanager
from typing_extensions import Annotated


from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from fastapi.openapi.utils import get_openapi

from fastapi_users.authentication import BearerTransport


from app.config import Config
from app.mongodb import init_database


from ana.models import User


@asynccontextmanager
async def lifespan_manager(app: FastAPI):
    # await init_database()  # this also works
    startup_tasks = asyncio.gather(init_database())
    _ = await startup_tasks
    yield


app = FastAPI(lifespan=lifespan_manager)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="ana/token")

bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(title="nullbaka", version="0.01", routes=app.routes)
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

from ana.routers import router as ana_router

app.include_router(ana_router, prefix="/ana", tags=["ana"])
