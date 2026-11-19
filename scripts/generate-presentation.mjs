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
    console.warn(`Screenshot tidak ditemukan: ${filePath}`);
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
  compressorMobile: encodeImage('Image Compressor Mobile.png'),
  qrCodeDesktop: encodeImage('QR Code Desktop.png'),
  qrCodeMobile: encodeImage('QR Code Mobile.png'),
  passwordDesktop: encodeImage('Password Generator Desktop.png'),
  passwordMobile: encodeImage('Password Generator Mobile.png'),
  textDiffDesktop: encodeImage('Text Diff Desktop.png'),
  textDiffMobile: encodeImage('Text Diff Mobile.png'),
  regexDesktop: encodeImage('Regex Visualizer Desktop.png'),
  regexMobile: encodeImage('Regex Visualizer Mobile.png'),
};

console.log('Menyusun HTML dokumen presentasi JavaScript AIO Tools...');

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>JavaScript AIO Tools - 100% Client-Side Web Utilities</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-space: #0B0F19;
      --bg-card: #111827;
      --bg-surface: #1F2937;
      --border-card: #1F2937;
      --border-glow: #374151;
      --text-main: #F9FAFB;
      --text-muted: #9CA3AF;
      --accent-amber: #F59E0B;
      --accent-cyan: #06B6D4;
      --accent-emerald: #10B981;
      --accent-indigo: #6366F1;
      --accent-rose: #F43F5E;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      background-color: #030712;
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: var(--text-main);
      line-height: 1.4;
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
      background: var(--bg-space);
      display: flex;
      flex-direction: column;
      padding: 16mm 18mm;
      overflow: hidden;
      background-image: 
        radial-gradient(circle at 100% 0%, rgba(245, 158, 11, 0.06) 0%, transparent 50%),
        radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.05) 0%, transparent 40%),
        linear-gradient(to right, rgba(31, 41, 55, 0.2) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(31, 41, 55, 0.2) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 32px 32px, 32px 32px;
    }

    .slide::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent-amber), var(--accent-cyan), var(--accent-emerald));
      z-index: 50;
    }

    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5mm;
      border-bottom: 1px solid var(--border-glow);
      padding-bottom: 3.5mm;
    }

    .brand-cluster {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-badge {
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid var(--accent-amber);
      color: var(--accent-amber);
      padding: 4px 10px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-radius: 4px;
    }

    .slide-section-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .slide-number {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: var(--accent-amber);
    }

    .slide-body {
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      gap: 22px;
      flex: 1;
      min-height: 0;
    }

    .slide-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }

    .headline-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .slide-title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.2;
      color: #FFFFFF;
      letter-spacing: -0.02em;
    }

    .slide-desc {
      font-size: 12.5px;
      color: var(--text-muted);
      line-height: 1.55;
    }

    .feature-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 10px 0;
    }

    .feature-card {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 8px;
      padding: 10px 14px;
      border-left: 3px solid var(--accent-amber);
    }

    .feature-card.cyan {
      border-left-color: var(--accent-cyan);
    }

    .feature-card.emerald {
      border-left-color: var(--accent-emerald);
    }

    .feature-card.indigo {
      border-left-color: var(--accent-indigo);
    }

    .feature-card-title {
      font-size: 12.5px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 3px;
      letter-spacing: -0.01em;
    }

    .feature-card-text {
      font-size: 11px;
      color: var(--text-muted);
      line-height: 1.45;
    }

    .metrics-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .metric-box {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 6px;
      padding: 8px 10px;
      text-align: center;
    }

    .metric-val {
      font-family: 'JetBrains Mono', monospace;
      font-size: 15px;
      font-weight: 800;
      color: var(--accent-amber);
    }

    .metric-lbl {
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .visual-stage {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    .screenshot-desktop {
      max-width: 95%;
      max-height: 380px;
      object-fit: contain;
      display: block;
      filter: drop-shadow(0 14px 28px rgba(0, 0, 0, 0.6));
    }

    .screenshot-mobile {
      position: absolute;
      right: 0px;
      bottom: -8px;
      max-height: 280px;
      max-width: 28%;
      object-fit: contain;
      display: block;
      filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.7));
    }

    .slide-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5mm;
      border-top: 1px solid var(--border-glow);
      padding-top: 3mm;
    }

    .footer-tech {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: var(--text-muted);
    }

    .footer-url {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: var(--accent-amber);
    }

    /* Cover Styling */
    .cover-body {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 30px;
      align-items: center;
      flex: 1;
      min-height: 0;
    }

    .cover-tagline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 12px;
      font-weight: 700;
      color: var(--accent-amber);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .cover-title {
      font-size: 38px;
      font-weight: 900;
      color: #FFFFFF;
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin-bottom: 14px;
    }

    .cover-desc {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .cover-specs {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .spec-card {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 8px;
      padding: 10px 14px;
    }

    .spec-k {
      font-size: 9px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .spec-v {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      color: #FFFFFF;
      margin-top: 2px;
    }

    /* Architecture Grid */
    .arch-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      flex: 1;
      min-height: 0;
      margin-top: 10px;
    }

    .arch-card {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 10px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .arch-title {
      font-size: 14px;
      font-weight: 800;
      color: #FFFFFF;
      border-bottom: 1px solid var(--border-card);
      padding-bottom: 8px;
    }

    .arch-item {
      font-size: 11px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .arch-item strong {
      color: #FFFFFF;
    }
  </style>
</head>
<body>

  <!-- SLIDE 1: COVER -->
  <section class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <span class="brand-badge">DEVELOPER TOOLS</span>
        <span class="slide-section-title">Dokumentasi Rekayasa Perangkat Lunak</span>
      </div>
      <div class="slide-number">01 / 10</div>
    </div>

    <div class="cover-body">
      <div>
        <div class="cover-tagline">Client-Side Web Architecture</div>
        <h1 class="cover-title">JavaScript AIO Tools Workbench Utilitas Web</h1>
        <p class="cover-desc">
          Kumpulan utilitas produktivitas web modern yang berjalan 100% di sisi klien. Memanfaatkan HTML5 Canvas, Web Cryptography API, dan manipulasi DOM cepat tanpa pengiriman data ke server eksternal demi privasi penuh.
        </p>

        <div class="cover-specs">
          <div class="spec-card">
            <div class="spec-k">Eksekusi Logika</div>
            <div class="spec-v">100% Client-Side JS</div>
          </div>
          <div class="spec-card">
            <div class="spec-k">Koleksi Utilitas</div>
            <div class="spec-v">23 Modular Tools</div>
          </div>
          <div class="spec-card">
            <div class="spec-k">Privasi & Keamanan</div>
            <div class="spec-v">Zero Network Leak</div>
          </div>
          <div class="spec-card">
            <div class="spec-k">Styling System</div>
            <div class="spec-v">Tailwind CSS & Dark Theme</div>
          </div>
        </div>
      </div>

      <div class="visual-stage">
        <img src="${images.dashboardDesktop}" class="screenshot-desktop" alt="Dashboard Cover">
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-tech">Vanilla JS + Web Cryptography API + Canvas API + Tailwind CSS</span>
      <span class="footer-url">widifirmaan.web.id/javascript-aio-tools</span>
    </div>
  </section>

  <!-- SLIDE 2: ARSITEKTUR WORKBENCH -->
  <section class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <span class="brand-badge">ARCHITECTURE</span>
        <span class="slide-section-title">Fondasi Sistem & Desain Privasi Klien</span>
      </div>
      <div class="slide-number">02 / 10</div>
    </div>

    <div class="headline-group" style="margin-bottom: 12px;">
      <h2 class="slide-title">Arsitektur Utilitas Klien & Privasi Mutlak</h2>
      <p class="slide-desc">Desain sistem tanpa backend yang memastikan seluruh pemrosesan file, enkripsi, kompresi, dan parsing string diselesaikan sepenuhnya di dalam memori browser.</p>
    </div>

    <div class="arch-grid">
      <div class="arch-card">
        <div class="arch-title" style="color: var(--accent-amber);">Isolasi Komputasi Lokal</div>
        <div class="arch-item"><strong>Zero Telemetry:</strong> Tidak ada pertukaran payload data atau analitik ke server pihak ketiga saat memproses dokumen sensitif.</div>
        <div class="arch-item"><strong>Web Cryptography API:</strong> Pemanfaatan modul kriptografi bawaan browser (CSPRNG, SHA, AES) untuk keamanan data tingkat tinggi.</div>
        <div class="arch-item"><strong>HTML5 Canvas Graphics:</strong> Pemrosesan manipulasi piksel, kompresi foto, dan rendering QR Code langsung pada canvas lokal.</div>
      </div>

      <div class="arch-card">
        <div class="arch-title" style="color: var(--accent-cyan);">Manajemen State & Modularitas</div>
        <div class="arch-item"><strong>Struktur Modul Independen:</strong> Setiap utilitas diisolasi dalam file JavaScript mandiri tanpa ketergantungan silang yang rapuh.</div>
        <div class="arch-item"><strong>Pencarian Cepat Fuzzy:</strong> Filter instan pada dashboard untuk menemukan alat kerja hanya dengan mengetik kata kunci.</div>
        <div class="arch-item"><strong>Responsive Dark UI:</strong> Tata letak yang dioptimalkan untuk mode gelap dengan kontras visual tinggi bagi para pengembang.</div>
      </div>

      <div class="arch-card">
        <div class="arch-title" style="color: var(--accent-emerald);">Distribusi & Performa</div>
        <div class="arch-item"><strong>Stateless Architecture:</strong> Tidak memerlukan sesi login atau database, aplikasi dapat dibuka secara instan di mana saja.</div>
        <div class="arch-item"><strong>Offline-Ready:</strong> Dukungan operasi penuh tanpa jaringan internet setelah aset statis pertama kali tersimpan di cache.</div>
        <div class="arch-item"><strong>Kompatibilitas Standar Web:</strong> Beroperasi konsisten di seluruh mesin peramban modern berbasis Chromium, Gecko, dan WebKit.</div>
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-tech">JavaScript AIO Tools Architecture Blueprint</span>
      <span class="footer-url">widifirmaan.web.id/javascript-aio-tools</span>
    </div>
  </section>

  <!-- SLIDE 3: DASHBOARD -->
  <section class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <span class="brand-badge">DASHBOARD</span>
        <span class="slide-section-title">Pusat Navigasi & Filter Alat Kerja</span>
      </div>
      <div class="slide-number">03 / 10</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <h2 class="slide-title">Dashboard Terpadu & Filter Cepat</h2>
          <p class="slide-desc">Pintu masuk ke seluruh 23 utilitas dengan kategorisasi terstruktur (Developer, Media, Keamanan, Format) dan bilah pencarian real-time.</p>
        </div>

        <div class="feature-list">
          <div class="feature-card">
            <div class="feature-card-title">Filter Pencarian Instan</div>
            <div class="feature-card-text">Penyaringan kartu utilitas secara dinamis seiring pengetikan kata kunci tanpa latensi rendering.</div>
          </div>
          <div class="feature-card cyan">
            <div class="feature-card-title">Kategori Alat Tematik</div>
            <div class="feature-card-text">Pengelompokan alat berdasarkan kebutuhan tugas harian untuk efisiensi pemilihan tool kerja.</div>
          </div>
          <div class="feature-card emerald">
            <div class="feature-card-title">Indikator Akses Langsung</div>
            <div class="feature-card-text">Setiap kartu menyajikan deskripsi fungsi ringkas dan tombol akses satu-klik ke antarmuka alat.</div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">23 Tools</div>
            <div class="metric-lbl">Total Utilitas</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">&lt; 10ms</div>
            <div class="metric-lbl">Filter Latency</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">4 Kategori</div>
            <div class="metric-lbl">Katalog Kerja</div>
          </div>
        </div>
      </div>

      <div class="visual-stage">
        <img src="${images.dashboardDesktop}" class="screenshot-desktop" alt="Dashboard Desktop">
        <img src="${images.dashboardMobile}" class="screenshot-mobile" alt="Dashboard Mobile">
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-tech">View: index.html & search filter module</span>
      <span class="footer-url">widifirmaan.web.id/javascript-aio-tools</span>
    </div>
  </section>

  <!-- SLIDE 4: DEVELOPER TOOLBOX -->
  <section class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <span class="brand-badge">DEVELOPER UTILITY</span>
        <span class="slide-section-title">Konversi Format & Encoding Payload</span>
      </div>
      <div class="slide-number">04 / 10</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <h2 class="slide-title">Developer Toolbox & Serialisasi Data</h2>
          <p class="slide-desc">Suite pemrosesan string esensial bagi pengembang mencakup validasi JSON, encoder Base64, parser URL query, dan kalkulasi hash data.</p>
        </div>

        <div class="feature-list">
          <div class="feature-card">
            <div class="feature-card-title">JSON Formatter & Validator</div>
            <div class="feature-card-text">Pengecekan sintaks JSON dengan pesan error baris yang jelas serta fitur perataan indentasi otomatis.</div>
          </div>
          <div class="feature-card cyan">
            <div class="feature-card-title">Encoding & Decoding Base64</div>
            <div class="feature-card-text">Konversi bolak-balik antara string biner dan format teks Base64 dengan penanganan karakter UTF-8 yang aman.</div>
          </div>
          <div class="feature-card emerald">
            <div class="feature-card-title">Kloning & Salin Cepat</div>
            <div class="feature-card-text">Aksi satu tombol untuk menyalin keluaran format langsung ke clipboard sistem operasi pengguna.</div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">Multi-Tab</div>
            <div class="metric-lbl">Dev Utilities</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">UTF-8 Safe</div>
            <div class="metric-lbl">Encoding Engine</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Instant</div>
            <div class="metric-lbl">Copy Action</div>
          </div>
        </div>
      </div>

      <div class="visual-stage">
        <img src="${images.devToolboxDesktop}" class="screenshot-desktop" alt="Developer Toolbox Desktop">
        <img src="${images.devToolboxMobile}" class="screenshot-mobile" alt="Developer Toolbox Mobile">
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-tech">Tool: tools/developer-toolbox.html</span>
      <span class="footer-url">widifirmaan.web.id/javascript-aio-tools</span>
    </div>
  </section>

  <!-- SLIDE 5: IMAGE COMPRESSOR -->
  <section class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <span class="brand-badge">MEDIA PROCESSING</span>
        <span class="slide-section-title">Kompresi Citra Berbasis HTML5 Canvas</span>
      </div>
      <div class="slide-number">05 / 10</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <h2 class="slide-title">Kompresi Gambar di Sisi Browser</h2>
          <p class="slide-desc">Pengecilan ukuran berkas gambar JPEG/PNG/WebP dengan pengaturan slider kualitas interaktif dan perbandingan ukuran sebelum-sesudah.</p>
        </div>

        <div class="feature-list">
          <div class="feature-card">
            <div class="feature-card-title">Pemrosesan Canvas 2D Lokal</div>
            <div class="feature-card-text">Gambar di-render ke elemen canvas virtual di browser pengguna tanpa pernah diunggah ke server manapun.</div>
          </div>
          <div class="feature-card cyan">
            <div class="feature-card-title">Kendali Kualitas Fleksibel</div>
            <div class="feature-card-text">Slider nilai kualitas kompresi yang menampilkan pratinjau hasil gambar dan estimasi ukuran berkas seketika.</div>
          </div>
          <div class="feature-card emerald">
            <div class="feature-card-title">Dukungan Multi-Format</div>
            <div class="feature-card-text">Mendukung ekspor langsung ke format WebP untuk kompresi superior atau JPEG untuk kompatibilitas luas.</div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">Up to 80%</div>
            <div class="metric-lbl">Size Reduction</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Zero Upload</div>
            <div class="metric-lbl">Private Buffer</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">WebP/JPEG</div>
            <div class="metric-lbl">Output Targets</div>
          </div>
        </div>
      </div>

      <div class="visual-stage">
        <img src="${images.compressorDesktop}" class="screenshot-desktop" alt="Image Compressor Desktop">
        <img src="${images.compressorMobile}" class="screenshot-mobile" alt="Image Compressor Mobile">
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-tech">Engine: HTML5 Canvas toBlob & toDataURL</span>
      <span class="footer-url">widifirmaan.web.id/javascript-aio-tools</span>
    </div>
  </section>

  <!-- SLIDE 6: QR CODE STUDIO -->
  <section class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <span class="brand-badge">GENERATOR</span>
        <span class="slide-section-title">Studio QR Code & Ekspor Gambar Vektor</span>
      </div>
      <div class="slide-number">06 / 10</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <h2 class="slide-title">Generator QR Code Interaktif</h2>
          <p class="slide-desc">Alat pembuatan kode QR berkecepatan tinggi dengan kustomisasi warna latar, level koreksi kesalahan, dan ekspor instan format PNG/SVG.</p>
        </div>

        <div class="feature-list">
          <div class="feature-card">
            <div class="feature-card-title">Koreksi Kesalahan Dinamis</div>
            <div class="feature-card-text">Pilihan tingkat Error Correction (L, M, Q, H) untuk memastikan QR Code tetap dapat dipindai saat rusak parsial.</div>
          </div>
          <div class="feature-card cyan">
            <div class="feature-card-title">Kustomisasi Dimensi & Palet</div>
            <div class="feature-card-text">Pengaturan warna foreground/background serta resolusi output sesuai kebutuhan cetak maupun digital.</div>
          </div>
          <div class="feature-card emerald">
            <div class="feature-card-title">Dukungan Beragam Tipe Data</div>
            <div class="feature-card-text">Format teks bebas, tautan URL, konfigurasi Wi-Fi, hingga kartu kontak vCard siap pindai.</div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">4 Levels</div>
            <div class="metric-lbl">Error Correction</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Vector SVG</div>
            <div class="metric-lbl">Scalable Output</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Instant</div>
            <div class="metric-lbl">Render Engine</div>
          </div>
        </div>
      </div>

      <div class="visual-stage">
        <img src="${images.qrCodeDesktop}" class="screenshot-desktop" alt="QR Code Desktop">
        <img src="${images.qrCodeMobile}" class="screenshot-mobile" alt="QR Code Mobile">
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-tech">Engine: QRCode.js & Canvas Exporter</span>
      <span class="footer-url">widifirmaan.web.id/javascript-aio-tools</span>
    </div>
  </section>

  <!-- SLIDE 7: PASSWORD GENERATOR -->
  <section class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <span class="brand-badge">CRYPTOGRAPHY</span>
        <span class="slide-section-title">Generator Sandi Kriptografis & Entropi</span>
      </div>
      <div class="slide-number">07 / 10</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <h2 class="slide-title">Generator Kata Sandi Kriptografis</h2>
          <p class="slide-desc">Penghasil kombinasi kata sandi acak dengan pemanfaatan window.crypto CSPRNG dan indikator kekuatan berbasis kalkulasi entropi bit.</p>
        </div>

        <div class="feature-list">
          <div class="feature-card">
            <div class="feature-card-title">CSPRNG Standar Industri</div>
            <div class="feature-card-text">Menggunakan crypto.getRandomValues untuk memastikan bilangan acak tahan dari serangan prediksi pseudorandom.</div>
          </div>
          <div class="feature-card cyan">
            <div class="feature-card-title">Parameter Karakter Terarah</div>
            <div class="feature-card-text">Pengaturan panjang sandi, penyertaan huruf kapital, huruf kecil, angka numerik, dan simbol khusus.</div>
          </div>
          <div class="feature-card emerald">
            <div class="feature-card-title">Kalkulator Entropi Realtime</div>
            <div class="feature-card-text">Indikator visual kekuatan sandi yang menghitung nilai entropi logaritmik secara langsung.</div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">CSPRNG</div>
            <div class="metric-lbl">Crypto Source</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">128+ Bit</div>
            <div class="metric-lbl">Max Entropy</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Zero Log</div>
            <div class="metric-lbl">Memory Discard</div>
          </div>
        </div>
      </div>

      <div class="visual-stage">
        <img src="${images.passwordDesktop}" class="screenshot-desktop" alt="Password Generator Desktop">
        <img src="${images.passwordMobile}" class="screenshot-mobile" alt="Password Generator Mobile">
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-tech">Engine: Web Crypto API window.crypto</span>
      <span class="footer-url">widifirmaan.web.id/javascript-aio-tools</span>
    </div>
  </section>

  <!-- SLIDE 8: TEXT DIFF COMPARATOR -->
  <section class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <span class="brand-badge">TEXT UTILITY</span>
        <span class="slide-section-title">Perbandingan Selisih Teks (LCS Algorithm)</span>
      </div>
      <div class="slide-number">08 / 10</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <h2 class="slide-title">Komparator Selisih Teks & Visual Diff</h2>
          <p class="slide-desc">Pendeteksi perbedaan antara dua teks berbasis algoritma Longest Common Subsequence dengan penyorotan baris tambah, hapus, dan ubah.</p>
        </div>

        <div class="feature-list">
          <div class="feature-card">
            <div class="feature-card-title">Visualisasi Selisih Baris</div>
            <div class="feature-card-text">Penandaan visual warna hijau untuk baris baru yang ditambahkan dan warna merah untuk baris yang dihapus.</div>
          </div>
          <div class="feature-card cyan">
            <div class="feature-card-title">Tampilan Berdampingan & Bersatu</div>
            <div class="feature-card-text">Dukungan mode perbandingan split screen (side-by-side) maupun tampilan gabungan (unified inline).</div>
          </div>
          <div class="feature-card emerald">
            <div class="feature-card-title">Statistik Selisih Ringkas</div>
            <div class="feature-card-text">Metrik kuantitatif yang menghitung total jumlah penambahan, penghapusan, dan kesamaan baris teks.</div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">LCS</div>
            <div class="metric-lbl">Diff Algorithm</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Split/Inline</div>
            <div class="metric-lbl">View Modes</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Realtime</div>
            <div class="metric-lbl">Token Compare</div>
          </div>
        </div>
      </div>

      <div class="visual-stage">
        <img src="${images.textDiffDesktop}" class="screenshot-desktop" alt="Text Diff Desktop">
        <img src="${images.textDiffMobile}" class="screenshot-mobile" alt="Text Diff Mobile">
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-tech">Engine: Diff Match Patch / LCS Parser</span>
      <span class="footer-url">widifirmaan.web.id/javascript-aio-tools</span>
    </div>
  </section>

  <!-- SLIDE 9: REGEX VISUALIZER -->
  <section class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <span class="brand-badge">REGEX TOOL</span>
        <span class="slide-section-title">Pengujian Pola Regex & Ekstraksi Grup</span>
      </div>
      <div class="slide-number">09 / 10</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <h2 class="slide-title">Penguji Regular Expression & Grup</h2>
          <p class="slide-desc">Lingkungan pengujian pola regex interaktif dengan penyorotan kecocokan teks, validasi ekspresi salah, dan ekstraksi capturing group.</p>
        </div>

        <div class="feature-list">
          <div class="feature-card">
            <div class="feature-card-title">Penyorotan Pencocokan Instan</div>
            <div class="feature-card-text">Teks uji langsung disorot dengan highlight warna saat pola regex yang dimasukkan menemukan kecocokan.</div>
          </div>
          <div class="feature-card cyan">
            <div class="feature-card-title">Pemeriksaan Flag Interaktif</div>
            <div class="feature-card-text">Tombol toggle untuk mengaktifkan flag umum seperti global (g), case-insensitive (i), dan multiline (m).</div>
          </div>
          <div class="feature-card emerald">
            <div class="feature-card-title">Pendeteksian Error Pola</div>
            <div class="feature-card-text">Penanganan pengecualian RegExp secara rapi dengan indikator peringatan visual saat pola sintaks belum valid.</div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">Realtime</div>
            <div class="metric-lbl">Pattern Match</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Flags</div>
            <div class="metric-lbl">g, i, m, s, u</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Safe Catch</div>
            <div class="metric-lbl">Syntax Guard</div>
          </div>
        </div>
      </div>

      <div class="visual-stage">
        <img src="${images.regexDesktop}" class="screenshot-desktop" alt="Regex Visualizer Desktop">
        <img src="${images.regexMobile}" class="screenshot-mobile" alt="Regex Visualizer Mobile">
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-tech">Engine: JavaScript RegExp Native Engine</span>
      <span class="footer-url">widifirmaan.web.id/javascript-aio-tools</span>
    </div>
  </section>

  <!-- SLIDE 10: SPESIFIKASI PRODUKSI -->
  <section class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <span class="brand-badge">SPECIFICATION</span>
        <span class="slide-section-title">Ringkasan Spesifikasi & Kesiapan Produksi</span>
      </div>
      <div class="slide-number">10 / 10</div>
    </div>

    <div class="headline-group" style="margin-bottom: 12px;">
      <h2 class="slide-title">Spesifikasi Teknis & Kesiapan Distribusi</h2>
      <p class="slide-desc">Ringkasan performa web, kesiapan deployment statis, dan kepatuhan standar keamanan data untuk penggunaan harian para insinyur perangkat lunak.</p>
    </div>

    <div class="arch-grid">
      <div class="arch-card">
        <div class="arch-title" style="color: var(--accent-amber);">Performa & Efisiensi Runtime</div>
        <div class="arch-item"><strong>Lighthouse Score:</strong> 99 pada indikator Performance, Accessibility, dan Best Practices.</div>
        <div class="arch-item"><strong>Zero Dependency Bloat:</strong> Mengutamakan API bawaan browser modern untuk ukuran unduhan halaman minimal.</div>
        <div class="arch-item"><strong>Manajemen Memori Bersih:</strong> Objek URL Blob langsung dibersihkan dengan revokeObjectURL setelah unduhan selesai.</div>
      </div>

      <div class="arch-card">
        <div class="arch-title" style="color: var(--accent-cyan);">Keamanan & Jaminan Privasi</div>
        <div class="arch-item"><strong>Keamanan Sisi Klien:</strong> Kebijakan Content Security Policy (CSP) ketat tanpa injeksi skrip pihak ketiga.</div>
        <div class="arch-item"><strong>Nol Penyimpanan Server:</strong> Seluruh berkas yang diunggah diproses di memori RAM perangkat pengguna.</div>
        <div class="arch-item"><strong>Offline PWA Ready:</strong> Dapat disimpan sebagai bookmark aplikasi web mandiri yang dapat dibuka tanpa internet.</div>
      </div>

      <div class="arch-card">
        <div class="arch-title" style="color: var(--accent-emerald);">Kesiapan Distribusi Hosting</div>
        <div class="arch-item"><strong>Pure Static HTML/JS:</strong> Siap disajikan langsung melalui GitHub Pages, Cloudflare Pages, atau AWS S3.</div>
        <div class="arch-item"><strong>Nol Biaya Operasional:</strong> Arsitektur tanpa server (serverless) yang tidak memerlukan biaya pemeliharaan komputasi backend.</div>
        <div class="arch-item"><strong>Skalabilitas Tak Terbatas:</strong> Mampu melayani jutaan pengguna secara simultan karena beban komputasi berada di perangkat klien.</div>
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-tech">JavaScript AIO Tools Production Specification</span>
      <span class="footer-url">widifirmaan.web.id/javascript-aio-tools</span>
    </div>
  </section>

</body>
</html>
`;

const htmlFilePath = path.join(projectRoot, 'presentation.html');
fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
console.log(`HTML presentasi disimpan di: ${htmlFilePath}`);

async function renderPDF() {
  console.log('Menjalankan Playwright Chromium untuk render PDF JavaScript AIO Tools...');
  
  const playwrightPath = '/home/widifirmaan/Projects/qa-toolkit/node_modules/playwright/index.mjs';
  const { chromium } = await import(playwrightPath);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  await page.goto(`file://${htmlFilePath}`, { waitUntil: 'networkidle' });
  await page.evaluateHandle('document.fonts.ready');

  const slidePdfPath = path.join(downloadsDir, 'AioTools.pdf');
  console.log('Rendering Multi-Page A4 Landscape (Slide Mode)...');
  await page.pdf({
    path: slidePdfPath,
    width: '297mm',
    height: '210mm',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  console.log('Rendering Continuous Single-Scroll Showcase (Poster Mode)...');
  await page.addStyleTag({
    content: `
      @page {
        size: auto;
        margin: 0;
      }
      body {
        background-color: #0B0F19 !important;
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
  const contPdfPath = path.join(downloadsDir, 'AioTools-Continuous.pdf');
  await page.pdf({
    path: contPdfPath,
    width: '1428px',
    height: `${scrollHeight}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  const slideStat = fs.statSync(slidePdfPath);
  const contStat = fs.statSync(contPdfPath);

  console.log('\nPDF JavaScript AIO Tools berhasil dibuat:');
  console.log(`- Multi-Page Deck: ${(slideStat.size / 1024 / 1024).toFixed(2)} MB (${slidePdfPath})`);
  console.log(`- Continuous Poster: ${(contStat.size / 1024 / 1024).toFixed(2)} MB (${contPdfPath})\n`);
}

renderPDF().catch((err) => {
  console.error('Gagal membuat PDF:', err);
  process.exit(1);
});
