export type WasteCategory = 'organik' | 'anorganik' | 'b3';

export interface WasteItem {
  id: string;
  name: string;
  category: WasteCategory;
  shortClue: string;
  explanation: string;
  ecoTip: string;
  decompositionTime: string;
}

export interface BinConfig {
  id: WasteCategory;
  label: string;
  shortTitle: string;
  subtitle: string;
  examples: string;
  accentHex: string;
  bodyBgClass: string;
  lidBgClass: string;
  borderClass: string;
  textClass: string;
  softBgClass: string;
  shortcutKey: string;
}

export const BINS: Record<WasteCategory, BinConfig> = {
  organik: {
    id: 'organik',
    label: 'Sampah Organik',
    shortTitle: 'ORGANIK',
    subtitle: 'Sisa Alam & Makanan',
    examples: 'Daun, kulit buah, sisa nasi',
    accentHex: '#15803D',
    bodyBgClass: 'bg-emerald-600',
    lidBgClass: 'bg-emerald-700',
    borderClass: 'border-emerald-700',
    textClass: 'text-emerald-800',
    softBgClass: 'bg-emerald-50',
    shortcutKey: '1',
  },
  anorganik: {
    id: 'anorganik',
    label: 'Sampah Anorganik',
    shortTitle: 'ANORGANIK',
    subtitle: 'Dapat Didaur Ulang',
    examples: 'Plastik, kaleng, kertas, kaca',
    accentHex: '#D97706',
    bodyBgClass: 'bg-amber-500',
    lidBgClass: 'bg-amber-600',
    borderClass: 'border-amber-600',
    textClass: 'text-amber-900',
    softBgClass: 'bg-amber-50',
    shortcutKey: '2',
  },
  b3: {
    id: 'b3',
    label: 'Sampah B3',
    shortTitle: 'B3 BERBAHAYA',
    subtitle: 'Beracun & Berbahaya',
    examples: 'Baterai, lampu, obat, semprotan',
    accentHex: '#DC2626',
    bodyBgClass: 'bg-red-600',
    lidBgClass: 'bg-red-700',
    borderClass: 'border-red-700',
    textClass: 'text-red-800',
    softBgClass: 'bg-red-50',
    shortcutKey: '3',
  },
};

