# Valemis ERP System - Dokumentasi Modul

## 📋 Overview

Sistem ERP ini dirancang untuk mengelola seluruh proses land management di IUPK Vale, mencakup akuisisi lahan, compliance, inventarisasi, dan stakeholder management.

## 🏗️ Struktur Modul Utama

### 1. **LARAP (Land Acquisition and Resettlement Action Plan)**
**Path:** `/larap`

Modul untuk mengelola proses akuisisi lahan dan rencana pemukiman kembali.

**Fitur:**
- Database lahan yang akan diakuisisi
- Manajemen dokumen negosiasi persil
- Tracking status negosiasi real-time
- Rencana pemukiman kembali (resettlement)
- Timeline progress akuisisi

**Tab/Section:**
- Database Lahan
- Dokumen Negosiasi
- Status Tracking
- Rencana Pemukiman

---

### 2. **Pembebasan Lahan**
**Path:** `/pembebasan-lahan`

Modul untuk proses pembebasan lahan (existing module - enhanced).

**Fitur:**
- Database lahan ukur ulang terbaru
- Database pemilik lahan
- GB data yang sudah bebas
- Input rencana project

---

### 3. **Pendataan Geospatial Lahan Bebas**
**Path:** `/pendataan-geospatial`

Modul khusus untuk visualisasi dan pendataan geospatial dengan interactive map.

**Fitur:**
- Interactive Map dengan layer control
- Visualisasi status lahan (Bebas/Negosiasi/Belum Proses)
- Filter berdasarkan status dan lokasi
- Data table dengan koordinat
- Progress tracking per lokasi
- Timeline activities
- Export to Excel

**Legend:**
- 🟢 Hijau = Lahan Bebas
- 🟡 Kuning = Dalam Negosiasi
- 🔴 Merah = Belum Masuk Proses

---

### 4. **Land Compliance**
**Path:** `/land-compliance`

Modul untuk memastikan kesesuaian lahan dengan regulasi dan dokumen.

**Fitur:**
- Validasi kesesuaian dokumen lahan
- Database regulasi (UU, Permen, dll)
- Status perizinan (IUP, Izin Lingkungan, IPPKH)
- Compliance tracking timeline
- Dashboard compliance rate

**Tab/Section:**
- Kesesuaian Dokumen
- Validasi Regulasi
- Status Izin
- Compliance Tracking

---

### 5. **Litigasi/Claim Lahan**
**Path:** `/litigasi`

Modul untuk mengelola sengketa dan claim lahan (existing module).

**Fitur:**
- Data organisasi/individu yang meng-claim
- Data pengukuran claim (spasial)
- Proses penyelesaian dengan BA mediasi
- Geodata status lahan
- Dashboard analisa spatial

---

### 6. **Stakeholder Management**
**Path:** `/stake-holder`

Modul untuk mengelola stakeholder dan validasi prasangka (existing module - enhanced).

**Fitur:**
- Database stakeholder lengkap
- Input manual data stakeholder
- Validasi dan verifikasi
- Relasi stakeholder dengan lahan

---

### 7. **Asset Inventory**
**Path:** `/aset-inventori`

Modul untuk inventarisasi aset di area IUPK Vale (existing module).

**Fitur:**
- Database pertanyaan dari bang Pardi
- Data lengkap semua aset
- Data lahan dan pemilik (keluarga, kegiatan, pegawai)
- Tracking aset

---

### 8. **Land Inventory**
**Path:** `/land-inventory`

Modul komprehensif untuk inventarisasi dan visualisasi data spasial.

**Fitur:**
- GB dan visual map
- GB data spasial Vale (PPKH, IUPK, Peta Tematik)
- Koleksi peta: Kawasan Hutan, Topografi, LULC, dll
- Data project dengan progress tracking
- Integrasi dengan land acquisition dari LARAP
- Dashboard analisis overlay
- Layer control untuk multiple data layers

**Tab/Section:**
- Data Spasial Vale
- Peta Tematik
- Data Project
- Land Acquisition
- Dashboard Overlay

---

## 🧩 Shared Components

### MapViewer.vue
**Location:** `src/components/MapViewer.vue`

Component reusable untuk menampilkan peta interaktif.

**Props:**
- `height` - Tinggi peta
- `title` - Judul peta
- `description` - Deskripsi
- `showControls` - Tampilkan kontrol zoom
- `showLocationControl` - Tampilkan tombol lokasi
- `showLegend` - Tampilkan legend
- `legendItems` - Array data legend
- `center` - Koordinat center [lat, lng]
- `zoom` - Level zoom awal

**Usage:**
```vue
<MapViewer
  height="500px"
  title="Peta Lahan"
  :show-legend="true"
  :legend-items="[
    { id: 1, label: 'Lahan Bebas', color: '#28a745' },
    { id: 2, label: 'Negosiasi', color: '#ffc107' }
  ]"
  @ready="onMapReady"
/>
```

---

### DashboardAnalytics.vue
**Location:** `src/components/DashboardAnalytics.vue`

Component untuk menampilkan analytics dashboard di setiap modul.

**Props:**
- `showStats` - Tampilkan kartu statistik
- `stats` - Array data statistik
- `showCharts` - Tampilkan grafik
- `showProgress` - Tampilkan progress bars
- `progressData` - Array data progress
- `showSummary` - Tampilkan summary
- `showTimeline` - Tampilkan timeline aktivitas

