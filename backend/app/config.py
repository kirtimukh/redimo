import os
from dotenv import load_dotenv

env = load_dotenv()


CACHE_HOST = os.getenv("CACHE_HOST")
CACHE_PORT = int(os.getenv("CACHE_PORT"))
SECRET_KEY = os.getenv("SECRET_KEY")

JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES"))
