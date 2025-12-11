# VALEMIS - RESTRUCTURING SUMMARY

## Status Update: December 11, 2025

### ✅ Completed Changes

#### 1. Router Restructuring (`src/router/index.ts`)
**Status: COMPLETED**

Telah berhasil merestrukturisasi router dengan 6 menu utama sesuai requirement:

**Struktur Menu Baru:**
1. **Asset Inventory & LARAP** → `/asset-inventory-larap/*`
   - Sub-menu: Asset Inventory (`/asset-inventory-larap/asset-inventory`)
   - Sub-menu: LARAP (`/asset-inventory-larap/larap`)

2. **Land Acquisition/Compensation** → `/land-acquisition`
   - ERP sederhana pembebasan lahan
   - Detail per parcel
   - Tambah pemilik lahan

3. **Land Inventory** → `/land-inventory`
   - Pendataan Geospatial Lahan bebas
   - Sub-route: `/land-inventory/geospatial`

4. **Land Compliance** → `/land-compliance`
   - Pengecekan kepatuhan Ijin dan Perencanaan
   - Sub-route: `/land-compliance/pengecekan-izin`

5. **Land Litigasi/Claim** → `/land-litigasi`
   - ERP proses Penyelesian Land Dispute
   - Claim management

6. **Stakeholder Management** → `/stakeholder-management/*`
   - Sub-menu: Basic Management (`/stakeholder-management/basic`)
   - Sub-menu: Advanced Analytics (`/stakeholder-management/advanced`)

**Legacy Routes:**
- Semua route lama tetap berfungsi dengan redirect otomatis untuk backward compatibility

---

#### 2. Sidebar Navigation (`src/components/layout/AppSidebar.vue`)
**Status: COMPLETED**

Sidebar telah diupdate dengan:
- 6 menu utama dengan icon yang sesuai
- Sub-menu untuk Asset Inventory & LARAP
- Sub-menu untuk Stakeholder Management
- Active state management yang tepat
- Header "MAIN MODULES" untuk grouping

---

#### 3. Dashboard with Interactive Map (`src/views/Dashboard.vue`)
**Status: COMPLETED (Ada masalah duplikasi - PERLU FIX)**

Dashboard baru menampilkan:

**Features:**
- Statistics cards: Total Area, Desa Terdampak, Active Projects, Progress Akuisisi
- **Interactive Map** dengan visualisasi:
  - Kotak merah besar (dashed) = Total Lahan Vale
  - Kotak merah kecil (solid) = Desa A, B, C, D (terdampak project)
  - Kotak ungu = Project Alpha & Beta
  - Titik hitam = Rumah/bangunan di tiap desa
  
**Interaktivity:**
- Klik desa → Detail desa dengan jumlah rumah, status akuisisi
- Klik project → Detail project dengan budget, progress, dll
- Klik titik rumah → Detail kepemilikan, NIK, luas, status negosiasi

**Legend:**
- Visual legend di pojok kiri bawah untuk guide user

**Detail Panel:**
- Muncul saat user klik area
- Menampilkan tabel info lengkap
- Context-sensitive alerts berdasarkan tipe selection

**Quick Stats:**
- 4 info boxes: Asset Inventory, Land Bebas, Dalam Negosiasi, Litigasi

**⚠️ ISSUE:** File Dashboard.vue terdapat duplikasi konten (1066 lines, seharusnya ~450 lines)
**ACTION NEEDED:** Perlu di-cleanup manual untuk remove duplicate content

---

### 📋 Remaining Tasks

#### 4. Asset Inventory View Update
**Status: NOT STARTED**

Requirements:
- Display data per desa
- Show titik-titik rumah dalam desa
- Asset Inventory sebagai data source untuk LARAP
- Integration dengan map view

#### 5. Land Acquisition View Update
**Status: NOT STARTED**

Requirements:
- Display per parcel (hanya lahan terdampak project)
- **Filter per project** → User bisa filter by project name
- **Status negosiasi per folder/project**
- **Kolom input:**
  - Jumlah bebas
  - Jumlah biaya
