import { Router } from "express";
import { createMetaCompController } from "../controllers/metaCompController";

const router = Router();

router.post("/", createMetaCompController);

export default router;