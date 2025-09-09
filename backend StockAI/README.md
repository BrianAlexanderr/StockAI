# StockAI - Backend

Bagian backend dari aplikasi **StockAI**.  
Backend dibangun dengan **FastAPI** untuk mengelola prediksi saham menggunakan model **Chronos** yang sudah di-*fine-tune* dengan dataset dari Kaggle.

---

## 🚀 Fitur
- Endpoint untuk memprediksi harga saham berdasarkan:
  - Kode saham
  - Rentang tanggal tertentu
- Penyimpanan hasil prediksi ke file CSV
- Penyajian data prediksi untuk frontend dalam format JSON

---

## ⚙️ Teknologi
- Python 3.10+
- FastAPI
- Pandas
- AutoGluon (Chronos)
- Uvicorn

---

## 📦 Instalasi & Menjalankan

### 1. Buat Virtual Environment
```bash
conda create -n stockai python=3.10
conda activate stockai
```

### 2. Install Dependencies
```bash
cd "backend StockAI"
pip install -r requirements.txt
```

### 3. Jalankan Server
```bash
uvicorn main:app --reload
```

Backend akan berjalan di `http://127.0.0.1:8000`

---

## 📡 Endpoint Utama

###  Display All Stocks
```http
GET /stocks
```

Body (contoh):
```json
{
  {
    "Kode": "AALI",
    "Nama Perusahaan": "Astra Agro Lestari Tbk."
  },
  {
    "Kode": "ABBA",
    "Nama Perusahaan": "Mahaka Media Tbk."
  }
}
```

### 🔹 Forecast
```http
POST /forecast
```

Body (contoh):
```json
{
  "stock": "BBCA",
  "startDate": "2023-01-01",
  "endDate": "2023-02-01"
}
```

Response (contoh):
```json
{
  "stock": "BBCA",
  "predictions": [
    {"timestamp": "2023-01-01", "mean": 8500.12},
    {"timestamp": "2023-01-02", "mean": 8512.45},
    {"timestamp": "2023-01-03", "mean": 8499.80}
  ]
}
```

---

## 📊 Struktur Folder
```
backend StockAI/
backend StockAI/
├── pycache/ # Compiled Python cache
├── modeling StockAI/ # Modeling and data science files
│ ├── AutogluonModels/ # AutoGluon trained models
│ │ └── ag-20250909_085908/ # Example training run folder
│ ├── dataset/ # Raw and processed datasets
│ └── forecast_result/ # Forecasting output results
│ ├──  daftar_saham.csv # Stock list CSV
│ ├── stocks_with_names.csv # Stock names with metadata
│ ├── test.ipynb # Testing notebook
│ ├── training_models.ipynb # Model training notebook
├── .gitattributes # Git LFS tracking configuration
├── README.md # Project documentation
├── main.py # FastAPI backend entry point
├── requirements.txt # Python dependencies
└── stocks_with_names.csv # Duplicate stock names CSV
```

---

## 🛠️ Workflow Prediksi
1. User mengirim request → kode saham + rentang tanggal
2. Backend memproses data dengan model Chronos
3. Hasil prediksi disimpan ke CSV & dikirim ke frontend
