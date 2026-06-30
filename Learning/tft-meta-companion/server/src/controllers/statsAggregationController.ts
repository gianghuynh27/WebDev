import { rebuildStatsFromMatches } from "../services/statsAggregationService.js";
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