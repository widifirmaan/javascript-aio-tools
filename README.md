# JavaScript AIO Tools

> Free, fast, and 100% private browser utility suite powered by WebAssembly and client-side JavaScript.

JavaScript All-in-One (AIO) Tools is an open-source, zero-server-cost collection of 10 essential browser utilities for documents, images, developer productivity, and calculations. All data is processed entirely in your browser's memory, zero server uploads, 100% private, and completely free.

[![Live Demo](https://img.shields.io/badge/Demo-tools.widifirmaan.web.id-10B981?style=flat-square&logo=cloudflare&logoColor=white)](https://tools.widifirmaan.web.id)
[![Architecture](https://img.shields.io/badge/Architecture-100%25_Client--Side-8B5CF6?style=flat-square)](#features)
[![WebAssembly](https://img.shields.io/badge/Engine-WebAssembly-654FF0?style=flat-square&logo=webassembly&logoColor=white)](https://webassembly.org/)
[![Tools](https://img.shields.io/badge/Tools-10_Interactive_Apps-F59E0B?style=flat-square)](#features)
[![Deployment](https://img.shields.io/badge/Deployment-Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5 / CSS3](https://img.shields.io/badge/HTML5%20%2F%20CSS3-Modern_Web-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/)
[![Tailwind & Bootstrap](https://img.shields.io/badge/UI-Tailwind_%26_Bootstrap-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-3B82F6?style=flat-square)](LICENSE)

---

## Live Production

- **URL:** [https://tools.widifirmaan.web.id](https://tools.widifirmaan.web.id)
- **Deployment:** Cloudflare Pages (Edge delivery with static assets)

---

## Showcase

| Desktop (MacBook Pro) | Mobile (iPhone 16 Pro) |
| :---: | :---: |
| **Main Dashboard Desktop**<br>![Dashboard Desktop](screenshots/Dashboard%20Desktop.png) | **Main Dashboard Mobile**<br>![Dashboard Mobile](screenshots/Dashboard%20Mobile.png) |
| **QR Code Studio Desktop**<br>![QR Code Studio Desktop](screenshots/QR%20Code%20Studio%20Desktop.png) | **QR Code Studio Mobile**<br>![QR Code Studio Mobile](screenshots/QR%20Code%20Studio%20Mobile.png) |
| **PDF Studio (Merge & Img2Pdf) Desktop**<br>![PDF Studio Desktop](screenshots/PDF%20Studio%20Desktop.png) | **PDF Studio Mobile**<br>![PDF Studio Mobile](screenshots/PDF%20Studio%20Mobile.png) |
| **Developer & Data Toolbox Desktop**<br>![Developer Toolbox Desktop](screenshots/Developer%20Toolbox%20Desktop.png) | **Developer & Data Toolbox Mobile**<br>![Developer Toolbox Mobile](screenshots/Developer%20Toolbox%20Mobile.png) |
| **AI Background Remover Desktop**<br>![Background Remover Desktop](screenshots/Background%20Remover%20Desktop.png) | **AI Background Remover Mobile**<br>![Background Remover Mobile](screenshots/Background%20Remover%20Mobile.png) |
| **Image Compressor Desktop**<br>![Image Compressor Desktop](screenshots/Image%20Compressor%20Desktop.png) | **Image Compressor Mobile**<br>![Image Compressor Mobile](screenshots/Image%20Compressor%20Mobile.png) |
| **Scientific Calculator Desktop**<br>![Scientific Calculator Desktop](screenshots/Scientific%20Calculator%20Desktop.png) | **Scientific Calculator Mobile**<br>![Scientific Calculator Mobile](screenshots/Scientific%20Calculator%20Mobile.png) |
| **Image Converter Desktop**<br>![Image Converter Desktop](screenshots/Image%20Converter%20Desktop.png) | **Image Converter Mobile**<br>![Image Converter Mobile](screenshots/Image%20Converter%20Mobile.png) |
| **Text Editor Desktop**<br>![Text Editor Desktop](screenshots/Text%20Editor%20Desktop.png) | **Text Editor Mobile**<br>![Text Editor Mobile](screenshots/Text%20Editor%20Mobile.png) |
| **Tire & Wheel Comparison Desktop**<br>![Tire Comparison Desktop](screenshots/Tire%20Comparison%20Desktop.png) | **Tire & Wheel Comparison Mobile**<br>![Tire Comparison Mobile](screenshots/Tire%20Comparison%20Mobile.png) |

---

## Features

All 9 tools are executed 100% locally in the browser without uploading documents or images to external servers:

### 1. 📄 Document & PDF Tools
- **PDF Studio (Merge & Images to PDF)** (`tools/pdf-tools.html`):
  - **Merge PDFs**: Combine multiple PDF files into one clean document with reordering controls.
  - **Images to PDF**: Convert collections of JPG, PNG, and WebP images into a standardized A4 or original-sized PDF document.
  - Powered by **PDF-Lib** client-side engine.

### 2. 🖼️ Media & Image Processing
- **AI Background Remover** (`tools/remove-bg.html`):
  - Automatic foreground detection and background removal using **Edge WebAssembly AI** (`@imgly/background-removal`).
  - Zero server GPU or CPU required, runs directly on the user's hardware via WebAssembly.
- **Image Compressor** (`tools/image-compressor.html`):
  - Fast client-side image compression reducing payload size by up to 80% while retaining visual fidelity.
- **Image Converter** (`tools/image-converter.html`):
  - Instant image conversion between JPG, PNG, and WebP formats using HTML5 Canvas APIs.

### 3. 🛠️ Developer & Productivity Tools
- **QR Code Studio (Generator & Scanner)** (`tools/qr-code.html`):
  - **Generator**: Custom QR codes for URLs, Wi-Fi networks (WPA/WEP/Open), WhatsApp direct chat, vCard contacts, and emails with custom colors and size settings.
  - **Scanner**: Decodes QR codes from image uploads or live webcam camera stream using **Html5-QRCode**.
- **Developer & Data Toolbox** (`tools/dev-tools.html`):
  - **JSON Formatter & Validator**: Beautify (2/4 spaces), Minify, and real-time syntax error pointer.
  - **Base64 & URL Encoder/Decoder**: Two-way encoding for text and files to Base64 data URLs.
  - **JWT Token Inspector**: Decodes JSON Web Tokens (Header, Claims/Payload) and checks expiration dates safely without transmitting tokens across the internet.
- **Distraction-Free Text Editor** (`tools/text-editor.html`):
  - Lightweight rich-text editor with real-time character, word, and paragraph counting.

### 4. 🔢 Math & Vehicle Engineering
- **Scientific Calculator** (`tools/calculator.html`):
  - Responsive mathematical and scientific calculator with trigonometric, logarithmic, and power functions.
- **Tire & Wheel Size Comparison** (`tools/tire-comp.html`):
  - Side-by-side automotive tire specification comparison calculating sidewall height, overall diameter changes, ride height differences, and speedometer calibration error percentage.

---

## Tech Stack

| Category | Technologies | Purpose |
| :--- | :--- | :--- |
| **Core Architecture** | Vanilla JavaScript (ES6+), HTML5, CSS3 | Zero-framework, lightweight client-side application foundation |
| **Document Processing** | Mozilla PDF.js v3.11, PDF-Lib v1.17 | In-browser PDF parsing, previewing, and PDF merging/creation |
| **Edge AI & Computer Vision** | `@imgly/background-removal` (WASM), HTML5 Canvas | On-device machine learning for background removal without server GPUs |
| **QR Code & Camera** | QRCode.js, Html5-QRCode v2.3 | Client-side QR generation and live webcam video stream decoding |
| **Developer Utilities** | Native Web Crypto, Atob/Btoa, JSON Parser | Secure client-side Base64, URL encoding, and JWT token parsing |
| **Styling & Icons** | Tailwind CSS v4, Bootstrap 5.3, Bootstrap Icons, AOS | Responsive neo-brutalist / modern clean interface with scroll animations |
| **Edge Hosting** | Cloudflare Pages + Custom `_headers` | Global edge distribution, HTTPS SSL, and canonical URL routing |

---

## Project Structure

```bash
/
├── assets/                  # CSS styles, vendor scripts, and font assets
│   ├── css/                 # Global styles and typography
│   ├── js/                  # Shared helper scripts
│   └── vendor/              # Bootstrap, AOS, Swiper, and icon bundles
├── tools/                   # Dedicated interactive web applications
│   ├── qr-code.html         # QR code generator and camera scanner
│   ├── pdf-tools.html       # PDF merger and images-to-PDF converter
│   ├── dev-tools.html       # JSON formatter, Base64/URL & JWT inspector
│   ├── remove-bg.html       # AI WebAssembly background remover
│   ├── image-compressor.html# Client-side image compressor
│   ├── image-converter.html # Image format converter (JPG, PNG, WebP)
│   ├── calculator.html      # Scientific online calculator
│   ├── text-editor.html     # Real-time text editor & word counter
│   └── tire-comp.html       # Tire & rim comparison calculator
├── screenshots/             # Retina MacBook Pro & iPhone 16 Pro showcase mockups
├── scripts/                 # Automated Puppeteer screenshot crawler
├── _headers                 # Cloudflare Pages HTTP caching & CORS rules
├── index.html               # Main dashboard with all 9 tools
├── package.json             # NPM metadata and screenshot automation scripts
├── wrangler.toml            # Cloudflare Pages deployment configuration
└── README.md
```

---

## Getting Started & Local Development

### Prerequisites
- Any modern web browser (Google Chrome, Firefox, Edge, or Safari).
- (Optional) Node.js 18+ to run a local dev server or trigger the screenshot crawler.

### Local Development

> **Environment Variables:** No `.env` file or API keys are required. All image processing, document conversions, and calculations run 100% inside your browser.

```bash
# 1. Clone the repository
git clone https://github.com/widifirmaan/javascript-aio-tools.git
cd javascript-aio-tools

# 2. Run local preview server using any static server:
npx serve .
# or using Python:
python3 -m http.server 3000
# or using Cloudflare Wrangler:
npx wrangler pages dev . --port=3000
```
Open `http://localhost:3000` in your browser.

### Cloudflare Pages Deployment

Deploy instantly to Cloudflare Pages via Wrangler CLI:

```bash
# Deploy static assets directly to Cloudflare Pages
npx wrangler pages deploy . --project-name javascript-aio-tools --branch master
```

---

## Author

Developed by **[Widi Firmansyah](https://widifirmaan.web.id)**.
