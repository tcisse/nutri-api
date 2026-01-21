import type {
  DailyMenu,
  DayOfMonth,
  DayOfWeek,
  Food,
  FoodGroup,
  Meal,
  MealItem,
  MealPortion,
  MealType,
  MonthlyMenu,
  MonthlyMenuSummary,
  PortionBudget,
  WeeklyMenu,
  WeeklyMenuSummary,
} from "../types/index.js";
import { dispatchPortions } from "../constants/dispatchPriority.js";
import { getRandomFoodByGroup } from "../constants/foodDatabase.js";

const DEFAULT_MONTH_DAYS = 30;

/**
 * Noms des repas en français
 */
const MEAL_NAMES: Record<MealType, string> = {
  breakfast: "Petit-déjeuner",
  lunch: "Déjeuner",
  dinner: "Dîner",
  snack: "Collation",
};

/**
 * Simplifie les fractions courantes pour un affichage plus naturel
 * Ex: "2 × 1/3 tasse" → "2/3 de tasse"
 * Ex: "3 × 1/3 tasse" → "1 tasse"
 */
const simplifyQuantity = (portions: number, portionStr: string): string => {
  // Patterns de fractions à simplifier
  const fractionPatterns = [
    { regex: /1\/3\s*tasse/i, unit: "tasse", fraction: 1/3 },
    { regex: /2\/3\s*tasse/i, unit: "tasse", fraction: 2/3 },
    { regex: /1\/2\s*tasse/i, unit: "tasse", fraction: 1/2 },
    { regex: /1\/4\s*tasse/i, unit: "tasse", fraction: 1/4 },
    { regex: /1\/8\s*avocat/i, unit: "avocat", fraction: 1/8 },
  ];

  for (const pattern of fractionPatterns) {
    if (pattern.regex.test(portionStr)) {
      const total = portions * pattern.fraction;
      
      // Cas entier
      if (total === 1) {
        return `1 ${pattern.unit}`;
      }
      if (total === Math.floor(total)) {
        return `${total} ${pattern.unit}${total > 1 ? "s" : ""}`;
      }
      
      // Cas fractions simples
      if (total === 0.5) return `1/2 ${pattern.unit}`;
      if (total === 0.25) return `1/4 ${pattern.unit}`;
      if (total === 0.75) return `3/4 ${pattern.unit}`;
      if (Math.abs(total - 1/3) < 0.01) return `1/3 ${pattern.unit}`;
      if (Math.abs(total - 2/3) < 0.01) return `2/3 de ${pattern.unit}`;
      
      // Cas mixtes (ex: 1.5 tasse)
      if (total > 1) {
        const wholepart = Math.floor(total);
        const remainder = total - wholepart;
        
        // Si pas de reste significatif, juste le nombre entier
        if (remainder < 0.05) {
          return `${wholepart} ${pattern.unit}${wholepart > 1 ? "s" : ""}`;
        }
        
        if (Math.abs(remainder - 0.5) < 0.05) {
          return `${wholepart} ${pattern.unit}${wholepart > 1 ? "s" : ""} et 1/2`;
        }
        if (Math.abs(remainder - 1/3) < 0.05) {
          return `${wholepart} ${pattern.unit}${wholepart > 1 ? "s" : ""} et 1/3`;
        }
        if (Math.abs(remainder - 2/3) < 0.05) {
          return `${wholepart} ${pattern.unit}${wholepart > 1 ? "s" : ""} et 2/3`;
        }
        if (Math.abs(remainder - 0.25) < 0.05) {
          return `${wholepart} ${pattern.unit}${wholepart > 1 ? "s" : ""} et 1/4`;
        }
        if (Math.abs(remainder - 0.75) < 0.05) {
          return `${wholepart} ${pattern.unit}${wholepart > 1 ? "s" : ""} et 3/4`;
        }
        
        // Fallback pour les autres fractions
        return `environ ${total.toFixed(1)} ${pattern.unit}${total > 1 ? "s" : ""}`;
      }
    }
  }

  // Pour les autres cas (grammes, unités, etc.)
  // Essayer de simplifier "X × Yg" en "Zg"
  const gramsMatch = portionStr.match(/(\d+)\s*g/i);
  if (gramsMatch) {
    const baseGrams = parseInt(gramsMatch[1]);
    const totalGrams = portions * baseGrams;
    return `${totalGrams}g`;
  }

  // Pour les unités (œuf, tranche, etc.)
  const unitMatch = portionStr.match(/1\s*(oeuf|œuf|tranche|petite?)/i);
  if (unitMatch) {
    if (portions === 1) return portionStr;
    const unit = unitMatch[1].toLowerCase();
    if (unit === "oeuf" || unit === "œuf") {
      return `${portions} oeufs`;
    }
    if (unit === "tranche") {
      return `${portions} tranches`;
    }
    if (unit.startsWith("petit")) {
      return `${portions} petites`;
    }
  }

  // Pour les cuillères
  const spoonMatch = portionStr.match(/(\d+)\s*c\.à\.(s|c)/i);
  if (spoonMatch) {
    const baseAmount = parseInt(spoonMatch[1]);
    const spoonType = spoonMatch[2].toLowerCase() === "s" ? "c.à.s" : "c.à.c";
    const total = portions * baseAmount;
    return `${total} ${spoonType}`;
  }

  // Fallback: format standard
  if (portions === 1) {
    return portionStr;
  }
  return `${portions} × ${portionStr}`;
};

