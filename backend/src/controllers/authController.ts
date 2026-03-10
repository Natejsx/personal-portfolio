import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export async function login(req: Request, res: Response): Promise<void> {
  const { password } = req.body;

  if (!password || typeof password !== "string") {
    res.status(400).json({ message: "Password required" });
    return;
  }

  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  const jwtSecret = process.env.JWT_SECRET ?? "";

  // Constant-time comparison to prevent timing attacks
  const inputBuffer = Buffer.from(password);
  const adminBuffer = Buffer.from(adminPassword);

  if (
    inputBuffer.length !== adminBuffer.length ||
    !crypto.timingSafeEqual(inputBuffer, adminBuffer)
  ) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }

  const token = jwt.sign({ role: "admin" }, jwtSecret, { expiresIn: "7d" });
  res.json({ token });
}
