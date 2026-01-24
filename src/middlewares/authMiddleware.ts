import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-change-me";

export interface AuthRequest extends Request {
  adminId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, error: "Token manquant" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { adminId: string };
    req.adminId = decoded.adminId;
    next();
  } catch {
    res.status(401).json({ success: false, error: "Token invalide ou expiré" });
  }
};

export const generateToken = (adminId: string): string => {
  return jwt.sign({ adminId }, JWT_SECRET, { expiresIn: "7d" });
};
