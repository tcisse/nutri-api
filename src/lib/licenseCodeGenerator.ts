import type { PrismaClient } from "@prisma/client";

// Character set excluding ambiguous characters (0, O, I, l, 1)
const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const SEGMENT_LENGTH = 4;
const SEGMENTS = 3;

/**
 * Generates a license code in the format: NUTRI-XXXX-XXXX-XXXX
 * Uses a character set without ambiguous characters for better readability
 */
export function generateLicenseCode(): string {
  const segments: string[] = [];

  for (let i = 0; i < SEGMENTS; i++) {
    let segment = "";
    for (let j = 0; j < SEGMENT_LENGTH; j++) {
      const randomIndex = Math.floor(Math.random() * CHARSET.length);
      segment += CHARSET[randomIndex];
    }
    segments.push(segment);
  }

  return `NUTRI-${segments.join("-")}`;
}

/**
 * Generates a unique license code by checking against the database
 * Will attempt up to MAX_ATTEMPTS times to generate a unique code
 * @param prisma - Prisma client instance
 * @returns A unique license code
 * @throws Error if unable to generate a unique code after MAX_ATTEMPTS
 */
export async function generateUniqueLicenseCode(
  prisma: PrismaClient
): Promise<string> {
  const MAX_ATTEMPTS = 10;
  let attempts = 0;

  while (attempts < MAX_ATTEMPTS) {
    const code = generateLicenseCode();
    const existing = await prisma.license.findUnique({ where: { code } });

    if (!existing) {
      return code;
    }

    attempts++;
  }

  throw new Error("Failed to generate unique license code after multiple attempts");
}
