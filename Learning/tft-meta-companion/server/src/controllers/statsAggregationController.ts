import { getChampionStatsForClient, getItemStatsForClient, rebuildStatsFromMatches } from "../services/statsAggregationService.js";
import type { Request, Response } from "express";

export async function rebuildStatsController(_req: Request, res: Response) {
  try {
    const result = await rebuildStatsFromMatches();

    res.json(result);
  } catch (error) {
    console.error("Error rebuilding stats:", error);
    res.status(500).json({ message: "Failed to rebuild stats" });
  }
}

export async function getChampionStatsController(_req: Request, res: Response) {
  try {
    const result = await getChampionStatsForClient();

    res.json(result);
  } catch (error) {
    console.error("Error loading champion stats:", error);
    res.status(500).json({ message: "Failed to load champion stats" });
  }
}

export async function getItemStatsController(_req: Request, res: Response) {
  try {
    const result = await getItemStatsForClient();

    res.json(result);
  } catch (error) {
    console.error("Error loading item stats:", error);
    res.status(500).json({ message: "Failed to load item stats" });
  }
}