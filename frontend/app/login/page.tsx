"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { setSession } from "@/lib/auth-session";

export default function LoginPage() {
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
    // UI 阶段：本地会话。真实鉴权接通 /api/auth/login 后替换。
    setSession({ email: email.trim(), credits: 10 });
    router.replace("/workspace");
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--bg)] text-[var(--ink)]">
      <header className="px-6 py-5 md:px-10">
        <Link href="/" className="inline-flex">
          <BrandLockup markClassName="h-8 w-8" textClassName="text-xl" />
        </Link>
      </header>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 pb-16">
        <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">登录</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">登录后使用生图工作台与历史记录。</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block space-y-2 text-sm">
            <span className="text-[var(--muted)]">邮箱</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full border border-[var(--line)] bg-white px-3 outline-none focus:border-[var(--accent)]"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-[var(--muted)]">密码</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full border border-[var(--line)] bg-white px-3 outline-none focus:border-[var(--accent)]"
            />
          </label>
          {error && <p className="text-sm text-amber-700">{error}</p>}
          <button
            type="submit"
            className="h-11 w-full bg-[var(--ink)] text-sm font-medium text-[var(--bg)] hover:opacity-90"
          >
            登录
          </button>
        </form>
        <p className="mt-6 text-sm text-[var(--muted)]">
          还没有账号？{" "}
          <Link href="/register" className="text-[var(--ink)] underline-offset-4 hover:underline">
            注册
          </Link>
        </p>
      </main>
    </div>
  );
}
