# Aplikasi Web Digital Scrapbook Journal 🌸

Ini adalah bagian frontend web dari proyek **Digital Scrapbook Journal** (dengan Tema Kawaii). Aplikasi ini dibangun menggunakan [Next.js](https://nextjs.org) dengan App Router, CSS Modules kustom, dan menggunakan [Supabase](https://supabase.com) sebagai backend.

## Fitur Utama ✨
- **Autentikasi Pengguna:** Pendaftaran dan masuk akun yang aman dengan Supabase Auth.
- **Desain Buku Harian Kustom (Scrapbook):** Latar belakang dot-grid krem yang aesthetic, kartu pastel dengan kemiringan acak kecil, dan dekorasi stiker pita perekat (washi tape).
- **Operasi CRUD Lengkap:** Tulis, baca, edit, dan hapus catatan jurnal harianmu secara instan.
- **Filter Mood & Pencarian:** Cari kenangan manismu berdasarkan judul/isi cerita atau saring langsung menggunakan emoji perasaan (mood).
- **Desain Responsif:** Tampilan yang manis baik diakses melalui komputer desktop maupun ponsel pintarmu.

## Cara Menjalankan Secara Lokal 🔧

### 1. Prasyarat
Pastikan kamu telah menginstal Node.js (versi 18 ke atas) dan npm di komputermu.

### 2. Konfigurasi Variabel Lingkungan
Buat file bernama `.env.local` di dalam folder `web/` dan tambahkan kredensial Supabase milikmu:

```env
NEXT_PUBLIC_SUPABASE_URL=https://proyek-kamu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=kunci-anon-kamu
```

### 3. Instal Dependensi
Jalankan perintah berikut di terminal:
```bash
npm install
```

### 4. Jalankan Server Pengembangan
Jalankan server lokal dengan perintah:
```bash
npm run dev
```
Buka peramban dan akses [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

## Cara Penyebaran (Deployment) ke GitHub Pages 🚀

Aplikasi ini dikonfigurasi untuk diekspor secara statis (`output: 'export'`) dan dideploy ke GitHub Pages pada alamat sub-path `/journal`.

Setiap kali ada push ke cabang `main`, alur kerja GitHub Actions `.github/workflows/deploy.yml` akan otomatis:
1. Mem-build Next.js statis.
2. Mengekspor folder `out/`.
3. Mengunggah dan merilis file ke cabang `gh-pages` untuk ditayangkan.

> 💡 **Penting:** Pastikan untuk menambahkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` ke dalam **GitHub Actions Secrets** (di Settings -> Secrets and variables -> Actions) pada repositori GitHub-mu agar aplikasi web dapat berkomunikasi dengan database Supabase saat online.
