"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthStage } from "@/components/auth/auth-stage";
import { setSession } from "@/lib/auth-session";
import { ApiError } from "@/lib/request";
import { authApi } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const data = await authApi.login(email.trim(), password);
      setSession(data);
      router.replace("/workspace");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "网络异常，请稍后重试");
    }
  }

  return (
    <AuthStage asideCopy="登录后进入生图工作台：选模型、写提示词，画布即时预览。">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8">
        <p className="text-xs tracking-[0.2em] text-teal-300/80 uppercase">
          Sign in
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-tight">
          登录
        </h2>
        <p className="mt-2 text-sm text-white/45">使用邮箱进入墨屿工作台。</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block space-y-2 text-sm">
            <span className="text-white/50">邮箱</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="auth-field"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-white/50">密码</span>
            <input
              type="password"
              required
              minLength={6}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="至少 8 位"
              className="auth-field"
            />
          </label>
          {error && (
            <p
              className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-sm text-amber-200"
              role="alert"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-2 h-12 w-full rounded-full bg-teal-400 text-sm font-semibold text-[#042f2e] transition hover:bg-teal-300"
          >
            进入工作台
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-white/45">
          还没有账号？{" "}
          <Link
            href="/register"
            className="text-teal-300 underline-offset-4 transition hover:text-teal-200 hover:underline"
          >
            免费注册
          </Link>
        </p>
      </div>
    </AuthStage>
  );
}
