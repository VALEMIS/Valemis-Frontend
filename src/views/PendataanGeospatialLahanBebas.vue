<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Pendataan Geospatial Lahan Bebas</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="bi bi-house-fill"></i></router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Geospatial Lahan Bebas</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <!-- Summary Cards -->
        <div class="row mb-4">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-success">
              <div class="inner">
                <h3>125 <small>Ha</small></h3>
                <p>Lahan Sudah Bebas</p>
              </div>
              <div class="icon">
                <i class="bi bi-check-circle"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>78 <small>Ha</small></h3>
                <p>Dalam Proses Nego</p>
              </div>
              <div class="icon">
                <i class="bi bi-chat-dots"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>47 <small>Ha</small></h3>
                <p>Belum Masuk Proses</p>
              </div>
              <div class="icon">
                <i class="bi bi-hourglass-split"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                <h3>50%</h3>
                <p>Progress Total</p>
              </div>
              <div class="icon">
                <i class="bi bi-graph-up"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Map Card -->
        <div class="card mb-4">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">
              <i class="bi bi-map"></i> Peta Visualisasi Status Lahan
            </h5>
          </div>
          <div class="card-body p-0">
            <div class="row g-0">
              <!-- Map Area -->
              <div class="col-md-9">
                <div ref="mapContainer" class="map-container" style="height: 600px;"></div>
              </div>

              <!-- Sidebar Controls -->
              <div class="col-md-3 border-start">
                <div class="p-3">
                  <!-- Layer Control -->
                  <div class="mb-4">
                    <h6 class="mb-3">
                      <i class="bi bi-layers"></i> Layer Control
                    </h6>
                    <div class="form-check mb-2" v-for="layer in mapLayers" :key="layer.id">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="'layer-' + layer.id"
                        v-model="layer.visible"
                      >
                      <label class="form-check-label" :for="'layer-' + layer.id">
                        {{ layer.name }}
                      </label>
                    </div>
                  </div>

                  <!-- Filter -->
                  <div class="mb-4">
                    <h6 class="mb-3">
                      <i class="bi bi-funnel"></i> Filter
                    </h6>
                    <div class="mb-2">
                      <label class="form-label form-label-sm">Status</label>
                      <select class="form-select form-select-sm" v-model="filterStatus">
                        <option value="">Semua Status</option>
                        <option value="bebas">Sudah Bebas</option>
                        <option value="nego">Dalam Negosiasi</option>
                        <option value="belum">Belum Proses</option>
                      </select>
                    </div>
                    <div class="mb-2">
                      <label class="form-label form-label-sm">Lokasi</label>
                      <select class="form-select form-select-sm" v-model="filterLokasi">
                        <option value="">Semua Lokasi</option>
                        <option value="sorowako">Sorowako</option>
                        <option value="matano">Matano</option>
                        <option value="wotu">Wotu</option>
                      </select>
                    </div>
                    <button class="btn btn-primary btn-sm w-100">
                      <i class="bi bi-search"></i> Apply Filter
                    </button>
                  </div>

                  <!-- Quick Stats -->
                  <div class="card bg-light">
                    <div class="card-body p-2">
                      <h6 class="mb-2">Quick Stats</h6>
                      <small class="d-block mb-1">Total Lahan: <strong>250</strong></small>
                      <small class="d-block mb-1">Luas Total: <strong>250 Ha</strong></small>
                      <small class="d-block">Progress: <strong>50%</strong></small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Table -->
        <div class="card">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Data Lahan Detail</h5>
              <div>
                <button class="btn btn-info btn-sm me-2" @click="showProjectModal = true">
                  <i class="bi bi-plus-square"></i> Input Rencana Project
                </button>
                <button class="btn btn-success btn-sm me-2">
                  <i class="bi bi-file-earmark-excel"></i> Export Excel
                </button>
                <button class="btn btn-primary btn-sm">
                  <i class="bi bi-plus-circle"></i> Tambah Data
                </button>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kode Lahan</th>
                    <th>Lokasi</th>
                    <th>Koordinat</th>
                    <th>Luas (Ha)</th>
                    <th>Status</th>
                    <th>Pemilik</th>
                    <th>Progress</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(lahan, index) in dataLahan" :key="lahan.id">
                    <td>{{ index + 1 }}</td>
                    <td><strong>{{ lahan.kode }}</strong></td>
                    <td>{{ lahan.lokasi }}</td>
                    <td>
                      <small>{{ lahan.koordinat }}</small>
                    </td>
                    <td>{{ lahan.luas }}</td>
                    <td>
                      <span class="badge" :class="getStatusClass(lahan.status)">
                        {{ getStatusLabel(lahan.status) }}
                      </span>
                    </td>
                    <td>{{ lahan.pemilik }}</td>
                    <td>
                      <div class="progress" style="height: 20px;">
                        <div
                          class="progress-bar"
                          :class="getProgressClass(lahan.progress)"
                          :style="{ width: lahan.progress + '%' }"
                        >
                          {{ lahan.progress }}%
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="btn-group btn-group-sm">
                        <button class="btn btn-info" @click="zoomToFeature(lahan.id)" title="Zoom to">
                          <i class="bi bi-geo-alt"></i>
                        </button>
                        <button class="btn btn-primary" title="Detail">
                          <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-warning" title="Edit">
                          <i class="bi bi-pencil"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <nav class="mt-3">
              <ul class="pagination pagination-sm justify-content-end">
                <li class="page-item disabled">
                  <a class="page-link" href="#">Previous</a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- Analytics Dashboard -->
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">Progress per Lokasi</h6>
              </div>
              <div class="card-body">
                <div class="mb-3">
                  <label>Sorowako</label>
                  <div class="progress mb-1">
                    <div class="progress-bar bg-success" style="width: 65%">65%</div>
                  </div>
                  <small class="text-muted">48 Ha dari 74 Ha</small>
                </div>
                <div class="mb-3">
                  <label>Matano</label>
                  <div class="progress mb-1">
                    <div class="progress-bar bg-warning" style="width: 45%">45%</div>
                  </div>
                  <small class="text-muted">45 Ha dari 100 Ha</small>
                </div>
                <div class="mb-3">
                  <label>Wotu</label>
                  <div class="progress mb-1">
                    <div class="progress-bar bg-info" style="width: 42%">42%</div>
                  </div>
                  <small class="text-muted">32 Ha dari 76 Ha</small>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">Timeline Progress</h6>
              </div>
              <div class="card-body">
                <div class="timeline-simple">
                  <div class="timeline-item mb-3" v-for="item in timelineData" :key="item.id">
                    <div class="d-flex">
                      <div class="timeline-marker me-3">
                        <i class="bi bi-circle-fill" :class="'text-' + item.color"></i>
                      </div>
                      <div class="flex-fill">
                        <div class="d-flex justify-content-between">
                          <strong>{{ item.title }}</strong>
                          <small class="text-muted">{{ item.date }}</small>
                        </div>
                        <p class="mb-0 text-muted">{{ item.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Input Rencana Project -->
    <div class="modal fade" :class="{ show: showProjectModal, 'd-block': showProjectModal }" tabindex="-1" v-if="showProjectModal" @click.self="showProjectModal = false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-info text-white">
            <h5 class="modal-title">
              <i class="bi bi-plus-square"></i> Input Rencana Project
            </h5>
            <button type="button" class="btn-close btn-close-white" @click="showProjectModal = false"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Kode Project <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" v-model="projectForm.kodeProject" placeholder="e.g., PRJ-2025-001" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Nama Project <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" v-model="projectForm.namaProject" placeholder="e.g., Ekspansi Area Mining" required>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Lokasi Project <span class="text-danger">*</span></label>
                  <select class="form-select" v-model="projectForm.lokasi" required>
                    <option value="">Pilih Lokasi</option>
                    <option value="Sorowako">Sorowako</option>
                    <option value="Matano">Matano</option>
                    <option value="Wotu">Wotu</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Luas Area (Ha) <span class="text-danger">*</span></label>
                  <input type="number" class="form-control" v-model.number="projectForm.luasArea" placeholder="e.g., 125.5" step="0.1" required>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Deskripsi Project</label>
                <textarea class="form-control" v-model="projectForm.deskripsi" rows="3" placeholder="Deskripsi singkat project..."></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Koordinat Project (Data Spasial) <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-geo-alt"></i>
                  </span>
                  <input type="text" class="form-control" v-model="projectForm.koordinat" placeholder="Lat, Long (e.g., -2.5325, 121.3586)" required>
                  <button class="btn btn-outline-secondary" type="button" @click="getLocationFromMap">
                    <i class="bi bi-map"></i> Dari Peta
                  </button>
                </div>
                <small class="text-muted">Format: Latitude, Longitude</small>
              </div>

              <div class="mb-3">
                <label class="form-label">File Shapefile / KML (Optional)</label>
                <input type="file" class="form-control" @change="handleFileUpload" accept=".shp,.kml,.geojson">
                <small class="text-muted">Upload shapefile, KML, atau GeoJSON untuk data spasial detail</small>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Tanggal Mulai Rencana</label>
                  <input type="date" class="form-control" v-model="projectForm.tanggalMulai">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Tanggal Target Selesai</label>
                  <input type="date" class="form-control" v-model="projectForm.tanggalSelesai">
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Estimasi Anggaran (Rp)</label>
                <input type="number" class="form-control" v-model.number="projectForm.anggaran" placeholder="e.g., 5000000000">
              </div>

              <div class="mb-3">
                <label class="form-label">Catatan Tambahan</label>
                <textarea class="form-control" v-model="projectForm.catatan" rows="2" placeholder="Catatan atau keterangan tambahan..."></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showProjectModal = false">
              <i class="bi bi-x-circle"></i> Batal
            </button>
            <button type="button" class="btn btn-info" @click="saveProject">
              <i class="bi bi-save"></i> Simpan Rencana Project
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" :class="{ show: showProjectModal }" v-if="showProjectModal"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLeafletMap } from '../composables/useLeafletMap'

const filterStatus = ref('')
const filterLokasi = ref('')
const showProjectModal = ref(false)
const mapContainer = ref<HTMLElement | null>(null)

// Initialize Leaflet map
const {
  isReady,
  addPolygon,
  enableLocationPicker
} = useLeafletMap(mapContainer, {
  center: [-2.5325, 121.3586],
  zoom: 13
})

const projectForm = ref({
  kodeProject: '',
  namaProject: '',
  lokasi: '',
  luasArea: 0,
  deskripsi: '',
  koordinat: '',
  tanggalMulai: '',
  tanggalSelesai: '',
  anggaran: 0,
  catatan: '',
  fileSpasial: null as File | null
})

const mapLayers = ref([
  { id: 1, name: 'Lahan Bebas', visible: true },
  { id: 2, name: 'Lahan Negosiasi', visible: true },
  { id: 3, name: 'Lahan Belum Proses', visible: true },
  { id: 4, name: 'Batas IUPK', visible: true },
  { id: 5, name: 'Batas Desa', visible: false },
  { id: 6, name: 'Jalan Akses', visible: false }
])

const dataLahan = ref([
  {
    id: 1,
    kode: 'LBB-001',
    lokasi: 'Desa Sorowako',
    koordinat: '-2.5325, 121.3586',
    luas: 2.5,
    status: 'bebas',
    pemilik: 'Ahmad Sulaiman',
    progress: 100
  },
  {
    id: 2,
    kode: 'LBB-002',
    lokasi: 'Desa Matano',
    koordinat: '-2.4825, 121.3286',
    luas: 3.8,
    status: 'nego',
    pemilik: 'Siti Nurhaliza',
    progress: 60
  },
  {
    id: 3,
    kode: 'LBB-003',
    lokasi: 'Desa Wotu',
    koordinat: '-2.5125, 121.3486',
    luas: 1.2,
    status: 'belum',
    pemilik: 'Budi Santoso',
    progress: 0
  },
  {
    id: 4,
    kode: 'LBB-004',
    lokasi: 'Desa Sorowako',
    koordinat: '-2.5425, 121.3686',
    luas: 4.5,
    status: 'bebas',
    pemilik: 'Dewi Kartika',
    progress: 100
  },
  {
    id: 5,
    kode: 'LBB-005',
    lokasi: 'Desa Matano',
    koordinat: '-2.4925, 121.3386',
    luas: 2.1,
    status: 'nego',
    pemilik: 'Eko Prasetyo',
    progress: 45
  }
])

const timelineData = ref([
  {
    id: 1,
    title: 'Lahan LBB-004 Selesai',
    description: 'Pembebasan lahan di Sorowako berhasil diselesaikan',
    date: '2 hari lalu',
    color: 'success'
  },
  {
    id: 2,
    title: 'Negosiasi LBB-002',
    description: 'Progress negosiasi mencapai 60%',
    date: '5 hari lalu',
    color: 'warning'
  },
  {
    id: 3,
    title: 'Survey LBB-003',
    description: 'Tim melakukan survey awal lokasi',
    date: '1 minggu lalu',
    color: 'info'
  }
])

const getStatusClass = (status: string) => {
  const statusMap: Record<string, string> = {
    'bebas': 'bg-success',
    'nego': 'bg-warning',
    'belum': 'bg-danger'
  }
  return statusMap[status] || 'bg-secondary'
}

const getStatusLabel = (status: string) => {
  const labelMap: Record<string, string> = {
    'bebas': 'Sudah Bebas',
    'nego': 'Negosiasi',
    'belum': 'Belum Proses'
  }
  return labelMap[status] || status
}

const getProgressClass = (progress: number) => {
  if (progress === 100) return 'bg-success'
  if (progress >= 50) return 'bg-warning'
  if (progress > 0) return 'bg-info'
  return 'bg-danger'
}

const zoomToFeature = (id: number) => {
  console.log('Zoom to feature:', id)
  // Implement zoom to feature functionality
}

// Load polygons to map when ready
watch(isReady, (ready) => {
  if (ready) {
    loadPolygonsToMap()
  }
})

const loadPolygonsToMap = () => {
  // Convert dataLahan to polygon format and add to map
  dataLahan.value.forEach((lahan) => {
    // Parse koordinat string "lat, lng" to array
    const coords = lahan.koordinat.split(',').map(coord => parseFloat(coord.trim()))
    const lat = coords[0]
    const lng = coords[1]
    
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) return
    
    // Create polygon coordinates (approximation - in production use real polygon data)
    const polygonCoords: [number, number][] = [
      [lat, lng],
      [lat + 0.005, lng],
      [lat + 0.005, lng + 0.005],
      [lat, lng + 0.005]
    ]
    
    addPolygon({
      id: lahan.id,
      coordinates: polygonCoords,
      status: lahan.status as 'bebas' | 'nego' | 'belum',
      properties: {
        kode: lahan.kode,
        lokasi: lahan.lokasi,
        luas: lahan.luas,
        pemilik: lahan.pemilik
      }
    })
  })
}

const getLocationFromMap = () => {
  // Enable location picker mode
  const cleanup = enableLocationPicker((latlng) => {
    projectForm.value.koordinat = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`
    alert(`Lokasi terpilih:\nLatitude: ${latlng.lat.toFixed(6)}\nLongitude: ${latlng.lng.toFixed(6)}`)
    
    // Cleanup listener after selection
    if (cleanup) cleanup()
  })
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    if (file) {
      projectForm.value.fileSpasial = file
      console.log('File uploaded:', file.name)
    }
  }
}

const saveProject = () => {
  // Validate required fields
  if (!projectForm.value.kodeProject || !projectForm.value.namaProject || 
      !projectForm.value.lokasi || !projectForm.value.luasArea || 
      !projectForm.value.koordinat) {
    alert('Mohon lengkapi semua field yang wajib diisi (*)')
    return
  }

  // Validate koordinat format
  const koordinatPattern = /^-?\d+\.?\d*,\s*-?\d+\.?\d*$/
  if (!koordinatPattern.test(projectForm.value.koordinat)) {
    alert('Format koordinat tidak valid. Gunakan format: Latitude, Longitude (e.g., -2.5325, 121.3586)')
    return
  }

  console.log('Saving project:', projectForm.value)
  
  // In production, this would send data to backend API
  // For now, just simulate success
  alert('Rencana project berhasil disimpan!\n\n' +
        `Kode: ${projectForm.value.kodeProject}\n` +
        `Nama: ${projectForm.value.namaProject}\n` +
        `Lokasi: ${projectForm.value.lokasi}\n` +
        `Luas: ${projectForm.value.luasArea} Ha\n` +
        `Koordinat: ${projectForm.value.koordinat}`)
  
  // Reset form
  projectForm.value = {
    kodeProject: '',
    namaProject: '',
    lokasi: '',
    luasArea: 0,
    deskripsi: '',
    koordinat: '',
    tanggalMulai: '',
    tanggalSelesai: '',
    anggaran: 0,
    catatan: '',
    fileSpasial: null
  }
  
  showProjectModal.value = false
  
  // Refresh data or update table
  // In production: fetchProjectData()
}
</script>

<style scoped>
.map-container {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
}

.map-placeholder {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.map-controls .btn {
  transition: all 0.2s ease;
}

.map-controls .btn:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.map-legend {
  animation: slideInLeft 0.5s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* SVG Polygon Animation */
svg polygon {
  animation: pulse 2s ease-in-out infinite;
  transform-origin: center;
}

svg polygon:nth-child(1) {
  animation-delay: 0s;
}

svg polygon:nth-child(3) {
  animation-delay: 0.2s;
}

svg polygon:nth-child(5) {
  animation-delay: 0.4s;
}

svg polygon:nth-child(7) {
  animation-delay: 0.6s;
}

svg polygon:nth-child(9) {
  animation-delay: 0.8s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

.timeline-simple {
  padding-left: 0;
}

.timeline-marker {
  padding-top: 3px;
}

/* Hover effects for interactive elements */
.card-header {
  transition: all 0.3s ease;
}

.small-box {
  transition: transform 0.2s ease;
}

.small-box:hover {
  transform: translateY(-5px);
}
</style>
