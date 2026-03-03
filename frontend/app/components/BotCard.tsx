import { ExternalLink, Zap } from "lucide-react";

interface Bot {
  name: string;
  category: string;
  description: string;
  strengths: string[];
  poe_url: string;
  score: number;
  reason: string;
}

const categoryColors: Record<string, string> = {
  "Coding": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Writing": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Research": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Image Generation": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "Math/Science": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Business/Productivity": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Fun/Creative": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function BotCard({ bot, rank }: { bot: Bot; rank: number }) {
  const colorClass = categoryColors[bot.category] ?? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  const scorePercent = Math.round(bot.score * 100);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/5 group">
      <div className="flex items-start justify-between gap-4">
        {/* Left */}
        <div className="flex items-start gap-4">
          {/* Rank */}
          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 text-sm font-bold shrink-0">
            {rank}
          </div>
          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-semibold text-base">{bot.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${colorClass}`}>
                {bot.category}
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              {bot.description}
            </p>
            {/* Reason */}
            <div className="flex items-start gap-2 bg-violet-500/5 border border-violet-500/10 rounded-lg px-3 py-2 mb-3">
              <Zap className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
              <p className="text-violet-300 text-xs">{bot.reason}</p>
            </div>
            {/* Strengths */}
            <div className="flex flex-wrap gap-1.5">
              {bot.strengths.slice(0, 4).map((s) => (
                <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="text-right">
            <p className="text-zinc-600 text-xs mb-0.5">Match</p>
            <p className="text-violet-400 font-bold text-lg">{scorePercent}%</p>
          </div>
          <a
            href={bot.poe_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-violet-600 text-zinc-300 hover:text-white text-xs font-medium transition-all border border-zinc-700 hover:border-violet-500"
          >
            Open in Poe
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
