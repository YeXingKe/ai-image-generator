import type { Metadata } from "next";
import "@fontsource-variable/outfit";
import "@fontsource-variable/fraunces";
import "./globals.css";

export const metadata: Metadata = {
  title: "墨屿 · AI 生图",
  description: "墨屿 — 积分制 AI 图像生成",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/moyu-mark.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full overflow-x-hidden antialiased">
      <body className="flex min-h-full flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
