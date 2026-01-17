import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import type { ApiResponse } from "../types/index.js";

/**
 * Classe d'erreur personnalisée pour l'API
 */
export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

/**
 * Middleware de gestion des erreurs centralisé
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<ApiResponse<null>>,
  _next: NextFunction
): void => {
  console.error("[ERROR]", err);

  // Erreur de validation Zod
  if (err instanceof ZodError) {
    const errorMessages = err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");

    res.status(400).json({
      success: false,
      error: `Erreur de validation: ${errorMessages}`,
    });
    return;
  }

  // Erreur API personnalisée
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  // Erreur générique
  res.status(500).json({
    success: false,
    error: "Une erreur interne est survenue",
  });
};

/**
 * Middleware pour les routes non trouvées
 */
export const notFoundHandler = (_req: Request, res: Response<ApiResponse<null>>): void => {
  res.status(404).json({
    success: false,
    error: "Route non trouvée",
  });
};
