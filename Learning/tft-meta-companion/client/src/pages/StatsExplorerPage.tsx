import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import AugmentTierList from "../components/AugmentTierList";
import StatsTable, { type StatsTableRow } from "../components/StatsTable";
import {
  getStaticChampions,
  type StaticChampion,
  getStaticItems,
  type StaticItem,
  getStaticAugments,
  type StaticAugment,
} from "../services/staticDataApi";
import type { AugmentStat, StatRank } from "../types/stats";

function StatsExplorerPage() {
  const [champions, setChampions] = useState<StaticChampion[]>([]);
  const [isLoadingChampions, setIsLoadingChampions] = useState(false);
  const [championsError, setChampionsError] = useState("");
  const [items, setItems] = useState<StaticItem[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [itemsError, setItemsError] = useState("");
  const [augments, setAugments] = useState<StaticAugment[]>([]);
  const [isLoadingAugments, setIsLoadingAugments] = useState(false);
  const [augmentsError, setAugmentsError] = useState("");
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
    async function loadItems() {
      setIsLoadingItems(true);
      setItemsError("");

      try {
        const result = await getStaticItems();
        setItems(result);
      } catch {
        setItemsError("Could not load current TFT items.");
      } finally {
        setIsLoadingItems(false);
      }
    }

    loadItems();
    async function loadAugments() {
      setIsLoadingAugments(true);
      setAugmentsError("");
      try {
        const result = await getStaticAugments();
        setAugments(result);
      } catch {
        setAugmentsError("Could not load current TFT items.");
      } finally {
        setIsLoadingAugments(false);
      }
    }

    loadAugments();
  }, []);
  function getRandomRank() {
    const ranks: StatRank[] = ["S", "A", "B", "C", "D"];
    return ranks[Math.floor(Math.random() * ranks.length)];
  }
  const rankOrder = {
    S: 1,
    A: 2,
    B: 3,
    C: 4,
    D: 5,
  };
  const championRows: StatsTableRow[] = champions
    .sort((a, b) => b.cost - a.cost)
    .map((champion) => ({
      id: champion.id,
      name: champion.name,
      imageUrl: champion.imageUrl,
      cost: champion.cost,
      rank: getRandomRank(),
      pickRate: 0,
      top4Rate: 0,
      winRate: 0,
      avgPlacement: 0,
    }));

  const itemRows: StatsTableRow[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    imageUrl: item.imageUrl,
    rank: getRandomRank(),
    pickRate: 0,
    top4Rate: 0,
    winRate: 0,
    avgPlacement: 0,
  }));
  const augmentRows: AugmentStat[] = augments.map((augment) => ({
    id: augment.id,
    name: augment.name,
    tier: augment.tier,
    imageUrl: augment.imageUrl,
    description: augment.description,
    rank: getRandomRank(),
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
      {activeTab === "augments" && (
        <>
          {isLoadingAugments && (
            <p className="mt-6 text-sm text-slate-400">
              Loading current augments...
            </p>
          )}

          {augmentsError && (
            <p className="mt-6 rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {augmentsError}
            </p>
          )}

          {!isLoadingAugments && !augmentsError && (
            <AugmentTierList augments={augmentRows} />
          )}
        </>
      )}{" "}
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
            <StatsTable
              nameHeader="Unit"
              rows={championRows.sort(
                (a, b) => rankOrder[a.rank] - rankOrder[b.rank],
              )}
            />
          )}
        </>
      )}
      {activeTab === "items" && (
        <>
          {isLoadingItems && (
            <p className="mt-6 text-sm text-slate-400">
              Loading current items...
            </p>
          )}

          {itemsError && (
            <p className="mt-6 rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {itemsError}
            </p>
          )}

          {!isLoadingItems && !itemsError && (
            <StatsTable
              nameHeader="Item"
              rows={itemRows.sort(
                (a, b) => rankOrder[a.rank] - rankOrder[b.rank],
              )}
            />
          )}
        </>
      )}
    </div>
  );
}

export default StatsExplorerPage;
