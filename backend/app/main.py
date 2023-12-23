from typing_extensions import Annotated

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from fastapi.openapi.utils import get_openapi

from app.config import Config

origins = ["*"]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["POST"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="ana/token")


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(title="nullbaka", version="0.01", routes=app.routes)
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi


from ana.routers import router as ana_router

app.include_router(ana_router, prefix="/ana", tags=["ana"])


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/about")
async def about(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"author": "Uttaran", "redishost": Config.CACHE_HOST, "token": token}
