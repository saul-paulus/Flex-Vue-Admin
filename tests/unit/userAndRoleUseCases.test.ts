import { describe, expect, it, vi, beforeEach } from 'vitest';
import { GetUsersUseCase } from '~/application/users/GetUsersUseCase';
import { GetUserByIdUseCase } from '~/application/users/GetUserByIdUseCase';
import { GetRolesUseCase } from '~/application/roles/GetRolesUseCase';
import { SaveRolePermissionsUseCase } from '~/application/roles/SaveRolePermissionsUseCase';
import { Result } from '~/domain/core/Result';
import type { UserRepository } from '~/domain/repositories/UserRepository';
import type { RoleRepository } from '~/domain/repositories/RoleRepository';
import type { UserItem, UserResponseData } from '~/domain/entities/User';
import type { RolesData, RoleItem } from '~/domain/entities/Role';

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

const mockUser: UserItem = {
  id: 1,
  uuid: 'u-1',
  employee_id: 'emp-1',
  full_name: 'Jane Doe',
  first_name: 'Jane',
  last_name: 'Doe',
  email: 'jane@example.com',
  phone: '12345',
  avatar: '',
  gender: 'female',
  role: 'Admin',
  department: 'IT',
  branch: 'Main',
  position: 'Lead',
  status: 'Active',
  joined_at: '2024-01-01',
  last_login: null,
  last_activity: '2024-01-02',
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
  role_color: 'primary',
  status_color: 'success',
  permissions: [],
  is_online: true,
  action: [],
};

const mockUserData: UserResponseData = {
  summary: { total_users: 1, active: 1, pending: 0, inactive: 0 },
  tabs: [{ key: 'all', label: 'All', count: 1 }],
  filters: { roles: [{ label: 'Admin', value: 'Admin' }] },
  sortable: ['id', 'name'],
  pagination: { page: 1, per_page: 10, total: 1, last_page: 1 },
  users: [mockUser],
};

const mockRolesData: RolesData = {
  roles: [
    {
      id: 1,
      name: 'Admin',
      users_count: 5,
      icon: 'shield',
      color: 'danger',
      description: 'Full access',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      matrix: {},
    },
  ],
  permission_groups: [],
};

describe('User & Role Use Cases', () => {
  let mockUserRepo: UserRepository;
  let mockRoleRepo: RoleRepository;

  beforeEach(() => {
    mockUserRepo = createMockUserRepository();
    mockRoleRepo = createMockRoleRepository();
  });

  describe('GetUsersUseCase', () => {
    it('should return user response data on success', async () => {
      vi.mocked(mockUserRepo.getUsers).mockResolvedValueOnce(Result.ok(mockUserData));
      const useCase = new GetUsersUseCase(mockUserRepo);

      const result = await useCase.execute();

      expect(result.isOk()).toBe(true);
      expect(result.value.users).toHaveLength(1);
      expect(mockUserRepo.getUsers).toHaveBeenCalled();
    });

    it('should return fail on error', async () => {
      vi.mocked(mockUserRepo.getUsers).mockResolvedValueOnce(Result.fail('Network error'));
      const useCase = new GetUsersUseCase(mockUserRepo);

      const result = await useCase.execute();

      expect(result.isFail()).toBe(true);
      expect(result.error).toBe('Network error');
    });
  });

  describe('GetUserByIdUseCase', () => {
    it('should return single user by ID', async () => {
      vi.mocked(mockUserRepo.getUserById).mockResolvedValueOnce(Result.ok(mockUser));
      const useCase = new GetUserByIdUseCase(mockUserRepo);

      const result = await useCase.execute(1);

      expect(result.isOk()).toBe(true);
      expect(result.value.full_name).toBe('Jane Doe');
      expect(mockUserRepo.getUserById).toHaveBeenCalledWith(1);
    });
  });

  describe('GetRolesUseCase', () => {
    it('should return roles data on success', async () => {
      vi.mocked(mockRoleRepo.getRoles).mockResolvedValueOnce(Result.ok(mockRolesData));
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

      const result = await useCase.execute(mockRolesData.roles[0]);

      expect(result.isOk()).toBe(true);
      expect(result.value).toBe(true);
      expect(mockRoleRepo.saveRolePermissions).toHaveBeenCalledWith(mockRolesData.roles[0]);
    });
  });
});
