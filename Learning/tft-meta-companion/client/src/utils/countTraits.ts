type UnitWithTraits = {
  id: string,
  traits: string[];
};

export function getTraitCounts(units: UnitWithTraits[]) {
  const traitCounts: Record<string, number> = {};
  const seen = new Set<string>();
  const uniqueUnits = units.filter(unit=>{
    if(seen.has(unit.id)){
      return false;
    }
    seen.add(unit.id);
    return true;
  })
  uniqueUnits.forEach((unit) => {
    unit.traits.forEach((trait) => {
      traitCounts[trait] = (traitCounts[trait] ?? 0) + 1;
    });
  });

  return traitCounts;
}