/**
 * Génère la description de quantité en fonction du nombre de portions
 */
const formatQuantity = (food: Food, portions: number): string => {
  return simplifyQuantity(portions, food.portion);
};

/**
 * Génère les items d'un repas à partir des portions allouées
 * @param portions - Les portions pour chaque groupe
 * @param preferredRegion - La région préférée pour les aliments
 * @param usedFoodIds - IDs des aliments déjà utilisés (pour éviter les répétitions)
 * @returns Les items du repas et les IDs des aliments utilisés
 */
const generateMealItems = (
  portions: MealPortion, 
  preferredRegion?: string,
  usedFoodIds: string[] = []
): { items: MealItem[]; usedIds: string[] } => {
  const items: MealItem[] = [];
  const newUsedIds = [...usedFoodIds];
  const groups: FoodGroup[] = ["starch", "fruit", "milk", "veg", "protein", "fat"];

  for (const group of groups) {
    const portionCount = portions[group];

    if (portionCount > 0) {
      // Passer les IDs déjà utilisés pour éviter les répétitions
      const food = getRandomFoodByGroup(group, preferredRegion, newUsedIds);

      if (food) {
        items.push({
          food,
          portions: portionCount,
          quantity: formatQuantity(food, portionCount),
        });
        // Ajouter l'ID à la liste des utilisés
        newUsedIds.push(food.id);
      }
    }
  }

  return { items, usedIds: newUsedIds };
};

/**
 * Génère un repas complet
 * @param type - Type de repas
 * @param portions - Portions pour ce repas
 * @param preferredRegion - Région préférée
 * @param usedFoodIds - IDs des aliments déjà utilisés dans la journée
 * @returns Le repas et les nouveaux IDs utilisés
 */
const generateMealWithTracking = (
  type: MealType, 
  portions: MealPortion, 
  preferredRegion?: string,
  usedFoodIds: string[] = []
): { meal: Meal; usedIds: string[] } => {
  const { items, usedIds } = generateMealItems(portions, preferredRegion, usedFoodIds);

  return {
    meal: {
      type,
      items,
      totalPortions: portions,
    },
    usedIds,
  };
};

/**
 * Génère un repas complet (version simple sans tracking)
 */
const generateMeal = (type: MealType, portions: MealPortion, preferredRegion?: string): Meal => {
  const { meal } = generateMealWithTracking(type, portions, preferredRegion);
  return meal;
};