export const WASTE_ITEMS: WasteItem[] = [
  // ORGANIK (6)
  {
    id: 'kulit-pisang',
    name: 'Kulit Pisang',
    category: 'organik',
    shortClue: 'Berasal dari sisa buah alami yang cepat membusuk.',
    explanation:
      'Kulit pisang adalah sampah organik karena berasal dari tumbuhan dan mudah diuraikan oleh mikroorganisme di dalam tanah.',
    ecoTip:
      'Kumpulkan sisa kulit buah di lubang biopori atau komposter untuk membuat pupuk alami tanaman sekolah.',
    decompositionTime: '2 sampai 4 minggu',
  },
  {
    id: 'daun-kering',
    name: 'Daun Kering',
    category: 'organik',
    shortClue: 'Guguran dari pohon di halaman sekolah yang bisa menyuburkan tanah.',
    explanation:
      'Daun kering termasuk sampah organik alami yang mudah lapuk dan terurai menjadi unsur hara bagi tanah.',
    ecoTip:
      'Jangan membakar daun kering karena asapnya mencemari udara. Olah saja menjadi pupuk kompos!',
    decompositionTime: '1 sampai 3 bulan',
  },
  {
    id: 'tulang-ikan',
    name: 'Tulang Ikan',
    category: 'organik',
    shortClue: 'Sisa lauk makanan yang berasal dari makhluk hidup.',
    explanation:
      'Tulang ikan adalah sisa makanan hewani yang termasuk sampah organik dan bisa hancur secara alami.',
    ecoTip:
      'Ambil makanan secukupnya agar tidak banyak sisa makanan terbuang menjadi sampah.',
    decompositionTime: '1 sampai 2 bulan',
  },
  {
    id: 'potongan-sayur',
    name: 'Sisa Sayuran',
    category: 'organik',
    shortClue: 'Potongan batang dan daun sayur yang berasal dari tumbuhan.',
    explanation:
      'Sisa sayuran kaya akan air dan serat alami sehingga sangat cepat diuraikan oleh bakteri pengurai.',
    ecoTip:
      'Sisa sayuran bisa diolah menjadi eco-enzyme atau kompos cair untuk menyiram kebun sekolah.',
    decompositionTime: '1 sampai 2 minggu',
  },
  {
    id: 'apel-bekas',
    name: 'Inti Buah Apel',
    category: 'organik',
    shortClue: 'Sisa buah segar yang dimakan saat jam istirahat.',
    explanation:
      'Bagian tengah buah apel berasal dari alam dan termasuk sampah organik basah yang mudah membusuk.',
    ecoTip:
      'Pisahkan sampah buah dari plastik pembungkusnya sebelum dimasukkan ke tong kompos.',
    decompositionTime: '2 sampai 4 minggu',
  },
  {
    id: 'sisa-nasi',
    name: 'Sisa Nasi',
    category: 'organik',
    shortClue: 'Sisa makanan pokok yang mudah basi dan terurai.',
    explanation:
      'Nasi terbuat dari beras (tumbuhan) sehingga termasuk sampah organik yang cepat terurai secara alami.',
    ecoTip:
      'Habiskan nasi di piringmu agar tidak menghasilkan gas metana dari pembusukan sampah makanan.',
    decompositionTime: '1 sampai 2 minggu',
  },

  // ANORGANIK (6)
  {
    id: 'botol-plastik',
    name: 'Botol Plastik Air',
    category: 'anorganik',
    shortClue: 'Terbuat dari plastik buatan pabrik yang tidak bisa membusuk.',
    explanation:
      'Botol plastik adalah sampah anorganik karena terbuat dari bahan sintetis yang sangat sulit terurai oleh tanah.',
    ecoTip:
      'Bawa botol minum (tumbler) sendiri ke sekolah untuk mengurangi sampah botol plastik sekali pakai!',
    decompositionTime: 'Sekitar 450 tahun',
  },
  {
    id: 'kaleng-minuman',
    name: 'Kaleng Minuman',
    category: 'anorganik',
    shortClue: 'Terbuat dari logam aluminium yang bisa dilebur kembali.',
    explanation:
      'Kaleng aluminium termasuk sampah anorganik. Walaupun tidak membusuk, kaleng sangat bernilai untuk didaur ulang.',
    ecoTip:
      'Pipihkan kaleng kosong dan setorkan ke bank sampah agar bisa dilebur menjadi produk logam baru.',
    decompositionTime: '80 sampai 200 tahun',
  },
  {
    id: 'kardus-bekas',
    name: 'Kardus Bekas',
    category: 'anorganik',
    shortClue: 'Kertas tebal kemasan paket yang bisa didaur ulang menjadi kertas baru.',
    explanation:
      'Kardus bekas dikelompokkan ke tong anorganik/daur ulang agar tetap bersih dan kering saat diolah menjadi bubur kertas baru.',
    ecoTip:
      'Gunakan ulang kardus yang masih bagus sebagai kotak penyimpanan alat tulis atau kerajinan kelas!',
    decompositionTime: '2 sampai 5 bulan (daur ulang lebih baik)',
  },
  {
    id: 'botol-kaca',
    name: 'Botol Kaca Sirup',
    category: 'anorganik',
    shortClue: 'Wadah bening yang keras dan tidak dapat membusuk di tanah.',
    explanation:
      'Kaca adalah bahan anorganik buatan manusia yang tidak terurai selama ribuan tahun, tetapi bisa didaur ulang berkali-kali.',
    ecoTip:
      'Cuci bersih botol kaca bekas untuk dipakai lagi sebagai wadah atau vas bunga kelas.',
    decompositionTime: 'Lebih dari 1.000 tahun',
  },
  {
    id: 'sedotan-plastik',
    name: 'Sedotan Plastik',
    category: 'anorganik',
    shortClue: 'Benda plastik kecil sekali pakai yang sering mencemari sungai dan laut.',
    explanation:
      'Sedotan plastik termasuk sampah anorganik yang sulit terurai dan berbahaya bagi hewan laut jika terbawa ke sungai.',
    ecoTip:
      'Minum langsung dari gelas atau gunakan sedotan pakai ulang untuk menjaga kebersihan laut.',
    decompositionTime: '200 tahun',
  },
  {
    id: 'kantong-plastik',
    name: 'Kantong Plastik',
    category: 'anorganik',
    shortClue: 'Tas kresek tipis dari bahan plastik yang sulit hancur.',
    explanation:
      'Kantong plastik merupakan sampah anorganik yang dapat menyumbat saluran air dan membuat tanah tidak subur.',
    ecoTip:
      'Gunakan tas belanja kain yang bisa dipakai berkali-kali saat berbelanja bersama orang tua.',
    decompositionTime: '100 sampai 500 tahun',
  },

  // B3 / BERBAHAYA (6)
  {
    id: 'baterai-bekas',
    name: 'Baterai Bekas',
    category: 'b3',
    shortClue: 'Mengandung logam berat dan zat kimia di dalamnya.',
    explanation:
      'Baterai bekas adalah sampah B3 (Bahan Berbahaya dan Beracun) karena kebocoran zat kimianya bisa meracuni air tanah.',
    ecoTip:
      'Jangan pernah membuang baterai ke tong biasa atau membakarnya. Kumpulkan di kotak khusus limbah B3!',
    decompositionTime: 'Berbahaya (zat kimia mencemari tanah)',
  },
  {
    id: 'lampu-neon',
    name: 'Lampu Neon Rusak',
    category: 'b3',
    shortClue: 'Mengandung uap merkuri dan pecahan kaca tajam yang berbahaya.',
    explanation:
      'Lampu neon termasuk sampah B3 karena mengandung merkuri beracun yang berbahaya bagi kesehatan jika pecah.',
    ecoTip:
      'Bungkus lampu mati dengan kardus tebal dan serahkan ke petugas pengelola limbah B3.',
    decompositionTime: 'Berbahaya (mengandung merkuri)',
  },
  {
    id: 'obat-kedaluwarsa',
    name: 'Obat Kedaluwarsa',
    category: 'b3',
    shortClue: 'Mengandung zat kimia medis yang tidak boleh mencemari lingkungan.',
    explanation:
      'Obat-obatan kedaluwarsa adalah sampah B3 karena kandungan kimianya dapat merusak ekosistem air dan membahayakan hewan.',
    ecoTip:
      'Minta bantuan orang dewasa atau apotek terdekat untuk memusnahkan obat yang sudah lewat tanggal pakainya.',
    decompositionTime: 'Berbahaya (mencemari air & tanah)',
  },
  {
    id: 'kaleng-semprot',
    name: 'Kaleng Semprot Nyamuk',
    category: 'b3',
    shortClue: 'Kaleng bertekanan berisi bahan kimia pembasmi serangga.',
    explanation:
      'Kaleng aerosol/semprotan nyamuk termasuk sampah B3 karena berisiko meledak jika terkena panas dan mengandung racun.',
    ecoTip:
      'Jangan melubangi atau membakar kaleng semprot bekas agar tidak meledak!',
    decompositionTime: 'Berbahaya (mudah meledak & beracun)',
  },
  {
    id: 'cat-bekas',
    name: 'Kaleng Cat Bekas',
    category: 'b3',
    shortClue: 'Mengandung bahan kimia pelarut yang beracun dan mudah terbakar.',
    explanation:
      'Sisa cat dinding dan kalengnya termasuk sampah B3 karena zat kimianya beracun bagi tanaman dan ikan di sungai.',
    ecoTip:
      'Tutup rapat sisa cat untuk dipakai kembali, dan jangan membuang cairan cat ke selokan!',
    decompositionTime: 'Berbahaya (bahan kimia beracun)',
  },
  {
    id: 'elektronik-rusak',
    name: 'Ponsel / Kabel Rusak',
    category: 'b3',
    shortClue: 'Limbah elektronik yang komponennya mengandung timbal dan zat berbahaya.',
    explanation:
      'Limbah elektronik (e-waste) termasuk sampah B3 karena papan sirkuit dan komponennya mengandung logam berat berbahaya.',
    ecoTip:
      'Serahkan perangkat elektronik rusak ke pusat daur ulang elektronik resmi (e-waste dropbox).',
    decompositionTime: 'Berbahaya (mengandung logam berat)',
  },
];

export const TEAM_PRESETS = [
  { id: 'tim-1', name: 'Tim Garuda', colorClass: 'bg-rose-600', softClass: 'bg-rose-50 border-rose-200 text-rose-900' },
  { id: 'tim-2', name: 'Tim Komodo', colorClass: 'bg-sky-600', softClass: 'bg-sky-50 border-sky-200 text-sky-900' },
  { id: 'tim-3', name: 'Tim Merpati', colorClass: 'bg-emerald-600', softClass: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
  { id: 'tim-4', name: 'Tim Cendrawasih', colorClass: 'bg-amber-500', softClass: 'bg-amber-50 border-amber-200 text-amber-900' },
];
