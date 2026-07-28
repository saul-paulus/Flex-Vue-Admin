<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useUsers } from '~/composables/useUsers';

const {
  users,
  tabs,
  roleFilters,
  searchQuery,
  activeTab,
  selectedRole,
  sortField,
  sortDirection,
  pagination,
  summary,
  isLoading,
  getUsers,
  searchUsers,
  filterUsers,
  sortUsers,
  setPage,
} = useUsers();

onMounted(async () => {
  await getUsers();
});

const getRoleBadgeClasses = (role: string) => {
  if (role === 'Admin') return 'bg-danger-subtle text-danger';
  if (role === 'Manager') return 'bg-warning-subtle text-warning';
  if (role === 'Supervisor') return 'bg-info-subtle text-info';
  return 'bg-primary-subtle text-primary';
};

const getStatusIconClass = (status: string) => {
  if (status === 'Active') return 'text-success';
  if (status === 'Pending') return 'text-warning';
  return 'text-secondary';
};

// Compute visible pagination items (pages array with ellipsis)
const visiblePages = computed(() => {
  const current = pagination.value.currentPage;
  const last = pagination.value.lastPage;
  const delta = 1;
  const range: (number | string)[] = [];

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    } else if (range[range.length - 1] !== '...') {
      range.push('...');
    }
  }
  return range;
});

const showRoleDropdown = ref(false);
const toggleRoleDropdown = () => {
  showRoleDropdown.value = !showRoleDropdown.value;
};

const selectRoleFilter = (roleValue: string) => {
  filterUsers(undefined, roleValue);
  showRoleDropdown.value = false;
};
</script>

