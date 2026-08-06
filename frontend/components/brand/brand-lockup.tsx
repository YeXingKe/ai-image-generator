import { MoyuMark } from "@/components/brand/moyu-mark";

type BrandLockupProps = {
  className?: string;
  /** 图形尺寸（正方形边长） */
  markClassName?: string;
  /** 字号类名 */
  textClassName?: string;
  /** 深色底用浅色字 */
  inverted?: boolean;
  showWordmark?: boolean;
};

/** 墨屿商标组合：独立图形 + 字标 */
export function BrandLockup({
  className = "",
  markClassName = "h-7 w-7",
  textClassName = "text-xl",
  inverted = false,
  showWordmark = true,
}: BrandLockupProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${
        inverted ? "text-white" : "text-[var(--ink)]"
      } ${className}`}
    >
      <MoyuMark className={`shrink-0 ${markClassName}`} />
      {showWordmark && (
        <span
          className={`font-[family-name:var(--font-display)] tracking-tight ${textClassName}`}
        >
          墨屿
        </span>
      )}
    </span>
  );
}
