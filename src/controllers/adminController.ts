import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import { generateToken } from "../middlewares/authMiddleware.js";
import {
  findAdminByEmail,
  verifyPassword,
  createAdmin,
  getAllUsers,
  getUserDetail,
  deleteUser,
  getStats,
} from "../services/adminService.js";
import { getUserSessions } from "../services/userService.js";

export const loginHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const admin = await findAdminByEmail(email);
    if (!admin) {
      res.status(401).json({ success: false, error: "Email ou mot de passe incorrect" });
      return;
    }

    const isValid = await verifyPassword(password, admin.password);
    if (!isValid) {
      res.status(401).json({ success: false, error: "Email ou mot de passe incorrect" });
      return;
    }

    const token = generateToken(admin.id);

    res.status(200).json({
      success: true,
      data: {
        token,
        admin: { id: admin.id, email: admin.email, name: admin.name },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createAdminHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const admin = await createAdmin(req.body);
    res.status(201).json({
      success: true,
      data: { id: admin.id, email: admin.email, name: admin.name },
    });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2002") {
      res.status(409).json({ success: false, error: "Cet email est déjà utilisé" });
      return;
    }
    next(error);
  }
};

export const getAllUsersHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string | undefined;

    const result = await getAllUsers(page, limit, search);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getUserDetailHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getUserDetail(id);

    if (!user) {
      res.status(404).json({ success: false, error: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        ...user,
        sessions: user.sessions.map((s) => ({
          ...s,
          portionBudget: JSON.parse(s.portionBudget),
          menu: s.menu ? { ...s.menu, data: JSON.parse(s.menu.data) } : null,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSessionsAdminHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const sessions = await getUserSessions(id);

    res.status(200).json({
      success: true,
      data: sessions.map((s) => ({
        ...s,
        portionBudget: JSON.parse(s.portionBudget),
        menu: s.menu ? { ...s.menu, data: JSON.parse(s.menu.data) } : null,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).json({ success: true, data: { message: "Utilisateur supprimé" } });
  } catch (error) {
    next(error);
  }
};

export const getStatsHandler = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stats = await getStats();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};
