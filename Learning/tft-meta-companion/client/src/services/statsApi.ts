import type { StatsTableRow } from "../components/StatsTable";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";


export async function getChampionStats(): Promise<StatsTableRow[]> {
  const response = await fetch(`${API_URL}/api/stats/champions`);

  if (!response.ok) {
    throw new Error("Failed to load champion stats");
  }

  return response.json();
}

export async function getItemStats(): Promise<StatsTableRow[]> {
  const response = await fetch(`${API_URL}/api/stats/items`);

  if (!response.ok) {
    throw new Error("Failed to load item stats");
  }

  return response.json();
}