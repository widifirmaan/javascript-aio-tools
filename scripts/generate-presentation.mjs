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
    console.warn(`⚠️ Warning: Screenshot not found: ${filePath}`);
    return '';
  }
  const fileBuffer = fs.readFileSync(filePath);
  return `data:image/png;base64,${fileBuffer.toString('base64')}`;
}

console.log('⚡ Encoding JavaScript AIO Tools screenshots...');

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

console.log('🎨 Constructing JavaScript AIO Tools Developer Deck HTML...');

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>JavaScript AIO Tools - 100% Client-Side Web Utilities</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #0B0F19;
      --bg-card: #111827;
      --bg-surface: #1F2937;
      --border-dark: #374151;
      --border-glow: #4B5563;
      --js-yellow: #F7DF1E;
      --accent-cyan: #38BDF8;
      --accent-emerald: #10B981;
      --accent-purple: #8B5CF6;
      --text-main: #F9FAFB;
      --text-muted: #9CA3AF;
      --radius-tool: 8px;
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
      background: var(--bg-dark);
      display: flex;
      flex-direction: column;
      padding: 16mm 18mm;
      overflow: hidden;
      background-image: 
        radial-gradient(circle at 10% 10%, rgba(247, 223, 30, 0.05) 0%, transparent 50%),
        linear-gradient(to right, rgba(55, 65, 81, 0.2) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(55, 65, 81, 0.2) 1px, transparent 1px);
      background-size: 100% 100%, 32px 32px, 32px 32px;
    }

    /* Top JS Accent Bar */
    .slide::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #F7DF1E, #38BDF8, #10B981);
      z-index: 50;
    }

    /* Slide Header */
    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5mm;
      border-bottom: 1px solid var(--border-dark);
      padding-bottom: 3.5mm;
    }

    .brand-cluster {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .js-badge {
      background: #F7DF1E;
      color: #000000;
      padding: 3px 10px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 800;
      font-size: 11px;
      letter-spacing: 0.06em;
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

    .slide-page-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      background: var(--bg-card);
      border: 1px solid var(--border-dark);
      color: #F7DF1E;
      padding: 3px 10px;
      border-radius: 4px;
    }

    /* Layout */
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

    .route-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--bg-card);
      border: 1px solid var(--border-dark);
      padding: 3px 10px;
      width: fit-content;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 600;
      color: var(--accent-cyan);
      border-radius: 4px;
    }

    .slide-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 800;
      line-height: 1.15;
      color: #FFFFFF;
      letter-spacing: -0.02em;
    }

    .slide-subtitle {
      font-size: 12.5px;
      color: var(--text-muted);
      font-weight: 400;
      line-height: 1.5;
    }

    /* Tool Cards */
    .feature-blocks {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 10px 0;
    }

    .tool-card {
      background: var(--bg-card);
      border: 1px solid var(--border-dark);
      border-radius: 6px;
      padding: 11px 14px;
      border-left: 3px solid #F7DF1E;
    }

    .tool-card.cyan-border {
      border-left-color: var(--accent-cyan);
    }

    .tool-card.emerald-border {
      border-left-color: var(--accent-emerald);
    }

    .card-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .card-text {
      font-size: 11px;
      line-height: 1.45;
      color: #CBD5E1;
    }

    /* Metrics Grid */
    .metrics-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .metric-box {
      background: var(--bg-card);
      border: 1px solid var(--border-dark);
      border-radius: 6px;
      padding: 7px 10px;
      text-align: center;
    }

    .metric-val {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: #F7DF1E;
    }

    .metric-desc {
      font-size: 8.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-muted);
    }

    /* Media Mockup */
    .slide-visual {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 0;
    }

    .device-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .desktop-frame {
      width: 90%;
      background: #0B0F19;
      border: 1px solid var(--border-dark);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .frame-bar {
      height: 24px;
      background: #111827;
      border-bottom: 1px solid var(--border-dark);
      display: flex;
      align-items: center;
      padding: 0 10px;
      gap: 6px;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    .dot.red { background: #EF4444; }
    .dot.yellow { background: #F59E0B; }
    .dot.green { background: #10B981; }

    .url-chip {
      margin-left: 12px;
      background: #030712;
      border: 1px solid var(--border-dark);
      padding: 1px 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5px;
      font-weight: 600;
      color: #9CA3AF;
      border-radius: 4px;
    }

    .desktop-img {
      width: 100%;
      height: auto;
      max-height: 380px;
      object-fit: contain;
      background: #0B0F19;
      display: block;
    }

    .mobile-frame {
      position: absolute;
      right: -8px;
      bottom: -12px;
      width: 27%;
      background: #0B0F19;
      border: 2px solid var(--border-dark);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.7);
      border-radius: 14px;
      overflow: hidden;
      z-index: 10;
    }

    .mobile-notch {
      height: 12px;
      background: #030712;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .notch-speaker {
      width: 28px;
      height: 2.5px;
      background: #374151;
      border-radius: 2px;
    }

    .mobile-img {
      width: 100%;
      height: auto;
      display: block;
    }

    /* Footer */
    .slide-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border-dark);
      padding-top: 3.5mm;
      margin-top: 4mm;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      color: #6B7280;
      font-weight: 600;
    }

    /* Cover Slide */
    .cover-slide {
      background: 
        radial-gradient(circle at 75% 20%, rgba(247, 223, 30, 0.1) 0%, transparent 55%),
        #0B0F19;
      justify-content: space-between;
      padding: 18mm 20mm;
    }

    .cover-giant-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 48px;
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.04em;
      color: #FFFFFF;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .cover-giant-title span {
      color: #F7DF1E;
    }

    .cover-desc {
      font-size: 15.5px;
      line-height: 1.5;
      color: #9CA3AF;
      font-weight: 400;
      max-width: 720px;
    }

    .cover-split {
      display: grid;
      grid-template-columns: 1.05fr 1fr;
      gap: 28px;
      align-items: center;
      margin: 10px 0;
    }

    .cover-specs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .cover-spec-card {
      background: var(--bg-card);
      border: 1px solid var(--border-dark);
      border-radius: 6px;
      padding: 12px 14px;
    }

    .cover-spec-k {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      font-weight: 700;
      color: #F7DF1E;
      text-transform: uppercase;
      margin-bottom: 3px;
    }

    .cover-spec-v {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
    }

    /* Architecture Grid */
    .arch-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 10px;
      flex: 1;
    }

    .arch-col {
      background: var(--bg-card);
      border: 1px solid var(--border-dark);
      border-radius: 8px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .arch-col-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 12.5px;
      font-weight: 800;
      text-transform: uppercase;
      padding-bottom: 6px;
      border-bottom: 1px solid var(--border-dark);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #FFFFFF;
    }

    .arch-item {
      background: #070B13;
      border: 1px solid #1F2937;
      border-radius: 5px;
      padding: 8px 10px;
      font-size: 11px;
    }

    .arch-item-name {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      color: #F7DF1E;
      margin-bottom: 2px;
    }

    .arch-item-detail {
      font-size: 10px;
      color: var(--text-muted);
      line-height: 1.4;
    }

    /* Closing Slide */
    .closing-slide {
      background: radial-gradient(circle at 50% 40%, rgba(247, 223, 30, 0.1) 0%, transparent 60%), #0B0F19;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20mm;
      gap: 18px;
    }

    .closing-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 38px;
      font-weight: 900;
      letter-spacing: -0.03em;
      text-transform: uppercase;
      color: #FFFFFF;
    }

    .closing-pills {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 760px;
    }

    .live-hero-card {
      background: var(--bg-card);
      border: 1px solid #F7DF1E;
      box-shadow: 0 12px 30px rgba(247, 223, 30, 0.15);
      border-radius: 8px;
      padding: 16px 36px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
    }

    .live-url-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 18px;
      font-weight: 800;
      color: #F7DF1E;
    }
  </style>
