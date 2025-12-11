# 🤖 SmartEd Bot (TF-IDF Chatbot)

SmartEd Bot adalah chatbot tanya-jawab cerdas yang ditenagai oleh algoritma **TF-IDF (Term Frequency-Inverse Document Frequency)**. Chatbot ini dirancang untuk memberikan jawaban yang relevan berdasarkan dataset pengetahuan yang dimiliki, dibangun dengan teknologi web modern menggunakan **Next.js** untuk Frontend dan **NestJS** untuk Backend.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Fitur Utama

- **Algoritma TF-IDF**: Menghitung tingkat relevansi antara pertanyaan pengguna dan database pengetahuan secara akurat.
- **Antarmuka Chat Real-time**: Pengalaman pengguna yang mulus dengan fitur *auto-scroll* dan indikator mengetik (*typing indicator*).
- **UI Modern & Estetik**: Dibangun menggunakan **Tailwind CSS v4**, menampilkan desain *Glassmorphism* (efek kaca), gradasi linear, dan responsif di semua device.
- **Arsitektur Dual-Port**: Frontend berjalan di port `3000` dan Backend berjalan terpisah di port `3001` untuk performa maksimal.
- **Animasi Interaktif**: Dilengkapi dengan animasi *bouncing dots* saat bot sedang memproses jawaban.

## 🛠️ Teknologi yang Digunakan

### Frontend (Tampilan)
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Bahasa**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Fitur**: React Hooks, Glassmorphism UI

### Backend (Server & Logika)
- **Framework**: [NestJS](https://nestjs.com/)
- **Bahasa**: TypeScript
- **Logika**: TF-IDF / Cosine Similarity
- **Library NLP**: Natural

---

## 🚀 Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal.

### Prasyarat
- Node.js (versi 18 atau lebih baru)
- npm

### 1. Clone Repository
```bash
git clone [https://github.com/username/smarted-bot.git](https://github.com/username/smarted-bot.git)
cd smarted-bot
