export type StaticChampion = {
  id: string;
  name: string;
  cost: number;
  traits: string[];
  imageUrl?: string;
};

export type StaticItem = {
  id: string;
  name: string;
  imageUrl?: string;
};

export type StaticAugment = {
  id: string;
  name: string;
  imageUrl?: string;
  tier?: 'silver' | 'gold' | 'prismatic';
  description?: string;
  effects?: Record<string, number | string>;
  tags?: string[];
};

export type StaticTrait = {
  id: string;
  name: string;
  breakpoints: number[];
  imageUrl?: string;
};