# Aplikasi Mobile Digital Scrapbook Journal 📱

Ini adalah bagian frontend mobile dari proyek **Digital Scrapbook Journal** (dengan Tema Kawaii). Aplikasi ini dibangun menggunakan [Expo React Native](https://expo.dev) dengan Expo Router, TypeScript, dan menggunakan [Supabase](https://supabase.com) sebagai backend database dan sinkronisasi real-time.

## Fitur Utama ✨
- **Autentikasi Pengguna:** Masuk dan mendaftar dengan aman langsung dari ponselmu.
- **Kanvas Jurnal Scrapbook:** Tampilan dot-grid krem yang imut, memo pastel warna-warni yang berotasi acak, dan stiker washi tape di atas kartu.
- **Sinkronisasi Otomatis:** Catatan yang kamu buat di handphone akan langsung tersinkron ke database Supabase dan bisa dibaca di aplikasi web (begitu juga sebaliknya!).
- **Pencarian & Filter Mood:** Cari jurnal masa lalu berdasarkan judul atau isi cerita secara instan, serta filter berdasarkan mood perasaan harianmu.
- **Tab Inspirasi:** Berisi tips-tips imut menulis jurnal harian dan kutipan motivasi harian.

## Cara Menjalankan Secara Lokal 🔧

### 1. Prasyarat
Pastikan kamu telah menginstal Node.js dan memasang aplikasi **Expo Go** pada ponsel pintar Android/iOS milikmu (unduh di Google Play Store atau Apple App Store).

### 2. Konfigurasi Variabel Lingkungan
Buat file bernama `.env` di dalam folder `mobile/` dan tambahkan kredensial Supabase milikmu:

```env
EXPO_PUBLIC_SUPABASE_URL=https://proyek-kamu.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=kunci-anon-kamu
```

### 3. Instal Dependensi
Jalankan perintah berikut di terminal:
```bash
npm install
```

### 4. Jalankan Aplikasi
Jalankan server pengembangan Expo:
```bash
npx expo start
```
Pindai (scan) kode QR yang muncul di terminal menggunakan aplikasi kamera bawaan (iOS) atau aplikasi Expo Go (Android) untuk membuka aplikasi di ponselmu!