</head>
<body>

  <!-- ==================== SLIDE 01: COVER ==================== -->
  <div class="slide cover-slide">
    <div>
      <div style="display:flex; gap:12px; align-items:center;">
        <div class="js-badge">JAVASCRIPT UTILITY SUITE</div>
        <div class="route-pill">100% IN-BROWSER EXECUTION • WEB APIS • 23 TOOLS</div>
        <div class="js-badge" style="background:#10B981; color:#fff;">PRODUCTION DEPLOYED</div>
      </div>
      <div style="margin-top: 20px; max-width: 85%;">
        <div class="cover-giant-title">
          <span>JAVASCRIPT AIO TOOLS</span><br>
          HIGH-PERFORMANCE CLIENT-SIDE WORKBENCH
        </div>
        <p class="cover-desc">
          Koleksi 23 utilitas pengembangan perangkat lunak, manipulasi media, kriptografi, dan pemrosesan dokumen yang berjalan 100% di browser tanpa upload data ke server pihak ketiga.
        </p>
      </div>
    </div>

    <div class="cover-split">
      <div class="cover-specs-grid">
        <div class="cover-spec-card">
          <div class="cover-spec-k">EXECUTION RUNTIME</div>
          <div class="cover-spec-v">100% Client-Side Browser</div>
        </div>
        <div class="cover-spec-card">
          <div class="cover-spec-k">UTILITY CATALOG</div>
          <div class="cover-spec-v">23 Standalone Web Tools</div>
        </div>
        <div class="cover-spec-card">
          <div class="cover-spec-k">SECURITY & PRIVACY</div>
          <div class="cover-spec-v">Zero File Uploads to Server</div>
        </div>
        <div class="cover-spec-card">
          <div class="cover-spec-k">CORE TECHNOLOGIES</div>
          <div class="cover-spec-v">Canvas, Web Crypto, Web Audio</div>
        </div>
      </div>

      <div style="position: relative;">
        <div class="desktop-frame" style="width: 100%;">
          <div class="frame-bar">
            <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
            <div class="url-chip">https://tools.widifirmaan.web.id</div>
          </div>
          <img src="${images.dashboardDesktop}" class="desktop-img" alt="Dashboard Cover">
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>AUTHOR: WIDI FIRMANSYAH</div>
      <div>PROJECT: JAVASCRIPT AIO TOOLS WORKBENCH</div>
      <div>PAGE 01 / 10</div>
    </div>
  </div>

  <!-- ==================== SLIDE 02: DASHBOARD ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <div class="js-badge">WORKBENCH PORTAL</div>
        <div class="slide-section-title">23-TOOL UTILITY DASHBOARD & LIVE FILTER</div>
      </div>
      <div class="slide-page-badge">SLIDE 02</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <div class="route-pill">INDEX: / • LIVE SEARCH ENGINE</div>
          <h2 class="slide-title">Centralized Workbench & Instant Tool Search</h2>
          <p class="slide-subtitle">
            Dashboard terpadu yang memetakan seluruh 23 utilitas ke dalam kategori tematik (Developer, Media, Dokumen, Kalkulator) dengan filter pencarian real-time.
          </p>
        </div>

        <div class="feature-blocks">
          <div class="tool-card">
            <div class="card-label">⚡ Instant Keyup Substring Filter</div>
            <div class="card-text">
              Penyaringan kartu perkakas berbasis keyword tanpa delay jaringan, langsung mengisolasi utilitas yang dicari saat pengguna mengetik.
            </div>
          </div>
          <div class="tool-card cyan-border">
            <div class="card-label">🗂️ Category Pill Badges</div>
            <div class="card-text">
              Segmentasi kartu berdasarkan domain spesifik (PDF Tools, Image Processing, Audio Engineering, Security Crypto) dengan status badge.
            </div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">23</div>
            <div class="metric-desc">Web Tools</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">0 ms</div>
            <div class="metric-desc">Search Filter</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">100%</div>
            <div class="metric-desc">In-Browser</div>
          </div>
        </div>
      </div>

      <div class="slide-visual">
        <div class="device-container">
          <div class="desktop-frame">
            <div class="frame-bar">
              <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
              <div class="url-chip">tools.widifirmaan.web.id</div>
            </div>
            <img src="${images.dashboardDesktop}" class="desktop-img" alt="Dashboard Desktop">
          </div>
          <div class="mobile-frame">
            <div class="mobile-notch"><div class="notch-speaker"></div></div>
            <img src="${images.dashboardMobile}" class="mobile-img" alt="Dashboard Mobile">
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO WEB ARCHITECTURE</div>
      <div>WORKBENCH DISPATCH & FILTER PIPELINE</div>
      <div>PAGE 02 / 10</div>
    </div>
  </div>

  <!-- ==================== SLIDE 03: DEVELOPER TOOLBOX ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <div class="js-badge">DEVELOPER ENGINE</div>
        <div class="slide-section-title">DEVELOPER TOOLBOX (JSON, BASE64, JWT, HASH)</div>
      </div>
      <div class="slide-page-badge">SLIDE 03</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <div class="route-pill">TOOL: #dev-toolbox • CLIENT FORMATTERS</div>
          <h2 class="slide-title">Developer Toolbox & Payload Serialization</h2>
          <p class="slide-subtitle">
            Ruang kerja insinyur perangkat lunak untuk validasi JSON, encoder/decoder Base64, parser payload JWT tanpa decode server, dan hashing SHA-256.
          </p>
        </div>

        <div class="feature-blocks">
          <div class="tool-card cyan-border">
            <div class="card-label">🌳 JSON Formatter & Syntax Tree Validator</div>
            <div class="card-text">
              Validasi struktur sintaks JSON seketika dengan deteksi posisi baris error, fitur prettify indentasi, dan minifikasi payload produksi.
            </div>
          </div>
          <div class="tool-card emerald-border">
            <div class="card-label">🔐 Client-Side Web Crypto Hashing</div>
            <div class="card-text">
              Pembangkitan hash cryptographic (SHA-1, SHA-256, SHA-512) langsung di peramban via window.crypto.subtle tanpa mengirim string sensitif ke internet.
            </div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">SubtleCrypto</div>
            <div class="metric-desc">Hash Core</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">JWT</div>
            <div class="metric-desc">Payload Decode</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Instant</div>
            <div class="metric-desc">Base64 Encode</div>
          </div>
        </div>
      </div>

      <div class="slide-visual">
        <div class="device-container">
          <div class="desktop-frame">
            <div class="frame-bar">
              <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
              <div class="url-chip">tools.widifirmaan.web.id/#dev-toolbox</div>
            </div>
            <img src="${images.devToolboxDesktop}" class="desktop-img" alt="Dev Toolbox Desktop">
          </div>
          <div class="mobile-frame">
            <div class="mobile-notch"><div class="notch-speaker"></div></div>
            <img src="${images.devToolboxMobile}" class="mobile-img" alt="Dev Toolbox Mobile">
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO WEB ARCHITECTURE</div>
      <div>DEV SERIALIZATION & CRYPTO HASH PIPELINE</div>
      <div>PAGE 03 / 10</div>
    </div>
  </div>

  <!-- ==================== SLIDE 04: CANVAS IMAGE COMPRESSOR ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <div class="js-badge">CANVAS PROCESSING</div>
        <div class="slide-section-title">CLIENT-SIDE CANVAS IMAGE COMPRESSOR</div>
      </div>
      <div class="slide-page-badge">SLIDE 04</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <div class="route-pill">TOOL: #image-compressor • CANVAS API</div>
          <h2 class="slide-title">Hardware-Accelerated Canvas Image Compression</h2>
          <p class="slide-subtitle">
            Kompresi berkas gambar JPG, PNG, dan WebP secara lokal menggunakan HTML5 2D Canvas context dan ekspor blob kualitas adaptif.
          </p>
        </div>

        <div class="feature-blocks">
          <div class="tool-card">
            <div class="card-label">🎚️ Dynamic Quality Slider Control</div>
            <div class="card-text">
              Slider persentase kompresi yang langsung memperbarui estimasi ukuran berkas output dan rasio penghematan kilobyte secara instan.
            </div>
          </div>
          <div class="tool-card emerald-border">
            <div class="card-label">🔒 Zero Network Transfer Privacy</div>
            <div class="card-text">
              Seluruh piksel diproses di memori RAM peramban klien. Foto pribadi pengguna tidak pernah terkirim ke server backend mana pun.
            </div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">Up to 90%</div>
            <div class="metric-desc">Size Reduction</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">0 B</div>
            <div class="metric-desc">Network Upload</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Canvas2D</div>
            <div class="metric-desc">Raster Engine</div>
          </div>
        </div>
      </div>

      <div class="slide-visual">
        <div class="device-container">
          <div class="desktop-frame">
            <div class="frame-bar">
              <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
              <div class="url-chip">tools.widifirmaan.web.id/#image-compressor</div>
            </div>
            <img src="${images.compressorDesktop}" class="desktop-img" alt="Image Compressor Desktop">
          </div>
          <div class="mobile-frame">
            <div class="mobile-notch"><div class="notch-speaker"></div></div>
            <img src="${images.compressorMobile}" class="mobile-img" alt="Image Compressor Mobile">
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO WEB ARCHITECTURE</div>
      <div>HTML5 CANVAS 2D CONTEXT & BLOB EXPORT</div>
      <div>PAGE 04 / 10</div>
    </div>
  </div>

  <!-- ==================== SLIDE 05: QR CODE STUDIO ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <div class="js-badge">VECTOR GENERATOR</div>
        <div class="slide-section-title">QR CODE STUDIO & ERROR CORRECTION ENGINE</div>
      </div>
      <div class="slide-page-badge">SLIDE 05</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <div class="route-pill">TOOL: #qr-code • MATRIX ENCODING</div>
          <h2 class="slide-title">Interactive QR Code Studio & Vector Export</h2>
          <p class="slide-subtitle">
            Pembangkit kode QR instan untuk teks, tautan URL, WiFi credential, dan vCard dengan kontrol level koreksi kesalahan Reed-Solomon.
          </p>
        </div>

        <div class="feature-blocks">
          <div class="tool-card cyan-border">
            <div class="card-label">🎛️ Reed-Solomon Error Correction (L, M, Q, H)</div>
            <div class="card-text">
              Konfigurasi redundansi data hingga 30% kerusakan cetak (High level) untuk menjamin kode QR tetap terbaca kamera pemindai.
            </div>
          </div>
          <div class="tool-card">
            <div class="card-label">📥 Multi-Format Vector & Raster Export</div>
            <div class="card-text">
              Dukungan pengunduhan instan dalam format PNG resolusi tinggi atau SVG vektor tanpa batas resolusi cetak fisik.
            </div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">4 Levels</div>
            <div class="metric-desc">Error Correction</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">PNG / SVG</div>
            <div class="metric-desc">Export Formats</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Live</div>
            <div class="metric-desc">Matrix Render</div>
          </div>
        </div>
      </div>

      <div class="slide-visual">
        <div class="device-container">
          <div class="desktop-frame">
            <div class="frame-bar">
              <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
              <div class="url-chip">tools.widifirmaan.web.id/#qr-code</div>
            </div>
            <img src="${images.qrCodeDesktop}" class="desktop-img" alt="QR Code Desktop">
          </div>
          <div class="mobile-frame">
            <div class="mobile-notch"><div class="notch-speaker"></div></div>
            <img src="${images.qrCodeMobile}" class="mobile-img" alt="QR Code Mobile">
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO WEB ARCHITECTURE</div>
      <div>REED-SOLOMON CODEC & VECTOR MATRIX ENGINE</div>
      <div>PAGE 05 / 10</div>
    </div>
  </div>

  <!-- ==================== SLIDE 06: PASSWORD & ENTROPY ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <div class="js-badge" style="background:#10B981; color:#fff;">SECURITY SUITE</div>
        <div class="slide-section-title">CRYPTOGRAPHIC PASSWORD GENERATOR & ENTROPY METER</div>
      </div>
      <div class="slide-page-badge">SLIDE 06</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <div class="route-pill">TOOL: #password-gen • CSPRNG RUNTIME</div>
          <h2 class="slide-title">Cryptographic CSPRNG Generator & Entropy Meter</h2>
          <p class="slide-subtitle">
            Pembangkit sandi acak berkekuatan tinggi menggunakan Cryptographically Secure Pseudorandom Number Generator (CSPRNG) dan meteran entropi Shannon.
          </p>
        </div>

        <div class="feature-blocks">
          <div class="tool-card emerald-border">
            <div class="card-label">🎲 crypto.getRandomValues() CSPRNG</div>
            <div class="card-text">
              Menghilangkan bias pseudorandom Math.random() standar dengan memanfaatkan generator entropi perangkat keras berbasis Web Crypto API resmi.
            </div>
          </div>
          <div class="tool-card">
            <div class="card-label">📊 Shannon Entropy Bit Calculation</div>
            <div class="card-text">
              Kalkulasi matematis kekuatan sandi dalam satuan bit entropi (E = L * log2(R)) dengan visualisasi status ketahanan brute-force.
            </div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">CSPRNG</div>
            <div class="metric-desc">True Random</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">128+ bit</div>
            <div class="metric-desc">Shannon Entropy</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Zero-Bias</div>
            <div class="metric-desc">Hardware Pool</div>
          </div>
        </div>
      </div>

      <div class="slide-visual">
        <div class="device-container">
          <div class="desktop-frame">
            <div class="frame-bar">
              <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
              <div class="url-chip">tools.widifirmaan.web.id/#password-generator</div>
            </div>
            <img src="${images.passwordDesktop}" class="desktop-img" alt="Password Generator Desktop">
          </div>
          <div class="mobile-frame">
            <div class="mobile-notch"><div class="notch-speaker"></div></div>
            <img src="${images.passwordMobile}" class="mobile-img" alt="Password Generator Mobile">
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO WEB ARCHITECTURE</div>
      <div>CSPRNG RANDOM POOL & SHANNON ENTROPY METER</div>
      <div>PAGE 06 / 10</div>
    </div>
  </div>

  <!-- ==================== SLIDE 07: TEXT DIFF COMPARATOR ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <div class="js-badge">ALGORITHMS</div>
        <div class="slide-section-title">TEXT DIFF COMPARATOR (LONGEST COMMON SUBSEQUENCE)</div>
      </div>
      <div class="slide-page-badge">SLIDE 07</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <div class="route-pill">TOOL: #text-diff • MYERS / LCS ALGORITHM</div>
          <h2 class="slide-title">LCS Text Diff Comparator & Line Delta Visualizer</h2>
          <p class="slide-subtitle">
            Alat pembanding teks dan kode sumber menggunakan algoritma Longest Common Subsequence (LCS) untuk memetakan penambahan dan penghapusan baris.
          </p>
        </div>

        <div class="feature-blocks">
          <div class="tool-card cyan-border">
            <div class="card-label">🟩 Visual Inline Addition & Deletion</div>
            <div class="card-text">
              Highlight warna hijau untuk baris tambahan dan merah untuk baris yang dihapus, memudahkan review perbedaan konfigurasi atau patch berkas kode.
            </div>
          </div>
          <div class="tool-card">
            <div class="card-label">🔢 Synchronized Line Numbering</div>
            <div class="card-text">
              Pelacak nomor baris presisi tinggi yang menyinkronkan posisi teks kiri dan kanan saat dilakukan perbandingan dokumen panjang.
            </div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">LCS / Myers</div>
            <div class="metric-desc">Diff Algorithm</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Line-by-Line</div>
            <div class="metric-desc">Delta Highlights</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Local</div>
            <div class="metric-desc">Diff Processing</div>
          </div>
        </div>
      </div>

      <div class="slide-visual">
        <div class="device-container">
          <div class="desktop-frame">
            <div class="frame-bar">
              <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
              <div class="url-chip">tools.widifirmaan.web.id/#text-diff</div>
            </div>
            <img src="${images.textDiffDesktop}" class="desktop-img" alt="Text Diff Desktop">
          </div>
          <div class="mobile-frame">
            <div class="mobile-notch"><div class="notch-speaker"></div></div>
            <img src="${images.textDiffMobile}" class="mobile-img" alt="Text Diff Mobile">
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO WEB ARCHITECTURE</div>
      <div>LCS DYNAMIC PROGRAMMING & DIFF RENDERING</div>
      <div>PAGE 07 / 10</div>
    </div>
  </div>

  <!-- ==================== SLIDE 08: REGEX VISUALIZER ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <div class="js-badge">PARSER ENGINE</div>
        <div class="slide-section-title">REGEX VISUALIZER & MATCH GROUP EXTRACTOR</div>
      </div>
      <div class="slide-page-badge">SLIDE 08</div>
    </div>

    <div class="slide-body">
      <div class="slide-info">
        <div class="headline-group">
          <div class="route-pill">TOOL: #regex • V8 REGEXP COMPILER</div>
          <h2 class="slide-title">Interactive Regex Pattern Tester & Match Grouping</h2>
          <p class="slide-subtitle">
            Lingkungan pengujian pola Regular Expression real-time dengan toggle flags (g, i, m, s), ekstraksi match group bernomor, dan umpan balik kesalahan sintaks.
          </p>
        </div>

        <div class="feature-blocks">
          <div class="tool-card">
            <div class="card-label">🎯 Capturing Group Decomposition</div>
            <div class="card-text">
              Dekomposisi hasil pencocokan pola regex ke dalam daftar grup penangkap (Group 1, Group 2, dst.) lengkap dengan posisi indeks karakter.
            </div>
          </div>
          <div class="tool-card cyan-border">
            <div class="card-label">🚨 Real-Time Syntax Error Diagnostics</div>
            <div class="card-text">
              Menangkap exception kompilasi regex V8 dan menampilkan notifikasi kesalahan pola tanpa menyebabkan peramban hang atau freeze.
            </div>
          </div>
        </div>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-val">V8 Native</div>
            <div class="metric-desc">RegExp Engine</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">4 Flags</div>
            <div class="metric-desc">g, i, m, s Toggles</div>
          </div>
          <div class="metric-box">
            <div class="metric-val">Realtime</div>
            <div class="metric-desc">Error Feedback</div>
          </div>
        </div>
      </div>

      <div class="slide-visual">
        <div class="device-container">
          <div class="desktop-frame">
            <div class="frame-bar">
              <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
              <div class="url-chip">tools.widifirmaan.web.id/#regex</div>
            </div>
            <img src="${images.regexDesktop}" class="desktop-img" alt="Regex Visualizer Desktop">
          </div>
          <div class="mobile-frame">
            <div class="mobile-notch"><div class="notch-speaker"></div></div>
            <img src="${images.regexMobile}" class="mobile-img" alt="Regex Visualizer Mobile">
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO WEB ARCHITECTURE</div>
      <div>V8 REGEXP COMPILATION & DIAGNOSTIC BUS</div>
      <div>PAGE 08 / 10</div>
    </div>
  </div>

  <!-- ==================== SLIDE 09: SYSTEM ARCHITECTURE ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-cluster">
        <div class="js-badge">TECH STACK</div>
        <div class="slide-section-title">100% CLIENT-SIDE EXECUTION TOPOLOGY</div>
      </div>
      <div class="slide-page-badge">SLIDE 09</div>
    </div>

    <div style="margin-bottom: 8px;">
      <h2 class="slide-title">Client-Side System Topology & Web API Architecture</h2>
      <p class="slide-subtitle">
        Infrastruktur tanpa server (zero-backend overhead) yang sepenuhnya mengoptimalkan kapabilitas peramban modern melalui Web APIs terstandarisasi.
      </p>
    </div>

    <div class="arch-grid">
      <!-- Web APIs -->
      <div class="arch-col">
        <div class="arch-col-title">
          <span>01. BROWSER WEB APIS</span>
          <span style="color:#F7DF1E;">●</span>
        </div>
        <div class="arch-item">
          <div class="arch-item-name">HTML5 Canvas 2D API</div>
          <div class="arch-item-detail">Pemrosesan bitmap gambar, kalkulasi dimensi resolusi, konversi format WebP, dan kompresi kualitas.</div>
        </div>
        <div class="arch-item">
          <div class="arch-item-name">Web Crypto Subtle API</div>
          <div class="arch-item-detail">Pembangkitan cryptographic hash SHA-256 dan generator bilangan acak berkualitas tinggi (CSPRNG).</div>
        </div>
        <div class="arch-item">
          <div class="arch-item-name">Web Audio API</div>
          <div class="arch-item-detail">Analisis frekuensi audio real-time dan pemotongan gelombang suara berbasis AudioBuffer dan AudioContext.</div>
        </div>
        <div class="arch-item">
          <div class="arch-item-name">File & Blob APIs</div>
          <div class="arch-item-detail">Membaca berkas lokal pengguna dengan FileReader dan menghasilkan tautan unduh instan via URL.createObjectURL().</div>
        </div>
      </div>

      <!-- Logic Libraries -->
      <div class="arch-col">
        <div class="arch-col-title">
          <span>02. LOGIC LIBRARIES</span>
          <span style="color:var(--accent-cyan);">●</span>
        </div>
        <div class="arch-item">
          <div class="arch-item-name">PDF-Lib In-Browser</div>
          <div class="arch-item-detail">Manipulasi berkas dokumen PDF murni di sisi klien: penggabungan (merge), pemisahan halaman, dan rotasi.</div>
        </div>
        <div class="arch-item">
          <div class="arch-item-name">QRCode.js Matrix Generator</div>
          <div class="arch-item-detail">Perhitungan matriks biner kode QR dengan proteksi koreksi error Reed-Solomon multi-level.</div>
        </div>
        <div class="arch-item">
          <div class="arch-item-name">LCS Diff Algorithm</div>
          <div class="arch-item-detail">Pemetaan baris teks menggunakan prinsip pemrograman dinamis Longest Common Subsequence.</div>
        </div>
        <div class="arch-item">
          <div class="arch-item-name">V8 Native RegExp</div>
          <div class="arch-item-detail">Eksekusi pencocokan pola teks super cepat memanfaatkan kompilator regex bawaan mesin browser.</div>
        </div>
      </div>

      <!-- Delivery Tier -->
      <div class="arch-col">
        <div class="arch-col-title">
          <span>03. ZERO-SERVER DELIVERY</span>
          <span style="color:var(--accent-emerald);">●</span>
        </div>
        <div class="arch-item">
          <div class="arch-item-name">100% Privacy & Security</div>
          <div class="arch-item-detail">Tidak ada payload pengguna yang terkirim ke server, menghadirkan privasi data total untuk dokumen sensitif.</div>
        </div>
        <div class="arch-item">
          <div class="arch-item-name">Zero Server Maintenance</div>
          <div class="arch-item-detail">Aplikasi tidak memerlukan server database atau backend API runtime, memangkas biaya infrastruktur hingga 0.</div>
        </div>
        <div class="arch-item">
          <div class="arch-item-name">Cloudflare Edge Hosting</div>
          <div class="arch-item-detail">Penyajian berkas statis terdistribusi pada ratusan lokasi edge CDN global dengan latensi minimal.</div>
        </div>
        <div class="arch-item">
          <div class="arch-item-name">Automated Testing Audits</div>
          <div class="arch-item-detail">Pengujian integrasi otomatis Playwright memastikan fungsionalitas seluruh 23 modul berjalan sempurna.</div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO WEB ARCHITECTURE</div>
      <div>CORE TECH STACK & CLIENT-SIDE TOPOLOGY</div>
      <div>PAGE 09 / 10</div>
    </div>
  </div>

  <!-- ==================== SLIDE 10: CLOSING ==================== -->
  <div class="slide closing-slide">
    <div class="js-badge" style="font-size:12px; padding:6px 16px;">
      JAVASCRIPT AIO TOOLS WORKBENCH
    </div>
    <h1 class="closing-title">HIGH-PERFORMANCE CLIENT-SIDE<br>DEVELOPER & MEDIA UTILITIES</h1>
    
    <p style="font-size: 15px; color: #9CA3AF; max-width: 680px; font-weight: 500; line-height: 1.5;">
      Solusi perkakas serbaguna modern yang memberdayakan Web APIs bawaan peramban untuk pemrosesan dokumen, kompresi grafis, kriptografi, dan produktivitas developer dengan privasi 100% tanpa upload data.
    </p>

    <div class="closing-pills">
      <div class="tool-card" style="padding: 6px 14px; font-weight: 800; font-size: 11px;">⚡ 23 STANDALONE TOOLS</div>
      <div class="tool-card cyan-border" style="padding: 6px 14px; font-weight: 800; font-size: 11px;">🔒 100% CLIENT-SIDE</div>
      <div class="tool-card emerald-border" style="padding: 6px 14px; font-weight: 800; font-size: 11px;">🖼️ CANVAS COMPRESSOR</div>
      <div class="tool-card" style="padding: 6px 14px; font-weight: 800; font-size: 11px;">🔐 WEB CRYPTO CSPRNG</div>
      <div class="tool-card cyan-border" style="padding: 6px 14px; font-weight: 800; font-size: 11px;">📑 PDF-LIB ENGINE</div>
    </div>

    <div class="live-hero-card">
      <div style="font-family:'Space Grotesk',sans-serif; font-size:11px; font-weight:700; color:#9CA3AF; letter-spacing:0.08em; text-transform:uppercase;">
        LIVE PRODUCTION ENVIRONMENT
      </div>
      <div class="live-url-text">https://tools.widifirmaan.web.id</div>
      <div style="font-size:11px; color:#9CA3AF; font-weight:500;">
        Powered by Pure JavaScript • HTML5 Web APIs • Canvas 2D • Web Crypto
      </div>
    </div>

    <div class="slide-footer" style="width: 100%; margin-top: 15px;">
      <div>ENGINEERED BY WIDI FIRMANSYAH</div>
      <div>PRODUCTION-READY WEB PLATFORM</div>
      <div>PAGE 10 / 10</div>
    </div>
  </div>

