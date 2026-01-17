import { Router } from "express";
import nutritionRoutes from "./nutritionRoutes.js";

const router = Router();

// Routes de nutrition
router.use("/", nutritionRoutes);

export default router;
