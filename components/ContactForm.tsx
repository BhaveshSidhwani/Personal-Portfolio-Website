"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoWarning } from "react-icons/io5";

import Button from "./Button";
import { FormValues, ValidationErrors } from "@/lib/contact/types";
import { validateForm, validateField } from "@/lib/contact/validation";
import { getFormMountTime } from "@/lib/contact/botDetection";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Controlled form values
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });

  // Track form mount time for bot detection
  const formMountTimeRef = useRef<number>(0);
  useEffect(() => {
    // Record when form component mounts
    formMountTimeRef.current = getFormMountTime();
  }, []);

  // handleBlur: Validates field when user leaves it (clicks away)
  // This provides immediate feedback without being annoying like onChange validation
  const handleBlur = (field: keyof FormValues) => {
    const error = validateField(field, values[field]);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  // Handle input changes
  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Validate form client-side
    const { isValid, errors: validationErrors } = validateForm(values);

    if (!isValid) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Clear any existing errors
    setErrors({});
    setStatus("loading");

    // Prepare payload with trimmed and normalized values
    const payload = {
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      message: values.message.trim(),
      website: formData.get("website") as string,
      phone: formData.get("phone") as string,
      linkedin: formData.get("linkedin") as string,
      formMountTimeRef: formMountTimeRef.current,
    };

    try {
      // Using EmailJS - Free up to 200 emails/month
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setStatusCode(res.status);

      if (res.ok) {
        setStatus("success");

        // Reset form
        setValues({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("error");
        // Handle specific error types
        if (data.errors) {
          // Validation errors from server
          setErrors(data.errors);
        } else if (data.error) {
          // Security errors
          setErrors({ security: data.error });
        }
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus("error");
      setStatusCode(null);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-[--success] bg-[--panel] p-6">
        <h3 className="text-lg font-semibold text-green-700 mb-2">
          Message Sent!
        </h3>
        <p className="text-[--muted]">
          Thanks! I&apos;ll get back to you soon. You can also reach me at{" "}
          <a
            className="text-accent-500 hover:underline"
            href="mailto:sidhwanibhavesh@gmail.com"
          >
            sidhwanibhavesh@gmail.com
          </a>
          .
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-accent-500 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-lg border border-[--error] bg-[--panel] p-6">
        <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
        <p className="text-[--error] mb-2">
          Oops! Something went wrong sending your message. Please try again or
          reach me at{" "}
          <a
            className="text-accent-500 hover:underline"
            href="mailto:sidhwanibhavesh@gmail.com"
          >
            sidhwanibhavesh@gmail.com
          </a>
          .
        </p>
        {statusCode && (
          <p className="text-sm text-[--muted] mb-4">
            Error code: <strong>{statusCode}</strong>
          </p>
        )}
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-accent-500 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-[--border] bg-[--panel] p-6 space-y-4"
      noValidate
    >
      {/* Security Error Display */}
      {errors.security && (
        <div className="rounded-lg border border-[--error] bg-[--panel] p-4">
          <div className="flex items-start">
            <IoWarning className="w-[1.75em] h-[1.75em] text-[--error] mr-2 flex-shrink-0 mt-2" />
            <div>
              <h4 className="text-sm font-semibold text-orange-800">
                Security Warning
              </h4>
              <p className="text-sm text-orange-700 mt-1">{errors.security}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            disabled={status === "loading"}
            className={`mt-1 h-11 w-full rounded-md border px-3 transition-colors
              ${
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-[--border]"
              }
              ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}
              bg-[--panel] focus:outline-none focus:ring-2 focus:ring-accent-500/20`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-[--error]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            disabled={status === "loading"}
            className={`mt-1 h-11 w-full rounded-md border px-3 transition-colors
              ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-[--border]"
              }
              ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}
              bg-[--panel] focus:outline-none focus:ring-2 focus:ring-accent-500/20`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-[--error]">
              {errors.email}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={5000}
            value={values.message}
            onChange={(e) => handleChange("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            disabled={status === "loading"}
            className={`mt-1 w-full rounded-md border p-3 transition-colors
              ${
                errors.message
                  ? "border-[--error] focus:border-[--error] focus:ring-[--error]"
                  : "border-[--border]"
              }
              ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}
              bg-[--panel] focus:outline-none focus:ring-2 focus:ring-accent-500/20`}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-[--error]">
              {errors.message}
            </p>
          )}
          <p className="mt-1 text-xs text-[--muted]">
            {values.message.trim().length} / 5000 characters
          </p>
        </div>
      </div>

      {/* Honeypot fields - hidden from real users */}
      <input
        type="text"
        name="website"
        className="absolute opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999" }}
      />

      <input
        type="tel"
        name="phone"
        className="absolute opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999" }}
      />

      <input
        type="url"
        name="linkedin"
        className="absolute opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999" }}
      />

      <Button disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
