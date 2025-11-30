// lib/contact/rateLimit.ts

import { RateLimitResult } from "./types";

/**
 * Rate limiting configuration
 */
const RATE_LIMIT_CONFIG = {
  MAX_SUBMISSIONS: 3,
  TIME_WINDOW_MS: 60 * 60 * 1000, // 1 hour in milliseconds
};

/**
 * Checks if user has exceeded rate limit
 * Limit: 3 submissions per hour
 */
export const checkRateLimit = (
  submissionTimestamps: number[],
  rateLimitedUntil: number | null
): RateLimitResult => {
  const now = Date.now();
  const timeWindowAgo = now - RATE_LIMIT_CONFIG.TIME_WINDOW_MS;

  // Filter out timestamps older than the time window
  const recentSubmissions = submissionTimestamps.filter(
    (ts) => ts > timeWindowAgo
  );

  // Check if currently rate limited
  if (rateLimitedUntil && now < rateLimitedUntil) {
    const waitTime = Math.ceil((rateLimitedUntil - now) / 1000 / 60); // minutes
    return { allowed: false, waitTime };
  }

  // Check if exceeded limit
  if (recentSubmissions.length >= RATE_LIMIT_CONFIG.MAX_SUBMISSIONS) {
    const oldestSubmission = Math.min(...recentSubmissions);
    const waitUntil = oldestSubmission + RATE_LIMIT_CONFIG.TIME_WINDOW_MS;
    const waitTime = Math.ceil((waitUntil - now) / 1000 / 60); // minutes

    return { allowed: false, waitTime };
  }

  return { allowed: true };
};

/**
 * Gets the current timestamp for recording a submission
 */
export const getCurrentTimestamp = (): number => {
  return Date.now();
};

/**
 * Cleans up old timestamps (older than time window)
 */
export const cleanupOldTimestamps = (timestamps: number[]): number[] => {
  const now = Date.now();
  const timeWindowAgo = now - RATE_LIMIT_CONFIG.TIME_WINDOW_MS;
  return timestamps.filter((ts) => ts > timeWindowAgo);
};
