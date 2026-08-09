/**
 * AppErrorNormalizer — Converts ANY backend error format into AppError.
 *
 * Supports all common backend error conventions:
 * - Laravel:     { message: "...", errors: { field: ["..."] } }
 * - NestJS:      { message: "...", statusCode: 422 }
 * - Spring Boot: { message: "...", errors: [...] }
 * - Express:     { error: "..." }
 * - DRF:         { detail: "..." }
 * - Generic:     { errors: ["..."] }
 *
 * This is the ONLY place where backend error shapes are interpreted.
 */
import type { AppError } from '@domain/shared/exceptions/AppError';
import { createAppError } from '@domain/shared/exceptions/AppError';
import type { FetchError } from 'ofetch';

interface RawErrorPayload {
  success?: boolean;
  message?: string;
  error?: string;
  detail?: string;
  errors?: Record<string, string[]> | string[];
  statusCode?: number;
}

/**
 * Normalize any error into an AppError.
 */
export function normalizeError(error: unknown, fallbackMessage = 'An unexpected error occurred'): AppError {
  if (!error) return createAppError(0, fallbackMessage);

  // Handle ofetch FetchError
  const fetchError = error as FetchError<RawErrorPayload>;

  if (fetchError.response) {
    const status = fetchError.response.status;
    const data = fetchError.response._data;

    // Extract message from various backend formats
    const message = extractMessage(data, status, fallbackMessage);
    const fieldErrors = extractFieldErrors(data);

    return createAppError(status, message, {
      details: data,
      fieldErrors: fieldErrors ?? undefined,
    });
  }

  // Network / Connection Error
  if (
    fetchError.message?.includes('Fetch failed') ||
    fetchError.message?.includes('NetworkError') ||
    fetchError.message?.includes('fetch failed')
  ) {
    return createAppError(
      0,
      'Network Error: Cannot connect to backend server. Please check your internet or API URL.',
      { details: fetchError.message }
    );
  }

  if (error instanceof Error) {
    return createAppError(0, error.message, { details: error.stack });
  }

  return createAppError(0, fallbackMessage);
}

function extractMessage(data: RawErrorPayload | undefined, status: number, fallback: string): string {
  if (!data) return httpStatusMessage(status, fallback);

  // Try all common message field conventions
  if (typeof data.message === 'string' && data.message) return data.message;
  if (typeof data.error === 'string' && data.error) return data.error;
  if (typeof data.detail === 'string' && data.detail) return data.detail;

  // Array of errors — take the first one
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    const first = data.errors[0];
    if (typeof first === 'string') return first;
  }

  // Field errors object — take the first field's first error
  if (data.errors && !Array.isArray(data.errors)) {
    const firstField = Object.keys(data.errors)[0];
    const firstError = data.errors[firstField]?.[0];
    if (firstError) return firstError;
  }

  return httpStatusMessage(status, fallback);
}

function extractFieldErrors(data: RawErrorPayload | undefined): Record<string, string[]> | null {
  if (!data?.errors) return null;
  if (Array.isArray(data.errors)) return null;
  return data.errors as Record<string, string[]>;
}

function httpStatusMessage(status: number, fallback: string): string {
  const messages: Record<number, string> = {
    400: 'Bad Request: Please check your input.',
    401: 'Unauthorized: Invalid credentials or session expired.',
    403: 'Forbidden: You do not have permission to access this resource.',
    404: 'Resource not found.',
    422: 'Validation error: Please check your input.',
    429: 'Too many requests. Please try again later.',
    500: 'Server Error: Internal server error occurred. Please try again later.',
    502: 'Service Unavailable: Backend API is currently unreachable.',
    503: 'Service Unavailable: Backend API is under maintenance.',
    504: 'Gateway Timeout: Backend API took too long to respond.',
  };
  return messages[status] || `HTTP Error ${status}: ${fallback}`;
}
