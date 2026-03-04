from embeddings import search
from bots import bots_data

def generate_reason(bot: dict, query: str) -> str:
    matched = [s for s in bot["strengths"] if any(word in query.lower() for word in s.lower().split())]
    if matched:
        return f"Strong at {', '.join(matched[:2])} — directly matches your task."
    return f"Highly relevant for {bot['category'].lower()} tasks based on your query."

def recommend(query: str, top_k: int = 3):
    results_raw = search(query, top_k)
    results = []
    for idx, score in results_raw:
        bot = bots_data[idx]
        results.append({
            "name": bot["name"],
            "category": bot["category"],
            "description": bot["description"],
            "strengths": bot["strengths"],
            "poe_url": bot["poe_url"],
            "score": round(score, 4),
            "reason": generate_reason(bot, query)
        })
    return results
