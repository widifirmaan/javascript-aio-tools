# JavaScript AIO Tools

Collection of 23 client-side web utilities for document processing, media editing, cryptography, and developer productivity running directly in the browser.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-CSS3-E34F26?style=flat-square&logo=html5&logoColor=white)
![WebAssembly](https://img.shields.io/badge/WebAssembly-On--Device_ML-654FF0?style=flat-square&logo=webassembly&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.7-7952B3?style=flat-square&logo=bootstrap&logoColor=white)

## Live URL

- **Production**: [https://tools.widifirmaan.web.id](https://tools.widifirmaan.web.id)

## Features

- **Cryptography & Security**:
  - **File Encryptor (`tools/file-encryptor.html`)**: Browser-memory AES-256-GCM file encryption and decryption using PBKDF2-SHA-256 key derivation (`100,000` iterations) via the Web Crypto API (`SubtleCrypto`).
  - **Steganography Studio (`tools/steganography.html`)**: RGB Least Significant Bit (LSB) PNG steganography with optional AES-128-GCM password protection (`10,000` PBKDF2 iterations).
  - **Password Generator (`tools/password-generator.html`)**: CSPRNG password and multi-word English passphrase generation (`104`-word list via `crypto.getRandomValues`) with bit-length keyspace entropy calculation (`L * log2(N)`).
- **Documents & Developer Utilities**:
  - **PDF Tools (`tools/pdf-tools.html`)** & **PDF Splitter (`tools/pdf-splitter.html`)**: Client-side PDF merging, image-to-PDF conversion, page thumbnail previews, and page-range extraction with PDF-Lib and Mozilla PDF.js.
  - **Developer Toolbox (`tools/dev-tools.html`)**: JSON formatter/validator, Base64/URL encoder-decoder, and client-side JWT payload inspector.
  - **Regex Visualizer (`tools/regex-visualizer.html`)**: Live regular expression matching, capture group extraction, and SVG railroad syntax diagrams.
  - **Text Diff (`tools/text-diff.html`)** & **Text Editor (`tools/text-editor.html`)**: Longest Common Subsequence (LCS) line diff comparator and plain text/word-count workspace.
- **Images, Barcodes & Graphics**:
  - **Background Remover (`tools/remove-bg.html`)**: On-device foreground cutout using `@imgly/background-removal` WebAssembly runtime (with COOP/COEP cross-origin isolation headers configured in `_headers` and `vercel.json`).
  - **Image Compressor (`tools/image-compressor.html`)** & **Image Converter (`tools/image-converter.html`)**: HTML5 Canvas image compression and JPG/PNG/WebP format conversion.
  - **Color Palette Extractor (`tools/color-palette.html`)**: Median-Cut color quantization with CSS variable, JSON, and PNG swatch export.
  - **SVG Minifier (`tools/svg-minifier.html`)**: XML header/comment/metadata cleanup, coordinate rounding, and side-by-side vector preview.
  - **Photo Metadata (`tools/photo-metadata.html`)**: Pure JavaScript binary JPEG IFD0 EXIF header viewer (camera make/model, software, timestamp, exposure/aperture/ISO) and canvas-based EXIF stripping.
  - **QR Code Studio (`tools/qr-code.html`)** & **Barcode Studio (`tools/barcode-studio.html`)**: QR generation/webcam scanning (`QRCode.js`, `Html5-QRCode`) plus pure JavaScript SVG barcode rendering (Code 128, EAN-13, UPC-A, Code 39, ITF-14).
  - **ASCII Art Generator (`tools/ascii-art.html`)**: Image-to-ASCII conversion with plain text, HTML, and ANSI color output.
- **Audio, Recording & Calculators**:
  - **Audio Cutter (`tools/audio-cutter.html`)** & **Instrument Tuner (`tools/audio-tuner.html`)**: Web Audio waveform slicing with fade controls and WAV export, plus time-domain autocorrelation pitch detection with parabolic interpolation and FFT spectrum view.
  - **Screen Recorder (`tools/screen-recorder.html`)**: Display capture and recording via `getDisplayMedia` and `MediaRecorder` with WebM download.
  - **Scientific Calculator (`tools/calculator.html`)** & **Tire Comparison (`tools/tire-comp.html`)**: Client-side scientific expression evaluator and tire/wheel diameter & speedometer delta calculator.

## Tech Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Core** | Vanilla JavaScript (ES6+), HTML5, CSS3 | Zero-bundler static multi-page architecture |
| **UI** | Bootstrap `5.3.7`, Bootstrap Icons, AOS | Responsive dark UI and scroll reveal transitions |
| **Cryptography** | Web Crypto API (`SubtleCrypto`) | AES-GCM encryption and PBKDF2 key derivation |
| **Documents** | Mozilla PDF.js, PDF-Lib | Browser PDF rendering, splitting, and merging |
| **Media & ML** | Web Audio API, MediaRecorder, `@imgly/background-removal` | Audio DSP, screen capture, and WASM background cutout |
| **Codes & Scanning** | QRCode.js, Html5-QRCode, Custom SVG Encoders | QR generation/decoding and 1D vector barcodes |

## Screenshots

| Desktop | Mobile |
| :---: | :---: |
| **Main Dashboard & 23-Tool Grid**<br>![Dashboard](screenshots/Dashboard%20Desktop.png) | **Main Dashboard & 23-Tool Grid**<br>![Dashboard](screenshots/Dashboard%20Mobile.png) |
| **Canvas Image Compressor**<br>![Image Compressor](screenshots/Image%20Compressor%20Desktop.png) | **Canvas Image Compressor**<br>![Image Compressor](screenshots/Image%20Compressor%20Mobile.png) |
| **AI Background Remover (WASM)**<br>![Background Remover](screenshots/Background%20Remover%20Desktop.png) | **AI Background Remover (WASM)**<br>![Background Remover](screenshots/Background%20Remover%20Mobile.png) |
| **QR Code Studio & Scanner**<br>![QR Code](screenshots/QR%20Code%20Desktop.png) | **QR Code Studio & Scanner**<br>![QR Code](screenshots/QR%20Code%20Mobile.png) |
| **PDF Multi-Tool (Merger & Img-to-PDF)**<br>![PDF Tools](screenshots/PDF%20Tools%20Desktop.png) | **PDF Multi-Tool (Merger & Img-to-PDF)**<br>![PDF Tools](screenshots/PDF%20Tools%20Mobile.png) |
| **Developer Toolbox (JSON, Base64, JWT)**<br>![Developer Toolbox](screenshots/Developer%20Toolbox%20Desktop.png) | **Developer Toolbox (JSON, Base64, JWT)**<br>![Developer Toolbox](screenshots/Developer%20Toolbox%20Mobile.png) |
| **Scientific Calculator**<br>![Calculator Result](screenshots/Calculator%20Result%20Desktop.png) | **Scientific Calculator**<br>![Calculator Result](screenshots/Calculator%20Result%20Mobile.png) |
| **JPG / PNG / WebP Image Converter**<br>![Image Converter](screenshots/Image%20Converter%20Desktop.png) | **JPG / PNG / WebP Image Converter**<br>![Image Converter](screenshots/Image%20Converter%20Mobile.png) |
| **Plain Text Editor & Word Counter**<br>![Text Editor](screenshots/Text%20Editor%20Desktop.png) | **Plain Text Editor & Word Counter**<br>![Text Editor](screenshots/Text%20Editor%20Mobile.png) |
| **Tire & Wheel Comparator**<br>![Tire Comparison](screenshots/Tire%20Comparison%20Desktop.png) | **Tire & Wheel Comparator**<br>![Tire Comparison](screenshots/Tire%20Comparison%20Mobile.png) |
| **Text Diff Comparator (LCS)**<br>![Text Diff](screenshots/Text%20Diff%20Desktop.png) | **Text Diff Comparator (LCS)**<br>![Text Diff](screenshots/Text%20Diff%20Mobile.png) |
| **Password & Passphrase Generator**<br>![Password Generator](screenshots/Password%20Generator%20Desktop.png) | **Password & Passphrase Generator**<br>![Password Generator](screenshots/Password%20Generator%20Mobile.png) |
| **PDF Page Range Splitter**<br>![PDF Splitter](screenshots/PDF%20Splitter%20Desktop.png) | **PDF Page Range Splitter**<br>![PDF Splitter](screenshots/PDF%20Splitter%20Mobile.png) |
| **Color Palette Extractor (Median Cut)**<br>![Color Palette](screenshots/Color%20Palette%20Desktop.png) | **Color Palette Extractor (Median Cut)**<br>![Color Palette](screenshots/Color%20Palette%20Mobile.png) |
| **SVG Minifier & Vector Preview**<br>![SVG Minifier](screenshots/SVG%20Minifier%20Desktop.png) | **SVG Minifier & Vector Preview**<br>![SVG Minifier](screenshots/SVG%20Minifier%20Mobile.png) |
| **Web Audio Waveform Cutter**<br>![Audio Cutter](screenshots/Audio%20Cutter%20Desktop.png) | **Web Audio Waveform Cutter**<br>![Audio Cutter](screenshots/Audio%20Cutter%20Mobile.png) |
| **Photo EXIF Metadata Inspector & Cleaner**<br>![Photo Metadata](screenshots/Photo%20Metadata%20Desktop.png) | **Photo EXIF Metadata Inspector & Cleaner**<br>![Photo Metadata](screenshots/Photo%20Metadata%20Mobile.png) |
| **Browser Screen Recorder (DisplayMedia)**<br>![Screen Recorder](screenshots/Screen%20Recorder%20Desktop.png) | **Browser Screen Recorder (DisplayMedia)**<br>![Screen Recorder](screenshots/Screen%20Recorder%20Mobile.png) |
| **File Encryptor & Decryptor (AES-256-GCM)**<br>![File Encryptor](screenshots/File%20Encryptor%20Desktop.png) | **File Encryptor & Decryptor (AES-256-GCM)**<br>![File Encryptor](screenshots/File%20Encryptor%20Mobile.png) |
| **Image Steganography Studio (LSB)**<br>![Steganography](screenshots/Steganography%20Desktop.png) | **Image Steganography Studio (LSB)**<br>![Steganography](screenshots/Steganography%20Mobile.png) |
| **Image-to-ASCII Art Generator**<br>![ASCII Art](screenshots/ASCII%20Art%20Desktop.png) | **Image-to-ASCII Art Generator**<br>![ASCII Art](screenshots/ASCII%20Art%20Mobile.png) |
| **Regex Visualizer & Railroad Diagrams**<br>![Regex Visualizer](screenshots/Regex%20Visualizer%20Desktop.png) | **Regex Visualizer & Railroad Diagrams**<br>![Regex Visualizer](screenshots/Regex%20Visualizer%20Mobile.png) |
| **Regex Invalid Pattern Error State**<br>![Regex Visualizer Alert Invalid Pattern](screenshots/Regex%20Visualizer%20Alert%20Invalid%20Pattern%20Desktop.png) | **Regex Invalid Pattern Error State**<br>![Regex Visualizer Alert Invalid Pattern](screenshots/Regex%20Visualizer%20Alert%20Invalid%20Pattern%20Mobile.png) |
| **Instrument Tuner & Spectrum View**<br>![Instrument Tuner](screenshots/Instrument%20Tuner%20Desktop.png) | **Instrument Tuner & Spectrum View**<br>![Instrument Tuner](screenshots/Instrument%20Tuner%20Mobile.png) |
| **1D Vector Barcode Studio**<br>![Barcode Studio](screenshots/Barcode%20Studio%20Desktop.png) | **1D Vector Barcode Studio**<br>![Barcode Studio](screenshots/Barcode%20Studio%20Mobile.png) |

## Local Setup

### Prerequisites

- Any modern browser with Web Crypto and WebAssembly support
- **Node.js** (or **Python 3**) to serve the static files over HTTP
- **No database or environment variables required**

### Run Locally

```bash
git clone https://github.com/widifirmaan/javascript-aio-tools.git
cd javascript-aio-tools

# Option A: npm script (serves port 3000)
npm run dev

# Option B: Python 3 static server
python3 -m http.server 3000
```

Open `http://localhost:3000` in your browser.

To run the headless Chrome end-to-end suite across all 23 tools (requires Chromium/Chrome at `/usr/bin/google-chrome` and `puppeteer-core` resolvable):

```bash
npm test
```

## Author

**Widi Firmansyah** · [widifirmaan.web.id](https://widifirmaan.web.id)
