from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from ana.models import User

from app.config import Config
from app.logger import get_logger

service_name = "mongodb"
logger = get_logger(service_name)

db_client = AsyncIOMotorClient(Config.MONGO_CONN)
nulldb = db_client[Config.DB_NAME]


async def init_database():
    await init_beanie(
        database=nulldb,
        document_models=[
            User,
        ],
    )
