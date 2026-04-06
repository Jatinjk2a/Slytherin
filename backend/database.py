from motor.motor_asyncio import AsyncIOMotorClient
from config import settings
import logging

logger = logging.getLogger(__name__)

# Standard MongoDB driver setup
try:
    client = AsyncIOMotorClient(settings.mongo_uri, serverSelectionTimeoutMS=5000)
    db = client["readmeai_db"]
    repositories_collection = db["repositories"]
    readmes_collection = db["readmes"]
    scores_collection = db["scores"]
except Exception as e:
    logger.error(f"Could not connect to MongoDB at {settings.mongo_uri}: {e}")
    client = None
    db = None
    repositories_collection = None
    readmes_collection = None
    scores_collection = None

async def verify_db_connection():
    if client is not None:
        try:
            await client.server_info()
            logger.info("MongoDB connected successfully.")
        except Exception as e:
            logger.warning(f"MongoDB connection failed. DB features will operate in memory/noop mode. {e}")
