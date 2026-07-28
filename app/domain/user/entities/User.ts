/**
 * User Entity — Pure domain representation of a user.
 *
 * This entity contains ONLY business-relevant fields.
 * UI-specific concerns (colors, icons, action arrays) are in UserModel.
 * Backend-specific field names are in UserResponseDTO.
 *
 * All field names use camelCase (domain convention).
 */
export interface UserEntity {
  readonly id: number;
  readonly uuid: string;
  readonly employeeId: string;
  readonly fullName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly avatar: string;
  readonly gender: string;
  readonly role: string;
  readonly department: string;
  readonly branch: string;
  readonly position: string;
  readonly status: string;
  readonly joinedAt: string;
  readonly lastLogin: string | null;
  readonly lastActivity: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly permissions: readonly string[];
  readonly isOnline: boolean;
  readonly location?: string;
  readonly manager?: string;
}

/**
 * User Stats — Engagement metrics for a user.
 */
export interface UserStats {
  readonly logins: number;
  readonly tasksClosed: number;
  readonly projects: number;
  readonly teams: number;
}

/**
 * User Health — Security health indicators.
 */
export interface UserHealth {
  readonly emailVerification: boolean;
  readonly twoFactor: boolean;
  readonly riskScore: string;
}

/**
 * User Activity Timeline — Chronological activity entries.
 */
export interface UserActivityTimeline {
  readonly title: string;
  readonly description: string;
  readonly time: string;
  readonly indicatorColor?: string;
}

/**
 * User Session — Active device sessions.
 */
export interface UserSession {
  readonly device: string;
  readonly location: string;
  readonly isCurrent: boolean;
  readonly lastActive: string;
}

/**
 * User Team — Team memberships.
 */
export interface UserTeam {
  readonly name: string;
  readonly membersCount: number;
  readonly icon: string;
  readonly colorClass: string;
}
