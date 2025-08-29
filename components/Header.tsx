"use client";
import Link from "next/link";
import Button from "@/components/Button";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import clsx from "clsx";

const NAV: { href: Route; label: string }[] = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[--border] bg-[--bg]/95 shadow-z1 backdrop-blur">
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <Link
          href="/"
          className="text-lg md:text-xl font-bold text-[--text]"
          aria-label="Home"
        >
          Bhavesh Sidhwani
        </Link>

        <nav className="hidden gap-6 md:flex items-baseline">
          {NAV.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  // base
                  "text-base font-medium text-[--muted] transition-colors",
                  "hover:text-[--text] hover:underline underline-offset-4",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--text]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[--bg] rounded-sm",
                  // active
                  isActive &&
                    "text-[--text] text-lg font-semibold underline decoration-2 underline-offset-4"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Style a Link as a button (no asChild) */}
          <Link href="/contact" className="hidden md:inline-flex">
            <Button>Contact</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
