from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing_extensions import Annotated

from app import config

origins = ["*"]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["POST"],
    allow_headers=["*"],
)


from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="ana/token")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/about")
async def about(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"author": "Uttaran", "redishost": config.CACHE_HOST, "token": token}


from ana.routers import router as ana_router

app.include_router(ana_router, prefix="/ana", tags=["ana"])
