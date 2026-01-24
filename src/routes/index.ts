import { Router } from "express";
import nutritionRoutes from "./nutritionRoutes.js";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = Router();

// Routes de nutrition
router.use("/", nutritionRoutes);

// Routes utilisateurs
router.use("/users", userRoutes);

// Routes admin
router.use("/admin", adminRoutes);

export default router;
