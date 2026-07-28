/**
 * User DTOs — Data Transfer Objects for API communication.
 *
 * These represent the RAW response format from the backend.
 * They are used ONLY in the infrastructure layer (mappers/repositories).
 * The domain and presentation layers never see these types.
 */

/**
 * Raw user data from any backend.
 * Fields use `unknown` types with optional snake_case/camelCase variants
 * to accommodate different backend conventions.
 */
export interface UserResponseDTO {
  id?: number | string;
  uuid?: string;
  employee_id?: string;
  employeeId?: string;
  full_name?: string;
  fullName?: string;
  name?: string;
  first_name?: string;
  firstName?: string;
  last_name?: string;
  lastName?: string;
  email?: string;
  email_address?: string;
  phone?: string;
  avatar?: string;
  avatar_url?: string;
  gender?: string;
  role?: string;
  role_name?: string;
  department?: string;
  branch?: string;
  position?: string;
  status?: string;
  joined_at?: string;
  joinedAt?: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
  last_login?: string | null;
  lastLogin?: string | null;
  last_activity?: string;
  lastActivity?: string;
  role_color?: string;
  roleColor?: string;
  status_color?: string;
  statusColor?: string;
  permissions?: string[];
  is_online?: boolean | number;
  isOnline?: boolean | number;
  action?: string[];
  actions?: string[];
  location?: string;
  manager?: string;
  stats?: Record<string, unknown>;
  health?: Record<string, unknown>;
  timeline?: Record<string, unknown>[];
  sessions?: Record<string, unknown>[];
  teams_list?: Record<string, unknown>[];
  teamsList?: Record<string, unknown>[];
}

/**
 * Raw user summary data from backend.
 */
export interface UserSummaryDTO {
  total_users?: number;
  totalUsers?: number;
  total?: number;
  active?: number;
  pending?: number;
  inactive?: number;
  growth?: string;
  engagement?: string;
  onboarding?: string;
  follow_up?: string;
  followUp?: string;
}

/**
 * Raw pagination data from ANY backend.
 */
export interface PaginationDTO {
  // Laravel convention
  page?: number;
  per_page?: number;
  total?: number;
  last_page?: number;
  // Spring Boot convention
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
  // NestJS / Express convention
  currentPage?: number;
  limit?: number;
  totalItems?: number;
  pages?: number;
  // Django REST convention
  count?: number;
  next?: string | null;
  previous?: string | null;
}

/**
 * Complete user list response DTO.
 */
export interface UserListResponseDTO {
  users?: UserResponseDTO[];
  data?: UserResponseDTO[];
  items?: UserResponseDTO[];
  results?: UserResponseDTO[];
  summary?: UserSummaryDTO;
  tabs?: Array<{ key?: string; label?: string; count?: number }>;
  filters?: {
    roles?: Array<{ label?: string; value?: string }>;
    departments?: Array<{ label?: string; value?: string }>;
  };
  sortable?: string[];
  pagination?: PaginationDTO;
  meta?: PaginationDTO;
}
