import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { validateUserLicense } from "../services/licenseService.js";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-change-me";

export interface LicenseRequest extends Request {
  userId?: string;
  licenseActivation?: any;
}

/**
 * Middleware to require and validate a user's license before allowing access
 * This middleware:
 * 1. Validates the JWT token
 * 2. Extracts the user ID
 * 3. Validates the user's license (active, not expired, has quota)
 * 4. Attaches userId and licenseActivation to the request
 */
export const requireLicense = async (
  req: LicenseRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract user ID from JWT token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        error: "Authentification requise pour générer des menus",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT token
    let decoded: { userId: string };
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch (error) {
      res.status(401).json({
        success: false,
        error: "Token invalide ou expiré",
      });
      return;
    }

    req.userId = decoded.userId;

    // Validate user's license
    const validation = await validateUserLicense(decoded.userId);

    if (!validation.isValid) {
      res.status(403).json({
        success: false,
        error: validation.reason || "Licence invalide",
        requiresLicense: true,
      });
      return;
    }

    // Attach license activation info to request for potential use in handlers
    req.licenseActivation = validation.activation;

    next();
  } catch (error) {
    console.error("License middleware error:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la validation de la licence",
    });
  }
};
