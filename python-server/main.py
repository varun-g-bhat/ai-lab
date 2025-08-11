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

app = FastAPI()

origins = [
    "http://localhost:5050",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)



app.include_router(aitutor.router, prefix="/api/v1/aitutor",tags=["aitutor"])
app.include_router(pdfchat.router, prefix="/api/v1/pdfchat",tags=["pdfchat"])

@app.get("/")
def root():
    return {"message":"Welcome to Interactive Learning Python Backend","status":"Ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)