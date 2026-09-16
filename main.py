import os
from fastapi import FastAPI
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

app = FastAPI()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.get("/")
def home():
    return {"message": "AI Chatbot is running!"}
    
@app.post("/chat")
def chat(message: str):
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {"role":"user", "content": message}
        ]
    )

    return {"reply": response.choices[0].message.content}