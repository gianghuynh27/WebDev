export type AugmentTier = 'silver' | 'gold' | 'prismatic';
export type StatRank = 'S' | 'A' | 'B' | 'C' | 'D';

export type AugmentStat = {
  id: string;
  name: string;
  tier: AugmentTier;
  rank: StatRank;
};

export type ChampionStat = {
  unitId: number;
  rank: StatRank;
  pickRate: number;
  top4Rate: number;
  winRate: number;
  avgPlacement: number;
  relatedComps: string[];
};

export type ItemStat = {
  id: string;
  rank: StatRank;
  name: string;
  pickRate: number;
  top4Rate: number;
  winRate: number;
  avgPlacement: number;
  bestUsers: string[];
};


