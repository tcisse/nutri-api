import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import type { CreateUserSchema, CreateSessionSchema } from "../schemas/userSchemas.js";

export const createUser = async (data: CreateUserSchema) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hashedPassword,
      role: "user",
      gender: data.gender,
      height: data.height,
      country: data.country,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      sessions: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!user) throw new Error("Email ou mot de passe incorrect");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Email ou mot de passe incorrect");

  const { password: _, ...userData } = user;
  return userData;
};

export const updateUser = async (id: string, data: Partial<CreateUserSchema>) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const createSession = async (userId: string, data: CreateSessionSchema) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("Utilisateur non trouvé");

  const sessionCount = await prisma.session.count({ where: { userId } });
  const month = sessionCount + 1;

  return prisma.session.create({
    data: {
      userId,
      month,
      weight: data.weight,
      age: data.age,
      activityLevel: data.activityLevel,
      goal: data.goal,
      rate: data.rate || null,
    },
    include: { menu: true },
  });
};

export const getUserSessions = async (userId: string) => {
  return prisma.session.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { menu: true },
  });
};

export const getLatestSession = async (userId: string) => {
  return prisma.session.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { menu: true },
  });
};

export const getMenu = async (sessionId: string) => {
  return prisma.menu.findUnique({
    where: { sessionId },
  });
};

export const saveMenu = async (sessionId: string, menuData: unknown) => {
  return prisma.menu.upsert({
    where: { sessionId },
    create: {
      sessionId,
      data: JSON.stringify(menuData),
    },
    update: {
      data: JSON.stringify(menuData),
    },
  });
};
