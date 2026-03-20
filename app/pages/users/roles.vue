<script setup lang="ts">
import { ref } from 'vue';

interface Role {
  id: number;
  name: string;
  users: number;
  icon: string;
  color: string;
  desc: string;
  created: string;
  modified: string;
}

interface PermissionItem {
  name: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  all: boolean;
  v_dash?: boolean;
  c_dash?: boolean;
  e_dash?: boolean;
  d_dash?: boolean;
  a_dash?: boolean;
}

interface PermissionGroup {
  category: string;
  icon: string;
  items: PermissionItem[];
}

const roles = ref<Role[]>([
  {
    id: 1,
    name: 'Administrator',
    users: 8,
    icon: 'shield-lock-fill',
    color: 'danger',
    desc: 'Full system access with all permissions enabled. Can manage users, roles, and system settings.',
    created: 'January 1, 2024',
    modified: 'May 15, 2024',
  },
  {
    id: 2,
    name: 'Manager',
    users: 15,
    icon: 'person-badge-fill',
    color: 'warning',
    desc: 'Can manage most system settings and users, but cannot alter roles.',
    created: 'February 10, 2024',
    modified: 'May 10, 2024',
  },
  {
    id: 3,
    name: 'Editor',
    users: 32,
    icon: 'pencil-square',
    color: 'primary',
    desc: 'Can edit content and manage basic settings.',
    created: 'March 5, 2024',
    modified: 'April 20, 2024',
  },
  {
    id: 4,
    name: 'User',
    users: 156,
    icon: 'person-fill',
    color: 'info',
    desc: 'Standard user access. Can view and interact with content.',
    created: 'January 15, 2024',
    modified: 'May 1, 2024',
  },
  {
    id: 5,
    name: 'Viewer',
    users: 45,
    icon: 'eye-fill',
    color: 'secondary',
    desc: 'Read-only access to the system.',
    created: 'April 1, 2024',
    modified: 'April 1, 2024',
  },
]);

const activeRole = ref<Role>(roles.value[0] as Role);

