/**
 * User Entities — Pure domain models for user management.
 * Framework-agnostic and free from infrastructure concerns.
 */

export interface UserStats {
  readonly logins: number;
  readonly tasksClosed: number;
  readonly projects: number;
  readonly teams: number;
}

export interface UserHealth {
  readonly emailVerification: boolean;
  readonly twoFactor: boolean;
  readonly riskScore: string;
}

export interface UserActivityTimeline {
  readonly title: string;
  readonly description: string;
  readonly time: string;
  readonly indicatorColor?: string;
}

export interface UserSession {
  readonly device: string;
  readonly location: string;
  readonly isCurrent: boolean;
  readonly lastActive: string;
}

export interface UserTeam {
  readonly name: string;
  readonly membersCount: number;
  readonly icon: string;
  readonly colorClass: string;
}

export interface FilterOption {
  readonly label: string;
  readonly value: string;
}

export interface TabItem {
  readonly key: string;
  readonly label: string;
  readonly count: number;
}

export interface UserSummaryModel {
  readonly totalUsers: number;
  readonly active: number;
  readonly pending: number;
  readonly inactive: number;
  readonly growth?: string;
  readonly engagement?: string;
  readonly onboarding?: string;
  readonly followUp?: string;
}

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
  readonly location?: unknown;
  readonly manager?: unknown;
}

export interface UserModel extends UserEntity {
  readonly roleBadgeClass: string;
  readonly statusColorClass: string;
  readonly actions: readonly string[];
  readonly stats?: UserStats;
  readonly health?: UserHealth;
  readonly timeline?: readonly UserActivityTimeline[];
  readonly sessions?: readonly UserSession[];
  readonly teamsList?: readonly UserTeam[];
}
