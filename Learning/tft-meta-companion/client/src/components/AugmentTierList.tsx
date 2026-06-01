import type { AugmentStat, StatRank } from "../types/stats";
import AugmentCard from "./AugmentCard";
import RankBadge from "./RankBadge";

type Props = {
  augments: AugmentStat[];
};

function AugmentRankList({ augments }: Props) {
  const ranks: StatRank[] = ["S", "A", "B", "C", "D"];

  return (
    <div className="mt-6 space-y-3">
      {ranks.map((rank) => {
        const rankAugments = augments.filter(
          (augment) => augment.rank === rank,
        );
        return (
          <div
            key={rank}
            className="flex overflow-hidden rounded-xl border border-slate-800 bg-slate-950"
          >
            <div className="flex w-24 shrink-0 p-2">
              <RankBadge rank={rank} size="lg" />
            </div>
            <div className="grid flex-1 grid-cols-4 gap-3 p-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
              {rankAugments.map((augment) => (
                <AugmentCard key={augment.id} augment={augment} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AugmentRankList;
