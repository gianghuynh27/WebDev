import type { ChampionStat } from "../types/stats"

type ChampionStatCardProps = {
    champion: ChampionStat;
}

function ChampionStatCard({ champion }: ChampionStatCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-sm text-slate-400">Unit ID: {champion.unitId}</p>

      <div>
         <div
              className={`flex w-24 shrink-0 items-center justify-center text-2xl font-bold text-slate-950 ${
                champion.rank === "S"
                  ? "bg-red-400"
                  : champion.rank  === "A"
                    ? "bg-orange-300"
                    : champion.rank  === "B"
                      ? "bg-yellow-300"
                      : champion.rank  === "C"
                        ? "bg-slate-400"
                        : "bg-green-300"
              }`}
            >
              {champion.rank }
            </div>
        <div>
          <p className="text-slate-500">Pick</p>
          <p className="font-semibold text-white">{champion.pickRate}%</p>
        </div>

        <div>
          <p className="text-slate-500">Top 4</p>
          <p className="font-semibold text-green-400">{champion.top4Rate}%</p>
        </div>

        <div>
          <p className="text-slate-500">Win</p>
          <p className="font-semibold text-yellow-400">{champion.winRate}%</p>
        </div>

        <div>
          <p className="text-slate-500">Avg</p>
          <p className="font-semibold text-white">{champion.avgPlacement}</p>
        </div>
      </div>
    </div>
  );
}

export default ChampionStatCard;