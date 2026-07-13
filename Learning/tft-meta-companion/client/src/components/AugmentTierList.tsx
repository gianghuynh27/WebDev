import type { StaticAugment } from "../services/staticDataApi";
import AugmentCard from "./AugmentCard";

type Props = {
  augments: StaticAugment[];
};
function AugmentTierList({ augments }: Props) {
  return (
    <div className="mt-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-100">
          Augment Library
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Showing current augment data. Performance rankings coming later.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {augments.map((augment) => (
          <AugmentCard key={augment.id} augment={augment} />
        ))}
      </div>
    </div>
  );
}

export default AugmentTierList;

/* Will use when performance rankings are available */
// function AugmentRankList({ augments }: Props) {
//   const ranks: StatRank[] = ["S", "A", "B", "C", "D"];

//   return (
//     <div className="mt-6 space-y-3">
//       {ranks.map((rank) => {
//         const rankAugments = augments.filter(
//           (augment) => augment.rank === rank,
//         );
//         return (
//           <div
//             key={rank}
//             className="flex overflow-hidden rounded-xl border border-slate-800 bg-slate-950"
//           >
//             <div className="flex w-24 shrink-0 p-2">
//               <RankBadge rank={rank} size="lg" />
//             </div>
//             <div className="grid flex-1 grid-cols-4 gap-3 p-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
//               {rankAugments.map((augment) => (
//                 <AugmentCard key={augment.id} augment={augment} />
//               ))}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default AugmentRankList;
