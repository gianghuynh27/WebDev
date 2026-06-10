import { Router } from "express";
import { inspectStaticDataController } from "../controllers/staticDataController";

const router = Router();

router.get("/inspect", inspectStaticDataController);

export default router;
