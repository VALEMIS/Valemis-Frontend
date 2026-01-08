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
            <div class="card stat-card border-start-primary">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0 text-primary">{{ totalStats.total.toLocaleString() }}</h3>
                    <small class="text-muted">Total Lahan (Ha)</small>
                  </div>
                  <div class="icon-box bg-primary-subtle text-primary">
                    <i class="bi bi-map"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card stat-card border-start-success">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0 text-success">{{ totalStats.milikVale.toLocaleString() }}</h3>
                    <small class="text-muted">Milik Vale (Ha)</small>
                  </div>
                  <div class="icon-box bg-success-subtle text-success">
                    <i class="bi bi-check-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card stat-card border-start-warning">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0 text-warning">{{ totalStats.acquired.toLocaleString() }}</h3>
                    <small class="text-muted">Acquired (Ha)</small>
                  </div>
                  <div class="icon-box bg-warning-subtle text-warning">
                    <i class="bi bi-arrow-down-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card stat-card border-start-info">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0 text-info">{{ totalStats.parcels }}</h3>
                    <small class="text-muted">Total Parcel</small>
                  </div>
                  <div class="icon-box bg-info-subtle text-info">
                    <i class="bi bi-grid-3x3"></i>
                  </div>
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

        <!-- <div v-if="showMap" class="row mb-3"> -->
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
        <!-- </div> -->

        <!-- <div v-else class="row"> -->
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
                      <td><span class="badge" :class="getCertificateClass(land.certificate)">{{ land.certificate
                      }}</span></td>
                      <td><small>{{ land.certificateNo || '-' }}</small></td>
                      <td><small class="text-muted">{{ land.coordinates }}</small></td>
                      <td class="text-center">{{ land.acquisitionYear || '-' }}</td>
                      <td>
                        <button v-if="land.documents.length >= 0" class="btn btn-sm btn-outline-secondary"
                          @click="viewDocuments(land)" title="Lihat Dokumen">
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
        <!-- </div> -->

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
        <!-- DATA UPLOAD LAIN LAIN -->
        <div class="row">
          <div class="row mt-3">
            <div class="col-md-6">
              <raster-upload :id_project="projectId" />
            </div>
            <div class="col-md-6">
              <theme-map-upload :id_project="projectId" />
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
                  <input type="text" class="form-control" v-model="formData.code" placeholder="Contoh: LND-VALE-001"
                    :disabled="isEditMode" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Nama Lokasi</strong> <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" v-model="formData.locationName"
                    placeholder="Nama lokasi lahan" required />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Kategori</strong> <span class="text-danger">*</span></label>
                  <select class="form-select" v-model="formData.category" required>
                    <option value="">Pilih Kategori</option>
                    <option value="0">Milik Vale</option>
                    <option value="1">Acquired/Diakuisisi</option>
                    <option value="2">IUPK</option>
                    <option value="3">PPKH</option>
                    <option value="4">Operasional</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Luas (Ha)</strong> <span class="text-danger">*</span></label>
                  <input type="number" class="form-control" v-model.number="formData.area" placeholder="Contoh: 125.5"
                    step="0.01" min="0.01" required />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Status Sertifikat</strong> <span
                      class="text-danger">*</span></label>
                  <select class="form-select" v-model="formData.certificate" required>
                    <option value="">Pilih Status</option>
                    <option value="0">SHM (Sertifikat Hak Milik)</option>
                    <option value="1">SHGB (Hak Guna Bangunan)</option>
                    <option value="2">HGU (Hak Guna Usaha)</option>
                    <option value="3">Belum Sertifikat</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>No. Sertifikat</strong></label>
                  <input type="text" class="form-control" v-model="formData.certificateNo"
                    placeholder="Nomor sertifikat" />
                </div>
              </div>

              <div class="row">

                <div class="col-md-4 mb-3">
                  <label class="form-label"><strong>Tahun Akuisisi</strong></label>
                  <input type="number" class="form-control" v-model.number="formData.acquisitionYear" placeholder="2024"
                    min="1900" :max="new Date().getFullYear()" />
                </div>
              </div>
              <div id="maps" ref="mapContainer" style="height: 400px;"></div>
              <div class="mb-3 mt-3">
                <label class="form-label"><strong><i class="bi bi-file-earmark-text"></i> Dokumen Lahan</strong></label>

                <div class="input-group mb-2">
                  <!-- <input 
                    type="text" 
                    class="form-control" 
                    v-model="newDocument" 
                    placeholder="Nama file dokumen (contoh: SHM-001-2020.pdf)"
                    @keyup.enter="addDocument"
                  /> -->
                  <input type="file" class="btn btn-outline-primary" multiple @change="addDocument">
                  <!-- <i class="bi bi-plus-circle"></i> Tambah -->
                  </input>
                </div>
                <div v-if="newDocument.length > 0" class="border rounded p-2">
                  <small class="text-muted d-block mb-2">Daftar Dokumen:</small>
                  <div class="d-flex flex-wrap gap-1">
                    <span v-for="(doc, idx) in newDocument" :key="idx"
                      class="badge bg-secondary d-inline-flex align-items-center">
                      <i class="bi bi-file-earmark-text me-1"></i>
                      {{ doc.name }}
                      <button type="button" class="btn-close btn-close-white ms-2" style="font-size: 0.7rem;"
                        @click="removeDocument(idx)"></button>
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
    <DocumentModal :documents="selectedDocuments" :landId="selectedLandId" :show="showDocModal"
      @close="showDocModal = false" @refresh="refreshFetch()" />

  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { landApi } from '../api/index'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import axios from 'axios';
