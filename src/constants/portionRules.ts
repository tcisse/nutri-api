import type { PortionBudget } from "../types/index.js";

/**
 * TABLEAU A : Budget Portions par Calories
 * Source: Guide PDF nutritionnel
 * Clé = calories arrondies à la centaine
 */
export const PORTION_RULES: Record<number, PortionBudget> = {
  1200: { starch: 5, fruit: 3, milk: 2, veg: 2, protein: 4, fat: 3 },
  1300: { starch: 6, fruit: 3, milk: 2, veg: 2, protein: 4, fat: 3 },
  1400: { starch: 6, fruit: 3, milk: 2, veg: 2, protein: 5, fat: 4 },
  1500: { starch: 7, fruit: 3, milk: 2, veg: 3, protein: 5, fat: 4 },
  1600: { starch: 7, fruit: 3, milk: 3, veg: 3, protein: 5, fat: 4 },
  1800: { starch: 8, fruit: 3, milk: 3, veg: 4, protein: 6, fat: 5 },
  2000: { starch: 9, fruit: 4, milk: 3, veg: 5, protein: 6, fat: 6 },
  2200: { starch: 11, fruit: 4, milk: 3, veg: 5, protein: 6, fat: 7 },
  2500: { starch: 13, fruit: 4, milk: 3, veg: 5, protein: 8, fat: 8 },
};

/**
 * Calories minimales et maximales supportées
 */
export const MIN_CALORIES = 1200;
export const MAX_CALORIES = 2500;

/**
 * Récupère le budget portions pour un niveau calorique donné
 * Utilise la lookup table, avec interpolation linéaire si nécessaire
 */
export const getPortionBudget = (calories: number): PortionBudget => {
  // Clamp les calories dans la plage supportée
  const clampedCalories = Math.max(MIN_CALORIES, Math.min(MAX_CALORIES, calories));

  // Arrondir à la centaine la plus proche
  const roundedCalories = Math.round(clampedCalories / 100) * 100;

  // Lookup direct si la valeur existe
  if (PORTION_RULES[roundedCalories]) {
    return { ...PORTION_RULES[roundedCalories] };
  }

  // Interpolation pour les valeurs manquantes (1700, 1900, 2100, 2300, 2400)
  const keys = Object.keys(PORTION_RULES).map(Number).sort((a, b) => a - b);

  // Trouver les bornes inférieure et supérieure
  let lower = keys[0];
  let upper = keys[keys.length - 1];

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] <= roundedCalories) {
      lower = keys[i];
    }
    if (keys[i] >= roundedCalories) {
      upper = keys[i];
      break;
    }
  }

  // Si correspondance exacte trouvée après recherche
  if (lower === roundedCalories) {
    return { ...PORTION_RULES[lower] };
  }

  // Interpolation linéaire entre les deux bornes
  const lowerBudget = PORTION_RULES[lower];
  const upperBudget = PORTION_RULES[upper];
  const ratio = (roundedCalories - lower) / (upper - lower);

  return {
    starch: Math.round(lowerBudget.starch + (upperBudget.starch - lowerBudget.starch) * ratio),
    fruit: Math.round(lowerBudget.fruit + (upperBudget.fruit - lowerBudget.fruit) * ratio),
    milk: Math.round(lowerBudget.milk + (upperBudget.milk - lowerBudget.milk) * ratio),
    veg: Math.round(lowerBudget.veg + (upperBudget.veg - lowerBudget.veg) * ratio),
    protein: Math.round(lowerBudget.protein + (upperBudget.protein - lowerBudget.protein) * ratio),
    fat: Math.round(lowerBudget.fat + (upperBudget.fat - lowerBudget.fat) * ratio),
  };
};
