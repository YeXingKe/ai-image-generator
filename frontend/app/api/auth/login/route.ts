import { fail, ok } from "@/lib/api-response";
import { verifyPassword } from "@/lib/auth/password";
import { setSessionCookie } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

/**
 * 登录
 * @param request 请求
 * @returns 登录结果
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

  if (!email || password.length < 8) {
    return fail("VALIDATION_ERROR", "请输入邮箱和密码", 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return fail("UNAUTHORIZED", "邮箱或密码错误", 401);
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return fail("UNAUTHORIZED", "邮箱或密码错误", 401);
  }

  await setSessionCookie(user.id);
  return ok({ email: user.email, credits: user.credits, role: user.role });
}