import 'leaflet/dist/leaflet.css'
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import RasterUpload from '../components/LandInventoryComp/RasterUpload.vue';
import ThemeMapUpload from '../components/LandInventoryComp/ThemeMapUpload.vue';
import DocumentModal from '../components/LandInventoryComp/DocumentModal.vue';
import "../utils/drawMap.js"
import {addWms} from "../utils/addWms.js"
import { useRoute } from 'vue-router'

const apiUrl = import.meta.env.VITE_APP_API_SPATIAL_URL
const gsUrl = import.meta.env.VITE_APP_API_GS_URL

const route = useRoute()
const projectId = route.params.id_project
interface Land {
  id: number
  code: string
  locationName: string
  category: string
  area: number
  certificate: string
  certificateNo: string
  coordinates: string
  acquisitionYear: number | null
  documents: string[]
  geom: any
}
import wellknown from "wellknown"
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
const mapContainer = ref<HTMLElement | null>(null)
const landModalRef = ref<HTMLElement | null>(null)
const newDocument = ref<any[]>([])
let landMap: L.Map | null = null
let map: L.Map | null = null
let landModalInstance: any = null
let projects = ref<any[]>([])

let mpwkt

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

const lands = ref<Land[]>([])
const fetchProjects = async () => {
  const res = await axios.get<any[]>(apiUrl + `/LandInventory/?id_project=${projectId}`)
  projects.value = res.data
  console.log(res.data)
  lands.value = res.data.map(e => ({
    id: e.id_lahan,
    code: e.kode_lahan,
    locationName: e.nama_lokasi,
    category: e.kategori_detail.label || '',
    area: e.luas || 0,
    certificate: e.status_detail?.label || '',
    certificateNo: e.no_sertif || '',
    acquisitionYear: e.tahun_perolehan || null,
    documents: e.documents || [],
    geom: e.geom || null
  }

  ))
  // console.log(lands.value)

}
async function refreshFetch() {
  await fetchProjects()
}
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
  fetchProjects()


  // map.fitBounds(geojsonLayerProject.getBounds())
  // }
  initMap()
})

onUnmounted(() => {
  if (landMap) {
    landMap.remove()
    landMap = null
  }
})

