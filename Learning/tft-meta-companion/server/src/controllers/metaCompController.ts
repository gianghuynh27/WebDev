import type { Request, Response } from "express";
import { createMetaCompFromNames } from "../services/metaCompService";

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