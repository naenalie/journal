# Prompt Pengkodean AI

Anda sedang mengerjakan Isu 1: Setup Skema Database Supabase dan Row-Level Security (RLS).

## Tujuan
Membuat dan mengonfigurasi tabel PostgreSQL (`profiles`, `journal_entries`) serta menentukan kebijakan Row-Level Security (RLS) di Supabase untuk memastikan penyimpanan data pengguna terisolasi dengan aman.

## Konteks Relevan
- Sistem terdiri dari aplikasi web Next.js dan aplikasi mobile Expo React Native yang berbagi satu database Supabase.
- Setiap entri jurnal milik pengguna tertentu dan berisi: judul, konten, date_string, mood, dan stempel waktu.
- Keamanan membutuhkan pembatasan ketat sehingga pengguna hanya dapat membaca, memperbarui, atau menghapus data mereka sendiri.

## Berkas untuk Diperiksa Pertama Kali
- Ini adalah setup baru. Periksa dan tulis ke: `supabase/schema.sql`

## Batasan
- Pastikan kebijakan RLS diaktifkan secara eksplisit: `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;` dan `ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;`.
- Konfigurasikan relasi dan foreign key dengan benar: `user_id` di `journal_entries` merujuk ke `profiles.id`, dan `profiles.id` merujuk ke `auth.users.id` dengan aksi cascade on delete.

## Larangan
- Jangan membuat skema untuk fitur yang tidak terkait (seperti bucket penyimpanan gambar/media, notifikasi push, atau sinkronisasi offline).
- Jangan melewatkan pengaktifan RLS.

## Hasil yang Diharapkan
- Berkas `supabase/schema.sql` yang ditulis lengkap berisi:
  1. Skema tabel `profiles`.
  2. Skema tabel `journal_entries`.
  3. Pernyataan `ALTER TABLE` untuk mengaktifkan RLS.
  4. Pembuatan kebijakan RLS untuk aksi select, insert, update, dan delete di kedua tabel.
  5. Fungsi/trigger SQL aman untuk menyinkronkan data profil pengguna secara otomatis saat pendaftaran (memetakan `auth.users` ke `public.profiles`).

## Verifikasi
Jalankan/Periksa:
- Jalankan skrip SQL di lingkungan Supabase lokal atau editor SQL cloud Supabase.
- Uji bahwa memasukkan baris dengan `user_id` Pengguna A tidak dapat diakses oleh sesi terautentikasi Pengguna B (`auth.uid()` berbeda).

## Serah Terima Alur (Handoff)
Setelah upaya pembangunan selesai, gunakan `run-the-loop` dengan berkas yang berubah, temuan tinjauan, dan bukti pengujian.

## Sebelum Anda Selesai
- Ringkas berkas yang berubah.
- Jelaskan asumsi pengkodean.
- Laporkan hasil verifikasi.
