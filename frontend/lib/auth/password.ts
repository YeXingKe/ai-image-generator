import "server-only"; // 标记这个模块只能在服务端用
import bcrypt from "bcryptjs";

/**
 * 密码加密
 * @param plain 明文密码
 * @returns 加密后的密码
 */
export async function hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10);
}

/**
 * 密码验证
 * @param plain 明文密码
 * @param hashed 加密后的密码
 * @returns 是否验证成功
 */
export async function verifyPassword(
    plain: string,
    hashed: string,
): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
}