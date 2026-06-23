import { Router } from "express";
import { createMetaCompController, getMetaCompsController } from "../controllers/metaCompController.js";

const router = Router();

router.post("/", createMetaCompController);
router.get("/", getMetaCompsController);
export default router;