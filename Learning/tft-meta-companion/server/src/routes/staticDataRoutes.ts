import { Router } from "express";
import {
    getStaticAugmentsController,
  getStaticChampionsController,
  getStaticItemsController,
  getStaticTraitsController,
  inspectStaticDataController,
  inspectStaticItemsController,
  inspectTraitKeysController,
  syncStaticDataController,
  
} from "../controllers/staticDataController.js";

const router = Router();

router.get("/inspect", inspectStaticDataController);
router.get("/champions", getStaticChampionsController);
router.get("/items", getStaticItemsController);
router.get("/augments", getStaticAugmentsController);
router.get("/items/tags", inspectStaticItemsController);
router.get("/traits", getStaticTraitsController);
router.get("/inspect/traits", inspectTraitKeysController);
router.post("/sync", syncStaticDataController);
export default router;
