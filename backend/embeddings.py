from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from bots import bots_data

model = SentenceTransformer("all-MiniLM-L6-v2")

def build_index():
    corpus = []
    for bot in bots_data:
        text = f"{bot['name']}. {bot['description']} Strengths: {', '.join(bot['strengths'])}. Tags: {', '.join(bot['tags'])}."
        corpus.append(text)
    
    embeddings = model.encode(corpus, convert_to_numpy=True)
    embeddings = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)  # normalize
    
    index = faiss.IndexFlatIP(embeddings.shape[1])  # Inner product = cosine on normalized vectors
    index.add(embeddings)
    
    return index, corpus

index, corpus = build_index()
