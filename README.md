# niceAdmin - Enterprise Nuxt 4 Administration Dashboard

![alt text](image.png)

![alt text](image-1.png)

A scalable, production-ready enterprise administration dashboard application built using **Nuxt 4** and **Vue 3**. This project strictly implements **Clean Architecture** principles to decouple business logic from the UI framework, enhancing code maintainability, testability, and long-term scalability.

---

## 🚀 Key Features

- **Nuxt 4 Architecture**: Built using the latest Nuxt 4 "App Directory" structure for superior code organization and performance.
- **Modern & Responsive Interface**: Elegant and responsive custom administration UI built on Bootstrap 5 and SCSS.
- **Robust State Management**: Globally integrated with **Pinia** & `pinia-plugin-persistedstate/nuxt` to handle user sessions and tokens automatically with hydration support.
- **Enterprise-Grade Security**: Structured for JWT-based authentication flows, protected with route guard middleware and a Roles & Permissions governance scheme.
- **Smart Form Handling**: Schema-driven form validation infrastructure powered by **VeeValidate** and **Zod**.
- **Dev-Ops & DX Ready**: Automated code quality enforcement using ESLint, Prettier, Husky, and Commitlint (Conventional Commits).

---

## 🛠️ Tech Stack

- **Framework**: Nuxt 4 / Vue 3 / TypeScript
- **State Management**: Pinia + pinia-plugin-persistedstate (Nuxt Module)
- **Styling Architecture**: Bootstrap 5 + SCSS
- **Validation Engine**: Zod + VeeValidate
- **HTTP Client Strategy**: Nuxt `$fetch` (Ofetch) with Repository Pattern
- **Testing Infrastructure**: Vitest + Vue Test Utils
- **Icons**: Bootstrap Icons
- **Static Code Analysis**: Nuxt ESLint Module, Prettier, Husky

---

## 📐 Clean Architecture & Project Structure (Nuxt 4)

In Nuxt 4, the primary code directory is located inside the `app/` folder. Application code is isolated into distinct layers:

```text
├── app/                        # 🖥️ Main Application Directory (Nuxt 4 Source)
│   ├── domain/                 # 🧠 Core Business Logic (Pure logic, framework-agnostic)
│   │   ├── entities/           # Interfaces and domain base models
│   │   └── services/           # Domain-specific workflow rules
│   │
│   ├── application/            # ⚙️ Application Use Cases (Identity orchestrator / shared)
│   │
│   ├── infrastructure/         # 🔌 External Implementation Layer
│   │   ├── api/                # Network abstraction & HTTP client
│   │   └── storage/            # Storage adapters (e.g., tokenStorage)
│   │
│   ├── stores/                 # 🗂️ Reactive Global State Store (Pinia)
│   │
│   ├── pages/                  # File-based routing system
│   ├── layouts/                # Component layout wrappers (Default, Auth)
│   ├── components/             # Reusable UI components
│   ├── composables/            # Native Vue Composition API logic
│   ├── middleware/             # Route-level interceptor guards
│   ├── plugins/                # Subsystem initialization (e.g., authRepository injection)
│   └── shared/                 # Shared utilities across layers
│
├── server/                     # 🖥️ Nitro Backend (Serverless API & Middleware)
├── assets/                     # 🎨 Compiled static assets (Images, SCSS overrides)
├── public/                     # 🌐 Static files served directly at root
├── tests/                      # 🧪 Testing Suite (Unit & Integration)
└── nuxt.config.ts              # ⚙️ Nuxt framework configuration
```

### Architectural Layer Rules:

1. **Domain Layer**: Core of the application. Has the highest stability with zero dependencies on UI frameworks or browser APIs.
2. **Application Layer**: Coordinates interactions between user intent and static Domain schemas.
3. **Infrastructure Layer**: Handles external communications (API calls, browser storage manipulation).
4. **Application/Presentation Layer**: Handles DOM rendering and consumes logic from Pinia stores.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18.x or later recommended)
- Package Manager: `npm`

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000/`.

### 3. Production Build

```bash
npm run build
npm run preview
```

---

## 🔑 Login Guide & Mock Authentication

For testing purposes without requiring a direct database connection, the application comes equipped with **Mock API (Nitro Server Endpoints)** and **Local Fallback Data**.

### Demo Login Credentials

- **Login Page URL**: `http://localhost:3000/auth/login`
- **Personal ID**: `1234567890`
- **Password**: `password`

