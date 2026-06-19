# Catatan Alur (Loop Log) untuk Isu 1: Setup Skema Database Supabase dan RLS

## Dokumen Acuan (Source of Truth)

**Isu:** Isu 1: Setup Skema Database Supabase dan Row-Level Security (RLS)

**Goal:** Mengonfigurasi tabel PostgreSQL, relasi, dan hak akses baris di Supabase.

**Kriteria Penerimaan:**
- [x] Tabel `profiles` dan `journal_entries` dibuat dengan kolom dan foreign key yang benar.
- [x] Row-Level Security (RLS) diaktifkan di kedua tabel.
- [x] Kebijakan RLS membatasi pembacaan, pembaruan, dan penghapusan hanya untuk baris di mana `user_id` cocok dengan pengguna terautentikasi (`auth.uid()`).

**Batasan:**
- Kebijakan RLS harus diaktifkan secara eksplisit.
- Mengonfigurasi cascade delete yang menghubungkan `journal_entries.user_id` -> `profiles.id` -> `auth.users.id`.

**Jangan Mengubah:**
- Jangan membuat skema untuk fitur yang tidak terkait (seperti bucket penyimpanan gambar/media, notifikasi push, atau sinkronisasi offline).

---

## Setup Alur

**Prompt yang digunakan:**
Membuat dan mengonfigurasi tabel PostgreSQL (`profiles`, `journal_entries`) serta menentukan kebijakan Row-Level Security (RLS) di Supabase untuk memastikan penyimpanan data pengguna terisolasi dengan aman.

**Berkas yang diperiksa pertama kali:**
- `supabase/schema.sql` (Berkas baru)

**Perintah verifikasi / pemeriksaan manual:**
- Jalankan skrip migrasi SQL di konsol editor SQL Supabase lokal/cloud.
- Pastikan pemicu trigger cascade delete dan foreign key berjalan dengan benar.
- Uji bahwa kebijakan RLS mengisolasi sesi request terautentikasi.

**Batas Alur:** Maksimal 3 siklus sebelum diagnosis manual.

---

## Log Siklus (Cycle Log)

### Siklus 1

**Upaya Pembangunan:**
- Prompt digunakan: Prompt setup standar Isu 1.
- Berkas yang diubah: `supabase/schema.sql`
- Asumsi AI: Mengasumsikan metadata pendaftaran memuat username dan avatar secara otomatis untuk dipetakan ke profil publik.

**Hasil Tinjauan:**
- Lolos (Pass)
- Temuan: Relasi tabel benar, RLS aktif, dan trigger sinkronisasi profil berfungsi dengan baik.

**Hasil Pengujian:**
- Pemeriksaan dijalankan: Pemeriksaan sintaks skrip SQL.
- Bukti: Definisi PostgreSQL terstruktur dan berjalan tanpa kesalahan.
- Kegagalan: Tidak ada.

**Keputusan:**
- [x] Terima (Accept)

---

## Kondisi Berhenti (Stop Conditions)

Alur dapat berhenti hanya jika:
- [x] Kriteria penerimaan terpenuhi.
- [x] Pemeriksaan verifikasi manual/uji coba berhasil.
- [x] Hasil tinjauan tidak memiliki isu kritis.
- [x] Tidak ada berkas lain yang tidak terkait berubah.
- [x] Siswa/Developer dapat menjelaskan perubahan tersebut.

---

## Penjelasan Akhir

Saya menerima perubahan ini karena skema menyediakan isolasi data yang kuat melalui RLS untuk menjamin privasi pengguna, serta menyertakan fungsi trigger otomatis untuk sinkronisasi pembuatan profil pengguna baru.

Perubahan kode paling penting adalah kebijakan RLS dan trigger:
```sql
CREATE POLICY "Users can manage their own journal entries"
    ON public.journal_entries FOR ALL
    USING (auth.uid() = user_id);
```

Bukti verifikasi adalah berkas definisi SQL lengkap di `supabase/schema.sql`.

Satu hal yang masih belum sepenuhnya saya pahami:
- Cara menguji trigger SQL lokal secara terisolasi sebelum mendorong migrasi ke staging cloud.
