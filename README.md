# 🛠️ DUFL Tools - Lightweight JavaScript AIO Tools

**DUFL Tools** is a comprehensive collection of free, lightweight online tools built for speed and efficiency. By leveraging client-side technology like **WebAssembly** and optimized server-side components in **Docker**, it provides a powerful suite of utilities with minimal infrastructure requirements.

![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?style=for-the-badge&logo=docker)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![PHP](https://img.shields.io/badge/PHP-8.2-8892BF?style=for-the-badge&logo=php)

---

## 📸 Application Showcase

Explore the lightweight tools available in **DUFL Tools**.

| | |
|:---:|:---:|
| ![Preview](assets/img/preview.png)<br>**Main Dashboard** | |

---

## 🚀 Features Overview

### 🖼️ Image & Media Tools
*   **Image Compressor**: Fast and efficient client-side image compression.
*   **Image Converter**: Convert images between various formats (PNG, JPG, WebP, etc.).
*   **Background Remover**: Removes image backgrounds instantly using **Edge AI** (Client-side WebAssembly), requiring **zero server GPU/CPU processing**.

### 📄 Document & Text Tools
*   **PDF to Word Converter**: Converts PDF documents to DOCX using **AbiWord** (Server-side, lightweight alternative to LibreOffice).
*   **Text Editor**: A simple, real-time text editor for quick notes and formatting.

### 🔢 Utilities
*   **Scientific Calculator**: A fully functional web-based scientific calculator.

---

## 🛠 Tech Stack

### Client-Side
*   **Logic**: Vanilla JavaScript (ES6+), WebAssembly (Edge AI).
*   **Styling**: HTML5, CSS3, Bootstrap (Shared assets).
*   **Libraries**: `@imgly/background-removal`.

### Server-Side
*   **Backend**: PHP 8.2 (Apache).
*   **PDF Engine**: **AbiWord** (Extremely lightweight).
*   **Environment**: Docker (Debian-based).

---

## 🐳 Docker Deployment (Recommended)

This project is fully dockerized for instant deployment on any VPS or local machine.

### Prerequisites
*   Docker installed on your system.

### Quick Start

1. **Build the Image**
   ```bash
   docker build -t dufl-tools .
   ```

2. **Run the Container**
   ```bash
   docker run -d -p 8083:80 --name dufl-app dufl-tools
   ```

3. **Access the Application**
   Open `http://localhost:8083` in your browser.

---

## 📂 Project Structure

```bash
/
├── assets/          # Shared CSS, JS, and Vendor libraries
├── tools/           # Individual tool implementations (PHP/HTML)
│   ├── image-compressor.html
│   ├── pdf-word.php
│   ├── remove-bg.php
│   └── ...
├── Dockerfile       # Container configuration
├── index.html       # Entry landing page
└── README.md        # Documentation
```

---

## 🛠 Technical Efficiency

To ensure suitability for low-spec servers:
1. **Edge AI Processing**: Background removal happens in the user's browser, saving ~1.5GB of server image size and massive CPU/GPU resources.
2. **Minimalist Dependencies**: AbiWord (~20MB) replaces LibreOffice (~600MB) for document processing.
3. **Stateless Design**: Uses relative paths for universal hosting without configuration.

---

## 👥 Authors

Developed & Maintained by **Widi Firmansyah**.