- Setelah bebas, clear negosiasi
- Integration dengan Asset Inventory data

#### 6. Land Inventory View Update
**Status: NOT STARTED**

Requirements:
- Display semua lahan milik Vale
- Include lahan yang sudah diakuisisi (sudah bebas)
- Berbasis geodata
- Map-based display
- Status: punya pengelola atau belum bertuan

#### 7. Stakeholder Management View Update
**Status: NOT STARTED**

Requirements:
- **Pindahkan diagram ke bawah** (currently di atas)
- **Improve dengan Kepler.gl** untuk koneksi 2 titik (relationship visualization)
- **Tambahkan kuadran:**
  - Active/Passive
  - Support/Against (atau similar quadrant)
- **Dokumen dijadikan satu ke network** (document attachment system)

---

## Technical Notes

### File Changes Made:
1. `/src/router/index.ts` - Restructured
2. `/src/components/layout/AppSidebar.vue` - Updated
3. `/src/views/Dashboard.vue` - New interactive map (NEEDS FIX)

### Dependencies to Consider:
- Leaflet or OpenLayers untuk real map implementation (currently using SVG demo)
- Kepler.gl untuk Stakeholder visualization
- DataTables atau AG-Grid untuk table views
- Chart.js sudah installed (for future analytics)

### Data Flow Architecture:

```
Asset Inventory (Per Desa)
    ↓
    ├─→ LARAP (Document generation from Asset data)
    ├─→ Land Acquisition (Project-specific parcels)
    └─→ Land Inventory (All Vale land including acquired)

Stakeholder Database
    ↓
    ├─→ Relationship dengan geodata lahan
    ├─→ Influence mapping (Kepler.gl)
    └─→ Document network

Land Acquisition
    ↓
    ├─→ Status: Negosiasi/Bebas
    ├─→ Per Project filtering
    └─→ Integration to Dashboard stats
```

---

## Next Steps Recommendation:

### Priority 1: Fix Dashboard.vue
- Remove duplicate content
- Ensure proper compilation
- Test interactivity

### Priority 2: Land Acquisition Module
- Most critical for operational workflow
- Filter per project
- Status tracking system
- Input forms for "jumlah bebas" dan "biaya"

### Priority 3: Asset Inventory Integration
- Data source untuk LARAP
- Per desa breakdown
- House points tracking

### Priority 4: Stakeholder Management Redesign
- Kepler.gl integration
- Quadrant system
- Network visualization

### Priority 5: Land Inventory & Compliance
- Complete the remaining modules

---

## Notes dari Requirements:

### LARAP & Asset Inventory:
> "LARAP adalah dokumennya, basic akuisisi lahan, diganti jadi asset inventory. Data di asset inventory adalah sumber untuk membuat dokumen LARAP, basicnya asset inventory berisi pertanyaan-pertanyaan."

### Land Acquisition vs Asset Inventory:
> "Asset Inventory: semua lahan tp per desa, jadi kepotong potong, di dalamnya ada titik" rumah"
> "Land acquisition: lahan yang dibutuhin untuk project aja, per pencil"

### Luas Lahan:
> "Luas lahan di asset inventory based on dokumen (sertifikat), kl di land akuisision, yang terdampak saja, misal 1/3 dari luas yang di asset inventory"

### Status & Progress:
> "Dapet luasan fix dari pengukuran ulang status negosiasi per folder (project)"
> "Pertahankan yang sekarang per desa, tambahkan filter untuk per project"
> "Setelah bebas, clear negosiasinya, ada kolom untuk input jumlah bebas dan jumlah biaya"

### Dashboard Map:
> "Merah besar adalah seluruh lahan vale, kotak" merah kecil adalah desa" A,B,C,D yang terdampat oleh project, project yang berwarna ungu."
> "Setiap desa, titik" yang terdampak project bisa di klik dan muncul information detail"

---

**Document Created:** December 11, 2025
**Last Updated:** December 11, 2025
**Status:** Work In Progress
