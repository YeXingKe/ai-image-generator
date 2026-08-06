"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClientSession } from "@/lib/use-client-session";
import type { ClientSession } from "@/lib/auth-session";

type AuthGateProps = {
  children: (session: ClientSession) => React.ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const session = useClientSession();

  useEffect(() => {
    if (session === null) {
      router.replace("/login");
    }
  }, [session, router]);

  if (!session) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[var(--bg)] text-[var(--muted)]">
        加载中…
      </div>
    );
  }

  return <>{children(session)}</>;
}
