import { Router } from "express";
import {
  loginHandler,
  createAdminHandler,
  getAllUsersHandler,
  getUserDetailHandler,
  getUserSessionsAdminHandler,
  deleteUserHandler,
  getStatsHandler,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { adminLoginSchema, adminCreateSchema } from "../schemas/adminSchemas.js";

const router = Router();

// Public routes
router.post("/login", validateRequest(adminLoginSchema), loginHandler);

// Protected routes (require JWT)
router.use(authMiddleware);

router.post("/create", validateRequest(adminCreateSchema), createAdminHandler);
router.get("/users", getAllUsersHandler);
router.get("/users/:id", getUserDetailHandler);
router.get("/users/:id/sessions", getUserSessionsAdminHandler);
router.delete("/users/:id", deleteUserHandler);
router.get("/stats", getStatsHandler);

export default router;
