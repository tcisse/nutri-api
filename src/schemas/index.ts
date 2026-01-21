import { z } from "zod";

/**
 * Schéma pour les données utilisateur (calcul calorique)
 */
export const userInputSchema = z.object({
  age: z
    .number()
    .int("L'âge doit être un nombre entier")
    .min(15, "L'âge minimum est de 15 ans")
    .max(100, "L'âge maximum est de 100 ans"),

  weight: z
    .number()
    .positive("Le poids doit être positif")
    .min(30, "Le poids minimum est de 30 kg")
    .max(300, "Le poids maximum est de 300 kg"),

  height: z
    .number()
    .positive("La taille doit être positive")
    .min(100, "La taille minimum est de 100 cm")
    .max(250, "La taille maximum est de 250 cm"),

  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Le genre doit être 'male' ou 'female'" }),
  }),

  activity: z.enum(["sedentary", "light", "moderate", "active", "extra_active"], {
    errorMap: () => ({
      message:
        "Le niveau d'activité doit être 'sedentary', 'light', 'moderate', 'active' ou 'extra_active'",
    }),
  }),

  goal: z.enum(["lose", "maintain", "gain"], {
    errorMap: () => ({ message: "L'objectif doit être 'lose', 'maintain' ou 'gain'" }),
  }),

  rate: z
    .enum(["0.5", "1", "1.5", "2"], {
      errorMap: () => ({ message: "Le rythme doit être '0.5', '1', '1.5' ou '2'" }),
    })
    .optional()
    .describe("Rythme de perte/prise en kg/semaine (requis si goal != maintain)"),
}).refine(
  (data) => data.goal === "maintain" || data.rate !== undefined,
  {
    message: "Le rythme (rate) est requis pour les objectifs de perte ou prise de poids",
    path: ["rate"],
  }
);

/**
 * Schéma pour le budget portions (génération de menu)
 */
export const portionBudgetSchema = z.object({
  starch: z.number().int().min(0).max(20),
  fruit: z.number().int().min(0).max(10),
  milk: z.number().int().min(0).max(10),
  veg: z.number().int().min(0).max(10),
  protein: z.number().int().min(0).max(15),
  fat: z.number().int().min(0).max(15),
});

/**
 * Schéma pour la requête de génération de menu
 */
export const generateMenuSchema = z.object({
  portionBudget: portionBudgetSchema,
  preferredRegion: z
    .string()
    .optional()
    .describe("Tag de région préférée (senegal, benin, mali, etc.)"),
});

/**
 * Schéma pour la requête de génération de menu hebdomadaire
 */
export const generateWeeklyMenuSchema = z.object({
  portionBudget: portionBudgetSchema,
  preferredRegion: z
    .string()
    .optional()
    .describe("Tag de région préférée (senegal, benin, mali, etc.)"),
});

/**
 * Schéma pour la requête de génération de menu mensuel
 */
export const generateMonthlyMenuSchema = z.object({
  portionBudget: portionBudgetSchema,
  preferredRegion: z
    .string()
    .optional()
    .describe("Tag de région préférée (senegal, benin, mali, etc.)"),
  days: z
    .number()
    .int()
    .min(1)
    .max(31)
    .optional()
    .describe("Nombre de jours à générer (défaut: 30)"),
});

/**
 * Schéma pour régénérer un jour spécifique
 */
export const regenerateDaySchema = z.object({
  day: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], {
    errorMap: () => ({ message: "Le jour doit être un jour valide de la semaine (en anglais)" }),
  }),
  portionBudget: portionBudgetSchema,
  preferredRegion: z.string().optional(),
});

/**
 * Schéma pour régénérer un jour spécifique du menu mensuel
 */
export const regenerateMonthDaySchema = z.object({
  day: z
    .number()
    .int("Le jour doit être un entier")
    .min(1, "Le jour minimum est 1")
    .max(31, "Le jour maximum est 31"),
  portionBudget: portionBudgetSchema,
  preferredRegion: z.string().optional(),
});

/**
 * Types inférés depuis les schémas Zod
 */
export type UserInputSchema = z.infer<typeof userInputSchema>;
export type PortionBudgetSchema = z.infer<typeof portionBudgetSchema>;
export type GenerateMenuSchema = z.infer<typeof generateMenuSchema>;
export type GenerateWeeklyMenuSchema = z.infer<typeof generateWeeklyMenuSchema>;
export type RegenerateDaySchema = z.infer<typeof regenerateDaySchema>;
export type GenerateMonthlyMenuSchema = z.infer<typeof generateMonthlyMenuSchema>;
export type RegenerateMonthDaySchema = z.infer<typeof regenerateMonthDaySchema>;
