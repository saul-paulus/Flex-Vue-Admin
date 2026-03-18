# NiceAdmin Nuxt 3 App (Clean Architecture)

This project has been structured following **Clean Architecture** principles to separate concerns, improve maintainability, and ensure scalability.

## Directory Structure & Layering Mapping

```text
├── app/                        # 🖥️ App Layer (UI/Framework Entry)
│   ├── layouts/                # Layout (Default, Admin, Auth)
│   ├── pages/                  # Routing otomatis (SSR aware)
│   ├── components/             # UI Components (atomic design)
│   │   ├── ui/                 # Reusable Base Components
│   │   └── layout/             # Header, Sidebar, Footer components
│   ├── composables/            # Vue hooks (useAuth, useFetch, usePermission)
│   ├── middleware/             # Route guards (auth, role)
│   └── plugins/                # Plugin (axios, i18n, config)
│
├── domain/                     # 🧠 Business Core (PURE, no external deps)
│   ├── entities/               # Models/Types (User, Invoice)
│   ├── value-objects/          # Value objects (Email, Money)
│   └── services/               # Domain-specific logic
│
├── application/                # ⚙️ Use Cases (Application Logic)
│   ├── auth/                   # e.g., loginUser.ts, registerUser.ts
│   ├── finance/                # e.g., approveInvoice.ts
│   └── shared/                 # e.g., permissions logic
│
├── infrastructure/             # 🔌 External Implementation Layer (API, storage)
│   ├── api/                    # API services, endpoints abstraction
│   ├── storage/                # Local/Session storage handlers
│   └── adapters/               # Mapping backend API responses to domain entities
│
├── server/                     # 🖥️ Backend (Nuxt server API routes & Nitro backend)
│   ├── api/                    # Serverless endpoints (/api/*)
│   ├── middleware/             # Server middleware
│   └── services/               # Server-side business logic
│
├── store/                      # 🗂️ State Management (Pinia)
│   ├── auth.ts                 # Authentication store
│   ├── finance.ts              # Finance store
│   └── app.ts                  # Global app store
│
├── shared/                     # 🔁 Shared Utilities (Cross-layer usage)
│   ├── constants/              # Global constants
│   ├── utils/                  # Helper functions (date format, text transform)
│   └── types/                  # Global TypeScript Interfaces
│
├── assets/                     # 🎨 Static CSS, SCSS, and Images
├── public/                     # 🌐 Static files served at root path
├── nuxt.config.ts              # Nuxt configuration file
└── app.vue                     # Root Application Component
```

### Layer Descriptions

1. **Domain Layer (`/domain`)**: The innermost layer. It contains the business entities (models) and domain rules. This layer is pure and has zero dependencies on other parts of the system or external libraries.
2. **Application Layer (`/application`)**: The use cases. Contains business logic orchestration that handles taking data in, communicating with domain entities or outside adapters to perform a specific workflow (e.g., logging a user in).
3. **Infrastructure Layer (`/infrastructure`)**: Interacts with the outside world. Here are your API clients (`axios`/`$fetch`), browser storage interactions (`localStorage`, cookies), and adapters that map external data to your internal domain shapes.
4. **App Layer (`/app`)**: The UI and framework binding layer. Everything specific to Nuxt 3 and Vue belongs here. Pages, UI components, Composables, Layouts, and framework Plugins.
5. **Server Layer (`/server`)**: Contains Nuxt 3's built-in Nitro backend for API routes or Server-Side Rendering (SSR) functionality.
6. **Store Layer (`/store`)**: Pinia setup for state management. Acts as a bridge between UI reactivity and application use cases.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Enterprise Stack & Tooling

Starter kit ini telah dikonfigurasikan dengan ekosistem standar _Enterprise_ untuk menjamin kualitas dan stabilitas kode:

1. **Code Quality & Git Hooks**
   - **ESLint & Prettier**: Digunakan untuk validasi dan _formatting_ kode.
   - **Husky & Lint-Staged**: Memastikan kode selalu di-lint (`eslint --fix`) dan diformat (`prettier --write`) sebelum di-_commit_ (melalui _pre-commit hook_).
   - **Commitlint**: Memaksa penggunaan _Conventional Commits_ (contoh: `feat: add homepage`, `fix: header bug`) dengan _commit-msg hook_.

2. **UI Framework & Styling**
   - **Bootstrap 5**: _Framework_ UI global utama.
   - **SCSS Global**: Diikat melalui `app.scss` dan diregistrasikan ke dalam `nuxt.config.ts`. Override variabel _theme_ dapat dilakukan di `assets/scss/app.scss`.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```
