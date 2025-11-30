// lib/contact/sanitization.ts

import { FormValues, SanitizationResult } from "./types";

/**
 * Detects severe security threats that should block submission
 * Returns error message if threat detected, undefined otherwise
 */
export const detectSevereThreats = (text: string): string | undefined => {
  const threats = [
    { pattern: /<script[\s\S]*?>/gi, message: "Script tags are not allowed" },
    { pattern: /javascript:/gi, message: "JavaScript protocol is not allowed" },
    { pattern: /on\w+\s*=/gi, message: "Event handlers are not allowed" },
    { pattern: /<iframe[\s\S]*?>/gi, message: "Iframe tags are not allowed" },
    { pattern: /<object[\s\S]*?>/gi, message: "Object tags are not allowed" },
    { pattern: /<embed[\s\S]*?>/gi, message: "Embed tags are not allowed" },
  ];

  for (const threat of threats) {
    if (threat.pattern.test(text)) {
      return threat.message;
    }
  }

  // Check for multiple HTML tags (likely malicious)
  const htmlTagCount = (text.match(/<[^>]+>/g) || []).length;
  if (htmlTagCount > 2) {
    return "Multiple HTML tags detected. Please use plain text only.";
  }

  return undefined;
};

/**
 * Sanitizes input by removing/escaping dangerous content
 * This handles minor threats silently
 */
export const sanitizeInput = (text: string): string => {
  let sanitized = text;

  // Remove any remaining HTML tags (silent cleaning)
  sanitized = sanitized.replace(/<[^>]*>/g, "");

  // Escape special HTML characters
  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, "");

  return sanitized;
};

/**
 * Prevents email header injection attacks
 */
export const sanitizeEmailField = (email: string): string => {
  // Remove newlines, carriage returns, and potential header injection
  let sanitized = email
    .replace(/[\r\n]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // Remove email header patterns
  sanitized = sanitized.replace(/(bcc|cc|to|from):/gi, "");

  return sanitized;
};

/**
 * Validates and sanitizes all form data
 * Returns sanitized data or error for severe threats
 */
export const validateAndSanitizeForm = (
  values: FormValues
): SanitizationResult => {
  // Check for severe threats first (these block submission)
  const nameThreats = detectSevereThreats(values.name);
  const messageThreats = detectSevereThreats(values.message);

  if (nameThreats) return { data: values, error: `Name: ${nameThreats}` };
  if (messageThreats)
    return { data: values, error: `Message: ${messageThreats}` };

  // If no severe threats, sanitize everything (silent cleaning)
  const sanitizedData: FormValues = {
    name: sanitizeInput(values.name),
    email: sanitizeEmailField(values.email),
    message: sanitizeInput(values.message),
  };

  return { data: sanitizedData };
};
