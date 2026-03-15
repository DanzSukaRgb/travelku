# Travelku

Travelku adalah website travel full-stack production-style berbasis **Laravel 12 + React (Inertia) + Vite + MySQL**. Project ini menggabungkan landing page modern, katalog paket, detail itinerary, booking flow, contact/lead flow, dan dashboard admin-lite dalam satu aplikasi Laravel.

## Stack

- PHP 8.5
- Laravel 12
- React 18 terintegrasi di Laravel via Inertia.js
- Vite
- Tailwind CSS
- MySQL / MariaDB lokal
- Laravel Breeze untuk auth dasar
- Axios service layer untuk request frontend ke API

## Fitur utama

### Public
- Landing page travel yang polished dan modern
- Featured destinations
- Featured travel packages
- Testimonials
- Contact / lead form
- Listing paket travel dengan filter destination
- Detail paket dengan:
  - itinerary
  - highlights
  - inclusions
  - gallery
  - booking form end-to-end

### Authenticated / admin-lite
- Login & register
- Dashboard ringkas
- Statistik packages / bookings / leads / destinations
- List booking terbaru
- Update status booking untuk akun admin
- Snapshot package management untuk backend ops

### Backend / API
- `GET /api/packages`
- `GET /api/packages/{slug}`
- `POST /api/bookings`
- `POST /api/contact-leads`
- `GET /api/bookings` (auth)
- `PATCH /api/bookings/{booking}/status` (admin)
- `POST /api/packages` (admin)
- `PUT /api/packages/{travelPackage}` (admin)

## Struktur data utama

- `destinations`
- `travel_packages`
- `bookings`
- `contact_leads`
- `users` (+ `is_admin`)

Seeder membuat contoh data berikut:
- 4 destination
- 4 travel package
- 2 seeded booking
- 2 seeded lead
- 2 akun demo

## Akun demo

- Admin:
  - email: `admin@travelku.test`
  - password: `password`
- Traveler:
  - email: `traveler@travelku.test`
  - password: `password`

## Setup lokal

### 1. Masuk ke project
```bash
cd /home/danu/projek/laravel/travelku
```

### 2. Install dependency
```bash
composer install
npm install
```

### 3. Siapkan database MySQL lokal
Project ini default ke database MySQL bernama `travelku`.

Contoh:
```bash
mariadb -uroot -e "CREATE DATABASE IF NOT EXISTS travelku CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 4. Copy env bila perlu
```bash
cp .env.example .env
```

Lalu pastikan konfigurasi database ini benar:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=travelku
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Migrate + seed
```bash
php artisan migrate:fresh --seed
```

### 6. Jalankan app
Terminal 1:
```bash
php artisan serve
```

Terminal 2:
```bash
npm run dev
```

Atau bila ingin cek hasil build production asset:
```bash
npm run build
php artisan serve
```

## Testing

Project test suite diarahkan ke database MySQL testing `travelku_test` pada `phpunit.xml`.

Buat databasenya sekali saja:
```bash
mariadb -uroot -e "CREATE DATABASE IF NOT EXISTS travelku_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Jalankan test:
```bash
php artisan test
```

## Review akhir: bug / perf / security pass

### Temuan & perbaikan
- **Bug config DB typo**: sempat ada typo nama database pada env, sudah diperbaiki ke `travelku`.
- **Build alias React**: import alias `@/` dipastikan aman dengan konfigurasi alias di `vite.config.js`.
- **Test environment rusak karena sqlite driver tidak tersedia**: test suite dipindahkan ke MySQL test database agar stabil di mesin ini.
- **API flow dirapikan**: frontend request memakai service layer terpusat (`resources/js/Services/api.js`) supaya fetch tidak tersebar acak.
- **Validation**: booking, lead, dan package create/update memakai Form Request.
- **Admin boundary**: update status booking dan write package API dibatasi ke user admin.
- **Mass assignment**: model menggunakan `fillable` eksplisit.
- **Data shape**: field array seperti gallery/highlights/inclusions/itinerary dicast ke array agar konsisten di frontend.

### Catatan kualitas
- UI sudah dibuat custom dan tidak terasa sekadar template Breeze default untuk halaman inti public.
- Dashboard admin-lite sudah usable, tapi package CRUD UI penuh masih bisa dikembangkan di iterasi berikutnya.
- Jika ingin production lebih serius, next step yang disarankan:
  - tambah upload image lokal / cloud storage
  - tambahkan search/sort/pagination server-side untuk package besar
  - email notification / WhatsApp webhook saat booking masuk
  - role/permission yang lebih granular
  - rate limit tambahan untuk endpoint public booking/contact

## Browser checks yang sudah dicek

- Landing page tampil normal
- Halaman package listing tampil normal
- Halaman detail package tampil normal
- Login admin berhasil di browser
- Dashboard admin tampil normal dengan statistik + booking list + control status

## Git

Perubahan project sudah dikomit di dalam repo project ini.
