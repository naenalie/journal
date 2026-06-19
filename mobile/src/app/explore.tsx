import React from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, SafeAreaView } from 'react-native';

export default function ExploreScreen() {
  const tips = [
    {
      title: '🌸 Tulis Hal Kecil',
      content: 'Tidak perlu menulis cerita panjang lebar. Cukup catat satu hal kecil yang membuatmu tersenyum hari ini, seperti secangkir kopi hangat atau kucing lucu di jalan.',
    },
    {
      title: '🍃 Ekspresikan Perasaanmu',
      content: 'Gunakan emoji mood untuk melacak perasaanmu dari hari ke hari. Menulis jurnal membantu kita memahami perasaan diri sendiri dengan lebih baik.',
    },
    {
      title: '🎨 Mainkan Warna Kartu',
      content: 'Pilihlah warna kartu pastel yang sesuai dengan perasaanmu saat menulis. Warna pink untuk hari yang manis, biru untuk hari yang tenang, atau kuning untuk hari yang penuh semangat!',
    },
    {
      title: '🏷️ Kelompokkan dengan Tag',
      content: 'Gunakan tag seperti "kuliner", "keluarga", atau "liburan" agar kamu bisa mencari dan membaca kembali kenangan manismu dengan mudah di masa depan.',
    },
  ];

  const quotes = [
    '“Setiap hari mungkin tidak selalu indah, tetapi selalu ada hal indah di setiap harinya.” ✨',
    '“Jurnalmu adalah tempat aman untuk menjadi dirimu sendiri seutuhnya.” 💖',
    '“Merekam kenangan hari ini adalah hadiah terbaik untuk dirimu di masa depan.” 🎁',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🌸 Inspirasi Jurnal</Text>
          <Text style={styles.headerSubtitle}>Tips & Kata Manis untuk Hari Ini</Text>
        </View>

        {/* Quotes Section */}
        <View style={styles.quoteCard}>
          <View style={styles.washiTape} />
          <Text style={styles.quoteText}>
            {quotes[Math.floor(Date.now() / 86400000) % quotes.length]}
          </Text>
        </View>

        {/* Tips Section */}
        <Text style={styles.sectionTitle}>Tips Menulis Jurnal ✨</Text>
        {tips.map((item, index) => (
          <View key={index} style={styles.tipCard}>
            <Text style={styles.tipTitle}>{item.title}</Text>
            <Text style={styles.tipContent}>{item.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF7', // Cream background
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B263B',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'sans-serif-medium',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(27, 38, 59, 0.6)',
    marginTop: 4,
  },
  quoteCard: {
    backgroundColor: '#FEF9E7', // yellow pastel
    borderWidth: 3,
    borderColor: '#1B263B',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#1B263B',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
    paddingTop: 30,
  },
  washiTape: {
    position: 'absolute',
    top: -10,
    width: 90,
    height: 22,
    backgroundColor: 'rgba(255, 240, 245, 0.95)', // pink washi tape
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(27, 38, 59, 0.3)',
    transform: [{ rotate: '2deg' }],
  },
  quoteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B263B',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B263B',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'sans-serif-medium',
  },
  tipCard: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#1B263B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B263B',
    marginBottom: 8,
  },
  tipContent: {
    fontSize: 14,
    color: '#1B263B',
    lineHeight: 20,
  },
});
