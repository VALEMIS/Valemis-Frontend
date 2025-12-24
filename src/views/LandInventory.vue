<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Land Inventory</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="bi bi-house-fill"></i></router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Land Inventory</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <div class="row mb-3">
          <div class="col-lg-3 col-md-6">
            <div class="card bg-primary text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0">{{ totalStats.total.toLocaleString() }}</h3>
                    <small>Total Lahan (Ha)</small>
                  </div>
                  <i class="bi bi-map" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card bg-success text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0">{{ totalStats.milikVale.toLocaleString() }}</h3>
                    <small>Milik Vale (Ha)</small>
                  </div>
                  <i class="bi bi-check-circle" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card bg-warning text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0">{{ totalStats.acquired.toLocaleString() }}</h3>
                    <small>Acquired (Ha)</small>
                  </div>
                  <i class="bi bi-arrow-down-circle" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card bg-info text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0">{{ totalStats.parcels }}</h3>
                    <small>Total Parcel</small>
                  </div>
                  <i class="bi bi-grid-3x3" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <label class="form-label"><strong><i class="bi bi-funnel"></i> Filter Kategori</strong></label>
                <select v-model="selectedCategory" class="form-select">
                  <option value="all">Semua Kategori</option>
                  <option value="Vale Owned">Milik Vale</option>
                  <option value="Acquired">Acquired/Diakuisisi</option>
                  <option value="IUPK">IUPK</option>
                  <option value="PPKH">PPKH</option>
                  <option value="Operational">Operasional</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <label class="form-label"><strong><i class="bi bi-filter"></i> Status Sertifikat</strong></label>
                <select v-model="selectedCertificate" class="form-select">
                  <option value="all">Semua Status</option>
                  <option value="SHM">SHM</option>
                  <option value="SHGB">SHGB</option>
                  <option value="HGU">HGU</option>
                  <option value="Belum Sertifikat">Belum Sertifikat</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card bg-light">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="mb-0">{{ filteredLands.length }} Parcel Ditampilkan</h5>
                    <small class="text-muted">Total luas: {{ filteredTotalArea.toLocaleString() }} Ha</small>
                  </div>
                  <button class="btn btn-primary" @click="toggleView">
                    <i class="bi" :class="showMap ? 'bi-table' : 'bi-map'"></i>
                    {{ showMap ? 'Lihat Tabel' : 'Lihat Peta' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="showMap" class="row mb-3">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-map"></i> Peta Land Inventory</h3>
              </div>
              <div class="card-body">
                <div id="land-map" ref="landMapContainer" style="height: 600px; border-radius: 8px;"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-table"></i> Data Land Inventory</h3>
                <div class="card-tools">
                  <button class="btn btn-sm btn-primary me-2" @click="addLand">
                    <i class="bi bi-plus-circle"></i> Tambah Lahan
                  </button>
                  <button class="btn btn-sm btn-success" @click="exportData">
                    <i class="bi bi-file-earmark-excel"></i> Export Excel
                  </button>
                </div>
              </div>
              <div class="card-body table-responsive">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode Lahan</th>
                      <th>Nama Lokasi</th>
                      <th>Kategori</th>
                      <th>Luas (Ha)</th>
                      <th>Status Sertifikat</th>
                      <th>No. Sertifikat</th>
                      <th>Koordinat</th>
                      <th>Tahun Akuisisi</th>
                      <th>Dokumen</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(land, index) in filteredLands" :key="land.id">
                      <td>{{ index + 1 }}</td>
                      <td><span class="badge bg-primary">{{ land.code }}</span></td>
                      <td><strong>{{ land.locationName }}</strong></td>
                      <td><span class="badge" :class="getCategoryClass(land.category)">{{ land.category }}</span></td>
                      <td class="text-end">{{ land.area.toLocaleString() }}</td>
                      <td><span class="badge" :class="getCertificateClass(land.certificate)">{{ land.certificate }}</span></td>
                      <td><small>{{ land.certificateNo || '-' }}</small></td>
                      <td><small class="text-muted">{{ land.coordinates }}</small></td>
                      <td class="text-center">{{ land.acquisitionYear || '-' }}</td>
                      <td>
                        <button 
                          v-if="land.documents.length > 0" 
                          class="btn btn-sm btn-outline-secondary"
                          @click="viewDocuments(land)"
                          title="Lihat Dokumen"
                        >
                          <i class="bi bi-file-earmark-text"></i> {{ land.documents.length }} file
                        </button>
                        <small v-else class="text-muted">-</small>
                      </td>
                      <td class="text-center" style="white-space: nowrap;">
                        <div class="btn-group" role="group">
                          <button class="btn btn-sm btn-info" @click="viewOnMap(land)" title="Lihat di Peta">
                            <i class="bi bi-geo-alt-fill"></i>
                          </button>
                          <button class="btn btn-sm btn-warning" @click="editLand(land)" title="Edit">
                            <i class="bi bi-pencil-square"></i>
                          </button>
                          <button class="btn btn-sm btn-danger" @click="deleteLand(land)" title="Hapus">
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot v-if="filteredLands.length > 0">
                    <tr class="table-secondary">
                      <td colspan="4" class="text-end"><strong>Total:</strong></td>
                      <td class="text-end"><strong>{{ filteredTotalArea.toLocaleString() }} Ha</strong></td>
                      <td colspan="6"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-pie-chart"></i> Breakdown per Kategori</h3>
              </div>
              <div class="card-body">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Kategori</th>
                      <th class="text-end">Jumlah Parcel</th>
                      <th class="text-end">Total Luas (Ha)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cat in categoryBreakdown" :key="cat.name">
                      <td><span class="badge" :class="getCategoryClass(cat.name)">{{ cat.name }}</span></td>
                      <td class="text-end">{{ cat.count }}</td>
                      <td class="text-end"><strong>{{ cat.totalArea.toLocaleString() }}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-bar-chart"></i> Status Sertifikat</h3>
              </div>
              <div class="card-body">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th class="text-end">Jumlah Parcel</th>
                      <th class="text-end">Total Luas (Ha)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cert in certificateBreakdown" :key="cert.name">
                      <td><span class="badge" :class="getCertificateClass(cert.name)">{{ cert.name }}</span></td>
                      <td class="text-end">{{ cert.count }}</td>
                      <td class="text-end"><strong>{{ cert.totalArea.toLocaleString() }}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="landModal" tabindex="-1" ref="landModalRef">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditMode ? 'Edit Lahan' : 'Tambah Lahan Baru' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveLand">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Kode Lahan</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.code" 
                    placeholder="Contoh: LND-VALE-001"
                    :disabled="isEditMode"
                    required 
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Nama Lokasi</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.locationName" 
                    placeholder="Nama lokasi lahan"
                    required 
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Kategori</strong> <span class="text-danger">*</span></label>
                  <select class="form-select" v-model="formData.category" required>
                    <option value="">Pilih Kategori</option>
                    <option value="Vale Owned">Milik Vale</option>
                    <option value="Acquired">Acquired/Diakuisisi</option>
                    <option value="IUPK">IUPK</option>
                    <option value="PPKH">PPKH</option>
                    <option value="Operational">Operasional</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Luas (Ha)</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model.number="formData.area" 
                    placeholder="Contoh: 125.5"
                    step="0.01"
                    min="0.01"
                    required 
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Status Sertifikat</strong> <span class="text-danger">*</span></label>
                  <select class="form-select" v-model="formData.certificate" required>
                    <option value="">Pilih Status</option>
                    <option value="SHM">SHM (Sertifikat Hak Milik)</option>
                    <option value="SHGB">SHGB (Hak Guna Bangunan)</option>
                    <option value="HGU">HGU (Hak Guna Usaha)</option>
                    <option value="Belum Sertifikat">Belum Sertifikat</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>No. Sertifikat</strong></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.certificateNo" 
                    placeholder="Nomor sertifikat"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-4 mb-3">
                  <label class="form-label"><strong>Latitude</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.lat" 
                    placeholder="-2.5650"
                    required 
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label"><strong>Longitude</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.lng" 
                    placeholder="121.3450"
                    required 
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label"><strong>Tahun Akuisisi</strong></label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model.number="formData.acquisitionYear" 
                    placeholder="2024"
                    min="1900"
                    :max="new Date().getFullYear()"
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label"><strong><i class="bi bi-file-earmark-text"></i> Dokumen Lahan</strong></label>
                <div class="input-group mb-2">
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="newDocument" 
                    placeholder="Nama file dokumen (contoh: SHM-001-2020.pdf)"
                    @keyup.enter="addDocument"
                  />
                  <button 
                    type="button" 
                    class="btn btn-outline-primary" 
                    @click="addDocument"
                  >
                    <i class="bi bi-plus-circle"></i> Tambah
                  </button>
                </div>
                <div v-if="formData.documents.length > 0" class="border rounded p-2">
                  <small class="text-muted d-block mb-2">Daftar Dokumen:</small>
                  <div class="d-flex flex-wrap gap-1">
                    <span 
                      v-for="(doc, idx) in formData.documents" 
                      :key="idx"
                      class="badge bg-secondary d-inline-flex align-items-center"
                    >
                      <i class="bi bi-file-earmark-text me-1"></i>
                      {{ doc }}
                      <button 
                        type="button" 
                        class="btn-close btn-close-white ms-2" 
                        style="font-size: 0.7rem;"
                        @click="removeDocument(idx)"
                      ></button>
                    </span>
                  </div>
                </div>
                <small class="text-muted">Tekan Enter atau klik Tambah untuk menambahkan dokumen</small>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  <i class="bi bi-x-circle"></i> Batal
                </button>
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-save"></i> {{ isEditMode ? 'Update' : 'Simpan' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' 
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
interface Land {
  id: number
  code: string
  locationName: string
  category: string
  area: number
  certificate: string
  certificateNo: string
  coordinates: string
  lat: number
  lng: number
  acquisitionYear: number | null
  documents: string[]
}

interface FormData {
  id?: number
  code: string
  locationName: string
  category: string
  area: number
  certificate: string
  certificateNo: string
  lat: string
  lng: string
  acquisitionYear: number | null
  documents: string[]
}

const selectedCategory = ref<string>('all')
const selectedCertificate = ref<string>('all')
const showMap = ref<boolean>(true)  // Default to show map first
const landMapContainer = ref<HTMLElement | null>(null)
const landModalRef = ref<HTMLElement | null>(null)
const newDocument = ref<string>('')
let landMap: L.Map | null = null
let landModalInstance: any = null

const isEditMode = ref<boolean>(false)
const formData = ref<FormData>({
  code: '',
  locationName: '',
  category: '',
  area: 0,
  certificate: '',
  certificateNo: '',
  lat: '',
  lng: '',
  acquisitionYear: null,
  documents: []
})

const lands = ref<Land[]>([
  { id: 1, code: 'LND-VALE-001', locationName: 'Vale Central Mining Area', category: 'Vale Owned', area: 450.5, certificate: 'HGU', certificateNo: 'HGU-001/2015', coordinates: '-2.5650, 121.3450', lat: -2.5650, lng: 121.3450, acquisitionYear: 2015, documents: ['HGU-001-2015.pdf', 'Peta-Kadaster.pdf'] },
  { id: 2, code: 'LND-VALE-002', locationName: 'Vale North Sector', category: 'Vale Owned', area: 320.8, certificate: 'HGU', certificateNo: 'HGU-002/2016', coordinates: '-2.5500, 121.3500', lat: -2.5500, lng: 121.3500, acquisitionYear: 2016, documents: ['HGU-002-2016.pdf', 'Site-Plan.pdf'] },
  { id: 3, code: 'LND-VALE-003', locationName: 'Vale South Sector', category: 'Vale Owned', area: 285.3, certificate: 'HGU', certificateNo: 'HGU-003/2017', coordinates: '-2.5800, 121.3400', lat: -2.5800, lng: 121.3400, acquisitionYear: 2017, documents: ['HGU-003-2017.pdf'] },
  { id: 4, code: 'LND-ACQ-001', locationName: 'Sorowako Expansion Area', category: 'Acquired', area: 125.5, certificate: 'SHM', certificateNo: 'SHM-045/2020', coordinates: '-2.5595, 121.3415', lat: -2.5595, lng: 121.3415, acquisitionYear: 2020, documents: ['SHM-045-2020.pdf', 'Akta-Jual-Beli.pdf', 'PPJB.pdf'] },
  { id: 5, code: 'LND-ACQ-002', locationName: 'Magani Buffer Zone', category: 'Acquired', area: 98.7, certificate: 'SHM', certificateNo: 'SHM-046/2021', coordinates: '-2.5605, 121.3465', lat: -2.5605, lng: 121.3465, acquisitionYear: 2021, documents: ['SHM-046-2021.pdf', 'Akta-Jual-Beli.pdf'] },
  { id: 6, code: 'LND-ACQ-003', locationName: 'Wewangriu Access Road', category: 'Acquired', area: 45.2, certificate: 'SHGB', certificateNo: 'SHGB-012/2022', coordinates: '-2.5685, 121.3425', lat: -2.5685, lng: 121.3425, acquisitionYear: 2022, documents: ['SHGB-012-2022.pdf', 'Perjanjian-Kompensasi.pdf'] },
  { id: 7, code: 'LND-ACQ-004', locationName: 'Nikkel Infrastructure', category: 'Acquired', area: 67.8, certificate: 'SHM', certificateNo: 'SHM-047/2023', coordinates: '-2.5695, 121.3485', lat: -2.5695, lng: 121.3485, acquisitionYear: 2023, documents: ['SHM-047-2023.pdf'] },
  { id: 8, code: 'LND-IUPK-001', locationName: 'IUPK Block A', category: 'IUPK', area: 550.0, certificate: 'HGU', certificateNo: 'IUPK-A/2010', coordinates: '-2.5400, 121.3300', lat: -2.5400, lng: 121.3300, acquisitionYear: 2010, documents: ['SK-IUPK-A-2010.pdf', 'Peta-Wilayah-Kerja.pdf'] },
  { id: 9, code: 'LND-IUPK-002', locationName: 'IUPK Block B', category: 'IUPK', area: 475.5, certificate: 'HGU', certificateNo: 'IUPK-B/2011', coordinates: '-2.5450, 121.3600', lat: -2.5450, lng: 121.3600, acquisitionYear: 2011, documents: ['SK-IUPK-B-2011.pdf'] },
  { id: 10, code: 'LND-IUPK-003', locationName: 'IUPK Block C', category: 'IUPK', area: 390.2, certificate: 'HGU', certificateNo: 'IUPK-C/2012', coordinates: '-2.5700, 121.3300', lat: -2.5700, lng: 121.3300, acquisitionYear: 2012, documents: ['SK-IUPK-C-2012.pdf', 'AMDAL.pdf'] },
  { id: 11, code: 'LND-PPKH-001', locationName: 'PPKH Conservation Area 1', category: 'PPKH', area: 280.5, certificate: 'HGU', certificateNo: 'PPKH-001/2018', coordinates: '-2.5350, 121.3550', lat: -2.5350, lng: 121.3550, acquisitionYear: 2018, documents: ['SK-PPKH-001-2018.pdf', 'RKL-RPL.pdf'] },
  { id: 12, code: 'LND-PPKH-002', locationName: 'PPKH Conservation Area 2', category: 'PPKH', area: 315.8, certificate: 'HGU', certificateNo: 'PPKH-002/2019', coordinates: '-2.5750, 121.3550', lat: -2.5750, lng: 121.3550, acquisitionYear: 2019, documents: ['SK-PPKH-002-2019.pdf'] },
  { id: 13, code: 'LND-OPS-001', locationName: 'Operational Base Camp', category: 'Operational', area: 35.5, certificate: 'SHGB', certificateNo: 'SHGB-020/2020', coordinates: '-2.5600, 121.3450', lat: -2.5600, lng: 121.3450, acquisitionYear: 2020, documents: ['SHGB-020-2020.pdf', 'IMB.pdf'] },
  { id: 14, code: 'LND-OPS-002', locationName: 'Processing Plant Area', category: 'Operational', area: 120.3, certificate: 'HGU', certificateNo: 'HGU-008/2015', coordinates: '-2.5620, 121.3470', lat: -2.5620, lng: 121.3470, acquisitionYear: 2015, documents: ['HGU-008-2015.pdf', 'Izin-Operasional.pdf', 'UKL-UPL.pdf'] },
  { id: 15, code: 'LND-OPS-003', locationName: 'Storage & Logistics', category: 'Operational', area: 48.7, certificate: 'SHGB', certificateNo: 'SHGB-021/2021', coordinates: '-2.5680, 121.3480', lat: -2.5680, lng: 121.3480, acquisitionYear: 2021, documents: ['SHGB-021-2021.pdf'] },
])

const filteredLands = computed(() => {
  let result = lands.value
  
  if (selectedCategory.value !== 'all') {
    result = result.filter(l => l.category === selectedCategory.value)
  }
  
  if (selectedCertificate.value !== 'all') {
    result = result.filter(l => l.certificate === selectedCertificate.value)
  }
  
  return result
})

const filteredTotalArea = computed(() => {
  return filteredLands.value.reduce((sum, l) => sum + l.area, 0)
})

const totalStats = computed(() => {
  const total = lands.value.reduce((sum, l) => sum + l.area, 0)
  const milikVale = lands.value.filter(l => l.category === 'Vale Owned').reduce((sum, l) => sum + l.area, 0)
  const acquired = lands.value.filter(l => l.category === 'Acquired').reduce((sum, l) => sum + l.area, 0)
  
  return {
    total: parseFloat(total.toFixed(2)),
    milikVale: parseFloat(milikVale.toFixed(2)),
    acquired: parseFloat(acquired.toFixed(2)),
    parcels: lands.value.length
  }
})

const categoryBreakdown = computed(() => {
  const categories = ['Vale Owned', 'Acquired', 'IUPK', 'PPKH', 'Operational']
  return categories.map(cat => {
    const items = lands.value.filter(l => l.category === cat)
    return {
      name: cat,
      count: items.length,
      totalArea: parseFloat(items.reduce((sum, l) => sum + l.area, 0).toFixed(2))
    }
  }).filter(c => c.count > 0)
})

const certificateBreakdown = computed(() => {
  const certificates = ['HGU', 'SHM', 'SHGB', 'Belum Sertifikat']
  return certificates.map(cert => {
    const items = lands.value.filter(l => l.certificate === cert)
    return {
      name: cert,
      count: items.length,
      totalArea: parseFloat(items.reduce((sum, l) => sum + l.area, 0).toFixed(2))
    }
  }).filter(c => c.count > 0)
})

onMounted(() => {
  console.log('Land Inventory Mounted')
  console.log('Total Lands:', lands.value.length)
  console.log('Lands Data:', lands.value)
  console.log('Filtered Lands:', filteredLands.value.length)
  console.log('Total Stats:', totalStats.value)
})

onUnmounted(() => {
  if (landMap) {
    landMap.remove()
    landMap = null
  }
})

const toggleView = () => {
  showMap.value = !showMap.value
}

const initLandMap = () => {
  if (landMap) {
    landMap.remove()
  }

  if (!landMapContainer.value) return

  landMap = L.map('land-map').setView([-2.5650, 121.3450], 12)
  landMap.pm.addControls({  
    position: 'topleft',  
    drawCircleMarker: false,
    rotateMode: false,
  }); 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(landMap)

  filteredLands.value.forEach(land => {
    const color = getCategoryColor(land.category)
    
    const landIcon = L.divIcon({
      className: 'custom-land-marker',
      html: `<div style="background: ${color}; width: 20px; height: 20px; border-radius: 4px; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    })

    const marker = L.marker([land.lat, land.lng], { icon: landIcon }).addTo(landMap!)
    
    marker.bindPopup(`
      <div style="min-width: 250px;">
        <h6><strong>${land.locationName}</strong></h6>
        <p class="mb-1"><small><strong>Kode:</strong> ${land.code}</small></p>
        <p class="mb-1"><small><strong>Kategori:</strong> ${land.category}</small></p>
        <p class="mb-1"><small><strong>Luas:</strong> ${land.area.toLocaleString()} Ha</small></p>
        <p class="mb-1"><small><strong>Sertifikat:</strong> ${land.certificate} - ${land.certificateNo}</small></p>
        <p class="mb-0"><small><strong>Tahun Akuisisi:</strong> ${land.acquisitionYear || '-'}</small></p>
      </div>
    `)
  })
}

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Vale Owned': return '#0d6efd'
    case 'Acquired': return '#ffc107'
    case 'IUPK': return '#198754'
    case 'PPKH': return '#20c997'
    case 'Operational': return '#6f42c1'
    default: return '#6c757d'
  }
}

const getCategoryClass = (category: string): string => {
  switch (category) {
    case 'Vale Owned': return 'bg-primary'
    case 'Acquired': return 'bg-warning'
    case 'IUPK': return 'bg-success'
    case 'PPKH': return 'bg-info'
    case 'Operational': return 'bg-secondary'
    default: return 'bg-dark'
  }
}

const getCertificateClass = (certificate: string): string => {
  switch (certificate) {
    case 'HGU': return 'bg-success'
    case 'SHM': return 'bg-primary'
    case 'SHGB': return 'bg-info'
    default: return 'bg-secondary'
  }
}

const viewOnMap = (land: Land) => {
  showMap.value = true
  nextTick(() => {
    initLandMap()
    if (landMap) {
      landMap.setView([land.lat, land.lng], 16)
    }
  })
}

const addLand = () => {
  isEditMode.value = false
  formData.value = {
    code: '',
    locationName: '',
    category: '',
    area: 0,
    certificate: '',
    certificateNo: '',
    lat: '',
    lng: '',
    acquisitionYear: null,
    documents: []
  }
  openLandModal()
}

const editLand = (land: Land) => {
  isEditMode.value = true
  formData.value = {
    id: land.id,
    code: land.code,
    locationName: land.locationName,
    category: land.category,
    area: land.area,
    certificate: land.certificate,
    certificateNo: land.certificateNo,
    lat: land.lat.toString(),
    lng: land.lng.toString(),
    acquisitionYear: land.acquisitionYear,
    documents: [...land.documents]
  }
  openLandModal()
}

const saveLand = () => {
  const lat = parseFloat(formData.value.lat)
  const lng = parseFloat(formData.value.lng)
  
  if (isNaN(lat) || isNaN(lng)) {
    alert('Koordinat tidak valid!')
    return
  }

  const coordinates = `${lat}, ${lng}`

  if (isEditMode.value && formData.value.id) {
    const index = lands.value.findIndex(l => l.id === formData.value.id)
    if (index !== -1 && formData.value.id && lands.value[index]) {
      const currentLand = lands.value[index]
      lands.value[index] = {
        id: formData.value.id,
        code: currentLand.code,
        locationName: formData.value.locationName,
        category: formData.value.category,
        area: formData.value.area,
        certificate: formData.value.certificate,
        certificateNo: formData.value.certificateNo,
        coordinates,
        lat,
        lng,
        acquisitionYear: formData.value.acquisitionYear,
        documents: formData.value.documents
      }
      alert(`Lahan ${formData.value.code} berhasil diupdate!`)
    }
  } else {
    const newId = Math.max(...lands.value.map(l => l.id)) + 1
    lands.value.push({
      id: newId,
      code: formData.value.code,
      locationName: formData.value.locationName,
      category: formData.value.category,
      area: formData.value.area,
      certificate: formData.value.certificate,
      certificateNo: formData.value.certificateNo,
      coordinates,
      lat,
      lng,
      acquisitionYear: formData.value.acquisitionYear,
      documents: formData.value.documents
    })
    alert(`Lahan ${formData.value.code} berhasil ditambahkan!`)
  }

  closeLandModal()
  if (showMap.value) {
    initLandMap()
  }
}

const deleteLand = (land: Land) => {
  if (confirm(`Hapus lahan ${land.code} - ${land.locationName}?\n\nData akan dihapus secara permanen.`)) {
    const index = lands.value.findIndex(l => l.id === land.id)
    if (index !== -1) {
      lands.value.splice(index, 1)
      alert('Lahan berhasil dihapus!')
      if (showMap.value) {
        initLandMap()
      }
    }
  }
}

const addDocument = () => {
  if (newDocument.value.trim()) {
    formData.value.documents.push(newDocument.value.trim())
    newDocument.value = ''
  }
}

const removeDocument = (index: number) => {
  formData.value.documents.splice(index, 1)
}

const viewDocuments = (land: Land) => {
  const docList = land.documents.map((doc, idx) => `${idx + 1}. ${doc}`).join('\n')
  alert(`Dokumen Lahan: ${land.code}\n\n${docList}`)
}

const openLandModal = () => {
  if (landModalRef.value) {
    const Modal = (window as any).bootstrap?.Modal
    if (Modal) {
      landModalInstance = new Modal(landModalRef.value)
      landModalInstance.show()
    }
  }
}

const closeLandModal = () => {
  if (landModalInstance) {
    landModalInstance.hide()
  } else if (landModalRef.value) {
    landModalRef.value.classList.remove('show')
    landModalRef.value.style.display = 'none'
  }
}

const exportData = () => {
  const headers = ['No', 'Kode Lahan', 'Nama Lokasi', 'Kategori', 'Luas (Ha)', 'Status Sertifikat', 'No. Sertifikat', 'Koordinat', 'Tahun Akuisisi', 'Dokumen']
  
  const rows = filteredLands.value.map((land, index) => [
    index + 1,
    land.code,
    land.locationName,
    land.category,
    land.area,
    land.certificate,
    land.certificateNo || '-',
    land.coordinates,
    land.acquisitionYear || '-',
    land.documents.length > 0 ? land.documents.join('; ') : '-'
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `land_inventory_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  alert('Data berhasil di-export!')
}

// Initialize map on mount if showMap is true
onMounted(() => {
  if (showMap.value) {
    nextTick(() => {
      initLandMap()
    })
  }
})

watch(showMap, (newVal) => {
  if (newVal) {
    nextTick(() => {
      initLandMap()
    })
  }
})

watch(filteredLands, (newVal) => {
  console.log('Filtered lands changed:', newVal.length)
  // Update map if currently showing map view
  if (showMap.value && landMap) {
    initLandMap()
  }
}, { immediate: true })

watch([selectedCategory, selectedCertificate], ([cat, cert]) => {
  console.log('Filters changed - Category:', cat, 'Certificate:', cert)
  // Update map when filters change
  if (showMap.value && landMap) {
    nextTick(() => {
      initLandMap()
    })
  }
})
</script>

<style scoped>
.custom-land-marker {
  background: transparent;
  border: none;
}
</style>
