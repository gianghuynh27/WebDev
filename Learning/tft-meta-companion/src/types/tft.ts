export type CompTier = 'S' | 'A' | 'B' | 'C';

export type TftComp = {
  id: string;
  name: string;
  tier: CompTier;
  difficulty: string;
  type: string;
  avgPlacement: number;
  top4Rate: number;
  winRate: number;
  playRate: number;
  champions: string[];
  traits: string[];
  coreItems: string[];
  recommendedAugments: string[];
};