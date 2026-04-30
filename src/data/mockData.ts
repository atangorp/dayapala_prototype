export const INITIAL_SUPPLIES = [
  { id: 1, farmer: "Kelompok Tani Sumber Rezeki", commodity: "Beras", volume: "1.200 kg", village: "Lamongan", price: "Rp12.600/kg", status: "Siap divalidasi" },
  { id: 2, farmer: "Gapoktan Mina Sejahtera", commodity: "Telur", volume: "850 butir", village: "Blitar", price: "Rp1.900/butir", status: "Butuh penjemputan" },
  { id: 3, farmer: "KWT Mekar Pangan", commodity: "Sayur", volume: "470 kg", village: "Mojokerto", price: "Rp7.200/kg", status: "Siap kirim" },
];

export const INITIAL_DEMANDS = [
  { id: 1, buyer: "SPPG Surabaya Timur", commodity: "Beras", amount: "1.000 kg", schedule: "Besok 06.00", priority: "Tinggi" },
  { id: 2, buyer: "SPPG Sidoarjo 2", commodity: "Telur", amount: "700 butir", schedule: "Hari ini 17.00", priority: "Sedang" },
  { id: 3, buyer: "Vendor MBG Gresik", commodity: "Sayur", amount: "400 kg", schedule: "Besok 05.30", priority: "Tinggi" },
];

export const INITIAL_MATCHES = [
  { id: 1, commodity: "Beras", source: "Lamongan", target: "SPPG Surabaya Timur", fit: 94, eta: "2 jam 10 menit", credit: "Layak", explanation: "Volume pasok memenuhi kebutuhan permintaan, lokasi dekat, dan jadwal sesuai kebutuhan distribusi.", route: "Lamongan → Gudang Koperasi → SPPG Surabaya Timur" },
  { id: 2, commodity: "Telur", source: "Blitar", target: "SPPG Sidoarjo 2", fit: 88, eta: "3 jam 05 menit", credit: "Cukup layak", explanation: "Pasokan cukup, rute relatif efisien, dan supplier memiliki performa operasional yang memadai.", route: "Blitar → Koperasi → SPPG Sidoarjo 2" },
  { id: 3, commodity: "Sayur", source: "Mojokerto", target: "Vendor MBG Gresik", fit: 91, eta: "1 jam 40 menit", credit: "Layak", explanation: "Kesesuaian lokasi dan waktu tinggi, dengan potensi distribusi cepat ke vendor tujuan.", route: "Mojokerto → Gudang transit → Vendor MBG Gresik" },
];

export const INITIAL_INFLATION = [
  { id: 1, commodity: "Beras medium", region: "Surabaya", market: "Rp13.200", reference: "Rp12.500", delta: "+5,6%", status: "Waspada" },
  { id: 2, commodity: "Telur ayam", region: "Sidoarjo", market: "Rp2.050", reference: "Rp1.900", delta: "+7,9%", status: "Tinggi" },
  { id: 3, commodity: "Cabai merah", region: "Gresik", market: "Rp35.500", reference: "Rp34.000", delta: "+4,4%", status: "Normal" },
];

export const INITIAL_SCORES = [
  { id: 1, name: "Kelompok Tani Sumber Rezeki", score: 86, segment: "Layak Pembiayaan", reason: "Histori pasok stabil, pengiriman tepat waktu, dan volume konsisten.", detail: "Kelompok ini memiliki konsistensi pasok yang lebih baik dibanding rerata supplier sejenis dengan keterlambatan yang rendah dalam tiga bulan terakhir." },
  { id: 2, name: "Gapoktan Mina Sejahtera", score: 72, segment: "Perlu Pendampingan", reason: "Arus transaksi baik, namun variasi volume masih tinggi.", detail: "Secara umum histori transaksi cukup sehat, tetapi konsistensi volume antarbacth masih perlu ditingkatkan." },
  { id: 3, name: "KWT Mekar Pangan", score: 90, segment: "Prioritas Pembiayaan", reason: "Kualitas pasok baik, retur rendah, dan histori pembayaran sehat.", detail: "Supplier ini memenuhi indikator utama pembiayaan dengan performa operasional yang sangat baik dan risiko relatif rendah." },
];

export const INITIAL_AUDIT = [
  { id: 1, time: "03 Apr 2026 • 08.15", actor: "Koperasi Lamongan", title: "Validasi pasokan", detail: "Data beras 1.200 kg diverifikasi dan siap masuk ke AI Matching Supply-Demand.", tag: "Operasional" },
  { id: 2, time: "03 Apr 2026 • 08.22", actor: "AI Matching Engine", title: "Rekomendasi distribusi", detail: "Beras Lamongan diprioritaskan ke SPPG Surabaya Timur dengan kecocokan 94%.", tag: "AI" },
  { id: 3, time: "03 Apr 2026 • 08.40", actor: "Alternative Credit Scoring", title: "Pembaruan skor kredit", detail: "Kelompok Tani Sumber Rezeki memperoleh skor 86 berdasarkan histori transaksi dan pengiriman.", tag: "Pembiayaan" },
];

export const DUMMY_USERS = [
  { username: "koperasi-unesa", password: "password", role: "koperasi", full_name: "Koperasi Unesa" },
  { username: "petani-magetan", password: "password", role: "petani", full_name: "Petani Magetan" },
  { username: "sppg-maospati", password: "password", role: "vendor", full_name: "SPPG Maospati" },
];
