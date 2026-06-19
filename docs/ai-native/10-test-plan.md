# Rencana Pengujian (Test Plan)

## Ruang Lingkup
Rencana pengujian ini memvalidasi setup database, isolasi keamanan RLS, alur autentikasi, serta operasi CRUD jurnal pada Digital Scrapbook Journal.

## Pengujian Wajib Lolos (Must-Pass Tests)

### Pengujian 1: Pemeriksaan Isolasi RLS Database
**Langkah-langkah:**
1. Masukkan akun pengguna tiruan ke `auth.users` (Pengguna A).
2. Masukkan akun pengguna tiruan ke `auth.users` (Pengguna B).
3. Dalam konteks Pengguna A, tulis baris entri jurnal di `public.journal_entries`.
4. Coba minta data kueri `public.journal_entries` menggunakan sesi/kredensial Pengguna B.
**Hasil yang Diharapkan:**
- Catatan Pengguna A tidak boleh terlihat oleh Pengguna B (kueri mengembalikan hasil kosong atau kesalahan).

### Pengujian 2: Pemeriksaan Pembuatan Profil Otomatis saat Pendaftaran
**Langkah-langkah:**
1. Daftarkan akun pengguna baru dengan kolom meta_data `username` = "cute_bunny" dan `avatar_url` = "bunny.png".
2. Lakukan kueri pada tabel `public.profiles` mencari UUID yang cocok.
**Hasil yang Diharapkan:**
- Baris baru dibuat otomatis di `public.profiles` dengan user ID yang sesuai, menyimpan "cute_bunny" dan "bunny.png".

### Pengujian 3: Pemeriksaan Font dan Tata Letak Grid Web
**Langkah-langkah:**
1. Buka aplikasi web dan navigasikan ke `/journal`.
2. Periksa elemen heading dan gaya teks isi.
**Hasil yang Diharapkan:**
- Latar belakang dot-grid krem dirender dengan benar.
- Elemen judul memuat font bubbly `Fredoka` dan tulisan teks isi memuat font tulisan tangan `Kalam`.
- Kartu notes memiliki sudut melengkung dan sedikit kemiringan visual (rotation).

### Pengujian 4: CRUD Lengkap dan Filter Pencarian Web
**Langkah-langkah:**
1. Masuk ke aplikasi.
2. Tambahkan entri baru dengan judul: "Cozy Afternoon", konten: "Drinking hot latte", mood: "☕", dan tag: "cafe, winter".
3. Pastikan kartu dirender pada kanvas dasbor utama.
4. Ketik "latte" di kolom input pencarian. Pastikan daftar menyaring hanya menampilkan entri "Cozy Afternoon".
5. Edit entri tersebut untuk menambahkan tag baru "sweet" menjadi "cafe, winter, sweet" dan pastikan perubahan tersimpan.
6. Hapus entri tersebut dan pastikan kartu catatan terhapus dari kanvas.
**Expected Result:**
- Form CRUD menulis data dengan sukses ke database.
- Pencarian menyaring data secara instan.
- Penghapusan memproses data dan kartu dihapus dari layar.

## Kasus Batas (Edge Cases)
- **Karakter Khusus dalam Pencarian:** Pastikan pencarian karakter seperti `[`, `*`, `?`, `#` tidak merusak indeks penyaringan klien.
- **Judul Kosong atau Konten Kosong:** Pastikan pengiriman form jurnal tanpa isi memicu pesan validasi kesalahan dan memblokir penyimpanan.
- **Jumlah Tag Berlebih:** Pastikan kartu menyesuaikan ukuran tinggi dan tidak pecah secara visual saat tag yang dimasukkan lebih dari 10.

## Kasus Kegagalan (Failure Cases)
- **Koneksi Terputus:** Pastikan klien mendeteksi kegagalan jaringan, menampilkan peringatan koneksi, dan mempertahankan teks tulisan pengguna agar draf tidak hilang.
- **Kredensial Login Tidak Valid:** Pastikan login gagal dengan notifikasi yang jelas dan tidak merusak alur aplikasi.

## Saran Pengujian Otomatis
- **Uji Coba SQL RLS:** Gunakan `pgTAP` atau script pengujian Node/Jest sederhana yang memanggil SDK Supabase dengan JWT Pengguna A dan Pengguna B untuk memastikan isolasi query.
- **Uji Coba Komponen:** Tulis pengujian Jest/React Testing Library untuk komponen `StickyCard` guna memastikan range rotasi kustom dihitung dengan benar.

## Daftar Demonstrasi (Demo Checklist)
- [ ] Pengguna masuk (login).
- [ ] Pengguna membuat catatan jurnal manis dengan mood emoji dan tag.
- [ ] Halaman kanvas dot-grid merender kartu dengan rotasi kustom dan selotip washi.
- [ ] Pengguna menyaring entri menggunakan fitur pencarian tag.
- [ ] Pengguna mengubah detail entri jurnal.
- [ ] Pengguna keluar (logout).

## Bukti yang Harus Dikumpulkan
- Tangkapan layar tabel database Supabase yang membuktikan profil baru dibuat otomatis.
- Tangkapan layar Next.js di rute `/journal` yang merender kartu di atas kertas dot-grid krem.
- Log jaringan peramban yang membuktikan token JWT dikirim dengan benar di header request.

## Sumber yang Dibaca
- [03-prd.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/03-prd.md)
- [05-issues.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/05-issues.md)
- [08-loop-log.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/08-loop-log.md)
- [09-code-review.md](file:///C:/Users/User/.gemini/antigravity/scratch/digital-scrapbook-journal/docs/ai-native/09-code-review.md)
