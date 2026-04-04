import type { Request, Response, NextFunction } from "express";
import type { GenerateMenuSchema, GenerateMonthlyMenuSchema } from "../schemas/index.js";
import type { ApiResponse } from "../types/index.js";
import type { LicenseRequest } from "../middlewares/licenseMiddleware.js";
import { getMonthlyMenu, getMonthlyMenuSummary } from "../services/menuService.js";
import { consumeMenuQuota } from "../services/licenseService.js";

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
    const { days = 28, country = "general" } = req.body as GenerateMonthlyMenuSchema;

    const [monthlyMenu, summary] = await Promise.all([
      getMonthlyMenu(days, country),
      getMonthlyMenuSummary(days, country),
    ]);

    if (req.userId) {
      await consumeMenuQuota(req.userId);
    }

    res.status(200).json({
      success: true,
      data: {
        monthlyMenu,
        summary,
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
      version: "2.0.0",
      description: "API de génération de menus — Plans Alimentaires Africains 28 jours",
      endpoints: {
        "POST /api/generate-monthly-menu": "Retourne jusqu'à 31 jours du plan",
        "GET /api/info": "Informations sur l'API",
      },
      plan: {
        source: "Plans Alimentaires 100% Africains",
        countries: ["togo", "gabon", "cameroun"],
        days: 28,
        mealsPerDay: 4,
      },
    },
  });
};
