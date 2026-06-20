const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export type StaticChampion = {
  id: string;
  name: string;
  cost: number;
  traits: string[];
  imageUrl?: string;
};
export type StaticItem = {
  id: string;
  name: string;
  imageUrl?: string;
};

export type StaticAugment = {
  id: string;
  name: string;
  imageUrl?: string;
  tier?: "silver" | "gold" | "prismatic";
  description?: string;
};

export type StaticTrait = {
  id: string;
  name: string;
  breakpoints: number[];
  imageUrl?: string;
};

export async function getStaticItems(): Promise<StaticItem[]> {
  const response = await fetch(`${API_URL}/api/static/items`);

  if (!response.ok) {
    throw new Error("Failed to load static items");
  }

  return response.json();
}

export async function getStaticAugments(): Promise<StaticAugment[]> {
  const response = await fetch(`${API_URL}/api/static/augments`);

  if (!response.ok) {
    throw new Error("Failed to load static augments");
  }

  return response.json();
}
export async function getStaticChampions(): Promise<StaticChampion[]> {
  const response = await fetch(`${API_URL}/api/static/champions`);

  if (!response.ok) {
    throw new Error("Failed to load static champions");
  }

  return response.json();
}

export async function getStaticTraits(): Promise<StaticTrait[]> {
  const response = await fetch(`${API_URL}/api/static/traits`);

  if (!response.ok) {
    throw new Error("Failed to load static traits");
  }

  return response.json();
}
