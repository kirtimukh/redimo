import redis.asyncio

from fastapi import APIRouter
from fastapi_users.authentication import RedisStrategy

redis = redis.asyncio.from_url("redis://localhost:6379", decode_responses=True)


def get_redis_strategy() -> RedisStrategy:
    return RedisStrategy(redis, lifetime_seconds=3600)


router = APIRouter()

# # 7dalcqwHtOwvWseb
# fake_users_db = {
#     "johndoe": {
#         "username": "johndoe",
#         "full_name": "John Doe",
#         "email": "johndoe@example.com",
#         "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
#         "disabled": False,
#     }
# }


# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)


# def get_password_hash(password):
#     return pwd_context.hash(password)


# def get_user(db, username: str):
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)


# def authenticate_user(fake_db, username: str, password: str):
#     user = get_user(fake_db, username)
#     if not user:
#         return False
#     if not verify_password(password, user.hashed_password):
#         return False
#     return user


# def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(
#         to_encode, Config.SECRET_KEY, algorithm=Config.JWT_ALGORITHM
#     )
#     return encoded_jwt


# async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(
#             token, Config.SECRET_KEY, algorithms=[Config.JWT_ALGORITHM]
#         )
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
#     user = get_user(fake_users_db, username=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user


# @router.post("/token", response_model=Token)
# async def login_for_access_token(
#     response: Response, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
# ):
#     user = authenticate_user(fake_users_db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=Config.JWT_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username}, expires_delta=access_token_expires
#     )
#     response.headers["Authorization"] = f"Bearer {access_token}"
#     return {"access_token": access_token, "token_type": "bearer"}


# @router.get("/add-user", response_model=Union[User, ErrorMessage])
# async def add_user(
#     response: Response,
#     username: str,
#     password: str,
#     email: str,
#     full_name: str = None,
#     disabled: bool = False,
# ):
#     # if username in fake_users_db:
#     #     raise HTTPException(
#     #         status_code=status.HTTP_400_BAD_REQUEST,
#     #         detail="Username already exists",
#     #     )
#     hashed_password = get_password_hash(password)
#     user = User(
#         username=username,
#         email=email,
#         full_name=full_name,
#         disabled=disabled,
#     )
#     # fake_users_db[username] = user
#     nulldb = get_db()
#     try:
#         nulldb.users.insert_one({**user.model_dump(), "_password": hashed_password})
#         return user
#     except Exception as e:
#         return user


# @router.get("/user-pass", response_model=Union[User, ErrorMessage])
# async def get_user_pass(user_id_str: str):
#     nulldb = get_db()
#     user_id = ObjectId(user_id_str)
#     user = await nulldb.users.find_one({"_id": user_id})
#     if user is None:
#         return ErrorMessage(
#             detail="User not found",
#             code=status.HTTP_404_NOT_FOUND,
#             message="User not found",
#         )
#     return user


# @router.get("/all-users", response_model=Union[List[User], ErrorMessage])
# async def get_user_pass():
#     nulldb = get_db()

#     cursor = nulldb.users.find()
#     users = await cursor.to_list(length=100)

#     return users
