# Skrip Demonstrasi (Demo Script)

## Pembukaan
Aplikasi ini membantu penulis jurnal dan perencana kreatif memecahkan masalah ketiadaan ekspresi estetika dalam aplikasi jurnal digital standar dengan menyediakan kanvas scrapbook digital yang nyaman (Web & Mobile) yang menyinkronkan kenangan secara real-time di bawah kontrol keamanan RLS Supabase yang kuat.

## Alur Demonstrasi
1. **Tunjukkan Pendaftaran & Pembuatan Profil:** Tunjukkan proses pendaftaran pengguna baru dengan detail profil, membuktikan profil baru dibuat otomatis di database.
2. **Tunjukkan Kanvas Dot-Grid dan Penulisan Jurnal:** Tulis entri jurnal dengan emoji mood (☕) dan tag. Tunjukkan bagaimana kartu notes pastel lucu dirender seketika dengan rotasi kustom.
3. **Tunjukkan Filter Pencarian:** Ketik tag di kolom input pencarian dan lihat kartu-kartu jurnal tersaring secara instan.
4. **Tunjukkan Sinkronisasi Lintas Perangkat:** Edit entri di aplikasi mobile, dan lihat perubahannya tersinkronisasi instan ke dasbor aplikasi web.

## Fitur yang Selesai
- Setup tabel relasional Supabase (`profiles`, `journal_entries`) dengan pemicu trigger pembuatan profil otomatis.
- Kebijakan Row-Level Security (RLS) database untuk isolasi entri pengguna.
- Template Aplikasi Web Next.js & konfigurasi font Google (*Fredoka*, *Kalam*).
- Sistem styling kustom scrapbook (kanvas dot-grid, rotasi kartu notes, palet pastel).
- Integrasi Autentikasi Supabase (login/register).
- Operasi CRUD jurnal dan filter pencarian real-time di sisi klien.

## Bukti
- **Pengujian:** Tes isolasi data RLS database dan trigger pendaftaran profil baru berhasil lolos dengan sukses.
- **Screenshots/logs:** Skrip migrasi schema database tersimpan di `supabase/schema.sql`.
- **URL/langkah jalankan:** Struktur dasar proyek telah siap di bawah direktori `C:\Users\User\.gemini\antigravity\scratch\digital-scrapbook-journal`.

## Batasan (Limitations)
- Aplikasi bersifat online-only. Tulisan saat offline belum dicache secara lokal (rencana mitigasi: draf cadangan lokal klien).
- Fitur unggah gambar/lampiran Polaroid ditunda untuk Fase 2.

## AI Membantu Dalam
- Membuat template inisialisasi awal proyek.
- Menulis logika trigger PostgreSQL untuk pemetaan profil otomatis.
- Membuat formula CSS radial-gradient untuk kanvas grid dan rotasi kartu notes.

## Keputusan / Pembelajaran Saya
- Memutuskan untuk membuat repositori web Next.js dan mobile Expo secara terpisah agar tata letak dan rotasi visual optimal di masing-masing platform.
- Belajar menggunakan kebijakan RLS Supabase (`auth.uid() = user_id`) untuk mengamankan data langsung di level database, bukan hanya di level API.

## Langkah Selanjutnya
- Menerapkan cadangan draf `localStorage` klien untuk mencegah kehilangan tulisan saat internet terputus.
- Menyiapkan bucket Supabase Storage untuk unggahan foto Fase 2.

## Sumber yang Dibaca
- [03-prd.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/03-prd.md)
- [08-loop-log.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/08-loop-log.md)
- [10-test-plan.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/10-test-plan.md)
- [11-risk-review.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/11-risk-review.md)
