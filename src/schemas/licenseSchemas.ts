import { z } from "zod";

/**
 * Schema for creating a new license
 */
export const createLicenseSchema = z
  .object({
    type: z.enum(["QUOTA", "SUBSCRIPTION"], {
      errorMap: () => ({ message: "Le type doit être QUOTA ou SUBSCRIPTION" }),
    }),
    name: z
      .string()
      .min(3, "Le nom doit contenir au moins 3 caractères")
      .max(100, "Le nom ne peut pas dépasser 100 caractères"),
    description: z
      .string()
      .max(500, "La description ne peut pas dépasser 500 caractères")
      .optional(),
    menuQuota: z
      .number()
      .int("Le quota doit être un nombre entier")
      .min(1, "Le quota doit être au moins 1")
      .max(1000, "Le quota ne peut pas dépasser 1000")
      .optional(),
    durationDays: z
      .number()
      .int("La durée doit être un nombre entier")
      .min(1, "La durée doit être au moins 1 jour")
      .max(3650, "La durée ne peut pas dépasser 3650 jours (10 ans)")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.type === "QUOTA") return data.menuQuota !== undefined;
      if (data.type === "SUBSCRIPTION") return data.durationDays !== undefined;
      return false;
    },
    {
      message:
        "menuQuota est requis pour le type QUOTA, durationDays est requis pour le type SUBSCRIPTION",
      path: ["type"],
    }
  );

/**
 * Schema for activating a license
 */
export const activateLicenseSchema = z.object({
  code: z
    .string()
    .min(1, "Le code de licence est requis")
    .regex(
      /^NUTRI-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/,
      "Le code de licence doit être au format NUTRI-XXXX-XXXX-XXXX"
    ),
});

/**
 * Schema for filtering licenses
 */
export const getLicensesFilterSchema = z.object({
  type: z.enum(["QUOTA", "SUBSCRIPTION"]).optional(),
  isActive: z.boolean().optional(),
  search: z.string().optional(),
});

/**
 * Schema for deactivating a license
 */
export const deactivateLicenseSchema = z.object({
  reason: z
    .string()
    .max(500, "La raison ne peut pas dépasser 500 caractères")
    .optional(),
});

// Type exports for TypeScript
export type CreateLicenseSchema = z.infer<typeof createLicenseSchema>;
export type ActivateLicenseSchema = z.infer<typeof activateLicenseSchema>;
export type GetLicensesFilterSchema = z.infer<typeof getLicensesFilterSchema>;
export type DeactivateLicenseSchema = z.infer<typeof deactivateLicenseSchema>;
