import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { validateForm } from "@/lib/contact/validation";
import { validateAndSanitizeForm } from "@/lib/contact/sanitization";
import { detectBot } from "@/lib/contact/botDetection";
import { checkRateLimit } from "@/lib/contact/rateLimit";
import { FormValues } from "@/lib/contact/types";

// Rate limiting store (in-memory for demo; use persistent store in production)
const rateLimitStore = new Map<
  string,
  { timestamps: number[]; lockedUntil: number | null }
>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, website, phone, linkedin, formMountTime } =
      body;

    // Prepare honeypot form data
    const formData = new FormData();
    formData.append("website", website || "");
    formData.append("phone", phone || "");
    formData.append("linkedin", linkedin || "");

    // Get client IP for rate limiting
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Bot detection - Check honeypot fields and form timing
    const botCheck = detectBot(formData, formMountTime, {
      name,
      email,
      message,
    });

    if (botCheck.isBot) {
      if (botCheck.reason) {
        return NextResponse.json({ error: botCheck.reason }, { status: 400 });
      }
      // Silent success for honeypot catches
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Rate limiting check
    const rateLimit = rateLimitStore.get(clientIp) || {
      timestamps: [],
      lockedUntil: null,
    };
    const rateLimitCheck = checkRateLimit(
      rateLimit.timestamps,
      rateLimit.lockedUntil
    );

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: `You have reached the submission limit. Please wait ${
            rateLimitCheck.waitTime
          } minute${
            rateLimitCheck.waitTime !== 1 ? "s" : ""
          } before trying again.`,
        },
        { status: 429 }
      );
    }

    // Validate form
    const values: FormValues = { name, email, message };
    const { isValid, errors } = validateForm(values);

    if (!isValid) {
      return NextResponse.json(
        { error: "Validation failed", errors },
        { status: 400 }
      );
    }

    // Sanitize form data
    const { data: sanitizedData, error: securityError } =
      validateAndSanitizeForm(values);

    if (securityError) {
      return NextResponse.json({ error: securityError }, { status: 400 });
    }

    // Prepare payload
    const payload = {
      name: sanitizedData.name.trim(),
      email: sanitizedData.email.trim().toLowerCase(),
      message: sanitizedData.message.trim(),
    };

    // Prepare email HTML body
    const emailBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Message:</strong></p>
      <p>${payload.message.replace(/\n/g, "<br>")}</p>
    `;

    // Send email via Gmail SMTP using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: `"${payload.name}" <${process.env.GMAIL_USER}`,
        to: "sidhwanibhavesh@gmail.com",
        replyTo: payload.email,
        subject: `New Contact Form Message from ${payload.name}`,
        html: emailBody,
        text: `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`, // Plain text fallback
      });
    } catch (emailErr) {
      console.error("Nodemailer error:", emailErr);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Update rate limit for this IP
    const now = Date.now();
    rateLimit.timestamps.push(now);
    rateLimitStore.set(clientIp, rateLimit);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
