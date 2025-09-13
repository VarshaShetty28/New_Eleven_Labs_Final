import os
from pymongo import MongoClient
from dotenv import load_dotenv

print("🔄 Connecting to MongoDB Atlas...")

# Load env variables
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

if not MONGO_URI or not DATABASE_NAME:
    raise Exception("❌ MONGO_URI or DATABASE_NAME not set in .env")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

print(f"✅ Successfully connected to MongoDB Atlas!")
print(f"📊 Database: {DATABASE_NAME}")