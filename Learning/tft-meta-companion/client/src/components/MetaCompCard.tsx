import type { ResolvedMetaComp } from "../types/tft";
import { getTraitCounts } from "../utils/countTraits";
import Pill, { type PillVariant } from "./Pill";

type MetaCompCardProps = {
  comp: ResolvedMetaComp;
};

function formatRate(rate?: number | null) {
  if (rate == null) return "-";
  return `${Math.round(rate * 100)}%`;
}

function MetaCompCard({ comp }: MetaCompCardProps) {
  const traitCounts = getTraitCounts(comp.units);

  return (
    <div className="grid gap-4 rounded-xl border border-slate-800 bg-slate-950/90 p-4 shadow transition hover:border-cyan-500/40 hover:bg-slate-900 lg:grid-cols-[90px_1.5fr_2fr_1.5fr] lg:items-center">
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

      <div>
        <h3 className="text-lg font-semibold text-white">{comp.name}</h3>

        <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-400">
          <span className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-xs font-medium text-cyan-200">
            {comp.type}
          </span>

          <Pill variant={comp.difficulty.toLowerCase() as PillVariant}>
            {comp.difficulty}
          </Pill>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap gap-1">
          {Object.entries(traitCounts).map(([trait, count]) => (
            <Pill key={trait} variant="trait">
              {count} {trait}
            </Pill>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {comp.units.map((unit) => (
            <div key={unit.id} className="w-14 text-center">
              <div className="relative h-12 w-12 overflow-hidden rounded-md border border-yellow-500 bg-slate-800">
                {unit.imageUrl ? (
                  <img
                    src={unit.imageUrl}
                    alt={unit.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-300">
                    {unit.name.slice(0, 2)}
                  </div>
                )}

                {unit.items.length > 0 && (
                  <div className="absolute -bottom-1 left-0 flex gap-0.5">
                    {unit.items.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        title={item.name}
                        className="h-4 w-4 overflow-hidden rounded-sm border border-slate-900 bg-amber-500 text-[8px]"
                      >
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          item.name.slice(0, 1)
                        )}
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

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase text-slate-500">
            Recommended Augments
          </p>

          <div className="flex flex-wrap gap-1">
            {comp.recommendedAugments.map((augment) => (
              <Pill key={augment.id} variant="augment">
                {augment.name}
              </Pill>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-slate-500">Avg</p>
          <p className="font-semibold text-white">{comp.avgPlacement ?? "-"}</p>
        </div>

        <div>
          <p className="text-slate-500">Top 4</p>
          <p className="font-semibold text-green-400">
            {formatRate(comp.top4Rate)}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Win</p>
          <p className="font-semibold text-yellow-400">
            {formatRate(comp.winRate)}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Play</p>
          <p className="font-semibold text-slate-300">
            {formatRate(comp.playRate)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MetaCompCard;