/**
 * Génère un menu journalier complet à partir du budget portions
 * AMÉLIORATION V2: Évite la répétition des aliments entre les repas
 */
export const generateDailyMenu = (portionBudget: PortionBudget, preferredRegion?: string): DailyMenu => {
  // 1. Dispatcher les portions entre les repas
  const dispatchedPortions = dispatchPortions(portionBudget);

  // 2. Générer chaque repas en trackant les aliments utilisés
  let usedFoodIds: string[] = [];

  // Petit-déjeuner
  const { meal: breakfast, usedIds: afterBreakfast } = generateMealWithTracking(
    "breakfast", 
    dispatchedPortions.breakfast as MealPortion, 
    preferredRegion,
    usedFoodIds
  );
  usedFoodIds = afterBreakfast;

  // Collation (souvent après le petit-déj)
  const { meal: snack, usedIds: afterSnack } = generateMealWithTracking(
    "snack", 
    dispatchedPortions.snack as MealPortion, 
    preferredRegion,
    usedFoodIds
  );
  usedFoodIds = afterSnack;

  // Déjeuner
  const { meal: lunch, usedIds: afterLunch } = generateMealWithTracking(
    "lunch", 
    dispatchedPortions.lunch as MealPortion, 
    preferredRegion,
    usedFoodIds
  );
  usedFoodIds = afterLunch;

  // Dîner
  const { meal: dinner } = generateMealWithTracking(
    "dinner", 
    dispatchedPortions.dinner as MealPortion, 
    preferredRegion,
    usedFoodIds
  );

  return {
    breakfast,
    lunch,
    dinner,
    snack,
  };
};

/**
 * Formate un menu pour l'affichage
 */
export const formatMenuForDisplay = (menu: DailyMenu): object => {
  const formatMeal = (meal: Meal) => ({
    name: MEAL_NAMES[meal.type],
    items: meal.items.map((item) => ({
      aliment: item.food.name,
      groupe: item.food.group,
      portions: item.portions,
      quantite: item.quantity,
    })),
    resume_portions: meal.totalPortions,
  });

  return {
    petit_dejeuner: formatMeal(menu.breakfast),
    dejeuner: formatMeal(menu.lunch),
    diner: formatMeal(menu.dinner),
    collation: formatMeal(menu.snack),
  };
};

/**
 * Calcule le résumé nutritionnel d'un menu
 */
export const calculateMenuSummary = (menu: DailyMenu): object => {
  const totalPortions: MealPortion = {
    starch: 0,
    fruit: 0,
    milk: 0,
    veg: 0,
    protein: 0,
    fat: 0,
  };

  const meals = [menu.breakfast, menu.lunch, menu.dinner, menu.snack];

  for (const meal of meals) {
    for (const group of Object.keys(totalPortions) as FoodGroup[]) {
      totalPortions[group] += meal.totalPortions[group];
    }
  }

  return {
    total_portions: totalPortions,
    nombre_aliments: meals.reduce((acc, meal) => acc + meal.items.length, 0),
  };
};

/**
 * Régénère un repas spécifique (pour permettre de "rafraîchir" un repas)
 */
export const regenerateMeal = (
  type: MealType,
  portionBudget: PortionBudget,
  preferredRegion?: string
): Meal => {
  const dispatchedPortions = dispatchPortions(portionBudget);
  return generateMeal(type, dispatchedPortions[type] as MealPortion, preferredRegion);
};

/**
 * Noms des jours de la semaine
 */
const DAY_NAMES: Record<DayOfWeek, string> = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
};

