from fastapi import FastAPI
import uvicorn
import os
from dotenv import load_dotenv
from app.api.routes.AITutor import aitutor
from app.api.routes.PdfChat import pdfchat
import google.generativeai as genai
from app.db.db import db
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

# Validate required environment variables
required_env_vars = ["GOOGLE_API_KEY", "MONGODB_CONNECTION_STRING"]
missing_vars = []

for var in required_env_vars:
    if not os.getenv(var):
        # Check alternative names for MongoDB
        if var == "MONGODB_CONNECTION_STRING":
            if not (os.getenv("MONGODB_URI") or os.getenv("MONGO_URL")):
                missing_vars.append(f"{var} (or MONGODB_URI/MONGO_URL)")
        else:
            missing_vars.append(var)

if missing_vars:
    print(f"Warning: Missing environment variables: {', '.join(missing_vars)}")
    print("Please set these environment variables before running the application.")

app = FastAPI()

origins = [
    "https://ai-lab-1-x6f6.onrender.com",
    "https://ai-lab-nine.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


api_key = os.getenv("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
    print("Google AI API configured successfully")
else:
    print("Warning: GOOGLE_API_KEY not found. AI features may not work properly.")



app.include_router(aitutor.router, prefix="/api/v1/aitutor",tags=["aitutor"])
app.include_router(pdfchat.router, prefix="/api/v1/pdfchat",tags=["pdfchat"])

@app.get("/")
def root():
    return {"message":"Welcome to Interactive Learning Python Backend","status":"Ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)