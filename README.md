# JavaScript AIO Tools

> Kumpulan 23 utilitas produktivitas, pemrosesan dokumen, manipulasi media, dan keamanan yang berjalan 100% di browser tanpa upload server.

[![Architecture](https://img.shields.io/badge/Architecture-100%25_Client--Side-8B5CF6?style=flat-square)](#fitur)
[![Tools](https://img.shields.io/badge/Tools-23_Interactive_Apps-F59E0B?style=flat-square)](#fitur)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5 / CSS3](https://img.shields.io/badge/HTML5%20%2F%20CSS3-Modern_Web-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/)
[![Bootstrap](https://img.shields.io/badge/UI-Bootstrap_5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Live Demo](https://img.shields.io/badge/Demo-tools.widifirmaan.web.id-10B981?style=flat-square)](https://tools.widifirmaan.web.id)

---

## Live URL

- **Production URL**: [https://tools.widifirmaan.web.id](https://tools.widifirmaan.web.id)

---

## Screenshot

| Desktop | Mobile |
| :---: | :---: |
| **Main Dashboard & Katalog Alat**<br>![Dashboard](screenshots/Dashboard%20Desktop.png) | **Main Dashboard & Katalog Alat**<br>![Dashboard](screenshots/Dashboard%20Mobile.png) |
| **Enkripsi & Dekripsi File (AES-GCM)**<br>![File Encryptor](screenshots/File%20Encryptor%20Desktop.png) | **Enkripsi & Dekripsi File (AES-GCM)**<br>![File Encryptor](screenshots/File%20Encryptor%20Mobile.png) |
| **Steganografi Gambar (LSB)**<br>![Steganography](screenshots/Steganography%20Desktop.png) | **Steganografi Gambar (LSB)**<br>![Steganography](screenshots/Steganography%20Mobile.png) |
| **Generator Kata Sandi & Entropi**<br>![Password Generator](screenshots/Password%20Generator%20Desktop.png) | **Generator Kata Sandi & Entropi**<br>![Password Generator](screenshots/Password%20Generator%20Mobile.png) |
| **Studio Barcode Vektor 1D**<br>![Barcode Studio](screenshots/Barcode%20Studio%20Desktop.png) | **Studio Barcode Vektor 1D**<br>![Barcode Studio](screenshots/Barcode%20Studio%20Mobile.png) |
| **Generator & Scanner QR Code**<br>![QR Code](screenshots/QR%20Code%20Desktop.png) | **Generator & Scanner QR Code**<br>![QR Code](screenshots/QR%20Code%20Mobile.png) |
| **Penghapus Background Gambar (AI WASM)**<br>![Background Remover](screenshots/Background%20Remover%20Desktop.png) | **Penghapus Background Gambar (AI WASM)**<br>![Background Remover](screenshots/Background%20Remover%20Mobile.png) |
| **Kompresi Gambar Canvas**<br>![Image Compressor](screenshots/Image%20Compressor%20Desktop.png) | **Kompresi Gambar Canvas**<br>![Image Compressor](screenshots/Image%20Compressor%20Mobile.png) |
| **Pemisah Halaman PDF**<br>![PDF Splitter](screenshots/PDF%20Splitter%20Desktop.png) | **Pemisah Halaman PDF**<br>![PDF Splitter](screenshots/PDF%20Splitter%20Mobile.png) |
| **Penggabung PDF & Image ke PDF**<br>![PDF Tools](screenshots/PDF%20Tools%20Desktop.png) | **Penggabung PDF & Image ke PDF**<br>![PDF Tools](screenshots/PDF%20Tools%20Mobile.png) |
| **Visualisasi Regex & Diagram SVG**<br>![Regex Visualizer](screenshots/Regex%20Visualizer%20Desktop.png) | **Visualisasi Regex & Diagram SVG**<br>![Regex Visualizer](screenshots/Regex%20Visualizer%20Mobile.png) |
| **Komparator Teks Diff (LCS)**<br>![Text Diff](screenshots/Text%20Diff%20Desktop.png) | **Komparator Teks Diff (LCS)**<br>![Text Diff](screenshots/Text%20Diff%20Mobile.png) |
| **Ekstraksi Palet Warna Canvas**<br>![Color Palette](screenshots/Color%20Palette%20Desktop.png) | **Ekstraksi Palet Warna Canvas**<br>![Color Palette](screenshots/Color%20Palette%20Mobile.png) |
| **Pemotong Audio & Waveform Web Audio**<br>![Audio Cutter](screenshots/Audio%20Cutter%20Desktop.png) | **Pemotong Audio & Waveform Web Audio**<br>![Audio Cutter](screenshots/Audio%20Cutter%20Mobile.png) |
| **Editor & Pembersih Metadata Foto EXIF**<br>![Photo Metadata](screenshots/Photo%20Metadata%20Desktop.png) | **Editor & Pembersih Metadata Foto EXIF**<br>![Photo Metadata](screenshots/Photo%20Metadata%20Mobile.png) |
| **Kalkulator Ilmiah Online**<br>![Calculator](screenshots/Calculator%20Desktop.png) | **Kalkulator Ilmiah Online**<br>![Calculator](screenshots/Calculator%20Mobile.png) |
| **Komparasi Spesifikasi Ban & Velg**<br>![Tire Comparison](screenshots/Tire%20Comparison%20Desktop.png) | **Komparasi Spesifikasi Ban & Velg**<br>![Tire Comparison](screenshots/Tire%20Comparison%20Mobile.png) |

---

## Fitur

- **23 Alat Web Interaktif**:
  - **File Encryptor (`tools/file-encryptor.html`)**: Enkripsi dan dekripsi file berbasis AES-GCM 256-bit dan derivasi kunci PBKDF2 (100.000 iterasi) via Web Crypto API bawaan browser.
  - **Steganography Studio (`tools/steganography.html`)**: Penyisipan teks rahasia ke dalam pixel RGB gambar menggunakan teknik Least Significant Bit (LSB) disertai enkripsi opsional.
  - **Password Generator (`tools/password-generator.html`)**: Pembangkit password acak berbasis kriptografi aman (`crypto.getRandomValues`), passphrase metode Diceware, dan kalkulasi entropi Shannon.
  - **Photo Metadata Editor (`tools/photo-metadata.html`)**: Parser binary EXIF untuk membaca data kamera, shutter speed, lensa, dan koordinat GPS foto, serta fitur pembersihan metadata 1-klik untuk privasi.
  - **PDF Splitter (`tools/pdf-splitter.html`)**: Ekstraksi rentang halaman dokumen PDF dan pratinjau thumbnail halaman menggunakan PDF-Lib dan Mozilla PDF.js.
  - **PDF Tools (`tools/pdf-tools.html`)**: Penggabungan banyak file PDF menjadi satu dan konversi kumpulan gambar (JPG/PNG/WebP) menjadi dokumen PDF.
  - **ASCII Art Generator (`tools/ascii-art.html`)**: Konversi citra gambar menjadi teks ASCII monokrom, HTML terformat, atau kode warna ANSI terminal 24-bit.
  - **Background Remover (`tools/remove-bg.html`)**: Penghapusan latar belakang gambar langsung di browser menggunakan runtime WebAssembly `@imgly/background-removal`.
  - **Image Compressor (`tools/image-compressor.html`)**: Kompresi ukuran file gambar melalui canvas HTML5 dengan pengaturan slider kualitas interaktif.
  - **Image Converter (`tools/image-converter.html`)**: Konversi instan format gambar antar JPG, PNG, dan WebP di memori browser.
  - **Color Palette Extractor (`tools/color-palette.html`)**: Ekstraksi warna dominan gambar dengan algoritma kuantisasi Median-Cut, ekspor variabel CSS, JSON, dan kartu swatch.
  - **SVG Minifier (`tools/svg-minifier.html`)**: Pembersihan tag namespace XML, komentar, dan reduksi presisi koordinat path SVG dengan pratinjau real-time.
  - **Audio Cutter (`tools/audio-cutter.html`)**: Pemotong rekaman suara dengan visualisasi gelombang waveform Web Audio API, slider rentang waktu, dan ekspor ke WAV PCM.
  - **Screen Recorder (`tools/screen-recorder.html`)**: Perekam layar browser berbasis `getDisplayMedia` dan `MediaRecorder` dengan dukungan mikrofon dan download WebM.
  - **Instrument Tuner (`tools/audio-tuner.html`)**: Deteksi frekuensi dan nada instrumen secara real-time menggunakan algoritma autokorelasi YIN dan jarum deviasi cent.
  - **Regex Visualizer (`tools/regex-visualizer.html`)**: Tester ekspresi reguler dengan rendering diagram alur lintasan kereta (Railroad Track) SVG dinamis dan pengujian grup tangkapan.
  - **Text Diff (`tools/text-diff.html`)**: Komparator perbedaan dua teks menggunakan algoritma Longest Common Subsequence (LCS) dengan tampilan split berdampingan dan unified.
  - **QR Code Studio (`tools/qr-code.html`)**: Generator QR Code untuk URL, Wi-Fi, WhatsApp, dan vCard, dilengkapi pemindai QR langsung dari file atau webcam.
  - **Developer Toolbox (`tools/dev-tools.html`)**: Pemformat/validator JSON, encoder-decoder Base64/URL, dan inspektor token JWT client-side.
  - **Text Editor (`tools/text-editor.html`)**: Workspace penulisan teks sederhana dengan penghitung karakter, kata, baris, dan estimasi waktu baca.
  - **Barcode Studio (`tools/barcode-studio.html`)**: Pembuat barcode 1D vektor murni JavaScript yang mendukung Code 128, EAN-13, UPC-A, Code 39, dan ITF-14.
  - **Scientific Calculator (`tools/calculator.html`)**: Kalkulator fungsi saintifik (trigonometri, logaritma, akar, pangkat) berbasis JavaScript.
  - **Tire Comparison (`tools/tire-comp.html`)**: Kalkulator komparasi dimensi ban otomotif untuk menghitung perbedaan tinggi dinding ban, diameter roda, selisih ground clearance, dan error speedometer.
- **100% Client-Side & Privasi Penuh**: Semua pemrosesan data, file, kriptografi, audio, dan gambar berjalan langsung di memori browser pengguna tanpa pengiriman data ke server mana pun.
- **Zero Framework Runtime**: Dibangun menggunakan Vanilla JavaScript standar (ES6+), HTML5, dan CSS3 murni tanpa dependensi backend.

---

## Tech Stack

| Kategori | Teknologi | Deskripsi / Peran |
| :--- | :--- | :--- |
| **Arsitektur Utama** | Vanilla JavaScript (ES6+), HTML5, CSS3 | Fondasi web statis murni tanpa overhead framework |
| **Kriptografi & Privasi** | Web Crypto API (`SubtleCrypto`), AES-GCM, PBKDF2 | Enkripsi file 256-bit dan derivasi kunci client-side |
| **Pemrosesan PDF** | Mozilla PDF.js `3.11`, PDF-Lib `1.17` | Parsing, visualisasi pratinjau, ekstraksi, dan penggabungan PDF |
| **Audio & Media** | Web Audio API (YIN Pitch Autocorrelation), MediaRecorder | Analisis gelombang suara, perekam layar, dan deteksi nada |
| **On-Device Machine Learning** | `@imgly/background-removal` (WebAssembly) | Neural network lokal untuk penghapusan background tanpa server |
| **QR Code & Scanner** | QRCode.js, Html5-QRCode `2.3` | Pembangkitan kode QR dan decoding video stream kamera |
| **Enkoding Barcode** | Pure JS Encoders (Code 128, EAN, UPC, Code 39, ITF-14) | Rendering barcode SVG berbasis algoritma bit matriks |
| **UI & Styling** | Bootstrap `5.3`, Bootstrap Icons, AOS | Tampilan responsif modern bertema gelap dengan drawer navigasi |

---

## Panduan Setup & Menjalankan Lokal

### 1. Prasyarat Sistem

- Browser web modern (Google Chrome, Firefox, Safari, Microsoft Edge).
- Python 3 (`python3`) atau Node.js (`npx serve`) untuk menjalankan server HTTP statis lokal.
- Database: **Tidak membutuhkan database** (aplikasi 100% statis *client-side*).

### 2. Environment Variables

Tidak ada environment variable yang diperlukan karena aplikasi berjalan sepenuhnya di sisi browser.

### 3. Instalasi & Menjalankan Server Lokal

```bash
# 1. Clone repository
git clone https://github.com/widifirmaan/javascript-aio-tools.git
cd javascript-aio-tools

# 2. Jalankan static web server lokal
# Opsi A: Menggunakan Python 3
python3 -m http.server 8000

# Opsi B: Menggunakan npx serve (jika terpasang Node.js)
npx serve .
```

Buka [http://localhost:8000](http://localhost:8000) di browser Anda.

### 4. Panduan Uji Manual (Testing Checklist)

| No | Fitur | Langkah Pengujian | Hasil yang Diharapkan |
| :---: | :--- | :--- | :--- |
| 1 | **Dashboard** | Buka `http://localhost:8000` | Seluruh 23 kartu utilitas tampil responsif dengan filter pencarian |
| 2 | **File Encryptor** | Buka `/tools/file-encryptor.html`, pilih file, isi password, klik Enkripsi | File terunduh dalam format `.enc`; masukkan file `.enc` dan password yang sama untuk mendekripsi kembali |
| 3 | **Steganografi** | Buka `/tools/steganography.html`, masukkan gambar dan pesan teks, encode | Teks tersimpan di dalam piksel gambar dan dapat diekstrak kembali pada tab decode |
| 4 | **Regex Visualizer** | Buka `/tools/regex-visualizer.html`, ketik pola `[a-z]+@[a-z]+\.[a-z]{2,}` | Diagram alur lintasan rel SVG ter-render secara dinamis |
| 5 | **Barcode Studio** | Buka `/tools/barcode-studio.html`, masukkan angka `123456789012` dengan format EAN-13 | Gambar barcode 1D terbuat secara akurat dan tombol unduh SVG/PNG aktif |
| 6 | **Password Generator** | Buka `/tools/password-generator.html`, atur panjang karakter ke 24, klik Generate | Password acak aman muncul beserta indikator entropi kuat |

---

## Author

Developed by **[Widi Firmansyah](https://widifirmaan.web.id)**.
