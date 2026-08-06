import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon PNG — 墨屿商标（与 brand mark 一致） */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0f14",
          borderRadius: 7,
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="24" stroke="#f7f9fc" strokeWidth="2.2" />
          <circle
            cx="32"
            cy="32"
            r="19.5"
            stroke="#f7f9fc"
            strokeWidth="0.9"
            opacity="0.35"
          />
          <path
            d="M16 39.5c3.6-1.9 7-1.9 10.5 0 3.6 1.9 7 1.9 10.6 0 3.3-1.7 6.4-1.8 9.9.2"
            stroke="#14b8a6"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M21.5 39.2c2.4-6.6 5.5-12.3 9.9-17.1 4.5 4.7 7.7 10.4 10 17.1"
            fill="#f7f9fc"
          />
          <path
            d="M29.5 29.2c1.2-2.2 2.1-4 1.9-6.2 1.8 2.4 2.9 4.7 3.8 7.3"
            stroke="#14b8a6"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M44.2 20.2c0 2.9-2.1 4.8-4.4 4.8-2.3 0-4.3-1.9-4.3-4.8 0-2.1 1.8-4.9 4.3-7.2 2.3 2.2 4.4 5 4.4 7.2Z"
            fill="#0f766e"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
