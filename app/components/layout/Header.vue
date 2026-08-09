<script setup lang="ts">
const emit = defineEmits(['toggle-sidebar']);

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const isNotificationOpen = ref(false);
const notificationRef = ref<HTMLElement | null>(null);

const isDarkMode = ref(true);

const staticNotifications = ref([
  {
    id: 1,
    title: 'New User Registered',
    message: 'Sarah Johnson created a new admin account.',
    time: '5 mins ago',
    icon: 'bi-person-plus-fill',
    colorVariant: 'primary',
    isUnread: true,
  },
  {
    id: 2,
    title: 'System Alert',
    message: 'Server memory utilization reached 85%.',
    time: '25 mins ago',
    icon: 'bi-exclamation-triangle-fill',
    colorVariant: 'warning',
    isUnread: true,
  },
  {
    id: 3,
    title: 'Report Generated',
    message: 'Monthly sales report Q2 is ready for download.',
    time: '2 hours ago',
    icon: 'bi-file-earmark-bar-graph-fill',
    colorVariant: 'success',
    isUnread: true,
  },
  {
    id: 4,
    title: 'Security Notice',
    message: 'Successful login from new IP address 192.168.1.45.',
    time: '5 hours ago',
    icon: 'bi-shield-check',
    colorVariant: 'info',
    isUnread: true,
  },
]);

const unreadCount = computed(() => staticNotifications.value.filter((n) => n.isUnread).length);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const theme = isDarkMode.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-bs-theme', theme);
  localStorage.setItem('theme', theme);
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value) {
    isNotificationOpen.value = false;
  }
};

const toggleNotification = () => {
  isNotificationOpen.value = !isNotificationOpen.value;
  if (isNotificationOpen.value) {
    isDropdownOpen.value = false;
  }
};

const markAllAsRead = () => {
  staticNotifications.value.forEach((n) => (n.isUnread = false));
};

const closeDropdown = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
  if (notificationRef.value && !notificationRef.value.contains(event.target as Node)) {
    isNotificationOpen.value = false;
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
  await navigateTo('/auth/logout');
};
</script>

