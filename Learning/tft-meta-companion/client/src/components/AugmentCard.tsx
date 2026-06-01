import type { AugmentStat } from "../types/stats";

type AugmentCardProps = {
  augment: AugmentStat;
};

function AugmentCard({ augment }: AugmentCardProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800 ring-1 ring-slate-700">
        {augment.name.slice(0, 2)}
      </div>

      <p className="w-20 truncate text-center text-xs text-slate-300">
        {augment.name}
      </p>
    </div>
  );
}

export default AugmentCard;
