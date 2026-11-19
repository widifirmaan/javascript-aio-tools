import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const screenshotsDir = path.join(projectRoot, 'screenshots');
const downloadsDir = '/home/widifirmaan/Downloads';

function encodeImage(filename) {
  const filePath = path.join(screenshotsDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`Peringatan: Screenshot tidak ditemukan: ${filePath}`);
    return '';
  }
  const fileBuffer = fs.readFileSync(filePath);
  return `data:image/png;base64,${fileBuffer.toString('base64')}`;
}

console.log('Memproses screenshot JavaScript AIO Tools...');

const images = {
  dashboardDesktop: encodeImage('Dashboard Desktop.png'),
  dashboardMobile: encodeImage('Dashboard Mobile.png'),
  devToolboxDesktop: encodeImage('Developer Toolbox Desktop.png'),
  devToolboxMobile: encodeImage('Developer Toolbox Mobile.png'),
  compressorDesktop: encodeImage('Image Compressor Desktop.png'),
  qrCodeDesktop: encodeImage('QR Code Desktop.png'),
  passwordDesktop: encodeImage('Password Generator Desktop.png'),
  textDiffDesktop: encodeImage('Text Diff Desktop.png'),
  regexDesktop: encodeImage('Regex Visualizer Desktop.png'),
  encryptorDesktop: encodeImage('File Encryptor Desktop.png'),
  audioCutterDesktop: encodeImage('Audio Cutter Desktop.png'),
  screenRecorderDesktop: encodeImage('Screen Recorder Desktop.png'),
};

console.log('Menyusun HTML presentasi dengan style murni AIO Tools Dark Charcoal Workbench...');

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>JavaScript AIO Tools - Web Engineering Presentation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Ubuntu:wght@400;500;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-charcoal: #1F1F1F;
      --surface-card: #232323;
      --surface-elevated: #2C2C2C;
      --border-dark: #393939;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --accent-amber: #F59E0B;
      --accent-light: #ECECEC;
      --text-white: #FFFFFF;
      --text-muted: #A3A3A3;
      --text-subtle: #737373;
      --radius-header: 20px;
      --radius-card: 14px;
      --radius-pill: 50px;
      --shadow-workbench: 0 4px 20px rgba(0, 0, 0, 0.45);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      background-color: var(--bg-charcoal);
      font-family: 'Roboto', sans-serif;
      color: var(--text-white);
      line-height: 1.45;
      letter-spacing: -0.01em;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Ubuntu', sans-serif;
      color: var(--text-white);
      letter-spacing: -0.02em;
    }

    @page {
      size: 297mm 210mm;
      margin: 0;
    }

    .slide {
      width: 297mm;
      height: 210mm;
      page-break-after: always;
      position: relative;
      background: var(--bg-charcoal);
      display: flex;
      flex-direction: column;
      padding: 16mm 20mm;
      overflow: hidden;
      background-image: 
        radial-gradient(circle at 90% 10%, rgba(245, 158, 11, 0.03) 0%, transparent 40%),
        radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.02) 0%, transparent 40%);
    }

    /* Slide Header */
    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6mm;
      z-index: 10;
    }

    .brand-pill {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: var(--surface-card);
      border: 1px solid var(--border-dark);
      border-radius: var(--radius-header);
      padding: 6px 18px;
      box-shadow: var(--shadow-workbench);
    }

    .brand-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent-amber);
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
    }

    .brand-title {
      font-family: 'Ubuntu', sans-serif;
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-white);
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .brand-subtitle {
      font-size: 12px;
      color: var(--text-muted);
      border-left: 1px solid var(--border-dark);
      padding-left: 12px;
      margin-left: 2px;
    }

    .badge-pill {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 600;
      color: var(--accent-amber);
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: var(--radius-pill);
      padding: 6px 14px;
    }

    /* Content Layout */
    .slide-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 10;
    }

    .title-block {
      margin-bottom: 5mm;
    }

    .slide-category {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: var(--accent-amber);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 4px;
    }

    .slide-title {
      font-size: 26px;
      font-weight: 700;
      line-height: 1.15;
    }

    .slide-subtitle {
      font-size: 13.5px;
      color: var(--text-muted);
      margin-top: 4px;
      max-width: 900px;
    }

    /* Workbench Cards */
    .workbench-card {
      background: var(--surface-card);
      border: 1px solid var(--border-dark);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-workbench);
      padding: 18px 22px;
    }

    .workbench-card-elevated {
      background: var(--surface-elevated);
      border: 1px solid var(--border-dark);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-workbench);
      padding: 18px 22px;
    }

    /* Grid Splits */
    .layout-split {
      display: grid;
      grid-template-columns: 1.12fr 0.88fr;
      gap: 20px;
      align-items: stretch;
      flex: 1;
    }

    .layout-split-reversed {
      display: grid;
      grid-template-columns: 0.88fr 1.12fr;
      gap: 20px;
      align-items: stretch;
      flex: 1;
    }

    .layout-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
      flex: 1;
    }

    .layout-grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      flex: 1;
    }

    /* Visual Stage */
    .visual-stage {
      background: var(--surface-card);
      border: 1px solid var(--border-dark);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-workbench);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 100%;
      min-height: 290px;
      padding: 12px;
    }

    .visual-stage img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.6));
    }

    /* Feature Items */
    .feature-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: center;
    }

    .feature-item {
      background: var(--surface-card);
      border: 1px solid var(--border-dark);
      border-radius: 12px;
      padding: 13px 16px;
    }

    .feature-item-title {
      font-family: 'Ubuntu', sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: var(--text-white);
      margin-bottom: 3px;
    }

    .feature-item-desc {
      font-size: 12.5px;
      color: var(--text-muted);
      line-height: 1.4;
    }

    /* Footer */
    .slide-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5mm;
      padding-top: 3.5mm;
      border-top: 1px solid var(--border-dark);
      font-size: 11px;
      color: var(--text-subtle);
      font-family: 'JetBrains Mono', monospace;
    }

    .tech-pill {
      display: inline-block;
      padding: 4px 12px;
      background: var(--surface-elevated);
      border: 1px solid var(--border-dark);
      border-radius: var(--radius-pill);
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 600;
      color: var(--accent-amber);
      margin-right: 6px;
      margin-top: 5px;
    }
  </style>
