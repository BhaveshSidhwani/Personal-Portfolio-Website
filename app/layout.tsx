import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Bhavesh Sidhwani",
    template: "%s — Bhavesh Sidhwani",
  },
  description:
    "Portfolio — placeholder description (140–160 chars) for SEO and link previews.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus-ring absolute left-2 top-2 rounded bg-white px-2 py-1"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col bg-[--bg] text-[--text]">
          <Header />
          <main id="main" className="container py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