---

### 📝 Step-by-Step Login Walkthrough:

1. **Run the Application**:
   Open a terminal and execute `npm run dev`.

2. **Open the Login Page**:
   Navigate to `http://localhost:3000/auth/login` in your browser. If you attempt to access `http://localhost:3000/` while unauthenticated, the middleware will automatically redirect you to the login page.

3. **Enter Credentials**:
   - In the **Personal ID** field, type: `1234567890`
   - In the **Password** field, type: `password`

4. **Click the Sign In Button**:
   - The application will send a request to the Mock API endpoint `POST /api/auth/login`.
   - The access token (`access_token`) will automatically be saved to Pinia state and browser cookies.
   - The application then calls `GET /api/v1/auth/me` to retrieve user data (`Test User`).

5. **Page Redirection & Route Guard Protection**:
   - Upon successful login, you will automatically be redirected to the **Dashboard** page (`http://localhost:3000/dashboard`).
   - **IMPORTANT**: As long as the authentication token is stored (until logout), users **CANNOT** navigate back to the login page (`http://localhost:3000/auth/login`). If a user attempts to manually type `/auth/login` in the browser URL bar, the middleware will automatically reject access and redirect them back to the Dashboard.

6. **Verify User Data**:
   The user's name (`Test User`) and Personal ID (`1234567890`) will be displayed in the **Header** (top right) and **Sidebar** (bottom left).

7. **Logout & Token Invalidation**:
   - To return to the login page or switch accounts, the user **MUST** log out to clear the stored token.
   - Logout can be performed by clicking the user profile in the top-right Header and selecting **Sign Out**, clicking the Logout icon in the Sidebar, or navigating directly to `http://localhost:3000/auth/logout`.
   - The logout process invokes the `POST /api/auth/logout` endpoint, clears the Pinia state and browser cookies, and redirects back to `/auth/login`.

---

### 📡 Mock API Endpoints (Demo JSON Data)

#### 1. Login Endpoint (`POST /api/auth/login`)

- **Request Body**:
  ```json
  {
    "id_personal": "1234567890",
    "password": "password"
  }
  ```
- **Response (HTTP 200 OK)**:
  ```json
  {
    "success": true,
    "responseCode": 200,
    "message": "User login successful",
    "data": {
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
      "token_type": "Bearer",
      "expires_in": 3600
    },
    "meta": null,
    "links": null
  }
  ```

#### 2. Get Current Authenticated User Endpoint (`GET /api/v1/auth/me`)

- **Header**: `Authorization: Bearer <access_token>`
- **Response (HTTP 200 OK)**:
  ```json
  {
    "success": true,
    "responseCode": 200,
    "message": "User fetched successfully",
    "data": {
      "id": 9,
      "username": "Test User",
      "id_personal": "1234567890",
      "verify_idpersonal": "2026-07-10 01:20:13",
      "password_show": "password",
      "codeuker": "6617",
      "id_wewenang": 1,
      "is_active": 1,
      "created_at": "2026-07-10T01:20:13.000000Z",
      "updated_at": "2026-07-10T01:20:13.000000Z"
    },
    "meta": null,
    "links": null
  }
  ```

#### 3. Logout Endpoint (`POST /api/auth/logout`)

- **Header**: `Authorization: Bearer <access_token>`
- **Response (HTTP 200 OK)**:
  ```json
  {
    "success": true,
    "responseCode": 200,
    "message": "User logged out successfully",
    "data": null,
    "meta": null,
    "links": null
  }
  ```

---

## 🧪 Unit Testing

Run the following command to execute the test suite:

```bash
npm run test
```

---

## 🔒 Automated Code Quality Enforcement

- **Husky & Lint-Staged**: Automatically runs ESLint and Prettier on staged files prior to committing.
- **Commitlint**: Ensures commit messages adhere to [Conventional Commits](https://www.conventionalcommits.org/) standards.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
