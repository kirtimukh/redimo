import os
from dotenv import load_dotenv

env = load_dotenv()


class Config:
    DEV_MODE = os.getenv("DEV_MODE", False)

    SECRET_KEY = os.getenv("SECRET_KEY", "thisisn`tgoodbye,you`realwayshere.!")

    REDIS_AUTH_HOST = os.getenv("REDIS_AUTH_HOST", "redis://localhost:6379")

    MONGO_HOST = os.getenv("MONGO_HOST", "cluster0.teppelin.mongodb.net")
    MONGO_USER = os.getenv("MONGO_USER", "ragann")
    MONGO_PASS = os.getenv("MONGO_PASS", "let`sseeyougritthoseteeth!")
    MONGO_CONN = f"mongodb+srv://{MONGO_USER}:{MONGO_PASS}@{MONGO_HOST}"

    NULLDB = os.getenv("NULLDB")
