"use client";

import Link from "next/link";
import { AuthGate } from "@/components/auth/auth-gate";
import { AppShell } from "@/components/layout/app-shell";

export default function HistoryPage() {
  return (
    <AuthGate>
      {(session) => (
        <AppShell session={session}>
          <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
            <h1 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
              历史作品
            </h1>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              登录后可在此查看已生成图片。列表 API 接通后将展示 Prompt、模型与结果。
            </p>
            <Link
              href="/workspace"
              className="mt-8 inline-flex text-sm font-medium text-[var(--ink)] underline-offset-4 hover:underline"
            >
              ← 返回工作台
            </Link>
          </main>
        </AppShell>
      )}
    </AuthGate>
  );
}
