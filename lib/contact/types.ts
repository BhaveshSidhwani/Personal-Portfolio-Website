export interface FormValues {
  name: string;
  email: string;
  message: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
  security?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

export interface SanitizationResult {
  data: FormValues;
  error?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  waitTime?: number;
}
