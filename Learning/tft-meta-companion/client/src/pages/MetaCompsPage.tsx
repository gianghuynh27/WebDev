import { useEffect, useState } from "react";
import CompCard from "../components/CompCard";
import PageHeader from "../components/PageHeader";
import { mockComps } from "../data/mockComps";
import { getMetaComps } from "../services/metaCompApi";
import MetaCompCard from "../components/MetaCompCard";
import {
  getStaticAugments,
  getStaticChampions,
  getStaticItems,
  type StaticAugment,
  type StaticChampion,
  type StaticItem,
} from "../services/staticDataApi";
import type {
  ApiMetaComp,
  ResolvedMetaComp,
  ResolvedMetaCompUnit,
} from "../types/tft";
function MetaCompsPage() {
  const [comps, setComps] = useState<ResolvedMetaComp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function loadComps() {
      try {
        const [metaComps, champions, items, augments] = await Promise.all([
          getMetaComps(),
          getStaticChampions(),
          getStaticItems(),
          getStaticAugments(),
        ]);

        const resolvedComps = metaComps.map((comp) =>
          resolveMetaComp(comp, champions, items, augments),
        );

        setComps(resolvedComps);
      } catch {
        setError("Failed to load meta comps.");
      } finally {
        setIsLoading(false);
      }
    }

    loadComps();
  }, []);
  const tierOrder = {
    S: 1,
    A: 2,
    B: 3,
    C: 4,
    D: 5,
  };
  const sortedComps = [...mockComps].sort((a, b) => {
    return tierOrder[a.tier] - tierOrder[b.tier];
  });
  function resolveMetaComp(
    comp: ApiMetaComp,
    champions: StaticChampion[],
    items: StaticItem[],
    augments: StaticAugment[],
  ): ResolvedMetaComp {
    const resolvedUnits = comp.units
      .map((unit): ResolvedMetaCompUnit | null => {
        const champion = champions.find(
          (champion) => champion.id === unit.championId,
        );

        if (!champion) return null;

        return {
          id: champion.id,
          name: champion.name,
          traits: champion.traits,
          imageUrl: champion.imageUrl,
          items: unit.itemIds
            .map((itemId) => items.find((item) => item.id === itemId))
            .filter((item): item is StaticItem => item !== undefined),
        };
      })
      .filter((unit): unit is ResolvedMetaCompUnit => unit !== null);

    const recommendedAugments = comp.recommendedAugments
      .map((augmentId) => augments.find((augment) => augment.id === augmentId))
      .filter((augment): augment is StaticAugment => augment !== undefined);

    return {
      ...comp,
      units: resolvedUnits,
      recommendedAugments,
    };
  }
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Live database data"
        title="Meta Comps"
        description="Explore curated TFT comps from your backend."
      />

      {isLoading && <p className="text-slate-400">Loading comps...</p>}
      {error && <p className="text-red-300">{error}</p>}

      <div className="grid gap-3">
        {comps.map((comp) => (
          <MetaCompCard key={comp.id} comp={comp} />
        ))}
      </div>
    </div>
  );
}

export default MetaCompsPage;
