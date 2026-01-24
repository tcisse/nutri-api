import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Utiliser le mot de passe depuis l'environnement ou un par défaut
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminGo21@";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Upsert admin (créer ou mettre à jour)
  const admin = await prisma.admin.upsert({
    where: { email: "admin@goshop.com" },
    update: {
      password: hashedPassword, // Met à jour le mot de passe si l'admin existe
    },
    create: {
      email: "admin@goshop.com",
      password: hashedPassword,
      name: "Admin GoShop",
    },
  });

  console.log("✓ Admin configuré:", admin.email);
  console.log("✓ Mot de passe:", adminPassword === "AdminGo21@" ? "AdminGo21@" : "depuis ADMIN_PASSWORD");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
