/**
 * PaginationMeta — Backend-agnostic pagination model.
 *
 * All backends use different pagination field names:
 * - Laravel: { page, per_page, total, last_page }
 * - Spring Boot: { pageNumber, pageSize, totalElements, totalPages }
 * - NestJS: { page, limit, total, pages }
 * - Express/Custom: { currentPage, pageSize, totalItems, totalPages }
 *
 * The infrastructure mapper normalizes ALL of these into PaginationMeta.
 * Components and use cases only ever interact with this type.
 */
export interface PaginationMeta {
  /** Current page number (1-indexed) */
  readonly currentPage: number;

  /** Number of items per page */
  readonly perPage: number;

  /** Total number of items across all pages */
  readonly total: number;

  /** Total number of pages */
  readonly lastPage: number;
}

/**
 * Paginated result container.
 * Wraps any data type with pagination metadata.
 */
export interface PaginatedResult<T> {
  readonly data: readonly T[];
  readonly pagination: PaginationMeta;
}

/**
 * Pagination request parameters (sent TO the backend).
 */
export interface PaginationParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, unknown>;
}

/**
 * Creates a default PaginationMeta for empty or initial states.
 */
export function createDefaultPagination(overrides?: Partial<PaginationMeta>): PaginationMeta {
  return {
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1,
    ...overrides,
  };
}
