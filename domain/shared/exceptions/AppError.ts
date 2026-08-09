export interface AppError {
  statusCode: number;
  message: string;
  code?: string;
  details?: unknown;
}

export function createAppError(statusCode: number, message: string, code?: string, details?: unknown): AppError {
  return { statusCode, message, code, details };
}
