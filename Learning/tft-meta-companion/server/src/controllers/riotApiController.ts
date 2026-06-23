import { getTftMatchById } from "../services/riotApiService.js";
import type { Request, Response } from "express";

export async function getRiotMatchByIdController(req: Request, res: Response){
    try {
        const matchId = String(req.params.matchId);
        const matchData = await getTftMatchById(matchId);
        res.json(matchData);
    } catch (error) {
        console.error("Error fetching Riot match:", error);
        res.status(500).json({ error: "Failed to fetch Riot match" });
    }
}