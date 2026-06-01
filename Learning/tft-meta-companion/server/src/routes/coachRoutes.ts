import { Router } from "express";
import { getCoachRecommendationController } from "../controllers/coachController";

const router = Router();

router.post("/", getCoachRecommendationController);

export default router;