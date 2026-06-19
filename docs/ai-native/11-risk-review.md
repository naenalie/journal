# Laporan Red Team

## Ringkasan Risiko
Medium

## Data Sensitif
- **Konten Jurnal:** Catatan harian pribadi, pemikiran, rekaman mood, dan refleksi emosional. Ini adalah data pribadi yang sangat sensitif.
- **Metadata Profil:** UUID akun yang terhubung, username, dan URL gambar avatar.

## Kasus Penyalahgunaan
- **Impersonasi/Pembacaan Lintas Pengguna:** Pengguna jahat memodifikasi payload request API untuk mengambil atau mengubah kartu jurnal milik UUID lain.
- **Database Spamming:** Script menjalankan perulangan pengiriman data yang cepat untuk membanjiri database Supabase karena tidak ada rate-limit default.

## Risiko Keamanan
- **Paparan Kredensial API:** Melakukan push URL database atau API key Supabase secara langsung ke repositori git publik.
- **Regresi Kebijakan RLS:** Lupa menerapkan pengaktifan RLS pada tabel saat rilis (`ALTER TABLE ENABLE RLS`), menyebabkan tabel kembali dapat diakses secara publik.

## Risiko Privasi
- **Data Pengguna yang Tertinggal:** Baris database tetap tersimpan setelah akun pengguna dihapus. (Dimitigasi di skema Isu 1 melalui batasan `ON DELETE CASCADE`).

## Risiko Khusus AI
- Tidak ada (LLM atau API AI generatif tidak digunakan pada Fase 1).

## Risiko Kehandalan / Aksesibilitas
- **Kehilangan Data Saat Terputus:** Mengirim entri jurnal saat koneksi internet mati. Tanpa cache lokal, pengiriman gagal dan draf tulisan pengguna bisa hilang sepenuhnya.
- **Aksesibilitas Kontras:** Menggunakan warna pastel yang terlalu terang (misal: kuning/pink muda) dengan teks putih. (Dimitigasi dengan memaksa penggunaan teks navy tua `#1B263B` di semua kartu).

## Rencana Mitigasi

### Wajib Diperbaiki (Must Fix)
- **Audit RLS di Staging:** Verifikasi kebijakan RLS secara ketat untuk memastikan tidak ada akses baca/tulis lintas pengguna yang diizinkan sebelum staging.
- **Pencadangan Draf Lokal:** Simpan draf teks editor yang sedang aktif ke penyimpanan lokal klien (`localStorage` di Web, `AsyncStorage` di Mobile) untuk mencegah kehilangan teks jika koneksi terputus.

### Sebaiknya Diperbaiki (Should Fix)
- **Batasan Input:** Batasi karakter maksimum judul dan konten di frontend serta tambahkan batasan pemeriksaan (`CHECK constraints`) di PostgreSQL.
- **Rate-Limiting API:** Konfigurasikan batas laju request API Supabase untuk mencegah spam kueri.

### Diterima untuk Demo Kelas
- **Ketergantungan Koneksi Online:** Keharusan terhubung ke internet untuk sinkronisasi CRUD. Meskipun kurang ideal untuk produk nyata, hal ini sepenuhnya dapat diterima untuk demonstrasi demo kelas.
