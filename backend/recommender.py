from embeddings import model, index
from bots import bots_data
import numpy as np

def recommend(query: str, top_k: int = 3):
    query_embedding = model.encode([query], convert_to_numpy=True)
    query_embedding = query_embedding / np.linalg.norm(query_embedding, axis=1, keepdims=True)
    
    scores, indices = index.search(query_embedding, top_k)
    
    results = []
    for score, idx in zip(scores[0], indices[0]):
        bot = bots_data[idx]
        results.append({
            "name": bot["name"],
            "category": bot["category"],
            "description": bot["description"],
            "strengths": bot["strengths"],
            "poe_url": bot["poe_url"],
            "score": round(float(score), 4),
            "reason": generate_reason(bot, query)
        })
    
    return results

def generate_reason(bot: dict, query: str) -> str:
    matched = [s for s in bot["strengths"] if any(word in query.lower() for word in s.lower().split())]
    if matched:
        return f"Strong at {', '.join(matched[:2])} — directly matches your task."
    return f"Highly relevant for {bot['category'].lower()} tasks based on your query."