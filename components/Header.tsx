"use client";
import Link from "next/link";
import Button from "@/components/Button";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme";
import type { Route } from "next";
import clsx from "clsx";

const NAV: { href: Route; label: string }[] = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-[--border] bg-[--bg]/95 shadow-z1 backdrop-blur">
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="font-bold text-[--text]" aria-label="Home">
          Your Name
        </Link>

        <nav className="hidden gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "text-sm text-[--muted] hover:text-[--text]",
                pathname.startsWith(item.href) && "underline"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Style a Link as a button (no asChild) */}
          <Link href="/contact" className="hidden md:inline-flex">
            <Button>Contact</Button>
          </Link>

          <Button
            variant="ghost"
            aria-label="Toggle dark mode"
            onClick={toggle}
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </Button>
        </div>
      </div>
    </header>
  );
}
