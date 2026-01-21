export type Gender = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "extra_active";

export type Goal = "lose" | "maintain" | "gain";

export type WeightChangeRate = "0.5" | "1" | "1.5" | "2";

export const RATE_DAILY_ADJUSTMENT: Record<WeightChangeRate, number> = {
  "0.5": 500, 
  "1": 1000,   
  "1.5": 1500, 
  "2": 2000,   
};

export const MIN_CALORIES: Record<"male" | "female", number> = {
  male: 1500,
  female: 1200,
};

export interface UserInput {
  age: number;
  weight: number; // en kg
  height: number; // en cm
  gender: Gender;
  activity: ActivityLevel;
  goal: Goal;
  rate?: WeightChangeRate;
}

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
