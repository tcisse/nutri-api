import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  createUser,
  loginUser,
  updateUser,
  createSession,
  getUserSessions,
  getLatestSession,
  getMenu,
  saveMenu,
} from "../services/userService.js";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-change-me";

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await createUser(req.body);
    const { password: _, ...userData } = user;
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "30d" });
    res.status(201).json({ success: true, data: { user: userData, token } });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2002") {
      res.status(409).json({ success: false, error: "Cet email est déjà utilisé" });
      return;
    }
    next(error);
  }
};

export const loginUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "30d" });
    res.status(200).json({ success: true, data: { user, token } });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ success: false, error: error.message });
      return;
    }
    next(error);
  }
};

export const updateUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const createSessionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const session = await createSession(id, req.body);

    res.status(201).json({
      success: true,
      data: {
        ...session,
        portionBudget: JSON.parse(session.portionBudget),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSessionsHandler = async (
  req: Request,
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

export const getLatestSessionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const session = await getLatestSession(id);

    if (!session) {
      res.status(404).json({ success: false, error: "Aucune session trouvée" });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        ...session,
        portionBudget: JSON.parse(session.portionBudget),
        menu: session.menu ? { ...session.menu, data: JSON.parse(session.menu.data) } : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMenuHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sessionId } = req.params;
    const menu = await getMenu(sessionId);

    if (!menu) {
      res.status(404).json({ success: false, error: "Aucun menu sauvegardé" });
      return;
    }

    res.status(200).json({
      success: true,
      data: { ...menu, data: JSON.parse(menu.data) },
    });
  } catch (error) {
    next(error);
  }
};

export const saveMenuHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sessionId } = req.params;
    const { data } = req.body;
    const menu = await saveMenu(sessionId, data);

    res.status(200).json({
      success: true,
      data: { ...menu, data: JSON.parse(menu.data) },
    });
  } catch (error) {
    next(error);
  }
};
