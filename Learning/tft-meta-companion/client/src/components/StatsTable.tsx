import type { StatRank } from "../types/stats";
import RankBadge from "./RankBadge";
import StatEntityCell from "./StatEntityCell";

export type StatsTableRow = {
  id: string;
  name: string;
  rank: StatRank;
  pickRate: number;
  top4Rate: number;
  winRate: number;
  avgPlacement: number;
};

type StatsTableProps = {
  nameHeader: string;
  rows: StatsTableRow[];
};

function StatsTable({ nameHeader, rows }: StatsTableProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-xs uppercase text-slate-400">
          <tr>
            <th className="px-4 py-3">{nameHeader}</th>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Pick</th>
            <th className="px-4 py-3">Top 4</th>
            <th className="px-4 py-3">Win</th>
            <th className="px-4 py-3">Avg</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-900/60">
              <td className="px-4 py-3 text-white"><StatEntityCell name={row.name} /></td>
              <td className="px-4 py-3">
                <RankBadge rank={row.rank} />
              </td>
              <td className="px-4 py-3 text-slate-300">{row.pickRate}%</td>
              <td className="px-4 py-3 text-green-400">{row.top4Rate}%</td>
              <td className="px-4 py-3 text-yellow-400">{row.winRate}%</td>
              <td className="px-4 py-3 text-slate-300">{row.avgPlacement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatsTable;
