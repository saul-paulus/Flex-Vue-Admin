import type { FetchError } from 'ofetch';

export interface ApiErrorResponsePayload {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Standardized API Error Handler.
 *
 * Converts HTTP errors, network failures, and API error payloads
 * into user-friendly or domain-actionable error messages.
 */
export function handleApiError(error: unknown, fallbackMessage = 'An unexpected error occurred'): string {
  if (!error) return fallbackMessage;

  // Handle ofetch FetchError
  const fetchError = error as FetchError<ApiErrorResponsePayload>;

  if (fetchError.response) {
    const status = fetchError.response.status;
    const data = fetchError.response._data;

    // If API returned a custom error message
    if (data?.message) {
      return data.message;
    }

    // Standard HTTP status code mapping
    switch (status) {
      case 400:
        return 'Bad Request: Please check your input.';
      case 401:
        return 'Unauthorized: Invalid credentials or session expired.';
      case 403:
        return 'Forbidden: You do not have permission to access this resource.';
      case 404:
        return 'Resource not found.';
      case 422:
        if (data?.errors) {
          const firstField = Object.keys(data.errors)[0];
          const firstError = data.errors[firstField]?.[0];
          if (firstError) return firstError;
        }
        return 'Validation error: Please check your input.';
      case 500:
        return 'Server Error: Internal server error occurred. Please try again later.';
      case 502:
      case 503:
      case 504:
        return 'Service Unavailable: Backend API is currently reachable or under maintenance.';
      default:
        return `HTTP Error ${status}: ${fallbackMessage}`;
    }
  }

  // Network / Connection Error
  if (fetchError.message?.includes('Fetch failed') || fetchError.message?.includes('NetworkError')) {
    return 'Network Error: Cannot connect to backend server. Please check your internet or API URL.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}
