import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: "admin@goshop.com" },
  });

  if (existingAdmin) {
    console.log("✓ Admin existe déjà:", existingAdmin.email);
    return;
  }

  // Create admin
  const admin = await prisma.admin.create({
    data: {
      email: "admin@goshop.com",
      password: hashedPassword,
      name: "Admin GoShop",
    },
  });

  console.log("✓ Admin créé:", admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
