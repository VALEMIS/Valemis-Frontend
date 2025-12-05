<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Land Inventory - Inventarisasi Lahan</h3>
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
        <!-- Summary Cards -->
        <div class="row mb-4">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-primary">
              <div class="inner">
                <h3>1,245 <small>Ha</small></h3>
                <p>Total Luas IUPK</p>
              </div>
              <div class="icon">
                <i class="bi bi-map"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-success">
              <div class="inner">
                <h3>856 <small>Ha</small></h3>
                <p>Lahan PPKH</p>
              </div>
              <div class="icon">
                <i class="bi bi-tree"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>234</h3>
                <p>Total Peta Tematik</p>
              </div>
              <div class="icon">
                <i class="bi bi-layers"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                <h3>45</h3>
                <p>Data Project</p>
              </div>
              <div class="icon">
                <i class="bi bi-folder"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'spatial' }"
                  @click="activeTab = 'spatial'"
                  href="#"
                >
                  <i class="bi bi-map-fill"></i> Data Spasial Vale
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'tematik' }"
                  @click="activeTab = 'tematik'"
                  href="#"
                >
                  <i class="bi bi-layers-fill"></i> Peta Tematik
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'project' }"
                  @click="activeTab = 'project'"
                  href="#"
                >
                  <i class="bi bi-diagram-3"></i> Data Project
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'acquisition' }"
                  @click="activeTab = 'acquisition'"
                  href="#"
                >
                  <i class="bi bi-geo-alt-fill"></i> Land Acquisition
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: activeTab === 'overlay' }"
                  @click="activeTab = 'overlay'"
                  href="#"
                >
                  <i class="bi bi-grid-3x3"></i> Dashboard Overlay
                </a>
              </li>
            </ul>
          </div>

          <div class="card-body">
            <!-- Data Spasial Vale Tab -->
            <div v-show="activeTab === 'spatial'">
              <div class="d-flex justify-content-between mb-3">
                <h5>GB Data Spasial Milik Vale</h5>
                <button class="btn btn-primary">
                  <i class="bi bi-plus-circle"></i> Tambah Data Spasial
                </button>
              </div>

              <div class="row">
                <div class="col-md-8">
                  <div class="card">
                    <div class="card-header bg-light">
                      <h6 class="mb-0">Visualisasi Peta</h6>
                    </div>
                    <div class="card-body p-0">
                      <div ref="spatialMapContainer" style="height: 400px;"></div>
                    </div>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="card">
                    <div class="card-header bg-light">
                      <h6 class="mb-0">Layer Control</h6>
                    </div>
                    <div class="card-body">
                      <div class="form-check mb-2" v-for="layer in spatialLayers" :key="layer.id">
                        <input class="form-check-input" type="checkbox" :id="'layer-' + layer.id" :checked="layer.visible">
                        <label class="form-check-label" :for="'layer-' + layer.id">
                          {{ layer.name }}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="card mt-3">
                    <div class="card-header bg-light">
                      <h6 class="mb-0">Statistik Data</h6>
                    </div>
                    <div class="card-body">
                      <table class="table table-sm">
                        <tbody>
                          <tr>
                            <td>IUPK Area</td>
                            <td class="text-end"><strong>1,245 Ha</strong></td>
                          </tr>
                          <tr>
                            <td>PPKH Area</td>
                            <td class="text-end"><strong>856 Ha</strong></td>
                          </tr>
                          <tr>
                            <td>Kawasan Hutan</td>
                            <td class="text-end"><strong>432 Ha</strong></td>
                          </tr>
                          <tr>
                            <td>LULC Mapped</td>
                            <td class="text-end"><strong>98%</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Peta Tematik Tab -->
            <div v-show="activeTab === 'tematik'">
              <div class="d-flex justify-content-between mb-3">
                <h5>Koleksi Peta Tematik</h5>
                <button class="btn btn-primary">
                  <i class="bi bi-upload"></i> Upload Peta
                </button>
              </div>

              <div class="row">
                <div class="col-md-3" v-for="peta in petaTematik" :key="peta.id">
                  <div class="card mb-3">
                    <div class="card-header">
                      <strong>{{ peta.nama }}</strong>
                    </div>
                    <div class="card-body">
                      <p class="mb-1"><small>Jenis: {{ peta.jenis }}</small></p>
                      <p class="mb-1"><small>Skala: {{ peta.skala }}</small></p>
                      <p class="mb-2"><small>Update: {{ peta.tanggalUpdate }}</small></p>
                      <div class="d-flex gap-1">
                        <button class="btn btn-sm btn-primary flex-fill">
                          <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-success flex-fill">
                          <i class="bi bi-download"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Data Project Tab -->
            <div v-show="activeTab === 'project'">
              <div class="d-flex justify-content-between mb-3">
                <h5>Data Project</h5>
                <button class="btn btn-primary">
                  <i class="bi bi-plus-circle"></i> Tambah Project
                </button>
              </div>

              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode Project</th>
                      <th>Nama Project</th>
                      <th>Lokasi</th>
                      <th>Luas Area (Ha)</th>
                      <th>Status</th>
                      <th>Progress</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(project, index) in dataProject" :key="project.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ project.kode }}</td>
                      <td>{{ project.nama }}</td>
                      <td>{{ project.lokasi }}</td>
                      <td>{{ project.luasArea }}</td>
                      <td>
                        <span class="badge" :class="getStatusClass(project.status)">
                          {{ project.status }}
                        </span>
                      </td>
                      <td>
                        <div class="progress">
                          <div class="progress-bar" :style="{ width: project.progress + '%' }">
                            {{ project.progress }}%
                          </div>
                        </div>
                      </td>
                      <td>
                        <button class="btn btn-sm btn-info">
                          <i class="bi bi-eye"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Land Acquisition Tab -->
            <div v-show="activeTab === 'acquisition'">
              <div class="d-flex justify-content-between mb-3">
                <h5>GB Land Acquisition</h5>
                <button class="btn btn-primary">
                  <i class="bi bi-link-45deg"></i> Link dengan LARAP
                </button>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-body">
                      <p class="text-muted">
                        <i class="bi bi-info-circle"></i> 
                        Data land acquisition terintegrasi dengan modul LARAP untuk tracking real-time status pembebasan lahan
                      </p>
                      
                      <div class="table-responsive">
                        <table class="table table-sm">
                          <thead>
                            <tr>
                              <th>Kode Lahan</th>
                              <th>Lokasi</th>
                              <th>Luas (Ha)</th>
                              <th>Status Akuisisi</th>
                              <th>Link LARAP</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="land in landAcquisition" :key="land.id">
                              <td>{{ land.kode }}</td>
                              <td>{{ land.lokasi }}</td>
                              <td>{{ land.luas }}</td>
                              <td>
                                <span class="badge" :class="getStatusClass(land.status)">
                                  {{ land.status }}
                                </span>
                              </td>
                              <td>
                                <router-link to="/larap" class="btn btn-sm btn-outline-primary">
                                  <i class="bi bi-arrow-right-circle"></i> View LARAP
                                </router-link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dashboard Overlay Tab -->
            <div v-show="activeTab === 'overlay'">
              <h5 class="mb-3">Dashboard Analisis Overlay</h5>
              
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-header bg-light">
                      <h6 class="mb-0">Analisis GB Land yang Dibebaskan vs Data Lain</h6>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-8">
                          <div ref="overlayMapContainer" style="height: 450px;"></div>
                        </div>

                        <div class="col-md-4">
                          <div class="card bg-light">
                            <div class="card-body">
                              <h6>Hasil Analisis</h6>
                              <hr>
                              <div class="mb-3">
                                <label class="form-label">Lahan Bebas dalam IUPK</label>
                                <div class="progress">
                                  <div class="progress-bar bg-success" style="width: 75%">75%</div>
                                </div>
                                <small class="text-muted">187.5 Ha dari 250 Ha</small>
                              </div>

                              <div class="mb-3">
                                <label class="form-label">Overlap dengan PPKH</label>
                                <div class="progress">
                                  <div class="progress-bar bg-warning" style="width: 15%">15%</div>
                                </div>
                                <small class="text-muted">37.5 Ha perlu review</small>
                              </div>

                              <div class="mb-3">
                                <label class="form-label">Dalam Kawasan Hutan</label>
                                <div class="progress">
                                  <div class="progress-bar bg-danger" style="width: 10%">10%</div>
                                </div>
                                <small class="text-muted">25 Ha memerlukan izin khusus</small>
                              </div>

                              <hr>
                              <button class="btn btn-primary btn-sm w-100">
                                <i class="bi bi-file-earmark-pdf"></i> Export Report
                              </button>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLeafletMap } from '../composables/useLeafletMap'

