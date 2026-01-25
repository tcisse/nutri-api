import { Router } from "express";
import nutritionRoutes from "./nutritionRoutes.js";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";
import licenseRoutes from "./licenseRoutes.js";
import userLicenseRoutes from "./userLicenseRoutes.js";

const router = Router();

// Routes de nutrition
router.use("/", nutritionRoutes);

// Routes utilisateurs
router.use("/users", userRoutes);
router.use("/users", userLicenseRoutes);

// Routes admin
router.use("/admin", adminRoutes);
router.use("/admin/licenses", licenseRoutes);

export default router;
