import type { Unit } from "./unit";

export type CompTier = 'S' | 'A' | 'B' | 'C';
export type CompUnit = {
  unitId: number;
  items: string[];
};
export type TftComp = {
  id: string;
  name: string;
  tier: CompTier;
  difficulty: "Easy" | "Medium" | "Hard";
  type: "Standard" | "Reroll" | "Slow Roll" | "Fast 8" | "Fast 9" | "Tempo";
  plannerUrl: string;
  avgPlacement: number;
  top4Rate: number;
  winRate: number;
  playRate: number;
  units: CompUnit[];
  recommendedAugments: string[];
};