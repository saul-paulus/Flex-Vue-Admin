<script setup lang="ts">
import { ref } from 'vue';

const users = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    role: 'Admin',
    status: 'Active',
    lastActive: 'Just now',
    joined: 'Jan 15, 2024',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    role: 'Manager',
    status: 'Active',
    lastActive: '5 mins ago',
    joined: 'Feb 12, 2024',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    role: 'User',
    status: 'Active',
    lastActive: '2 hours ago',
    joined: 'Mar 12, 2024',
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'd.kim@example.com',
    avatar: 'https://i.pravatar.cc/150?u=david',
    role: 'User',
    status: 'Inactive',
    lastActive: '5 days ago',
    joined: 'Jun 25, 2024',
  },
  {
    id: 5,
    name: 'Jessica Taylor',
    email: 'j.taylor@example.com',
    avatar: 'https://i.pravatar.cc/150?u=jessica',
    role: 'Manager',
    status: 'Active',
    lastActive: '1 hour ago',
    joined: 'Oct 5, 2023',
  },
  {
    id: 6,
    name: 'Robert Martinez',
    email: 'r.martinez@example.com',
    avatar: 'https://i.pravatar.cc/150?u=robert',
    role: 'User',
    status: 'Active',
    lastActive: '30 mins ago',
    joined: 'Apr 19, 2024',
  },
  {
    id: 7,
    name: 'Amanda Wilson',
    email: 'a.wilson@example.com',
    avatar: 'https://i.pravatar.cc/150?u=amanda',
    role: 'User',
    status: 'Pending',
    lastActive: 'Never',
    joined: 'May 2, 2024',
  },
  {
    id: 8,
    name: 'Chris Thompson',
    email: 'c.thompson@example.com',
    avatar: 'https://i.pravatar.cc/150?u=chris',
    role: 'Admin',
    status: 'Active',
    lastActive: '15 mins ago',
    joined: 'Nov 30, 2023',
  },
]);

const getRoleBadgeClasses = (role: string) => {
  if (role === 'Admin') return 'bg-danger-subtle text-danger';
  if (role === 'Manager') return 'bg-warning-subtle text-warning';
  return 'bg-primary-subtle text-primary';
};

const getStatusIconClass = (status: string) => {
  if (status === 'Active') return 'text-success';
  if (status === 'Pending') return 'text-warning';
  return 'text-secondary';
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
            <h3 class="fw-bolder mb-1 text-primary">248</h3>
            <span class="small text-secondary">+18 this month</span>
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
            <h3 class="fw-bolder mb-1 text-primary">186</h3>
            <span class="small text-secondary">75% engagement</span>
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
            <h3 class="fw-bolder mb-1 text-primary">24</h3>
            <span class="small text-secondary">Needs onboarding</span>
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
            <h3 class="fw-bolder mb-1 text-primary">38</h3>
            <span class="small text-secondary">Follow up required</span>
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
            <li class="nav-item">
              <a class="nav-link active py-2 fw-medium px-3 d-flex align-items-center gap-1 fs-sm" href="#">
                All
                <span class="badge bg-secondary-subtle text-secondary rounded-pill ms-1 fs-xs">248</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link py-2 text-muted fw-medium px-3 text-hover-dark d-flex align-items-center gap-1 fs-sm"
                href="#"
              >
                Active
                <span class="badge bg-secondary-subtle text-secondary rounded-pill ms-1 fs-xs">186</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link py-2 text-muted fw-medium px-3 text-hover-dark d-flex align-items-center gap-1 fs-sm"
                href="#"
              >
                Pending
                <span class="badge bg-secondary-subtle text-secondary rounded-pill ms-1 fs-xs">24</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link py-2 text-muted fw-medium px-3 text-hover-dark d-flex align-items-center gap-1 fs-sm"
                href="#"
              >
                Inactive
                <span class="badge bg-secondary-subtle text-secondary rounded-pill ms-1 fs-xs">38</span>
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
              />
            </div>

            <button
              class="btn btn-sm btn-white border bg-elevated text-primary d-flex align-items-center shadow-sm gap-2 px-3"
            >
              <i class="bi bi-funnel text-muted" /> Role
            </button>
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
              <th scope="col" class="py-3 border-0 fw-bold" style="background-color: var(--zebra)">USER</th>
              <th scope="col" class="py-3 border-0 fw-bold" style="background-color: var(--zebra)">ROLE</th>
              <th scope="col" class="py-3 border-0 fw-bold" style="background-color: var(--zebra)">STATUS</th>
              <th scope="col" class="py-3 border-0 fw-bold" style="background-color: var(--zebra)">LAST ACTIVE</th>
              <th scope="col" class="py-3 border-0 fw-bold" style="background-color: var(--zebra)">JOINED</th>
              <th scope="col" class="py-3 pe-4 border-0 fw-bold text-end" style="background-color: var(--zebra)">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody class="border-top-0">
            <tr v-for="user in users" :key="user.id">
              <td class="ps-4 py-3">
                <input class="form-check-input" type="checkbox" value="" />
              </td>
              <td class="py-3">
                <div class="d-flex align-items-center gap-3">
                  <img :src="user.avatar" class="rounded-circle shadow-sm" width="40" height="40" alt="Avatar" />
                  <div>
                    <div class="fw-bolder" style="font-size: 0.9rem; color: var(--title-color)">
                      {{ user.name }}
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
                {{ user.lastActive }}
              </td>
              <td class="py-3" style="font-size: 0.85rem; color: var(--secondary-color-text)">
                {{ user.joined }}
              </td>
              <td class="text-end pe-4 py-3">
                <div class="d-flex align-items-center justify-content-end gap-2 text-muted">
                  <button class="btn btn-sm btn-link text-muted p-1 border-0 text-hover-primary">
                    <i class="bi bi-eye" />
                  </button>
                  <button class="btn btn-sm btn-link text-muted p-1 border-0 text-hover-primary">
                    <i class="bi bi-pencil" />
                  </button>
                  <button class="btn btn-sm btn-link text-muted p-1 border-0 text-hover-primary">
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
        <div class="fs-70" style="color: var(--secondary-color-text)">Showing 1-8 of 248 users</div>
        <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm mb-0 gap-1">
            <li class="page-item disabled">
              <a class="page-link border-0 text-muted bg-transparent" href="#" tabindex="-1" aria-disabled="true"
                ><i class="bi bi-chevron-left"
              /></a>
            </li>
            <li class="page-item active" aria-current="page">
              <a
                class="page-link border-0 rounded text-white shadow-sm"
                style="background-color: var(--accent)"
                href="#"
                >1</a
              >
            </li>
            <li class="page-item">
              <a class="page-link border-0 rounded text-muted text-hover-dark bg-transparent" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link border-0 rounded text-muted text-hover-dark bg-transparent" href="#">3</a>
            </li>
            <li class="page-item">
              <span class="page-link border-0 rounded text-muted bg-transparent px-1">...</span>
            </li>
            <li class="page-item">
              <a class="page-link border-0 rounded text-muted text-hover-dark bg-transparent" href="#">31</a>
            </li>
            <li class="page-item">
              <a class="page-link border-0 text-muted bg-transparent" href="#"><i class="bi bi-chevron-right" /></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
