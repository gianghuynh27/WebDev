export type CostTier = 1 | 2 | 3 | 4 | 5;
export type Unit = {
  id: number;
  name: string;
  cost: CostTier;
  traits: string[];
};
