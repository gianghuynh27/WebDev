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

type CommunityDragonTftData = {
  sets?: unknown[];
  items?: unknown[];
  augments?: unknown[];
};

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
  };
}
