import { mockUnits } from '../data/mockUnits';
import type { TftComp } from '../types/tft';
import type { Unit } from '../types/unit';

export type ResolvedCompUnit = Unit & {
  items: string[];
};

export function populateCompUnit(comp: TftComp): ResolvedCompUnit[] {
  return comp.units
    .map((compUnit) => {
      const unit = mockUnits.find((u) => u.id === compUnit.unitId);

      if (!unit) return null;

      return {
        ...unit,
        items: compUnit.items,
      };
    })
    .filter((unit): unit is ResolvedCompUnit => unit !== null);
}