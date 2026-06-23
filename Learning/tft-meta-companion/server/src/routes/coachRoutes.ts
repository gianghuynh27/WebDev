import { Router } from "express";
import { getCoachRecommendationController } from "../controllers/coachController.js";

const router = Router();

router.post("/", getCoachRecommendationController);

export default router;