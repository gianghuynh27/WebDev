import type { Request, Response } from "express";
import { inspectStaticDataShape } from "../services/staticDataService";

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