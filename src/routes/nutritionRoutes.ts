import { Router } from "express";
import {
  generateMonthlyMenuHandler,
  infoHandler,
} from "../controllers/nutritionController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { requireLicense } from "../middlewares/licenseMiddleware.js";
import { generateMonthlyMenuSchema } from "../schemas/index.js";

const router = Router();

/**
 * GET /api/info
 * Informations sur l'API
 */
router.get("/info", infoHandler);

/**
 * POST /api/generate-monthly-menu
 * Retourne jusqu'à 31 jours du plan selon le pays de l'utilisateur
 *
 * Body: { "days": 28, "country": "cameroun" }  // optionnel
 */
router.post("/generate-monthly-menu", requireLicense, validateRequest(generateMonthlyMenuSchema), generateMonthlyMenuHandler);

export default router;
