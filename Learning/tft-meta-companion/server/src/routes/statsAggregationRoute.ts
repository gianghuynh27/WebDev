import { rebuildStatsController } from "../controllers/statsAggregationController.js";
import {Router} from "express";

const router = Router();
router.post("/rebuild-stats", rebuildStatsController);

export default router;