</body>
</html>
`;

const htmlFilePath = path.join(projectRoot, 'presentation.html');
fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
console.log(`📄 Presentation HTML written to: ${htmlFilePath}`);

console.log('🚀 Launching Chromium with Playwright to render JavaScript AIO Tools PDF...');

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
  console.log('🖨️  Rendering Multi-Page A4 Landscape Presentation PDF (Slide Mode)...');
  await page.pdf({
    path: slidePdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
  });

  // 2. Continuous Poster Mode (Single tall scroll)
  console.log('📜 Rendering Continuous Single-Scroll Showcase PDF (Poster Mode)...');
  await page.addStyleTag({
    content: `
      @page {
        size: auto;
        margin: 0;
      }
      body {
        background: #0B0F19 !important;
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

  console.log('\n================================================================================');
  console.log('🎉 JAVASCRIPT AIO TOOLS ARCHITECTURE PDFS SUCCESSFULLY GENERATED!');
  console.log(`📦 Multi-Page Deck (Slides)   : ${(slideStat.size / 1024 / 1024).toFixed(2)} MB (10 Pages A4 Landscape)`);
  console.log(`   -> Saved: ${slidePdfPath}`);
  console.log(`📦 Continuous Poster (Scroll) : ${(contStat.size / 1024 / 1024).toFixed(2)} MB (1 Long Showcase Page)`);
  console.log(`   -> Saved: ${continuousPdfPath}`);
  console.log('================================================================================\n');
}

renderPDF().catch((err) => {
  console.error('❌ Error during PDF generation:', err);
  process.exit(1);
});