const initLandMap = async () => {
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
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(landMap)

  await addWms(landMap,projectId)

  const wmsLayerProject = L.tileLayer.wms(
    gsUrl + "/vector_valemis/wms",
    {
      layers: "vector_valemis:tbl_project",
      format: "image/png",
      transparent: true,
      version: "1.1.0",
      styles: "sld_projek",
    }
  );

  wmsLayerProject.addTo(landMap);



  // let geojsonLayerProject
  // // if (lands.value.length>0) {
  // lands.value.forEach((e) => {
  //   if (e.geom != null) {
  //     console.log(wellknown.parse(e.geom))
  //     L.geoJSON(wellknown.parse(e.geom)).addTo(landMap)
  //   }
  // })

}
function initMap() {
  map = L.map("maps").setView([-2.5650, 121.3450], 12)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    .addTo(map)

  map.pm.addControls({
    position: 'topleft',
    drawCircleMarker: false,
    rotateMode: false,
  })

  mpwkt = new LeafletMultiPolygonWKT(map)

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

const saveLand = async () => {
  const wkt = (mpwkt as any).toWKT()
  var uploadData = {
    "kode_lahan": formData.value.code,
    "nama_lokasi": formData.value.locationName,
    "kategori": formData.value.category,
    "status": formData.value.certificate,
    "no_sertif": formData.value.certificateNo,
    "id_project": projectId,
    "geom": wkt
  }
  const res = await axios.post(
    apiUrl + '/LandInventory/',
    uploadData
  )

  const landId = res.data.id_lahan
  alert(`Lahan ${formData.value.code} berhasil ditambahkan!`)

  if (newDocument.value.length > 0) {
    const formDataDoc = new FormData()
    console.log(newDocument)
    newDocument.value.forEach(async (file: File) => {
      formDataDoc.append('file', file)
      formDataDoc.append('nama_dokumen', file.name)
      formDataDoc.append('id_lahan', landId)


      await axios.post(
        apiUrl + '/LandInventoryDocument/',
        formDataDoc,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    })
  }
  await fetchProjects()
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

const selectedDocuments = ref([])
const selectedLandId = ref<number | null>(null)
const showDocModal = ref(false)

const viewDocuments = (land: Land) => {
  console.log(selectedDocuments.value, selectedLandId.value, showDocModal.value)
  selectedDocuments.value = land.documents
  selectedLandId.value = land.id
  showDocModal.value = true
}

const openLandModal = () => {

  if (landModalRef.value) {
    const Modal = (window as any).bootstrap?.Modal
    if (Modal) {
      landModalInstance = new Modal(landModalRef.value)
      landModalRef.value.addEventListener(
        'shown.bs.modal',
        () => {
          if (!map) {
            initMap()
          } else {
            map.invalidateSize()
          }
        },
        { once: true } // penting: jangan dobel
      )
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

const exportData = async () => {
  try {
    await landApi.exportExcel()
    alert('Data berhasil didownload dalam format Excel!')
  } catch (err) {
    alert('Gagal mendownload data: ' + (err instanceof Error ? err.message : 'Unknown error'))
    console.error('Export error:', err)
  }
}

// Initialize map on mount if showMap is true
onMounted(() => {
  if (showMap.value) {
    nextTick(() => {
      initLandMap()
      initMap()
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

.document-link-item {
  transition: all 0.2s ease;
  background: white;
}

.document-link-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Stat Cards */
.stat-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
  height: 100%;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.border-start-primary {
  border-left: 4px solid #0d6efd !important;
}

.border-start-success {
  border-left: 4px solid #198754 !important;
}

.border-start-warning {
  border-left: 4px solid #ffc107 !important;
}

.border-start-info {
  border-left: 4px solid #0dcaf0 !important;
}

/* Icon Box */
.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.bg-primary-subtle {
  background-color: rgba(13, 110, 253, 0.1);
}

.bg-success-subtle {
  background-color: rgba(25, 135, 84, 0.1);
}

.bg-warning-subtle {
  background-color: rgba(255, 193, 7, 0.1);
}

.bg-info-subtle {
  background-color: rgba(13, 202, 240, 0.1);
}

/* Clean Badge Styling */
.badge {
  font-weight: 500;
  background-color: transparent !important;
  border: 1px solid transparent;
}

.badge.bg-success {
  color: #198754;
  border-color: #198754;
}

.badge.bg-info {
  color: #0dcaf0;
  border-color: #0dcaf0;
}

.badge.bg-warning {
  color: #ffc107;
  border-color: #ffc107;
}

.badge.bg-danger {
  color: #dc3545;
  border-color: #dc3545;
}

.badge.bg-secondary {
  color: #6c757d;
  border-color: #6c757d;
}

.badge.bg-primary {
  color: #0d6efd;
  border-color: #0d6efd;
}

.badge.bg-dark {
  color: #212529;
  border-color: #212529;
}
</style>
