// lib/contact/botDetection.ts

export interface BotDetectionResult {
  isBot: boolean;
  reason?: string;
}

/**
 * Configuration for bot detection
 */
const BOT_DETECTION_CONFIG = {
  MIN_FORM_TIME_MS: 2000, // Minimum time to fill form (2 seconds)
  MAX_FORM_TIME_MS: 1800000, // Maximum time before considering stale (30 minutes) (Not implemented)
};

/**
 * Checks if form was submitted too quickly
 * Humans need at least 3 seconds to read and fill a form
 */
export const checkFormTiming = (formMountTime: number): BotDetectionResult => {
  const now = Date.now();
  const timeTaken = now - formMountTime;

  // Too fast but not as suspicious
  if (timeTaken < BOT_DETECTION_CONFIG.MIN_FORM_TIME_MS) {
    return {
      isBot: true,
      reason: `Form submitted too quickly. Please ensure all fields are filled correctly.`,
    };
  }

  return { isBot: false };
};

/**
 * Validates honeypot fields
 * Returns true if any honeypot field has a value (indicating bot)
 */
export const checkHoneypotFields = (formData: FormData): BotDetectionResult => {
  const honeypotFields = ["website", "phone", "linkedin"];

  for (const field of honeypotFields) {
    const value = formData.get(field) as string;
    if (value && value.length > 0) {
      // Don't reveal which field triggered detection
      return {
        isBot: true,
        reason: undefined, // Silent rejection
      };
    }
  }

  return { isBot: false };
};

/**
 * Checks for suspicious patterns in form data
 */
export const checkSuspiciousPatterns = (
  name: string,
  email: string,
  message: string
): BotDetectionResult => {
  // Check for common bot patterns
  const suspiciousPatterns = [
    // URLs in name field (bots often put links everywhere)
    {
      field: "name",
      pattern: /https?:\/\//i,
      reason: "Name field contains URL",
    },

    // Repeated characters (keyboard mashing)
    {
      field: "message",
      pattern: /(.)\1{10,}/i,
      reason: "Message contains excessive repeated characters",
    },

    // Excessive special characters
    {
      field: "message",
      pattern: /[!@#$%^&*]{5,}/i,
      reason: "Message contains excessive special characters",
    },

    // Email-like pattern in name (bots often confuse fields)
    {
      field: "name",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      reason: "Name appears to be an email address",
    },
  ];

  for (const check of suspiciousPatterns) {
    let textToCheck = "";
    switch (check.field) {
      case "name":
        textToCheck = name;
        break;
      case "email":
        textToCheck = email;
        break;
      case "message":
        textToCheck = message;
        break;
    }

    if (check.pattern.test(textToCheck)) {
      return {
        isBot: true,
        reason: check.reason,
      };
    }
  }

  return { isBot: false };
};

/**
 * Master bot detection function
 * Runs all bot detection checks
 */
export const detectBot = (
  formData: FormData,
  formMountTime: number,
  values: { name: string; email: string; message: string }
): BotDetectionResult => {
  // Check 1: Honeypot fields
  const honeypotCheck = checkHoneypotFields(formData);
  if (honeypotCheck.isBot) {
    return honeypotCheck;
  }

  // Check 2: Form timing
  const timingCheck = checkFormTiming(formMountTime);
  if (timingCheck.isBot) {
    return timingCheck;
  }

  // Check 3: Suspicious patterns
  const patternCheck = checkSuspiciousPatterns(
    values.name,
    values.email,
    values.message
  );
  if (patternCheck.isBot) {
    return patternCheck;
  }

  return { isBot: false };
};

/**
 * Gets current timestamp for tracking form mount time
 */
export const getFormMountTime = (): number => {
  return Date.now();
};
