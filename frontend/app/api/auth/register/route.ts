import { fail, ok } from "@/lib/api-response";
import { hashPassword } from "@/lib/auth/password";
import { setSessionCookie } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

/**
 * 注册
 * @param request 请求
 * @returns 注册结果
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("VALIDATION_ERROR", "Invalid JSON body", 400);
  }

  const email =
    typeof body === "object" && body && "email" in body
      ? String((body as { email: unknown }).email ?? "").trim()
      : "";
  const password =
    typeof body === "object" && body && "password" in body
      ? String((body as { password: unknown }).password ?? "")
      : "";

  if (!email.includes("@")) {
    return fail("VALIDATION_ERROR", "请输入有效邮箱", 400);
  }
  if (password.length < 8) {
    return fail("VALIDATION_ERROR", "密码至少 8 位", 400);
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return fail("VALIDATION_ERROR", "该邮箱已注册", 400);
  }

  const hashed = await hashPassword(password);
  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: { email, password: hashed, credits: 10 },
    });
    await tx.creditTransaction.create({
      data: {
        userId: created.id,
        amount: 10,
        type: "recharge",
        description: "注册赠送体验积分",
      },
    });
    return created;
  });

  await setSessionCookie(user.id);
  return ok({ email: user.email, credits: user.credits, role: user.role });
}