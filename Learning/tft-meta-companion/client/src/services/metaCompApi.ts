import type { ApiMetaComp } from "../types/tft";

const API_BASE_URL = "http://localhost:4000/api";

export async function getMetaComps(): Promise<ApiMetaComp[]> {
  const response = await fetch(`${API_BASE_URL}/meta-comps`);

  if (!response.ok) {
    throw new Error("Failed to load meta comps");
  }

  return response.json();
}