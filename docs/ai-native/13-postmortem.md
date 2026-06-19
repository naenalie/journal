# Refleksi Pasca-Proyek (Postmortem)

## Niat Awal (Original Intent)
Membuat Digital Scrapbook Jurnal yang aman dan tersinkronisasi secara real-time yang berjalan di Next.js (Web) dan React Native Expo (Mobile) dengan database Supabase bersama, menerapkan tema visual "cute, aesthetic kawaii scrapbook" (kartu notes pastel, kertas dot-grid krem, teks judul melengkung/bubbly).

## Hasil Akhir
Struktur dasar proyek lengkap, model database SQL, dan arsitektur keamanan RLS Supabase telah berhasil dibuat, bersama dengan dokumen ringkasan tujuan, kebutuhan produk (PRD), rencana arsitektur, backlog isu implementasi, serta rencana pengujian. Tabel database `profiles` dan `journal_entries` telah dibuat dengan cascade delete dan kebijakan isolasi RLS, serta trigger SQL untuk pembuatan profil otomatis saat pendaftaran.

## Apa yang Berubah
- **Penyimpanan Gambar Dikeluarkan dari Fase 1:** Fitur unggahan foto polaroid yang awalnya direncanakan masuk ke MVP dialihkan ke Fase 2. Hal ini diputuskan agar tim pengembang dapat fokus membangun fondasi CRUD teks dasar dan fitur pencarian visual yang stabil dan aman terlebih dahulu.

## Di Mana AI Membantu
- Menulis script PostgreSQL trigger dan trigger function untuk sinkronisasi profil pengguna otomatis dari schema auth ke public.
- Membantu penyusunan formula CSS untuk dot-grid radial gradient dan rotasi transform kustom.
- Mengatur penulisan dokumentasi struktural proyek.

## Di Mana AI Salah Arah atau Gagal
- AI sempat mencoba menulis berkas proyek menyertakan `ArtifactMetadata` yang memicu kegagalan parsing parameter kueri. Hal ini diselesaikan dengan membatasi penggunaan metadata hanya untuk file artefak internal percakapan, bukan berkas proyek di workspace.

## Apa yang Saya Verifikasi
- Keabsahan sintaks skrip SQL di `supabase/schema.sql`.
- Batasan isolasi keamanan kebijakan RLS Supabase: memastikan pembatasan akses data berhasil memblokir pembacaan lintas akun pengguna.

## Apa yang Belum Saya Verifikasi
- Rendering font Google secara dinamis pada perangkat mobile fisik secara langsung.
- Performa latensi pengiriman kueri data dari perangkat dengan koneksi lambat.

## Aturan yang Perlu Ditambahkan Selanjutnya
- Menambahkan pemeriksaan linter di kait git pre-commit untuk memastikan tidak ada deklarasi CSS modules yang tidak terpakai.
- Memisahkan lingkungan migrasi database lokal dengan lingkungan staging/produksi cloud.

## Pelajaran Terbesar
Memperjelas tujuan ("shift left on intent") sejak awal sangat efektif meminimalkan scope creep. Menuliskan batasan non-goals secara jelas (seperti mengeluarkan fitur unggah gambar dari MVP) menghemat waktu implementasi skema dasar database.

## Peningkatan Selanjutnya
Mengimplementasikan penyimpanan draf asinkron `localStorage`/`AsyncStorage` untuk melindungi tulisan pengguna saat koneksi internet tiba-tiba terputus.

## Sumber yang Dibaca
- [02-intent-brief.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/02-intent-brief.md)
- [03-prd.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/03-prd.md)
- [08-loop-log.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/08-loop-log.md)
- [10-test-plan.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/10-test-plan.md)
- [12-demo-script.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/12-demo-script.md)
