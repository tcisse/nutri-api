import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import type { AdminCreateSchema } from "../schemas/adminSchemas.js";

export const createAdmin = async (data: AdminCreateSchema) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.admin.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    },
  });
};

export const findAdminByEmail = async (email: string) => {
  return prisma.admin.findUnique({ where: { email } });
};

export const verifyPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const getAllUsers = async (page: number = 1, limit: number = 20, search?: string) => {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          { firstName: { contains: search } },
          { lastName: { contains: search } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        sessions: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users: users.map((u) => {
      const { password: _, sessions, ...userData } = u;
      return {
        ...userData,
        lastSession: sessions[0]
          ? {
              ...sessions[0],
              portionBudget: JSON.parse(sessions[0].portionBudget),
            }
          : null,
      };
    }),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getUserDetail = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      sessions: {
        orderBy: { createdAt: "desc" },
        include: { menu: true },
      },
    },
  });
  if (!user) return null;
  const { password: _, ...userData } = user;
  return userData;
};

export const deleteUser = async (userId: string) => {
  return prisma.user.delete({ where: { id: userId } });
};

export const getStats = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalUsers, activeThisMonth, usersByCountry, usersByGoal, totalMenus] =
    await Promise.all([
      prisma.user.count(),
      prisma.session.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
      prisma.user.groupBy({
        by: ["country"],
        _count: { country: true },
      }),
      prisma.session.groupBy({
        by: ["goal"],
        _count: { goal: true },
      }),
      prisma.menu.count(),
    ]);

  return {
    totalUsers,
    activeThisMonth,
    totalMenus,
    usersByCountry: usersByCountry.map((g) => ({
      country: g.country,
      count: g._count.country,
    })),
    usersByGoal: usersByGoal.map((g) => ({
      goal: g.goal,
      count: g._count.goal,
    })),
  };
};
