import type { Request, Response } from "express";
import type { CoachRequest } from "../types/coach.js";
import { getCoachRecommendation } from "../services/coachService.js";

export async function getCoachRecommendationController(
  req: Request<unknown, unknown, CoachRequest>,
  res: Response,
) {
  const recommendation = await getCoachRecommendation(req.body);

  res.json(recommendation);
}