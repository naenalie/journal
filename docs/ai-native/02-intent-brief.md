# Intent Brief (Ringkasan Tujuan)

## Nama Proyek
Digital Scrapbook Journal (Tema Kawaii)

## Tujuan Utama dalam Satu Kalimat
Platform jurnal digital (Web & Mobile) yang aman dan tersinkronisasi dengan gaya visual "kawaii scrapbook" untuk ekspresi diri yang kreatif.

## Pengguna Utama
Penulis jurnal dan pencinta buku catatan estetis yang menyukai palet warna pastel, tata letak bergaya scrapbook, dan memerlukan kemudahan pencarian serta sinkronisasi digital.

## Masalah Pengguna
Jurnal fisik tidak dapat dicari secara instan atau disinkronkan antar perangkat, sedangkan aplikasi jurnal digital yang ada saat ini terlalu kaku, dingin, dan monoton (terlalu korporat).

## Goals (Tujuan Proyek)
- Autentikasi aman untuk melindungi kerahasiaan jurnal pengguna.
- Sinkronisasi entri jurnal yang lancar antara Web (Next.js) dan Mobile (Expo).
- Komponen UI estetis yang dikustomisasi (kartu pastel, latar belakang dot-grid kertas, elemen kartu yang sedikit diputar).
- Fitur CRUD dasar entri jurnal (Judul, konten, mood, tanggal, dan tag).
- Pencarian dan penyaringan teks.

## Non-Goals (Bukan Tujuan Fase Ini)
- Unggahan media/foto dan penyimpanan Supabase Storage (ditunda).
- Sinkronisasi database offline-first secara penuh.
- Rekaman suara, pengingat harian, dan ekspor PDF/JSON.

## Constraints (Batasan)
- **Platform:** Web (Next.js) dan Mobile (React Native Expo).
- **Backend:** Database Supabase PostgreSQL dan Autentikasi bersama.
- **Estetika:** Latar belakang dot-grid krem, bayangan lembut, palet pastel, Fredoka (judul), Kalam (teks isi), teks navy tua.

## Tradeoffs (Pilihan Sulit)
- **Custom Styling vs. Komponen Standar:** Membuat elemen responsif dengan rotasi kustom di CSS Modules / StyleSheet memerlukan usaha tata letak lebih dibanding pustaka UI standar.
- **Online-first vs. Offline-first:** Memprioritaskan sinkronisasi online ke Supabase menyederhanakan logika database MVP tetapi memerlukan koneksi internet aktif untuk menulis/mengedit.

## Success Criteria (Kriteria Keberhasilan)
- Pengguna dapat mendaftar, masuk, menulis entri di Web App, dan melihatnya langsung muncul di Mobile App (dan sebaliknya).
- Latar belakang dot-grid, gaya pastel, dan font Google dimuat dengan benar di kedua platform.
- Fitur pencarian berfungsi menyaring entri berdasarkan judul, kategori, atau tag.

## Pertanyaan Terbuka
- Kategori tag default apa saja yang harus disediakan?
- Pustaka ikon bergaya doodle apa yang sebaiknya digunakan?

## Sumber yang Dibaca
- [01-grill-my-idea.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/01-grill-my-idea.md)
