# niceAdmin - Enterprise Nuxt 4 Administrative Dashboard

A scalable, production-ready, and enterprise-grade administrative dashboard application built with **Nuxt 4** and **Vue 3**. This project strictly enforces **Clean Architecture** principles to separate business logic from UI frameworks, improving maintainability, enhancing testability, and ensuring long-term scalability.

## 🚀 Key Features

- **Nuxt 4 Architecture**: Leverages the latest Nuxt 4 "App Directory" structure for better organization and performance.
- **Modern & Responsive Interface**: Custom, highly polished administrative interface engineered with Bootstrap 5 and SCSS.
- **Robust State Management**: Integrated **Pinia** globally with `pinia-plugin-persistedstate/nuxt` to handle user sessions and tokens with automatic hydration support.
- **Enterprise-Grade Security**: Structured for JWT-based authentication flows, with route middleware protection and architectural scaffolds for Roles & Permissions.
- **Intelligent Form Handling**: Infrastructure powered by **VeeValidate** and **Zod** for schema-based validation.
- **Dev-Ops & DX Ready**: Mathematical enforcement of code quality with ESLint, Prettier, Husky, and Commitlint (Conventional Commits).

## 🛠️ Technology Stack

- **Framework**: Nuxt 4 / Vue 3 / TypeScript
- **State Machine**: Pinia + pinia-plugin-persistedstate (Nuxt Module)
- **Styling Architecture**: Bootstrap 5 + Vanilla SCSS
- **Validation Rules Engine**: Zod + VeeValidate
- **HTTP Client Strategy**: Nuxt `$fetch` (Ofetch) with repository pattern
- **Test Infrastructure**: Vitest + Vue Test Utils
- **Icons**: Bootstrap Icons
- **Static Code Analysis**: Nuxt ESLint Module, Prettier, Husky

## 📐 Clean Architecture & Project Structure (Nuxt 4)

In Nuxt 4, the source directory is moved into the `app/` folder. The codebase is surgically divided into isolated layers:

```text
├── app/                        # 🖥️ Main App Directory (Nuxt 4 Source)
│   ├── domain/                 # 🧠 Business Core (Pure logic, zero dependencies)
│   │   ├── entities/           # Foundational interfaces and models
│   │   └── services/           # Universal domain-specific workflow rules
│   │
│   ├── application/            # ⚙️ Application Use Cases (Identity/Shared orchestrators)
│   │
│   ├── infrastructure/         # 🔌 External Implementation Layer
│   │   ├── api/                # HTTP client network abstractions
│   │   └── storage/            # persistence adaptors (e.g., tokenStorage)
│   │
│   ├── stores/                 # 🗂️ Reactive Global State Stores (Pinia)
│   │
│   ├── pages/                  # File-based routing systems
│   ├── layouts/                # Component layout wrappers (Default, Auth)
│   ├── components/             # Reusable UI molecules & organisms
│   ├── composables/            # Native Vue Composition API logic
│   ├── middleware/             # Route-level interception guards
│   ├── plugins/                # Subsystem initialization (e.g., authRepository injection)
│   └── shared/                 # Utilities cross-shared among boundaries
│
├── server/                     # 🖥️ Nitro Backend (Serverless APIs & Middleware)
├── assets/                     # 🎨 Static compilable assets (Images, SCSS overrides)
├── public/                     # 🌐 Static files served natively at root
├── tests/                      # 🧪 Test suite (Standard unit & integration)
└── nuxt.config.ts              # ⚙️ Framework configuration
```

### Architectural Stratification Rules:

1. **Domain Layer**: The absolute core. Possesses maximum stability. No dependencies on UI frameworks or browser APIs.
2. **Application Layer**: Coordinates interactions between the user's intent and the static Domain schemas.
3. **Infrastructure Layer**: Handles the outside world (API calls, browser storage manipulation).
4. **App/Presentation Layer**: Handles DOM rendering and consumes coordinated logic from Pinia stores.

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18.x or newer recommended)
- Package Manager: `npm`

### Installation

```bash
npm install
```

### Development Environment

```bash
npm run dev
```

### Production Build Sequence

```bash
npm run build
npm run preview
```

## 🧪 Testing Coverage

```bash
npm run test
```

## 🔒 Automated Code Quality Enforcement

- **Husky & Lint-Staged**: Runs ESLint and Prettier on staged files before commit.
- **Commitlint**: Enforces [Conventional Commits](https://www.conventionalcommits.org/).