const activeTab = ref('spatial-data')
const spatialMapContainer = ref<HTMLElement | null>(null)
const overlayMapContainer = ref<HTMLElement | null>(null)

// Initialize Leaflet maps
const spatialMap = useLeafletMap(spatialMapContainer, {
  center: [-2.5325, 121.3586],
  zoom: 12
})

const overlayMap = useLeafletMap(overlayMapContainer, {
  center: [-2.5325, 121.3586],
  zoom: 13
})

// Load spatial data when map is ready
watch(spatialMap.isReady, (ready) => {
  if (ready) {
    // Add PPKH area
    spatialMap.addPolygon({
      id: 'ppkh-1',
      coordinates: [
        [-2.53, 121.36],
        [-2.53, 121.37],
        [-2.54, 121.37],
        [-2.54, 121.36]
      ],
      status: 'bebas',
      properties: {
        kode: 'PPKH-001',
        lokasi: 'Sorowako',
        luas: 856,
        pemilik: 'PPKH Vale'
      }
    })
  }
})

// Load overlay data when map is ready
watch(overlayMap.isReady, (ready) => {
  if (ready) {
    // Add sample IUPK boundary
    overlayMap.addPolygon({
      id: 'iupk-boundary',
      coordinates: [
        [-2.52, 121.35],
        [-2.52, 121.38],
        [-2.55, 121.38],
        [-2.55, 121.35]
      ],
      status: 'nego',
      properties: {
        kode: 'IUPK-MAIN',
        lokasi: 'Vale Area',
        luas: 1245,
        pemilik: 'PT Vale'
      }
    })
  }
})

