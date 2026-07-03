import type { Request, Response } from "express";
import { createMetaCompFromNames, getMetaComps, getResolvedMetaComps } from "../services/metaCompService.js";

export async function createMetaCompController(req: Request, res: Response) {
  try {
    const result = await createMetaCompFromNames(req.body);

    res.status(201).json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create meta comp";

    res.status(400).json({ message });
  }
}

export async function getMetaCompsController(_req: Request, res: Response) {
  try {
    const result = await getMetaComps();

    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to load meta comps" });
  }
}

export async function getResolvedMetaCompsController(
  _req: Request,
  res: Response,
) {
  try {
    const result = await getResolvedMetaComps();

    res.json(result);
  } catch (error) {
    console.error("Error loading resolved meta comps:", error);
    res.status(500).json({ message: "Failed to load resolved meta comps" });
  }
}