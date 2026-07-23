# niceAdmin - Dashboard Administrasi Enterprise Nuxt 4

Aplikasi dashboard administrasi tingkat enterprise yang scalable dan siap untuk produksi, dibangun menggunakan **Nuxt 4** dan **Vue 3**. Proyek ini menerapkan prinsip **Clean Architecture** secara ketat untuk memisahkan logika bisnis dari framework UI, sehingga meningkatkan pemeliharaan kode, mempermudah pengujian, dan menjamin skalabilitas jangka panjang.

---

## 🚀 Fitur Utama

- **Arsitektur Nuxt 4**: Menggunakan struktur "App Directory" Nuxt 4 terbaru untuk organisasi kode dan performa yang lebih baik.
- **Antarmuka Modern & Responsif**: Tampilan administrasi kustom yang elegan dan responsif berbasis Bootstrap 5 dan SCSS.
- **Manajemen State yang Tangguh**: Terintegrasi secara global dengan **Pinia** & `pinia-plugin-persistedstate/nuxt` untuk mengelola sesi pengguna dan token secara otomatis dengan dukungan hidrasi.
- **Keamanan Tingkat Enterprise**: Terstruktur untuk alur autentikasi berbasis JWT, dilindungi dengan middleware route guard dan skema tata kelola Peran & Hak Akses (Roles & Permissions).
- **Penanganan Form Cerdas**: Infrastruktur validasi berbasis skema yang ditenagai oleh **VeeValidate** dan **Zod**.
- **Siap untuk Dev-Ops & DX**: Penegakan kualitas kode secara otomatis menggunakan ESLint, Prettier, Husky, dan Commitlint (Conventional Commits).

---

## 🛠️ Stack Teknologi

- **Framework**: Nuxt 4 / Vue 3 / TypeScript
- **State Management**: Pinia + pinia-plugin-persistedstate (Modul Nuxt)
- **Arsitektur Styling**: Bootstrap 5 + SCSS
- **Engine Validasi**: Zod + VeeValidate
- **Strategi HTTP Client**: Nuxt `$fetch` (Ofetch) dengan pola Repository Pattern
- **Infrastruktur Pengujian**: Vitest + Vue Test Utils
- **Ikon**: Bootstrap Icons
- **Analisis Kode Statis**: Modul Nuxt ESLint, Prettier, Husky

---

## 📐 Arsitektur Clean & Struktur Proyek (Nuxt 4)

Dalam Nuxt 4, direktori kode utama dipindahkan ke dalam folder `app/`. Kode aplikasi dibagi secara terisolasi ke dalam beberapa lapisan:

```text
├── app/                        # 🖥️ Direktori Utama Aplikasi (Source Nuxt 4)
│   ├── domain/                 # 🧠 Core Bisnis (Logika murni, tanpa dependensi framework)
│   │   ├── entities/           # Antarmuka (interfaces) dan model dasar
│   │   └── services/           # Aturan alur kerja spesifik domain
│   │
│   ├── application/            # ⚙️ Application Use Cases (Orkestrator identitas / shared)
│   │
│   ├── infrastructure/         # 🔌 Lapisan Implementasi Eksternal
│   │   ├── api/                # Abstraksi jaringan HTTP client
│   │   └── storage/            # Adaptor penyimpanan (contoh: tokenStorage)
│   │
│   ├── stores/                 # 🗂️ Global State Store Reaktif (Pinia)
│   │
│   ├── pages/                  # Sistem routing berbasis file
│   ├── layouts/                # Wrapper tata letak komponen (Default, Auth)
│   ├── components/             # Komponen UI yang dapat digunakan kembali
│   ├── composables/            # Logika Native Vue Composition API
│   ├── middleware/             # Guard interseptor tingkat route
│   ├── plugins/                # Inisialisasi subsistem (contoh: injeksi authRepository)
│   └── shared/                 # Utilitas yang digunakan bersama antar lapisan
│
├── server/                     # 🖥️ Nitro Backend (Serverless API & Middleware)
├── assets/                     # 🎨 Aset statis yang dikompilasi (Gambar, SCSS override)
├── public/                     # 🌐 File statis yang disajikan langsung di root
├── tests/                      # 🧪 Suite pengujian (Unit & Integrasi)
└── nuxt.config.ts              # ⚙️ Konfigurasi framework Nuxt
```

