import { describe, expect, it, vi, beforeEach } from 'vitest';
import { GetUsersUseCase } from '~/application/users/GetUsersUseCase';
import { GetUserByIdUseCase } from '~/application/users/GetUserByIdUseCase';
import { GetRolesUseCase } from '~/application/roles/GetRolesUseCase';
import { SaveRolePermissionsUseCase } from '~/application/roles/SaveRolePermissionsUseCase';
import { Result } from '@domain/shared/value-objects/Result';
import { createAppError } from '@domain/shared/exceptions/AppError';
import type { UserRepository, UserListResult } from '@domain/users/UserRepository';
import type { RoleRepository, RolesListResult } from '@domain/roles/RoleRepository';
import type { UserModel } from '@domain/users/models/UserModel';
import type { RoleModel } from '@domain/roles/models/RoleModel';

function createMockUserRepository(): UserRepository {
  return {
    getUsers: vi.fn(),
    getUserById: vi.fn(),
  };
}

function createMockRoleRepository(): RoleRepository {
  return {
    getRoles: vi.fn(),
    saveRolePermissions: vi.fn(),
  };
}

const mockUser: UserModel = {
  id: 1,
  uuid: 'u-1',
  employeeId: 'emp-1',
  fullName: 'Jane Doe',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  phone: '12345',
  avatar: '',
  gender: 'female',
  role: 'Admin',
  department: 'IT',
  branch: 'Main',
  position: 'Lead',
  status: 'Active',
  joinedAt: '2024-01-01',
  lastLogin: null,
  lastActivity: '2024-01-02',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  permissions: [],
  isOnline: true,
  roleBadgeClass: 'bg-danger-subtle text-danger',
  statusColorClass: 'text-success',
  actions: ['view', 'edit'],
};

const mockUserResult: UserListResult = {
  users: [mockUser],
  summary: { totalUsers: 1, active: 1, pending: 0, inactive: 0 },
  tabs: [{ key: 'all', label: 'All', count: 1 }],
  filters: { roles: [{ label: 'Admin', value: 'Admin' }] },
  sortable: ['id', 'name'],
  pagination: { currentPage: 1, perPage: 10, total: 1, lastPage: 1 },
};

const mockRole: RoleModel = {
  id: 1,
  name: 'Admin',
  usersCount: 5,
  icon: 'shield',
  color: 'danger',
  description: 'Full access',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  matrix: {},
};

const mockRolesResult: RolesListResult = {
  roles: [mockRole],
  permissionGroups: [],
};

describe('User & Role Use Cases', () => {
  let mockUserRepo: UserRepository;
  let mockRoleRepo: RoleRepository;

  beforeEach(() => {
    mockUserRepo = createMockUserRepository();
    mockRoleRepo = createMockRoleRepository();
  });

  describe('GetUsersUseCase', () => {
    it('should return user list result on success', async () => {
      vi.mocked(mockUserRepo.getUsers).mockResolvedValueOnce(Result.ok(mockUserResult));
      const useCase = new GetUsersUseCase(mockUserRepo);

      const result = await useCase.execute();

      expect(result.isOk()).toBe(true);
      expect(result.value.users).toHaveLength(1);
      expect(mockUserRepo.getUsers).toHaveBeenCalled();
    });

    it('should return fail on error', async () => {
      const err = createAppError(500, 'Network error');
      vi.mocked(mockUserRepo.getUsers).mockResolvedValueOnce(Result.fail(err));
      const useCase = new GetUsersUseCase(mockUserRepo);

      const result = await useCase.execute();

      expect(result.isFail()).toBe(true);
      expect(result.error.message).toBe('Network error');
    });
  });

  describe('GetUserByIdUseCase', () => {
    it('should return single user by ID', async () => {
      vi.mocked(mockUserRepo.getUserById).mockResolvedValueOnce(Result.ok(mockUser));
      const useCase = new GetUserByIdUseCase(mockUserRepo);

      const result = await useCase.execute(1);

      expect(result.isOk()).toBe(true);
      expect(result.value.fullName).toBe('Jane Doe');
      expect(mockUserRepo.getUserById).toHaveBeenCalledWith(1);
    });
  });

  describe('GetRolesUseCase', () => {
    it('should return roles data on success', async () => {
      vi.mocked(mockRoleRepo.getRoles).mockResolvedValueOnce(Result.ok(mockRolesResult));
      const useCase = new GetRolesUseCase(mockRoleRepo);

      const result = await useCase.execute();

      expect(result.isOk()).toBe(true);
      expect(result.value.roles[0].name).toBe('Admin');
      expect(mockRoleRepo.getRoles).toHaveBeenCalled();
    });
  });

  describe('SaveRolePermissionsUseCase', () => {
    it('should save role permissions successfully', async () => {
      vi.mocked(mockRoleRepo.saveRolePermissions).mockResolvedValueOnce(Result.ok(true));
      const useCase = new SaveRolePermissionsUseCase(mockRoleRepo);

      const result = await useCase.execute(mockRole.id, mockRole.matrix);

      expect(result.isOk()).toBe(true);
      expect(result.value).toBe(true);
      expect(mockRoleRepo.saveRolePermissions).toHaveBeenCalledWith(mockRole.id, mockRole.matrix);
    });
  });
});
