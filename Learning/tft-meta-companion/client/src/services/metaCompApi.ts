import type { ApiMetaComp } from "../types/tft";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function getMetaComps(): Promise<ApiMetaComp[]> {
  const response = await fetch(`${API_URL}/api/meta-comps`);

  if (!response.ok) {
    throw new Error("Failed to load meta comps");
  }

  return response.json();
}