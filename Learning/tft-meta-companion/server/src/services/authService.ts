import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { AuthResponse, LoginRequest, SignupRequest } from "../types/auth";


function createToken(userId: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  return jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });
}

export async function signup(request: SignupRequest): Promise<AuthResponse> {
  const email = request.email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("Email is already in use!");
  }

  const passwordHash = await bcrypt.hash(request.password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  //Generate JWT token
  const token = createToken(user.id);

  //Returns in AuthResponse type
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const email = request.email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    request.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = createToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}
