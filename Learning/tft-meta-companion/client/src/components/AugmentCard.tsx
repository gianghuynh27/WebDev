import type { AugmentStat } from "../types/stats";

type AugmentCardProps = {
  augment: AugmentStat;
};

function AugmentCard({ augment }: AugmentCardProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-slate-800 ring-1 ring-slate-700">
        {augment.imageUrl ? (
          <img
            src={augment.imageUrl}
            alt={augment.name}
            className="h-10 w-10 object-contain"
          />
        ) : (
          augment.name.slice(0, 2)
        )}
      </div>
    </div>
  );
}

export default AugmentCard;
