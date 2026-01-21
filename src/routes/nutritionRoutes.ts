import { Router } from "express";
import {
  calculateHandler,
  generateMenuHandler,
  generateWeeklyMenuHandler,
  regenerateDayHandler,
  generateMonthlyMenuHandler,
  regenerateMonthDayHandler,
  infoHandler,
} from "../controllers/nutritionController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  userInputSchema,
  generateMenuSchema,
  generateWeeklyMenuSchema,
  regenerateDaySchema,
  generateMonthlyMenuSchema,
  regenerateMonthDaySchema,
} from "../schemas/index.js";

const router = Router();

/**
 * GET /api/info
 * Informations sur l'API
 */
router.get("/info", infoHandler);

/**
 * POST /api/calculate
 * Calcule les besoins caloriques et le budget portions
 *
 * Body:
 * {
 *   "age": 30,
 *   "weight": 70,
 *   "height": 175,
 *   "gender": "male",
 *   "activity": "moderate",
 *   "goal": "maintain"
 * }
 */
router.post("/calculate", validateRequest(userInputSchema), calculateHandler);

/**
 * POST /api/generate-menu
 * Génère un menu journalier basé sur le budget portions
 *
 * Body:
 * {
 *   "portionBudget": {
 *     "starch": 9,
 *     "fruit": 4,
 *     "milk": 3,
 *     "veg": 5,
 *     "protein": 6,
 *     "fat": 6
 *   },
 *   "preferredRegion": "senegal" // optionnel
 * }
 */
router.post("/generate-menu", validateRequest(generateMenuSchema), generateMenuHandler);

/**
 * POST /api/generate-weekly-menu
 * Génère un menu hebdomadaire (7 jours) basé sur le budget portions
 *
 * Body:
 * {
 *   "portionBudget": {
 *     "starch": 9,
 *     "fruit": 4,
 *     "milk": 3,
 *     "veg": 5,
 *     "protein": 6,
 *     "fat": 6
 *   },
 *   "preferredRegion": "senegal" // optionnel
 * }
 */
router.post("/generate-weekly-menu", validateRequest(generateWeeklyMenuSchema), generateWeeklyMenuHandler);

/**
 * POST /api/generate-monthly-menu
 * Génère un menu mensuel (jusqu'à 31 jours) basé sur le budget portions
 */
router.post("/generate-monthly-menu", validateRequest(generateMonthlyMenuSchema), generateMonthlyMenuHandler);

/**
 * POST /api/regenerate-day
 * Régénère un jour spécifique du menu hebdomadaire
 *
 * Body:
 * {
 *   "day": "monday", // monday, tuesday, wednesday, thursday, friday, saturday, sunday
 *   "portionBudget": {
 *     "starch": 9,
 *     "fruit": 4,
 *     "milk": 3,
 *     "veg": 5,
 *     "protein": 6,
 *     "fat": 6
 *   },
 *   "preferredRegion": "senegal" // optionnel
 * }
 */
router.post("/regenerate-day", validateRequest(regenerateDaySchema), regenerateDayHandler);

/**
 * POST /api/regenerate-month-day
 * Régénère un jour spécifique du menu mensuel
 */
router.post("/regenerate-month-day", validateRequest(regenerateMonthDaySchema), regenerateMonthDayHandler);

export default router;
