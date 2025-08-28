"use client";
import React, { useState } from "react";
import Button from "./Button";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusCode, setStatusCode] = useState<number | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    // Honeypot
    if ((formData.get("website") as string)?.length) {
      setStatus("success"); // silently ignore
      return;
    }
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
      setStatusCode(res.status);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-[--border] bg-white p-6">
        <p className="text-[--muted]">
          Thanks! I&apos;ll get back to you soon. You can also reach me at{" "}
          <a className="text-accent-500" href="mailto:you@example.com">
            you@example.com
          </a>
          .
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-lg border border-red-500 bg-[--panel] p-6">
        <p className="text-[--error]">
          Oops! Something went wrong. Please try again later.
        </p>
        {statusCode && (
          <p className="text-[--error]">
            Error code: <strong>{statusCode}</strong>
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-[--border] bg-[--panel] p-6 space-y-4"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            required
            className="mt-1 h-11 w-full rounded-md border border-[--border] bg-[--panel] px-3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 h-11 w-full rounded-md border border-[--border] bg-[--panel] px-3"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">
            Company (optional)
          </label>
          <input
            name="company"
            className="mt-1 h-11 w-full rounded-md border border-[--border] bg-[--panel] px-3"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Message</label>
          <textarea
            name="message"
            rows={5}
            required
            className="mt-1 w-full rounded-md border border-[--border] bg-[--panel] p-3"
          />
        </div>
      </div>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <Button>Send message</Button>
    </form>
  );
}