<template>
  <div class="container-fluid py-2">
    <!-- Header Page -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h4 class="mb-1 fw-bold text-primary">People Directory</h4>
        <p class="mb-0 small text-secondary">Centralized user operations, access status, and lifecycle management.</p>
      </div>
      <div class="d-flex gap-2">
        <button
          class="btn btn-white border bg-elevated shadow-sm fw-medium px-3 d-flex align-items-center gap-2 text-primary"
        >
          <i class="bi bi-box-arrow-down text-muted" /> Export
        </button>
        <button class="btn btn-primary shadow-sm fw-medium px-3 d-flex align-items-center gap-2">
          <i class="bi bi-plus-lg" /> Add User
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <!-- Total Users -->
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card shadow-sm h-100 rounded-md">
          <div class="card-body p-3 p-md-4 position-relative">
            <div class="small mb-1 text-uppercase fw-bold letter-spacing-1 text-tertiary" style="font-size: 0.7rem">
              TOTAL USERS
            </div>
            <h3 class="fw-bolder mb-1 text-primary">{{ summary.totalUsers }}</h3>
            <span class="small text-secondary">{{ summary.growth || '+18 this month' }}</span>
            <div class="position-absolute top-0 end-0 p-3 pt-4">
              <div
                class="bg-primary-subtle text-primary rounded d-flex align-items-center justify-content-center"
                style="width: 36px; height: 36px"
              >
                <i class="bi bi-people-fill fs-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active -->
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card shadow-sm h-100 rounded-md">
          <div class="card-body p-3 p-md-4 position-relative">
            <div class="small mb-1 text-uppercase fw-bold letter-spacing-1 text-tertiary" style="font-size: 0.7rem">
              ACTIVE
            </div>
            <h3 class="fw-bolder mb-1 text-primary">{{ summary.active }}</h3>
            <span class="small text-secondary">{{ summary.engagement || '75% engagement' }}</span>
            <div class="position-absolute top-0 end-0 p-3 pt-4">
              <div
                class="bg-success-subtle text-success rounded d-flex align-items-center justify-content-center"
                style="width: 36px; height: 36px"
              >
                <i class="bi bi-person-check-fill fs-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pending -->
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card shadow-sm h-100 rounded-md">
          <div class="card-body p-3 p-md-4 position-relative">
            <div class="small mb-1 text-uppercase fw-bold letter-spacing-1 text-tertiary" style="font-size: 0.7rem">
              PENDING
            </div>
            <h3 class="fw-bolder mb-1 text-primary">{{ summary.pending }}</h3>
            <span class="small text-secondary">{{ summary.onboarding || 'Needs onboarding' }}</span>
            <div class="position-absolute top-0 end-0 p-3 pt-4">
              <div
                class="bg-warning-subtle text-warning rounded d-flex align-items-center justify-content-center"
                style="width: 36px; height: 36px"
              >
                <i class="bi bi-hourglass-split fs-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Inactive -->
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card shadow-sm h-100 rounded-md">
          <div class="card-body p-3 p-md-4 position-relative">
            <div class="small mb-1 text-uppercase fw-bold letter-spacing-1 text-tertiary" style="font-size: 0.7rem">
              INACTIVE
            </div>
            <h3 class="fw-bolder mb-1 text-primary">{{ summary.inactive }}</h3>
            <span class="small text-secondary">{{ summary.followUp || 'Follow up required' }}</span>
            <div class="position-absolute top-0 end-0 p-3 pt-4">
              <div
                class="bg-danger-subtle text-danger rounded d-flex align-items-center justify-content-center"
                style="width: 36px; height: 36px"
              >
                <i class="bi bi-person-x-fill fs-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Table Card -->
    <div class="card shadow-sm rounded-md">
      <div class="card-header border-bottom p-3">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <!-- Tabs/Pills -->
          <ul class="nav nav-pills custom-pills mb-0" style="gap: 5px">
            <li v-for="tab in tabs" :key="tab.key" class="nav-item">
              <a
                class="nav-link py-2 fw-medium px-3 d-flex align-items-center gap-1 fs-sm"
                :class="{
                  active: activeTab === tab.key,
                  'text-muted text-hover-dark': activeTab !== tab.key,
                }"
                href="#"
                @click.prevent="filterUsers(tab.key, undefined)"
              >
                {{ tab.label }}
                <span class="badge bg-secondary-subtle text-secondary rounded-pill ms-1 fs-xs">{{ tab.count }}</span>
              </a>
            </li>
          </ul>

          <!-- Filter & Search -->
          <div class="d-flex align-items-center gap-2">
            <div class="input-group input-group-sm border rounded bg-elevated shadow-sm" style="width: 250px">
              <span class="input-group-text bg-elevated border-0 text-muted"><i class="bi bi-search" /></span>
              <input
                type="text"
                class="form-control border-0 shadow-none ps-0 bg-transparent text-primary"
                placeholder="Search users, email, role..."
                :value="searchQuery"
                @input="searchUsers(($event.target as HTMLInputElement).value)"
              />
            </div>

            <!-- Role Filter Dropdown -->
            <div class="position-relative">
              <button
                class="btn btn-sm btn-white border bg-elevated text-primary d-flex align-items-center shadow-sm gap-2 px-3"
                type="button"
                @click="toggleRoleDropdown"
              >
                <i class="bi bi-funnel text-muted" />
                <span>{{ selectedRole || 'Role' }}</span>
                <i class="bi bi-chevron-down text-muted fs-xs" />
              </button>

              <div
                v-if="showRoleDropdown"
                class="dropdown-menu dropdown-menu-end show shadow-sm border mt-1"
                style="position: absolute; right: 0; top: 100%; z-index: 1050; min-width: 140px"
              >
                <button
                  v-for="rf in roleFilters"
                  :key="rf.value"
                  class="dropdown-item btn-sm d-flex align-items-center justify-content-between py-2"
                  :class="{ active: selectedRole === rf.value }"
                  type="button"
                  @click="selectRoleFilter(rf.value)"
                >
                  <span>{{ rf.label }}</span>
                  <i v-if="selectedRole === rf.value" class="bi bi-check2 ms-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Area -->
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0 text-nowrap">
          <thead class="bg-light text-muted" style="font-size: 0.75rem; letter-spacing: 0.5px">
            <tr>
              <th scope="col" class="py-3 ps-4 border-0 fw-bold" style="width: 40px; background-color: var(--zebra)">
                <input class="form-check-input" type="checkbox" value="" />
              </th>
              <th
                scope="col"
                class="py-3 border-0 fw-bold cursor-pointer user-select-none"
                style="background-color: var(--zebra)"
                @click="sortUsers('name')"
              >
                USER
                <i
                  class="bi ms-1"
                  :class="{
                    'bi-arrow-up': sortField === 'name' && sortDirection === 'asc',
                    'bi-arrow-down': sortField === 'name' && sortDirection === 'desc',
                    'bi-arrow-down-up opacity-50': sortField !== 'name',
                  }"
                />
              </th>
              <th
                scope="col"
                class="py-3 border-0 fw-bold cursor-pointer user-select-none"
                style="background-color: var(--zebra)"
                @click="sortUsers('role')"
              >
                ROLE
                <i
                  class="bi ms-1"
                  :class="{
                    'bi-arrow-up': sortField === 'role' && sortDirection === 'asc',
                    'bi-arrow-down': sortField === 'role' && sortDirection === 'desc',
                    'bi-arrow-down-up opacity-50': sortField !== 'role',
                  }"
                />
              </th>
              <th
                scope="col"
                class="py-3 border-0 fw-bold cursor-pointer user-select-none"
                style="background-color: var(--zebra)"
                @click="sortUsers('status')"
              >
                STATUS
                <i
                  class="bi ms-1"
                  :class="{
                    'bi-arrow-up': sortField === 'status' && sortDirection === 'asc',
                    'bi-arrow-down': sortField === 'status' && sortDirection === 'desc',
                    'bi-arrow-down-up opacity-50': sortField !== 'status',
                  }"
                />
              </th>
              <th
                scope="col"
                class="py-3 border-0 fw-bold cursor-pointer user-select-none"
                style="background-color: var(--zebra)"
                @click="sortUsers('lastActive')"
              >
                LAST ACTIVE
                <i
                  class="bi ms-1"
                  :class="{
                    'bi-arrow-up': sortField === 'lastActive' && sortDirection === 'asc',
                    'bi-arrow-down': sortField === 'lastActive' && sortDirection === 'desc',
                    'bi-arrow-down-up opacity-50': sortField !== 'lastActive',
                  }"
                />
              </th>
              <th
                scope="col"
                class="py-3 border-0 fw-bold cursor-pointer user-select-none"
                style="background-color: var(--zebra)"
                @click="sortUsers('joined')"
              >
                JOINED
                <i
                  class="bi ms-1"
                  :class="{
                    'bi-arrow-up': sortField === 'joined' && sortDirection === 'asc',
                    'bi-arrow-down': sortField === 'joined' && sortDirection === 'desc',
                    'bi-arrow-down-up opacity-50': sortField !== 'joined',
                  }"
                />
              </th>
              <th scope="col" class="py-3 pe-4 border-0 fw-bold text-end" style="background-color: var(--zebra)">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody class="border-top-0">
            <tr v-if="isLoading">
              <td colspan="7" class="text-center py-4 text-muted">
                <div class="spinner-border spinner-border-sm me-2 text-primary" role="status" />
                Loading users...
              </td>
            </tr>
            <tr v-else-if="users.length === 0">
              <td colspan="7" class="text-center py-4 text-muted">No users found matching current filters.</td>
            </tr>
            <tr v-for="user in users" :key="user.id">
              <td class="ps-4 py-3">
                <input class="form-check-input" type="checkbox" value="" />
              </td>
              <td class="py-3">
                <div class="d-flex align-items-center gap-3">
                  <img :src="user.avatar" class="rounded-circle shadow-sm" width="40" height="40" alt="Avatar" />
                  <div>
                    <div class="fw-bolder" style="font-size: 0.9rem; color: var(--title-color)">
                      {{ user.fullName }}
                    </div>
                    <div style="font-size: 0.8rem; color: var(--secondary-color-text)">
                      {{ user.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="py-3">
                <span
                  class="badge rounded-pill fw-medium px-2 py-1 px-3 d-inline-flex align-items-center gap-1"
                  :class="getRoleBadgeClasses(user.role)"
                  style="font-size: 0.75rem"
                >
                  <i v-if="user.role === 'Admin'" class="bi bi-person-badge-fill" />
                  <i v-else-if="user.role === 'Manager'" class="bi bi-person-workspace" />
                  <i v-else-if="user.role === 'Supervisor'" class="bi bi-shield-lock-fill" />
                  <i v-else class="bi bi-person-fill" />
                  {{ user.role }}
                </span>
              </td>
              <td class="py-3">
                <div
                  class="d-flex align-items-center gap-2 fw-medium"
                  style="font-size: 0.85rem; color: var(--title-color)"
                >
                  <i class="bi bi-circle-fill" style="font-size: 8px" :class="getStatusIconClass(user.status)" />
                  {{ user.status }}
                </div>
              </td>
              <td class="py-3" style="font-size: 0.85rem; color: var(--secondary-color-text)">
                {{ user.lastActivity }}
              </td>
              <td class="py-3" style="font-size: 0.85rem; color: var(--secondary-color-text)">
                {{ user.joinedAt }}
              </td>
              <td class="text-end pe-4 py-3">
                <div class="d-flex align-items-center justify-content-end gap-2 text-muted">
                  <NuxtLink
                    :to="`/users/view?id=${user.id}`"
                    class="btn btn-sm btn-link text-muted p-1 border-0 text-hover-primary"
                    title="View Detail"
                  >
                    <i class="bi bi-eye" />
                  </NuxtLink>
                  <button class="btn btn-sm btn-link text-muted p-1 border-0 text-hover-primary" title="Edit User">
                    <i class="bi bi-pencil" />
                  </button>
                  <button class="btn btn-sm btn-link text-muted p-1 border-0 text-hover-primary" title="More Actions">
                    <i class="bi bi-three-dots" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer Pagination -->
      <div
        class="card-footer bg-white border-top p-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3"
        style="border-bottom-left-radius: var(--apple-radius); border-bottom-right-radius: var(--apple-radius)"
      >
        <div class="fs-70" style="color: var(--secondary-color-text)">
          Showing
          {{ pagination.total > 0 ? (pagination.currentPage - 1) * pagination.perPage + 1 : 0 }}-{{
            Math.min(pagination.currentPage * pagination.perPage, pagination.total)
          }}
          of {{ pagination.total }} users
        </div>
        <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm mb-0 gap-1">
            <li class="page-item" :class="{ disabled: pagination.currentPage <= 1 }">
              <a
                class="page-link border-0 text-muted bg-transparent"
                href="#"
                @click.prevent="setPage(pagination.currentPage - 1)"
              >
                <i class="bi bi-chevron-left" />
              </a>
            </li>

            <template v-for="(p, index) in visiblePages" :key="index">
              <li v-if="p === '...'" class="page-item">
                <span class="page-link border-0 rounded text-muted bg-transparent px-1">...</span>
              </li>
              <li v-else class="page-item" :class="{ active: p === pagination.currentPage }">
                <a
                  class="page-link border-0 rounded text-hover-dark"
                  :class="p === pagination.currentPage ? 'text-white shadow-sm' : 'text-muted bg-transparent'"
                  :style="p === pagination.currentPage ? { backgroundColor: 'var(--accent)' } : {}"
                  href="#"
                  @click.prevent="setPage(Number(p))"
                >
                  {{ p }}
                </a>
              </li>
            </template>

            <li class="page-item" :class="{ disabled: pagination.currentPage >= pagination.lastPage }">
              <a
                class="page-link border-0 text-muted bg-transparent"
                href="#"
                @click.prevent="setPage(pagination.currentPage + 1)"
              >
                <i class="bi bi-chevron-right" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.custom-pills .nav-link {
  border-radius: var(--radius-md) !important;
}
.custom-pills .nav-link.active {
  background-color: var(--muted-bg) !important;
  color: var(--title-color) !important;
  font-weight: 600 !important;
}
.text-hover-dark:hover {
  color: var(--title-color) !important;
}
.text-hover-primary:hover {
  color: var(--accent) !important;
}

/* Apple Specific */
.card {
  transition: box-shadow 0.2s ease;
}
.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06) !important;
}
.table-hover tbody tr:hover {
  background-color: var(--row-hover) !important;
}
</style>
