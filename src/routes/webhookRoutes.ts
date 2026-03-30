import { Router } from "express";
import { chariowWebhookHandler } from "../controllers/webhookController.js";

const router = Router();

/**
 * POST /api/webhooks/chariow
 * Receives Pulse events from Chariow (license.issued, successful.sale, etc.)
 * Must use raw body parser to allow signature verification if needed
 */
router.post("/chariow", chariowWebhookHandler);

export default router;
