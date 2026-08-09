/**
 * useUsers Composable — UI state management for user lists.
 *
 * Handles ONLY:
 * - UI state (search, filter, sort, pagination)
 * - Reactive data binding
 * - Delegating data fetching to use cases
 *
 * Does NOT handle:
 * - Business logic (that's in use cases)
 * - API calls (that's in repositories)
 */
import { computed } from 'vue';
import type { UserModel, UserSummaryModel, FilterOption, TabItem } from '@domain/users/models/UserModel';
import type { PaginationMeta } from '@domain/shared/types/PaginationModel';

export function useUsers() {
  const masterUsers = useState<UserModel[]>('users:master', () => []);
  const summary = useState<UserSummaryModel>('users:summary', () => ({
    totalUsers: 0,
    active: 0,
    pending: 0,
    inactive: 0,
  }));

  const tabs = useState<TabItem[]>('users:tabs', () => []);
  const roleFilters = useState<FilterOption[]>('users:roleFilters', () => []);

  const searchQuery = useState('users:searchQuery', () => '');
  const activeTab = useState('users:activeTab', () => 'all');
  const selectedRole = useState('users:selectedRole', () => '');
  const sortField = useState('users:sortField', () => 'id');
  const sortDirection = useState<'asc' | 'desc'>('users:sortDirection', () => 'asc');

  const currentPage = useState('users:currentPage', () => 1);
  const perPage = useState('users:perPage', () => 10);
  const isLoading = useState('users:isLoading', () => false);
  const isLoaded = useState('users:isLoaded', () => false);

  /**
   * Fetch users via GetUsersUseCase.
   */
  const getUsers = async () => {
    if (isLoaded.value && masterUsers.value.length > 0) {
      return masterUsers.value;
    }
    isLoading.value = true;
    try {
      const nuxtApp = useNuxtApp();
      const res = await nuxtApp.$getUsersUseCase.execute();
      if (res.isOk() && res.value) {
        masterUsers.value = [...res.value.users];
        summary.value = { ...res.value.summary };
        if (res.value.tabs.length > 0) {
          tabs.value = [...res.value.tabs];
        }
        if (res.value.filters.roles.length > 0) {
          roleFilters.value = [...res.value.filters.roles];
        }
        if (res.value.pagination) {
          currentPage.value = res.value.pagination.currentPage;
          perPage.value = res.value.pagination.perPage;
        }
        isLoaded.value = true;
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      isLoading.value = false;
    }
    return masterUsers.value;
  };

  /**
   * Fetch single user by ID.
   */
  const getUserById = async (id: number | string): Promise<UserModel | undefined> => {
    const nuxtApp = useNuxtApp();
    const res = await nuxtApp.$getUserByIdUseCase.execute(id);
    if (res.isOk()) {
      return res.value;
    }
    if (!isLoaded.value || masterUsers.value.length === 0) {
      await getUsers();
    }
    const numId = Number(id);
    return (
      masterUsers.value.find((u) => u.id === numId || u.uuid === String(id) || u.employeeId === String(id)) ||
      masterUsers.value[0]
    );
  };

  /**
   * Compute summary from loaded data.
   */
  const currentSummary = computed<UserSummaryModel>(() => {
    const total = masterUsers.value.length;
    if (total === 0) return summary.value;

    return {
      totalUsers: total || summary.value.totalUsers,
      active: masterUsers.value.filter((u) => u.status.toLowerCase() === 'active').length || summary.value.active,
      pending: masterUsers.value.filter((u) => u.status.toLowerCase() === 'pending').length || summary.value.pending,
      inactive: masterUsers.value.filter((u) => u.status.toLowerCase() === 'inactive').length || summary.value.inactive,
      growth: summary.value.growth,
      engagement: summary.value.engagement,
      onboarding: summary.value.onboarding,
      followUp: summary.value.followUp,
    };
  });

  // ── UI State Handlers ──

  const searchUsers = (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1;
  };

  const filterUsers = (tabKey?: string, roleValue?: string) => {
    if (tabKey !== undefined) activeTab.value = tabKey;
    if (roleValue !== undefined) selectedRole.value = roleValue;
    currentPage.value = 1;
  };

  const sortUsers = (field: string, direction?: 'asc' | 'desc') => {
    if (sortField.value === field && direction === undefined) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortField.value = field;
      sortDirection.value = direction || 'asc';
    }
  };

  /**
   * Filtered + sorted list (client-side).
   */
  const filteredUsers = computed(() => {
    let result = [...masterUsers.value];

    if (activeTab.value && activeTab.value !== 'all') {
      result = result.filter((u) => u.status.toLowerCase() === activeTab.value.toLowerCase());
    }

    if (selectedRole.value) {
      result = result.filter((u) => u.role.toLowerCase() === selectedRole.value.toLowerCase());
    }

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.trim().toLowerCase();
      result = result.filter(
        (u) =>
          u.fullName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q) ||
          u.department.toLowerCase().includes(q)
      );
    }

    if (sortField.value) {
      const field = sortField.value;
      const order = sortDirection.value === 'asc' ? 1 : -1;
      result.sort((a, b) => {
        let valA: unknown = (a as Record<string, unknown>)[field];
        let valB: unknown = (b as Record<string, unknown>)[field];

        // Field name aliases for camelCase domain model
        if (field === 'name') {
          valA = a.fullName;
          valB = b.fullName;
        }
        if (field === 'joined') {
          valA = a.joinedAt;
          valB = b.joinedAt;
        }
        if (field === 'lastActive') {
          valA = a.lastActivity;
          valB = b.lastActivity;
        }

        if (typeof valA === 'string' && typeof valB === 'string') {
          return valA.localeCompare(valB) * order;
        }
        if (valA! < valB!) return -1 * order;
        if (valA! > valB!) return 1 * order;
        return 0;
      });
    }

    return result;
  });

  const pagination = computed<PaginationMeta>(() => {
    const total = filteredUsers.value.length;
    const lastPage = Math.max(1, Math.ceil(total / perPage.value));
    return {
      currentPage: currentPage.value,
      perPage: perPage.value,
      total,
      lastPage,
    };
  });

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    return filteredUsers.value.slice(start, start + perPage.value);
  });

  const dynamicTabs = computed<TabItem[]>(() => {
    const total = masterUsers.value.length;
    return [
      { key: 'all', label: 'All', count: total },
      {
        key: 'active',
        label: 'Active',
        count: masterUsers.value.filter((u) => u.status.toLowerCase() === 'active').length,
      },
      {
        key: 'pending',
        label: 'Pending',
        count: masterUsers.value.filter((u) => u.status.toLowerCase() === 'pending').length,
      },
      {
        key: 'inactive',
        label: 'Inactive',
        count: masterUsers.value.filter((u) => u.status.toLowerCase() === 'inactive').length,
      },
    ];
  });

  const setPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.lastPage) {
      currentPage.value = page;
    }
  };

  return {
    rawUsers: masterUsers,
    users: paginatedUsers,
    filteredUsers,
    summary: currentSummary,
    tabs: dynamicTabs,
    roleFilters,
    searchQuery,
    activeTab,
    selectedRole,
    sortField,
    sortDirection,
    currentPage,
    perPage,
    pagination,
    isLoading,
    getUsers,
    getUserById,
    searchUsers,
    filterUsers,
    sortUsers,
    setPage,
  };
}
