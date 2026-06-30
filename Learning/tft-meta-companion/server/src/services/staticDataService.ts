import { prisma } from "../lib/prisma.js";
import type {
  StaticAugment,
  StaticChampion,
  StaticItem,
  StaticTrait,
} from "../types/staticData.js";

const COMMUNITY_DRAGON_TFT_URL =
  process.env.COMMUNITY_DRAGON_TFT_URL ??
  "https://raw.communitydragon.org/latest/cdragon/tft/en_us.json";

const COMMUNITY_DRAGON_BASE_URL =
  process.env.COMMUNITY_DRAGON_BASE_URL ??
  "https://raw.communitydragon.org/latest";

type CommunityDragonImageEntity = {
  apiName?: string;
  id?: string | number;
  name?: string;
  icon?: string;
  composition?: string[];
  desc?: string;
  effects?: Record<string, number | string>;
  tags?: string[];
};

type CommunityDragonChampion = CommunityDragonImageEntity & {
  cost?: number;
  traits?: string[];
};

type CommunityDragonSetData = {
  number: number;
  name?: string;
  augments?: string[];
  champions?: CommunityDragonChampion[];
  items?: string[];
  traits?: CommunityDragonTrait[];
};

type CommunityDragonTftData = {
  items?: CommunityDragonImageEntity[];
  setData?: CommunityDragonSetData[];
  sets?: Record<string, unknown>;
};

/* Traits type*/
type CommunityDragonTraitEffect = {
  minUnits?: number;
  maxUnits?: number;
  style?: number;
};
/*Can always expand if need details for each trait*/
type CommunityDragonTrait = {
  apiName?: string;
  name?: string;
  icon?: string;
  effects?: CommunityDragonTraitEffect[];
};

function toCommunityDragonAssetUrl(icon?: string) {
  if (!icon) {
    return undefined;
  }

  const cleanedPath = icon
    .replace(/^\/+/, "")
    .toLowerCase()
    .replace(/\.tex$/, ".png");

  return `${COMMUNITY_DRAGON_BASE_URL}/game/${cleanedPath}`;
}
let cachedTftData: CommunityDragonTftData | null = null;

function getLatestSet(data: CommunityDragonTftData) {
  if (!data.setData || data.setData.length === 0) {
    throw new Error("No TFT set data found");
  }

  return data.setData.reduce((latestSet, currentSet) => {
    return currentSet.number > latestSet.number ? currentSet : latestSet;
  });
}
async function fetchCommunityDragonTftData(): Promise<CommunityDragonTftData> {
  if (cachedTftData) {
    return cachedTftData;
  }
  const response = await fetch(COMMUNITY_DRAGON_TFT_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch CommunityDragon TFT data");
  }

  const data = (await response.json()) as CommunityDragonTftData;
  cachedTftData = data;
  return cachedTftData;
}
function getEntityId(entity: CommunityDragonImageEntity) {
  return entity.apiName ?? String(entity.id);
}

