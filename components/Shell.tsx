"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CalendarDays, House, MoreHorizontal, Sparkles } from "lucide-react";

const TABS = [
  { href: "/", label: "今日", icon: House, match: (p: string) => p === "/" },
  {
    href: "/practice",
    label: "练习",
    icon: Sparkles,
    match: (p: string) =>
      [
        "/practice",
        "/sounds",
        "/listening",
        "/shadowing",
        "/extensive",
        "/chunks",
        "/scenario",
        "/video",
        "/conversation",
        "/review",
        "/micro",
        "/compare",
        "/phrases",
      ].includes(p),
  },
  { href: "/plan", label: "计划", icon: CalendarDays, match: (p: string) => p === "/plan" || p === "/rules" },
  { href: "/book", label: "本子", icon: BookOpen, match: (p: string) => p === "/book" },
  {
    href: "/data",
    label: "我的",
    icon: MoreHorizontal,
    match: (p: string) => p === "/data" || p === "/materials" || p === "/credits",
  },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link href="/" className="brand">
          听说激活
        </Link>
        <span className="brand-sub">12 周</span>
      </header>
      <main className="main">{children}</main>
      <nav className="tabbar" aria-label="主导航">
        {TABS.map((tab) => {
          const on = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <Link key={tab.href} href={tab.href} className={on ? "on" : ""}>
              <Icon size={20} strokeWidth={on ? 2.2 : 1.8} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
