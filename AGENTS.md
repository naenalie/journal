# AGENTS.md

## Tujuan Proyek
Membangun platform Digital Scrapbook Jurnal yang aman dan tersinkronisasi secara real-time yang berjalan di Web (Next.js) dan Mobile (Expo React Native) dengan tampilan "cute, aesthetic kawaii scrapbook" yang nyaman, menampilkan halaman dot-grid, warna pastel, dan gaya tulisan tangan.

## Dokumen Acuan Utama (Source of Truth)
- **Intent Brief:** `docs/ai-native/02-intent-brief.md`
- **PRD:** `docs/ai-native/03-prd.md`
- **Rencana Arsitektur:** `docs/ai-native/04-architecture.md`
- **Backlog Isu:** `docs/ai-native/05-issues.md`

## Tumpukan Teknologi (Stack)
- **Frontend Web:** Next.js (App Router, Javascript, CSS Modules).
- **Frontend Mobile:** React Native (Expo, TypeScript, StyleSheet).
- **Backend:** Supabase (Auth, PostgreSQL DB).

## Aturan Pengkodean (Coding Rules)
- **Gaya CSS:** JANGAN gunakan Tailwind CSS. Gunakan kustom Vanilla CSS / CSS Modules untuk Next.js dan StyleSheet React Native untuk Expo untuk mempertahankan kontrol tata letak yang presisi.
- **Palet Warna:** Ikuti palet pastel lembut: Krem `#FDFBF7`, Pink `#FFF0F5`, Biru `#E6F2FF`, Mint `#EAF8F2`, Lavender `#F3E8FF`, Kuning `#FEF9E7`, dan Teks Navy Tua `#1B263B`.
- **Tipografi:** Terapkan `Fredoka` untuk judul bubbly/marker, `Kalam` untuk teks isi (tulisan tangan), dan sans-serif bersih/Space Mono untuk widget.
- **Desain Komponen:** Pertahankan sudut melengkung bulat (`border-radius: 16px` hingga `24px` atau lebih untuk tampilan bubbly), berikan sedikit kemiringan menggunakan transform (`transform: rotate(-1.5deg)` atau `1.5deg`), dan bayangan lembut.

## Larangan (Do Not)
- Jangan instal Tailwind CSS atau pustaka CSS utilitas lainnya kecuali diminta secara eksplisit.
- Jangan impor pustaka komponen pihak ketiga sembarangan (seperti shadcn/ui, Material UI, NativeBase) tanpa persetujuan. Bangun tata letak kustom secara manual.
- Jangan abaikan kebijakan RLS Supabase; semua query database wajib menyertakan sesi pengguna terautentikasi.
- Jangan mengubah berkas di luar folder `web/`, `mobile/`, atau `supabase/`.

## Perintah Pengembangan (Commands)
### Aplikasi Web (`web/`)
- Instalasi: `npm install`
- Jalankan: `npm run dev`
- Build: `npm run build`

### Aplikasi Mobile (`mobile/`)
- Instalasi: `npm install`
- Jalankan: `npx expo start`

## Verifikasi Sebelum Selesai
- Setiap isu harus dikompilasi dan dijalankan tanpa error sintaks, pemuatan font, atau log kesalahan konsol di Web maupun Mobile.
- Periksa batasan baris database: verifikasi query sebagai Pengguna B tidak dapat mengambil atau mengubah data Pengguna A.
- Periksa kesesuaian visual pada layout responsif (browser desktop dan emulator ponsel).

## Keamanan dan Privasi
- Row-Level Security (RLS) adalah keharusan. Database harus membatasi akses via `auth.uid() = user_id`.
- Jangan pernah memasukkan kunci API publik atau rahasia Supabase ke dalam repositori git. Gunakan berkas `.env` dan `.env.local`.

## Tanyakan Terlebih Dahulu Saat
- Berencana menambahkan paket node baru atau dependensi eksternal.
- Mengusulkan perubahan pada skema database atau menambah tabel relasional baru.
- Mengubah warna palet atau tipografi di luar panduan visual.
