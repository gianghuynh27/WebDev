import type { TftComp } from "../types/tft";

type CompCardProps = {
  comp: TftComp;
};

function CompCard({comp}: CompCardProps) {
  return (
    <div
      className="grid grid-cols-[90px_1.5fr_2fr_1.5fr] items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/90 p-4 shadow hover:border-cyan-500/40 hover:bg-slate-900 transition"
    >
      {/* Tier */}
      <div className="flex justify-center">
        <span
          className={`rounded-md px-3 py-1 text-sm font-bold ${
            comp.tier === "S"
              ? "bg-yellow-500/20 text-yellow-300"
              : comp.tier === "A"
                ? "bg-purple-500/20 text-purple-300"
                : comp.tier === "B"
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-slate-700 text-slate-300"
          }`}
        >
          {comp.tier}
        </span>
      </div>

      {/* Comp name */}
      <div>
        <h3 className="text-lg font-semibold text-white">{comp.name}</h3>
        <div className="text-sm text-slate-400">
          <div className="mt-2 flex flex-wrap gap-2">
            {/* Type */}
            <span
              className={`rounded-md border px-2 py-1 text-xs font-medium ${
                comp.type === "Fast 9"
                  ? "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200"
                  : comp.type === "Fast 8"
                    ? "border-sky-400/20 bg-sky-400/10 text-sky-200"
                    : comp.type === "Reroll"
                      ? "border-amber-400/20 bg-amber-400/10 text-amber-200"
                      : comp.type === "Slow Roll"
                        ? "border-orange-400/20 bg-orange-400/10 text-orange-200"
                        : comp.type === "Tempo"
                          ? "border-rose-400/20 bg-rose-400/10 text-rose-200"
                          : "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
              }`}
            >
              {comp.type}
            </span>

            {/* Difficulty */}
            <span
              className={`rounded-md border px-2 py-1 text-xs font-medium ${
                comp.difficulty === "Easy"
                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                  : comp.difficulty === "Medium"
                    ? "border-yellow-400/20 bg-yellow-400/10 text-yellow-200"
                    : "border-red-400/20 bg-red-400/10 text-red-200"
              }`}
            >
              {comp.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Champions + Traits */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {comp.champions.map((champion) => (
            <span
              key={champion}
              className="rounded-md bg-slate-800 px-2 py-1 text-sm text-slate-200"
            >
              {champion}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {comp.traits.map((trait) => (
            <span
              key={trait}
              className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-300"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-slate-500">Avg</p>
          <p className="font-semibold text-white">{comp.avgPlacement}</p>
        </div>

        <div>
          <p className="text-slate-500">Top 4</p>
          <p className="font-semibold text-green-400">{comp.top4Rate}%</p>
        </div>

        <div>
          <p className="text-slate-500">Win</p>
          <p className="font-semibold text-yellow-400">{comp.winRate}%</p>
        </div>

        <div>
          <p className="text-slate-500">Play</p>
          <p className="font-semibold text-slate-300">{comp.playRate}%</p>
        </div>
      </div>
    </div>
  );
}
export default CompCard;
