import { z } from "zod";

/**
 * Schéma pour la génération de menu journalier
 */
export const generateMenuSchema = z.object({
  dayIndex: z
    .number()
    .int()
    .min(1)
    .max(31)
    .optional()
    .describe("Index du jour à retourner (1-28, défaut: 1)"),
});

/**
 * Schéma pour la génération de menu mensuel
 */
export const generateMonthlyMenuSchema = z.object({
  days: z
    .number()
    .int()
    .min(1)
    .max(31)
    .optional()
    .describe("Nombre de jours à générer (défaut: 28)"),
  country: z
    .string()
    .optional()
    .describe("Pays de l'utilisateur pour choisir le bon plan alimentaire"),
});

/**
 * Types inférés depuis les schémas Zod
 */
export type GenerateMenuSchema = z.infer<typeof generateMenuSchema>;
export type GenerateMonthlyMenuSchema = z.infer<typeof generateMonthlyMenuSchema>;
