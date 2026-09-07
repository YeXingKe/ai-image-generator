import { getRequest, postRequest } from "@/lib/request";

export type AuthUser = {
  email: string;
  credits: number;
  role: string;
};

/** 并发去重：Strict Mode 双挂载时共用同一次 /me */
let meInflight: Promise<AuthUser> | null = null;

/** 页面只调这些方法，不写路径 */
export const authApi = {
  login(email: string, password: string) {
    return postRequest<AuthUser>("/api/auth/login", { email, password });
  },

  register(email: string, password: string) {
    return postRequest<AuthUser>("/api/auth/register", { email, password });
  },

  logout() {
    return postRequest<{ loggedOut: boolean }>("/api/auth/logout");
  },

  me() {
    if (!meInflight) {
      meInflight = getRequest<AuthUser>("/api/auth/me").finally(() => {
        meInflight = null;
      });
    }
    return meInflight;
  },
};