const DAYS_ORDER: DayOfWeek[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

/**
 * Génère un menu hebdomadaire complet (7 jours)
 */
export const generateWeeklyMenu = (portionBudget: PortionBudget, preferredRegion?: string): WeeklyMenu => {
  const weeklyMenu: Partial<WeeklyMenu> = {};

  for (const day of DAYS_ORDER) {
    weeklyMenu[day] = generateDailyMenu(portionBudget, preferredRegion);
  }

  return weeklyMenu as WeeklyMenu;
};

/**
 * Formate un menu hebdomadaire pour l'affichage
 */
export const formatWeeklyMenuForDisplay = (weeklyMenu: WeeklyMenu): object => {
  const formattedWeek: Record<string, object> = {};

  for (const day of DAYS_ORDER) {
    formattedWeek[day] = {
      jour: DAY_NAMES[day],
      ...formatMenuForDisplay(weeklyMenu[day]),
    };
  }

  return formattedWeek;
};

/**
 * Calcule le résumé d'un menu hebdomadaire
 */
export const calculateWeeklyMenuSummary = (weeklyMenu: WeeklyMenu, portionBudget: PortionBudget): WeeklyMenuSummary => {
  let totalFoods = 0;

  for (const day of DAYS_ORDER) {
    const dailyMenu = weeklyMenu[day];
    const meals = [dailyMenu.breakfast, dailyMenu.lunch, dailyMenu.dinner, dailyMenu.snack];
    totalFoods += meals.reduce((acc, meal) => acc + meal.items.length, 0);
  }

  return {
    totalPortionsPerDay: portionBudget,
    totalFoodsPerDay: Math.round(totalFoods / 7),
    daysGenerated: 7,
  };
};

/**
 * Régénère un jour spécifique du menu hebdomadaire
 */
export const regenerateDay = (
  day: DayOfWeek,
  portionBudget: PortionBudget,
  preferredRegion?: string
): DailyMenu => {
  return generateDailyMenu(portionBudget, preferredRegion);
};

/**
 * Génère un menu mensuel complet (par défaut 30 jours)
 */
export const generateMonthlyMenu = (
  portionBudget: PortionBudget,
  preferredRegion?: string,
  days: number = DEFAULT_MONTH_DAYS
): MonthlyMenu => {
  const monthlyMenu: Partial<MonthlyMenu> = {};
  const totalDays = Math.max(1, Math.min(31, days));

  for (let day = 1; day <= totalDays; day++) {
    monthlyMenu[day as DayOfMonth] = generateDailyMenu(portionBudget, preferredRegion);
  }

  return monthlyMenu as MonthlyMenu;
};

/**
 * Formate un menu mensuel pour l'affichage
 */
export const formatMonthlyMenuForDisplay = (monthlyMenu: MonthlyMenu): object => {
  const formatted: Record<string, object> = {};
  const dayKeys = Object.keys(monthlyMenu)
    .map(Number)
    .sort((a, b) => a - b);

  for (const day of dayKeys) {
    formatted[day] = {
      jour: `Jour ${day}`,
      ...formatMenuForDisplay(monthlyMenu[day as DayOfMonth]),
    };
  }

  return formatted;
};

/**
 * Calcule le résumé d'un menu mensuel
 */
export const calculateMonthlyMenuSummary = (
  monthlyMenu: MonthlyMenu,
  portionBudget: PortionBudget
): MonthlyMenuSummary => {
  const dayKeys = Object.keys(monthlyMenu).map(Number);
  const daysGenerated = dayKeys.length;
  let totalFoods = 0;

  for (const day of dayKeys) {
    const dailyMenu = monthlyMenu[day as DayOfMonth];
    const meals = [dailyMenu.breakfast, dailyMenu.lunch, dailyMenu.dinner, dailyMenu.snack];
    totalFoods += meals.reduce((acc, meal) => acc + meal.items.length, 0);
  }

  return {
    totalPortionsPerDay: portionBudget,
    totalFoodsPerDay: daysGenerated > 0 ? Math.round(totalFoods / daysGenerated) : 0,
    daysGenerated,
  };
};

/**
 * Régénère un jour spécifique du menu mensuel
 */
export const regenerateMonthDay = (
  _day: DayOfMonth,
  portionBudget: PortionBudget,
  preferredRegion?: string
): DailyMenu => {
  return generateDailyMenu(portionBudget, preferredRegion);
};
