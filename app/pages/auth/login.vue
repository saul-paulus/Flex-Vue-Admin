<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
definePageMeta({
  layout: 'auth',
});

const payloadCredential = reactive({
  id_personal: '',
  password: '',
});
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const isFormValidated = ref(false);
const errorMessages = ref('');

const router = useRouter();

const handleSubmitLogin = async (event: Event) => {
  const form = event.target as HTMLFormElement;

  if (!form.checkValidity()) {
    isFormValidated.value = true;
    return;
  }

  isFormValidated.value = false;
  errorMessages.value = '';
  isLoading.value = true;

  try {
    await authStore.fetchAuthlogin(payloadCredential);
    router.push('/');
  } catch (error: any) {
    errorMessages.value = error?.data?.message || error?.message || String(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="row g-0 vh-100 overflow-hidden">
    <!-- Left Column: Branding -->
    <div
      class="col-lg-5 col-xl-4 d-none d-lg-flex flex-column text-white p-4 position-relative overflow-hidden"
      style="background: linear-gradient(135deg, #020202 0%, #0a0a0c 100%)"
    >
      <div class="mb-5 d-flex align-items-center gap-2 position-relative" style="z-index: 2">
        <i class="bi bi-heptagon-half fs-5" />
        <h5 class="mb-0 fw-bold letter-spacing-1">flexVueAdmin</h5>
        <span
          class="badge rounded-pill fw-bold ms-2 bg-white bg-opacity-10 text-white border-0 fs-xs"
          style="letter-spacing: 0.5px"
          >PRO</span
        >
      </div>
      <div class="mt-auto mb-auto pe-4 position-relative" style="z-index: 2">
        <h2 class="fw-bolder mb-3" style="line-height: 1.25; font-size: 1.8rem">
          Command your operations from one modern control center.
        </h2>
        <p class="mb-4 text-white text-opacity-75 small" style="max-width: 380px; line-height: 1.6">
          Track growth, team activity, and operational risk with a dashboard built for fast decisions.
        </p>
        <ul class="list-unstyled d-flex flex-column gap-2 fs-sm text-white text-opacity-75">
          <li class="d-flex align-items-center gap-2">
            <i class="bi bi-check2-circle" />
            <span class="fw-medium">Real-time business insights</span>
          </li>
          <li class="d-flex align-items-center gap-2">
            <i class="bi bi-shield-check" />
            <span class="fw-medium">Enterprise-grade protection</span>
          </li>
          <li class="d-flex align-items-center gap-2">
            <i class="bi bi-lightning-charge" />
            <span class="fw-medium">Fast collaboration workflows</span>
          </li>
        </ul>
      </div>
      <div
        class="position-absolute translate-middle"
        style="
          top: 30%;
          left: 0%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(10, 132, 255, 0.15) 0%, transparent 70%);
          filter: blur(40px);
          z-index: 1;
        "
      ></div>
    </div>
    <!-- Right Column: Login Form -->
    <div
      class="col-12 col-lg-7 col-xl-8 d-flex align-items-center justify-content-center position-relative overflow-y-auto"
      style="background-color: var(--bg-grouped)"
    >
      <div
        class="w-100 px-3 py-5 d-flex flex-column align-items-center justify-content-center"
        style="max-width: 400px; min-height: 100%"
      >
        <div
          class="card border shadow-lg bg-elevated w-100 mb-4 login-card h-auto"
          style="border-radius: var(--radius-md) !important"
        >
          <div class="card-body p-4">
            <div class="text-center mb-4">
              <h4 class="fw-bold mb-1 text-primary">Welcome back</h4>
              <p class="text-secondary fs-xs mb-0">Sign in to continue to your flexVueAdmin workspace.</p>
            </div>
            <div
              v-if="errorMessages"
              class="alert alert-danger border-0 mb-4 shadow-sm py-2 px-3 text-center"
              style="border-radius: var(--radius-sm)"
            >
              <div class="d-flex align-items-center justify-content-center gap-2">
                <i class="bi bi-exclamation-triangle-fill fs-sm"></i>
                <div class="fs-xs fw-medium">{{ errorMessages }}</div>
              </div>
            </div>
            <form
              class="needs-validation"
              :class="{ 'was-validated': isFormValidated }"
              novalidate
              @submit.prevent="handleSubmitLogin"
            >
              <div class="mb-3">
                <label class="form-label fw-bold fs-xs text-secondary mb-1">Id Personal</label>
                <input
                  v-model="payloadCredential.id_personal"
                  type="text"
                  class="form-control fs-md border bg-grouped custom-input"
                  placeholder="00710XXXX"
                  required
                />
                <div class="invalid-feedback fs-xs">
                  <i class="bi bi-exclamation-circle me-1"></i>
                  <span>Invalid Id Personal</span>
                </div>
              </div>
              <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <label class="form-label fw-bold fs-xs text-secondary mb-0">Password</label>
                  <a href="#" class="text-decoration-none fs-xs fw-medium text-accent">Forgot?</a>
                </div>
                <div class="input-group">
                  <input
                    v-model="payloadCredential.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control fs-md border border-end-0 bg-grouped custom-input"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    class="btn border border-start-0 bg-grouped text-muted px-2 py-0"
                    type="button"
                    tabindex="-1"
                    @click="showPassword = !showPassword"
                  >
                    <i :class="showPassword ? 'bi bi-eye-slash fs-sm' : 'bi bi-eye fs-sm'" />
                  </button>
                  <div class="invalid-feedback fs-xs">
                    <i class="bi bi-exclamation-circle me-1"></i>
                    <span>Password required</span>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="form-check mb-0">
                  <input id="rememberMe" v-model="rememberMe" class="form-check-input" type="checkbox" required />
                  <label class="form-check-label fs-xs text-secondary pt-1" for="rememberMe">Remember me</label>
                  <div class="invalid-feedback fs-xs">
                    <i class="bi bi-exclamation-circle me-1"></i>
                    <span>Remember me required</span>
                  </div>
                </div>
                <a href="#" class="text-decoration-none fs-xs fw-medium text-accent">Use SSO</a>
              </div>
              <div class="mb-1">
                <button
                  v-if="!isLoading"
                  class="btn btn-primary w-100 py-2 mb-4 fw-bold shadow-sm rounded-md fs-md"
                  type="submit"
                >
                  Sign In
                </button>
                <button
                  v-else
                  type="submit"
                  class="btn btn-primary w-100 py-2 mb-4 fw-bold shadow-sm rounded-md fs-md"
                  disabled
                >
                  <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                  Sign In...
                </button>
              </div>
              <div class="d-flex align-items-center mb-4">
                <hr class="flex-grow-1 border opacity-50" />
                <span class="px-3 text-tertiary fs-xs uppercase letter-spacing-1">OR</span>
                <hr class="flex-grow-1 border opacity-50" />
              </div>
              <div class="row g-2 mb-4">
                <div class="col-6">
                  <button
                    type="button"
                    class="btn btn-white border w-100 d-flex align-items-center justify-content-center gap-2 py-2 fs-xs fw-semibold bg-elevated text-primary"
                  >
                    <i class="bi bi-google text-danger fs-sm" />
                    Google
                  </button>
                </div>
                <div class="col-6">
                  <button
                    type="button"
                    class="btn btn-white border w-100 d-flex align-items-center justify-content-center gap-2 py-2 fs-xs fw-semibold bg-elevated text-primary"
                  >
                    <i class="bi bi-github fs-sm" />
                    GitHub
                  </button>
                </div>
              </div>
              <div class="text-center fs-xs">
                <span class="text-secondary">Don't have an account?</span>
                <a href="#" class="text-decoration-none fw-bold text-accent ms-1">Create one</a>
              </div>
            </form>
          </div>
        </div>
        <div class="text-center text-tertiary fs-xs">
          <p class="mb-2">© 2024 flexVueAdmin &bull; Workspace Intelligence</p>
          <div class="d-flex justify-content-center gap-2">
            <a href="#" class="text-decoration-none text-tertiary text-hover-dark">Privacy</a>
            <span class="opacity-25">|</span>
            <a href="#" class="text-decoration-none text-tertiary text-hover-dark">Terms</a>
            <span class="opacity-25">|</span>
            <a href="#" class="text-decoration-none text-tertiary text-hover-dark">Support</a>
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

.login-card {
  backdrop-filter: blur(25px) saturate(200%);
  -webkit-backdrop-filter: blur(25px) saturate(200%);
  background: rgba(var(--bg-elevated-rgb, 255, 255, 255), 0.8) !important;
  transition: all 0.3s ease;
}

[data-bs-theme='dark'] .login-card {
  background: rgba(28, 28, 30, 0.75) !important;
}

.custom-input {
  transition: all 0.2s ease;
}

.custom-input:focus {
  background-color: var(--bg-elevated) !important;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.15);
  outline: none;
}

.input-group:focus-within .btn {
  background-color: var(--bg-elevated) !important;
  border-color: var(--accent);
}

.input-group:focus-within .custom-input {
  border-right-color: transparent !important;
}

.text-hover-dark:hover {
  color: var(--text-primary) !important;
}

.uppercase {
  text-transform: uppercase;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}
</style>
