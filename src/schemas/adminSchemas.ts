import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const adminCreateSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
});

export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;
export type AdminCreateSchema = z.infer<typeof adminCreateSchema>;
