import { Router } from "express";
import { createMetaCompController, getMetaCompsController, getResolvedMetaCompsController } from "../controllers/metaCompController.js";

const router = Router();

router.post("/", createMetaCompController);
router.get("/", getMetaCompsController);
router.get("/resolved", getResolvedMetaCompsController);
export default router;