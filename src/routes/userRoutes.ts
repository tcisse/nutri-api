import { Router } from "express";
import {
  createUserHandler,
  loginUserHandler,
  updateUserHandler,
  createSessionHandler,
  getUserSessionsHandler,
  getLatestSessionHandler,
  getMenuHandler,
  saveMenuHandler,
} from "../controllers/userController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createUserSchema, loginUserSchema, createSessionSchema, saveMenuSchema } from "../schemas/userSchemas.js";

const router = Router();

// POST /api/users - Register a new user
router.post("/", validateRequest(createUserSchema), createUserHandler);

// POST /api/users/login - Login
router.post("/login", validateRequest(loginUserSchema), loginUserHandler);

// GET /api/users/sessions/:sessionId/menu - Get saved menu (AVANT les routes /:id)
router.get("/sessions/:sessionId/menu", getMenuHandler);

// POST /api/users/sessions/:sessionId/menu - Save menu for a session (AVANT les routes /:id)
router.post("/sessions/:sessionId/menu", validateRequest(saveMenuSchema), saveMenuHandler);

// PUT /api/users/:id - Update user info
router.put("/:id", updateUserHandler);

// POST /api/users/:id/sessions - Create a new session
router.post("/:id/sessions", validateRequest(createSessionSchema), createSessionHandler);

// GET /api/users/:id/sessions - Get all sessions
router.get("/:id/sessions", getUserSessionsHandler);

// GET /api/users/:id/sessions/latest - Get latest session
router.get("/:id/sessions/latest", getLatestSessionHandler);

export default router;
