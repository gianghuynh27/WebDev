import type { AuthRequest, AuthResponse } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function signup(request: AuthRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Signup failed!");
  }

  return response.json();
}

export async function login(request: AuthRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Login failed!");
  }

  return response.json();
}
