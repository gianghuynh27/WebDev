import { Router } from "express";
import { getRiotMatchByIdController, importRiotMatchController, importRiotMatchesController } from "../controllers/riotApiController.js";

const router = Router();

router.get("/match/:matchId", getRiotMatchByIdController);
router.post("/match/:matchId", importRiotMatchController);
router.post("/import-matches", importRiotMatchesController);
export default router;