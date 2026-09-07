"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { calcGenerationCost } from "@/lib/credits";
import {
  IMAGE_SIZES,
  MODEL_FAMILIES,
  defaultVersionId,
  getModelVersion,
  versionsForFamily,
  type GenerateMode,
  type ImageSizeId,
  type ModelFamily,
} from "@/lib/models";

const SIZE_GROUPS = ["常用", "影视", "摄影"] as const;

export function GenerateWorkspace() {
  const [family, setFamily] = useState<ModelFamily>("hunyuan");
  const [modelVersion, setModelVersion] = useState(defaultVersionId("hunyuan"));
  const [mode, setMode] = useState<GenerateMode>("text_to_image");
  const [size, setSize] = useState<ImageSizeId>("1024x1024");
  const [sizeOpen, setSizeOpen] = useState(false);
  const sizeMenuRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const versions = useMemo(() => versionsForFamily(family), [family]);
  const activeVersion = getModelVersion(modelVersion) ?? versions[0];
  const selectedSize = IMAGE_SIZES.find((item) => item.id === size);

  const cost = useMemo(
    () => calcGenerationCost(modelVersion, mode),
    [modelVersion, mode],
  );

  useEffect(() => {
    if (!sizeOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (!sizeMenuRef.current?.contains(e.target as Node)) {
        setSizeOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSizeOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [sizeOpen]);

  function selectFamily(next: ModelFamily) {
    setFamily(next);
    const nextVersionId = defaultVersionId(next);
    setModelVersion(nextVersionId);
    const nextVersion = getModelVersion(nextVersionId);
    if (mode === "image_to_image" && nextVersion && !nextVersion.supportsImageToImage) {
      setMode("text_to_image");
    }
  }

  function selectVersion(id: string) {
    setModelVersion(id);
    const nextVersion = getModelVersion(id);
    if (mode === "image_to_image" && nextVersion && !nextVersion.supportsImageToImage) {
      setMode("text_to_image");
    }
  }

  async function onGenerate(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setBusy(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: family,
          modelVersion,
          mode,
          size,
          prompt,
          refImageUrl: null,
        }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        error?: { message?: string };
      };
      if (!json.ok) {
        setMessage(json.error?.message ?? "生成尚未接通，请稍后重试");
        return;
      }
      setResultUrl(null);
    } catch {
      setMessage("网络异常，请稍后重试");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(480px,560px)] xl:grid-cols-[minmax(0,1fr)_minmax(520px,640px)]">
      {/* Left: preview */}
      <section className="relative order-2 flex min-h-[46vh] flex-col overflow-hidden bg-[var(--stage)] lg:order-none lg:min-h-0">
        <div className="stage-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(20,184,166,0.14),transparent_55%),radial-gradient(ellipse_at_80%_90%,rgba(56,189,248,0.08),transparent_45%)]" />

        <div className="relative z-10 flex items-center justify-between px-5 py-4 text-xs text-[var(--stage-muted)] md:px-7">
          <span>预览</span>
          <span className="tracking-wide">
            {activeVersion?.name ?? "—"} · {size}
          </span>
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center px-5 pb-8 md:px-10">
          {resultUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resultUrl}
              alt="生成结果"
              className="max-h-[min(68vh,760px)] w-auto max-w-full object-contain shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
            />
          ) : (
            <div className="relative flex w-full max-w-md flex-col items-center gap-4 px-4 text-center">
              <div className="pulse-ring h-24 w-24 rounded-full border border-white/10 bg-white/[0.03]" />
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-white">
                  等待创作
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--stage-muted)]">
                  在右侧选择模型版本与提示词，生成结果会呈现在此画布。
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Right: config */}
      <section className="order-1 flex min-h-0 flex-col border-b border-[var(--line)] bg-[var(--panel)] lg:order-none lg:border-b-0 lg:border-l">
        <form
          onSubmit={onGenerate}
          className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-5 md:p-6"
        >
          <header className="space-y-1">
            <h1 className="font-[family-name:var(--font-display)] text-[1.35rem] tracking-tight text-[var(--ink)]">
              图片配置
            </h1>
            <p className="text-sm text-[var(--muted)]">
              先选模型系列，再选具体版本与画面参数。
            </p>
          </header>

          <fieldset className="space-y-2.5">
            <legend className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              模型系列
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {MODEL_FAMILIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectFamily(item.id)}
                  className={`seg-btn ${family === item.id ? "seg-btn-active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="text-xs leading-5 text-[var(--muted)]">
              {MODEL_FAMILIES.find((f) => f.id === family)?.blurb}
            </p>
          </fieldset>

          <fieldset className="space-y-2.5">
            <legend className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              模型版本
            </legend>
            <div className="space-y-2">
              {versions.map((v) => {
                const active = modelVersion === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => selectVersion(v.id)}
                    className={`version-row ${active ? "version-row-active" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-[var(--ink)]">
                            {v.name}
                          </span>
                          <span className="rounded-full bg-[var(--bg)] px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-[var(--muted)]">
                            {v.tag}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                          {v.blurb}
                          {!v.supportsImageToImage ? " · 暂不支持图生图" : ""}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-medium tabular-nums text-[var(--ink)]">
                        {v.baseCost} 积分起
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="space-y-2.5">
            <legend className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              生成模式
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["text_to_image", "文生图"],
                  ["image_to_image", "图生图"],
                ] as const
              ).map(([value, label]) => {
                const disabled =
                  value === "image_to_image" && !activeVersion?.supportsImageToImage;
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={disabled}
                    onClick={() => setMode(value)}
                    className={`seg-btn disabled:cursor-not-allowed disabled:opacity-40 ${
                      mode === value ? "seg-btn-active" : ""
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="space-y-2.5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              画幅
            </span>
            <div className="relative" ref={sizeMenuRef}>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={sizeOpen}
                onClick={() => setSizeOpen((open) => !open)}
                className="field-input flex h-11 w-full cursor-pointer items-center rounded-xl pr-11 text-left"
              >
                {selectedSize
                  ? `${selectedSize.label} · ${selectedSize.hint}（${selectedSize.id}）`
                  : size}
              </button>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[var(--muted)]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className={`transition-transform duration-200 ${
                    sizeOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path
                    d="M3.2 5.2L7 9l3.8-3.8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {sizeOpen && (
                <ul
                  role="listbox"
                  aria-label="画幅"
                  className="absolute z-30 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl border border-[var(--line)] bg-white py-1 shadow-[var(--shadow-soft)]"
                >
                  {SIZE_GROUPS.map((group) => (
                    <li key={group} role="presentation">
                      <div className="px-3 pb-1 pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                        {group}
                      </div>
                      <ul role="group" aria-label={group}>
                        {IMAGE_SIZES.filter((item) => item.group === group).map((item) => {
                          const active = item.id === size;
                          return (
                            <li key={item.id} role="option" aria-selected={active}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSize(item.id);
                                  setSizeOpen(false);
                                }}
                                className={`flex w-full px-3 py-2 text-left text-sm transition ${
                                  active
                                    ? "bg-[var(--accent-soft)] text-[var(--ink)]"
                                    : "text-[var(--ink)] hover:bg-[var(--bg)]"
                                }`}
                              >
                                {item.label} · {item.hint}（{item.id}）
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {mode === "image_to_image" && (
            <label className="block space-y-2">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                参考图
              </span>
              <div className="rounded-xl border border-dashed border-[var(--line-strong)] bg-white px-4 py-7 text-center">
                <input
                  type="file"
                  accept="image/*"
                  className="mx-auto block w-full max-w-xs text-sm text-[var(--muted)] file:mr-3 file:rounded-full file:border-0 file:bg-[var(--bg)] file:px-3 file:py-1.5 file:text-sm file:text-[var(--ink)]"
                />
                <p className="mt-2 text-xs text-[var(--muted)]">支持 jpg / png / webp</p>
              </div>
            </label>
          )}

          <label className="flex min-h-0 flex-1 flex-col gap-2">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              提示词
            </span>
            <textarea
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={7}
              placeholder="描述主体、场景、光线与风格。例如：清晨窗边的橘猫，柔和侧光，写实摄影"
              className="field-input min-h-36 flex-1 resize-y rounded-xl"
            />
          </label>

          <div className="sticky bottom-0 -mx-5 mt-auto space-y-3 border-t border-[var(--line)] bg-[var(--panel)]/95 px-5 py-4 backdrop-blur md:-mx-6 md:px-6">
            <div className="flex items-end justify-between gap-3 text-sm">
              <div>
                <p className="text-[var(--muted)]">预计消耗</p>
                <p className="mt-0.5 font-[family-name:var(--font-display)] text-xl tabular-nums text-[var(--ink)]">
                  {cost}{" "}
                  <span className="text-sm font-normal text-[var(--muted)]">积分</span>
                </p>
              </div>
              <p className="max-w-[55%] text-right text-xs leading-5 text-[var(--muted)]">
                {activeVersion?.name}
                {mode === "image_to_image" ? " · 含图生图加价" : ""}
              </p>
            </div>
            {message && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800" role="status">
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={busy || !prompt.trim()}
              className="h-12 w-full rounded-xl bg-[var(--ink)] text-sm font-semibold tracking-wide text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-35"
            >
              {busy ? "提交中…" : "生成图片"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
