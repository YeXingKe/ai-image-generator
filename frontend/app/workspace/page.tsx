"use client";

import { AuthGate } from "@/components/auth/auth-gate";
import { GenerateWorkspace } from "@/components/generate/generate-workspace";
import { AppShell } from "@/components/layout/app-shell";

export default function WorkspacePage() {
  return (
    <AuthGate>
      {(session) => (
        <AppShell session={session}>
          <GenerateWorkspace />
        </AppShell>
      )}
    </AuthGate>
  );
}
