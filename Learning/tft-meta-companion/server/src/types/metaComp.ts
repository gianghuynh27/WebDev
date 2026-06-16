export type CreateMetaCompUnitInput = {
  championName: string;
  itemNames: string[];
};

export type CreateMetaCompFromNamesInput = {
  name: string;
  tier: string;
  difficulty: string;
  type: string;
  plannerUrl?: string;
  avgPlacement?: number;
  top4Rate?: number;
  winRate?: number;
  playRate?: number;
  units: CreateMetaCompUnitInput[];
  recommendedAugmentNames: string[];
};
