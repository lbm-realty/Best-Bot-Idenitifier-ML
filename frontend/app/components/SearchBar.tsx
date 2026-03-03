import { Search } from "lucide-react";

interface Props {
  query: string;
  setQuery: (q: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchBar({ query, setQuery, onSearch, loading }: Props) {
  return (
    <div className="w-full max-w-xl flex gap-2">
      <div className="flex-1 flex items-center bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 gap-3 focus-within:border-violet-500 transition-colors">
        <Search className="text-zinc-500 w-4 h-4 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="What do you want to do today?"
          className="bg-transparent outline-none text-white placeholder-zinc-500 w-full text-sm"
        />
      </div>
      <button
        onClick={onSearch}
        disabled={loading || !query.trim()}
        className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
      >
        Pick
      </button>
    </div>
  );
}
