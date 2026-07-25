<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRoles } from '../../composables/useRoles';
import { useUsers } from '../../composables/useUsers';
import type { RoleMatrixItem } from '../../services/roles.service';

const {
  roles,
  permissionGroups,
  activeRoleId,
  activeRole,
  isLoading,
  isSaving,
  getRoles,
  selectRole,
  togglePermission,
  saveRolePermissions,
} = useRoles();

const { rawUsers, getUsers } = useUsers();

const saveSuccess = ref(false);

onMounted(async () => {
  await Promise.all([getRoles(), getUsers()]);
});

const handleSave = async () => {
  await saveRolePermissions();
  saveSuccess.value = true;
  setTimeout(() => {
    saveSuccess.value = false;
  }, 2500);
};

// Users matching the currently active role
const usersInActiveRole = computed(() => {
  if (!rawUsers.value || rawUsers.value.length === 0) return [];
  const activeRoleName = activeRole.value.name.toLowerCase();
  return rawUsers.value.filter((u) => u.role.toLowerCase() === activeRoleName);
});

// Matrix helper to get permission record safely
const getMatrixItem = (itemName: string): RoleMatrixItem => {
  if (activeRole.value.matrix && activeRole.value.matrix[itemName]) {
    return activeRole.value.matrix[itemName];
  }
  return { view: true, create: true, edit: true, delete: true, all: true };
};
</script>

