# Rencana Arsitektur

## Pilihan Teknologi (Stack Choice)
- **Frontend Web:** Next.js (App Router, Client-side Rendering untuk aplikasi utama, Static Generation untuk halaman statis) + CSS Modules/Vanilla CSS.
- **Frontend Mobile:** React Native (Expo) + Expo Router dengan styling StyleSheet.
- **Backend:** Supabase (Autentikasi & Database PostgreSQL).
- **Hosting/Penyebaran:** Vercel (Web), Expo EAS (Mobile).

## Bagian Sistem (System Parts)
- **Frontend:** Aplikasi Web Next.js menangani interaksi pengguna melalui peramban (browser). Aplikasi Mobile React Native menangani interaksi melalui perangkat mobile. Keduanya menggunakan token gaya kustom (warna pastel, font) yang diselaraskan.
- **Backend:** Supabase menangani request API, query database, dan keamanan akses data.
- **Database/Penyimpanan:** Database PostgreSQL di Supabase.
- **Auth:** Supabase Auth (Pendaftaran & login Email/Password).
- **Layanan Eksternal:** Google Fonts (memuat Fredoka dan Kalam secara dinamis).

## Aliran Data (Data Flow)
1. **Login Pengguna:** Pengguna memasukkan kredensial -> Klien (Web/Mobile) memanggil Supabase Auth -> Supabase memvalidasi -> Mengembalikan token JWT yang disimpan lokal (Cookie di Web, AsyncStorage di Mobile).
2. **Pengambilan Entri:** Klien meminta data Supabase dengan JWT -> Supabase memvalidasi RLS -> Mengembalikan entri jurnal milik pengguna -> Klien merender kartu di kanvas dot-grid.
3. **Penyimpanan Entri:** Pengguna mengirim entri baru -> Klien mengirim perintah INSERT dengan JWT -> Supabase menulis data -> Klien menerima konfirmasi -> Menambahkan kartu entri baru ke UI.
4. **Pencarian/Filter:** Pengguna mengetik pencarian -> Klien melakukan penyaringan teks di sisi klien pada array entri yang sudah dimuat.

## Model Data (Data Model)
- **profiles:**
  - `id`: UUID (Primary Key, merujuk ke auth.users)
  - `username`: TEXT
  - `avatar_url`: TEXT
  - `created_at`: TIMESTAMP WITH TIME ZONE
- **journal_entries:**
  - `id`: UUID (Primary Key, default gen_random_uuid())
  - `user_id`: UUID (Foreign Key, merujuk ke public.profiles.id)
  - `title`: TEXT
  - `content`: TEXT
  - `mood`: TEXT
  - `date_string`: TEXT (format YYYY-MM-DD untuk pengurutan tanggal yang stabil)
  - `created_at`: TIMESTAMP WITH TIME ZONE
  - `updated_at`: TIMESTAMP WITH TIME ZONE

## Rute Utama / Layar (Key Routes / Screens)
### Web (Next.js)
- `/`: Halaman landing statis yang manis.
- `/auth/login` dan `/auth/register`: Form autentikasi.
- `/journal`: Kanvas kertas dot-grid berisi kartu catatan pastel dan kolom pencarian.
- `/journal/new`: Form berbentuk kartu manis untuk menulis entri baru.
- `/journal/[id]/edit`: Form untuk mengedit entri.

### Mobile (Expo Router)
- `(auth)/login` & `(auth)/register`: Layar masuk/daftar.
- `(tabs)/index` (Tab Scrapbook): Kanvas dot-grid krem dengan daftar kartu pastel yang dapat di-scroll.
- `(tabs)/new` (Tab Tulis): Form penulisan editor yang lucu.
- `journal/[id]` (Layar Detail/Edit): Layar melihat detail dan mengedit entri.

## Catatan Keamanan dan Privasi
- **Row-Level Security (RLS):** Kebijakan RLS Supabase diaktifkan di semua tabel. Kebijakan `auth.uid() = user_id` mencegah akses baca/tulis dari pengguna lain.
- **Enkapsulasi Data:** Token JWT secara otomatis dikirim di header setiap request oleh SDK Supabase untuk autentikasi langsung di tingkat database.

## Kasus Kegagalan (Failure Cases)
- **Koneksi Internet Terputus:**
  - *Gejala:* Pengambilan/penyimpanan database gagal.
  - *Respon:* Tampilkan pemberitahuan/toast lucu: "Koneksi terputus. Jurnal kamu belum bisa disimpan ke awan!" dan nonaktifkan tombol simpan.
- **Sesi Auth Kedaluwarsa:**
  - *Gejala:* Request API mengembalikan status 401 Unauthorized.
  - *Respon:* Klien menangkap error, menghapus sesi lokal, dan mengarahkan kembali pengguna ke layar `/auth/login`.

## Keputusan Arsitektur
- **Next.js & Expo Terpisah:** Memisahkan basis kode web dan mobile agar tata letak web optimal untuk desktop dan mobile optimal untuk layar sentuh, tanpa kompromi tata letak hybrid.
- **Supabase untuk Backend:** Menggunakan Supabase karena menyediakan akses database PostgreSQL langsung dengan RLS dan autentikasi bawaan, menghemat waktu pembuatan API REST kustom.
- **Penyaringan Sisi Klien:** Pencarian dilakukan langsung pada array di sisi klien untuk meminimalkan latensi query database.

## Keputusan Arsitektur
- **Custom Styling vs. Komponen Standar:** Membuat elemen responsif dengan rotasi kustom di CSS Modules / StyleSheet memerlukan usaha tata letak lebih dibanding pustaka UI standar.
- **Online-first vs. Offline-first:** Memprioritaskan sinkronisasi online ke Supabase menyederhanakan logika database MVP tetapi memerlukan koneksi internet aktif untuk menulis/mengedit.

## Sumber yang Dibaca
- [03-prd.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/03-prd.md)
