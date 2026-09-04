import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@moyu.local").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "Admin123456";

  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters");
  }

  const hashed = await bcrypt.hash(password, 10);
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    const admin = await prisma.user.update({
      where: { email },
      data: { role: "admin", password: hashed },
    });
    console.log(
      `Admin updated: ${admin.email} (role=${admin.role}, credits=${admin.credits})`,
    );
  } else {
    const admin = await prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          email,
          password: hashed,
          role: "admin",
          credits: 9999,
        },
      });
      await tx.creditTransaction.create({
        data: {
          userId: created.id,
          amount: 9999,
          type: "recharge",
          description: "管理员初始化积分",
        },
      });
      return created;
    });
    console.log(
      `Admin created: ${admin.email} (role=${admin.role}, credits=${admin.credits})`,
    );
  }

  console.log(
    "Use ADMIN_EMAIL / ADMIN_PASSWORD in .env (default: admin@moyu.local / Admin123456)",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
