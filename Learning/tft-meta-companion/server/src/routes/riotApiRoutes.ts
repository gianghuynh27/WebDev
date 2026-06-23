import { Router } from "express";
import { getRiotMatchByIdController } from "../controllers/riotApiController.js";

const router = Router();

router.get("/match/:matchId", getRiotMatchByIdController);

export default router;