</head>
<body>

  <!-- SLIDE 1: COVER -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">JavaScript AIO Tools</div>
        <div class="brand-subtitle">100% Client-Side Web Utilities &amp; Workbench</div>
      </div>
      <div class="badge-pill">DECK-AIO-01 / 10</div>
    </div>

    <div class="slide-content">
      <div class="layout-split">
        <div style="display: flex; flex-direction: column; justify-content: center; padding-right: 15px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 16px;">
            <span class="tech-pill">Vanilla JS ES6+</span>
            <span class="tech-pill">Web Crypto API</span>
            <span class="tech-pill">Web Audio API</span>
            <span class="tech-pill">Canvas Engine</span>
          </div>
          <h1 style="font-size: 38px; font-weight: 700; line-height: 1.12; margin-bottom: 16px;">
            Arsitektur Workbench Utilitas Web Klien Murni
          </h1>
          <p style="font-size: 14.5px; color: var(--text-muted); line-height: 1.55; margin-bottom: 24px;">
            Suite utilitas rekayasa perangkat lunak dan konversi berkas yang berjalan 100% di browser tanpa ketergantungan server backend, menjamin privasi data absolut dan kecepatan eksekusi instan.
          </p>
          <div class="workbench-card" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; padding: 14px 18px;">
            <div>
              <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">ARSITEKTUR</div>
              <div style="font-size: 19px; font-weight: 700; color: var(--accent-amber); margin-top: 2px;">Zero Server</div>
              <div style="font-size: 11px; color: var(--text-muted);">100% Browser Local</div>
            </div>
            <div>
              <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">MODUL ALAT</div>
              <div style="font-size: 19px; font-weight: 700; color: var(--text-white); margin-top: 2px;">20+ Tools</div>
              <div style="font-size: 11px; color: var(--text-muted);">Crypto &amp; Media API</div>
            </div>
            <div>
              <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">PRIVASI DATA</div>
              <div style="font-size: 19px; font-weight: 700; color: var(--text-white); margin-top: 2px;">Zero Leak</div>
              <div style="font-size: 11px; color: var(--text-muted);">Memory Isolation</div>
            </div>
          </div>
        </div>

        <div class="visual-stage">
          <img src="${images.dashboardDesktop}" alt="JavaScript AIO Tools Dashboard">
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO TOOLS &bull; CLIENT-SIDE WORKBENCH</div>
      <div>WIDI FIRMANSYAH &bull; LEAD ENGINEER</div>
      <div>01 / 10</div>
    </div>
  </div>

  <!-- SLIDE 2: LATAR BELAKANG & PRINSIP REKAYASA -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Fondasi Sistem</div>
        <div class="brand-subtitle">Filosofi &amp; Prinsip Arsitektur</div>
      </div>
      <div class="badge-pill">DECK-AIO-02 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Filosofi Arsitektur Web</div>
        <h2 class="slide-title">Kedaulatan Privasi Data Melalui Zero-Server Processing</h2>
        <p class="slide-subtitle">Mengeliminasi transmisi berkas rahasia ke server luar dengan memindahkan beban komputasi langsung ke peramban pengguna.</p>
      </div>

      <div class="layout-grid-3">
        <div class="workbench-card">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent-amber); margin-bottom: 8px;">01 &bull; RISIKO PRIVASI SERVER</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">Kebocoran Data Sensitif</h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
            Konverter online konvensional mengunggah dokumen pengguna ke server pihak ketiga, menimbulkan kerentanan keamanan dan pelanggaran kepatuhan regulasi data.
          </p>
        </div>

        <div class="workbench-card">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent-amber); margin-bottom: 8px;">02 &bull; PEMANFAATAN WEB API</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">Browser Native APIs</h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
            Memanfaatkan kapabilitas mutakhir HTML5 Canvas, Web Audio API, Web Cryptography API, dan MediaRecorder tanpa memerlukan library backend berat.
          </p>
        </div>

        <div class="workbench-card">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent-amber); margin-bottom: 8px;">03 &bull; INDEPENDENSI JARINGAN</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">Kemampuan Operasi Offline</h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
            Aplikasi tetap dapat digunakan secara penuh bahkan ketika koneksi internet terputus berkat arsitektur aset statis yang terisolasi.
          </p>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO TOOLS &bull; PRINSIP REKAYASA</div>
      <div>STANDARISASI CLIENT-SIDE WEB</div>
      <div>02 / 10</div>
    </div>
  </div>

  <!-- SLIDE 3: DASHBOARD & NAVIGASI MODULAR -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Hub Antarmuka</div>
        <div class="brand-subtitle">Dashboard &amp; Dynamic Category Navigation</div>
      </div>
      <div class="badge-pill">DECK-AIO-03 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Pengorganisasian Fitur</div>
        <h2 class="slide-title">Struktur Dashboard Modular &amp; Penelusuran Alat Cepat</h2>
        <p class="slide-subtitle">Sistem katalog alat terklasifikasi berdasarkan domain (Media, Developer, Keamanan, Dokumen) dengan filter pencarian instan.</p>
      </div>

      <div class="layout-split">
        <div class="visual-stage">
          <img src="${images.dashboardMobile}" alt="AIO Tools Dashboard Mobile View">
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item-title">Katalog Alat Berbasis Grid Kategori</div>
            <div class="feature-item-desc">
              Pengelompokan alat bantu ke dalam kartu-kartu berlatar #232323 dengan ikon teknis spesifik dan deskripsi ringkas yang mudah dipindai mata.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Pencarian Real-Time Sisi Klien</div>
            <div class="feature-item-desc">
              Penyaringan kartu perkakas secara instan menggunakan pencocokan substring nama dan tag kata kunci tanpa interupsi reload halaman.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Navigasi Samping Responsif</div>
            <div class="feature-item-desc">
              Menu navigasi off-canvas terintegrasi yang memungkinkan perpindahan cepat antar kategori peralatan pada perangkat gawai seluler.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO TOOLS &bull; DASHBOARD HUB</div>
      <div>MODULAR TOOL ROUTING</div>
      <div>03 / 10</div>
    </div>
  </div>

  <!-- SLIDE 4: DEVELOPER TOOLBOX & CODE SUITE -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Alat Pengembang</div>
        <div class="brand-subtitle">Developer Code Suite &amp; Syntax Utilities</div>
      </div>
      <div class="badge-pill">DECK-AIO-04 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Utilitas Rekayasa Perangkat Lunak</div>
        <h2 class="slide-title">Suite Manipulasi Kode &amp; Format Data Pengembang</h2>
        <p class="slide-subtitle">Peralatan harian untuk pemformatan JSON, enkripsi URL/Base64, inspeksi header JWT, dan perbandingan teks berbasis token.</p>
      </div>

      <div class="layout-split-reversed">
        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item-title">Text Diff Checker Berbasis Algoritma Myers</div>
            <div class="feature-item-desc">
              Komparasi teks berdampingan (side-by-side) dengan penandaan visual baris yang ditambahkan, dihapus, atau dimodifikasi secara akurat.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">JSON Formatter &amp; Tree Inspector</div>
            <div class="feature-item-desc">
              Validasi sintaks JSON secara langsung dengan opsi indentasi kustom dan pendeteksi kesalahan parsing pada baris spesifik.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Universal Hash Generator</div>
            <div class="feature-item-desc">
              Penghitungan digest kriptografi MD5, SHA-1, SHA-256, dan SHA-512 menggunakan Web Cryptography API berkecepatan native.
            </div>
          </div>
        </div>

        <div class="visual-stage">
          <img src="${images.textDiffDesktop}" alt="Text Diff Checker Tool Desktop">
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO TOOLS &bull; DEVELOPER SUITE</div>
      <div>CODE &amp; SYNTAX TOOLS</div>
      <div>04 / 10</div>
    </div>
  </div>

  <!-- SLIDE 5: IMAGE COMPRESSION & CANVAS PIPELINE -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Pemrosesan Grafis</div>
        <div class="brand-subtitle">Canvas Image Compression &amp; Format Converter</div>
      </div>
      <div class="badge-pill">DECK-AIO-05 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Mesin Kompresi Gambar</div>
        <h2 class="slide-title">Reduksi Ukuran Citra dengan Algoritma Canvas Sisi Klien</h2>
        <p class="slide-subtitle">Kompresi berkas JPEG, PNG, dan WebP secara langsung di memori browser dengan rasio penghematan hingga 80%.</p>
      </div>

      <div class="layout-split">
        <div class="visual-stage">
          <img src="${images.compressorDesktop}" alt="Image Compressor Tool Desktop">
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item-title">Pipeline FileReader &amp; OffscreenCanvas</div>
            <div class="feature-item-desc">
              Pemuatan file lokal via FileReader API langsung ke buffer canvas 2D tanpa mengirim satu byte data pun ke jaringan eksternal.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Slider Kontrol Kualitas Interaktif</div>
            <div class="feature-item-desc">
              Penyesuaian parameter kualitas kompresi secara visual dengan pratinjau instan perbandingan ukuran file sebelum dan sesudah optimasi.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Konversi Format Otomatis ke WebP</div>
            <div class="feature-item-desc">
              Transformasi berkas grafis warisan ke format modern WebP guna menghemat pemakaian bandwidth saat dipublikasikan ke web.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO TOOLS &bull; IMAGE PIPELINE</div>
      <div>CANVAS COMPRESSION ENGINE</div>
      <div>05 / 10</div>
    </div>
  </div>

  <!-- SLIDE 6: REGEX VISUALIZER & AST PARSER -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Inspeksi Sintaks</div>
        <div class="brand-subtitle">Regular Expression Visualizer &amp; Matcher</div>
      </div>
      <div class="badge-pill">DECK-AIO-06 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Evaluasi Pola Karakter</div>
        <h2 class="slide-title">Visualisasi Pola Regex Real-Time &amp; Pengelompokan Grup</h2>
        <p class="slide-subtitle">Pemeriksaan ekspresi reguler dengan penyorotan kecocokan karakter dan umpan balik kesalahan sintaks seketika.</p>
      </div>

      <div class="layout-split-reversed">
        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item-title">Evaluasi Pola Tanpa Jeda Waktu</div>
            <div class="feature-item-desc">
              Kompilasi objek RegExp native dengan penangkapan exception terstruktur untuk mencegah browser hang saat pola salah diketikkan.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Penyorotan Kode Warna Multi-Grup</div>
            <div class="feature-item-desc">
              Pewarnaan latar belakang yang berbeda untuk tiap capturing group guna mempermudah identifikasi sub-pola dalam teks pengujian.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Pustaka Pola Siap Pakai (Cheat Sheet)</div>
            <div class="feature-item-desc">
              Daftar templat pola reguler populer (email, URL, IPv4, tanggal, alphanumeric) yang dapat langsung dimasukkan dengan satu klik.
            </div>
          </div>
        </div>

        <div class="visual-stage">
          <img src="${images.regexDesktop}" alt="Regex Visualizer Tool Desktop">
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO TOOLS &bull; REGEX ENGINE</div>
      <div>SYNTAX TREE VISUALIZER</div>
      <div>06 / 10</div>
    </div>
  </div>

  <!-- SLIDE 7: KRIPTOGRAFI & KEAMANAN LOKAL -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Keamanan Klien</div>
        <div class="brand-subtitle">AES-GCM Encryption &amp; Cryptographic Generators</div>
      </div>
      <div class="badge-pill">DECK-AIO-07 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Kriptografi Peramban</div>
        <h2 class="slide-title">Enkripsi Berkas AES-GCM 256-Bit &amp; Generator Kunci Aman</h2>
        <p class="slide-subtitle">Perlindungan privasi dokumen menggunakan standar enkripsi militer yang diproses murni melalui Web Crypto Subtle API.</p>
      </div>

      <div class="layout-split">
        <div class="visual-stage">
          <img src="${images.encryptorDesktop}" alt="File Encryptor Tool Desktop">
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item-title">Enkripsi Berkas AES-GCM 256-bit Sisi Klien</div>
            <div class="feature-item-desc">
              Derivasi kunci PBKDF2 dengan salt acak dan vektor inisialisasi (IV) unik yang melindungi isi dokumen dari ancaman penyadapan.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Generator Kata Sandi Entropi Tinggi</div>
            <div class="feature-item-desc">
              Pembuatan kombinasi karakter acak kriptografis via crypto.getRandomValues() dengan kalkulasi tingkat kekuatan entropi bit.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Generator Kode QR &amp; Barcode Lokal</div>
            <div class="feature-item-desc">
              Pembuatan matriks QR dan barcode SVG/Canvas secara lokal tanpa memanggil API pihak ketiga yang berpotensi melacak tautan.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO TOOLS &bull; LOCAL CRYPTOGRAPHY</div>
      <div>WEB CRYPTO SUBTLE ENGINE</div>
      <div>07 / 10</div>
    </div>
  </div>

  <!-- SLIDE 8: MEDIA & AUDIO BROWSER APIS -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Perekam &amp; Audio</div>
        <div class="brand-subtitle">Web Audio API &amp; Screen Recorder Engine</div>
      </div>
      <div class="badge-pill">DECK-AIO-08 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Manipulasi Aliran Media</div>
        <h2 class="slide-title">Pemotong Audio Web &amp; Perekam Layar Browser Terpadu</h2>
        <p class="slide-subtitle">Pemanfaatan antarmuka media modern untuk memotong trek suara dan merekam video layar tanpa instalasi software tambahan.</p>
      </div>

      <div class="layout-split-reversed">
        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item-title">Visualisasi Gelombang Suara AudioContext</div>
            <div class="feature-item-desc">
              Penguraian byte PCM audio untuk menampilkan bentuk gelombang dan pemangkasan rentang waktu dengan presisi milidetik.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Perekam Layar via MediaRecorder API</div>
            <div class="feature-item-desc">
              Penangkapan stream layar desktop via getDisplayMedia() dengan encoding WebM instan dan opsi unduhan langsung ke komputer.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Penala Nada Instrumen (Instrument Tuner)</div>
            <div class="feature-item-desc">
              Analisis frekuensi mikrofon real-time menggunakan Fast Fourier Transform (FFT) untuk mendeteksi nada instrumen musik secara akurat.
            </div>
          </div>
        </div>

        <div class="visual-stage">
          <img src="${images.audioCutterDesktop}" alt="Audio Cutter Tool Desktop">
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO TOOLS &bull; MEDIA ENGINE</div>
      <div>WEB AUDIO &amp; MEDIA RECORDER</div>
      <div>08 / 10</div>
    </div>
  </div>

  <!-- SLIDE 9: REKAYASA KINERJA & MANAJEMEN MEMORI -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Rekayasa Kinerja</div>
        <div class="brand-subtitle">Memory Management &amp; Sandbox Safety</div>
      </div>
      <div class="badge-pill">DECK-AIO-09 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Efisiensi &amp; Keamanan Memori</div>
        <h2 class="slide-title">Manajemen Siklus Hidup Objek &amp; Isolasi Sandbox</h2>
        <p class="slide-subtitle">Praktik pembersihan alokasi memori biner dan penanganan error terisolasi demi stabilitas peramban pengguna.</p>
      </div>

      <div class="layout-grid-3">
        <div class="workbench-card">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent-amber); margin-bottom: 8px;">MANAJEMEN MEMORI</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">URL.revokeObjectURL Cleanup</h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
            Pelepasan referensi Blob URL segera setelah unduhan selesai untuk membebaskan ruang memori RAM browser dan mencegah kebocoran memori jangka panjang.
          </p>
        </div>

        <div class="workbench-card">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent-amber); margin-bottom: 8px;">THROTTLING &amp; WORKERS</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">Non-Blocking Operations</h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
            Operasi komputasi intensif didelegasikan secara asynchronous atau di-chunking untuk memastikan main thread tetap responsif dan UI tidak membeku.
          </p>
        </div>

        <div class="workbench-card">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent-amber); margin-bottom: 8px;">ZERO THIRD-PARTY LEAK</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">Pemberdayaan Offline PWA</h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
            Seluruh pustaka pendukung (jsQR, crypto) dibundel secara lokal tanpa pemanggilan CDN dinamis di runtime yang rawan pemblokiran jaringan.
          </p>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO TOOLS &bull; PERFORMANCE AUDIT</div>
      <div>MEMORY &amp; RUNTIME ISOLATION</div>
      <div>09 / 10</div>
    </div>
  </div>

  <!-- SLIDE 10: RANGKUMAN ARSITEKTUR & PRODUKSI -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Ringkasan Proyek</div>
        <div class="brand-subtitle">Spesifikasi Akhir &amp; Kesiapan Rilis</div>
      </div>
      <div class="badge-pill">DECK-AIO-10 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Rangkuman Akhir Rekayasa</div>
        <h2 class="slide-title">Kesimpulan Implementasi JavaScript AIO Tools</h2>
        <p class="slide-subtitle">Suite perkakas utilitas komprehensif yang membuktikan keandalan penuh komputasi peramban web modern tanpa server backend.</p>
      </div>

      <div class="layout-grid-4">
        <div class="workbench-card">
          <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">BAHASA INTI</div>
          <div style="font-size: 18px; font-weight: 700; color: var(--accent-amber); margin-top: 4px; margin-bottom: 4px;">Vanilla JS</div>
          <p style="font-size: 12px; color: var(--text-muted); line-height: 1.45;">Eksekusi ES6+ murni tanpa overhead framework kompilasi.</p>
        </div>

        <div class="workbench-card">
          <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">WEB APIS</div>
          <div style="font-size: 18px; font-weight: 700; color: var(--accent-amber); margin-top: 4px; margin-bottom: 4px;">Crypto &amp; Audio</div>
          <p style="font-size: 12px; color: var(--text-muted); line-height: 1.45;">Pemanfaatan kapabilitas native browser standar W3C.</p>
        </div>

        <div class="workbench-card">
          <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">STYLING</div>
          <div style="font-size: 18px; font-weight: 700; color: var(--accent-amber); margin-top: 4px; margin-bottom: 4px;">Dark Charcoal</div>
          <p style="font-size: 12px; color: var(--text-muted); line-height: 1.45;">Tema kerja SnapFolio dengan kontras tinggi ramah mata.</p>
        </div>

        <div class="workbench-card">
          <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">KEANDALAN</div>
          <div style="font-size: 18px; font-weight: 700; color: #10B981; margin-top: 4px; margin-bottom: 4px;">100% Offline</div>
          <p style="font-size: 12px; color: var(--text-muted); line-height: 1.45;">Operasional penuh tanpa server maupun koneksi internet.</p>
        </div>
      </div>

      <div class="visual-stage" style="min-height: 160px; max-height: 180px; margin-top: 15px;">
        <img src="${images.passwordDesktop}" alt="Password Generator Tool Desktop">
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO TOOLS &bull; KESIMPULAN REKAYASA</div>
      <div>WIDI FIRMANSYAH &bull; LEAD ENGINEER</div>
      <div>10 / 10</div>
    </div>
  </div>

