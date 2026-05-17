import type { Unit } from "../types/unit";

export function getTraitCounts(champions: Unit[]) {
  return champions.reduce<Record<string, number>>((acc, champion) => {
    champion.traits.forEach((trait) => {
      acc[trait] = (acc[trait] || 0) + 1;
    });

    return acc;
  }, {});
}