<template>
  <div class="container-fluid py-2">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h4 class="mb-1 fw-bold text-primary">Roles &amp; Permissions</h4>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 fs-xs">
            <li class="breadcrumb-item">
              <NuxtLink to="/" class="text-decoration-none text-muted">Home</NuxtLink>
            </li>
            <li class="breadcrumb-item active text-dark fw-medium" aria-current="page">Roles &amp; Permissions</li>
          </ol>
        </nav>
      </div>
      <div>
        <button class="btn bg-teal rounded text-white shadow-sm fw-medium px-3 d-flex align-items-center gap-2">
          <i class="bi bi-plus-lg" /> Add Role
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-5 text-muted">
      <div class="spinner-border spinner-border-sm me-2 text-primary" role="status" />
      Loading roles &amp; permissions...
    </div>

    <div v-else class="row g-4">
      <!-- Left Column: Roles List & Details -->
      <div class="col-12 col-xl-4 d-flex flex-column gap-4">
        <!-- Roles List -->
        <div class="card shadow-sm rounded-md">
          <div class="card-header border-bottom p-4 pb-3">
            <h6 class="mb-0 fw-bold text-primary">Roles</h6>
          </div>
          <div class="card-body p-3">
            <div class="d-flex flex-column gap-2">
              <div
                v-for="role in roles"
                :key="role.id"
                class="p-3 border rounded cursor-pointer d-flex align-items-center gap-3 position-relative overflow-hidden role-card"
                :class="activeRoleId === role.id ? 'active-role' : 'hover-bg-light'"
                style="transition: all 0.2s ease; cursor: pointer"
                @click="selectRole(role.id)"
              >
                <!-- Active Indicator -->
                <div
                  v-if="activeRoleId === role.id"
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
                  <div class="fw-bold fs-md" :class="activeRoleId === role.id ? 'text-teal' : 'text-dark'">
                    {{ role.name }}
                  </div>
                  <div class="text-tertiary fs-sm">{{ role.users_count }} users</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Role Details -->
        <div class="card shadow-sm rounded-md">
          <div class="card-header border-bottom p-4 pb-3">
            <h6 class="mb-0 fw-bold text-primary">Role Details</h6>
          </div>
          <div class="card-body p-4 d-flex flex-column gap-4">
            <div>
              <div class="text-tertiary text-uppercase fw-bold letter-spacing-1 mb-1 fs-10">NAME</div>
              <div class="fw-medium text-primary fs-md">
                {{ activeRole.name }}
              </div>
            </div>
            <div>
              <div class="text-tertiary text-uppercase fw-bold letter-spacing-1 mb-1 fs-10">DESCRIPTION</div>
              <div class="text-primary fs-md lh-normal">
                {{ activeRole.description }}
              </div>
            </div>
            <div>
              <div class="text-tertiary text-uppercase fw-bold letter-spacing-1 mb-1 fs-10">CREATED</div>
              <div class="text-primary fs-md">
                {{ activeRole.created_at }}
              </div>
            </div>
            <div>
              <div class="text-tertiary text-uppercase fw-bold letter-spacing-1 mb-1 fs-10">LAST MODIFIED</div>
              <div class="text-primary fs-md">
                {{ activeRole.updated_at }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Matrix -->
      <div class="col-12 col-xl-8 d-flex flex-column gap-4">
        <!-- Permissions Matrix Card -->
        <div class="card shadow-sm rounded-md">
          <div class="card-header border-bottom p-4">
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
              <div>
                <h6 class="mb-1 fw-bold text-primary">Permissions Matrix</h6>
                <div class="text-tertiary fs-xs">Configure access for {{ activeRole.name }} role</div>
              </div>
              <button
                class="btn bg-teal rounded text-white shadow-sm fw-medium px-3 d-flex align-items-center gap-2"
                :disabled="isSaving"
                @click="handleSave"
              >
                <i v-if="isSaving" class="spinner-border spinner-border-sm" role="status" />
                <i v-else-if="saveSuccess" class="bi bi-check-lg text-white" />
                <i v-else class="bi bi-check2" />
                <span>{{ isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes' }}</span>
              </button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table align-middle mb-0 text-nowrap">
              <thead class="bg-light text-tertiary fs-sm letter-spacing-1">
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
                <template v-for="(group, gIndex) in permissionGroups" :key="gIndex">
                  <!-- Category Row -->
                  <tr class="bg-light">
                    <td
                      colspan="6"
                      class="py-2 ps-4 fw-bolder text-primary fs-sm"
                      style="background-color: var(--muted-bg)"
                    >
                      <i class="bi me-2 text-muted" :class="`bi-${group.icon}`" />
                      {{ group.category }}
                    </td>
                  </tr>

                  <!-- Items Rows -->
                  <tr v-for="(itemName, iIndex) in group.items" :key="`${gIndex}-${iIndex}`">
                    <td class="ps-4 py-3 text-dark fs-md">
                      {{ itemName }}
                    </td>

                    <td class="text-center py-3">
                      <i
                        v-if="getMatrixItem(itemName).view"
                        class="bi bi-check-circle-fill text-teal fs-xl cursor-pointer"
                        @click="togglePermission(itemName, 'view')"
                      />
                      <span v-else-if="getMatrixItem(itemName).v_dash" class="text-muted fw-bold">-</span>
                      <i
                        v-else
                        class="bi bi-circle text-muted cursor-pointer"
                        style="opacity: 0.3"
                        @click="togglePermission(itemName, 'view')"
                      />
                    </td>

                    <td class="text-center py-3">
                      <i
                        v-if="getMatrixItem(itemName).create"
                        class="bi bi-check-circle-fill text-teal fs-xl cursor-pointer"
                        @click="togglePermission(itemName, 'create')"
                      />
                      <span v-else-if="getMatrixItem(itemName).c_dash" class="text-muted fw-bold">-</span>
                      <i
                        v-else
                        class="bi bi-circle text-muted cursor-pointer"
                        style="opacity: 0.3"
                        @click="togglePermission(itemName, 'create')"
                      />
                    </td>

                    <td class="text-center py-3">
                      <i
                        v-if="getMatrixItem(itemName).edit"
                        class="bi bi-check-circle-fill text-teal fs-xl cursor-pointer"
                        @click="togglePermission(itemName, 'edit')"
                      />
                      <span v-else-if="getMatrixItem(itemName).e_dash" class="text-muted fw-bold">-</span>
                      <i
                        v-else
                        class="bi bi-circle text-muted cursor-pointer"
                        style="opacity: 0.3"
                        @click="togglePermission(itemName, 'edit')"
                      />
                    </td>

                    <td class="text-center py-3">
                      <i
                        v-if="getMatrixItem(itemName).delete"
                        class="bi bi-check-circle-fill text-teal fs-xl cursor-pointer"
                        @click="togglePermission(itemName, 'delete')"
                      />
                      <span v-else-if="getMatrixItem(itemName).d_dash" class="text-muted fw-bold">-</span>
                      <i
                        v-else
                        class="bi bi-circle text-muted cursor-pointer"
                        style="opacity: 0.3"
                        @click="togglePermission(itemName, 'delete')"
                      />
                    </td>

                    <td class="text-center pe-4 py-3">
                      <i
                        v-if="getMatrixItem(itemName).all"
                        class="bi bi-check-circle-fill text-teal fs-xl cursor-pointer"
                        @click="togglePermission(itemName, 'all')"
                      />
                      <span v-else-if="getMatrixItem(itemName).a_dash" class="text-muted fw-bold">-</span>
                      <i
                        v-else
                        class="bi bi-circle text-muted cursor-pointer"
                        style="opacity: 0.3"
                        @click="togglePermission(itemName, 'all')"
                      />
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Users with this Role Card -->
        <div class="card shadow-sm rounded-md">
          <div class="card-header border-bottom p-4 pb-3 d-flex justify-content-between align-items-center">
            <h6 class="mb-0 fw-bold text-primary">Users with {{ activeRole.name }} Role</h6>
            <span class="text-tertiary fs-sm">{{ usersInActiveRole.length || activeRole.users_count }} users</span>
          </div>
          <div class="card-body p-4">
            <div v-if="usersInActiveRole.length > 0" class="d-flex flex-wrap gap-3">
              <div
                v-for="u in usersInActiveRole.slice(0, 12)"
                :key="u.id"
                class="d-flex align-items-center gap-2 p-2 border rounded bg-elevated"
                style="min-width: 180px"
              >
                <img :src="u.avatar" width="32" height="32" class="rounded-circle" alt="Avatar" />
                <div class="overflow-hidden">
                  <div class="fw-bold fs-xs text-primary text-truncate" style="max-width: 120px">
                    {{ u.full_name }}
                  </div>
                  <div class="text-muted fs-xs text-truncate" style="max-width: 120px">
                    {{ u.email }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-tertiary fs-md py-2">
              No users currently assigned to {{ activeRole.name }} role.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
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
