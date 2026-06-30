import type { Request, Response } from "express";
import {
  getStaticAugments,
  getStaticChampions,
  getStaticItems,
  getStaticTraits,
  inspectItemTags,
  inspectStaticDataShape,
  inspectTraitKeys,
  syncStaticData,
} from "../services/staticDataService.js";

export async function inspectStaticDataController(
  _req: Request,
  res: Response,
) {
  try {
    const result = await inspectStaticDataShape();

    res.json(result);
  } catch {
    res.status(500).json({
      message: "Failed to inspect static data",
    });
  }
}
export async function inspectStaticItemsController(
  _req: Request,
  res: Response,
) {
  try {
    const result = await inspectItemTags();
    res.json(result);
  } catch {
    res.status(500).json({
      message: "Failed to inspect static data",
    });
  }
}

export async function getStaticChampionsController(
  _req: Request,
  res: Response,
) {
  try {
    const result = await getStaticChampions();

    res.json(result);
  } catch {
    res.status(500).json({
      message: "Failed to inspect static data",
    });
  }
}
export async function getStaticItemsController(_req: Request, res: Response) {
  try {
    const result = await getStaticItems();
    res.json(result);
    //console.log(result.length);
  } catch {
    res.status(500).json({ message: "Failed to load static items" });
  }
}

export async function getStaticAugmentsController(
  _req: Request,
  res: Response,
) {
  try {
    const result = await getStaticAugments();
    //console.log(result.length);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to load static augments" });
  }
}
export async function getStaticTraitsController(_req: Request, res: Response) {
  try {
    const result = await getStaticTraits();

    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to load static traits" });
  }
}
export async function inspectTraitKeysController(_req: Request, res: Response) {
  try {
    const result = await inspectTraitKeys();
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to inspect trait keys" });
  }
}

export async function syncStaticDataController(_req: Request, res: Response) {
  try {
    const result = await syncStaticData();

    res.json(result);
  } catch (error) {
    console.error("Error rebuilding stats:", error);
    res.status(500).json({ message: "Failed to rebuild stats" });
  }
}