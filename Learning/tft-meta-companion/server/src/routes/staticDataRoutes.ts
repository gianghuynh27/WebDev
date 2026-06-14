import { Router } from "express";
import {
    getStaticAugmentsController,
  getStaticChampionsController,
  getStaticItemsController,
  inspectStaticDataController,
  inspectStaticItemsController,
} from "../controllers/staticDataController";

const router = Router();

router.get("/inspect", inspectStaticDataController);
router.get("/champions", getStaticChampionsController);
router.get("/items", getStaticItemsController);
router.get("/augments", getStaticAugmentsController);
router.get("/items/tags", inspectStaticItemsController);
export default router;
