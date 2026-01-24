import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("L'email est invalide"),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  gender: z.enum(["male", "female"]),
  height: z.number().min(100).max(250),
  country: z.string().min(2),
});

export const loginUserSchema = z.object({
  email: z.string().email("L'email est invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export const createSessionSchema = z.object({
  weight: z.number().min(30).max(300),
  age: z.number().int().min(15).max(100),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "extra_active"]),
  goal: z.enum(["lose", "maintain", "gain"]),
  rate: z.enum(["0.5", "1", "1.5", "2"]).optional(),
}).refine(
  (data) => data.goal === "maintain" || data.rate !== undefined,
  { message: "Le rythme est requis pour perte/prise de poids", path: ["rate"] }
);

export const saveMenuSchema = z.object({
  data: z.any(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type CreateSessionSchema = z.infer<typeof createSessionSchema>;
