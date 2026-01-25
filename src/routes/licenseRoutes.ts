import { Router } from "express";
import {
  createLicenseHandler,
  getAllLicensesHandler,
  getLicenseDetailsHandler,
  deactivateLicenseHandler,
} from "../controllers/licenseController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  createLicenseSchema,
  deactivateLicenseSchema,
} from "../schemas/licenseSchemas.js";

const router = Router();

// All routes require admin authentication
router.use(authMiddleware);

// POST /api/admin/licenses - Create new license
router.post(
  "/",
  validateRequest(createLicenseSchema),
  createLicenseHandler
);

// GET /api/admin/licenses - Get all licenses with filters
router.get("/", getAllLicensesHandler);

// GET /api/admin/licenses/:id - Get license details
router.get("/:id", getLicenseDetailsHandler);

// POST /api/admin/licenses/:id/deactivate - Deactivate license
router.post(
  "/:id/deactivate",
  validateRequest(deactivateLicenseSchema),
  deactivateLicenseHandler
);

export default router;
