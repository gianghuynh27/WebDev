const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export type StaticChampion = {
  id: string;
  name: string;
  cost: number;
  traits: string[];
  imageUrl?: string;
};

export async function getStaticChampions(): Promise<StaticChampion[]> {
  const response = await fetch(`${API_URL}/api/static/champions`);

  if (!response.ok) {
    throw new Error("Failed to load static champions");
  }

  return response.json();
}