import Link from "next/link";
import { MoyuMark } from "@/components/brand/moyu-mark";

const PILLARS = [
  {
    title: "文生图",
    copy: "用自然语言描述画面，数秒得到可下载的成图。",
  },
  {
    title: "图生图",
    copy: "上传参考图并补充提示词，在构图与风格上继续延展。",
  },
  {
    title: "多模型",
    copy: "混元与 GPT Image 同台切换，按任务挑性价比与细节。",
  },
  {
    title: "积分制",
    copy: "按次计费、余额可见，出图前就能预估消耗。",
  },
] as const;

const MARK_PARTS = [
  {
    label: "印玺圆环",
    copy: "边界与承诺——创作发生在可控的工作台里。",
  },
  {
    label: "岛形剪影",
    copy: "想法落成画面的落点，像一座浮现的岛屿。",
  },
  {
    label: "墨滴",
    copy: "灵感的一滴墨，青绿点缀，点题「墨屿」。",
  },
] as const;

type AboutViewProps = {
  /** 访客页显示注册/登录；工作台内显示回工作台 */
  ctaMode?: "guest" | "app";
};

export function AboutView({ ctaMode = "app" }: AboutViewProps) {
  return (
    <main className="relative min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-[var(--stage)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="stage-grid absolute inset-0 opacity-50" />
        <div className="hero-glow absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(20,184,166,0.22),transparent_45%),radial-gradient(ellipse_at_90%_30%,rgba(56,189,248,0.1),transparent_40%),radial-gradient(ellipse_at_50%_100%,rgba(15,118,110,0.12),transparent_50%)]" />
      </div>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col px-6 pb-16 pt-12 md:px-10 md:pb-24 md:pt-16">
        <p className="animate-rise text-xs tracking-[0.24em] text-teal-300/85 uppercase">
          About Moyu
        </p>
        <div className="animate-rise-delay mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex min-w-0 items-center gap-5 md:gap-7">
            <div className="about-mark-spin relative shrink-0 overflow-visible">
              <div className="absolute -inset-3 rounded-full bg-teal-400/10 blur-xl" />
              <MoyuMark className="relative h-24 w-24 text-white md:h-28 md:w-28" />
            </div>
            <div className="min-w-0">
              <h1 className="font-[family-name:var(--font-display)] text-5xl tracking-tight md:text-7xl">
                墨屿
              </h1>
              <p className="mt-2 text-sm tracking-[0.18em] text-white/45 uppercase">
                Moyu · AI Image Studio
              </p>
            </div>
          </div>
          <p className="max-w-sm min-w-0 text-base leading-7 text-white/60 md:text-right md:text-lg md:leading-8">
            轻量 AI 生图工具。注册即用，按积分出图，把灵感落在一座可控的岛屿上。
          </p>
        </div>
      </section>

      {/* Trademark */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-10 md:py-20">
          <div>
            <p className="text-xs tracking-[0.2em] text-teal-300/80 uppercase">
              Trademark
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl">
              独立商标
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/55 md:text-base md:leading-8">
              「墨屿」商标由印玺圆环、岛形剪影与墨滴组成，象征创作从一滴墨意长成完整画面。图形标可独立使用，亦可与字标「墨屿」组合出现。
            </p>
          </div>
          <ul className="space-y-0 divide-y divide-white/10">
            {MARK_PARTS.map((part, i) => (
              <li
                key={part.label}
                className="flex gap-5 py-5 first:pt-0 last:pb-0"
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <span className="font-[family-name:var(--font-display)] text-2xl tabular-nums text-teal-400/90">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-base font-medium text-white">{part.label}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-white/50">{part.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Product */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
          <p className="text-xs tracking-[0.2em] text-teal-300/80 uppercase">
            Product
          </p>
          <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl">
            面向创作者与小微商家的生图工作台
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
            不做复杂节点编排，先把「登录 → 出图 → 扣积分 → 充值 → 再出图」走顺。左侧配置模型与提示词，右侧画布即时预览，适合头像、配图、商品图与灵感试错。
          </p>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {PILLARS.map((item) => (
              <article
                key={item.title}
                className="group bg-[#12161e] p-6 transition hover:bg-[#161b25] md:p-8"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl tracking-tight text-white transition group-hover:text-teal-300">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Specs strip */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10 md:py-16">
          <div className="space-y-1">
            <p className="text-xs tracking-[0.2em] text-white/35 uppercase">Version</p>
            <p className="font-[family-name:var(--font-display)] text-2xl">MVP v1.0</p>
          </div>
          <div className="h-px w-full bg-white/10 md:h-12 md:w-px" />
          <div className="space-y-1">
            <p className="text-xs tracking-[0.2em] text-white/35 uppercase">Models</p>
            <p className="font-[family-name:var(--font-display)] text-2xl">
              混元 · GPT Image
            </p>
          </div>
          <div className="h-px w-full bg-white/10 md:h-12 md:w-px" />
          <div className="space-y-1">
            <p className="text-xs tracking-[0.2em] text-white/35 uppercase">Billing</p>
            <p className="font-[family-name:var(--font-display)] text-2xl">积分按次</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10 md:py-16">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight md:text-3xl">
              把下一张图留在墨屿
            </h2>
            <p className="mt-2 text-sm text-white/50">
              注册赠送体验积分，打开工作台即可开始。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {ctaMode === "guest" ? (
              <>
                <Link
                  href="/register"
                  className="rounded-full bg-teal-400 px-7 py-3 text-sm font-semibold text-[#042f2e] transition hover:bg-teal-300"
                >
                  免费注册试用
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white/90 transition hover:border-white/45"
                >
                  登录
                </Link>
              </>
            ) : (
              <Link
                href="/workspace"
                className="rounded-full bg-teal-400 px-7 py-3 text-sm font-semibold text-[#042f2e] transition hover:bg-teal-300"
              >
                打开生图工作台
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
