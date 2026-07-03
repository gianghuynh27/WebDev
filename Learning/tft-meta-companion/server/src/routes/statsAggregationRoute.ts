import { getChampionStatsController, getItemStatsController, rebuildStatsController } from "../controllers/statsAggregationController.js";
import {Router} from "express";

const router = Router();
router.post("/rebuild-stats", rebuildStatsController);
router.get("/champions", getChampionStatsController);
router.get("/items", getItemStatsController);
export default router;