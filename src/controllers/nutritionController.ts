import type { Request, Response, NextFunction } from "express";
import type {
  UserInputSchema,
  GenerateMenuSchema,
  GenerateWeeklyMenuSchema,
  RegenerateDaySchema,
  GenerateMonthlyMenuSchema,
  RegenerateMonthDaySchema,
} from "../schemas/index.js";
import type { ApiResponse, CalorieResult, DayOfMonth, DayOfWeek } from "../types/index.js";
import type { LicenseRequest } from "../middlewares/licenseMiddleware.js";
import { calculateCalories, getActivityDescription, getGoalDescription } from "../services/calorieService.js";
import {
  generateDailyMenu,
  formatMenuForDisplay,
  calculateMenuSummary,
  generateWeeklyMenu,
  formatWeeklyMenuForDisplay,
  calculateWeeklyMenuSummary,
  regenerateDay,
  generateMonthlyMenu,
  formatMonthlyMenuForDisplay,
  calculateMonthlyMenuSummary,
  regenerateMonthDay,
} from "../services/menuService.js";
import { consumeMenuQuota } from "../services/licenseService.js";

/**
 * Controller pour le calcul calorique
 * POST /api/calculate
 */
export const calculateHandler = async (
  req: Request<object, object, UserInputSchema>,
  res: Response<ApiResponse<CalorieResult & { descriptions: object }>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userInput = req.body;

    // Calcul des calories et du budget portions
    const result = calculateCalories(userInput);

    // Ajouter les descriptions pour plus de clarté
    const response = {
      ...result,
      descriptions: {
        activity: getActivityDescription(userInput.activity),
        goal: getGoalDescription(userInput.goal, userInput.rate),
      },
    };

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller pour la génération de menu journalier
 * POST /api/generate-menu
 */
export const generateMenuHandler = async (
  req: LicenseRequest,
  res: Response<ApiResponse<object>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { portionBudget, preferredRegion } = req.body;

    // Génération du menu
    const menu = generateDailyMenu(portionBudget, preferredRegion);

    // Formatage pour l'affichage
    const formattedMenu = formatMenuForDisplay(menu);

    // Calcul du résumé
    const summary = calculateMenuSummary(menu);

    // Consume menu quota after successful generation (only for QUOTA licenses)
    if (req.userId) {
      await consumeMenuQuota(req.userId);
    }

    res.status(200).json({
      success: true,
      data: {
        menu: formattedMenu,
        summary,
        region: preferredRegion || "general",
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller pour la génération de menu hebdomadaire
 * POST /api/generate-weekly-menu
 */
export const generateWeeklyMenuHandler = async (
  req: LicenseRequest,
  res: Response<ApiResponse<object>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { portionBudget, preferredRegion } = req.body;

    // Génération du menu hebdomadaire
    const weeklyMenu = generateWeeklyMenu(portionBudget, preferredRegion);

    // Formatage pour l'affichage
    const formattedMenu = formatWeeklyMenuForDisplay(weeklyMenu);

    // Calcul du résumé
    const summary = calculateWeeklyMenuSummary(weeklyMenu, portionBudget);

    // Consume menu quota after successful generation (only for QUOTA licenses)
    if (req.userId) {
      await consumeMenuQuota(req.userId);
    }

    res.status(200).json({
      success: true,
      data: {
        weeklyMenu: formattedMenu,
        summary,
        region: preferredRegion || "general",
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller pour la génération de menu mensuel
 * POST /api/generate-monthly-menu
 */
export const generateMonthlyMenuHandler = async (
  req: LicenseRequest,
  res: Response<ApiResponse<object>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { portionBudget, preferredRegion, days } = req.body;

    const monthlyMenu = generateMonthlyMenu(portionBudget, preferredRegion, days);
    const formattedMenu = formatMonthlyMenuForDisplay(monthlyMenu);
    const summary = calculateMonthlyMenuSummary(monthlyMenu, portionBudget);

    // Consume menu quota after successful generation (only for QUOTA licenses)
    if (req.userId) {
      await consumeMenuQuota(req.userId);
    }

    res.status(200).json({
      success: true,
      data: {
        monthlyMenu: formattedMenu,
        summary,
        region: preferredRegion || "general",
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller pour régénérer un jour spécifique
 * POST /api/regenerate-day
 */
export const regenerateDayHandler = async (
  req: Request<object, object, RegenerateDaySchema>,
  res: Response<ApiResponse<object>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { day, portionBudget, preferredRegion } = req.body;

    // Régénération du jour
    const dailyMenu = regenerateDay(day as DayOfWeek, portionBudget, preferredRegion);

    // Formatage pour l'affichage
    const formattedMenu = formatMenuForDisplay(dailyMenu);

    res.status(200).json({
      success: true,
      data: {
        day,
        menu: formattedMenu,
        region: preferredRegion || "general",
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller pour régénérer un jour spécifique du menu mensuel
 * POST /api/regenerate-month-day
 */
export const regenerateMonthDayHandler = async (
  req: Request<object, object, RegenerateMonthDaySchema>,
  res: Response<ApiResponse<object>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { day, portionBudget, preferredRegion } = req.body;

    const dailyMenu = regenerateMonthDay(day as DayOfMonth, portionBudget, preferredRegion);
    const formattedMenu = formatMenuForDisplay(dailyMenu);

    res.status(200).json({
      success: true,
      data: {
        day,
        menu: formattedMenu,
        region: preferredRegion || "general",
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller pour obtenir les informations de l'API
 * GET /api/info
 */
export const infoHandler = async (
  _req: Request,
  res: Response<ApiResponse<object>>,
  _next: NextFunction
): Promise<void> => {
  res.status(200).json({
    success: true,
    data: {
      name: "Nutri API",
      version: "1.1.0",
      description: "API de calcul nutritionnel et génération de menus",
      endpoints: {
        "POST /api/calculate": "Calcule les besoins caloriques et le budget portions",
        "POST /api/generate-menu": "Génère un menu journalier basé sur le budget portions",
        "POST /api/generate-weekly-menu": "Génère un menu hebdomadaire (7 jours)",
        "POST /api/generate-monthly-menu": "Génère un menu mensuel (jusqu'à 31 jours)",
        "POST /api/regenerate-day": "Régénère un jour spécifique du menu",
        "POST /api/regenerate-month-day": "Régénère un jour spécifique du menu mensuel",
        "GET /api/info": "Informations sur l'API",
      },
      supported_regions: [
        "general",
        "senegal",
        "mali",
        "benin",
        "togo",
        "ghana",
        "cote_ivoire",
        "cameroun",
        "guinea",
        "burkina",
        "niger",
        "congo",
        "nigeria",
      ],
    },
  });
};
