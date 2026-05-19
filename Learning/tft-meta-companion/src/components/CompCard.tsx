import type { TftComp } from "../types/tft";
import { getTraitCounts } from "../utils/countTraits";
import { populateCompUnit } from "../utils/populateCompUnits";
import Pill, { type PillVariant } from "./Pill";

type CompCardProps = {
  comp: TftComp;
};

function CompCard({ comp }: CompCardProps) {
  const units = populateCompUnit(comp)

  const traitCounts = getTraitCounts(units);
  return (
    <div className="grid grid-cols-[90px_1.5fr_2fr_1.5fr] items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/90 p-4 shadow hover:border-cyan-500/40 hover:bg-slate-900 transition">
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
            <Pill variant={comp.difficulty.toLowerCase() as PillVariant}>
              {comp.difficulty}
            </Pill>
          </div>
        </div>
      </div>

      {/* Traits + Champions */}
      <div className="space-y-2">
        {/* Traits row */}
        <div className="flex flex-wrap gap-1">
          {Object.entries(traitCounts).map(([trait, count]) => (
            <Pill key = {trait} variant="trait">
                {count} {trait}
              </Pill>
          ))}
        </div>

        {/* Units row */}
        <div className="flex flex-wrap gap-3">
          {units.map((unit) => (
            <div key={unit.id} className="w-14 text-center">
              <div className="relative h-12 w-12 rounded-md border border-yellow-500 bg-slate-800">
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-300">
                  {unit.name.slice(0, 2)}
                </div>

                {unit.items.length > 0 && (
                  <div className="absolute -bottom-1 left-0 flex gap-0.5">
                    {unit.items.slice(0, 3).map((item) => (
                      <div
                        key={item}
                        title={item}
                        className="h-4 w-4 rounded-sm border border-slate-900 bg-amber-500 text-[8px]"
                      >
                        {item.slice(0, 1)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="mt-1 truncate text-[11px] text-slate-300">
                {unit.name}
              </p>
            </div>
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