</body>
</html>
`;

const htmlFilePath = path.join(projectRoot, 'presentation.html');
fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
console.log(`HTML presentasi disimpan di: ${htmlFilePath}`);

console.log('Menjalankan Playwright Chromium untuk render PDF JavaScript AIO Tools Dark Charcoal Workbench...');

async function renderPDF() {
  const playwrightPath = '/home/widifirmaan/Projects/qa-toolkit/node_modules/playwright/index.mjs';
  const { chromium } = await import(playwrightPath);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  await page.goto(`file://${htmlFilePath}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const slidePdfPath = path.join(downloadsDir, 'AioTools.pdf');
  const continuousPdfPath = path.join(downloadsDir, 'AioTools-Continuous.pdf');

  // 1. Multi-Page Deck Mode (10 Slides A4 Landscape)
  console.log('Rendering Multi-Page A4 Landscape (Slide Mode)...');
  await page.pdf({
    path: slidePdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
  });

  // 2. Continuous Poster Mode (Single tall scroll)
  console.log('Rendering Continuous Single-Scroll Showcase (Poster Mode)...');
  await page.addStyleTag({
    content: `
      @page {
        size: auto;
        margin: 0;
      }
      body {
        background: #1F1F1F !important;
      }
      .slide {
        page-break-after: unset !important;
        page-break-inside: avoid !important;
        margin-bottom: 0px !important;
        box-shadow: none !important;
      }
    `
  });

  await page.waitForTimeout(500);

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.pdf({
    path: continuousPdfPath,
    width: '1428px',
    height: `${scrollHeight}px`,
    printBackground: true,
    pageRanges: '1',
  });

  await browser.close();

  const slideStat = fs.statSync(slidePdfPath);
  const contStat = fs.statSync(continuousPdfPath);

  console.log('\nPDF JavaScript AIO Tools Dark Charcoal Workbench berhasil dibuat:');
  console.log(`- Multi-Page Deck: ${(slideStat.size / 1024 / 1024).toFixed(2)} MB (${slidePdfPath})`);
  console.log(`- Continuous Poster: ${(contStat.size / 1024 / 1024).toFixed(2)} MB (${continuousPdfPath})\n`);
}

renderPDF().catch((err) => {
  console.error('Error saat render PDF:', err);
  process.exit(1);
});
