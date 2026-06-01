import type { AugmentStat, ChampionStat, ItemStat } from '../types/stats';

export const mockAugments: AugmentStat[] = [
  // S Tier
  {
    id: 'augment-1',
    name: 'Level Up!',
    tier: 'prismatic',
    rank: 'S',
  },
  {
    id: 'augment-2',
    name: 'Golden Egg',
    tier: 'prismatic',
    rank: 'S',
  },

  // A Tier
  {
    id: 'augment-3',
    name: 'Jeweled Lotus',
    tier: 'silver',
    rank: 'A',
  },
  {
    id: 'augment-4',
    name: 'Cybernetic Uplink',
    tier: 'gold',
    rank: 'A',
  },

  // B Tier
  {
    id: 'augment-5',
    name: "Pandora's Items",
    tier: 'gold',
    rank: 'B',
  },
  {
    id: 'augment-6',
    name: 'Healing Orbs',
    tier: 'silver',
    rank: 'B',
  },

  // C Tier
  {
    id: 'augment-7',
    name: 'Trade Sector',
    tier: 'gold',
    rank: 'C',
  },
  {
    id: 'augment-8',
    name: 'Tiny Titans',
    tier: 'silver',
    rank: 'C',
  },

  // D Tier
  {
    id: 'augment-9',
    name: 'AFK',
    tier: 'silver',
    rank: 'D',
  },
  {
    id: 'augment-10',
    name: 'Cruel Pact',
    tier: 'prismatic',
    rank: 'D',
  },
];

export const mockChampions: ChampionStat[] = [
  {
    unitId: 1,
    rank: 'S',
    pickRate: 18.4,
    top4Rate: 52.1,
    winRate: 14.3,
    avgPlacement: 4.2,
    relatedComps: ['Edgelord', 'Duelist'],
  },
  {
    unitId: 2,
    rank: 'A',
    pickRate: 21.7,
    top4Rate: 57.6,
    winRate: 16.9,
    avgPlacement: 3.9,
    relatedComps: ['K/DA', 'Spellweaver'],
  },
];

export const mockItems: ItemStat[] = [
  {
    id: 'item-1',
    rank: 'S',
    name: 'Infinity Edge',
    pickRate: 24.5,
    top4Rate: 55.2,
    winRate: 15.1,
    avgPlacement: 4.0,
    bestUsers: ['Yasuo', 'Caitlyn'],
  },
  {
    id: 'item-2',
    rank: 'A',
    name: "Warmog's Armor",
    pickRate: 17.8,
    top4Rate: 53.7,
    winRate: 13.2,
    avgPlacement: 4.3,
    bestUsers: ['Sett', 'Illaoi'],
  },
];