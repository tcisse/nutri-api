import prisma from "../lib/prisma.js";
import { generateUniqueLicenseCode } from "../lib/licenseCodeGenerator.js";
import { isChariowKey, activateChariowLicense } from "../lib/chariowClient.js";

export interface CreateLicenseData {
  type: "QUOTA" | "SUBSCRIPTION";
  name: string;
  description?: string;
  menuQuota?: number;
  durationDays?: number;
  createdBy: string;
}

export interface LicenseFilters {
  type?: string;
  isActive?: boolean;
  search?: string;
}

export interface LicenseValidationResult {
  isValid: boolean;
  activation?: any;
  reason?: string;
}

/**
 * Create a new license with a unique code
 */
export const createLicense = async (data: CreateLicenseData) => {
  const code = await generateUniqueLicenseCode(prisma);

  return prisma.license.create({
    data: {
      code,
      type: data.type,
      name: data.name,
      description: data.description,
      menuQuota: data.type === "QUOTA" ? data.menuQuota : null,
      durationDays: data.type === "SUBSCRIPTION" ? data.durationDays : null,
      createdBy: data.createdBy,
      isActive: true,
    },
  });
};

/**
 * Get all licenses with optional filters
 */
export const getAllLicenses = async (filters?: LicenseFilters) => {
  const where: any = {};

  if (filters?.type) {
    where.type = filters.type;
  }

  if (filters?.isActive !== undefined) {
    where.isActive = filters.isActive;
  }

  if (filters?.search) {
    where.OR = [
      { code: { contains: filters.search } },
      { name: { contains: filters.search } },
    ];
  }

  return prisma.license.findMany({
    where,
    include: {
      activations: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

/**
 * Get a single license by ID with details
 */
export const getLicenseById = async (licenseId: string) => {
  return prisma.license.findUnique({
    where: { id: licenseId },
    include: {
      activations: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });
};

/**
 * Deactivate a license and all its activations
 */
export const deactivateLicense = async (
  licenseId: string,
  reason?: string
) => {
  // Deactivate all activations for this license
  await prisma.licenseActivation.updateMany({
    where: { licenseId, isActive: true },
    data: {
      isActive: false,
      deactivatedAt: new Date(),
      deactivatedReason: reason || "License deactivated by admin",
    },
  });

  // Deactivate the license itself
  return prisma.license.update({
    where: { id: licenseId },
    data: { isActive: false },
  });
};

/**
 * Activate a license for a user
 */
export const activateLicense = async (userId: string, code: string) => {
  const normalizedCode = code.toUpperCase();

  // Check if user already has an active license (avant tout traitement)
  const existingActivation = await prisma.licenseActivation.findUnique({
    where: { userId },
    include: { license: true },
  });

  if (existingActivation && existingActivation.isActive) {
    throw new Error("Vous avez déjà une licence active");
  }

  let license: { id: string; type: string; menuQuota: number | null; durationDays: number | null };
  let chariowExpiresAt: Date | null | undefined = undefined;

  if (isChariowKey(normalizedCode)) {
    // ── Clé Chariow (XXXX-XXXX-XXXX-XXXX) ──────────────────────────────
    // 1. Valider/activer côté Chariow
    const chariowResult = await activateChariowLicense(normalizedCode, userId);
    if (!chariowResult.isValid) {
      throw new Error(chariowResult.reason || "Licence invalide selon Chariow");
    }
    chariowExpiresAt = chariowResult.expiresAt;

    // 2. Créer ou retrouver l'enregistrement License local pour cette clé
    license = await prisma.license.upsert({
      where: { code: normalizedCode },
      update: {},
      create: {
        code: normalizedCode,
        type: "SUBSCRIPTION",
        name: `Licence Chariow`,
        isActive: true,
        createdBy: "chariow",
      },
    });
  } else {
    // ── Clé interne (NUTRI-XXXX-XXXX-XXXX) ──────────────────────────────
    const found = await prisma.license.findUnique({
      where: { code: normalizedCode },
    });

    if (!found) {
      throw new Error("Code de licence invalide");
    }
    if (!found.isActive) {
      throw new Error("Cette licence a été désactivée");
    }
    license = found;
  }

  // Calculate expiration
  let expiresAt: Date | null = null;
  let menusRemaining: number | null = null;

  if (chariowExpiresAt !== undefined) {
    expiresAt = chariowExpiresAt;
  } else if (license.type === "SUBSCRIPTION" && license.durationDays) {
    expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + license.durationDays);
  }

  if (license.type === "QUOTA" && license.menuQuota) {
    menusRemaining = license.menuQuota;
  }

  // Create or reactivate activation
  if (existingActivation) {
    return prisma.licenseActivation.update({
      where: { id: existingActivation.id },
      data: {
        licenseId: license.id,
        expiresAt,
        menusRemaining,
        menusGenerated: 0,
        isActive: true,
        activatedAt: new Date(),
        deactivatedAt: null,
        deactivatedReason: null,
      },
      include: { license: true },
    });
  } else {
    return prisma.licenseActivation.create({
      data: {
        licenseId: license.id,
        userId,
        expiresAt,
        menusRemaining,
        isActive: true,
      },
      include: { license: true },
    });
  }
};

/**
 * Validate if a user has a valid active license
 */
export const validateUserLicense = async (
  userId: string
): Promise<LicenseValidationResult> => {
  const activation = await prisma.licenseActivation.findUnique({
    where: { userId },
    include: { license: true },
  });

  if (!activation || !activation.isActive) {
    return { isValid: false, reason: "Aucune licence active" };
  }

  const license = activation.license;

  // Check subscription expiration
  if (license.type === "SUBSCRIPTION") {
    if (activation.expiresAt && activation.expiresAt < new Date()) {
      // Auto-deactivate expired license
      await prisma.licenseActivation.update({
        where: { id: activation.id },
        data: {
          isActive: false,
          deactivatedAt: new Date(),
          deactivatedReason: "Subscription expired",
        },
      });

      return { isValid: false, reason: "Votre abonnement a expiré" };
    }
  }

  // Check quota
  if (license.type === "QUOTA") {
    if (
      activation.menusRemaining === null ||
      activation.menusRemaining <= 0
    ) {
      return { isValid: false, reason: "Quota de menus épuisé" };
    }
  }

  return { isValid: true, activation };
};

/**
 * Consume one menu from the quota (for QUOTA type licenses)
 */
export const consumeMenuQuota = async (userId: string) => {
  const activation = await prisma.licenseActivation.findUnique({
    where: { userId },
    include: { license: true },
  });

  if (!activation || activation.license.type !== "QUOTA") {
    // If not a quota license, don't do anything
    return;
  }

  await prisma.licenseActivation.update({
    where: { id: activation.id },
    data: {
      menusGenerated: { increment: 1 },
      menusRemaining:
        activation.menusRemaining !== null
          ? { decrement: 1 }
          : activation.menusRemaining,
    },
  });
};

/**
 * Get user's active license information
 */
export const getUserLicense = async (userId: string) => {
  return prisma.licenseActivation.findUnique({
    where: { userId },
    include: { license: true },
  });
};
