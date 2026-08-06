type MoyuMarkProps = {
  className?: string;
  title?: string;
};

/** 墨屿独立商标图形：印玺圆环 · 岛形 · 墨滴 */
export function MoyuMark({ className, title = "墨屿" }: MoyuMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label={title}
    >
      <circle
        cx="32"
        cy="32"
        r="29"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle
        cx="32"
        cy="32"
        r="24.5"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
      <path
        d="M14 40.5c4.2-2.2 8.1-2.2 12.2 0 4.2 2.2 8.1 2.2 12.3 0 3.8-2 7.4-2.1 11.5.2"
        stroke="var(--accent, #0f766e)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20.5 40.2c2.8-7.6 6.4-14.2 11.5-19.8 5.2 5.4 8.9 12 11.6 19.8"
        fill="currentColor"
      />
      <path
        d="M29.8 28.5c1.4-2.6 2.4-4.6 2.2-7.2 2.1 2.8 3.4 5.4 4.4 8.4"
        stroke="var(--accent-hot, #14b8a6)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M45.5 18.2c0 3.4-2.5 5.6-5.1 5.6-2.7 0-5-2.2-5-5.6 0-2.4 2.1-5.7 5-8.4 2.7 2.6 5.1 5.9 5.1 8.4Z"
        fill="var(--accent, #0f766e)"
      />
    </svg>
  );
}
