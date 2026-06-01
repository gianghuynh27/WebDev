import { useState } from "react";
import PageHeader from "../components/PageHeader";
import AugmentTierList from "../components/AugmentTierList";
import StatsTable, { type StatsTableRow } from "../components/StatsTable";
import { mockAugments, mockChampions, mockItems } from "../data/mockStats";
import { mockUnits } from "../data/mockUnits";

function StatsExplorerPage() {
  type StatsTab = "augments" | "champions" | "items";
  const tabs: { label: string; value: StatsTab }[] = [
    { label: "Augments", value: "augments" },
    { label: "Champions", value: "champions" },
    { label: "Items", value: "items" },
  ];
  const [activeTab, setActiveTab] = useState<StatsTab>("augments");

  const championRows: StatsTableRow[] = mockChampions.map((champion) => {
    const unit = mockUnits.find((mockUnit) => mockUnit.id === champion.unitId);

    return {
      id: String(champion.unitId),
      name: unit?.name ?? `Unit #${champion.unitId}`,
      rank: champion.rank,
      pickRate: champion.pickRate,
      top4Rate: champion.top4Rate,
      winRate: champion.winRate,
      avgPlacement: champion.avgPlacement,
    };
  });

  const itemRows: StatsTableRow[] = mockItems.map((item) => ({
    id: item.id,
    name: item.name,
    rank: item.rank,
    pickRate: item.pickRate,
    top4Rate: item.top4Rate,
    winRate: item.winRate,
    avgPlacement: item.avgPlacement,
  }));

  return (
    <div>
      <PageHeader
        eyebrow="Milestone 3 starts here"
        title="Stats Explorer"
        description="Explore current stats for augments, items, and more."
      />
      <div className="mt-6 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              activeTab === tab.value
                ? "bg-cyan-300 text-slate-950"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
       {
        activeTab === "augments" && <AugmentTierList augments={mockAugments} />
       }
      {activeTab === "champions" && (
        <StatsTable nameHeader="Unit" rows={championRows} />
      )}

      {activeTab === "items" && <StatsTable nameHeader="Item" rows={itemRows} />}
    </div>
  );
}

export default StatsExplorerPage;
