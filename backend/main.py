from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from recommender import recommend

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

@app.post("/recommend")
def get_recommendations(request: QueryRequest):
    results = recommend(request.query)
    return {"results": results}

@app.get("/health")
def health():
    return {"status": "ok"}
