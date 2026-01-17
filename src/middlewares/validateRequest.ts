import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

/**
 * Middleware factory pour valider le body d'une requête avec un schéma Zod
 */
export const validateRequest = <T>(schema: ZodSchema<T>) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      // Parse et valide le body
      const validatedData = schema.parse(req.body);
      // Remplace le body par les données validées (et potentiellement transformées)
      req.body = validatedData;
      next();
    } catch (error) {
      // Passe l'erreur au middleware d'erreur
      next(error);
    }
  };
};
