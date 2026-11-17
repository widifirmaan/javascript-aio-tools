# JavaScript AIO Tools

> Fast, 100% private in-browser utility suite powered by client-side JavaScript and modern Web APIs.

JavaScript All-in-One (AIO) Tools is a collection of 23 browser utilities for documents, images, audio, video, security & privacy, developer productivity, and calculations. Processing runs entirely in browser memory with zero server uploads—22 tools execute via native JavaScript, Canvas, and Web APIs, with on-device WebAssembly used for neural background removal.

[![Architecture](https://img.shields.io/badge/Architecture-100%25_Client--Side-8B5CF6?style=flat-square)](#features)
[![Tools](https://img.shields.io/badge/Tools-23_Interactive_Apps-F59E0B?style=flat-square)](#features)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5 / CSS3](https://img.shields.io/badge/HTML5%20%2F%20CSS3-Modern_Web-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/)
[![Bootstrap](https://img.shields.io/badge/UI-Bootstrap_5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

---

## Showcase

| Desktop | Mobile |
| :---: | :---: |
| **Main Dashboard Desktop**<br>![Dashboard Desktop](screenshots/Dashboard%20Desktop.png) | **Main Dashboard Mobile**<br>![Dashboard Mobile](screenshots/Dashboard%20Mobile.png) |
| **File Encryptor Desktop**<br>![File Encryptor Desktop](screenshots/File%20Encryptor%20Desktop.png) | **File Encryptor Mobile**<br>![File Encryptor Mobile](screenshots/File%20Encryptor%20Mobile.png) |
| **Steganography Studio Desktop**<br>![Steganography Studio Desktop](screenshots/Steganography%20Studio%20Desktop.png) | **Steganography Studio Mobile**<br>![Steganography Studio Mobile](screenshots/Steganography%20Studio%20Mobile.png) |
| **ASCII Art Generator Desktop**<br>![ASCII Art Generator Desktop](screenshots/ASCII%20Art%20Generator%20Desktop.png) | **ASCII Art Generator Mobile**<br>![ASCII Art Generator Mobile](screenshots/ASCII%20Art%20Generator%20Mobile.png) |
| **Regex Visualizer Desktop**<br>![Regex Visualizer Desktop](screenshots/Regex%20Visualizer%20Desktop.png) | **Regex Visualizer Mobile**<br>![Regex Visualizer Mobile](screenshots/Regex%20Visualizer%20Mobile.png) |
| **Text Diff Desktop**<br>![Text Diff Desktop](screenshots/Text%20Diff%20Desktop.png) | **Text Diff Mobile**<br>![Text Diff Mobile](screenshots/Text%20Diff%20Mobile.png) |
| **Password Generator Desktop**<br>![Password Generator Desktop](screenshots/Password%20Generator%20Desktop.png) | **Password Generator Mobile**<br>![Password Generator Mobile](screenshots/Password%20Generator%20Mobile.png) |
| **PDF Splitter Desktop**<br>![PDF Splitter Desktop](screenshots/PDF%20Splitter%20Desktop.png) | **PDF Splitter Mobile**<br>![PDF Splitter Mobile](screenshots/PDF%20Splitter%20Mobile.png) |
| **Color Palette Extractor Desktop**<br>![Color Palette Extractor Desktop](screenshots/Color%20Palette%20Extractor%20Desktop.png) | **Color Palette Extractor Mobile**<br>![Color Palette Extractor Mobile](screenshots/Color%20Palette%20Extractor%20Mobile.png) |
| **SVG Minifier Desktop**<br>![SVG Minifier Desktop](screenshots/SVG%20Minifier%20Desktop.png) | **SVG Minifier Mobile**<br>![SVG Minifier Mobile](screenshots/SVG%20Minifier%20Mobile.png) |
| **Audio Cutter Desktop**<br>![Audio Cutter Desktop](screenshots/Audio%20Cutter%20Desktop.png) | **Audio Cutter Mobile**<br>![Audio Cutter Mobile](screenshots/Audio%20Cutter%20Mobile.png) |
| **Photo Metadata Editor Desktop**<br>![Photo Metadata Editor Desktop](screenshots/Photo%20Metadata%20Editor%20Desktop.png) | **Photo Metadata Editor Mobile**<br>![Photo Metadata Editor Mobile](screenshots/Photo%20Metadata%20Editor%20Mobile.png) |
| **Screen Recorder Desktop**<br>![Screen Recorder Desktop](screenshots/Screen%20Recorder%20Desktop.png) | **Screen Recorder Mobile**<br>![Screen Recorder Mobile](screenshots/Screen%20Recorder%20Mobile.png) |
| **QR Code Studio Desktop**<br>![QR Code Studio Desktop](screenshots/QR%20Code%20Studio%20Desktop.png) | **QR Code Studio Mobile**<br>![QR Code Studio Mobile](screenshots/QR%20Code%20Studio%20Mobile.png) |
| **PDF Studio Desktop**<br>![PDF Studio Desktop](screenshots/PDF%20Studio%20Desktop.png) | **PDF Studio Mobile**<br>![PDF Studio Mobile](screenshots/PDF%20Studio%20Mobile.png) |
| **Developer Toolbox Desktop**<br>![Developer Toolbox Desktop](screenshots/Developer%20Toolbox%20Desktop.png) | **Developer Toolbox Mobile**<br>![Developer Toolbox Mobile](screenshots/Developer%20Toolbox%20Mobile.png) |
| **Background Remover Desktop**<br>![Background Remover Desktop](screenshots/Background%20Remover%20Desktop.png) | **Background Remover Mobile**<br>![Background Remover Mobile](screenshots/Background%20Remover%20Mobile.png) |
| **Image Compressor Desktop**<br>![Image Compressor Desktop](screenshots/Image%20Compressor%20Desktop.png) | **Image Compressor Mobile**<br>![Image Compressor Mobile](screenshots/Image%20Compressor%20Mobile.png) |
| **Scientific Calculator Desktop**<br>![Scientific Calculator Desktop](screenshots/Scientific%20Calculator%20Desktop.png) | **Scientific Calculator Mobile**<br>![Scientific Calculator Mobile](screenshots/Scientific%20Calculator%20Mobile.png) |
| **Image Converter Desktop**<br>![Image Converter Desktop](screenshots/Image%20Converter%20Desktop.png) | **Image Converter Mobile**<br>![Image Converter Mobile](screenshots/Image%20Converter%20Mobile.png) |
| **Text Editor Desktop**<br>![Text Editor Desktop](screenshots/Text%20Editor%20Desktop.png) | **Text Editor Mobile**<br>![Text Editor Mobile](screenshots/Text%20Editor%20Mobile.png) |
| **Tire & Wheel Comparison Desktop**<br>![Tire Comparison Desktop](screenshots/Tire%20Comparison%20Desktop.png) | **Tire & Wheel Comparison Mobile**<br>![Tire Comparison Mobile](screenshots/Tire%20Comparison%20Mobile.png) |
| **Instrument Tuner Desktop**<br>![Instrument Tuner Desktop](screenshots/Instrument%20Tuner%20Desktop.png) | **Instrument Tuner Mobile**<br>![Instrument Tuner Mobile](screenshots/Instrument%20Tuner%20Mobile.png) |
| **Barcode Studio Desktop**<br>![Barcode Studio Desktop](screenshots/Barcode%20Studio%20Desktop.png) | **Barcode Studio Mobile**<br>![Barcode Studio Mobile](screenshots/Barcode%20Studio%20Mobile.png) |

---

## Features

- **23 In-Browser Utilities**: Essential developer and creative tools running 100% in the browser with zero server uploads:
  - **File Encryptor (`tools/file-encryptor.html`)**: AES-GCM 256-bit encryption and decryption with PBKDF2 key derivation (100,000 iterations) via native Web Crypto API.
  - **Steganography Studio (`tools/steganography.html`)**: Least Significant Bit (LSB) image steganography across RGB pixel channels with optional AES-GCM encryption.
  - **Password Generator (`tools/password-generator.html`)**: Cryptographically secure random password generation with character sets, Diceware passphrases, and Shannon entropy estimation.
  - **Photo Metadata Editor (`tools/photo-metadata.html`)**: Pure JavaScript binary EXIF parser displaying camera settings and GPS coordinates with 1-click EXIF stripping.
  - **PDF Splitter (`tools/pdf-splitter.html`)**: Multi-page PDF page range extraction and visual thumbnail preview powered by PDF-Lib and Mozilla PDF.js.
  - **PDF Studio (`tools/pdf-tools.html`)**: Multi-document PDF merger and batch JPG/PNG/WebP images-to-PDF compiler.
  - **ASCII Art Generator (`tools/ascii-art.html`)**: Image-to-ASCII converter generating monochrome text, styled HTML, and 24-bit ANSI terminal escape codes.
  - **Background Remover (`tools/remove-bg.html`)**: In-browser neural background removal powered by `@imgly/background-removal` WebAssembly runtime.
  - **Image Compressor (`tools/image-compressor.html`)**: Client-side canvas image compression with configurable quality levels and instant download.
  - **Image Converter (`tools/image-converter.html`)**: Format conversion between JPG, PNG, and WebP using HTML5 Canvas APIs.
  - **Color Palette Extractor (`tools/color-palette.html`)**: Dominant color extraction using Median-Cut color quantization with CSS variables, JSON, and PNG card export.
  - **SVG Minifier (`tools/svg-minifier.html`)**: XML namespace cleaner, comment stripper, and path coordinate precision optimizer with side-by-side vector preview.
  - **Audio Cutter (`tools/audio-cutter.html`)**: Interactive Web Audio waveform trimmer with draggable handles, fade envelope curves, and PCM WAV export.
  - **Screen Recorder (`tools/screen-recorder.html`)**: DisplayMedia and MediaRecorder video capture with microphone/tab audio support and WebM download.
  - **Instrument Tuner (`tools/audio-tuner.html`)**: Real-time pitch detection via YIN autocorrelation algorithm with -50 to +50 cents deviation needle and live FFT spectrogram.
  - **Regex Visualizer (`tools/regex-visualizer.html`)**: Regular expression tester with dynamic SVG railroad track flow diagrams and capture group inspection.
  - **Text Diff (`tools/text-diff.html`)**: Longest Common Subsequence (LCS) text comparator with side-by-side split and unified diff modes.
  - **QR Code Studio (`tools/qr-code.html`)**: QR code generator for URLs, Wi-Fi networks, WhatsApp, and vCards, plus webcam and image QR scanner via Html5-QRCode.
  - **Developer Toolbox (`tools/dev-tools.html`)**: JSON Formatter & Validator (2/4 space beautify, minify), Base64/URL encoder-decoder, and client-side JWT token inspector.
  - **Text Editor (`tools/text-editor.html`)**: Rich-text editing workspace with real-time character, word, and paragraph counters.
  - **Barcode Studio (`tools/barcode-studio.html`)**: Pure JavaScript 1D vector barcode generator supporting Code 128 (B), EAN-13, UPC-A, Code 39, and ITF-14.
  - **Scientific Calculator (`tools/calculator.html`)**: Client-side scientific calculator with trigonometric, logarithmic, and power functions.
  - **Tire Comparison (`tools/tire-comp.html`)**: Automotive tire specification comparator calculating sidewall height, rolling diameter, ride height delta, and speedometer error percentage.
- **100% Client-Side Privacy**: All file processing, cryptographic operations, image rendering, and document manipulation execute in browser memory—no files or metadata are uploaded to any external server.
- **Zero Framework Runtime**: Built with Vanilla JavaScript (ES6+), HTML5, and CSS without client-side framework overhead.
- **Responsive Dark Theme**: Modern dark theme with Bootstrap 5.3 and custom CSS styling, mobile off-canvas drawer navigation, and responsive tool grid.

---

## Tech Stack

| Category | Technologies | Purpose |
| :--- | :--- | :--- |
| **Core Architecture** | Vanilla JavaScript (ES6+), HTML5, CSS3 | Client-side web application without framework overhead |
| **Cryptography & Privacy** | Web Crypto API (`SubtleCrypto`), AES-GCM, PBKDF2 | Client-side 256-bit file encryption, LSB steganography, and token inspection |
| **Document Processing** | Mozilla PDF.js v3.11, PDF-Lib v1.17 | In-browser PDF parsing, previewing, splitting, and merging |
| **Audio & Media APIs** | Web Audio API (YIN Pitch Autocorrelation), Canvas 2D, MediaRecorder | Pitch detection, waveform slicing, audio encoding, and screen capture |
| **On-Device Machine Learning** | `@imgly/background-removal` (WASM), HTML5 Canvas | On-device machine learning for background removal without server processing |
| **QR Code & Camera** | QRCode.js, Html5-QRCode v2.3 | Client-side QR generation and live webcam video stream decoding |
| **Developer Utilities** | Pure JS Barcode Encoders (128/EAN/UPC/39/ITF), AST Tokenizer, Binary EXIF, LCS Diff | Vector barcode rendering, Regex Railroad flow generation, metadata analysis, and text diffing |
| **Styling & Icons** | Bootstrap 5.3, Bootstrap Icons, AOS, Custom CSS | Responsive modern interface with modal dialogs and scroll animations |

---

## Project Structure

```bash
/
├── assets/                  # CSS styles, vendor scripts, and font assets
│   ├── css/                 # Global styles and typography
│   ├── js/                  # Shared helper scripts (main.js, services.js)
│   └── vendor/              # Bootstrap, AOS, Swiper, PDF-Lib, and PDF.js bundles
├── tools/                   # Dedicated interactive web applications (23 total)
│   ├── file-encryptor.html  # AES-256-GCM client-side file encryption & decryption
│   ├── steganography.html   # LSB pixel steganography with optional AES protection
│   ├── ascii-art.html       # ASCII & ANSI 24-bit terminal text art generator
│   ├── regex-visualizer.html# Regex tester & SVG railroad track flow visualizer
│   ├── text-diff.html       # Text Diff comparison (LCS, side-by-side & unified)
│   ├── password-generator.html # Web Crypto secure password & passphrase generator
│   ├── pdf-splitter.html    # PDF Splitter & page range extractor
│   ├── color-palette.html   # Canvas color palette extractor & CSS variable generator
│   ├── svg-minifier.html    # SVG Minifier & coordinate optimizer
│   ├── audio-cutter.html    # Web Audio waveform cutter & WAV generator
│   ├── photo-metadata.html  # Binary EXIF parser & privacy metadata wiper
│   ├── screen-recorder.html # DisplayMedia & MediaRecorder screen recorder
│   ├── audio-tuner.html     # Web Audio YIN autocorrelation pitch tuner & FFT spectrogram
│   ├── barcode-studio.html  # Pure client-side 1D barcode generator (Code 128, EAN-13, UPC-A, Code 39, ITF-14)
│   ├── qr-code.html         # QR code generator and camera scanner
│   ├── pdf-tools.html       # PDF merger and images-to-PDF converter
│   ├── dev-tools.html       # JSON formatter, Base64/URL & JWT inspector
│   ├── remove-bg.html       # AI WebAssembly background remover
│   ├── image-compressor.html# Client-side image compressor
│   ├── image-converter.html # Image format converter (JPG, PNG, WebP)
│   ├── calculator.html      # Scientific online calculator
│   ├── text-editor.html     # Real-time text editor & word counter
│   └── tire-comp.html       # Tire & rim comparison calculator
├── screenshots/             # Showcase mockups (48 files)
├── scripts/                 # Automated test runner and screenshot crawler
├── index.html               # Main dashboard with all 23 tools
├── package.json             # NPM metadata and test scripts
└── README.md
```

---

## Local Setup & Deployment

### 1. Prerequisites

- Any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).
- Python 3 (`python3`) or Node.js (`npx serve`) to host static files locally.

### 2. Menjalankan Server Lokal

Aplikasi ini 100% *client-side* (statis) tanpa dependensi database eksternal:

```bash
# 1. Clone repository
git clone https://github.com/widifirmaan/javascript-aio-tools.git
cd javascript-aio-tools

# 2. Jalankan local web server
python3 -m http.server 3000

# Atau menggunakan npx serve (jika ada Node.js)
npx serve . -p 3000
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 3. Pengujian Otomatis

Untuk menjalankan suite pengujian otomatis terhadap 23 modul aplikasi:

```bash
npm test
```

### 4. Panduan Uji Manual (Testing Checklist)

Lakukan verifikasi manual berikut di browser:

| No | Fitur yang Diuji | Langkah Pengujian | Hasil yang Diharapkan |
| :---: | :--- | :--- | :--- |
| 1 | **Dashboard Utama** | Buka `http://localhost:3000`, gunakan filter pencarian kategori | Tampil 23 card tools responsif dan filter kategori berfungsi |
| 2 | **File Encryptor** | Buka `/tools/file-encryptor.html`, upload file, input passphrase, klik Enkripsi | File terenkripsi AES-256-GCM terunduh (`.enc`), dan bisa didekripsi ulang |
| 3 | **Steganography** | Buka `/tools/steganography.html`, masukkan gambar PNG & teks rahasia, sembunyikan | Gambar hasil steganografi LSB terunduh; saat di-decode teks terbaca tepat |
| 4 | **Password Generator** | Buka `/tools/password-generator.html`, pilih opsi simbol & panjang 16 | Password acak aman ter-generate dengan indikator entropy bit |
| 5 | **Barcode Studio** | Buka `/tools/barcode-studio.html`, ketik angka/teks, pilih format `Code 128` | Barcode SVG rendered seketika dan dapat diunduh (SVG / PNG) |
| 6 | **Developer Toolbox** | Buka `/tools/dev-tools.html`, tempel string JSON tidak terformat, klik Beautify | JSON terformat rapi dengan validasi sintaksis bebas error |

---

## Author

Developed by **[Widi Firmansyah](https://widifirmaan.web.id)**.
