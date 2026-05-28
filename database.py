from motor.motor_asyncio import AsyncIOMotorClient
from config import Config

class Database:
    def __init__(self):
        self.client = AsyncIOMotorClient(Config.DB_URI)
        self.db = self.client[Config.DB_NAME]
        self.col = self.db.files

    async def add_file(self, file_id, file_name):
        await self.col.insert_one({"file_id": file_id, "name": file_name})

    async def find_file(self, query):
        return await self.col.find({"name": {"$regex": query, "$options": "i"}}).to_list(length=10)

db = Database()
