import { getRequest, postRequest } from "@/lib/request";

export type AuthUser = {
  email: string;
  credits: number;
  role: string;
};
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
        return getRequest<AuthUser>("/api/auth/me");
    },
};