function getAugmentTier(
  augment: CommunityDragonImageEntity,
): StaticAugment["tier"] | undefined {
  const text = [augment.apiName, augment.id, augment.name, augment.icon]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (text.includes("prismatic")) return "prismatic";
  if (text.includes("gold")) return "gold";
  if (text.includes("silver")) return "silver";

  return undefined;
}
export async function inspectStaticDataShape() {
  const data = await fetchCommunityDragonTftData();
  const latestSet = data.setData ? getLatestSet(data) : null;
  const setData = data as Record<string, unknown>;
  const augmentIds = new Set(latestSet?.augments ?? []);

  const augmentObjects = (data.items ?? []).filter((item) =>
    augmentIds.has(getEntityId(item)),
  );
  return {
    topLevelKeys: Object.keys(data),
    itemsType: Array.isArray(data.items) ? "array" : typeof data.items,
    setDataType: Array.isArray(setData.setData)
      ? "array"
      : typeof setData.setData,
    setsType: Array.isArray(data.sets) ? "array" : typeof data.sets,
    setDataSample:
      Array.isArray(setData.setData) && setData.setData.length > 0
        ? Object.keys(setData.setData[0] as Record<string, unknown>)
        : null,
    setsKeys:
      data.sets && typeof data.sets === "object"
        ? Object.keys(data.sets)
        : null,
    itemSample:
      Array.isArray(data.items) && data.items.length > 0
        ? Object.keys(data.items[0] as Record<string, unknown>)
        : null,
    setDataSummary: Array.isArray(setData.setData)
      ? setData.setData.map((set) => {
          const typedSet = set as {
            name?: unknown;
            number?: unknown;
            champions?: unknown[];
            augments?: unknown[];
            augmentSample?: Record<string, unknown>;
            itemSample?: Record<string, unknown>;
          };

          return {
            name: typedSet.name,
            number: typedSet.number,
            championCount: Array.isArray(typedSet.champions)
              ? typedSet.champions.length
              : null,
            augmentCount: Array.isArray(typedSet.augments)
              ? typedSet.augments.length
              : null,
          };
        })
      : null,
    latestSetSummary: latestSet
      ? {
          name: latestSet.name,
          number: latestSet.number,
          championCount: latestSet.champions?.length ?? 0,
          itemCount: latestSet.items?.length ?? 0,
          augmentCount: latestSet.augments?.length ?? 0,
          itemSample: latestSet.items?.[0] ?? null,
          augmentSample: latestSet.augments?.[0] ?? null,
        }
      : null,
    augmentObjectCount: augmentObjects.length,

    augmentObjectKeys:
      augmentObjects.length > 0
        ? Object.keys(augmentObjects[0] as Record<string, unknown>)
        : null,

    augmentObjectSample: augmentObjects.length > 0 ? augmentObjects[0] : null,
  };
}

export async function getStaticChampions(): Promise<StaticChampion[]> {
  const data = await fetchCommunityDragonTftData();
  const latestSet = getLatestSet(data);
  return (latestSet.champions ?? [])
    .filter((champion) => champion.apiName && champion.name)
    .filter(
      (champion) =>
        (champion.apiName?.toLocaleLowerCase().includes("tft17") &&
          (champion.traits?.length ?? 0) > 0) ||
        champion.apiName?.toLocaleLowerCase().includes("tft17_summon"),
    )
    .map((champion) => ({
      id: champion.apiName ?? String(champion.id),
      name: champion.name ?? "Unknown",
      cost: champion.cost ?? 0,
      traits: champion.traits ?? [],
      imageUrl: toCommunityDragonAssetUrl(champion.icon),
    }));
}

