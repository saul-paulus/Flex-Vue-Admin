import { ref, computed } from 'vue';
import { UsersService } from '../services/users.service';
import type { UserItem, UserSummary, TabItem, RoleFilterOption, UserPagination } from '../services/users.service';

const masterUsers = ref<UserItem[]>([]);
const summary = ref<UserSummary>({
  total_users: 0,
  active: 0,
  pending: 0,
  inactive: 0,
  growth: '+18 this month',
  engagement: '75% engagement',
  onboarding: 'Needs onboarding',
  follow_up: 'Follow up required',
});

const tabs = ref<TabItem[]>([
  { key: 'all', label: 'All', count: 0 },
  { key: 'active', label: 'Active', count: 0 },
  { key: 'pending', label: 'Pending', count: 0 },
  { key: 'inactive', label: 'Inactive', count: 0 },
]);

const roleFilters = ref<RoleFilterOption[]>([
  { label: 'All Roles', value: '' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Supervisor', value: 'Supervisor' },
  { label: 'User', value: 'User' },
]);

const searchQuery = ref('');
const activeTab = ref('all');
const selectedRole = ref('');
const sortField = ref('id');
const sortDirection = ref<'asc' | 'desc'>('asc');

const currentPage = ref(1);
const perPage = ref(10);
const isLoading = ref(false);
const isLoaded = ref(false);

export function useUsers() {
  /**
   * Fetches data from mock service
   */
  const getUsers = async () => {
    if (isLoaded.value && masterUsers.value.length > 0) {
      return masterUsers.value;
    }
    isLoading.value = true;
    try {
      const res = await UsersService.fetchUsers();
      if (res && res.success && res.data) {
        masterUsers.value = res.data.users || [];
        if (res.data.summary) {
          summary.value = { ...res.data.summary };
        }
        if (res.data.tabs) {
          tabs.value = [...res.data.tabs];
        }
        if (res.data.filters?.roles) {
          roleFilters.value = [...res.data.filters.roles];
        }
        if (res.data.pagination) {
          currentPage.value = res.data.pagination.page || 1;
          perPage.value = res.data.pagination.per_page || 10;
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
   * Get single user profile by ID, UUID, or employee_id
   */
  const getUserById = async (id: number | string): Promise<UserItem | undefined> => {
    if (!isLoaded.value || masterUsers.value.length === 0) {
      await getUsers();
    }
    const numId = Number(id);
    const found = masterUsers.value.find(
      (u) => u.id === numId || u.uuid === String(id) || u.employee_id === String(id)
    );
    return found || masterUsers.value[0];
  };

  /**
   * Get dynamic summary data
   */
  const getSummary = (): UserSummary => {
    const total = masterUsers.value.length;
    const activeCount = masterUsers.value.filter((u) => u.status === 'Active').length;
    const pendingCount = masterUsers.value.filter((u) => u.status === 'Pending').length;
    const inactiveCount = masterUsers.value.filter((u) => u.status === 'Inactive').length;

    return {
      total_users: total || summary.value.total_users,
      active: activeCount || summary.value.active,
      pending: pendingCount || summary.value.pending,
      inactive: inactiveCount || summary.value.inactive,
      growth: summary.value.growth,
      engagement: summary.value.engagement,
      onboarding: summary.value.onboarding,
      follow_up: summary.value.follow_up,
    };
  };

  /**
   * Search users by keyword query
   */
  const searchUsers = (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1;
  };

  /**
   * Filter users by tab key or role value
   */
  const filterUsers = (tabKey?: string, roleValue?: string) => {
    if (tabKey !== undefined) {
      activeTab.value = tabKey;
    }
    if (roleValue !== undefined) {
      selectedRole.value = roleValue;
    }
    currentPage.value = 1;
  };

  /**
   * Sort users by field and direction
   */
  const sortUsers = (field: string, direction?: 'asc' | 'desc') => {
    if (sortField.value === field && direction === undefined) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortField.value = field;
      if (direction) {
        sortDirection.value = direction;
      } else {
        sortDirection.value = 'asc';
      }
    }
  };

  /**
   * Filtered list of all matching users (before pagination)
   */
  const filteredUsers = computed(() => {
    let result = [...masterUsers.value];

    // Status / Tab filter
    if (activeTab.value && activeTab.value !== 'all') {
      const tabLower = activeTab.value.toLowerCase();
      result = result.filter((u) => u.status.toLowerCase() === tabLower);
    }

    // Role filter
    if (selectedRole.value) {
      const roleLower = selectedRole.value.toLowerCase();
      result = result.filter((u) => u.role.toLowerCase() === roleLower);
    }

    // Search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.trim().toLowerCase();
      result = result.filter(
        (u) =>
          u.full_name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q) ||
          u.department.toLowerCase().includes(q) ||
          u.branch.toLowerCase().includes(q) ||
          u.position.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortField.value) {
      const field = sortField.value;
      const order = sortDirection.value === 'asc' ? 1 : -1;

      result.sort((a, b) => {
        let valA: unknown = (a as Record<string, unknown>)[field];
        let valB: unknown = (b as Record<string, unknown>)[field];

        if (field === 'name') {
          valA = a.full_name;
          valB = b.full_name;
        } else if (field === 'joined') {
          valA = a.joined_at;
          valB = b.joined_at;
        } else if (field === 'lastActive') {
          valA = a.last_activity;
          valB = b.last_activity;
        }

        if (typeof valA === 'string' && typeof valB === 'string') {
          return valA.localeCompare(valB) * order;
        }
        if (valA < valB) return -1 * order;
        if (valA > valB) return 1 * order;
        return 0;
      });
    }

    return result;
  });

  /**
   * Pagination computation
   */
  const pagination = computed<UserPagination>(() => {
    const total = filteredUsers.value.length;
    const lastPage = Math.max(1, Math.ceil(total / perPage.value));
    return {
      page: currentPage.value,
      per_page: perPage.value,
      total,
      last_page: lastPage,
    };
  });

  /**
   * Paginated slice of filtered users
   */
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredUsers.value.slice(start, end);
  });

  /**
   * Dynamic tabs with updated counts
   */
  const dynamicTabs = computed(() => {
    const total = masterUsers.value.length;
    const activeCount = masterUsers.value.filter((u) => u.status === 'Active').length;
    const pendingCount = masterUsers.value.filter((u) => u.status === 'Pending').length;
    const inactiveCount = masterUsers.value.filter((u) => u.status === 'Inactive').length;

    return [
      { key: 'all', label: 'All', count: total },
      { key: 'active', label: 'Active', count: activeCount },
      { key: 'pending', label: 'Pending', count: pendingCount },
      { key: 'inactive', label: 'Inactive', count: inactiveCount },
    ];
  });

  /**
   * Set active page number
   */
  const setPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.last_page) {
      currentPage.value = page;
    }
  };

  return {
    // State
    rawUsers: masterUsers,
    users: paginatedUsers,
    filteredUsers,
    summary,
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

    // Methods
    getUsers,
    getUserById,
    getSummary,
    searchUsers,
    filterUsers,
    sortUsers,
    setPage,
  };
}
