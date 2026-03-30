import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";

// Chariow product ID → license config mapping
// Set via env vars: CHARIOW_PRODUCT_IDS=prd_nhnved:QUOTA:10,prd_xxx:SUBSCRIPTION:30
const CHARIOW_PRODUCT_IDS = process.env.CHARIOW_PRODUCT_IDS || "prd_nhnved:QUOTA:10";
const WEBHOOK_SECRET = process.env.CHARIOW_WEBHOOK_SECRET || "";

interface ProductConfig {
  type: "QUOTA" | "SUBSCRIPTION";
  value: number; // menuQuota for QUOTA, durationDays for SUBSCRIPTION
}

function getProductConfig(productId: string): ProductConfig | null {
  const entries = CHARIOW_PRODUCT_IDS.split(",");
  for (const entry of entries) {
    const [id, type, valueStr] = entry.trim().split(":");
    if (id === productId) {
      return {
        type: type as "QUOTA" | "SUBSCRIPTION",
        value: parseInt(valueStr, 10),
      };
    }
  }
  return null;
}

/**
 * POST /api/webhooks/chariow
 * Receives Pulse events from Chariow and auto-creates licenses
 */
export const chariowWebhookHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Verify webhook secret via query param (ex: /api/webhooks/chariow?secret=xxx)
  if (WEBHOOK_SECRET) {
    const secret = req.query.secret as string;
    if (secret !== WEBHOOK_SECRET) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  }

  const payload = req.body;
  const event = payload?.event;

  // Acknowledge receipt immediately
  res.status(200).send("OK");

  // Process only license.issued events
  if (event !== "license.issued") {
    console.log(`[Webhook] Ignored event: ${event}`);
    return;
  }

  const licenseKey = payload?.license?.key;
  const productId = payload?.product?.id;
  const customerName = payload?.customer?.name || "Chariow Customer";
  const chariowLicenseId = payload?.license?.id;

  if (!licenseKey || !productId) {
    console.error("[Webhook] Missing license.key or product.id in payload");
    return;
  }

  const config = getProductConfig(productId);
  if (!config) {
    console.log(`[Webhook] Product ${productId} not configured, skipping`);
    return;
  }

  // Idempotency: skip if license already exists
  const existing = await prisma.license.findUnique({
    where: { code: licenseKey },
  });

  if (existing) {
    console.log(`[Webhook] License ${licenseKey} already exists, skipping`);
    return;
  }

  try {
    const license = await prisma.license.create({
      data: {
        code: licenseKey,
        type: config.type,
        name: `NutriPlan — ${customerName}`,
        description: `Licence générée automatiquement via Chariow (${chariowLicenseId})`,
        menuQuota: config.type === "QUOTA" ? config.value : null,
        durationDays: config.type === "SUBSCRIPTION" ? config.value : null,
        createdBy: "chariow-webhook",
        isActive: true,
      },
    });

    console.log(`[Webhook] ✅ Licence créée: ${license.code} (${config.type})`);
  } catch (error) {
    console.error("[Webhook] ❌ Erreur création licence:", error);
  }
};
