# Isu Implementasi

## Isu 1: Setup Skema Database Supabase dan Row-Level Security (RLS)
**Goal:** Mengonfigurasi tabel PostgreSQL, relasi, dan hak akses baris di Supabase.
**Depends on:** tidak ada
**Likely Files:** `supabase/schema.sql`
**Acceptance Criteria:**
- Tabel `profiles` dan `journal_entries` dibuat dengan kolom dan foreign key yang benar.
- Row-Level Security (RLS) diaktifkan di kedua tabel.
- Kebijakan RLS membatasi pembacaan, pembaruan, dan penghapusan hanya untuk baris di mana `user_id` cocok dengan pengguna terautentikasi (`auth.uid()`).
**Verification:**
- Jalankan migrasi SQL di editor Supabase.
- Uji bahwa baris entri yang dimasukkan oleh Pengguna A tidak dapat dibaca atau diedit oleh Pengguna B.
**AI Can Help With:** Menulis script skema SQL dan pernyataan kebijakan RLS.
**Student Must Judge:** Memverifikasi batasan keamanan mencegah pembacaan lintas pengguna di konsol Supabase.
**Risk Level:** Medium

## Isu 2: Setup Awal & Tema Aplikasi Web Next.js
**Goal:** Menginisialisasi proyek Next.js App Router dan memuat Google Fonts (Fredoka & Kalam).
**Depends on:** tidak ada
**Likely Files:** `web/package.json`, `web/app/layout.js`, `web/app/globals.css`
**Acceptance Criteria:**
- Proyek Next.js berhasil dibuat di direktori `web/`.
- Google Fonts *Fredoka* dan *Kalam* dimuat di header layout HTML dan dipetakan ke variabel CSS.
- Warna tema utama, warna teks (`#1B263B`), and latar belakang krem `#FDFBF7` didefinisikan di stylesheet global.
**Verification:**
- Jalankan `npm run dev` dan buka aplikasi di peramban.
- Verifikasi melalui alat pengembang Chrome bahwa font Fredoka dan Kalam diterapkan pada teks pengujian.
**AI Can Help With:** Perintah pembuatan proyek Next.js, pembuatan berkas layout, dan konfigurasi impor font.
**Student Must Judge:** Mengonfirmasi gaya dasar, latar belakang, dan font dirender dengan benar tanpa error di konsol.
**Risk Level:** Low

## Isu 3: Sistem Styling CSS Web untuk Estetika Scrapbook
**Goal:** Membangun modul CSS atau kelas utilitas untuk elemen scrapbook kawaii (kanvas dot-grid, kartu catatan pastel yang diputar, bayangan lembut, efek selotip washi).
**Depends on:** Isu 2
**Likely Files:** `web/components/StickyCard.module.css`, `web/components/WashiTape.module.css`, `web/components/Canvas.module.css`
**Acceptance Criteria:**
- Latar belakang dot-grid krem dirender dengan benar menggunakan `radial-gradient` di CSS.
- Gaya StickyCard mendukung warna pastel kustom (pink, blue, yellow, mint, lavender) dengan bayangan lembut dan rotasi kecil (misal: `transform: rotate(-1.5deg)`).
- Gaya selotip washi merender persegi panjang semitransparan bergerigi yang menimpa sudut kartu.
**Verification:**
- Buat halaman demonstrasi tiruan yang menampilkan kartu dengan berbagai warna pastel, rotasi, dan selotip washi.
- Tinjau apakah estetika desain sesuai dengan panduan visual.
**AI Can Help With:** Membuat gaya CSS kustom untuk dot-grid, rotasi kartu, dan bayangan lembut.
**Student Must Judge:** Memastikan tata letak visual terlihat manis, organik, dan sesuai dengan panduan gaya visual.
**Risk Level:** Low

## Isu 4: Integrasi Autentikasi Web (Supabase Auth)
**Goal:** Menghubungkan antarmuka masuk/daftar Next.js ke Autentikasi Supabase.
**Depends on:** Isu 1, Isu 2
**Likely Files:** `web/lib/supabaseClient.js`, `web/app/auth/login/page.js`, `web/app/auth/register/page.js`
**Acceptance Criteria:**
- Instansiasi klien Supabase dikonfigurasi dalam modul klien bersama.
- Form masuk dan daftar mengirimkan input pengguna yang benar ke API Supabase Auth.
- Autentikasi yang berhasil menyimpan JWT sesi dan mengarahkan pengguna ke rute `/journal`.
- Autentikasi yang gagal menampilkan pesan kesalahan yang bersih.
**Verification:**
- Lakukan pendaftaran dan login di browser.
- Verifikasi token sesi ada di cookie browser atau local storage.
**AI Can Help With:** Menulis konfigurasi klien Supabase dan logika pengiriman form Auth.
**Student Must Judge:** Mengonfirmasi alur pendaftaran/login mengarahkan pengguna dengan benar dan mengunci halaman jika belum login.
**Risk Level:** Medium

