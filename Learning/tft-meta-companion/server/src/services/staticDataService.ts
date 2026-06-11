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
};

type CommunityDragonChampion = CommunityDragonImageEntity & {
  cost?: number;
  traits?: string[];
};

type CommunityDragonSetData = {
  number: number;
  name?: string;
  augments?: CommunityDragonImageEntity[];
  champions?: CommunityDragonChampion[];
  items?: CommunityDragonImageEntity[];
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

  return data.setData.reduce((latestSet, currentSet)=>{
    return currentSet.number > latestSet.number ? currentSet : latestSet;
  })
}
async function fetchCommunityDragonTftData(): Promise<CommunityDragonTftData> {
  const response = await fetch(COMMUNITY_DRAGON_TFT_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch CommunityDragon TFT data");
  }

  return response.json();
}

export async function inspectStaticDataShape() {
  const data = await fetchCommunityDragonTftData();

  const setData = data as Record<string, unknown>;

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
  };
}

export async function getStaticChampions(): Promise<StaticChampion[]> {
  const data = await fetchCommunityDragonTftData();
  const latestSet = getLatestSet(data);
  return (latestSet.champions ?? [])
    .filter((champion) => champion.apiName && champion.name)
    .map((champion) => ({
      id: champion.apiName ?? String(champion.id),
      name: champion.name ?? "Unknown",
      cost: champion.cost ?? 0,
      traits: champion.traits ?? [],
      imageUrl: toCommunityDragonAssetUrl(champion.icon),
    }));
}
