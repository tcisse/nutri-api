import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import {
  createLicense,
  getAllLicenses,
  getLicenseById,
  deactivateLicense,
  activateLicense,
  getUserLicense,
} from "../services/licenseService.js";

/**
 * Admin: Create a new license
 * POST /api/admin/licenses
 */
export const createLicenseHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.adminId) {
      res.status(401).json({ success: false, error: "Non autorisé" });
      return;
    }

    const license = await createLicense({
      ...req.body,
      createdBy: req.adminId,
    });

    res.status(201).json({
      success: true,
      data: license,
      message: "Licence créée avec succès",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get all licenses with optional filters
 * GET /api/admin/licenses?type=QUOTA&isActive=true&search=xxx
 */
export const getAllLicensesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { type, isActive, search } = req.query;

    const licenses = await getAllLicenses({
      type: type as string | undefined,
      isActive:
        isActive === "true" ? true : isActive === "false" ? false : undefined,
      search: search as string | undefined,
    });

    res.status(200).json({ success: true, data: licenses });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get license details by ID
 * GET /api/admin/licenses/:id
 */
export const getLicenseDetailsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const license = await getLicenseById(id);

    if (!license) {
      res.status(404).json({ success: false, error: "Licence non trouvée" });
      return;
    }

    res.status(200).json({ success: true, data: license });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Deactivate a license
 * POST /api/admin/licenses/:id/deactivate
 */
export const deactivateLicenseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const license = await deactivateLicense(id, reason);

    res.status(200).json({
      success: true,
      data: license,
      message: "Licence désactivée avec succès",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * User: Activate a license
 * POST /api/users/:userId/license/activate
 */
export const activateLicenseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { code } = req.body;

    const activation = await activateLicense(userId, code);

    res.status(200).json({
      success: true,
      data: activation,
      message: "Licence activée avec succès",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, error: error.message });
      return;
    }
    next(error);
  }
};

/**
 * User: Get user's active license
 * GET /api/users/:userId/license
 */
export const getUserLicenseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;

    const license = await getUserLicense(userId);

    if (!license) {
      res.status(404).json({ success: false, error: "Aucune licence active" });
      return;
    }

    res.status(200).json({ success: true, data: license });
  } catch (error) {
    next(error);
  }
};
