import { login, signup } from "../services/authService.js";
import { LoginRequest, SignupRequest } from "../types/auth.js";
import type { Request, Response } from "express";

export async function signupController(
//Request<Params, ResponseBody, RequestBody, Query>
  req: Request<unknown, unknown, SignupRequest>,
  res: Response,
) {
  try {
    const result = await signup(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Signup failed",
    });
  }
}

export async function loginController(
  req: Request<unknown, unknown, LoginRequest>,
  res: Response,
) {
  try {
    const result = await login(req.body);

    res.json(result);
  } catch (error) {
    res.status(401).json({
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
}
