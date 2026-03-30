const CHARIOW_API_KEY = process.env.CHARIOW_API_KEY || "";
const CHARIOW_API_URL = "https://api.chariow.com/v1";

export interface ChariowLicenseValidation {
  isValid: boolean;
  reason?: string;
}

/**
 * Detects if a license code looks like a Chariow key (XXXX-XXXX-XXXX-XXXX)
 * vs an internal key (NUTRI-XXXX-XXXX-XXXX)
 */
export function isChariowKey(code: string): boolean {
  return /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(code);
}

/**
 * Validates a license key directly against the Chariow API
 * Only called for Chariow-format keys when CHARIOW_API_KEY is configured
 */
export async function validateChariowLicense(
  licenseKey: string
): Promise<ChariowLicenseValidation> {
  if (!CHARIOW_API_KEY) {
    // API key not configured — skip Chariow validation, trust internal DB
    return { isValid: true };
  }

  try {
    const response = await fetch(
      `${CHARIOW_API_URL}/licenses/${encodeURIComponent(licenseKey)}`,
      {
        headers: {
          Authorization: `Bearer ${CHARIOW_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return { isValid: false, reason: "Clé de licence invalide sur Chariow" };
    }

    const json = await response.json() as { data: { is_active: boolean; is_expired: boolean } };
    const data = json.data;

    if (!data.is_active) {
      return { isValid: false, reason: "Cette licence n'est plus active" };
    }

    if (data.is_expired) {
      return { isValid: false, reason: "Cette licence a expiré" };
    }

    return { isValid: true };
  } catch (error) {
    console.error("[Chariow] Erreur validation API:", error);
    // En cas d'erreur réseau, on laisse passer (fail open) pour ne pas bloquer l'utilisateur
    return { isValid: true };
  }
}
