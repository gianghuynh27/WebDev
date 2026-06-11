import { Router } from "express";
import { getStaticChampionsController, inspectStaticDataController } from "../controllers/staticDataController";

const router = Router();

router.get("/inspect", inspectStaticDataController);
router.get("/champions", getStaticChampionsController);

export default router;
