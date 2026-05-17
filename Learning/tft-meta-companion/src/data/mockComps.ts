import type { TftComp } from "../types/tft";

export const mockComps: TftComp[] = [
  {
    id: "cybernetic-snipers",
    name: "Cybernetic Snipers",
    tier: "A",
    difficulty: "Medium",
    type: "Standard",

    plannerUrl: "",

    avgPlacement: 4.2,
    top4Rate: 54.7,
    winRate: 11.3,
    playRate: 6.9,

    units: [
      {
        unitId: 1,
        items: ["Blue Buff", "Jeweled Gauntlet", "Giant Slayer"],
      },
      {
        unitId: 2,
        items: [],
      },
      {
        unitId: 3,
        items: [],
      },
      {
        unitId: 4,
        items: [],
      },
    ],

    recommendedAugments: [
      "Scoped Weapons",
      "Cybernetic Uplink",
      "Healing Orbs",
    ],
  },

  {
    id: "void-assassins",
    name: "Void Assassins",
    tier: "S",
    difficulty: "Medium",
    type: "Reroll",

    plannerUrl: "",

    avgPlacement: 3.6,
    top4Rate: 65.2,
    winRate: 18.5,
    playRate: 7.4,

    units: [
      {
        unitId: 5,
        items: [
          "Infinity Edge",
          "Hand of Justice",
          "Bloodthirster",
        ],
      },
      {
        unitId: 6,
        items: [],
      },
      {
        unitId: 7,
        items: [],
      },
      {
        unitId: 8,
        items: [],
      },
    ],

    recommendedAugments: [
      "Jeweled Lotus",
      "Thrill of the Hunt",
      "Ascension",
    ],
  },

  {
    id: "star-guardian-mages",
    name: "Star Guardian Mages",
    tier: "A",
    difficulty: "Medium",
    type: "Fast 8",

    plannerUrl: "",

    avgPlacement: 4.0,
    top4Rate: 58.3,
    winRate: 13.9,
    playRate: 9.7,

    units: [
      {
        unitId: 9,
        items: [
          "Spear of Shojin",
          "Jeweled Gauntlet",
          "Archangel Staff",
        ],
      },
      {
        unitId: 10,
        items: [],
      },
      {
        unitId: 11,
        items: [],
      },
      {
        unitId: 12,
        items: [],
      },
    ],

    recommendedAugments: [
      "Blue Battery",
      "Spellweaver",
      "Manaflow",
    ],
  },
];