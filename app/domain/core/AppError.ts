/**
 * AppError — Normalized error type for the entire application.
 *
 * All errors from any backend are converted to this format via
 * the AppErrorNormalizer in the infrastructure layer.
 *
 * Components and use cases only ever see AppError, never raw
 * HTTP error shapes like { message: "..." } or { error: "..." }.
 */
export interface AppError {
  /** HTTP status code or application error code */
  readonly code: number;

  /** Human-readable error message */
  readonly message: string;

  /** Optional additional details (stack trace, context, etc.) */
  readonly details?: unknown;

  /** Optional per-field validation errors */
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
}

/**
 * Factory function to create AppError instances.
 */
export function createAppError(
  code: number,
  message: string,
  options?: { details?: unknown; fieldErrors?: Record<string, string[]> }
): AppError {
  return {
    code,
    message,
    details: options?.details,
    fieldErrors: options?.fieldErrors,
  };
}

/**
 * Type guard to check if an unknown value is an AppError.
 */
export function isAppError(value: unknown): value is AppError {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.code === 'number' && typeof obj.message === 'string';
}
