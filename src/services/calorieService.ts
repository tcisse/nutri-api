import type { ActivityLevel, CalorieResult, Goal, UserInput } from "../types/index.js";
import { getPortionBudget } from "../constants/portionRules.js";

/**
 * Facteurs d'activité pour le calcul TDEE
 * Basé sur la formule Mifflin-St Jeor
 */
const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2, // Peu ou pas d'exercice
  light: 1.375, // Exercice léger 1-3 jours/semaine
  moderate: 1.55, // Exercice modéré 3-5 jours/semaine
  active: 1.725, // Exercice intense 6-7 jours/semaine
  extra_active: 1.9, // Exercice très intense, travail physique
};

/**
 * Ajustement calorique selon l'objectif
 */
const GOAL_ADJUSTMENTS: Record<Goal, number> = {
  lose: -300, // Déficit calorique pour perte de poids
  maintain: 0, // Maintien du poids
  gain: 300, // Surplus calorique pour prise de masse
};

/**
 * Calcule le BMR (Basal Metabolic Rate) avec la formule Mifflin-St Jeor
 *
 * Homme: BMR = (10 × poids en kg) + (6.25 × taille en cm) - (5 × âge) + 5
 * Femme: BMR = (10 × poids en kg) + (6.25 × taille en cm) - (5 × âge) - 161
 */
const calculateBMR = (weight: number, height: number, age: number, gender: "male" | "female"): number => {
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;

  if (gender === "male") {
    return baseBMR + 5;
  }

  return baseBMR - 161;
};

/**
 * Calcule le TDEE (Total Daily Energy Expenditure)
 * TDEE = BMR × Facteur d'activité
 */
const calculateTDEE = (bmr: number, activity: ActivityLevel): number => {
  return bmr * ACTIVITY_FACTORS[activity];
};

/**
 * Arrondit les calories à la centaine la plus proche
 * Ex: 1440 -> 1400, 1460 -> 1500
 */
const roundToNearestHundred = (calories: number): number => {
  return Math.round(calories / 100) * 100;
};

/**
 * Service principal de calcul calorique
 * Reçoit les données utilisateur et retourne le plan complet
 */
export const calculateCalories = (input: UserInput): CalorieResult => {
  const { age, weight, height, gender, activity, goal } = input;

  // 1. Calcul du BMR (métabolisme de base)
  const bmr = calculateBMR(weight, height, age, gender);

  // 2. Calcul du TDEE (dépense énergétique totale)
  const tdee = calculateTDEE(bmr, activity);

  // 3. Application de l'ajustement selon l'objectif
  const targetCalories = tdee + GOAL_ADJUSTMENTS[goal];

  // 4. Arrondi à la centaine la plus proche (CRITIQUE)
  const roundedCalories = roundToNearestHundred(targetCalories);

  // 5. Lookup du budget portions (PAS de calcul, utilise la table)
  const portionBudget = getPortionBudget(roundedCalories);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    roundedCalories,
    portionBudget,
  };
};

/**
 * Obtient la description textuelle du niveau d'activité
 */
export const getActivityDescription = (activity: ActivityLevel): string => {
  const descriptions: Record<ActivityLevel, string> = {
    sedentary: "Sédentaire (peu ou pas d'exercice)",
    light: "Légèrement actif (exercice léger 1-3 jours/semaine)",
    moderate: "Modérément actif (exercice modéré 3-5 jours/semaine)",
    active: "Très actif (exercice intense 6-7 jours/semaine)",
    extra_active: "Extrêmement actif (exercice très intense + travail physique)",
  };

  return descriptions[activity];
};

/**
 * Obtient la description textuelle de l'objectif
 */
export const getGoalDescription = (goal: Goal): string => {
  const descriptions: Record<Goal, string> = {
    lose: "Perte de poids (-300 kcal/jour)",
    maintain: "Maintien du poids",
    gain: "Prise de masse (+300 kcal/jour)",
  };

  return descriptions[goal];
};
