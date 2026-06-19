import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { supabase } from '../lib/supabaseClient';

export default function HomeScreen() {
  // Sesi pengguna & Loading
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  // Input Autentikasi
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // Data Jurnal
  const [entries, setEntries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMood, setFilterMood] = useState('');

  // State Modal (Tambah/Edit)
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);

  // Form Entri Jurnal
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('😊 Senang');
  const [cardColor, setCardColor] = useState('pink'); // pink, blue, mint, lavender, yellow
  const [dateString, setDateString] = useState('');
  const [tags, setTags] = useState('');

  // Daftar Pilihan Mood & Warna
  const moodOptions = [
    { label: '😊 Senang', emoji: '😊' },
    { label: '🍃 Tenang', emoji: '🍃' },
    { label: '😴 Lelah', emoji: '😴' },
    { label: '😢 Sedih', emoji: '😢' },
    { label: '🔥 Semangat', emoji: '🔥' },
    { label: '🥰 Cinta', emoji: '🥰' },
  ];

  const colorOptions = [
    { value: 'pink', name: 'Pink', hex: '#FFF0F5' },
    { value: 'blue', name: 'Biru', hex: '#E6F2FF' },
    { value: 'mint', name: 'Mint', hex: '#EAF8F2' },
    { value: 'lavender', name: 'Lavender', hex: '#F3E8FF' },
    { value: 'yellow', name: 'Kuning', hex: '#FEF9E7' },
  ];

  // Ambil user saat komponen dimuat
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchEntries();
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          fetchEntries();
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
      const today = new Date().toISOString().split('T')[0];
      setDateString(today);
    }
  }, [showModal, editingEntry]);

  // Ambil semua entri jurnal untuk user tertentu
  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .order('date_string', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      console.error('Gagal mengambil entri:', error.message);
    }
  };

  // Tangani Registrasi Pengguna Baru
  const handleRegister = async () => {
    if (!email || !password || !username) {
      Alert.alert('Eits!', 'Semua kolom pendaftaran harus diisi ya! 🌸');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
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

      Alert.alert('Hore!', 'Pendaftaran berhasil! Silakan cek kotak masuk email atau langsung masuk.');
      setAuthView('login');
    } catch (error: any) {
      Alert.alert('Gagal Daftar', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Tangani Login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Eits!', 'Email dan Kata Sandi harus diisi ya! ✨');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      Alert.alert('Masuk Gagal', 'Email atau Kata Sandi salah!');
    } finally {
      setLoading(false);
    }
  };

  // Tangani Logout
  const handleLogout = () => {
    Alert.alert('Keluar Akun', 'Apakah kamu yakin ingin keluar dari jurnal imutmu? 🚪', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await supabase.auth.signOut();
          setUser(null);
        },
      },
    ]);
  };

  // Buka Modal untuk Entri Baru
  const openNewEntryModal = () => {
    setEditingEntry(null);
    setTitle('');
    setContent('');
    setMood('😊 Senang');
    setCardColor('pink');
    setTags('');
    setShowModal(true);
  };

  // Buka Modal untuk Edit Entri
  const openEditEntryModal = (entry: any) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    
    // Decode mood dan warna dari DB (moodName|colorClass)
    if (entry.mood && entry.mood.includes('|')) {
      const [savedMood, savedColor] = entry.mood.split('|');
      setMood(savedMood);
      setCardColor(savedColor);
    } else {
      setMood(entry.mood || '😊 Senang');
      setCardColor('pink');
    }
    
    setDateString(entry.date_string);

    // Parsing tag dari content
    const contentLines = entry.content.split('\n');
    const lastLine = contentLines[contentLines.length - 1];
    if (lastLine && lastLine.startsWith('Tags: ')) {
      setTags(lastLine.replace('Tags: ', ''));
      setContent(contentLines.slice(0, -1).join('\n'));
    } else {
      setTags('');
      setContent(entry.content);
    }

    setShowModal(true);
  };

  // Tangani Menyimpan Jurnal (Create atau Update)
  const handleSaveEntry = async () => {
    if (!title || !content || !dateString) {
      Alert.alert('Eits!', 'Judul, Isi Jurnal, dan Tanggal wajib diisi ya! 📝');
      return;
    }

    // Gabungkan konten dengan tag
    let finalContent = content;
    if (tags.trim()) {
      const formattedTags = tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
        .map((t) => (t.startsWith('#') ? t : `#${t}`))
        .join(' ');
      finalContent = `${content}\n\nTags: ${formattedTags}`;
    }

    // Gabungkan mood dan warna kartu
    const finalMood = `${mood}|${cardColor}`;

    try {
      if (editingEntry) {
        // Mode Edit (Update)
        const { error } = await supabase
          .from('journal_entries')
          .update({
            title,
            content: finalContent,
            mood: finalMood,
            date_string: dateString,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingEntry.id);

        if (error) throw error;
      } else {
        // Mode Baru (Create)
        const { error } = await supabase.from('journal_entries').insert([
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
      fetchEntries();
    } catch (error: any) {
      Alert.alert('Error', 'Gagal menyimpan: ' + error.message);
    }
  };

  // Tangani Hapus Jurnal
  const handleDeleteEntry = (id: string) => {
    Alert.alert(
      'Hapus Catatan',
      'Apakah kamu yakin ingin menghapus kenangan manis ini selamanya? 😢',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('journal_entries')
                .delete()
                .eq('id', id);

              if (error) throw error;
              fetchEntries();
            } catch (error: any) {
              Alert.alert('Error', 'Gagal menghapus: ' + error.message);
            }
          },
        },
      ]
    );
  };

  // Filter Entri Jurnal
  const filteredEntries = entries.filter((entry) => {
    let entryMoodName = '';
    if (entry.mood && entry.mood.includes('|')) {
      entryMoodName = entry.mood.split('|')[0];
    } else {
      entryMoodName = entry.mood || '';
    }

    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMood = filterMood ? entryMoodName.includes(filterMood) : true;

    return matchesSearch && matchesMood;
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Memuat kisah manis... 🌸</Text>
      </View>
    );
  }

  // JIKA PENGGUNA BELUM LOGIN
  if (!user) {
    return (
      <SafeAreaView style={styles.authContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.authCard}>
          <Text style={styles.authTitle}>🌸 Jurnal Kawaii 🌸</Text>
          <View style={styles.authTabs}>
            <TouchableOpacity
              style={[styles.authTabButton, authView === 'login' && styles.authTabActive]}
              onPress={() => setAuthView('login')}
            >
              <Text style={styles.authTabLabel}>Masuk</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.authTabButton, authView === 'register' && styles.authTabActive]}
              onPress={() => setAuthView('register')}
            >
              <Text style={styles.authTabLabel}>Daftar</Text>
            </TouchableOpacity>
          </View>

          {authView === 'login' ? (
            <View>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="nama@email.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <Text style={styles.inputLabel}>Kata Sandi</Text>
              <TextInput
                style={styles.input}
                placeholder="******"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.bubblyButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Masuk Ke Jurnal! ✨</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.inputLabel}>Nama Panggilan</Text>
              <TextInput
                style={styles.input}
                placeholder="Budi"
                value={username}
                onChangeText={setUsername}
              />
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="nama@email.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <Text style={styles.inputLabel}>Kata Sandi</Text>
              <TextInput
                style={styles.input}
                placeholder="Minimal 6 karakter"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.bubblyButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Buat Akun Imut! 🌸</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // JIKA PENGGUNA SUDAH LOGIN
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌸 Buku Jurnalku</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Keluar 🚪</Text>
        </TouchableOpacity>
      </View>

      {/* Bar Pencarian */}
      <View style={styles.toolbar}>
        <TextInput
          style={styles.searchBar}
          placeholder="🔍 Cari kenangan manis..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodFilterScroll}>
          <TouchableOpacity
            style={[styles.moodFilterBtn, !filterMood && styles.moodFilterActive]}
            onPress={() => setFilterMood('')}
          >
            <Text style={styles.moodFilterText}>Semua</Text>
          </TouchableOpacity>
          {moodOptions.map((opt) => (
            <TouchableOpacity
              key={opt.label}
              style={[styles.moodFilterBtn, filterMood === opt.emoji && styles.moodFilterActive]}
              onPress={() => setFilterMood(opt.emoji)}
            >
              <Text style={styles.moodFilterText}>{opt.emoji}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Area Jurnal */}
      <ScrollView contentContainerStyle={styles.canvasScroll} style={{ flex: 1 }}>
        {filteredEntries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>Belum ada kenangan manis... 😢</Text>
            <Text style={styles.emptyStateText}>
              Ketuk tombol "Tulis Jurnal Baru" di bawah untuk merekam kisah bahagiamu hari ini!
            </Text>
          </View>
        ) : (
          filteredEntries.map((entry, index) => {
            let entryMood = '😊 Senang';
            let entryColor = 'pink';
            if (entry.mood && entry.mood.includes('|')) {
              const [m, c] = entry.mood.split('|');
              entryMood = m;
              entryColor = c;
            } else {
              entryMood = entry.mood || '😊 Senang';
            }

            // Kemiringan rotasi acak
            const rotation = ((index % 5) - 2) * 1.5;

            // Ekstrak tag
            const contentLines = entry.content.split('\n');
            let displayContent = entry.content;
            let displayTags: string[] = [];
            const lastLine = contentLines[contentLines.length - 1];
            if (lastLine && lastLine.startsWith('Tags: ')) {
              displayTags = lastLine
                .replace('Tags: ', '')
                .split(' ')
                .filter((t: string) => t.length > 0);
              displayContent = contentLines.slice(0, -1).join('\n');
            }

            const matchedColor = colorOptions.find((c) => c.value === entryColor) || colorOptions[0];

            return (
              <View
                key={entry.id}
                style={[
                  styles.cardWrapper,
                  { transform: [{ rotate: `${rotation}deg` }] },
                ]}
              >
                {/* Washi Tape */}
                <View style={styles.washiTape} />
                <View style={[styles.card, { backgroundColor: matchedColor.hex }]}>
                  <Text style={styles.cardTitle}>{entry.title}</Text>
                  <Text style={styles.cardDate}>
                    {new Date(entry.date_string).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                  <Text style={styles.cardContent}>{displayContent}</Text>

                  {displayTags.length > 0 && (
                    <View style={styles.tagContainer}>
                      {displayTags.map((tag) => (
                        <Text key={tag} style={styles.tagBadge}>
                          {tag}
                        </Text>
                      ))}
                    </View>
                  )}

                  <View style={styles.cardFooter}>
                    <Text style={styles.moodLabel}>{entryMood}</Text>
                    <View style={styles.actionRow}>
                      <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => openEditEntryModal(entry)}
                      >
                        <Text style={styles.iconText}>✏️</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.iconBtn, styles.btnDanger]}
                        onPress={() => handleDeleteEntry(entry.id)}
                      >
                        <Text style={styles.iconText}>🗑️</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={openNewEntryModal}>
        <Text style={styles.fabText}>📝 Tulis Jurnal</Text>
      </TouchableOpacity>

      {/* Modal Tulis/Edit */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingEntry ? 'Edit Kenangan Manis 🌸' : 'Tulis Jurnal Baru 📝'}
            </Text>
            <ScrollView style={{ maxHeight: '75%' }}>
              <Text style={styles.inputLabel}>Judul Jurnal</Text>
              <TextInput
                style={styles.input}
                placeholder="Hari yang sangat menyenangkan!"
                value={title}
                onChangeText={setTitle}
              />

              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.inputLabel}>Tanggal</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={dateString}
                    onChangeText={setDateString}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>Perasaan (Mood)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="😊 Senang"
                    value={mood}
                    onChangeText={setMood}
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>Pilih Warna Kartu</Text>
              <View style={styles.colorPicker}>
                {colorOptions.map((color) => (
                  <TouchableOpacity
                    key={color.value}
                    style={[
                      styles.colorCircle,
                      { backgroundColor: color.hex },
                      cardColor === color.value && styles.colorCircleActive,
                    ]}
                    onPress={() => setCardColor(color.value)}
                  />
                ))}
              </View>

              <Text style={styles.inputLabel}>Ceritakan Kisahmu</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tulis apa saja yang membuatmu tersenyum hari ini..."
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={6}
              />

              <Text style={styles.inputLabel}>Tag (pisahkan dengan koma)</Text>
              <TextInput
                style={styles.input}
                placeholder="bahagia, kuliner, liburan"
                value={tags}
                onChangeText={setTags}
              />
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.bubblyButton, styles.cancelBtn]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.buttonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bubblyButton} onPress={handleSaveEntry}>
                <Text style={styles.buttonText}>Simpan 💖</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFBF7',
  },
  loadingText: {
    marginTop: 12,
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'sans-serif-medium',
    fontSize: 16,
    color: '#1B263B',
  },
  container: {
    flex: 1,
    backgroundColor: '#FDFBF7', // Cream background
  },
  authContainer: {
    flex: 1,
    backgroundColor: '#FDFBF7',
    justifyContent: 'center',
    padding: 20,
  },
  authCard: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#1B263B',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#1B263B',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B263B',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'sans-serif-medium',
  },
  authTabs: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  authTabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FDFBF7',
    borderWidth: 2,
    borderColor: '#1B263B',
    borderRadius: 12,
  },
  authTabActive: {
    backgroundColor: '#FFF0F5', // soft pink
    shadowColor: '#1B263B',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  authTabLabel: {
    fontWeight: 'bold',
    color: '#1B263B',
    fontSize: 15,
  },
  inputLabel: {
    fontWeight: 'bold',
    color: '#1B263B',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 2,
    borderColor: '#1B263B',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FDFBF7',
    fontSize: 16,
    color: '#1B263B',
  },
  textArea: {
    textAlignVertical: 'top',
    height: 120,
  },
  row: {
    flexDirection: 'row',
  },
  bubblyButton: {
    backgroundColor: '#FEF9E7', // yellow
    borderWidth: 3,
    borderColor: '#1B263B',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#1B263B',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  cancelBtn: {
    backgroundColor: '#E6F2FF', // blue
    marginRight: 10,
    flex: 1,
    marginTop: 0,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#1B263B',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 3,
    borderColor: '#1B263B',
    backgroundColor: '#FFF0F5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B263B',
  },
  logoutBtn: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1B263B',
  },
  logoutBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  toolbar: {
    padding: 16,
    borderBottomWidth: 2,
    borderColor: '#1B263B',
    backgroundColor: 'white',
  },
  searchBar: {
    borderWidth: 2,
    borderColor: '#1B263B',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FDFBF7',
    marginBottom: 10,
  },
  moodFilterScroll: {
    flexDirection: 'row',
  },
  moodFilterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: '#1B263B',
    borderRadius: 10,
    backgroundColor: '#FDFBF7',
    marginRight: 8,
  },
  moodFilterActive: {
    backgroundColor: '#E6F2FF',
    transform: [{ translateY: -2 }],
  },
  moodFilterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B263B',
  },
  canvasScroll: {
    padding: 16,
    paddingBottom: 80,
  },
  cardWrapper: {
    marginVertical: 14,
    paddingTop: 10,
  },
  washiTape: {
    position: 'absolute',
    top: 0,
    left: '35%',
    width: 80,
    height: 20,
    backgroundColor: 'rgba(254, 249, 231, 0.95)',
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(27, 38, 59, 0.3)',
    transform: [{ rotate: '-3deg' }],
    zIndex: 2,
  },
  card: {
    borderWidth: 3,
    borderColor: '#1B263B',
    borderRadius: 20,
    padding: 16,
    shadowColor: 'rgba(27, 38, 59, 0.15)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B263B',
  },
  cardDate: {
    fontSize: 12,
    color: 'rgba(27, 38, 59, 0.6)',
    marginTop: 4,
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 15,
    color: '#1B263B',
    lineHeight: 22,
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tagBadge: {
    backgroundColor: 'rgba(27, 38, 59, 0.08)',
    color: '#1B263B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 11,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(27, 38, 59, 0.15)',
    paddingTop: 10,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B263B',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#1B263B',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDanger: {
    backgroundColor: '#FFF0F5',
  },
  iconText: {
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FEF9E7',
    borderWidth: 3,
    borderColor: '#1B263B',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#1B263B',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  fabText: {
    fontWeight: 'bold',
    color: '#1B263B',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(27, 38, 59, 0.4)',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#1B263B',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#1B263B',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B263B',
    textAlign: 'center',
    marginBottom: 16,
  },
  colorPicker: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    marginBottom: 12,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1B263B',
  },
  colorCircleActive: {
    transform: [{ scale: 1.2 }],
    borderWidth: 3.5,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1B263B',
    borderStyle: 'dashed',
    borderRadius: 20,
    marginTop: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B263B',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: 'rgba(27, 38, 59, 0.6)',
    textAlign: 'center',
  },
});
