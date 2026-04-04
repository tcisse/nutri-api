import { getDayPlanForCountry } from "../constants/mealPlanDatabase.js";
import type { DayPlan, MealItem } from "../constants/mealPlanDatabase.js";

type MealKey = "breakfast" | "lunch" | "snack" | "dinner";

const MEAL_NAMES: Record<MealKey, string> = {
  breakfast: "Petit-déjeuner",
  lunch: "Déjeuner",
  snack: "Collation",
  dinner: "Dîner",
};

/**
 * Formate les items d'un repas pour l'API
 */
const formatMealItems = (items: MealItem[]) => {
  return items.map((item) => ({
    aliment: item.name,
  }));
};

/**
 * Formate un jour du plan pour l'affichage
 */
const formatDayForDisplay = (dayPlan: DayPlan, dayNumber: number) => {
  return {
    jour: `Jour ${dayNumber}`,
    semaine: `Semaine ${dayPlan.week}`,
    jourSemaine: dayPlan.weekDay,
    petit_dejeuner: {
      name: MEAL_NAMES.breakfast,
      items: formatMealItems(dayPlan.meals.breakfast),
    },
    dejeuner: {
      name: MEAL_NAMES.lunch,
      items: formatMealItems(dayPlan.meals.lunch),
    },
    collation: {
      name: MEAL_NAMES.snack,
      items: formatMealItems(dayPlan.meals.snack),
    },
    diner: {
      name: MEAL_NAMES.dinner,
      items: formatMealItems(dayPlan.meals.dinner),
    },
  };
};

/**
 * Retourne le menu mensuel complet selon le pays (par défaut 28 jours)
 */
export const getMonthlyMenu = async (
  days: number = 28,
  country: string = "general"
): Promise<Record<number, object>> => {
  const totalDays = Math.max(1, Math.min(31, days));
  const result: Record<number, object> = {};

  for (let i = 1; i <= totalDays; i++) {
    const dayPlan = await getDayPlanForCountry(country, i);
    result[i] = formatDayForDisplay(dayPlan, i);
  }

  return result;
};

/**
 * Calcule le résumé du menu mensuel
 */
export const getMonthlyMenuSummary = async (
  days: number = 28,
  country: string = "general"
) => {
  const totalDays = Math.max(1, Math.min(31, days));
  let totalItems = 0;

  for (let i = 1; i <= totalDays; i++) {
    const dayPlan = await getDayPlanForCountry(country, i);
    const meals = [
      dayPlan.meals.breakfast,
      dayPlan.meals.lunch,
      dayPlan.meals.snack,
      dayPlan.meals.dinner,
    ];
    totalItems += meals.reduce((acc, meal) => acc + meal.length, 0);
  }

  return {
    daysGenerated: totalDays,
    totalFoodsPerDay: Math.round(totalItems / totalDays),
  };
};
