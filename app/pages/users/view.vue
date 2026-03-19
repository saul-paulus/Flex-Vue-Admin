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
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3"
    >
      <div>
        <h4
          class="mb-1 fw-bold"
          style="color: var(--title-color)"
        >
          User Command Profile
        </h4>
        <nav aria-label="breadcrumb">
          <ol
            class="breadcrumb mb-0 small"
            style="font-size: 0.8rem"
          >
            <li class="breadcrumb-item">
              <NuxtLink
                to="/"
                class="text-decoration-none text-muted"
              >Home</NuxtLink>
            </li>
            <li class="breadcrumb-item">
              <NuxtLink
                to="/users"
                class="text-decoration-none text-muted"
              >Users</NuxtLink>
            </li>
            <li
              class="breadcrumb-item active text-dark fw-medium"
              aria-current="page"
            >
              {{ user.name }}
            </li>
          </ol>
        </nav>
      </div>
      <div class="d-flex gap-2">
        <button
          class="btn btn-primary shadow-sm fw-medium px-3 d-flex align-items-center gap-2"
          style="background-color: var(--apple-blue); border-color: var(--apple-blue)"
        >
          <i class="bi bi-pencil" /> Edit User
        </button>
        <button
          class="btn btn-white border bg-white shadow-sm fw-medium px-3 d-flex align-items-center gap-2 text-danger"
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
        <div
          class="card border border-light shadow-sm bg-white"
          style="border-radius: var(--apple-radius)"
        >
          <div class="card-body p-4">
            <!-- Profile Info Row -->
            <div
              class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start mb-4 gap-3"
            >
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
                  <h4
                    class="fw-bolder mb-1"
                    style="color: var(--title-color)"
                  >
                    {{ user.name }}
                  </h4>
                  <p
                    class="text-muted mb-2"
                    style="font-size: 0.85rem"
                  >
                    {{ user.email }}
                  </p>
                  <div class="d-flex flex-wrap gap-2">
                    <span class="badge bg-light text-dark border px-2 py-1 fw-medium"><i class="bi bi-shield-check text-muted me-1" /> {{ user.role }}</span>
                    <span class="badge bg-light text-dark border px-2 py-1 fw-medium text-muted">{{
                      user.id
                    }}</span>
                    <span class="badge bg-light text-dark border px-2 py-1 fw-medium text-muted">{{
                      user.department
                    }}</span>
                  </div>
                </div>
              </div>
              <a
                href="#"
                class="text-decoration-none fw-medium d-none d-sm-flex align-items-center gap-1"
                style="font-size: 0.85rem; color: var(--apple-blue)"
              >
                Manage profile <i class="bi bi-chevron-right small" />
              </a>
            </div>

            <!-- Stats Row -->
            <div class="row g-3 mb-4">
              <div class="col-6 col-md-3">
                <div
                  class="p-3 border rounded-3 bg-light d-flex justify-content-between align-items-start h-100"
                >
                  <div>
                    <div
                      class="text-muted small text-uppercase fw-bold mb-1"
                      style="font-size: 0.65rem; letter-spacing: 0.5px"
                    >
                      LOGINS
                    </div>
                    <div
                      class="fw-bolder fs-5"
                      style="color: var(--title-color)"
                    >
                      156
                    </div>
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
                <div
                  class="p-3 border rounded-3 bg-light d-flex justify-content-between align-items-start h-100"
                >
                  <div>
                    <div
                      class="text-muted small text-uppercase fw-bold mb-1"
                      style="font-size: 0.65rem; letter-spacing: 0.5px"
                    >
                      TASKS CLOSED
                    </div>
                    <div
                      class="fw-bolder fs-5"
                      style="color: var(--title-color)"
                    >
                      42
                    </div>
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
                <div
                  class="p-3 border rounded-3 bg-light d-flex justify-content-between align-items-start h-100"
                >
                  <div>
                    <div
                      class="text-muted small text-uppercase fw-bold mb-1"
                      style="font-size: 0.65rem; letter-spacing: 0.5px"
                    >
                      PROJECTS
                    </div>
                    <div
                      class="fw-bolder fs-5"
                      style="color: var(--title-color)"
                    >
                      18
                    </div>
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
                <div
                  class="p-3 border rounded-3 bg-light d-flex justify-content-between align-items-start h-100"
                >
                  <div>
                    <div
                      class="text-muted small text-uppercase fw-bold mb-1"
                      style="font-size: 0.65rem; letter-spacing: 0.5px"
                    >
                      TEAMS
                    </div>
                    <div
                      class="fw-bolder fs-5"
                      style="color: var(--title-color)"
                    >
                      7
                    </div>
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
                <span
                  class="text-muted"
                  style="font-size: 0.85rem"
                >Phone</span>
                <span
                  class="fw-medium text-dark"
                  style="font-size: 0.85rem"
                >{{ user.phone }}</span>
              </div>
              <div class="col-12 col-md-6 d-flex justify-content-between border-bottom pb-2">
                <span
                  class="text-muted"
                  style="font-size: 0.85rem"
                >Location</span>
                <span
                  class="fw-medium text-dark"
                  style="font-size: 0.85rem"
                >{{
                  user.location
                }}</span>
              </div>
              <div class="col-12 col-md-6 d-flex justify-content-between pt-1">
                <span
                  class="text-muted"
                  style="font-size: 0.85rem"
                >Manager</span>
                <span
                  class="fw-medium text-dark"
                  style="font-size: 0.85rem"
                >{{
                  user.manager
                }}</span>
              </div>
              <div class="col-12 col-md-6 d-flex justify-content-between pt-1">
                <span
                  class="text-muted"
                  style="font-size: 0.85rem"
                >Joined</span>
                <span
                  class="fw-medium text-dark"
                  style="font-size: 0.85rem"
                >{{
                  user.joined
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Timeline -->
        <div
          class="card border border-light shadow-sm bg-white"
          style="border-radius: var(--apple-radius)"
        >
          <div class="card-header bg-white border-bottom p-4 pb-3">
            <h6
              class="fw-bold mb-0"
              style="color: var(--title-color)"
            >
              Activity Timeline
            </h6>
          </div>
          <div class="card-body p-4">
            <div class="timeline position-relative ms-2 pe-2 pb-2">
              <!-- Item 1 -->
              <div class="timeline-item position-relative pb-4 ps-4">
                <div
                  class="timeline-indicator position-absolute bg-success rounded-circle border border-2 border-white shadow-sm"
                  style="width: 12px; height: 12px; left: -6px; top: 4px"
                />
                <div
                  class="timeline-line position-absolute bg-light h-100"
                  style="width: 2px; left: -1px; top: 16px"
                />
                <h6
                  class="fw-bold mb-1"
                  style="font-size: 0.9rem; color: var(--title-color)"
                >
                  Logged In
                </h6>
                <p
                  class="text-muted mb-1"
                  style="font-size: 0.85rem"
                >
                  Chrome on Windows - New York, USA
                </p>
                <div
                  class="text-muted"
                  style="font-size: 0.75rem"
                >
                  Just now
                </div>
              </div>

              <!-- Item 2 -->
              <div class="timeline-item position-relative pb-4 ps-4">
                <div
                  class="timeline-indicator position-absolute rounded-circle border border-2 border-white shadow-sm"
                  style="
                    width: 12px;
                    height: 12px;
                    left: -6px;
                    top: 4px;
                    background-color: var(--apple-blue);
                  "
                />
                <div
                  class="timeline-line position-absolute bg-light h-100"
                  style="width: 2px; left: -1px; top: 16px"
                />
                <h6
                  class="fw-bold mb-1"
                  style="font-size: 0.9rem; color: var(--title-color)"
                >
                  Updated profile information
                </h6>
                <p
                  class="text-muted mb-1"
                  style="font-size: 0.85rem"
                >
                  Changed phone number and location
                </p>
                <div
                  class="text-muted"
                  style="font-size: 0.75rem"
                >
                  2 hours ago
                </div>
              </div>

              <!-- Item 3 -->
              <div class="timeline-item position-relative pb-4 ps-4">
                <div
                  class="timeline-indicator position-absolute bg-warning rounded-circle border border-2 border-white shadow-sm"
                  style="width: 12px; height: 12px; left: -6px; top: 4px"
                />
                <div
                  class="timeline-line position-absolute bg-light h-100"
                  style="width: 2px; left: -1px; top: 16px"
                />
                <h6
                  class="fw-bold mb-1"
                  style="font-size: 0.9rem; color: var(--title-color)"
                >
                  Enabled Two-Factor Authentication
                </h6>
                <p
                  class="text-muted mb-1"
                  style="font-size: 0.85rem"
                >
                  Using authenticator app
                </p>
                <div
                  class="text-muted"
                  style="font-size: 0.75rem"
                >
                  Yesterday at 3:45 PM
                </div>
              </div>

              <!-- Item 4 -->
              <div class="timeline-item position-relative pb-4 ps-4">
                <div
                  class="timeline-indicator position-absolute bg-primary rounded-circle border border-2 border-white shadow-sm"
                  style="width: 12px; height: 12px; left: -6px; top: 4px"
                />
                <div
                  class="timeline-line position-absolute bg-light h-100"
                  style="width: 2px; left: -1px; top: 16px"
                />
                <h6
                  class="fw-bold mb-1"
                  style="font-size: 0.9rem; color: var(--title-color)"
                >
                  Joined Engineering team
                </h6>
                <p
                  class="text-muted mb-1"
                  style="font-size: 0.85rem"
                >
                  Added by Chris Thompson
                </p>
                <div
                  class="text-muted"
                  style="font-size: 0.75rem"
                >
                  3 days ago
                </div>
              </div>

              <!-- Item 5 -->
              <div class="timeline-item position-relative ps-4">
                <div
                  class="timeline-indicator position-absolute bg-success rounded-circle border border-2 border-white shadow-sm"
                  style="width: 12px; height: 12px; left: -6px; top: 4px"
                />
                <h6
                  class="fw-bold mb-1"
                  style="font-size: 0.9rem; color: var(--title-color)"
                >
                  Completed 5 tasks in Project Alpha
                </h6>
                <p
                  class="text-muted mb-1"
                  style="font-size: 0.85rem"
                >
                  Sprint v2 milestone reached
                </p>
                <div
                  class="text-muted"
                  style="font-size: 0.75rem"
                >
                  5 days ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-12 col-xl-4 d-flex flex-column gap-4">
        <!-- Account Health Card -->
        <div
          class="card border border-light shadow-sm bg-white"
          style="border-radius: var(--apple-radius)"
        >
          <div class="card-header bg-white border-bottom p-4 pb-3">
            <h6
              class="fw-bold mb-0"
              style="color: var(--title-color)"
            >
              Account Health
            </h6>
          </div>
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span
                class="text-muted"
                style="font-size: 0.85rem"
              >Status</span>
              <span
                class="fw-medium text-dark"
                style="font-size: 0.85rem"
              >Active</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span
                class="text-muted"
                style="font-size: 0.85rem"
              >Email Verification</span>
              <span
                class="fw-medium text-success d-flex align-items-center gap-1"
                style="font-size: 0.85rem"
              >
                <i class="bi bi-check-circle-fill" /> Verified
              </span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span
                class="text-muted"
                style="font-size: 0.85rem"
              >2FA</span>
              <span
                class="fw-medium text-success d-flex align-items-center gap-1"
                style="font-size: 0.85rem"
              >
                <i class="bi bi-shield-check" /> Enabled
              </span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span
                class="text-muted"
                style="font-size: 0.85rem"
              >Last Login</span>
              <span
                class="fw-medium text-dark"
                style="font-size: 0.85rem"
              >Just now</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <span
                class="text-muted"
                style="font-size: 0.85rem"
              >Risk Score</span>
              <span
                class="fw-medium text-dark"
                style="font-size: 0.85rem"
              >Low</span>
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
                  <div
                    class="fw-bold"
                    style="font-size: 0.85rem; color: var(--title-color)"
                  >
                    Engineering
                  </div>
                  <div
                    class="text-muted"
                    style="font-size: 0.75rem"
                  >
                    12 members
                  </div>
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
                  <div
                    class="fw-bold"
                    style="font-size: 0.85rem; color: var(--title-color)"
                  >
                    Product
                  </div>
                  <div
                    class="text-muted"
                    style="font-size: 0.75rem"
                  >
                    5 members
                  </div>
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
                  <div
                    class="fw-bold"
                    style="font-size: 0.85rem; color: var(--title-color)"
                  >
                    Design
                  </div>
                  <div
                    class="text-muted"
                    style="font-size: 0.75rem"
                  >
                    8 members
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Access Rights Card -->
        <div
          class="card border border-light shadow-sm bg-white"
          style="border-radius: var(--apple-radius)"
        >
          <div class="card-header bg-white border-bottom p-4 pb-3">
            <h6
              class="fw-bold mb-0"
              style="color: var(--title-color)"
            >
              Access Rights
            </h6>
          </div>
          <div class="card-body p-4">
            <div
              class="alert alert-info bg-primary-subtle text-primary border-primary border-opacity-25 py-2 px-3 d-flex align-items-start gap-2 mb-3"
              style="font-size: 0.8rem"
            >
              <i class="bi bi-info-circle mt-1" />
              <div>
                Admin role with full system scope. Managed via
                <a
                  href="#"
                  class="text-primary fw-medium"
                >Roles &amp; Permissions</a>.
              </div>
            </div>

            <ul
              class="list-unstyled mb-0"
              style="font-size: 0.85rem"
            >
              <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span class="text-dark">Dashboard</span> <i class="bi bi-check2 text-success" />
              </li>
              <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span class="text-dark">Users</span> <i class="bi bi-check2 text-success" />
              </li>
              <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span class="text-dark">Roles</span> <i class="bi bi-check2 text-success" />
              </li>
              <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span class="text-dark">Settings</span> <i class="bi bi-check2 text-success" />
              </li>
              <li class="d-flex justify-content-between align-items-center py-2">
                <span class="text-dark">Reports</span> <i class="bi bi-check2 text-success" />
              </li>
            </ul>
          </div>
        </div>

        <!-- Active Sessions Card -->
        <div
          class="card border border-light shadow-sm bg-white"
          style="border-radius: var(--apple-radius)"
        >
          <div class="card-header bg-white border-bottom p-4 pb-3">
            <h6
              class="fw-bold mb-0"
              style="color: var(--title-color)"
            >
              Active Sessions
            </h6>
          </div>
          <div class="card-body p-4">
            <div class="p-3 border rounded d-flex align-items-center gap-3">
              <div
                class="bg-light border rounded text-muted d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px"
              >
                <i class="bi bi-laptop fs-5" />
              </div>
              <div class="flex-grow-1">
                <div class="d-flex align-items-center gap-2 mb-1">
                  <div
                    class="fw-bold"
                    style="font-size: 0.85rem; color: var(--title-color)"
                  >
                    Chrome on Windows
                  </div>
                  <span
                    class="badge bg-success-subtle text-success rounded-pill fw-medium"
                    style="font-size: 0.65rem"
                  >Current</span>
                </div>
                <div
                  class="text-muted"
                  style="font-size: 0.75rem"
                >
                  New York • Active now
                </div>
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
