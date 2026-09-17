import os
from fastapi import FastAPI, Request
from dotenv import load_dotenv
from groq import Groq
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

templates = Jinja2Templates(directory="templates")

load_dotenv()

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )
    
    
@app.post("/chat")
def chat(message: str):
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {"role":"user", "content": message}
        ]
    )

    return {"reply": response.choices[0].message.content}