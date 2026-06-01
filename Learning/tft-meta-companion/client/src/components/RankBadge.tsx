import type { StatRank } from "../types/stats";

type RankBadgeProps = {
  rank: StatRank;
  size?: "sm" | "lg";
};

const rankClasses: Record<StatRank, string> = {
  S: "bg-red-400",
  A: "bg-orange-300",
  B: "bg-yellow-300",
  C: "bg-slate-400",
  D: "bg-green-300",
};

function RankBadge({ rank, size = "sm" }: RankBadgeProps) {
  const sizeClasses =
    size === "lg" ? "h-full w-24 text-2xl" : "h-8 w-10 text-sm";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-md font-bold text-slate-950 ${rankClasses[rank]} ${sizeClasses}`}
    >
      {rank}
    </div>
  );
}

export default RankBadge;
