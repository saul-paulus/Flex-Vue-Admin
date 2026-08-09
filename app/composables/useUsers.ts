/**
 * useUsers Composable — UI state management for user lists using static data.
 */
import { computed } from 'vue';
import type { UserModel, UserSummaryModel, FilterOption, TabItem } from '@domain/users/entities/User';
import type { PaginationMeta } from '@domain/shared/types/PaginationModel';
import { STATIC_USERS, STATIC_USER_SUMMARY, STATIC_USER_FILTERS } from '~/data/staticUsers';

export function useUsers() {
  const masterUsers = useState<UserModel[]>('users:master', () => [...STATIC_USERS]);
  const summary = useState<UserSummaryModel>('users:summary', () => ({ ...STATIC_USER_SUMMARY }));
  const roleFilters = useState<FilterOption[]>('users:roleFilters', () => [...STATIC_USER_FILTERS.roles]);

  const searchQuery = useState('users:searchQuery', () => '');
  const activeTab = useState('users:activeTab', () => 'all');
  const selectedRole = useState('users:selectedRole', () => '');
  const sortField = useState('users:sortField', () => 'id');
  const sortDirection = useState<'asc' | 'desc'>('users:sortDirection', () => 'asc');

  const currentPage = useState('users:currentPage', () => 1);
  const perPage = useState('users:perPage', () => 10);
  const isLoading = useState('users:isLoading', () => false);

  const getUsers = async () => {
    return masterUsers.value;
  };

  const getUserById = async (id: number | string): Promise<UserModel | undefined> => {
    const numId = Number(id);
    return (
      masterUsers.value.find((u) => u.id === numId || u.uuid === String(id) || u.employeeId === String(id)) ||
      masterUsers.value[0]
    );
  };

  const currentSummary = computed<UserSummaryModel>(() => {
    const total = masterUsers.value.length;
    return {
      totalUsers: total || summary.value.totalUsers,
      active: masterUsers.value.filter((u) => u.status.toLowerCase() === 'active').length,
      pending: masterUsers.value.filter((u) => u.status.toLowerCase() === 'pending').length,
      inactive: masterUsers.value.filter((u) => u.status.toLowerCase() === 'inactive').length,
      growth: summary.value.growth,
      engagement: summary.value.engagement,
      onboarding: summary.value.onboarding,
      followUp: summary.value.followUp,
    };
  });

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
