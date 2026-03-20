# flexAdmin - Enterprise Nuxt 3 Administrative Dashboard

A scalable, production-ready, and enterprise-grade administrative dashboard application built with **Nuxt 3** and **Vue 3**. This project strictly enforces **Clean Architecture** principles to separate business logic from UI frameworks, improving maintainability, enhancing testability, and ensuring long-term scalability across complex enterprise requirements.

## 🚀 Key Features

- **Modern & Responsive Interface**: Custom, highly polished administrative interface engineered with Bootstrap 5 and SCSS, optimized for cross-device consistency.
- **Robust State Management**: Integrated **Pinia** globally with `pinia-plugin-persistedstate` to securely handle user sessions, tokens, and volatile UI states synchronously.
- **Enterprise-Grade Security & Identity**: Fully structured mockups and architectural scaffolds for JWT-based authentication flows, route middleware protection, and granular internal Roles & Permissions matrices.
- **Intelligent Form Handling**: Infrastructure ready for asynchronous form state management powered by **VeeValidate**, seamlessly coupled with strict runtime schema validations utilizing **Zod**.
- **Dev-Ops & DX Ready**: Code quality is mathematically enforced by automation. Pre-configured with ESLint, Prettier, Husky, and Commitlint blocking irregular push payloads via Conventional Commits.
- **High-Performance Execution**: Leverages Nuxt 3's hybrid rendering methodologies alongside the edge-ready, serverless Nitro backend capability.

## 🛠️ Technology Stack

- **Framework**: Nuxt 3 / Vue 3 / TypeScript
- **State Machine**: Pinia
- **Styling Architecture**: Vanilla SCSS wrapping Bootstrap 5 structure (avoiding CSS bloat through deep class overriding).
- **Validation Rules engine**: Zod + VeeValidate
- **HTTP Client Strategy**: Nuxt `$fetch` (Ofetch) layered with custom frontend interceptors.
- **Test Infrastructure**: Vitest + Vue Test Utils
- **Icons**: Bootstrap Icons
- **Static Code Analysis**: Nuxt ESLint Module, Prettier, Husky, Lint-Staged

## 📐 Clean Architecture & Project Structure

The codebase is surgically divided into isolated layers to guarantee that the core business domain rules remain pure and decoupled from framework lifecycle hooks or external APIs.

```text
├── app/                        # 🖥️ Presentation Layer (UI & Framework Binding)
│   ├── layouts/                # Component layout wrappers (Default Admin, Auth)
│   ├── pages/                  # File-based routing systems
│   ├── components/             # Reusable UI molecules & organisms (Sidebar, Header)
│   ├── composables/            # Native Vue Composition API logic containers
│   ├── middleware/             # Route-level interception guards
│   └── plugins/                # Subsystem initialization & injection routines
│
├── domain/                     # 🧠 Business Core (Pure logic, zero dependencies)
│   ├── entities/               # Foundational interfaces and models
│   ├── value-objects/          # Immutable properties (e.g., Email, Verification)
│   └── services/               # Universal domain-specific workflow rules
│
├── application/                # ⚙️ Application Use Cases
│   ├── auth/                   # Identity workflow orchestrators
│   └── shared/                 # Reusable logic orchestrators across modules
│
├── infrastructure/             # 🔌 External Implementation Layer
│   ├── api/                    # HTTP client network abstractions and interceptors
│   ├── storage/                # Cookie and LocalStorage persistence adaptors
│   └── adapters/               # Transformers morphing external JSON to Domain Entities
│
├── server/                     # 🖥️ Built-in Backend / Nitro Routes
│   ├── api/                    # Serverless APIs providing secure backend functionality
│   └── middleware/             # Backend request interceptors
│
├── store/                      # 🗂️ Reactive Global State Stores (Pinia)
├── shared/                     # 🔁 Utilities strictly cross-shared among boundaries
├── assets/                     # 🎨 Static compilable assets (Images, SCSS overrides)
└── public/                     # 🌐 Static files served natively at the network root
```

### Architectural Stratification Rules:

1. **Domain Layer**: The absolute core. Possesses maximum stability. It knows absolutely nothing about Vue, Nuxt, external APIs, or the browser DOM.
2. **Application Layer**: Coordinates sequential interactions between the user's intent, external sources, and the static Domain schemas.
3. **Infrastructure Layer**: Touches the unpredictable outside world. Contains data fetching libraries, browser APIs manipulation, and data schema normalization.
4. **App (Presentation) Layer**: The visual endpoint. Exclusively handles DOM rendering, consumes coordinated logic from the Application layer, and listens to Vue reactivity via Pinia.

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18.x or newer recommended)
- Package Managers: `npm`, `pnpm`, or `yarn`

### Installation

Clone the repository and securely install the lock-file dependencies:

```bash
npm install
# or
pnpm install
```

### Development Environment

Spin up the development server featuring Vite-powered Hot Module Replacement (HMR). Provide instantaneous code-state feedback locally at `http://localhost:3000`.

```bash
npm run dev
# or
pnpm dev
```

### Production Build Sequence

Bake the application into a highly optimized, fully minified production artifact using the Nitro compiler.

```bash
# Execute the production payload compilation
npm run build

# Boot a localized production server to preview edge-rendering behavior
npm run preview
```

## 🧪 Testing Coverage

The application aims for robust testing coverage leveraging parallelized native tests via **Vitest** for all Pure functions and Domain logic.

```bash
# Execute the Vitest test suite
npm run test
```

## 🔒 Automated Code Quality Enforcement

This repository implements **Husky** out of the box to defensively hijack vulnerable actions before merging code.

- **Pre-commit Trigger**: Fires **lint-staged**, aggressively auditing modified `.vue` and `.ts` files synchronously utilizing the ESLint and Prettier config matrix to halt syntactically flawed code.
- **Commit-msg Trigger**: Evaluates text input through **Commitlint**, assuring your log history remains semantically deterministic and adheres accurately to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.
