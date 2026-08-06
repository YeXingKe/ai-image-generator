"use client";

import Link from "next/link";
import { AboutView } from "@/components/about/about-view";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { AppShell } from "@/components/layout/app-shell";
import { useClientSession } from "@/lib/use-client-session";

function GuestAboutChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh max-w-[100vw] flex-col overflow-hidden bg-[var(--stage)] text-white">
      <header className="z-50 flex w-full min-w-0 shrink-0 items-center justify-between border-b border-white/10 bg-[var(--stage)]/95 px-6 py-4 backdrop-blur md:px-10">
        <Link href="/" className="inline-flex shrink-0">
          <BrandLockup inverted markClassName="h-8 w-8" textClassName="text-xl" />
        </Link>
        <div className="flex shrink-0 items-center gap-3 text-sm">
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
        </div>
      </header>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}

export default function AboutPage() {
  const session = useClientSession();

  if (session) {
    return (
      <AppShell session={session}>
        <AboutView ctaMode="app" />
      </AppShell>
    );
  }

  return (
    <GuestAboutChrome>
      <AboutView ctaMode="guest" />
    </GuestAboutChrome>
  );
}