### Aturan Lapisan Arsitektur:

1. **Lapisan Domain**: Inti utama aplikasi. Memiliki stabilitas tertinggi tanpa ketergantungan pada framework UI atau API peramban.
2. **Lapisan Aplikasi**: Mengkoordinasikan interaksi antara maksud pengguna dan skema statis Domain.
3. **Lapisan Infrastruktur**: Menangani dunia luar (panggilan API, manipulasi penyimpanan browser).
4. **Lapisan Aplikasi/Presentasi**: Menangani rendering DOM dan mengonsumsi logika dari store Pinia.

---

## ⚙️ Cara Memulai

### Prasyarat

- Node.js (direkomendasikan v18.x atau lebih baru)
- Manajer Paket: `npm`

### 1. Instalasi Dependensi

```bash
npm install
```

### 2. Menjalankan Lingkungan Pengembangan (Development)

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000/`.

### 3. Tahapan Build Produksi

```bash
npm run build
npm run preview
```

---

## 🔑 Panduan Cara Login & Autentikasi Mock

Untuk keperluan uji coba (_testing_) tanpa harus menghubungkan ke database secara langsung, aplikasi telah dilengkapi dengan **Mock API (Nitro Server Endpoints)** dan **Local Fallback Data**.

### Kredensial Login Demo

- **URL Halaman Login**: `http://localhost:3000/auth/login`
- **Id Personal**: `1234567890`
- **Password**: `password`

---

### 📝 Langkah-demi-Langkah Cara Login:

1. **Jalankan Aplikasi**:
   Buka terminal lalu jalankan `npm run dev`.

2. **Buka Halaman Login**:
   Akses `http://localhost:3000/auth/login` di peramban Anda. Jika Anda mengakses `http://localhost:3000/` saat belum login, middleware akan secara otomatis mengarahkan Anda ke halaman login.

3. **Masukkan Kredensial**:
   - Di kolom **Id Personal**, ketik: `1234567890`
   - Di kolom **Password**, ketik: `password`

4. **Klik Tombol Sign In**:
   - Aplikasi akan melakukan request ke Mock API `POST /api/auth/login`.
   - Token akses (`access_token`) akan disimpan ke dalam state Pinia dan browser cookie secara otomatis.
   - Aplikasi kemudian memanggil `GET /api/v1/auth/me` untuk mendapatkan data pengguna (`Test User`).

5. **Pengalihan Halaman (Redirect)**:
   Setelah login berhasil, Anda akan otomatis diarahkan ke halaman **Dashboard** (`http://localhost:3000/dashboard`).

6. **Memeriksa Data Pengguna**:
   Nama pengguna (`Test User`) dan ID Personal (`1234567890`) akan tampil pada **Header** (kanan atas) dan **Sidebar** (kiri bawah).

7. **Cara Logout**:
   Klik profil di sebelah kanan atas Header lalu pilih **Sign Out**, atau klik tombol ikon Logout pada bagian bawah Sidebar.

---

### 📡 Endpoints Mock API (Data JSON Demo)

#### 1. Endpoint Login (`POST /api/auth/login`)

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
    "message": "User berhasil login",
    "data": {
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
      "token_type": "Bearer",
      "expires_in": 3600
    },
    "meta": null,
    "links": null
  }
  ```

#### 2. Endpoint Ambil Data User Login (`GET /api/v1/auth/me`)

- **Header**: `Authorization: Bearer <access_token>`
- **Response (HTTP 200 OK)**:
  ```json
  {
    "success": true,
    "responseCode": 200,
    "message": "User berhasil diambil",
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

---

## 🧪 Pengujian Unit (Unit Testing)

Jalankan perintah berikut untuk mengeksekusi suite pengujian:

```bash
npm run test
```

---

## 🔒 Penegakan Kualitas Kode Otomatis

- **Husky & Lint-Staged**: Menjalankan ESLint dan Prettier secara otomatis pada file staging sebelum commit.
- **Commitlint**: Memastikan pesan commit mematuhi aturan [Conventional Commits](https://www.conventionalcommits.org/).
