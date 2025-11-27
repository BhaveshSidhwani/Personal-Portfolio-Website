import { FormValues, ValidationErrors, ValidationResult } from "./types";

/**
 * Validates email for header injection attempts
 */
export const validateEmailSecurity = (email: string): string | undefined => {
  // Check for newlines (header injection)
  if (/[\r\n]/.test(email)) {
    return "Email contains invalid characters";
  }

  // Check for header-like patterns
  if (/^(bcc|cc|to|from):/i.test(email)) {
    return "Email format is invalid";
  }

  // Check for multiple @ signs (potential injection)
  if ((email.match(/@/g) || []).length > 1) {
    return "Email format is invalid";
  }

  return undefined;
};

/**
 * Validates name field
 */
export const validateName = (rawName: string): string | undefined => {
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
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return "Name contains invalid characters";
  }
  return undefined;
};

/**
 * Validates email field
 */
export const validateEmail = (rawEmail: string): string | undefined => {
  const email = rawEmail.trim();
  if (!email) {
    return "Email is required";
  }

  // Security check first
  const securityError = validateEmailSecurity(email);
  if (securityError) {
    return securityError;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  if (email.length > 254) {
    return "Email is too long";
  }
  return undefined;
};

/**
 * Validates message field
 */
export const validateMessage = (rawMessage: string): string | undefined => {
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

/**
 * Validates entire form
 */
export const validateForm = (values: FormValues): ValidationResult => {
  const errors: ValidationErrors = {};

  const nameError = validateName(values.name);
  const emailError = validateEmail(values.email);
  const messageError = validateMessage(values.message);

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (messageError) errors.message = messageError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates a single field (for onBlur validation)
 */
export const validateField = (
  field: keyof FormValues,
  value: string
): string | undefined => {
  switch (field) {
    case "name":
      return validateName(value);
    case "email":
      return validateEmail(value);
    case "message":
      return validateMessage(value);
    default:
      return undefined;
  }
};
