import type { Metadata, Viewport } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import { AppProvider } from "@/components/AppProvider";
import { Shell } from "@/components/Shell";
import { STORAGE_KEY } from "@/lib/types";
import "./globals.css";

const ui = DM_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const practice = Source_Serif_4({
  variable: "--font-practice",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "听说激活 · 12 周英语听说计划",
  description: "一份 12 周英语听说激活计划：绕过应试语法，直接打通声音与意义。每天 90 分钟，数据只存在这台设备上。",
  applicationName: "听说激活",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1815" },
  ],
};

const themeScript = `
try {
  var raw = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
  var theme = "system";
  if (raw) theme = JSON.parse(raw).theme || "system";
  var dark = theme === "dark" || (theme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (dark) document.documentElement.classList.add("dark");
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={`${ui.variable} ${practice.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <AppProvider>
          <Shell>{children}</Shell>
        </AppProvider>
      </body>
    </html>
  );
}