const spatialLayers = ref([
  { id: 1, name: 'IUPK Vale', visible: true },
  { id: 2, name: 'PPKH', visible: true },
  { id: 3, name: 'Kawasan Hutan', visible: false },
  { id: 4, name: 'Peta Topografi', visible: true },
  { id: 5, name: 'LULC', visible: false },
  { id: 6, name: 'Batas Administrasi', visible: true }
])

const petaTematik = ref([
  {
    id: 1,
    nama: 'Peta Kawasan Hutan',
    jenis: 'Kehutanan',
    skala: '1:50.000',
    tanggalUpdate: '2024-11-15'
  },
  {
    id: 2,
    nama: 'Peta Topografi',
    jenis: 'Topografi',
    skala: '1:25.000',
    tanggalUpdate: '2024-10-20'
  },
  {
    id: 3,
    nama: 'Peta LULC',
    jenis: 'Land Use',
    skala: '1:50.000',
    tanggalUpdate: '2024-12-01'
  },
  {
    id: 4,
    nama: 'Peta Topo Detail',
    jenis: 'Topografi',
    skala: '1:10.000',
    tanggalUpdate: '2024-11-28'
  }
])

const dataProject = ref([
  {
    id: 1,
    kode: 'PRJ-2024-001',
    nama: 'Ekspansi Area Mining A',
    lokasi: 'Sorowako',
    luasArea: 125.5,
    status: 'Aktif',
    progress: 75
  },
  {
    id: 2,
    kode: 'PRJ-2024-002',
    nama: 'Infrastruktur Jalan Akses',
    lokasi: 'Matano',
    luasArea: 45.2,
    status: 'Aktif',
    progress: 50
  },
  {
    id: 3,
    kode: 'PRJ-2024-003',
    nama: 'Fasilitas Pengolahan',
    lokasi: 'Wotu',
    luasArea: 78.9,
    status: 'Perencanaan',
    progress: 25
  }
])

const landAcquisition = ref([
  {
    id: 1,
    kode: 'LRN-001',
    lokasi: 'Desa Sorowako',
    luas: 2.5,
    status: 'Selesai'
  },
  {
    id: 2,
    kode: 'LRN-002',
    lokasi: 'Desa Matano',
    luas: 3.2,
    status: 'Negosiasi'
  },
  {
    id: 3,
    kode: 'LRN-003',
    lokasi: 'Desa Wotu',
    luas: 1.8,
    status: 'Belum Dimulai'
  }
])

const getStatusClass = (status: string) => {
  const statusMap: Record<string, string> = {
    'Aktif': 'bg-success',
    'Perencanaan': 'bg-info',
    'Selesai': 'bg-primary',
    'Negosiasi': 'bg-warning',
    'Belum Dimulai': 'bg-danger'
  }
  return statusMap[status] || 'bg-secondary'
}
</script>

<style scoped>
.map-placeholder {
  border: 2px dashed #dee2e6;
  border-radius: 8px;
}
</style>
