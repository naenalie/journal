# Dokumen Kebutuhan Produk (PRD)

## Ringkasan
Digital Scrapbook Journal (Tema Kawaii) adalah aplikasi lintas platform (Web dan Mobile) yang dirancang untuk individu kreatif yang ingin menulis dan mengatur catatan jurnal harian mereka dalam antarmuka yang sangat lucu (cute) bergaya scrapbook fisik.

## Target Pengguna
Penulis jurnal, perencana kreatif, dan penggemar jurnal bullet (bullet journal) yang menyukai kustomisasi visual (warna pastel, tata letak bergaya scrapbook, font tulisan tangan) tetapi membutuhkan kemudahan pencarian, keamanan, dan sinkronisasi real-time yang ditawarkan aplikasi digital.

## Masalah
Jurnal fisik tidak memiliki fitur pencadangan, sinkronisasi antar perangkat, atau pencarian cepat. Di sisi lain, aplikasi jurnal digital yang ada saat ini kurang mendukung ekspresi visual dan terasa dingin, kaku, serta terlalu korporat.

## Tujuan (Goals)
- Menyediakan pendaftaran dan login pengguna yang aman.
- Mendukung operasi CRUD lengkap untuk entri jurnal teks dengan judul, tanggal, mood, dan tag.
- Menampilkan entri dalam grid scrapbook kustom (latar belakang kertas dot-grid krem, catatan pastel yang diputar, teks judul melengkung/bubbly, bayangan lembut).
- Menyinkronkan semua entri secara real-time antara Web (Next.js) dan Mobile (Expo) menggunakan database Supabase bersama.
- Menyaring dan mencari entri berdasarkan judul, mood, atau tag.

## Non-Goals / Di Luar Cakupan
- Unggahan media/foto dan penyimpanan Supabase Storage (ditunda ke Fase 2).
- Sinkronisasi database offline-first secara penuh.
- Pengingat harian atau notifikasi push.
- Transkripsi jurnal suara ke teks (voice-to-text).
- Ekspor data ke format PDF atau JSON.

## User Stories (Kisah Pengguna)
- Sebagai penulis jurnal, saya ingin membuat entri baru dengan judul, konten, tanggal, mood, dan tag, sehingga saya dapat mendokumentasikan memori saya.
- Sebagai penulis jurnal kreatif, saya ingin melihat entri jurnal ditampilkan sebagai kartu catatan pastel yang sedikit diputar di atas kertas dot-grid krem, sehingga jurnal saya terasa seperti buku catatan fisik yang nyaman.
- Sebagai penulis jurnal multi-perangkat, saya ingin agar perubahan yang saya lakukan di aplikasi ponsel saya langsung tersinkronisasi ke aplikasi web, sehingga jurnal saya selalu mutakhir.
- Sebagai perencana yang pelupa, saya ingin mencari entri masa lalu berdasarkan tag atau kata kunci, sehingga saya dapat dengan cepat menemukan kenangan atau suasana hati di masa lalu.
- Sebagai penulis jurnal pribadi, saya ingin mendaftar dan masuk secara aman, sehingga catatan pribadi saya tetap rahasia.

## Alur Utama Pengguna (Core User Flows)
1. **Onboarding Pengguna:** Pengguna mendaftar -> masuk (login) -> diarahkan ke halaman utama jurnal.
2. **Menulis Entri Jurnal:** Pengguna mengklik "Entri Baru" -> memilih tanggal dan emoji mood -> menulis judul dan teks isi -> menambahkan tag -> menyimpan -> entri muncul di kanvas grid scrapbook.
3. **Mencari Entri:** Pengguna mengetik kata kunci di bar pencarian -> kartu-kartu jurnal tersaring secara dinamis untuk menampilkan entri yang cocok.

## Kebutuhan Fungsional (Functional Requirements)
- **FR1 (Autentikasi):** Pengguna dapat mendaftar, masuk, dan keluar di aplikasi Web dan Mobile.
- **FR2 (Jurnal CRUD):** Pengguna dapat membuat, membaca, memperbarui, dan menghapus entri jurnal.
- **FR3 (Kolom Data):** Entri jurnal mendukung kolom: judul (string), konten (teks), tanggal (date), mood (emoji/teks), tag (array string).
- **FR4 (Tata Letak Scrapbook):** Entri jurnal dirender sebagai kartu kustom dengan font tulisan tangan untuk isi, judul tebal bergaya marker/bubbly, bayangan lembut, dan rotasi acak kecil.
- **FR5 (Pencarian & Filter):** Pengguna dapat mencari teks dan menyaring mood/tag secara real-time.
- **FR6 (Sinkronisasi Multi-Perangkat):** Sinkronisasi database langsung diperbarui saat ada perubahan dari Web maupun Mobile.

## Kebutuhan Non-Fungsional (Non-Functional Requirements)
- **Keamanan:** Menerapkan Row-Level Security (RLS) di tabel PostgreSQL agar pengguna hanya dapat mengakses data mereka sendiri.
- **Privasi:** Data baris pengguna diisolasi menggunakan UUID pengguna.
- **Kemudahan Penggunaan (Usability):** Antarmuka wajib menggunakan warna pastel lembut (pink, blue, yellow, mint, lavender) and sudut sangat melengkung (border-radius besar) untuk nuansa ramah dan lucu.
- **Aksesibilitas:** Gunakan teks navy tua `#1B263B` di atas latar belakang krem untuk keterbacaan yang tinggi.

## Kriteria Penerimaan (Acceptance Criteria)
- AC1: Kebijakan RLS membatasi akses; pengguna tidak dapat melihat atau mengedit entri milik pengguna lain.
- AC2: Font Google (*Fredoka* dan *Kalam*) dimuat dengan benar di peramban web dan emulator mobile.
- AC3: CRUD entri di aplikasi Web langsung terlihat di aplikasi Mobile saat di-refresh (dan sebaliknya).
- AC4: Input pencarian kosong menampilkan semua entri; memasukkan kata kunci berhasil memfilter kartu jurnal berdasarkan pencocokan judul, konten, atau tag.

## Risiko dan Pertanyaan Terbuka
- **Performa:** Render rotasi dan border-radius besar pada banyak elemen kartu di web dan mobile. Mungkin membutuhkan virtualisasi jika jumlah entri mencapai ratusan.
- **Konektivitas Supabase:** Aplikasi memerlukan koneksi online aktif. Jika terputus, error harus ditangani secara anggun tanpa merusak UI.

## Sumber yang Dibaca
- [02-intent-brief.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/02-intent-brief.md)
