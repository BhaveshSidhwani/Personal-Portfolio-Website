"use client";
import React, { useState } from "react";
import Button from "./Button";

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormValues {
  name: string;
  email: string;
  message: string;
}

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

  // Validation functions
  const validateName = (rawName: string): string | undefined => {
    const name = rawName.trim();
    if (!name) {
      return "Name is required";
    }
    if (name.length < 2) {
      return "Name must be at least 2 characters";
    }
    if (name.length > 100) {
      return "Name must be less than 100 characters";
    }
    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      return "Name contains invalid characters";
    }
    return undefined;
  };

  const validateEmail = (rawEmail: string): string | undefined => {
    const email = rawEmail.trim();
    if (!email) {
      return "Email is required";
    }
    // comprehensive email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    if (email.length > 254) {
      return "Email is too long";
    }
    return undefined;
  };

  const validateMessage = (rawMessage: string): string | undefined => {
    const message = rawMessage.trim();
    if (!message) {
      return "Message is required";
    }
    if (message.length < 10) {
      return "Message must be at least 10 characters";
    }
    if (message.length > 5000) {
      return "Message must be less than 5000 characters";
    }
    return undefined;
  };

  // Validate all fields
  const validateForm = (): { isValid: boolean; errors: ValidationErrors } => {
    const newErrors: ValidationErrors = {};

    const nameError = validateName(values.name);
    const emailError = validateEmail(values.email);
    const messageError = validateMessage(values.message);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (messageError) newErrors.message = messageError;

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  };

  // handleBlur: Validates field when user leaves it (clicks away)
  // This provides immediate feedback without being annoying like onChange validation
  const handleBlur = (field: keyof FormValues) => {
    let error: string | undefined;

    switch (field) {
      case "name":
        error = validateName(values.name);
        break;
      case "email":
        error = validateEmail(values.email);
        break;
      case "message":
        error = validateMessage(values.message);
        break;
    }

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

    // Honeypot check - silently reject bot submissions
    if ((formData.get("website") as string)?.length) {
      setStatus("success");
      return;
    }

    // Validate form
    const { isValid, errors: validationErrors } = validateForm();

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

    try {
      // TEMPORARY: Mock success for testing
      // Remove this and uncomment one of the options above
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = { ok: true, status: 200 };

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
      }
    } catch (error) {
      console.error("Email sending error:", error);
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

      {/* Honeypot field - hidden from real users */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <Button disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
