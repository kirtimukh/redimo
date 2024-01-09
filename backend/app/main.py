import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from fastapi.responses import FileResponse

from app.logger import get_logger
from app.mongodb import init_database

from auth.manager import fastapi_users
from auth.routers import router as auth_router
from auth.schemas import UserUpdate, UserRead

from execution.routers import router as execution_router

logger = get_logger("main.py")


@asynccontextmanager
async def lifespan_manager(app: FastAPI):
    # await init_database()  # this also works
    logger.info("Starting up...")
    startup_tasks = asyncio.gather(init_database())
    await startup_tasks
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


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(title="nullbaka", version="0.01", routes=app.routes)
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi


app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)
app.include_router(
    execution_router,
    prefix="/xboard",
    tags=["xboard"],
)


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("static/favicon.ico")
