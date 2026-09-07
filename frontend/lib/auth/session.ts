import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const COOKIE_NAME = "moyu_session";

// 获取 secret key
function getSecretKey() {
    const secret = process.env.AUTH_SECRET;
    if (!secret || secret.length < 16) {
        throw new Error("AUTH_SECRET missing or too short");
    }
    return new TextEncoder().encode(secret);
}

/**
 * 创建会话令牌
 * @param userId 用户ID
 * @returns 会话令牌
 */
export async function createSessionToken(userId: string): Promise<string> {
    return new SignJWT({ sub: userId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(getSecretKey());
}

/**
 * 验证会话令牌
 * @param token 会话令牌
 * @returns 用户ID
 */
export async function verifySessionToken(
    token: string,
): Promise<string | null> {
    try {
        const { payload } = await jwtVerify(token, getSecretKey());
        return typeof payload.sub === "string" ? payload.sub : null;
    } catch {
        return null;
    }
}

/**
 * 设置会话Cookie
 * @param userId 用户ID
 */
export async function setSessionCookie(userId: string): Promise<void> {
    const token = await createSessionToken(userId);
    const jar = await cookies();
    jar.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
    });
}

/**
 * 清除会话Cookie
 */
export async function clearSessionCookie(): Promise<void> {
    const jar = await cookies();
    jar.delete(COOKIE_NAME);
}


/**
 * 从请求中获取用户ID
 * @param request 请求
 * @returns 
 */
export async function getUserIdFromRequest(
    request: Request,
): Promise<string | null> {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    if (!match?.[1]) return null;
    return verifySessionToken(decodeURIComponent(match[1]));
}