<template>
  <header class="header glass d-flex align-items-center px-3 px-md-4">
    <div class="d-flex align-items-center justify-content-between w-100 h-100">
      <!-- Kiri: Toggle Sidebar & Kotak Pencarian -->
      <div class="d-flex align-items-center gap-3 flex-grow-1">
        <!-- Sidebar Brand Area (Aligned to sidebar boundary) -->
        <div class="sidebar-brand-area d-flex align-items-center justify-content-between">
          <!-- Branding Logo -->
          <NuxtLink
            to="/"
            class="text-decoration-none d-flex align-items-center fw-bolder fs-5 gap-2 me-2"
            :class="isDarkMode ? 'text-white' : 'text-dark'"
          >
            <i class="bi bi-heptagon-half fs-4 text-accent" />
            <span class="d-none d-md-block">flexVueAdmin</span>
          </NuxtLink>
          <!-- Sidebar Toggle (Aligned with sidebar edge) -->
          <button class="header-icon-btn header-icon-btn-teal" @click="emit('toggle-sidebar')">
            <i class="bi bi-layout-sidebar fs-5" />
          </button>
        </div>
        <!-- Search Box (Positioned cleanly in main content area) -->
        <div class="header-search-container d-none d-md-flex align-items-center ms-md-3">
          <div class="header-search-input-wrapper d-flex align-items-center px-3">
            <i class="bi bi-search search-icon me-2" />
            <input
              type="text"
              class="header-search-input border-0 bg-transparent shadow-none"
              placeholder="Search users, invoices, tickets..."
            />
            <kbd class="shortcut-badge ms-2">/</kbd>
          </div>
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
          <button class="header-icon-btn position-relative" aria-label="Messages">
            <i class="bi bi-chat-left-text fs-6" />
            <span class="badge-notification">5</span>
          </button>
          <!-- Notifikasi Badge Dropdown -->
          <div ref="notificationRef" class="dropdown">
            <button
              class="header-icon-btn position-relative"
              aria-label="Notifications"
              :aria-expanded="isNotificationOpen"
              @click.stop="toggleNotification"
            >
              <i class="bi bi-bell fs-6" />
              <span v-if="unreadCount > 0" class="badge-notification">{{ unreadCount }}</span>
            </button>
            <!-- Dropdown Menu Notifikasi -->
            <div
              class="dropdown-menu dropdown-menu-end shadow-lg border mt-3 p-0 overflow-hidden transition-all d-block-important notification-dropdown"
              style="margin-left: -10rem"
              :class="{
                show: isNotificationOpen,
                'visible opacity-1 transform-y-0 pointer-events-auto': isNotificationOpen,
                'invisible opacity-0 transform-y-10 pointer-events-none': !isNotificationOpen,
              }"
            >
              <!-- Header -->
              <div class="p-3 border-b-apple d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-2">
                  <h6 class="mb-0 fw-bold text-primary fs-sm">Notifications</h6>
                  <span v-if="unreadCount > 0" class="badge rounded-pill bg-primary-subtle text-primary fs-xs">
                    {{ unreadCount }} New
                  </span>
                </div>
                <button
                  class="btn btn-link p-0 text-decoration-none text-accent fs-xs fw-medium border-0 shadow-none"
                  @click="markAllAsRead"
                >
                  Mark all read
                </button>
              </div>
              <!-- List Notifikasi Statis -->
              <div class="notification-list p-2 d-flex flex-column gap-1 overflow-y-auto" style="max-height: 320px">
                <div
                  v-for="item in staticNotifications"
                  :key="item.id"
                  class="notification-item p-2 rounded-3 text-decoration-none d-flex align-items-start gap-3 transition-all cursor-pointer"
                  :class="{ 'bg-soft-dark': item.isUnread }"
                >
                  <div
                    class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 mt-1"
                    :class="`bg-${item.colorVariant}-subtle text-${item.colorVariant}`"
                    style="width: 36px; height: 36px"
                  >
                    <i class="bi" :class="item.icon" />
                  </div>
                  <div class="flex-grow-1 lh-sm">
                    <div class="d-flex align-items-center justify-content-between mb-1">
                      <span class="fw-bold text-primary fs-xs">{{ item.title }}</span>
                      <span class="text-tertiary fs-10 ms-2">{{ item.time }}</span>
                    </div>
                    <p class="text-secondary mb-0" style="font-size: 0.75rem; line-height: 1.35">
                      {{ item.message }}
                    </p>
                  </div>
                  <span
                    v-if="item.isUnread"
                    class="unread-dot rounded-circle bg-accent flex-shrink-0 mt-2"
                    style="width: 6px; height: 6px"
                  />
                </div>
              </div>

              <!-- Footer -->
              <div class="p-2 border-t-apple text-center bg-elevated">
                <a href="#" class="text-decoration-none text-tertiary text-hover-dark fs-xs fw-medium">
                  View all notifications
                </a>
              </div>
            </div>
          </div>
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
              class="rounded-circle shadow-sm w-25 h-25"
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
            class="dropdown-menu dropdown-menu-end shadow-lg border mt-3 p-0 overflow-hidden transition-all d-block-important"
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
                class="rounded-circle border border-2 border-white shadow-sm w-25 h-25"
              />
              <div class="lh-1">
                <span class="d-block fw-bold text-primary fs-sm mb-1">
                  {{ user?.username || 'Guest' }}
                </span>
                <span class="text-tertiary fs-10">
                  {{ user?.personalId || 'user@example.com' }}
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
.notification-dropdown {
  width: 340px;
  max-width: 90vw;
}

.notification-item:hover {
  background-color: var(--bg-grouped) !important;
}

.cursor-pointer {
  cursor: pointer;
}

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

@media (min-width: 992px) {
  .sidebar-brand-area {
    width: calc(var(--sidebar-width) - 2.5rem);
    min-width: calc(var(--sidebar-width) - 2.5rem);
  }
}
</style>
