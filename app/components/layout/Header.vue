<script setup lang="ts">
const emit = defineEmits(['toggle-sidebar']);

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const isDarkMode = ref(true);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const theme = isDarkMode.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-bs-theme', theme);
  localStorage.setItem('theme', theme);
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  isDarkMode.value = savedTheme === 'dark';
  document.documentElement.setAttribute('data-bs-theme', savedTheme);
  window.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown);
});

const handleSignOut = async () => {
  authStore.logout();
  await navigateTo('/login');
};
</script>

<template>
  <header class="header glass d-flex align-items-center px-3 px-md-4">
    <div class="d-flex align-items-center justify-content-between w-100 h-100">
      <!-- Kiri: Toggle Sidebar & Kotak Pencarian -->
      <div class="d-flex align-items-center gap-3">
        <!-- Branding Logo -->
        <NuxtLink
          to="/"
          class="text-decoration-none d-flex align-items-center fw-bolder fs-5 gap-2 me-md-2"
          :class="isDarkMode ? 'text-white' : 'text-dark'"
        >
          <i class="bi bi-heptagon-half fs-4 text-accent" />
          <span class="d-none d-md-block">niceAdmin</span>
        </NuxtLink>
        <!-- Sidebar Toggle -->
        <button class="header-icon-btn header-icon-btn-teal" @click="emit('toggle-sidebar')">
          <i class="bi bi-layout-sidebar fs-5" />
        </button>

        <div class="input-group d-none d-md-flex align-items-center search-box search-pill px-3 py-1 w-300 h-36">
          <i class="bi bi-search me-2 text-muted" />
          <input
            type="text"
            class="form-control border-0 bg-transparent shadow-none fs-sm"
            :class="isDarkMode ? 'text-white' : 'text-dark'"
            placeholder="Search users, invoices, tickets..."
          />
          <kbd
            class="border ms-2 fw-medium px-2 rounded bg-base text-muted d-flex align-items-center justify-content-center fs-10 h-18"
          >
            /
          </kbd>
        </div>
      </div>
      <!-- Kanan: Menu Item Ekstra & Profil -->
      <div class="d-flex align-items-center gap-2 gap-md-3">
        <!-- Icon Group -->
        <div class="d-none d-sm-flex align-items-center gap-2">
          <!-- Theme Toggle -->
          <button
            class="header-icon-btn transition-all"
            :class="isDarkMode ? 'text-accent' : 'text-secondary'"
            title="Toggle theme"
            @click="toggleTheme"
          >
            <i :class="isDarkMode ? 'bi bi-sun-fill fs-6' : 'bi bi-moon-fill fs-6'" />
          </button>

          <!-- Chat Badge -->
          <button class="header-icon-btn position-relative">
            <i class="bi bi-chat-left-text fs-6" />
            <span class="badge-apple badge-apple-top bg-danger border border-white"> 5 </span>
          </button>

          <!-- Notifikasi Badge -->
          <button class="header-icon-btn position-relative">
            <i class="bi bi-bell fs-6" />
            <span class="badge-apple badge-apple-top bg-danger border border-white"> 4 </span>
          </button>
        </div>
        <div class="vr mx-2 d-none d-sm-block h-24" />
        <!-- Dropdown Profil -->
        <div ref="dropdownRef" class="dropdown">
          <a
            href="javascript:void(0)"
            class="d-flex align-items-center text-decoration-none"
            :class="isDarkMode ? 'text-white' : 'text-dark'"
            :aria-expanded="isDropdownOpen"
            @click.stop="toggleDropdown"
          >
            <img
              :src="`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=0D8ABC&color=fff`"
              alt="User Profile"
              class="rounded-circle shadow-sm w-36 h-36"
            />
            <div class="d-none d-md-block text-start ms-2 lh-1 text-truncate max-w-120">
              <span class="d-block fw-bold fs-sm">
                {{ user?.username || 'John Doe' }}
              </span>
              <span class="text-secondary fs-11"> Product Admin </span>
            </div>
            <i
              class="bi bi-chevron-down ms-2 small d-none d-md-inline text-muted fs-10 transition-all"
              :class="{ 'rotate-180': isDropdownOpen }"
            />
          </a>

          <ul
            class="dropdown-menu dropdown-menu-end shadow-lg border mt-2 p-0 overflow-hidden transition-all d-block-important"
            :class="{
              show: isDropdownOpen,
              'visible opacity-1 transform-y-0 pointer-events-auto': isDropdownOpen,
              'invisible opacity-0 transform-y-10 pointer-events-none': !isDropdownOpen,
            }"
          >
            <!-- Header Dropdown -->
            <li class="p-2 border-b-apple d-flex align-items-center gap-2">
              <img
                :src="`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=0D8ABC&color=fff`"
                alt="User"
                class="rounded-circle border border-2 border-white shadow-sm w-36 h-36"
              />
              <div class="lh-1">
                <span class="d-block fw-bold text-primary fs-sm mb-1">
                  {{ user?.username || 'Guest' }}
                </span>
                <span class="text-tertiary fs-10">
                  {{ user?.id_personal || 'user@example.com' }}
                </span>
              </div>
            </li>

            <!-- Menu Items -->
            <div class="p-2 d-flex flex-column gap-1">
              <li>
                <NuxtLink
                  class="dropdown-item py-2 px-2 rounded-3 d-flex align-items-center gap-2 text-primary fw-medium fs-md"
                  to="/users/view"
                >
                  <div
                    class="rounded d-flex align-items-center justify-content-center text-tertiary bg-soft-dark w-24 h-24"
                  >
                    <i class="bi bi-person fs-6" />
                  </div>
                  My Profile
                </NuxtLink>
              </li>
              <li>
                <a
                  class="dropdown-item py-2 px-2 rounded-3 d-flex align-items-center gap-2 text-primary fw-medium fs-md"
                  href="#"
                >
                  <div
                    class="rounded d-flex align-items-center justify-content-center text-tertiary bg-soft-dark w-24 h-24"
                  >
                    <i class="bi bi-sliders fs-6" />
                  </div>
                  Settings
                </a>
              </li>
            </div>

            <li class="border-t-apple mt-1 p-2">
              <a
                class="dropdown-item py-2 rounded-3 text-danger fw-bold d-flex align-items-center justify-content-center gap-2 fs-md"
                href="javascript:void(0)"
                @click="handleSignOut"
              >
                <i class="bi bi-box-arrow-right" /> Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Transisi dropdown manual karena Bootstrap classes mungkin butuh bantuan jika tidak pakai template built-in */
.transition-all {
  transition: all var(--transition-normal);
}

.opacity-1 {
  opacity: 1 !important;
}

.opacity-0 {
  opacity: 0;
}

.transform-y-0 {
  transform: translateY(0) !important;
}

.transform-y-10 {
  transform: translateY(10px);
}

.pointer-events-auto {
  pointer-events: auto !important;
}

.pointer-events-none {
  pointer-events: none;
}
</style>
