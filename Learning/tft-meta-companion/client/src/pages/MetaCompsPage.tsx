import CompCard from "../components/CompCard";
import PageHeader from "../components/PageHeader";
import { mockComps } from "../data/mockComps";

function MetaCompsPage() {
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
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Milestone 2 starts here"
        title="Meta Comps"
        description="Explore meta comps, meta snapshot summary and more."
      />
      <div className="grid gap-3">
        {sortedComps.map((comp) => (
          <CompCard key={comp.id} comp={comp} />
        ))}
      </div>
    </div>
  );
}

export default MetaCompsPage;
