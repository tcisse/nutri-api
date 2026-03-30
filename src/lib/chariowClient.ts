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

    // Si la licence n'est pas trouvée sur Chariow, on fait confiance à la DB interne
    // (cas des licences créées avant la mise en place du Pulse ou des licences admin)
    if (response.status === 404) {
      return { isValid: true };
    }

    if (!response.ok) {
      // Autre erreur API → fail open pour ne pas bloquer l'utilisateur
      return { isValid: true };
    }

    const json = await response.json() as {
      data: { is_expired: boolean; revoked_at: string | null };
    };
    const data = json.data;

    // Rejeter uniquement si explicitement révoquée ou expirée
    // (ne pas vérifier is_active : une licence peut être en état pending_activation)
    if (data.revoked_at !== null) {
      return { isValid: false, reason: "Cette licence a été révoquée" };
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
