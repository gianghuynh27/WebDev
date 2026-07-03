import type { ResolvedMetaComp } from "../types/tft";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function getResolvedMetaComps(): Promise<ResolvedMetaComp[]> {
  const response = await fetch(`${API_URL}/api/meta-comps/resolved`);

  if (!response.ok) {
    throw new Error("Failed to load resolved meta comps");
  }

  return response.json();
}