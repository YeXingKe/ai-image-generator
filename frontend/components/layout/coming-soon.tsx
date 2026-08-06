import Link from "next/link";

type ComingSoonProps = {
  title: string;
  description: string;
};

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--stage)] text-white">
      <div className="stage-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_20%,rgba(20,184,166,0.16),transparent_50%)]" />
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-6 py-16 text-center">
        <p className="text-xs tracking-[0.22em] text-teal-300/80 uppercase">
          Coming Soon
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-tight">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--stage-muted)]">
          {description}
        </p>
        <Link
          href="/workspace"
          className="mt-10 inline-flex self-center rounded-full bg-teal-400 px-6 py-2.5 text-sm font-semibold text-[#042f2e] transition hover:bg-teal-300"
        >
          回到工作台
        </Link>
      </div>
    </main>
  );
}
