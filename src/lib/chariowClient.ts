const CHARIOW_API_KEY = process.env.CHARIOW_API_KEY || "";
const CHARIOW_API_URL = "https://api.chariow.com/v1";

export interface ChariowLicenseValidation {
  isValid: boolean;
  reason?: string;
}

export interface ChariowActivationResult {
  isValid: boolean;
  reason?: string;
  expiresAt?: Date | null;
}

/**
 * Detects if a license code looks like a Chariow key (XXXX-XXXX-XXXX-XXXX)
 * vs an internal key (NUTRI-XXXX-XXXX-XXXX)
 */
export function isChariowKey(code: string): boolean {
  return /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(code);
}

/**
 * Activates a Chariow license key via POST /v1/licenses/{key}/activate
 * Called once when a user first activates their key.
 * Returns expiresAt from Chariow so we can store it in our DB.
 */
export async function activateChariowLicense(
  licenseKey: string,
  userId: string
): Promise<ChariowActivationResult> {
  if (!CHARIOW_API_KEY) {
    // API key not configured — skip Chariow activation, trust internal DB
    return { isValid: true };
  }

  try {
    const response = await fetch(
      `${CHARIOW_API_URL}/licenses/${encodeURIComponent(licenseKey)}/activate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CHARIOW_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ device_identifier: userId }),
      }
    );

    // Licence introuvable sur Chariow → fail open (licence admin ou pré-Pulse)
    if (response.status === 404) {
      return { isValid: true };
    }

    if (!response.ok) {
      const json = await response.json() as { message?: string };
      const msg = json.message?.toLowerCase() ?? "";

      if (msg.includes("revoked")) {
        return { isValid: false, reason: "Cette licence a été révoquée" };
      }
      if (msg.includes("expired")) {
        return { isValid: false, reason: "Cette licence a expiré" };
      }
      if (msg.includes("activation limit")) {
        return { isValid: false, reason: "Cette licence a atteint sa limite d'activations" };
      }

      // Autre erreur 4xx/5xx → fail open
      console.error("[Chariow] Erreur activation:", response.status, json.message);
      return { isValid: true };
    }

    const json = await response.json() as {
      data: { expires_at: string | null };
    };

    const expiresAt = json.data.expires_at ? new Date(json.data.expires_at) : null;

    return { isValid: true, expiresAt };
  } catch (error) {
    console.error("[Chariow] Erreur réseau activation:", error);
    // Fail open pour ne pas bloquer l'utilisateur en cas de panne réseau
    return { isValid: true };
  }
}
