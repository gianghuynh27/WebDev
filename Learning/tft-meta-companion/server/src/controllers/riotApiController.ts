import { getTftMatchById, importTftMatch, importTftMatches } from "../services/riotApiService.js";
import type { Request, Response } from "express";

export async function getRiotMatchByIdController(req: Request, res: Response) {
  try {
    const matchId = String(req.params.matchId);
    const matchData = await getTftMatchById(matchId);
    res.json(matchData);
  } catch (error) {
    console.error("Error fetching Riot match:", error);
    res.status(500).json({ error: "Failed to fetch Riot match" });
  }
}
export async function importRiotMatchController(req: Request, res: Response) {
  try {
    const matchId = String(req.params.matchId);
    const result = await importTftMatch(matchId);

    res.status(201).json({
      id: result.id,
      gameVersion: result.gameVersion,
      gameDatetime: result.gameDatetime?.toString(),
      queueId: result.queueId,
      createdAt: result.createdAt,
    });
  } catch (error) {
    console.error("Error importing Riot match:", error);
    res.status(500).json({ error: "Failed to import Riot match" });
  }
}

export async function importRiotMatchesController(req: Request, res: Response) {
  try {
    const matchIds = req.body.matchIds;

    if (!Array.isArray(matchIds)) {
      return res.status(400).json({
        message: "matchIds must be an array",
      });
    }

    const cleanMatchIds = matchIds
      .map((matchId) => String(matchId).trim())
      .filter(Boolean);

    const result = await importTftMatches(cleanMatchIds);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error importing Riot matches:", error);
    res.status(500).json({ error: "Failed to import Riot matches" });
  }
}