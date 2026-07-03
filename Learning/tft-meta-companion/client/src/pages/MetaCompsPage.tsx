import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { getResolvedMetaComps } from "../services/metaCompApi";
import MetaCompCard from "../components/MetaCompCard";

import type { ResolvedMetaComp } from "../types/tft";
function MetaCompsPage() {
  const [comps, setComps] = useState<ResolvedMetaComp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function loadComps() {
      try {
        const resolvedMetaComps = await getResolvedMetaComps();
        setComps(resolvedMetaComps);
      } catch {
        setError("Failed to load meta comps.");
      } finally {
        setIsLoading(false);
      }
    }

    loadComps();
  }, []);
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
