# StockAI

StockAI adalah aplikasi berbasis web yang dapat memprediksi harga saham Indonesia (khususnya harga *closing*) pada rentang tanggal tertentu.  
Aplikasi ini menggunakan model **Chronos** yang sudah di-*fine-tune* dengan dataset dari Kaggle, lalu hasil prediksi ditampilkan dalam bentuk plot interaktif pada website.

---

## 📂 Struktur Proyek
```
StockAI/
│── frontend StockAI/   # Sisi interface / UI berbasis React
│── backend StockAI/    # AI modeling & API berbasis FastAPI
│── .gitattributes      # Tells GitHub which file is consider large   
│── README.md           # Dokumentasi utama
```

---

## 🚀 Fitur Utama
- Prediksi harga *closing* saham Indonesia dengan rentang tanggal tertentu
- Visualisasi hasil prediksi dalam bentuk grafik
- Backend dengan FastAPI untuk menyediakan API prediksi
- Frontend dengan React (digenerasi Lovable lalu dimodifikasi)

---

## ⚙️ Teknologi yang Digunakan
- **Frontend**: React, Tailwind, Recharts, ShadCN/UI  
- **Backend**: FastAPI, Pandas, AutoGluon, Chronos  
- **Model**: Chronos (fine-tuned dengan dataset Kaggle)  
- **Bahasa**: Python, JavaScript  

---

## 📦 Cara Menjalankan Proyek

### 1. Clone Repository
```bash
git clone https://github.com/username/StockAI.git
cd StockAI
```

### 2. Jalankan Backend
Ikuti petunjuk di [`backend StockAI/README.md`](./backend%20StockAI/README.md)

### 3. Jalankan Frontend
Ikuti petunjuk di [`frontend StockAI/README.md`](./frontend%20StockAI/README.md)

---

## 📊 Demo
- User dapat memilih kode saham + rentang tanggal
- Sistem memproses data → menghasilkan prediksi harga *closing*
- Hasil ditampilkan dalam bentuk grafik interaktif di UI

---

## ✨ Kontribusi
Pull request terbuka untuk perbaikan bug, peningkatan UI/UX, atau optimasi model.  
Silakan buat *issue* terlebih dahulu untuk diskusi ide.

---

## 📜 Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).
