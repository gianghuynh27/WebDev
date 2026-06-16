type UnitWithTraits = {
  traits: string[];
};

export function getTraitCounts(units: UnitWithTraits[]) {
  const traitCounts: Record<string, number> = {};

  units.forEach((unit) => {
    unit.traits.forEach((trait) => {
      traitCounts[trait] = (traitCounts[trait] ?? 0) + 1;
    });
  });

  return traitCounts;
}