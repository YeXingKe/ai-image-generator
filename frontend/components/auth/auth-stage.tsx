import Link from "next/link";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { MoyuMark } from "@/components/brand/moyu-mark";

type AuthStageProps = {
  children: React.ReactNode;
  /** 左侧大标题下的说明 */
  asideCopy: string;
  eyebrow?: string;
};

/** 登录 / 注册共用：深色舞台 + 左品牌 + 右表单 */
export function AuthStage({
  children,
  asideCopy,
  eyebrow = "AI Image Studio",
}: AuthStageProps) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[var(--stage)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="hero-glow absolute inset-0 bg-[radial-gradient(ellipse_at_12%_18%,rgba(20,184,166,0.28),transparent_42%),radial-gradient(ellipse_at_88%_12%,rgba(56,189,248,0.12),transparent_36%),radial-gradient(ellipse_at_70%_90%,rgba(15,118,110,0.14),transparent_45%),linear-gradient(165deg,#0c0f14_0%,#121826_55%,#0c0f14_100%)]" />
        <div className="stage-grid absolute inset-0 opacity-40" />
      </div>

      <header className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="inline-flex">
          <BrandLockup inverted markClassName="h-8 w-8" textClassName="text-xl" />
        </Link>
        <Link
          href="/about"
          className="text-sm text-white/60 transition hover:text-white"
        >
          关于墨屿
        </Link>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-12 pt-4 md:px-10 lg:flex-row lg:items-center lg:gap-16 lg:pb-20 lg:pt-0">
        <aside className="animate-rise flex min-w-0 flex-1 flex-col justify-center">
          <p className="text-xs tracking-[0.22em] text-teal-300/85 uppercase">
            {eyebrow}
          </p>
          <div className="mt-6 flex items-center gap-4 md:gap-5">
            <div className="about-mark-spin relative shrink-0">
              <div className="absolute -inset-3 rounded-full bg-teal-400/10 blur-xl" />
              <MoyuMark className="relative h-16 w-16 text-white md:h-20 md:w-20" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-5xl tracking-tight md:text-6xl lg:text-7xl">
              墨屿
            </h1>
          </div>
          <p className="mt-5 max-w-md text-base leading-7 text-white/55 md:text-lg md:leading-8">
            {asideCopy}
          </p>
          <ul className="mt-8 hidden gap-8 text-sm text-white/40 sm:flex">
            <li>
              <span className="block text-teal-300/90">混元 · GPT</span>
              多模型切换
            </li>
            <li>
              <span className="block text-teal-300/90">积分按次</span>
              消耗可预期
            </li>
            <li>
              <span className="block text-teal-300/90">左右工作台</span>
              配置即预览
            </li>
          </ul>
        </aside>

        <section className="animate-rise-delay w-full shrink-0 lg:w-[26rem]">
          {children}
        </section>
      </div>
    </div>
  );
}
