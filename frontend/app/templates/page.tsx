"use client";

import { AuthGate } from "@/components/auth/auth-gate";
import { AppShell } from "@/components/layout/app-shell";
import { ComingSoon } from "@/components/layout/coming-soon";

export default function TemplatesPage() {
  return (
    <AuthGate>
      {(session) => (
        <AppShell session={session}>
          <ComingSoon
            title="模板"
            description="场景化提示词与构图预设即将上线，帮助你更快出图。"
          />
        </AppShell>
      )}
    </AuthGate>
  );
}
