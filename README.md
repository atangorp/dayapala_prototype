# Dayapala Prototype

Dayapala adalah platform ekosistem rantai pasok pangan yang menghubungkan petani, koperasi, dan vendor (pembeli) dengan dukungan AI Matching dan Alternative Credit Scoring.

## 🚀 Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan prototype di komputer lokal Anda:

1.  **Instalasi Dependensi**
    Pastikan Anda sudah menginstal Node.js. Buka terminal di direktori project ini dan jalankan:
    ```bash
    npm install
    ```

2.  **Menjalankan Server Development**
    Setelah instalasi selesai, jalankan perintah berikut:
    ```bash
    npm run dev
    ```

3.  **Akses Aplikasi**
    Buka browser dan akses alamat yang tertera di terminal (biasanya `http://localhost:5173`).

---

## 🔑 Akun Dummy (Login)

Gunakan akun berikut untuk mencoba berbagai peran di dalam sistem Dayapala:

### 1. Akun Koperasi
*   **Username:** `koperasi-unesa`
*   **Password:** `password`
*   **Peran:** Mengelola dashboard, validasi pasokan, matching supply-demand, dan scoring.

### 2. Akun Petani
*   **Username:** `petani-magetan`
*   **Password:** `password`
*   **Peran:** Input data panen, melihat riwayat pasokan, dan mengecek skor kredit.

### 3. Akun Vendor (Pembeli)
*   **Username:** `sppg-maospati`
*   **Password:** `password`
*   **Peran:** Mengajukan permintaan pasokan (demand) dan melihat kandidat penyuplai.

---

## 🛠️ Teknologi yang Digunakan
*   **Frontend:** React + TypeScript + Vite
*   **Styling:** Tailwind CSS + Framer Motion
*   **Backend (Optional):** Terintegrasi dengan Azure Functions (jika .env dikonfigurasi)
