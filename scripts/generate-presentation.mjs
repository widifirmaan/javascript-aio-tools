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
    console.warn(`Warning: Screenshot not found: ${filePath}`);
    return '';
  }
  const fileBuffer = fs.readFileSync(filePath);
  return `data:image/png;base64,${fileBuffer.toString('base64')}`;
}

console.log('Encoding JavaScript AIO Tools screenshots...');

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

console.log('Assembling English AIO Tools Dark Charcoal Workbench Presentation Deck HTML...');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
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
            Client-Side Web Utilities &amp; Workbench Architecture
          </h1>
          <p style="font-size: 14.5px; color: var(--text-muted); line-height: 1.55; margin-bottom: 24px;">
            A suite of software engineering utilities and file conversion tools running 100% inside the browser without backend server dependencies, ensuring absolute privacy, local cryptography, and instant processing speeds.
          </p>
          <div class="workbench-card" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; padding: 14px 18px;">
            <div>
              <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">ARCHITECTURE</div>
              <div style="font-size: 19px; font-weight: 700; color: var(--accent-amber); margin-top: 2px;">Zero Server</div>
              <div style="font-size: 11px; color: var(--text-muted);">100% Browser Local</div>
            </div>
            <div>
              <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">TOOL SUITE</div>
              <div style="font-size: 19px; font-weight: 700; color: var(--text-white); margin-top: 2px;">20+ Tools</div>
              <div style="font-size: 11px; color: var(--text-muted);">Crypto &amp; Media APIs</div>
            </div>
            <div>
              <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">DATA PRIVACY</div>
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

  <!-- SLIDE 2: ARCHITECTURE & PRIVACY FOUNDATIONS -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">System Foundations</div>
        <div class="brand-subtitle">Zero-Server Architecture Philosophy</div>
      </div>
      <div class="badge-pill">DECK-AIO-02 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Web Architecture Philosophy</div>
        <h2 class="slide-title">Data Sovereignty Through Pure Client-Side Computation</h2>
        <p class="slide-subtitle">Eliminating confidential document transmission to external servers by shifting all computational workloads directly into the client browser.</p>
      </div>

      <div class="layout-grid-3">
        <div class="workbench-card">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent-amber); margin-bottom: 8px;">01 &bull; PRIVACY RISK</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">Server Data Leakage</h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
            Conventional online file converters upload user documents to third-party cloud servers, creating security vulnerabilities and regulatory compliance hazards.
          </p>
        </div>

        <div class="workbench-card">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent-amber); margin-bottom: 8px;">02 &bull; NATIVE BROWSER APIS</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">Modern Web Capabilities</h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
            Harnessing cutting-edge HTML5 Canvas, Web Audio API, Web Cryptography API, and MediaRecorder without bloated backend infrastructure.
          </p>
        </div>

        <div class="workbench-card">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent-amber); margin-bottom: 8px;">03 &bull; NETWORK RESILIENCE</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">100% Offline Autonomy</h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
            The workbench remains fully functional even in offline environments or air-gapped corporate intranets thanks to isolated static bundles.
          </p>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO TOOLS &bull; ENGINEERING PRINCIPLES</div>
      <div>CLIENT-SIDE WEB STANDARDS</div>
      <div>02 / 10</div>
    </div>
  </div>

  <!-- SLIDE 3: DASHBOARD & MODULAR NAVIGATION -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Interface Hub</div>
        <div class="brand-subtitle">Dashboard &amp; Category Navigation</div>
      </div>
      <div class="badge-pill">DECK-AIO-03 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Feature Organization</div>
        <h2 class="slide-title">Modular Dashboard Grid &amp; Rapid Tool Discovery</h2>
        <p class="slide-subtitle">Categorized utility catalog grouped across Media, Developer, Security, and Document domains with instant client-side filtering.</p>
      </div>

      <div class="layout-split">
        <div class="visual-stage">
          <img src="${images.dashboardMobile}" alt="AIO Tools Dashboard Mobile View">
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item-title">Categorized Grid Layout</div>
            <div class="feature-item-desc">
              Organizes tools into clean #232323 surface cards featuring technical vector icons and concise function descriptions.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Real-Time Client-Side Search</div>
            <div class="feature-item-desc">
              Instant tool filtering matches keywords and tags in memory without page refreshes or external API latency.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Off-Canvas Mobile Navigation</div>
            <div class="feature-item-desc">
              Integrated drawer menu enables rapid switching between media, security, and developer utilities on compact screens.
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
        <div class="brand-title">Developer Suite</div>
        <div class="brand-subtitle">Developer Code Suite &amp; Syntax Utilities</div>
      </div>
      <div class="badge-pill">DECK-AIO-04 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Software Engineering Utilities</div>
        <h2 class="slide-title">Developer Code Manipulation &amp; Data Format Suite</h2>
        <p class="slide-subtitle">Essential day-to-day tools for JSON beautification, Base64 encoding/decoding, JWT inspection, and Myers diffing.</p>
      </div>

      <div class="layout-split-reversed">
        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item-title">Text Diff Checker (Myers Algorithm)</div>
            <div class="feature-item-desc">
              Side-by-side text comparison displaying line additions, deletions, and character-level modifications with precision visual highlights.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">JSON Formatter &amp; Tree Inspector</div>
            <div class="feature-item-desc">
              Instant JSON syntax validation with customizable indentation, node collapsing, and exact error line coordinates.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Universal Hash Generator</div>
            <div class="feature-item-desc">
              Calculates MD5, SHA-1, SHA-256, and SHA-512 cryptographic digests using the high-velocity native Web Crypto API.
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
        <div class="brand-title">Graphic Pipeline</div>
        <div class="brand-subtitle">Canvas Image Compression &amp; Format Converter</div>
      </div>
      <div class="badge-pill">DECK-AIO-05 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Graphic Compression Engine</div>
        <h2 class="slide-title">Client-Side Image Compression with Canvas Offscreen</h2>
        <p class="slide-subtitle">Compressing JPEG, PNG, and WebP images directly in local browser memory with savings ratios reaching up to 80%.</p>
      </div>

      <div class="layout-split">
        <div class="visual-stage">
          <img src="${images.compressorDesktop}" alt="Image Compressor Tool Desktop">
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item-title">FileReader &amp; OffscreenCanvas Pipeline</div>
            <div class="feature-item-desc">
              Loads local images via FileReader directly into 2D canvas buffers without transmitting a single byte over the network.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Interactive Quality Compression Slider</div>
            <div class="feature-item-desc">
              Fine-tunes quality parameters with instant side-by-side previews comparing file size reduction and visual fidelity.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Automated Modern WebP Conversion</div>
            <div class="feature-item-desc">
              Transcodes legacy image formats into lightweight WebP binaries to optimize web delivery bandwidth.
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
        <div class="brand-title">Syntax Inspection</div>
        <div class="brand-subtitle">Regular Expression Visualizer &amp; Matcher</div>
      </div>
      <div class="badge-pill">DECK-AIO-06 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Pattern Evaluation</div>
        <h2 class="slide-title">Real-Time Regex Pattern Visualizer &amp; Capturing Groups</h2>
        <p class="slide-subtitle">Testing regular expressions with real-time match highlighting, syntax validation, and instant error feedback.</p>
      </div>

      <div class="layout-split-reversed">
        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item-title">Instant Pattern Compilation</div>
            <div class="feature-item-desc">
              Native RegExp compilation with structured exception handling prevents browser freezing when malformed patterns are typed.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Color-Coded Multi-Group Highlighting</div>
            <div class="feature-item-desc">
              Distinct background colors identify individual capturing groups to simplify debugging complex nested sub-patterns.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Common Pattern Cheat Sheet Library</div>
            <div class="feature-item-desc">
              Curated library of standard patterns (Email, URL, IPv4, Date, Alphanumeric) insertable with a single click.
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

  <!-- SLIDE 7: CLIENT CRYPTOGRAPHY & SECURITY -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Client Security</div>
        <div class="brand-subtitle">AES-GCM Encryption &amp; Cryptographic Generators</div>
      </div>
      <div class="badge-pill">DECK-AIO-07 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Browser Cryptography</div>
        <h2 class="slide-title">AES-GCM 256-Bit File Encryption &amp; Secure Key Vault</h2>
        <p class="slide-subtitle">Protecting document confidentiality with military-grade encryption executed natively via the Web Crypto Subtle API.</p>
      </div>

      <div class="layout-split">
        <div class="visual-stage">
          <img src="${images.encryptorDesktop}" alt="File Encryptor Tool Desktop">
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item-title">Client-Side AES-GCM 256-Bit Encryption</div>
            <div class="feature-item-desc">
              PBKDF2 key derivation with random salt and unique initialization vectors (IV) protects files from unauthorized interception.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">High-Entropy Password Generator</div>
            <div class="feature-item-desc">
              Generates cryptographically random character sequences via crypto.getRandomValues() with real-time bit entropy scores.
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">Local QR &amp; Barcode Matrix Generator</div>
            <div class="feature-item-desc">
              Renders QR and barcode matrices directly to SVG/Canvas without calling third-party tracking APIs.
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
        <div class="brand-title">Recording &amp; Audio</div>
        <div class="brand-subtitle">Web Audio API &amp; Screen Recorder Engine</div>
      </div>
      <div class="badge-pill">DECK-AIO-08 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Media Stream Manipulation</div>
        <h2 class="slide-title">In-Browser Audio Trimmer &amp; Screen Recording Studio</h2>
        <p class="slide-subtitle">Leveraging modern browser media streams to trim audio tracks and record desktop video without software installations.</p>
      </div>

      <div class="layout-split-reversed">
        <div class="feature-list">
          <div class="feature-box">
            <div class="feature-box-title">AudioContext Waveform Visualization</div>
            <div class="feature-box-desc">
              Decodes audio PCM bytes to render visual waveforms with millisecond-precise time range trimming.
            </div>
          </div>
          <div class="feature-box">
            <div class="feature-box-title">MediaRecorder Screen Video Capture</div>
            <div class="feature-box-desc">
              Captures display streams via getDisplayMedia() with instant WebM encoding and direct local download prompts.
            </div>
          </div>
          <div class="feature-box">
            <div class="feature-box-title">Real-Time Instrument Tuner (FFT Analysis)</div>
            <div class="feature-box-desc">
              Fast Fourier Transform (FFT) pitch detection analyzes microphone input to display accurate musical frequencies.
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

  <!-- SLIDE 9: RUNTIME PERFORMANCE & MEMORY SAFETY -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Performance Engineering</div>
        <div class="brand-subtitle">Memory Management &amp; Sandbox Safety</div>
      </div>
      <div class="badge-pill">DECK-AIO-09 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Memory Efficiency &amp; Safety</div>
        <h2 class="slide-title">Binary Lifecycle Management &amp; Sandbox Hygiene</h2>
        <p class="slide-subtitle">Strict memory deallocation discipline and isolated error boundaries ensuring complete browser stability.</p>
      </div>

      <div class="layout-grid-3">
        <div class="workbench-card">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent-amber); margin-bottom: 8px;">MEMORY DISCIPLINE</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">URL.revokeObjectURL</h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
            Blob URL references are revoked immediately after file export, releasing browser RAM and preventing long-term memory accumulation.
          </p>
        </div>

        <div class="workbench-card">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent-amber); margin-bottom: 8px;">THREAD ISOLATION</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">Non-Blocking Operations</h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
            Heavy cryptographic iterations and media processing are chunked asynchronously to maintain UI responsiveness and prevent freezes.
          </p>
        </div>

        <div class="workbench-card">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--accent-amber); margin-bottom: 8px;">ZERO CDN RELIANCE</div>
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">Offline PWA Architecture</h3>
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
            All parsing and cryptographic libraries are bundled locally, eliminating external network dependencies that could fail offline.
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

  <!-- SLIDE 10: ARCHITECTURAL SUMMARY & DEPLOYMENT -->
  <div class="slide">
    <div class="slide-header">
      <div class="brand-pill">
        <div class="brand-dot"></div>
        <div class="brand-title">Milestone Summary</div>
        <div class="brand-subtitle">Production Specifications &amp; Quality Audit</div>
      </div>
      <div class="badge-pill">DECK-AIO-10 / 10</div>
    </div>

    <div class="slide-content">
      <div class="title-block">
        <div class="slide-category">Production Readiness</div>
        <h2 class="slide-title">Comprehensive Project Implementation Summary</h2>
        <p class="slide-subtitle">A comprehensive utility workbench proving the full power of modern client-side browser computing without servers.</p>
      </div>

      <div class="layout-grid-4">
        <div class="workbench-card">
          <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">CORE ENGINE</div>
          <div style="font-size: 18px; font-weight: 700; color: var(--accent-amber); margin-top: 4px; margin-bottom: 4px;">Vanilla JS</div>
          <p style="font-size: 12px; color: var(--text-muted); line-height: 1.45;">Pure ES6+ execution with zero framework compilation overhead.</p>
        </div>

        <div class="workbench-card">
          <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">WEB APIS</div>
          <div style="font-size: 18px; font-weight: 700; color: var(--accent-amber); margin-top: 4px; margin-bottom: 4px;">Crypto &amp; Audio</div>
          <p style="font-size: 12px; color: var(--text-muted); line-height: 1.45;">Leveraging standardized W3C browser hardware interfaces.</p>
        </div>

        <div class="workbench-card">
          <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">STYLING</div>
          <div style="font-size: 18px; font-weight: 700; color: var(--accent-amber); margin-top: 4px; margin-bottom: 4px;">Dark Charcoal</div>
          <p style="font-size: 12px; color: var(--text-muted); line-height: 1.45;">High-contrast SnapFolio workbench theme with amber accents.</p>
        </div>

        <div class="workbench-card">
          <div style="font-size: 11px; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace;">RELIABILITY</div>
          <div style="font-size: 18px; font-weight: 700; color: #10B981; margin-top: 4px; margin-bottom: 4px;">100% Offline</div>
          <p style="font-size: 12px; color: var(--text-muted); line-height: 1.45;">Fully operational without servers or an internet connection.</p>
        </div>
      </div>

      <div class="visual-stage" style="min-height: 160px; max-height: 180px; margin-top: 15px;">
        <img src="${images.passwordDesktop}" alt="Password Generator Tool Desktop">
      </div>
    </div>

    <div class="slide-footer">
      <div>JAVASCRIPT AIO TOOLS &bull; PROJECT COMPLETION</div>
      <div>WIDI FIRMANSYAH &bull; LEAD ENGINEER</div>
      <div>10 / 10</div>
    </div>
  </div>

</body>
</html>
`;

const htmlFilePath = path.join(projectRoot, 'presentation.html');
fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
console.log(`Presentation HTML written to: ${htmlFilePath}`);

console.log('Launching Chromium with Playwright to render English AIO Tools Dark Charcoal Workbench PDFs...');

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

  console.log('\nAIO Tools English PDFs successfully generated:');
  console.log(`- Multi-Page Deck: ${(slideStat.size / 1024 / 1024).toFixed(2)} MB (${slidePdfPath})`);
  console.log(`- Continuous Poster: ${(contStat.size / 1024 / 1024).toFixed(2)} MB (${continuousPdfPath})\n`);
}

renderPDF().catch((err) => {
  console.error('Error rendering PDF:', err);
  process.exit(1);
});
