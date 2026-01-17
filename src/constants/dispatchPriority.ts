import type { MealPortion, PortionBudget } from "../types/index.js";

/**
 * MODÈLE DE DISPATCH : Répartition fixe des portions par repas
 * Source: Guide PDF nutritionnel
 * 
 * Ce modèle définit le nombre de BASE de portions par groupe alimentaire pour chaque repas.
 * Le surplus est distribué intelligemment selon les règles nutritionnelles.
 */
export const DISPATCH_MODEL: Record<string, MealPortion> = {
  breakfast: { starch: 2, fruit: 1, milk: 1, veg: 1, protein: 2, fat: 2 },
  lunch: { starch: 3, fruit: 1, milk: 0, veg: 1, protein: 3, fat: 2 },
  dinner: { starch: 2, fruit: 0, milk: 0, veg: 1, protein: 0, fat: 0 },
  snack: { starch: 0, fruit: 1, milk: 1, veg: 0, protein: 0, fat: 0 },
};

/**
 * Priorité de distribution du surplus par groupe alimentaire
 * Quand il y a plus de portions que le modèle de base, on les distribue dans cet ordre
 */
const SURPLUS_PRIORITY: Record<string, string[]> = {
  starch: ["lunch", "breakfast", "dinner", "snack"],
  fruit: ["snack", "breakfast", "lunch", "dinner"],
  milk: ["breakfast", "snack", "lunch", "dinner"],
  veg: ["lunch", "dinner", "breakfast", "snack"],
  protein: ["lunch", "breakfast", "dinner", "snack"],
  fat: ["lunch", "breakfast", "dinner", "snack"],
};

/**
 * Répartit le budget total de portions entre les différents repas
 * Utilise le modèle de base + distribution intelligente du surplus
 */
export const dispatchPortions = (budget: PortionBudget): Record<string, MealPortion> => {
  // Initialiser avec le modèle de base (copie profonde)
  const meals: Record<string, MealPortion> = {
    breakfast: { ...DISPATCH_MODEL.breakfast },
    lunch: { ...DISPATCH_MODEL.lunch },
    dinner: { ...DISPATCH_MODEL.dinner },
    snack: { ...DISPATCH_MODEL.snack },
  };

  const groups = ["starch", "fruit", "milk", "veg", "protein", "fat"] as const;

  for (const group of groups) {
    const totalNeeded = budget[group];

    // Calculer le total déjà distribué par le modèle de base
    const baseTotal =
      meals.breakfast[group] +
      meals.lunch[group] +
      meals.dinner[group] +
      meals.snack[group];

    // Calculer la différence (surplus ou déficit)
    const difference = totalNeeded - baseTotal;

    if (difference > 0) {
      // Surplus : distribuer selon la priorité
      let remaining = difference;
      const priority = SURPLUS_PRIORITY[group];

      for (const mealName of priority) {
        if (remaining <= 0) break;

        // Ajouter au maximum 2 portions supplémentaires par repas
        const toAdd = Math.min(remaining, 2);
        meals[mealName][group] += toAdd;
        remaining -= toAdd;
      }

      // S'il reste encore des portions, les répartir équitablement
      while (remaining > 0) {
        for (const mealName of priority) {
          if (remaining <= 0) break;
          meals[mealName][group] += 1;
          remaining -= 1;
        }
      }
    } else if (difference < 0) {
      // Déficit : réduire les portions en commençant par les repas à basse priorité
      let toRemove = Math.abs(difference);
      const reversePriority = [...SURPLUS_PRIORITY[group]].reverse();

      for (const mealName of reversePriority) {
        if (toRemove <= 0) break;

        const available = meals[mealName][group];
        const removeFromMeal = Math.min(toRemove, available);
        meals[mealName][group] -= removeFromMeal;
        toRemove -= removeFromMeal;
      }
    }
  }

  return meals;
};

/**
 * Obtient le modèle de dispatch de base (pour affichage)
 */
export const getBaseDispatchModel = (): Record<string, MealPortion> => {
  return {
    breakfast: { ...DISPATCH_MODEL.breakfast },
    lunch: { ...DISPATCH_MODEL.lunch },
    dinner: { ...DISPATCH_MODEL.dinner },
    snack: { ...DISPATCH_MODEL.snack },
  };
};
