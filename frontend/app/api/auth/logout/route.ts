import { ok } from "@/lib/api-response";
import { clearSessionCookie } from "@/lib/auth/session";

/**
 * 登出：清除会话 Cookie
 */
export async function POST() {
  await clearSessionCookie();
  return ok({ loggedOut: true });
}
