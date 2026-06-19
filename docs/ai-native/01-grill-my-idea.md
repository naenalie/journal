# Hasil Grill Ide

## Restrukturisasi Ide
Aplikasi jurnal dan perencana harian lintas platform (Web Next.js dan Mobile Expo) dengan estetika "kawaii scrapbook" yang sangat personal dan kreatif, memungkinkan pengguna mencatat pemikiran harian dan kenangan dengan gaya buku catatan fisik yang nyaman.

## Pengguna Utama
Penggemar jurnal dan buku catatan estetis yang menyukai palet pastel, font tulisan tangan, stiker, dan tata letak organik, serta membutuhkan alternatif digital yang aman, dapat dicari, dan tersinkronisasi antar perangkat.

## Masalah yang Dipecahkan
Aplikasi jurnal digital standar terasa kaku, dingin, dan terlalu korporat, sehingga kurang mendukung ekspresi seni personal. Di sisi lain, jurnal fisik mudah rusak/hilang, tidak bisa dicari secara instan, tidak memiliki pencadangan aman, serta sulit disinkronkan antar perangkat.

## Pertanyaan Sulit
1. **Pilihan Arsitektur:** Bagaimana cara merilis aplikasi untuk web dan mobile sekaligus? (Diputuskan: Repositori terpisah untuk Next.js Web dan React Native Expo Mobile dengan database Supabase bersama).
2. **Layanan Backend:** Layanan apa yang akan menangani autentikasi, database real-time, dan penyimpanan media? (Diputuskan: Supabase untuk PostgreSQL, Autentikasi, dan Penyimpanan file).
3. **Fitur Utama (MVP):** Apa fungsionalitas inti yang dibangun pertama kali? (Diputuskan: Operasi CRUD dasar untuk entri jurnal dengan tanggal, kategori/tag, dan fitur pencarian).
4. **Gaya Visual:** Palet desain spesifik apa yang diinginkan? (Diputuskan: Tema "cute, aesthetic" dengan latar belakang dot-grid krem, warna kartu pastel, font judul Fredoka, dan tulisan tangan Kalam).

## Asumsi
- Pengguna memiliki Node.js dan npm untuk pengembangan Next.js dan Expo secara lokal.
- Alur autentikasi satu pengguna via Supabase sudah cukup untuk pembagian data database.
- Koneksi internet tersedia untuk sinkronisasi database real-time di fase pertama.

## Versi Terkecil yang Berguna (MVP)
Aplikasi web dan mobile di mana pengguna terdaftar dapat masuk, melihat daftar entri jurnal masa lalu berupa kartu pastel lucu di atas kertas dot-grid krem, melakukan CRUD teks dasar, dan mencari entri berdasarkan judul/tag.

## Non-Goals (Bukan Tujuan Fase Ini)
- Unggah media/foto dan rendering tata letak polaroid (ditunda ke Fase 2).
- Sinkronisasi database offline-first dan resolusi konflik data.
- Kunci PIN/Biometrik dan pengingat harian kustom.
- Rekaman audio atau transkripsi jurnal suara ke teks.

## Pintu Keputusan
**Lanjutkan**, karena kita telah mempersempit cakupan MVP pada CRUD teks inti, menyelaraskan tumpukan teknologi, dan membuat panduan gaya visual berdasarkan scrapbook digital pengguna.

## Sumber yang Dibaca
Tidak ada — artefak alur pertama.
