import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import AugmentTierList from "../components/AugmentTierList";
import StatsTable, { type StatsTableRow } from "../components/StatsTable";
import { mockAugments, mockItems } from "../data/mockStats";
import {
  getStaticChampions,
  type StaticChampion,
} from "../services/staticDataApi";


function StatsExplorerPage() {
  const [champions, setChampions] = useState<StaticChampion[]>([]);
  const [isLoadingChampions, setIsLoadingChampions] = useState(false);
  const [championsError, setChampionsError] = useState("");
  type StatsTab = "augments" | "champions" | "items";
  const tabs: { label: string; value: StatsTab }[] = [
    { label: "Augments", value: "augments" },
    { label: "Champions", value: "champions" },
    { label: "Items", value: "items" },
  ];
  const [activeTab, setActiveTab] = useState<StatsTab>("augments");
  useEffect(() => {
    async function loadChampions() {
      setIsLoadingChampions(true);
      setChampionsError("");

      try {
        const result = await getStaticChampions();
        setChampions(result);
      } catch {
        setChampionsError("Could not load current TFT champions.");
      } finally {
        setIsLoadingChampions(false);
      }
    }

    loadChampions();
  }, []);
  const championRows: StatsTableRow[] = champions.map((champion) => ({
    id: champion.id,
    name: `${champion.name} (${champion.cost} cost)`,
    imageUrl: champion.imageUrl,
    rank: "B",
    pickRate: 0,
    top4Rate: 0,
    winRate: 0,
    avgPlacement: 0,
  }));

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
      {activeTab === "augments" && <AugmentTierList augments={mockAugments} />}
      {activeTab === "champions" && (
        <>
          {isLoadingChampions && (
            <p className="mt-6 text-sm text-slate-400">
              Loading current champions...
            </p>
          )}

          {championsError && (
            <p className="mt-6 rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {championsError}
            </p>
          )}

          {!isLoadingChampions && !championsError && (
            <StatsTable nameHeader="Unit" rows={championRows} />
          )}
        </>
      )}

      {activeTab === "items" && (
        <StatsTable nameHeader="Item" rows={itemRows} />
      )}
    </div>
  );
}

export default StatsExplorerPage;
