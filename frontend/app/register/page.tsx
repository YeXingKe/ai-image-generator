"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthStage } from "@/components/auth/auth-stage";
import { setSession } from "@/lib/auth-session";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || password.length < 6) {
      setError("请输入邮箱，密码至少 6 位");
      return;
    }
    // UI 阶段：本地会话并赠送体验积分。真实注册接通 /api/auth/register 后替换。
    setSession({ email: email.trim(), credits: 10 });
    router.replace("/workspace");
  }

  return (
    <AuthStage asideCopy="注册即赠 10 体验积分，立刻在工作台试出第一张图。">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8">
        <p className="text-xs tracking-[0.2em] text-teal-300/80 uppercase">
          Create account
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-tight">
          注册
        </h2>
        <p className="mt-2 text-sm text-white/45">
          创建账号，体验积分马上到账。
        </p>

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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="至少 6 位"
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
            创建并进入工作台
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-white/45">
          已有账号？{" "}
          <Link
            href="/login"
            className="text-teal-300 underline-offset-4 transition hover:text-teal-200 hover:underline"
          >
            去登录
          </Link>
        </p>
      </div>
    </AuthStage>
  );
}
