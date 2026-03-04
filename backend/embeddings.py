from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from bots import bots_data

corpus = []
for bot in bots_data:
    text = f"{bot['name']}. {bot['description']} Strengths: {', '.join(bot['strengths'])}. Tags: {', '.join(bot['tags'])}."
    corpus.append(text)

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(corpus)

def search(query: str, top_k: int = 3):
    query_vec = vectorizer.transform([query])
    scores = cosine_similarity(query_vec, tfidf_matrix).flatten()
    top_indices = np.argsort(scores)[::-1][:top_k]
    return [(int(i), float(scores[i])) for i in top_indices]
