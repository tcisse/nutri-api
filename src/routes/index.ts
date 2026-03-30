import { Router } from "express";
import nutritionRoutes from "./nutritionRoutes.js";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";
import licenseRoutes from "./licenseRoutes.js";
import userLicenseRoutes from "./userLicenseRoutes.js";
import webhookRoutes from "./webhookRoutes.js";

const router = Router();

// Routes de nutrition
router.use("/", nutritionRoutes);

// Routes utilisateurs
router.use("/users", userRoutes);
router.use("/users", userLicenseRoutes);

// Routes admin
router.use("/admin", adminRoutes);
router.use("/admin/licenses", licenseRoutes);

// Routes webhooks (Chariow Pulse)
router.use("/webhooks", webhookRoutes);

export default router;
