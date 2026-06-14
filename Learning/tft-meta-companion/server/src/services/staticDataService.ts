import type {
  StaticAugment,
  StaticChampion,
  StaticItem,
} from "../types/staticData";

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
};

type CommunityDragonTftData = {
  items?: CommunityDragonImageEntity[];
  setData?: CommunityDragonSetData[];
  sets?: Record<string, unknown>;
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

function getLatestSet(data: CommunityDragonTftData) {
  if (!data.setData || data.setData.length === 0) {
    throw new Error("No TFT set data found");
  }

  return data.setData.reduce((latestSet, currentSet) => {
    return currentSet.number > latestSet.number ? currentSet : latestSet;
  });
}
async function fetchCommunityDragonTftData(): Promise<CommunityDragonTftData> {
  const response = await fetch(COMMUNITY_DRAGON_TFT_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch CommunityDragon TFT data");
  }

  return response.json();
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
        champion.apiName?.toLocaleLowerCase().includes("tft17") &&
        (champion.traits?.length ?? 0) > 0,
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
        getEntityId(item).toLowerCase().includes("tft5_item"),
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

  return (data.items ?? [])
    .filter((item) => augmentIds.has(getEntityId(item)))
    .filter(
      (item) =>
        getEntityId(item).toLowerCase().includes("tft_augment") ||
        getEntityId(item).toLowerCase().includes("tft17_augment"),
    )
    .filter((item) => (item.apiName || item.id) && item.name)
    .map((augment) => ({
      id: getEntityId(augment),
      name: augment.name ?? "Unknown",
      imageUrl: toCommunityDragonAssetUrl(augment.icon),
      tier: getAugmentTier(augment),
      description: formatDescription(augment.desc, augment.effects),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
