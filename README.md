# DUFL Tools - Lightweight JavaScript AIO Tools

![DUFL Tools Preview](assets/img/preview.png)

A collection of free, lightweight online tools built with HTML, CSS, JavaScript, and PHP. This project is designed to be highly efficient, running primarily on client-side technology to minimize server load, wrapped in an optimized Docker container.

## 🚀 Features

*   **Image Compressor**: Fast and efficient client-side image compression.
*   **PDF to Word Converter**: Converts PDF documents to DOCX using **AbiWord** (Server-side, lightweight alternative to LibreOffice).
*   **Background Remover**: Removes image backgrounds instantly using **Edge AI** (Client-side WebAssembly via `@imgly/background-removal`), requiring **zero server GPU/CPU processing**.
*   **Scientific Calculator**: A fully functional web-based scientific calculator.
*   **Image Converter**: Convert images between various formats easily.
*   **Text Editor**: A simple, real-time text editor.

## 🐳 Docker Deployment (Recommended)

This project has been fully dockerized for easy deployment. It uses a custom `php:8.2-apache` image optimized for size and performance.

### Prerequisites
*   Docker installed on your system.

### Quick Start

1.  **Build the Image**
    ```bash
    docker build -t dufl-tools .
    ```

2.  **Run the Container**
    Run the application on port **8083** (or any port you prefer):
    ```bash
    docker run -d -p 8083:80 --name dufl-app dufl-tools
    ```

3.  **Access the Tools**
    Open your browser and navigate to:
    `http://localhost:8083`

## 🛠 Technical Architecture regarding Efficiency

To ensure the application remains strictly "lightweight" suitable for low-spec VPS/Servers:

1.  **Client-Side AI**: The **Remove Background** tool runs entirely in the user's browser using WebAssembly. No Python, TensorFlow, or PyTorch is installed on the server, saving ~1.5GB of image size and massive CPU resources.
2.  **Lightweight PDF Engine**: Instead of the massive LibreOffice suite (~600MB), we utilize **AbiWord** (~20MB) for command-line PDF conversion.
3.  **Universal Host**: The application uses relative paths, making it capable of running on any domain, IP, or subpath without configuration changes.

## 📁 Project Structure

```
/
├── assets/          # Shared CSS, JS, and Vendor libraries (Bootstrap, etc.)
├── tools/           # Individual tool pages (PHP/HTML)
│   ├── image-compressor.html
│   ├── pdf-word.php
│   ├── remove-bg.php
│   └── ...
├── Dockerfile       # Docker configuration
├── index.html       # Landing page
└── README.md        # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 Credits

Designed & Developed by **Widi Firmansyah**.
