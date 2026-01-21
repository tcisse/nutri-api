// Types pour l'utilisateur et les calculs
export type Gender = "male" | "female";

export type ActivityLevel =
  | "sedentary" // Sédentaire (peu ou pas d'exercice)
  | "light" // Légèrement actif (exercice léger 1-3 jours/semaine)
  | "moderate" // Modérément actif (exercice modéré 3-5 jours/semaine)
  | "active" // Très actif (exercice intense 6-7 jours/semaine)
  | "extra_active"; // Extrêmement actif (exercice très intense, travail physique)

export type Goal = "lose" | "maintain" | "gain";

export interface UserInput {
  age: number;
  weight: number; // en kg
  height: number; // en cm
  gender: Gender;
  activity: ActivityLevel;
  goal: Goal;
}

// Types pour les portions et groupes alimentaires
export type FoodGroup = "starch" | "fruit" | "milk" | "veg" | "protein" | "fat";

export interface PortionBudget {
  starch: number;
  fruit: number;
  milk: number;
  veg: number;
  protein: number;
  fat: number;
}

// Types pour les aliments
export interface Food {
  id: string;
  name: string;
  group: FoodGroup;
  portion: string; // Description de la portion (ex: "1/3 tasse", "28g")
  tags: string[];
}

// Types pour les repas
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface MealPortion {
  starch: number;
  fruit: number;
  milk: number;
  veg: number;
  protein: number;
  fat: number;
}

export interface MealItem {
  food: Food;
  portions: number;
  quantity: string; // Description de la quantité totale
}

export interface Meal {
  type: MealType;
  items: MealItem[];
  totalPortions: MealPortion;
}

export interface DailyMenu {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snack: Meal;
}

// Types pour le menu hebdomadaire
export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface WeeklyMenu {
  monday: DailyMenu;
  tuesday: DailyMenu;
  wednesday: DailyMenu;
  thursday: DailyMenu;
  friday: DailyMenu;
  saturday: DailyMenu;
  sunday: DailyMenu;
}

export interface WeeklyMenuSummary {
  totalPortionsPerDay: PortionBudget;
  totalFoodsPerDay: number;
  daysGenerated: number;
}

// Types pour le menu mensuel
export type DayOfMonth = number; // Validé côté schéma (1-31)

export type MonthlyMenu = Record<DayOfMonth, DailyMenu>;

export interface MonthlyMenuSummary {
  totalPortionsPerDay: PortionBudget;
  totalFoodsPerDay: number;
  daysGenerated: number;
}

// Types pour les réponses API
export interface CalorieResult {
  bmr: number; // Métabolisme de base
  tdee: number; // Dépense énergétique totale
  targetCalories: number; // Calories après objectif
  roundedCalories: number; // Calories arrondies à la centaine
  portionBudget: PortionBudget;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Types pour le dispatching
export type Priority = "high" | "medium" | "low";

export interface MealPriority {
  starch?: Priority;
  fruit?: Priority;
  milk?: Priority;
  veg?: Priority;
  protein?: Priority;
  fat?: Priority;
}

export interface DispatchPriority {
  breakfast: MealPriority;
  lunch: MealPriority;
  dinner: MealPriority;
  snack: MealPriority;
}
