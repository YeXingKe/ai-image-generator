"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { authApi } from "@/lib/api/auth";
import { clearSession, type ClientSession } from "@/lib/auth-session";
import { APP_NAV } from "@/lib/nav";

type AppShellProps = {
  session: ClientSession;
  children: React.ReactNode;
};

export function AppShell({ session, children }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    try {
      await authApi.logout();
    } catch {
      // 网络失败也清本地，避免卡住
    }
    clearSession();
    router.replace("/");
  }

  return (
    <div className="flex h-dvh max-w-[100vw] flex-col overflow-hidden bg-[var(--bg)] text-[var(--ink)]">
      <header className="z-50 flex h-14 w-full min-w-0 shrink-0 items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--panel)]/95 px-4 backdrop-blur md:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
          <Link href="/workspace" className="inline-flex shrink-0">
            <BrandLockup markClassName="h-7 w-7" textClassName="text-lg" />
          </Link>
          <nav className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto overscroll-x-contain px-0.5 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {APP_NAV.map(({ href, label }) => {
              const active =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`shrink-0 rounded-full px-2.5 py-1.5 transition sm:px-3 ${
                    active
                      ? "bg-[var(--ink)] text-white"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-sm sm:gap-3">
          <span className="hidden max-w-[10rem] truncate rounded-full bg-[var(--bg)] px-3 py-1.5 text-[var(--muted)] lg:inline">
            {session.email}
          </span>
          <span className="rounded-full bg-teal-50 px-2.5 py-1.5 font-medium tabular-nums text-teal-800 sm:px-3">
            {session.credits} 积分
          </span>
          <button
            type="button"
            onClick={logout}
            className="px-2 py-1.5 text-[var(--muted)] transition hover:text-[var(--ink)]"
          >
            退出
          </button>
        </div>
      </header>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
