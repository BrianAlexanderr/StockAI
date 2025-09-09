# StockAI - Frontend

Bagian frontend dari aplikasi **StockAI**.  
Frontend dibangun menggunakan **React** (digenerasi dengan Lovable lalu dimodifikasi) untuk menampilkan antarmuka web interaktif.

---

## 🚀 Fitur
- Input kode saham dan rentang tanggal
- Menampilkan hasil prediksi harga saham dalam bentuk grafik
- UI modern dengan TailwindCSS & ShadCN/UI
- Integrasi API dengan backend FastAPI

---

## ⚙️ Teknologi
- React
- TailwindCSS
- ShadCN/UI
- Recharts (untuk grafik interaktif)
- Axios (untuk komunikasi API)

---

## 📦 Instalasi & Menjalankan
```bash
# Pindah ke folder frontend
cd "frontend StockAI"

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173` (atau sesuai konfigurasi Vite).

---

## 📊 Preview UI
- Input form untuk kode saham + tanggal
- Grafik prediksi harga saham
- Responsive design

---

## 🛠️ Struktur Folder
```
frontend StockAI/
│── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Halaman utama
│   ├── services/      # API call ke backend
│   └── App.jsx        # Entry utama
│── package.json
│── README.md
```
