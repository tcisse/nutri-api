export type Gender = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "extra_active";

export type Goal = "lose" | "maintain" | "gain";

export type WeightChangeRate = "0.5" | "1" | "1.5" | "2";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type DayOfMonth = number; // Validé côté schéma (1-31)

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