const permissions = ref<PermissionGroup[]>([
  {
    category: 'Dashboard',
    icon: 'grid-1x2',
    items: [
      {
        name: 'Analytics Dashboard',
        view: true,
        create: false,
        edit: false,
        delete: false,
        all: true,
        v_dash: false,
        c_dash: true,
        e_dash: true,
        d_dash: true,
        a_dash: false,
      },
      {
        name: 'Reports',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
    ],
  },
  {
    category: 'User Management',
    icon: 'people',
    items: [
      {
        name: 'Users',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
      {
        name: 'Roles & Permissions',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
      {
        name: 'Teams',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
    ],
  },
  {
    category: 'Content Management',
    icon: 'file-earmark-text',
    items: [
      {
        name: 'Pages',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
      {
        name: 'Blog Posts',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
      {
        name: 'Media Library',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
    ],
  },
  {
    category: 'E-commerce',
    icon: 'cart3',
    items: [
      {
        name: 'Products',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
      {
        name: 'Orders',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
      {
        name: 'Customers',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
      {
        name: 'Coupons',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
    ],
  },
  {
    category: 'System Settings',
    icon: 'gear',
    items: [
      {
        name: 'General Settings',
        view: true,
        create: false,
        edit: true,
        delete: false,
        all: true,
        v_dash: false,
        c_dash: true,
        e_dash: false,
        d_dash: true,
        a_dash: false,
      },
      {
        name: 'Email Templates',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
      {
        name: 'API Keys',
        view: true,
        create: true,
        edit: true,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: false,
        d_dash: false,
        a_dash: false,
      },
      {
        name: 'Backup & Restore',
        view: true,
        create: true,
        edit: false,
        delete: true,
        all: true,
        v_dash: false,
        c_dash: false,
        e_dash: true,
        d_dash: false,
        a_dash: false,
      },
    ],
  },
]);
</script>

<template>
  <div class="container-fluid py-2">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h4 class="mb-1 fw-bold" style="color: var(--title-color)">Roles & Permissions</h4>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 small" style="font-size: 0.8rem">
            <li class="breadcrumb-item">
              <NuxtLink to="/" class="text-decoration-none text-muted">Home</NuxtLink>
            </li>
            <li class="breadcrumb-item active text-dark fw-medium" aria-current="page">Roles & Permissions</li>
          </ol>
        </nav>
      </div>
      <div>
        <button class="btn bg-teal rounded text-white shadow-sm fw-medium px-3 d-flex align-items-center gap-2">
          <i class="bi bi-plus-lg" /> Add Role
        </button>
      </div>
    </div>

    <div class="row g-4">
      <!-- Left Column: Roles List & Details -->
      <div class="col-12 col-xl-4 d-flex flex-column gap-4">
        <!-- Roles List -->
        <div class="card border border-light shadow-sm bg-white" style="border-radius: var(--apple-radius)">
          <div class="card-header bg-white border-bottom p-4 pb-3">
            <h6 class="fw-bold mb-0" style="color: var(--title-color)">Roles</h6>
          </div>
          <div class="card-body p-3">
            <div class="d-flex flex-column gap-2">
              <div
                v-for="role in roles"
                :key="role.id"
                class="p-3 border rounded cursor-pointer d-flex align-items-center gap-3 position-relative overflow-hidden role-card"
                :class="activeRole.id === role.id ? 'active-role' : 'hover-bg-light'"
                style="transition: all 0.2s ease; cursor: pointer"
                @click="activeRole = role"
              >
                <!-- Active Indicator -->
                <div
                  v-if="activeRole.id === role.id"
                  class="position-absolute top-0 bottom-0 start-0 bg-teal-indicator"
                  style="width: 4px"
                />

                <div
                  class="rounded d-flex align-items-center justify-content-center"
                  :class="[`bg-${role.color}-subtle`, `text-${role.color}`]"
                  style="width: 44px; height: 44px"
                >
                  <i class="bi" style="font-size: 1.15rem" :class="`bi-${role.icon}`" />
                </div>
                <div>
                  <div
                    class="fw-bold"
                    style="font-size: 0.95rem; letter-spacing: 0.2px"
                    :class="activeRole.id === role.id ? 'text-teal' : 'text-dark'"
                  >
                    {{ role.name }}
                  </div>
                  <div class="text-muted" style="font-size: 0.8rem">{{ role.users }} users</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Role Details -->
        <div class="card border border-light shadow-sm bg-white" style="border-radius: var(--apple-radius)">
          <div class="card-header bg-white border-bottom p-4 pb-3">
            <h6 class="fw-bold mb-0" style="color: var(--title-color)">Role Details</h6>
          </div>
          <div class="card-body p-4 d-flex flex-column gap-4">
            <div>
              <div class="text-muted small text-uppercase fw-bold letter-spacing-1 mb-1" style="font-size: 0.65rem">
                NAME
              </div>
              <div class="fw-medium text-dark" style="font-size: 0.85rem">
                {{ activeRole.name }}
              </div>
            </div>
            <div>
              <div class="text-muted small text-uppercase fw-bold letter-spacing-1 mb-1" style="font-size: 0.65rem">
                DESCRIPTION
              </div>
              <div class="text-dark" style="font-size: 0.85rem; line-height: 1.6">
                {{ activeRole.desc }}
              </div>
            </div>
            <div>
              <div class="text-muted small text-uppercase fw-bold letter-spacing-1 mb-1" style="font-size: 0.65rem">
                CREATED
              </div>
              <div class="text-dark" style="font-size: 0.85rem">
                {{ activeRole.created }}
              </div>
            </div>
            <div>
              <div class="text-muted small text-uppercase fw-bold letter-spacing-1 mb-1" style="font-size: 0.65rem">
                LAST MODIFIED
              </div>
              <div class="text-dark" style="font-size: 0.85rem">
                {{ activeRole.modified }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Matrix -->
      <div class="col-12 col-xl-8 d-flex flex-column gap-4">
        <!-- Permissions Matrix Card -->
        <div class="card border border-light shadow-sm bg-white" style="border-radius: var(--apple-radius)">
          <div class="card-header bg-white border-bottom p-4">
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
              <div>
                <h6 class="fw-bold mb-1" style="color: var(--title-color)">Permissions Matrix</h6>
                <div class="text-muted small" style="font-size: 0.8rem">
                  Configure access for {{ activeRole.name }} role
                </div>
              </div>
              <button
                class="btn bg-teal rounded text-white shadow-sm fw-medium px-3 d-flex align-items-center gap-2"
                style="font-size: 0.9rem"
              >
                <i class="bi bi-check2" /> Save Changes
              </button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table align-middle mb-0 text-nowrap">
              <thead class="bg-light text-muted" style="font-size: 0.75rem; letter-spacing: 0.5px">
                <tr>
                  <th scope="col" class="py-3 ps-4 border-0 fw-bold w-50" style="background-color: var(--zebra)">
                    MODULE
                  </th>
                  <th scope="col" class="py-3 border-0 fw-bold text-center" style="background-color: var(--zebra)">
                    VIEW
                  </th>
                  <th scope="col" class="py-3 border-0 fw-bold text-center" style="background-color: var(--zebra)">
                    CREATE
                  </th>
                  <th scope="col" class="py-3 border-0 fw-bold text-center" style="background-color: var(--zebra)">
                    EDIT
                  </th>
                  <th scope="col" class="py-3 border-0 fw-bold text-center" style="background-color: var(--zebra)">
                    DELETE
                  </th>
                  <th scope="col" class="py-3 pe-4 border-0 fw-bold text-center" style="background-color: var(--zebra)">
                    ALL
                  </th>
                </tr>
              </thead>
              <tbody class="border-top-0">
                <template v-for="(group, gIndex) in permissions" :key="gIndex">
                  <!-- Category Row -->
                  <tr class="bg-light">
                    <td
                      colspan="6"
                      class="py-2 ps-4 fw-bolder text-dark"
                      style="font-size: 0.8rem; background-color: var(--muted-bg)"
                    >
                      <i class="bi me-2 text-muted" :class="`bi-${group.icon}`" />
                      {{ group.category }}
                    </td>
                  </tr>

                  <!-- Items Rows -->
                  <tr v-for="(item, iIndex) in group.items" :key="`${gIndex}-${iIndex}`">
                    <td class="ps-4 py-3 text-dark" style="font-size: 0.85rem">
                      {{ item.name }}
                    </td>

                    <td class="text-center py-3">
                      <i v-if="item.view" class="bi bi-check-circle-fill text-teal fs-5" />
                      <span v-else-if="item.v_dash" class="text-muted fw-bold">-</span>
                      <i v-else class="bi bi-circle text-muted" style="opacity: 0.3" />
                    </td>

                    <td class="text-center py-3">
                      <i v-if="item.create" class="bi bi-check-circle-fill text-teal fs-5" />
                      <span v-else-if="item.c_dash" class="text-muted fw-bold">-</span>
                      <i v-else class="bi bi-circle text-muted" style="opacity: 0.3" />
                    </td>

                    <td class="text-center py-3">
                      <i v-if="item.edit" class="bi bi-check-circle-fill text-teal fs-5" />
                      <span v-else-if="item.e_dash" class="text-muted fw-bold">-</span>
                      <i v-else class="bi bi-circle text-muted" style="opacity: 0.3" />
                    </td>

                    <td class="text-center py-3">
                      <i v-if="item.delete" class="bi bi-check-circle-fill text-teal fs-5" />
                      <span v-else-if="item.d_dash" class="text-muted fw-bold">-</span>
                      <i v-else class="bi bi-circle text-muted" style="opacity: 0.3" />
                    </td>

                    <td class="text-center pe-4 py-3">
                      <i v-if="item.all" class="bi bi-check-circle-fill text-teal fs-5" />
                      <span v-else-if="item.a_dash" class="text-muted fw-bold">-</span>
                      <i v-else class="bi bi-circle text-muted" style="opacity: 0.3" />
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Bottom Partial Card (Users with this role) -->
        <div class="card border border-light shadow-sm bg-white" style="border-radius: var(--apple-radius)">
          <div class="card-header bg-white border-bottom p-4 pb-3 d-flex justify-content-between align-items-center">
            <h6 class="fw-bold mb-0" style="color: var(--title-color)">Users with {{ activeRole.name }} Role</h6>
            <span class="text-muted" style="font-size: 0.8rem">{{ activeRole.users }} users</span>
          </div>
          <div class="card-body p-4 text-center text-muted" style="font-size: 0.85rem">
            User list associated with this role will appear here in production.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mockup Specific Accents */
.text-teal {
  color: #0d9488 !important;
}
.bg-teal {
  background-color: #0d9488 !important;
  color: white !important;
}
.bg-teal:hover {
  background-color: #0f766e !important;
  color: white !important;
}
.bg-teal-indicator {
  background-color: #14b8a6 !important;
}

.active-role {
  border-color: #ccfbf1 !important; /* light teal border */
  background-color: #f0fdfa !important; /* very light teal bg */
}
.hover-bg-light:hover {
  background-color: var(--row-hover);
}
.card {
  transition: box-shadow 0.2s ease;
}
.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06) !important;
}
</style>
