<script setup lang="ts">
import { ref } from 'vue';

const user = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
  id: '#U24-001',
  role: 'Admin',
  department: 'Engineering',
  phone: '+1 (555) 123-4567',
  location: 'New York, USA',
  manager: 'Chris Thompson',
  joined: 'Jan 15, 2024',
});
</script>

<template>
  <div class="container-fluid py-2">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h4 class="mb-1 fw-bold text-primary">User Command Profile</h4>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 fs-xs">
            <li class="breadcrumb-item">
              <NuxtLink to="/" class="text-decoration-none text-muted">Home</NuxtLink>
            </li>
            <li class="breadcrumb-item">
              <NuxtLink to="/users" class="text-decoration-none text-muted">Users</NuxtLink>
            </li>
            <li class="breadcrumb-item active text-dark fw-medium" aria-current="page">
              {{ user.name }}
            </li>
          </ol>
        </nav>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-primary shadow-sm fw-medium px-3 d-flex align-items-center gap-2">
          <i class="bi bi-pencil" /> Edit User
        </button>
        <button
          class="btn btn-white border bg-elevated shadow-sm fw-medium px-3 d-flex align-items-center gap-2 text-danger"
        >
          <i class="bi bi-trash" /> Delete
        </button>
      </div>
    </div>

    <!-- Main Layout -->
    <div class="row g-4">
      <!-- Left Column -->
      <div class="col-12 col-xl-8 d-flex flex-column gap-4">
        <!-- Profile Card -->
        <div class="card shadow-sm rounded-md">
          <div class="card-body p-4">
            <!-- Profile Info Row -->
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start mb-4 gap-3">
              <div class="d-flex gap-3 gap-md-4 align-items-center">
                <div class="position-relative">
                  <img
                    :src="user.avatar"
                    class="rounded-circle border border-3 border-white shadow-sm"
                    width="80"
                    height="80"
                    alt="Avatar"
                  />
                  <span
                    class="position-absolute bottom-0 end-0 p-1 bg-success border border-2 border-white rounded-circle"
                    style="transform: translate(-10%, -10%); width: 16px; height: 16px"
                  />
                </div>
                <div>
                  <h4 class="fw-bolder mb-1 text-primary">
                    {{ user.name }}
                  </h4>
                  <p class="text-muted mb-2 fs-sm">
                    {{ user.email }}
                  </p>
                  <div class="d-flex flex-wrap gap-2">
                    <span class="badge bg-elevated text-primary border px-2 py-1 fw-medium"
                      ><i class="bi bi-shield-check text-muted me-1" /> {{ user.role }}</span
                    >
                    <span class="badge bg-elevated text-secondary border px-2 py-1 fw-medium">{{ user.id }}</span>
                    <span class="badge bg-elevated text-secondary border px-2 py-1 fw-medium">{{
                      user.department
                    }}</span>
                  </div>
                </div>
              </div>
              <a
                href="#"
                class="text-decoration-none fw-medium d-none d-sm-flex align-items-center gap-1 fs-sm text-accent"
              >
                Manage profile <i class="bi bi-chevron-right small" />
              </a>
            </div>

            <!-- Stats Row -->
            <div class="row g-3 mb-4">
              <div class="col-6 col-md-3">
                <div class="p-3 border rounded-3 bg-elevated d-flex justify-content-between align-items-start h-100">
                  <div>
                    <div class="text-tertiary text-uppercase fw-bold mb-1 letter-spacing-1 fs-10">LOGINS</div>
                    <div class="fw-bolder fs-xl text-primary">156</div>
                  </div>
                  <div
                    class="bg-info-subtle text-info rounded p-1 d-flex align-items-center justify-content-center"
                    style="width: 28px; height: 28px"
                  >
                    <i class="bi bi-box-arrow-in-right small" />
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="p-3 border rounded-3 bg-elevated d-flex justify-content-between align-items-start h-100">
                  <div>
                    <div class="text-tertiary text-uppercase fw-bold mb-1 letter-spacing-1 fs-10">TASKS CLOSED</div>
                    <div class="fw-bolder fs-xl text-primary">42</div>
                  </div>
                  <div
                    class="bg-success-subtle text-success rounded p-1 d-flex align-items-center justify-content-center"
                    style="width: 28px; height: 28px"
                  >
                    <i class="bi bi-check2-square small" />
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="p-3 border rounded-3 bg-elevated d-flex justify-content-between align-items-start h-100">
                  <div>
                    <div class="text-tertiary text-uppercase fw-bold mb-1 letter-spacing-1 fs-10">PROJECTS</div>
                    <div class="fw-bolder fs-xl text-primary">18</div>
                  </div>
                  <div
                    class="bg-primary-subtle text-primary rounded p-1 d-flex align-items-center justify-content-center"
                    style="width: 28px; height: 28px"
                  >
                    <i class="bi bi-folder small" />
                  </div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="p-3 border rounded-3 bg-elevated d-flex justify-content-between align-items-start h-100">
                  <div>
                    <div class="text-tertiary text-uppercase fw-bold mb-1 letter-spacing-1 fs-10">TEAMS</div>
                    <div class="fw-bolder fs-xl text-primary">7</div>
                  </div>
                  <div
                    class="bg-warning-subtle text-warning rounded p-1 d-flex align-items-center justify-content-center"
                    style="width: 28px; height: 28px"
                  >
                    <i class="bi bi-people small" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Details Table -->
            <div class="row g-3 px-2">
              <div class="col-12 col-md-6 d-flex justify-content-between border-bottom pb-2">
                <span class="text-muted fs-sm">Phone</span>
                <span class="fw-medium text-primary fs-sm">{{ user.phone }}</span>
              </div>
              <div class="col-12 col-md-6 d-flex justify-content-between border-bottom pb-2">
                <span class="text-muted fs-sm">Location</span>
                <span class="fw-medium text-primary fs-sm">{{ user.location }}</span>
              </div>
              <div class="col-12 col-md-6 d-flex justify-content-between pt-1">
                <span class="text-muted fs-sm">Manager</span>
                <span class="fw-medium text-primary fs-sm">{{ user.manager }}</span>
              </div>
              <div class="col-12 col-md-6 d-flex justify-content-between pt-1">
                <span class="text-muted fs-sm">Joined</span>
                <span class="fw-medium text-primary fs-sm">{{ user.joined }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Timeline -->
        <div class="card shadow-sm rounded-md">
          <div class="card-header border-bottom p-4 pb-3">
            <h6 class="fw-bold mb-0 text-primary">Activity Timeline</h6>
          </div>
          <div class="card-body p-4">
            <div class="timeline position-relative ms-2 pe-2 pb-2">
              <!-- Item 1 -->
              <div class="timeline-item position-relative pb-4 ps-4">
                <div
                  class="timeline-indicator position-absolute bg-success rounded-circle border border-2 border-white shadow-sm"
                  style="width: 12px; height: 12px; left: -6px; top: 4px"
                />
                <div class="timeline-line position-absolute bg-light h-100" style="width: 2px; left: -1px; top: 16px" />
                <h6 class="fw-bold mb-1 fs-md text-primary">Logged In</h6>
                <p class="text-muted mb-1 fs-sm">Chrome on Windows - New York, USA</p>
                <div class="text-muted fs-xs">Just now</div>
              </div>

              <!-- Item 2 -->
              <div class="timeline-item position-relative pb-4 ps-4">
                <div
                  class="timeline-indicator position-absolute rounded-circle border border-2 border-white shadow-sm"
                  style="width: 12px; height: 12px; left: -6px; top: 4px; background-color: var(--apple-blue)"
                />
                <div class="timeline-line position-absolute bg-light h-100" style="width: 2px; left: -1px; top: 16px" />
                <h6 class="fw-bold mb-1 fs-md text-primary">Updated profile information</h6>
                <p class="text-muted mb-1 fs-sm">Changed phone number and location</p>
                <div class="text-muted fs-xs">2 hours ago</div>
              </div>

              <!-- Item 3 -->
              <div class="timeline-item position-relative pb-4 ps-4">
                <div
                  class="timeline-indicator position-absolute bg-warning rounded-circle border border-2 border-white shadow-sm"
                  style="width: 12px; height: 12px; left: -6px; top: 4px"
                />
                <div class="timeline-line position-absolute bg-light h-100" style="width: 2px; left: -1px; top: 16px" />
                <h6 class="fw-bold mb-1 fs-md text-primary">Enabled Two-Factor Authentication</h6>
                <p class="text-muted mb-1 fs-sm">Using authenticator app</p>
                <div class="text-muted fs-xs">Yesterday at 3:45 PM</div>
              </div>

              <!-- Item 4 -->
              <div class="timeline-item position-relative pb-4 ps-4">
                <div
                  class="timeline-indicator position-absolute bg-primary rounded-circle border border-2 border-white shadow-sm"
                  style="width: 12px; height: 12px; left: -6px; top: 4px"
                />
                <div class="timeline-line position-absolute bg-light h-100" style="width: 2px; left: -1px; top: 16px" />
                <h6 class="fw-bold mb-1 fs-md text-primary">Joined Engineering team</h6>
                <p class="text-muted mb-1 fs-sm">Added by Chris Thompson</p>
                <div class="text-muted fs-xs">3 days ago</div>
              </div>

              <!-- Item 5 -->
              <div class="timeline-item position-relative ps-4">
                <div
                  class="timeline-indicator position-absolute bg-success rounded-circle border border-2 border-white shadow-sm"
                  style="width: 12px; height: 12px; left: -6px; top: 4px"
                />
                <h6 class="fw-bold mb-1 fs-md text-primary">Completed 5 tasks in Project Alpha</h6>
                <p class="text-muted mb-1 fs-sm">Sprint v2 milestone reached</p>
                <div class="text-muted fs-xs">5 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-12 col-xl-4 d-flex flex-column gap-4">
        <!-- Account Health Card -->
        <div class="card shadow-sm rounded-md">
          <div class="card-header border-bottom p-4 pb-3">
            <h6 class="fw-bold mb-0 text-primary">Account Health</h6>
          </div>
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted fs-sm">Status</span>
              <span class="fw-medium text-primary fs-sm">Active</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted fs-sm">Email Verification</span>
              <span class="fw-medium text-success d-flex align-items-center gap-1 fs-sm">
                <i class="bi bi-check-circle-fill" /> Verified
              </span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted fs-sm">2FA</span>
              <span class="fw-medium text-success d-flex align-items-center gap-1 fs-sm">
                <i class="bi bi-shield-check" /> Enabled
              </span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted fs-sm">Last Login</span>
              <span class="fw-medium text-primary fs-sm">Just now</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <span class="text-muted fs-sm">Risk Score</span>
              <span class="fw-medium text-primary fs-sm">Low</span>
            </div>

            <!-- Team Memberships -->
            <div class="d-flex flex-column gap-2">
              <div class="p-2 border rounded d-flex align-items-center gap-3">
                <div
                  class="bg-primary-subtle text-primary rounded p-1 d-flex align-items-center justify-content-center"
                  style="width: 32px; height: 32px"
                >
                  <i class="bi bi-code-slash" />
                </div>
                <div class="flex-grow-1">
                  <div class="fw-bold text-primary fs-sm">Engineering</div>
                  <div class="text-tertiary fs-xs">12 members</div>
                </div>
              </div>
              <div class="p-2 border rounded d-flex align-items-center gap-3">
                <div
                  class="bg-success-subtle text-success rounded p-1 d-flex align-items-center justify-content-center"
                  style="width: 32px; height: 32px"
                >
                  <i class="bi bi-box" />
                </div>
                <div class="flex-grow-1">
                  <div class="fw-bold text-primary fs-sm">Product</div>
                  <div class="text-tertiary fs-xs">5 members</div>
                </div>
              </div>
              <div class="p-2 border rounded d-flex align-items-center gap-3">
                <div
                  class="bg-info-subtle text-info rounded p-1 d-flex align-items-center justify-content-center"
                  style="width: 32px; height: 32px"
                >
                  <i class="bi bi-palette" />
                </div>
                <div class="flex-grow-1">
                  <div class="fw-bold text-primary fs-sm">Design</div>
                  <div class="text-tertiary fs-xs">8 members</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Access Rights Card -->
        <div class="card shadow-sm rounded-md">
          <div class="card-header border-bottom p-4 pb-3">
            <h6 class="fw-bold mb-0 text-primary">Access Rights</h6>
          </div>
          <div class="card-body p-4">
            <div
              class="alert alert-info bg-primary-subtle text-primary border-primary border-opacity-25 py-2 px-3 d-flex align-items-start gap-2 mb-3 fs-xs"
            >
              <i class="bi bi-info-circle mt-1" />
              <div>
                Admin role with full system scope. Managed via
                <a href="#" class="text-primary fw-medium">Roles &amp; Permissions</a>.
              </div>
            </div>

            <ul class="list-unstyled mb-0 fs-sm">
              <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span class="text-primary">Dashboard</span> <i class="bi bi-check2 text-success" />
              </li>
              <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span class="text-primary">Users</span> <i class="bi bi-check2 text-success" />
              </li>
              <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span class="text-primary">Roles</span> <i class="bi bi-check2 text-success" />
              </li>
              <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span class="text-primary">Settings</span> <i class="bi bi-check2 text-success" />
              </li>
              <li class="d-flex justify-content-between align-items-center py-2">
                <span class="text-primary">Reports</span> <i class="bi bi-check2 text-success" />
              </li>
            </ul>
          </div>
        </div>

        <!-- Active Sessions Card -->
        <div class="card shadow-sm rounded-md">
          <div class="card-header border-bottom p-4 pb-3">
            <h6 class="fw-bold mb-0 text-primary">Active Sessions</h6>
          </div>
          <div class="card-body p-4">
            <div class="p-3 border rounded d-flex align-items-center gap-3">
              <div
                class="bg-elevated border rounded text-secondary d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px"
              >
                <i class="bi bi-laptop fs-5" />
              </div>
              <div class="flex-grow-1">
                <div class="d-flex align-items-center gap-2 mb-1">
                  <div class="fw-bold text-primary fs-sm">Chrome on Windows</div>
                  <span class="badge bg-success-subtle text-success rounded-pill fw-medium fs-xs">Current</span>
                </div>
                <div class="text-tertiary fs-xs">New York • Active now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: all 0.2s ease;
}
.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06) !important;
}
</style>
