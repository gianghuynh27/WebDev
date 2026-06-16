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

export type ApiMetaCompUnit = {
  championId: string;
  itemIds: string[];
};

export type ApiMetaComp = {
  id: string;
  name: string;
  tier: string;
  difficulty: string;
  type: string;
  plannerUrl?: string | null;
  avgPlacement?: number | null;
  top4Rate?: number | null;
  winRate?: number | null;
  playRate?: number | null;
  units: ApiMetaCompUnit[];
  recommendedAugments: string[];
};

export type ResolvedMetaCompItem = {
  id: string;
  name: string;
  imageUrl?: string;
};

export type ResolvedMetaCompUnit = {
  id: string;
  name: string;
  traits: string[];
  imageUrl?: string;
  items: ResolvedMetaCompItem[];
};

export type ResolvedMetaComp = Omit<ApiMetaComp, "units" | "recommendedAugments"> & {
  units: ResolvedMetaCompUnit[];
  recommendedAugments: ResolvedMetaCompItem[];
};