export async function getStaticItems(): Promise<StaticItem[]> {
  const data = await fetchCommunityDragonTftData();
  const latestSet = getLatestSet(data);

  const itemIds = new Set(latestSet.items ?? []);
  /* INSPECTING ITEM PROPS 
  //return (data.items ?? [])
  */
  return (data.items ?? [])
    .filter((item) => itemIds.has(getEntityId(item)))
    .filter(
      (item) =>
        (getEntityId(item).toLowerCase().includes("tft_item") &&
          (item.composition?.length ?? 0) > 0) ||
        getEntityId(item).toLowerCase().includes("tft5_item") ||
        (getEntityId(item).toLowerCase().includes("tft17_item") &&
          (item.composition?.length ?? 0) > 0),
    )
    .filter((item) => item.name && item.name !== "None")
    .map((item) => ({
      id: getEntityId(item),
      name: item.name ?? "Unknown",
      imageUrl: toCommunityDragonAssetUrl(item.icon),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
function formatDescription(
  description?: string,
  effects?: Record<string, number | string>,
) {
  if (!description) {
    return undefined;
  }

  if (!effects) {
    return description;
  }

  return description.replace(/@([^@]+)@/g, (_match, key) => {
    const value = effects[key];

    return value === undefined ? key : String(value);
  });
}
export async function getStaticAugments(): Promise<StaticAugment[]> {
  const data = await fetchCommunityDragonTftData();
  const latestSet = getLatestSet(data);

  const augmentIds = new Set(latestSet.augments ?? []);
  // return data.items ?? [];
  return (data.items ?? [])
    .filter((item) => augmentIds.has(getEntityId(item)))
    .filter((item) => item.name && item.name !== "None")
    .filter((item) => item.desc)
    .map((augment) => ({
      id: getEntityId(augment),
      name: augment.name ?? "Unknown",
      imageUrl: toCommunityDragonAssetUrl(augment.icon),
      tier: getAugmentTier(augment),
      description: formatDescription(augment.desc, augment.effects),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getStaticTraits(): Promise<StaticTrait[]> {
  const data = await fetchCommunityDragonTftData();
  const latestSet = getLatestSet(data);

  return (latestSet.traits ?? [])
    .filter((trait) => trait.name && trait.name !== "None")
    .map((trait) => ({
      id: trait.apiName ?? trait.name ?? "Unknown",
      name: trait.name ?? "Unknown",
      imageUrl: toCommunityDragonAssetUrl(trait.icon),
      breakpoints: (trait.effects ?? [])
        .map((effect) => effect.minUnits)
        .filter((minUnits): minUnits is number => typeof minUnits === "number"),
    }))
    .filter((trait) => trait.breakpoints.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function inspectItemTags() {
  const data = await fetchCommunityDragonTftData();

  const tagMap: Record<string, string[]> = {};

  for (const item of data.items ?? []) {
    if (!item.tags || !item.name) continue;

    for (const tag of item.tags) {
      if (!tagMap[tag]) {
        tagMap[tag] = [];
      }

      tagMap[tag].push(item.name);
    }
  }

  return Object.entries(tagMap).map(([tag, itemNames]) => ({
    tag,
    count: itemNames.length,
    samples: itemNames.slice(0, 10),
  }));
}

export async function inspectTraitKeys(): Promise<string[]> {
  const data = await fetchCommunityDragonTftData();
  const latestSet = getLatestSet(data) as Record<string, unknown>;

  const traits = latestSet.traits;

  if (!Array.isArray(traits)) {
    return [];
  }

  return traits;
}

export async function syncStaticData() {
  const [champions, items, augments, traits] = await Promise.all([
    getStaticChampions(),
    getStaticItems(),
    getStaticAugments(),
    getStaticTraits(),
  ]);

  for (const champion of champions) {
    await prisma.staticChampion.upsert({
      where: {
        id: champion.id,
      },
      update: {
        name: champion.name,
        cost: champion.cost,
        traits: champion.traits,
        imageUrl: champion.imageUrl,
        setNumber: 17,
      },
      create: {
        id: champion.id,
        name: champion.name,
        cost: champion.cost,
        traits: champion.traits,
        imageUrl: champion.imageUrl,
        setNumber: 17,
      },
    });
  }
  for (const item of items) {
    await prisma.staticItem.upsert({
      where: {
        id: item.id,
      },
      update: {
        name: item.name,
        imageUrl: item.imageUrl,
        setNumber: 17,
      },
      create: {
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        setNumber: 17,
      },
    });
  }
  for (const augment of augments) {
    await prisma.staticAugment.upsert({
      where: { id: augment.id },
      update: {
        name: augment.name,
        imageUrl: augment.imageUrl,
        tier: augment.tier,
        description: augment.description,
        setNumber: 17,
      },
      create: {
        id: augment.id,
        name: augment.name,
        imageUrl: augment.imageUrl,
        tier: augment.tier,
        description: augment.description,
        setNumber: 17,
      },
    });
  }
  for (const trait of traits) {
    await prisma.staticTrait.upsert({
      where: { id: trait.id },
      update: {
        name: trait.name,
        breakpoints: trait.breakpoints,
        imageUrl: trait.imageUrl,
        setNumber: 17,
      },
      create: {
        id: trait.id,
        name: trait.name,
        breakpoints: trait.breakpoints,
        imageUrl: trait.imageUrl,
        setNumber: 17,
      },
    });
  }
  return {
    championCount: champions.length,
    itemCount: items.length,
    augmentCount: augments.length,
    traitCount: traits.length,
  };
}