## Isu 5: Kanvas CRUD Jurnal Web dan Filter Pencarian
**Goal:** Membangun antarmuka dasbor utama jurnal web untuk operasi CRUD pada catatan dan filter pencarian.
**Depends on:** Isu 3, Isu 4
**Likely Files:** `web/app/journal/page.js`, `web/app/journal/new/page.js`, `web/app/journal/[id]/edit/page.js`
**Acceptance Criteria:**
- `/journal` menampilkan entri pengguna secara dinamis sebagai komponen StickyNote di atas kanvas grid.
- Pengguna dapat membuat entri baru dengan tanggal kustom, judul, teks, tag, dan pemilih mood.
- Kolom pencarian memfilter daftar entri di kanvas secara real-time berdasarkan judul, konten, atau tag.
- Mengedit atau menghapus langsung memperbarui layar dan menyinkronkan data ke Supabase.
**Verification:**
- Tulis 3 entri tiruan dengan tag berbeda dan verifikasi pencarian menyaring secara dinamis saat mengetik.
- Verifikasi perubahan tetap tersimpan setelah halaman di-refresh.
**AI Can Help With:** Pengikatan data form, indeks pencarian sisi klien, dan fungsi query database Supabase.
**Student Must Judge:** Mengonfirmasi status pengeditan direset dengan benar dan input dibersihkan dari skrip berbahaya.
**Risk Level:** Medium

## Isu 6: Setup Awal & Font Aplikasi Mobile React Native (Expo)
**Goal:** Menginisialisasi aplikasi mobile Expo, mengonfigurasi navigasi tab (Expo Router), and memuat font Google kustom.
**Depends on:** tidak ada
**Likely Files:** `mobile/package.json`, `mobile/app/_layout.tsx`, `mobile/app/(tabs)/_layout.tsx`
**Acceptance Criteria:**
- Proyek Expo diinisialisasi di direktori `mobile/` menggunakan TypeScript.
- Font *Fredoka* dan *Kalam* dimuat menggunakan `expo-font` sebelum merender komponen.
- Tata letak router mendaftarkan navigasi tab utama (Tab Scrapbook dan Tab Tulis).
**Verification:**
- Jalankan `npx expo start` and buka di emulator iOS/Android atau aplikasi Expo Go.
- Verifikasi header layar dirender menggunakan font Fredoka.
**AI Can Help With:** Pembuatan template Expo, kode pemuatan font dinamis, dan konfigurasi navigasi.
**Student Must Judge:** Menguji pada emulator untuk memastikan aplikasi berjalan dengan font yang benar dan perpindahan tab lancar.
**Risk Level:** Low

## Isu 7: Autentikasi Mobile (Integrasi Supabase Auth)
**Goal:** Mengimplementasikan form login dan register di aplikasi mobile yang terhubung ke Supabase Auth.
**Depends on:** Isu 1, Isu 6
**Likely Files:** `mobile/lib/supabaseClient.ts`, `mobile/app/(auth)/login.tsx`, `mobile/app/(auth)/register.tsx`
**Acceptance Criteria:**
- Klien Supabase diinisialisasi di mobile dengan adaptor penyimpanan asinkron (AsyncStorage).
- Form login/register mengautentikasi pengguna ke Supabase Auth.
- Mengarahkan pengguna yang berhasil login ke navigasi tab utama.
**Verification:**
- Masuk menggunakan kredensial yang dibuat sebelumnya di aplikasi web dan konfirmasi akses berhasil.
**AI Can Help With:** Menulis adaptor penyimpanan asinkron dan handler autentikasi.
**Student Must Judge:** Memastikan penyimpanan token sesi ditangani dengan aman.
**Risk Level:** Medium

## Isu 8: Kanvas Jurnal Mobile (CRUD & Pencarian)
**Goal:** Membangun layar kanvas mobile yang dapat di-scroll untuk menampilkan kartu catatan pastel, form penulisan, dan filter pencarian dinamis.
**Depends on:** Issue 6, Issue 7
**Likely Files:** `mobile/app/(tabs)/index.tsx`, `mobile/app/(tabs)/new.tsx`, `mobile/app/journal/[id].tsx`
**Acceptance Criteria:**
- Menampilkan latar belakang dot-grid krem menggunakan trik styling (misal: SVG kustom atau gambar berulang) pada ScrollView React Native.
- Kartu jurnal dirender dengan warna pastel kustom, rotasi kecil, dan bayangan menggunakan StyleSheet React Native.
- Pengguna dapat membuat, mengedit, menghapus entri, dan mencari secara real-time.
- Pembaruan dari ponsel tersinkronisasi ke Supabase dan langsung terlihat di aplikasi Web Next.js.
**Verification:**
- Tulis entri di mobile, verifikasi langsung muncul di aplikasi web.
- Uji performa filter pencarian saat mengetik.
**AI Can Help With:** Implementasi styling kartu scrapbook React Native dan penanganan form.
**Student Must Judge:** Memastikan area sentuh tombol mudah diakses di ponsel dan estetika visual konsisten dengan versi web.
**Risk Level:** Medium

## Sumber yang Dibaca
- [03-prd.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/03-prd.md)
- [04-architecture.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/04-architecture.md)