**Usage:**
```vue
<DashboardAnalytics
  :show-stats="true"
  :stats="statsData"
  :show-progress="true"
  :progress-data="progressData"
  :show-timeline="true"
  :timeline-data="timelineData"
/>
```

---

## 🗂️ Struktur File

```
src/
├── views/
│   ├── Dashboard.vue                          # Main dashboard
│   ├── LARAP.vue                               # ✨ NEW: LARAP module
│   ├── PembebasanLahan.vue                     # Pembebasan Lahan module
│   ├── PendataanGeospatialLahanBebas.vue      # ✨ NEW: Geospatial module
│   ├── LandCompliance.vue                      # ✨ NEW: Compliance module
│   ├── Litigasi.vue                            # Litigasi module
│   ├── ClaimLitigasi.vue                       # Detail claim
│   ├── StakeHolder.vue                         # Stakeholder module
│   ├── AsetInventori.vue                       # Asset inventory
│   ├── LandInventory.vue                       # ✨ NEW: Land inventory
│   └── ...
├── components/
│   ├── MapViewer.vue                           # ✨ NEW: Shared map component
│   ├── DashboardAnalytics.vue                  # ✨ NEW: Analytics component
│   └── layout/
│       ├── AppHeader.vue
│       ├── AppSidebar.vue                      # ✨ UPDATED: New navigation
│       └── AppFooter.vue
└── router/
    └── index.ts                                 # ✨ UPDATED: New routes
```

---

## 🚀 Route Mapping

| Module | Path | Component |
|--------|------|-----------|
| Dashboard | `/` | Dashboard.vue |
| LARAP | `/larap` | LARAP.vue |
| Pembebasan Lahan | `/pembebasan-lahan` | PembebasanLahan.vue |
| Geospatial Lahan Bebas | `/pendataan-geospatial` | PendataanGeospatialLahanBebas.vue |
| Land Compliance | `/land-compliance` | LandCompliance.vue |
| Litigasi | `/litigasi` | Litigasi.vue |
| Stakeholder | `/stake-holder` | StakeHolder.vue |
| Asset Inventory | `/aset-inventori` | AsetInventori.vue |
| Land Inventory | `/land-inventory` | LandInventory.vue |

---

## 📊 Data Flow & Integration

### 1. LARAP ↔ Land Inventory
- Data lahan akuisisi dari LARAP masuk ke Land Inventory
- Land Inventory menyediakan GB data untuk LARAP

### 2. Pembebasan Lahan ↔ Geospatial
- Data lahan bebas di-visualisasi di Geospatial module
- Status update dari Pembebasan Lahan reflect di map

### 3. Land Compliance ↔ Land Inventory
- Validasi compliance menggunakan data dari Land Inventory
- Status compliance di-track untuk setiap lahan

### 4. Stakeholder ↔ All Modules
- Data stakeholder digunakan di semua modul yang melibatkan pemilik lahan
- Relasi stakeholder dengan lahan, claim, dan negosiasi

---

## 🎨 UI/UX Features

### Color Coding
- 🟢 **Hijau (Success)**: Selesai, Bebas, Compliant, Aktif
- 🟡 **Kuning (Warning)**: Negosiasi, Review, Pending
- 🔴 **Merah (Danger)**: Belum Dimulai, Non-Compliant, Expired
- 🔵 **Biru (Info)**: Informasi, Data, Progress

### Interactive Elements
- Tabs untuk navigasi antar section dalam modul
- Sortable & filterable tables
- Search functionality
- Interactive maps dengan zoom & pan
- Layer control untuk toggle visibility
- Timeline untuk tracking aktivitas
- Progress bars untuk visual progress

---

## 🔧 Next Steps - Integration

### 1. Map Library Integration
Pilih dan integrasikan salah satu:
- **Leaflet** (Recommended) - Lightweight, banyak plugin
- **OpenLayers** - Feature-rich, kompleks
- **Mapbox GL JS** - Modern, butuh API key

```bash
npm install leaflet
npm install @types/leaflet -D
```

### 2. Chart Library
Untuk analytics dashboard:
```bash
npm install chart.js vue-chartjs
# atau
npm install echarts vue-echarts
```

### 3. Backend Integration
- Setup API endpoints untuk setiap modul
- Implement authentication & authorization
- Setup state management (Pinia/Vuex)
- Add loading states dan error handling

### 4. Database Schema
Design database tables untuk:
- `larap_lahan` - Data LARAP
- `land_inventory` - Inventarisasi lahan
- `compliance_records` - Record compliance
- `geospatial_data` - Data koordinat
- Relasi antar tables

---

## 📝 Development Guidelines

### Adding New Features
1. Create feature branch
2. Update relevant view/component
3. Add route if needed
4. Update sidebar navigation
5. Test integration dengan modul lain
6. Commit dengan descriptive message

### Code Standards
- Use TypeScript untuk type safety
- Follow Vue 3 Composition API
- Reuse shared components
- Keep components focused dan modular
- Add proper comments untuk logika kompleks

---

## 🐛 Troubleshooting

### Map tidak muncul
- Pastikan map library sudah terinstall
- Check console untuk error
- Verify koordinat center valid

### Route tidak berfungsi
- Check router configuration di `src/router/index.ts`
- Verify component import path
- Restart dev server

### Component tidak ter-import
- Verify file path
- Check export/import syntax
- Clear cache dan rebuild

---

## 📞 Support

Untuk pertanyaan atau issue, silakan contact development team.

---

**Last Updated:** December 2024
**Version:** 2.0.0
