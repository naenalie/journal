"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "./page.module.css";

export default function Home() {
  // Sesi pengguna & Loading
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authView, setAuthView] = useState("login"); // 'login' atau 'register'

  // Input Autentikasi
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Data Jurnal
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMood, setFilterMood] = useState("");

  // State Modal (Tambah/Edit)
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  // Form Entri Jurnal
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("😊 Senang");
  const [cardColor, setCardColor] = useState("pink"); // pink, blue, mint, lavender, yellow
  const [dateString, setDateString] = useState("");
  const [tags, setTags] = useState("");

  // Daftar Pilihan Mood & Warna
  const moodOptions = [
    { label: "😊 Senang", emoji: "😊" },
    { label: "🍃 Tenang", emoji: "🍃" },
    { label: "😴 Lelah", emoji: "😴" },
    { label: "😢 Sedih", emoji: "😢" },
    { label: "🔥 Semangat", emoji: "🔥" },
    { label: "🥰 Cinta", emoji: "🥰" },
  ];

  const colorOptions = [
    { value: "pink", name: "Pink Lembut", hex: "var(--pastel-pink)" },
    { value: "blue", name: "Biru Awan", hex: "var(--pastel-blue)" },
    { value: "mint", name: "Hijau Mint", hex: "var(--pastel-mint)" },
    { value: "lavender", name: "Ungu Lavender", hex: "var(--pastel-lavender)" },
    { value: "yellow", name: "Kuning Cerah", hex: "var(--pastel-yellow)" },
  ];

  // Ambil user saat komponen dimuat
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) {
        fetchEntries(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          fetchEntries(session.user.id);
        } else {
          setEntries([]);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Set tanggal default ke hari ini saat modal dibuka
  useEffect(() => {
    if (showModal && !editingEntry) {
      const today = new Date().toISOString().split("T")[0];
      setDateString(today);
    }
  }, [showModal, editingEntry]);

  // Ambil semua entri jurnal untuk user tertentu
  const fetchEntries = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .order("date_string", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Gagal mengambil entri jurnal:", error.message);
    }
  };

  // Tangani Registrasi Pengguna Baru
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password || !username) {
      setErrorMsg("Semua kolom harus diisi!");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            avatar_url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`,
          },
        },
      });

      if (error) throw error;

      setSuccessMsg("Pendaftaran berhasil! Silakan cek email Anda atau langsung masuk.");
      setAuthView("login");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  // Tangani Login Pengguna
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password) {
      setErrorMsg("Email dan Password harus diisi!");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error) {
      setErrorMsg("Email atau Password salah!");
    }
  };

  // Tangani Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Buka Modal untuk Entri Baru
  const openNewEntryModal = () => {
    setEditingEntry(null);
    setTitle("");
    setContent("");
    setMood("😊 Senang");
    setCardColor("pink");
    setTags("");
    setShowModal(true);
  };

  // Buka Modal untuk Edit Entri
  const openEditEntryModal = (entry) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    
    // Decode mood dan warna jika disimpan dengan format gabungan (moodName|colorClass)
    if (entry.mood && entry.mood.includes("|")) {
      const [savedMood, savedColor] = entry.mood.split("|");
      setMood(savedMood);
      setCardColor(savedColor);
    } else {
      setMood(entry.mood || "😊 Senang");
      setCardColor("pink");
    }
    
    setDateString(entry.date_string);
    // Kita bisa mengekstrak tags jika disimpan di dalam content atau judul.
    const contentLines = entry.content.split("\n");
    const lastLine = contentLines[contentLines.length - 1];
    if (lastLine && lastLine.startsWith("Tags: ")) {
      setTags(lastLine.replace("Tags: ", ""));
      setContent(contentLines.slice(0, -1).join("\n"));
    } else {
      setTags("");
    }

    setShowModal(true);
  };

  // Tangani Menyimpan Jurnal (Create atau Update)
  const handleSaveEntry = async (e) => {
    e.preventDefault();
    if (!title || !content || !dateString) {
      alert("Judul, Isi, dan Tanggal wajib diisi!");
      return;
    }

    // Gabungkan konten dengan tag agar tersimpan di DB
    let finalContent = content;
    if (tags.trim()) {
      const formattedTags = tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
        .map((t) => (t.startsWith("#") ? t : `#${t}`))
        .join(" ");
      finalContent = `${content}\n\nTags: ${formattedTags}`;
    }

    // Gabungkan mood dan warna kartu
    const finalMood = `${mood}|${cardColor}`;

    try {
      if (editingEntry) {
        // Mode Edit (Update)
        const { error } = await supabase
          .from("journal_entries")
          .update({
            title,
            content: finalContent,
            mood: finalMood,
            date_string: dateString,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingEntry.id);

        if (error) throw error;
      } else {
        // Mode Baru (Create)
        const { error } = await supabase.from("journal_entries").insert([
          {
            user_id: user.id,
            title,
            content: finalContent,
            mood: finalMood,
            date_string: dateString,
          },
        ]);

        if (error) throw error;
      }

      setShowModal(false);
      fetchEntries(user.id);
    } catch (error) {
      alert("Gagal menyimpan entri: " + error.message);
    }
  };

  // Tangani Hapus Jurnal
  const handleDeleteEntry = async (id) => {
    if (!confirm("Apakah kamu yakin ingin menghapus jurnal kenangan manis ini? 😢")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("journal_entries")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchEntries(user.id);
    } catch (error) {
      alert("Gagal menghapus entri: " + error.message);
    }
  };

  // Filter Entri Jurnal
  const filteredEntries = entries.filter((entry) => {
    // Parsing mood dan warna
    let entryMoodName = "";
    if (entry.mood && entry.mood.includes("|")) {
      entryMoodName = entry.mood.split("|")[0];
    } else {
      entryMoodName = entry.mood || "";
    }

    // Pencarian teks (judul, konten)
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter mood
    const matchesMood = filterMood ? entryMoodName.includes(filterMood) : true;

    return matchesSearch && matchesMood;
  });

  if (loading) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard} style={{ textAlign: "center" }}>
          <h2>Memuat Catatan Kenangan... 🌸</h2>
        </div>
      </div>
    );
  }

  // JIKA PENGGUNA BELUM LOGIN
  if (!user) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authTabs}>
            <button
              className={`${styles.authTabButton} ${
                authView === "login" ? styles.authTabButtonActive : ""
              }`}
              onClick={() => {
                setAuthView("login");
                setErrorMsg("");
                setSuccessMsg("");
              }}
            >
              Masuk
            </button>
            <button
              className={`${styles.authTabButton} ${
                authView === "register" ? styles.authTabButtonActive : ""
              }`}
              onClick={() => {
                setAuthView("register");
                setErrorMsg("");
                setSuccessMsg("");
              }}
            >
              Daftar Baru
            </button>
          </div>

          {errorMsg && <div className={styles.errorAlert}>{errorMsg}</div>}
          {successMsg && <div className={styles.successAlert}>{successMsg}</div>}

          {authView === "login" ? (
            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  className={styles.inputField}
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="login-password">Kata Sandi</label>
                <input
                  id="login-password"
                  type="password"
                  className={styles.inputField}
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={`${styles.bubblyButton} ${styles.w100}`}>
                Yuk Masuk! ✨
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className={styles.formGroup}>
                <label htmlFor="reg-username">Nama Panggilan</label>
                <input
                  id="reg-username"
                  type="text"
                  className={styles.inputField}
                  placeholder="Budi"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="reg-email">Email</label>
                <input
                  id="reg-email"
                  type="email"
                  className={styles.inputField}
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="reg-password">Kata Sandi</label>
                <input
                  id="reg-password"
                  type="password"
                  className={styles.inputField}
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={`${styles.bubblyButton} ${styles.w100}`}>
                Buat Akun Imut! 🌸
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // JIKA PENGGUNA SUDAH LOGIN (DASHBOARD UTAMA)
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <h1 className={styles.title}>🌸 Jurnal Harian Imut</h1>
        </div>
        <div className={styles.profileArea}>
          <span className={styles.profileName}>
            Halo, <strong>{user.user_metadata?.username || user.email}</strong>!
          </span>
          <button
            onClick={handleLogout}
            className={`${styles.bubblyButton} ${styles.buttonDanger}`}
          >
            Keluar 🚪
          </button>
        </div>
      </header>

      {/* Toolbar Pencarian & Filter */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Cari kenangan manis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <button
            className={`${styles.filterBtn} ${!filterMood ? styles.filterBtnActive : ""}`}
            onClick={() => setFilterMood("")}
          >
            Semua Mood
          </button>
          {moodOptions.map((opt) => (
            <button
              key={opt.label}
              className={`${styles.filterBtn} ${
                filterMood === opt.emoji ? styles.filterBtnActive : ""
              }`}
              onClick={() => setFilterMood(opt.emoji)}
            >
              {opt.emoji}
            </button>
          ))}
        </div>

        <button onClick={openNewEntryModal} className={styles.bubblyButton}>
          Tulis Jurnal Baru 📝
        </button>
      </div>

      {/* Grid Scrapbook */}
      <div className={styles.gridCanvas}>
        {filteredEntries.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>Belum ada kenangan manis di sini...</h2>
            <p className={styles.emptyStateText}>
              Yuk, mulai hari ini dengan menuliskan kisah bahagiamu! Klik tombol "Tulis Jurnal Baru" di atas.
            </p>
          </div>
        ) : (
          filteredEntries.map((entry, index) => {
            // Urutkan warna dan mood dari format gabungan
            let entryMood = "😊 Senang";
            let entryColor = "pink";
            if (entry.mood && entry.mood.includes("|")) {
              const [m, c] = entry.mood.split("|");
              entryMood = m;
              entryColor = c;
            } else {
              entryMood = entry.mood || "😊 Senang";
            }

            // Kemiringan rotasi acak kecil agar terlihat alami seperti scrapbook fisik
            const rotation = ((index % 5) - 2) * 1.5; // Menghasilkan rotasi antara -3deg dan +3deg

            // Ekstrak tag untuk ditampilkan secara visual di kartu
            const contentLines = entry.content.split("\n");
            let displayContent = entry.content;
            let displayTags = [];

            const lastLine = contentLines[contentLines.length - 1];
            if (lastLine && lastLine.startsWith("Tags: ")) {
              displayTags = lastLine
                .replace("Tags: ", "")
                .split(" ")
                .filter((t) => t.length > 0);
              displayContent = contentLines.slice(0, -1).join("\n");
            }

            // Temukan warna hex yang sesuai
            const matchedColor = colorOptions.find((c) => c.value === entryColor) || colorOptions[0];

            return (
              <div key={entry.id} className={styles.cardWrapper}>
                {/* Isolasi Washi Tape */}
                <div className={styles.washiTape}></div>
                <div
                  className={styles.stickyCard}
                  style={{
                    backgroundColor: matchedColor.hex,
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{entry.title}</h3>
                    <div className={styles.cardDate}>
                      {new Date(entry.date_string).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <div className={styles.cardContent}>{displayContent}</div>

                  {displayTags.length > 0 && (
                    <div className={styles.tagWrapper}>
                      {displayTags.map((tag) => (
                        <span key={tag} className={styles.tagBadge}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className={styles.cardFooter}>
                    <span className={styles.moodBadge}>{entryMood}</span>
                    <div className={styles.cardActions}>
                      <button
                        title="Edit Jurnal"
                        className={styles.iconBtn}
                        onClick={() => openEditEntryModal(entry)}
                      >
                        ✏️
                      </button>
                      <button
                        title="Hapus Jurnal"
                        className={`${styles.iconBtn} ${styles.btnDanger}`}
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Tulis/Edit Entri Jurnal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              {editingEntry ? "Edit Kenangan Manis 🌸" : "Tulis Kenangan Baru ✨"}
            </h2>
            <form onSubmit={handleSaveEntry}>
              <div className={styles.formGroup}>
                <label htmlFor="modal-title">Judul Jurnal</label>
                <input
                  id="modal-title"
                  type="text"
                  className={styles.inputField}
                  placeholder="Hari Yang Sangat Menyenangkan!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroupTwoColumns}>
                <div className={styles.formGroup}>
                  <label htmlFor="modal-date">Tanggal</label>
                  <input
                    id="modal-date"
                    type="date"
                    className={styles.inputField}
                    value={dateString}
                    onChange={(e) => setDateString(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="modal-mood">Bagaimana Perasaanmu?</label>
                  <select
                    id="modal-mood"
                    className={styles.inputField}
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                  >
                    {moodOptions.map((opt) => (
                      <option key={opt.label} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Pilih Warna Kartu</label>
                <div className={styles.colorPicker}>
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      title={color.name}
                      className={`${styles.colorCircle} ${
                        cardColor === color.value ? styles.colorCircleActive : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setCardColor(color.value)}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="modal-content">Tuliskan Ceritamu</label>
                <textarea
                  id="modal-content"
                  className={styles.inputField}
                  rows="6"
                  placeholder="Tulis apa saja yang membuatmu tersenyum hari ini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="modal-tags">Tag (pisahkan dengan koma)</label>
                <input
                  id="modal-tags"
                  type="text"
                  className={styles.inputField}
                  placeholder="bahagia, kuliner, liburan"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={`${styles.bubblyButton} ${styles.buttonSecondary}`}
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
                <button type="submit" className={styles.bubblyButton}>
                  Simpan Jurnal 💖
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
