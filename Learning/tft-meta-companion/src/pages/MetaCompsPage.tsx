import CompCard from "../components/CompCard";
import PageHeader from "../components/PageHeader";
import { mockComps } from "../data/mockComps";
function MetaCompsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Milestone 2 starts here"
        title="Meta Comps"
        description="Explore meta comps, meta snapshot summary and more."
      />
       <div className="grid gap-3">
        {mockComps.map((comp) => (
          <CompCard key={comp.id} comp={comp} />
        ))}
      </div>
      
    </div>
  );
}

export default MetaCompsPage;
