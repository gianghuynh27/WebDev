import { Router } from "express";
import {
  getDbStaticAugmentsController,
  getDbStaticChampionsController,
  getDbStaticItemsController,
  getDbStaticTraitsController,
  inspectStaticDataController,
  inspectStaticItemsController,
  inspectTraitKeysController,
  syncStaticDataController,
} from "../controllers/staticDataController.js";

const router = Router();

router.get("/inspect", inspectStaticDataController);
router.get("/champions", getDbStaticChampionsController);
router.get("/items", getDbStaticItemsController);
router.get("/augments", getDbStaticAugmentsController);
router.get("/items/tags", inspectStaticItemsController);
router.get("/traits", getDbStaticTraitsController);
router.get("/inspect/traits", inspectTraitKeysController);
router.post("/sync", syncStaticDataController);
export default router;
