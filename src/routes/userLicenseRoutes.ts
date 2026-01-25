import { Router } from "express";
import {
  activateLicenseHandler,
  getUserLicenseHandler,
} from "../controllers/licenseController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { activateLicenseSchema } from "../schemas/licenseSchemas.js";

const router = Router();

// POST /api/users/:userId/license/activate - Activate license for user
router.post(
  "/:userId/license/activate",
  validateRequest(activateLicenseSchema),
  activateLicenseHandler
);

// GET /api/users/:userId/license - Get user's active license
router.get("/:userId/license", getUserLicenseHandler);

export default router;
