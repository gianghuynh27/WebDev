import type { Request, Response } from "express";
import type { CoachRequest } from "../types/coach";
import { getCoachRecommendation } from "../services/coachService";

export function getCoachRecommendationController(
  req: Request<unknown, unknown, CoachRequest>,
  res: Response,
) {
  const recommendation = getCoachRecommendation(req.body);

  res.json(recommendation);
}