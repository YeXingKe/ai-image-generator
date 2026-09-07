import { fail, ok } from "@/lib/api-response";
import { getUserIdFromRequest } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

/**
 * 获取当前用户信息
 * @param request 请求
 * @returns 当前用户信息
 */
export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return fail("UNAUTHORIZED", "未登录", 401);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, credits: true, role: true },
  });
  if (!user) {
    return fail("UNAUTHORIZED", "用户不存在", 401);
  }

  return ok(user);
}