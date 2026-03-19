<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="row g-0 vh-100 overflow-hidden">
    <!-- Left Column: Branding (Hidden on small screens) -->
    <div
      class="col-lg-5 col-xl-4 d-none d-lg-flex flex-column text-white p-5 position-relative"
      style="background-color: var(--primary-color-1)"
    >
      <!-- Brand Logo -->
      <div class="mb-5 d-flex align-items-center gap-2">
        <i class="bi bi-heptagon-half fs-4" />
        <h4 class="mb-0 fw-bold letter-spacing-1">
          niceAdmin
        </h4>
        <span
          class="badge rounded-pill fw-bold ms-2"
          style="
            background-color: rgba(255, 255, 255, 0.15);
            color: #fff;
            font-size: 0.6rem;
            letter-spacing: 0.5px;
          "
        >WORKSPACE INTELLIGENCE</span>
      </div>

      <!-- Left Text Content -->
      <div class="mt-auto mb-auto pe-4">
        <h1
          class="fw-bolder mb-4"
          style="line-height: 1.25; font-size: 2.2rem"
        >
          Command your operations from one modern control center.
        </h1>
        <p
          class="mb-5"
          style="max-width: 400px; line-height: 1.6; font-size: 0.95rem; opacity: 0.85"
        >
          Track growth, team activity, and operational risk with a dashboard built for fast
          decisions.
        </p>

        <!-- Feature List -->
        <ul
          class="list-unstyled d-flex flex-column gap-3 small"
          style="opacity: 0.85"
        >
          <li class="d-flex align-items-center gap-3">
            <i class="bi bi-check2-circle fs-5" />
            <span class="fw-medium">Real-time business insights</span>
          </li>
          <li class="d-flex align-items-center gap-3">
            <i class="bi bi-shield-check fs-5" />
            <span class="fw-medium">Enterprise-grade account protection</span>
          </li>
          <li class="d-flex align-items-center gap-3">
            <i class="bi bi-lightning-charge fs-5" />
            <span class="fw-medium">Fast collaboration workflows</span>
          </li>
        </ul>
      </div>

      <!-- Decorative Background Elements (Optional) -->
      <div
        class="position-absolute bottom-0 end-0 overflow-hidden"
        style="width: 100%; height: 50%; z-index: 0; opacity: 0.05; pointer-events: none"
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          class="position-absolute end-0 bottom-0 w-100 h-100"
          style="transform: scale(2) translate(20%, 20%)"
        >
          <circle
            cx="100"
            cy="100"
            r="100"
            fill="white"
          />
        </svg>
      </div>
    </div>

    <!-- Right Column: Login Form -->
    <div
      class="col-12 col-lg-7 col-xl-8 d-flex align-items-center justify-content-center position-relative overflow-y-auto"
      style="background-color: var(--muted-bg)"
    >
      <div
        class="w-100 px-4 py-5 px-md-5 d-flex flex-column align-items-center justify-content-center"
        style="max-width: 520px; min-height: 100%"
      >
        <!-- Card Container -->
        <div
          class="card border-0 shadow-lg bg-white w-100 mb-4"
          style="border-radius: var(--apple-radius, 16px)"
        >
          <div class="card-body p-4 p-md-5">
            <!-- Header -->
            <div class="text-center mb-4 pb-2">
              <h3
                class="fw-bold mb-2"
                style="color: var(--title-color)"
              >
                Welcome back
              </h3>
              <p
                class="text-muted small"
                style="font-size: 0.85rem"
              >
                Sign in to continue to your niceAdmin workspace.
              </p>
            </div>

            <!-- Card Form -->
            <form @submit.prevent>
              <!-- Email -->
              <div class="mb-3">
                <label
                  class="form-label fw-bold small mb-1"
                  style="color: var(--secondary-color-text)"
                >Email address</label>
                <input
                  type="email"
                  class="form-control form-control-lg border-light bg-light custom-input"
                  placeholder="name@example.com"
                  required
                >
              </div>

              <!-- Password -->
              <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <label
                    class="form-label fw-bold small mb-0"
                    style="color: var(--secondary-color-text)"
                  >Password</label>
                  <a
                    href="#"
                    class="text-decoration-none small fw-medium text-accent"
                  >Forgot password?</a>
                </div>
                <div class="input-group">
                  <input
                    type="password"
                    class="form-control form-control-lg border-light border-end-0 bg-light custom-input"
                    placeholder="Enter your password"
                    required
                  >
                  <button
                    class="btn border-light border-start-0 bg-light text-muted px-3"
                    type="button"
                    tabindex="-1"
                  >
                    <i class="bi bi-eye" />
                  </button>
                </div>
              </div>

              <!-- Options -->
              <div class="d-flex justify-content-between align-items-center mb-4 pt-1">
                <div class="form-check mb-0">
                  <input
                    id="rememberMe"
                    class="form-check-input"
                    type="checkbox"
                  >
                  <label
                    class="form-check-label small text-muted pt-1"
                    for="rememberMe"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  class="text-decoration-none small fw-medium text-accent"
                >Use SSO screen</a>
              </div>

              <!-- Submit Button -->
              <button
                class="btn text-white w-100 py-3 mb-4 fw-medium shadow-sm rounded-3 btn-accent"
                type="submit"
                style="font-size: 0.95rem; letter-spacing: 0.3px"
              >
                Sign In
              </button>

              <!-- Divider -->
              <div class="d-flex align-items-center mb-4">
                <hr class="flex-grow-1 border-light">
                <span
                  class="px-3 small text-muted"
                  style="font-size: 0.75rem"
                >or continue with</span>
                <hr class="flex-grow-1 border-light">
              </div>

              <!-- Social Logins -->
              <div class="row g-3 mb-4">
                <div class="col-6">
                  <button
                    class="btn btn-white border w-100 text-dark fw-medium d-flex align-items-center justify-content-center gap-2 py-2 btn-social"
                  >
                    <i class="bi bi-google text-danger" />
                    <span
                      class="small"
                      style="font-size: 0.85rem"
                    >Google</span>
                  </button>
                </div>
                <div class="col-6">
                  <button
                    class="btn btn-white border w-100 text-dark fw-medium d-flex align-items-center justify-content-center gap-2 py-2 btn-social"
                  >
                    <i class="bi bi-github" />
                    <span
                      class="small"
                      style="font-size: 0.85rem"
                    >GitHub</span>
                  </button>
                </div>
              </div>

              <div class="text-center small">
                <span class="text-muted">Don't have an account?</span>
                <a
                  href="#"
                  class="text-decoration-none fw-medium text-accent ms-1"
                >Create one</a>
              </div>
            </form>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="text-center text-muted"
          style="font-size: 0.75rem"
        >
          <p class="mb-2">
            © 2024 niceAdmin. All rights reserved.
          </p>
          <div class="mb-2">
            <a
              href="#"
              class="text-decoration-none text-muted mx-1 text-hover-dark"
            >Privacy</a>
            &bull;
            <a
              href="#"
              class="text-decoration-none text-muted mx-1 text-hover-dark"
            >Terms</a>
            &bull;
            <a
              href="#"
              class="text-decoration-none text-muted mx-1 text-hover-dark"
            >Help</a>
          </div>
          <div>
            Designed by <a
              href="#"
              class="text-decoration-none text-accent"
            >BootstrapMade</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Theme-bound variables derived from user's root CSS */
.text-accent {
  color: var(--accent) !important;
}
.btn-accent {
  background-color: var(--accent) !important;
  border-color: var(--accent) !important;
  transition: all 0.2s ease;
}
.btn-accent:hover {
  filter: brightness(0.9);
  transform: translateY(-1px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.custom-input {
  font-size: 0.95rem;
  transition: all 0.2s ease;
}
.custom-input:focus {
  background-color: #fff !important;
  border-color: var(--accent);
  box-shadow: 0 0 0 0.25rem rgba(37, 99, 235, 0.15); /* generic blueish halo based on Tailwind blue */
  outline: none;
}
.input-group:focus-within .btn {
  background-color: #fff !important;
  border-color: var(--accent);
}
.input-group:focus-within .custom-input {
  border-right-color: transparent !important;
}

.border-light {
  border-color: #e2e8f0 !important;
}

.btn-social {
  transition: background-color 0.2s;
}
.btn-social:hover {
  background-color: var(--row-hover);
}

.text-hover-dark:hover {
  color: var(--title-color) !important;
}
</style>
