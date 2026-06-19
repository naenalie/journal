# Digital Scrapbook Journal (Tema Kawaii) 🌸

Proyek ini adalah aplikasi jurnal digital multi-device yang dirancang dengan tema visual **"Cute, Aesthetic Kawaii Scrapbook"** (warna pastel lembut, kertas dot-grid krem, ornamen washi tape, dan gaya tulisan tangan). Proyek ini berjalan di Web dan Mobile secara sinkron.

## Struktur Repositori 📁
- [**web/**](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/web/): Aplikasi Frontend Web Next.js (App Router, ekspor statis, dideploy di GitHub Pages).
- [**mobile/**](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/mobile/): Aplikasi Frontend Mobile Expo React Native (iOS/Android).
- [**supabase/**](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/supabase/): Skema database PostgreSQL, fungsi pemicu (triggers), dan kebijakan keamanan RLS.
- [**docs/**](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/): Dokumentasi alur pengembangan (PRD, Arsitektur, Log Pembelajaran, Rencana Pengujian).

## Tumpukan Teknologi (Tech Stack) 🛠️
- **Web:** Next.js (App Router, JavaScript, CSS Modules).
- **Mobile:** Expo React Native (TypeScript, StyleSheet).
- **Backend:** Supabase (PostgreSQL, Auth, RLS).
- **Deployment:** GitHub Pages (Web).

## Langkah Awal Pengerjaan 🚀

### 1. Database Backend (Supabase)
1. Buat proyek baru di [Supabase Dashboard](https://supabase.com).
2. Jalankan skrip SQL dari file [supabase/schema.sql](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/supabase/schema.sql) di dalam SQL Editor Supabase untuk mengonfigurasi tabel profil, tabel jurnal harian, pemicu pendaftaran, dan kebijakan keamanan.

### 2. Jalankan Aplikasi Web
1. Masuk ke direktori web: `cd web`
2. Konfigurasi kredensial Supabase di `.env.local`
3. Jalankan `npm install` lalu `npm run dev`
4. Akses melalui peramban di [http://localhost:3000](http://localhost:3000)

### 3. Jalankan Aplikasi Mobile
1. Masuk ke direktori mobile: `cd mobile`
2. Konfigurasi kredensial Supabase di `.env`
3. Jalankan `npm install` lalu `npx expo start`
4. Pindai kode QR menggunakan aplikasi **Expo Go** pada ponsel pintarmu.

---

## Kontributor 💖
- **naenalie** - *Owner & Developer*
