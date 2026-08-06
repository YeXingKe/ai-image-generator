"use client";

import Link from "next/link";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { useClientSession } from "@/lib/use-client-session";

export default function HomePage() {
  const session = useClientSession();
  const loggedIn = !!session;

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#0c0f14] text-white">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,rgba(20,184,166,0.28),transparent_42%),radial-gradient(ellipse_at_85%_18%,rgba(56,189,248,0.12),transparent_38%),linear-gradient(165deg,#0c0f14_0%,#121826_55%,#0c0f14_100%)]"
      />
      <div aria-hidden className="stage-grid pointer-events-none absolute inset-0 opacity-40" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <BrandLockup
          inverted
          markClassName="h-8 w-8"
          textClassName="text-xl"
        />
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/about"
            className="px-3 py-2 text-white/70 transition hover:text-white"
          >
            关于
          </Link>
          {loggedIn ? (
            <Link
              href="/workspace"
              className="rounded-full bg-white px-4 py-2 font-medium text-[#0c0f14] transition hover:bg-teal-50"
            >
              进入工作台
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-2 text-white/70 transition hover:text-white"
              >
                登录
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-white px-4 py-2 font-medium text-[#0c0f14] transition hover:bg-teal-50"
              >
                注册
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-20 pt-8 md:px-10">
        <div className="max-w-2xl">
          <p className="animate-rise text-sm tracking-[0.2em] text-teal-300/80 uppercase">
            AI Image Studio
          </p>
          <div className="animate-rise-delay mt-6 flex items-center gap-4 md:gap-5">
            <BrandLockup
              inverted
              showWordmark={false}
              markClassName="h-16 w-16 md:h-20 md:w-20"
            />
            <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[1.05] tracking-tight md:text-7xl">
              墨屿
            </h1>
          </div>
          <p className="animate-rise-delay mt-5 max-w-lg text-lg leading-8 text-white/65 md:text-xl">
            登录后进入工作台：左侧配置模型版本、画幅与提示词，右侧画布预览。
          </p>
          <div className="animate-rise-delay-2 mt-9 flex flex-wrap gap-3">
            {loggedIn ? (
              <Link
                href="/workspace"
                className="rounded-full bg-teal-400 px-7 py-3 text-sm font-semibold text-[#042f2e] transition hover:bg-teal-300"
              >
                打开生图工作台
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="rounded-full bg-teal-400 px-7 py-3 text-sm font-semibold text-[#042f2e] transition hover:bg-teal-300"
                >
                  免费注册试用
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white/90 transition hover:border-white/50"
                >
                  已有账号登录
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
