"use client";
import { useState } from "react";
import BotCard from "./components/BotCard";
import SearchBar from "./components/SearchBar";

interface Bot {
  name: string;
  category: string;
  description: string;
  strengths: string[];
  poe_url: string;
  score: number;
  reason: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch("http://localhost:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0e0e10] text-white flex flex-col items-center px-4 py-16">
      {/* Header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-lg font-bold shadow-lg">
            P
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            PoePick
          </h1>
        </div>
        <p className="text-zinc-400 text-lg max-w-md">
          Describe what you want to do. We'll find the best Poe bot for you.
        </p>
      </div>

      {/* Search */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        loading={loading}
      />

      {/* Example Queries */}
      {!searched && (
        <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-xl">
          {[
            "Write a Python web scraper",
            "Generate a logo for my startup",
            "Research climate change with sources",
            "Solve a calculus problem step by step",
            "Write a song about the ocean",
          ].map((example) => (
            <button
              key={example}
              onClick={() => { setQuery(example); }}
              className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors border border-zinc-700 hover:border-violet-500"
            >
              {example}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {loading && (
        <div className="mt-16 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm">Finding the best bots...</p>
        </div>
      )}

      {!loading && searched && results.length > 0 && (
        <div className="mt-12 w-full max-w-2xl flex flex-col gap-4">
          <p className="text-zinc-500 text-sm text-center">
            Top {results.length} bots for <span className="text-violet-400">"{query}"</span>
          </p>
          {results.map((bot, i) => (
            <BotCard key={bot.name} bot={bot} rank={i + 1} />
          ))}
        </div>
      )}

      {/* Footer */}
      <p className="mt-20 text-zinc-600 text-xs">
        Built for Poe · Powered by sentence-transformers + FAISS
      </p>
    </main>
  );
}
