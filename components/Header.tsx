"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import clsx from "clsx";
import { IoClose, IoLogoGithub, IoLogoLinkedin, IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import Button from "./Button";

const NAV: { href: Route; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close on route change & Esc
  useEffect(() => setIsOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

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

        <div className="flex items-center gap-6">
          {/* Style a Link as a button (no asChild) */}
          <Link
            href="https://www.github.com/BhaveshSidhwani"
            className="hidden md:inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoGithub className="h-6 w-6 text-[--muted] hover:text-[--text] transition-colors" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/bhavesh-sidhwani/"
            className="hidden md:inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoLinkedin className="h-6 w-6 text-[--muted] hover:text-[--text] transition-colors" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-[--muted] hover:text-[--text] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--text]/30"
          aria-label="Toggle menu"
          aria-controls="mobile-nav"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {/* Menu icon */}
          {!isOpen ? (
            <IoMenu className="h-6 w-6" />
          ) : (
            // X icon
            <IoClose className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile dropdown panel */}
      <div
        id="mobile-nav"
        className={clsx(
          "md:hidden fixed inset-x-0 top-[72px] z-40",
          "border-y border-[--border] bg-[--bg] shadow-z1",
          "max-h-[calc(100svh-72px)] overflow-y-auto",
          "transition transform duration-200 origin-top",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="container py-2">
          <ul className="flex flex-col">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "block w-full rounded-md px-3 py-2 text-[15px] font-medium text-[--muted] transition-colors",
                      "hover:text-[--text] hover:bg-white/5",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--text]/30",
                      active && "text-[--text] bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="mt-2 h-px bg-[--border]" aria-hidden />

          {/* Mobile social row */}
          <div className="flex items-center justify-between px-2">
            <span className="px-1 text-xs uppercase tracking-wide text-[--muted]">
              Follow
            </span>
            <div className="flex items-center gap-2">
              <Link
                href="https://www.github.com/BhaveshSidhwani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in a new tab)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--text]/30"
                onClick={() => setIsOpen(false)}
              >
                <IoLogoGithub className="h-6 w-6 text-[--muted] hover:text-[--text] transition-colors" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/bhavesh-sidhwani/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in a new tab)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--text]/30"
                onClick={() => setIsOpen(false)}
              >
                <IoLogoLinkedin className="h-6 w-6 text-[--muted] hover:text-[--text] transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
