<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Detail Project</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/pembebasan-lahan">Pembebasan Lahan</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title">Informasi Lahan</h5>
            <div class="card-tools">
              <router-link to="/pembebasan-lahan" class="btn btn-sm btn-secondary">
                <i class="bi bi-arrow-left"></i> Kembali
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th width="40%">Project Id</th>
                      <td>PRC-001</td>
                    </tr>
                    <tr>
                      <th>Nama Project</th>
                      <td>Budi Santoso</td>
                    </tr>
                    <tr>
                      <th>Owner Project</th>
                      <td>Budi Santoso</td>
                    </tr>
                    
                    <tr>
                      <th>Luas Project</th>
                      <td>500 m²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6">
                <div id="map" style="height: 400px;"></div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-12">
                <h6>Catatan:</h6>
                <p>Proses pembebasan lahan sedang dalam tahap negosiasi dengan pemilik lahan.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Daftar Pemilik Lahan</h5>
            <div class="card-tools">
              <button to="" class="btn btn-sm btn-primary" @click="openParcelModal">
                <i class="bi bi-plus-circle"></i> Tambah Pemilik
              </button>
            </div>
          </div>
          <div class="card-body">
            <table id="pemilikTable" class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode Parcel</th>
                  <th>Project</th>
                  <th>Nama Pemilik</th>
                  <th>Desa</th>
                  <th>Luas (m²)</th>
                  <th>Status Negosiasi</th>
                  <th>Jumlah Bebas</th>
                  <th style="white-space: nowrap;">Biaya Pembebasan</th>
                  <th>Tanggal Negosiasi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr v-if="acquisitionParcel.length === 0">
                  <td colspan="11" class="text-center text-muted">
                    No data
                  </td>
                </tr> -->
                <tr  v-for="(parcel, index) in acquisitionParcel" :key="parcel.id_parcel">
                  <td>{{ index + 1 }}</td>
                  <td><span class="badge bg-info">{{ parcel.kode_parcel }}</span></td>
                  <td><small>{{ parcel.nama_project }}</small></td>
                  <td><strong>{{ parcel.nama_pemilik }}</strong></td>
                  <td>{{ parcel.desa }}</td>
                  <td class="text-end">{{ parcel.luas.toLocaleString() }}</td>
                  <td>
                    <span class="badge" :class="getStatusClass(parcel.status)">
                      {{ parcel.status }}
                    </span>
                  </td>
                  <td>
                    <input 
                      v-if="parcel.status !== 'Bebas'" 
                      type="number" 
                      class="form-control form-control-sm" 
                      v-model="parcel.jumlah_bebas"
                      @change="updateJumlahBebas(parcel)"
                      min="0"
                      :max="parcel.luas"
                      style="width: 100px;"
                    />
                    <span v-else class="text-success"><strong>{{ parcel.jumlah_bebas }} m²</strong></span>
                  </td>
                  <td style="white-space: nowrap;">
                    <input 
                      v-if="parcel.status !== 'Bebas'" 
                      type="text" 
                      class="form-control form-control-sm" 
                      v-model="parcel.biaya_pembebasan"
                      @blur="formatBiaya(parcel)"
                      style="width: 150px;"
                    />
                    <span v-else class="text-success"><strong>{{ formatRupiah(parcel.biaya_pembebasan) }}</strong></span>
                  </td>
                  <td><small>{{ parcel.tanggal_negosiasi }}</small></td>
                  <td class="text-center" style="white-space: nowrap;">
                    <div class="btn-group" role="group">
                      <button class="btn btn-sm btn-success" @click="markAsBebas(parcel.id_parcel)" v-if="parcel.status !== 'Bebas'" title="Mark as Bebas">
                        <i class="bi bi-check-circle"></i>
                      </button>
                      <button class="btn btn-sm btn-warning" @click="editParcelModal(parcel)" title="Edit">
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <!-- <button class="btn btn-sm btn-info" @click="viewHistory(parcel)" title="Lihat History">
                        <i class="bi bi-clock-history"></i>
                      </button> -->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="parcelModal" tabindex="-1" aria-labelledby="parcelModalLabel" aria-hidden="true" ref="parcelModalRef">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="parcelModalLabel">
              {{ isEditMode ? 'Edit Parcel' : 'Tambah Parcel Baru' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveParcel">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Kode Parcel</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.code" 
                    placeholder="Contoh: PCL-ALP-001"
                    :disabled="isEditMode"
                    required 
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Nama Pemilik</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.ownerName" 
                    placeholder="Nama lengkap pemilik lahan"
                    required 
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Desa</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.village" 
                    placeholder="Desa XXXXX"
                    required 
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Luas Area (m²)</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model.number="formData.area" 
                    placeholder="Contoh: 500"
                    min="1"
                    required 
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Status Negosiasi</strong> <span class="text-danger">*</span></label>
                  <select class="form-select" v-model="formData.status" required>
                    <option value="">Pilih Status</option>
                    <option value="Belum Diproses">Belum Diproses</option>
                    <option value="Dalam Negosiasi">Dalam Negosiasi</option>
                    <option value="Bebas">Bebas</option>
                  </select>
                </div>
              </div>

              <div class="row" v-if="formData.status === 'Bebas'">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Jumlah Bebas (m²)</strong></label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model.number="formData.jumlahBebas" 
                    placeholder="Luas yang sudah dibebaskan"
                    min="0"
                    :max="formData.area"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Biaya Pembebasan (Rp)</strong></label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model.number="formData.biayaPembebasan" 
                    placeholder="Total biaya pembebasan"
                    min="0"
                  />
                </div>
              </div>
              <div id="map-modal" style="height: 400px;width:100%;margin-bottom: 1rem;"></div>
              <input type="file" accept=".geojson" @change="handleGeoJsonUpload" />
              <!-- <p></p> -->
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

</template>

<script setup lang="js">
import { ref, onMounted, computed, nextTick } from 'vue'
import axios from 'axios'
import { Modal } from 'bootstrap'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "../utils/drawMap.js"
import router from '../router/index.js'
import wellknown from "wellknown"
import { useRoute } from 'vue-router'
const route = useRoute()
const isEditMode = false
const projectId = route.params.id
const uploadGeometry = null
let mpwkt
let map = null
let acquisitionParcel = ref([])
let acquisitionParcelCompute = ref([])
let parcelModalRef = ref(null)
let parcelModalInstance = null
const projects = ref([])
let uploadedGeojson = null
let selectedGeometry = null
const fetchProjects = async () => {
  const res = await axios.get(`http://127.0.0.1:8000/api/spatial/LandAcquisitionProject/${projectId}?format=json`)
  projects.value = res.data
  
  
  // acquisitionParcel = computed(()=>{
  //   acquisitionParcelCompute.value = projects.value.acquisitions
  //   return acquisitionParcelCompute
  // })

  acquisitionParcel.value = res.data.acquisitions || []// acquisitionParcel = res.data.acquisitions
  console.log(acquisitionParcel)
}

const formData = {
      code: "",
      ownerName: "",
      village: "",
      area: null,
      status: "",
      jumlahBebas: null,
      biayaPembebasan: null,
      tanggalNegosiasi: null,
    }
let  geojsonGeometry=  null

const openParcelModal = () => {
  if (!parcelModalRef.value) return

  const Modal = window.bootstrap?.Modal
  if (!Modal) return

  parcelModalInstance = new Modal(parcelModalRef.value)

  parcelModalRef.value.addEventListener(
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

  parcelModalInstance.show()
}

const editParcelModal = (parcel) => {
  if (!parcelModalRef.value) return

  const Modal = window.bootstrap?.Modal
  if (!Modal) return
  formData.value = {
    id: parcel.id_parcel,
    code: parcel.kode_parcel,
    project: parcel.nama_project,
    ownerName: parcel.nama_pemilik,
    village: parcel.desa,
    area: parcel.luas,
    status: parcel.status,
    jumlahBebas: parcel.jumlah_bebas,
    biayaPembebasan: typeof parcel.biaya_pembebasan === 'number' ? parcel.biaya_pembebasan : 0
  }
  console.log(formData.value  )
  parcelModalInstance = new Modal(parcelModalRef.value)

  parcelModalRef.value.addEventListener(
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

  parcelModalInstance.show()
}

const getStatusClass = (status) => {
  switch (status) {
    case 'Bebas': return 'bg-success'
    case 'Dalam Negosiasi': return 'bg-warning'
    case 'Belum Diproses': return 'bg-secondary'
    default: return 'bg-secondary'
  }
  
}
const updateJumlahBebas = (parcel) => {
  if (parcel.jumlahBebas > parcel.area) {
    parcel.jumlahBebas = parcel.area
    alert('Jumlah bebas tidak boleh melebihi luas area')
  }
}
const formatBiaya = (parcel) => {
  // Convert string to number if needed
  if (typeof parcel.biayaPembebasan === 'string') {
    const cleaned = parcel.biayaPembebasan.replace(/[^0-9]/g, '')
    parcel.biayaPembebasan = cleaned ? parseInt(cleaned) : 0
  }
}
const formatRupiah = (value) => {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(num)
}


const markAsBebas = (parcel) => {
  if (parcel.jumlahBebas === 0 || parcel.biayaPembebasan === 0) {
    alert('Mohon isi Jumlah Bebas dan Biaya Pembebasan terlebih dahulu')
    return
  }
  
  if (confirm(`Tandai parcel ${parcel.code} sebagai Bebas?`)) {
    parcel.status = 'Bebas'
    parcel.negotiationDate = new Date().toISOString().split('T')[0] || '-'
    alert('Status berhasil diupdate menjadi Bebas. Negosiasi telah di-clear.')
  }
}

async function saveParcel(){
  const wkt = mpwkt.toWKT()
  // var data = formData.value
  // console.log(data,formData)
  const uploadData = {
    "id_project": projectId,
    "kode_parcel": formData.code,
    "nama_pemilik": formData.ownerName,
    "desa": formData.village,
    "luas": 0,
    "status": formData.status,
    "jumlah_bebas": 0,
    "biaya_pembebasan": 0,
    "tanggal_negosiasi": null,
    "id_persil": {
        "geom": wkt
    }
  }
  await axios.post('http://127.0.0.1:8000/api/spatial/LandAcquisition/', uploadData)
}
// onMounted(()=>{
//   if (window.$) {
//     window.$('#pemilikTable').DataTable({
//       language: {
//         search: "Cari:",
//         lengthMenu: "Tampilkan _MENU_ data per halaman",
//         info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
//         infoEmpty: "Menampilkan 0 sampai 0 dari 0 data",
//         infoFiltered: "(difilter dari _MAX_ total data)",
//         paginate: {
//           first: "Pertama",
//           last: "Terakhir",
//           next: "Selanjutnya",
//           previous: "Sebelumnya"
//         },
//         zeroRecords: "Tidak ada data yang cocok",
//         emptyTable: "Tidak ada data tersedia"
//       }
//     })
//   }
// })
onMounted(async () => {
  // Initialize DataTable
  
  await fetchProjects().then(()=>{
    nextTick(()=>{
      window.$('#pemilikTable').DataTable({
      language: {
        search: "Cari:",
        lengthMenu: "Tampilkan _MENU_ data per halaman",
        info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data",
        infoEmpty: "Menampilkan 0 sampai 0 dari 0 data",
        infoFiltered: "(difilter dari _MAX_ total data)",
        paginate: {
          first: "Pertama",
          last: "Terakhir",
          next: "Selanjutnya",
          previous: "Sebelumnya"
        },
        zeroRecords: "Tidak ada data yang cocok",
        emptyTable: "Tidak ada data tersedia"
      }
    })
    })
  })   // ⬅️ INI KUNCINYA
  // acquisitionParcel.value = projects.value.acquisitions

  // console.log(acquisitionParcel)
  // Initialize map
  const map = L.map('map').setView([-2.5489, 118.0149], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)
  if (projects.value.id_persil.geom) {
    const geojson = wellknown.parse(projects.value.id_persil.geom)
    const geojsonLayerProject = new L.GeoJSON(geojson).addTo(map)
    map.fitBounds(geojsonLayerProject.getBounds())
  }
  
})

function initMap() {
  map = L.map("map-modal").setView([-2, 118], 5)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    .addTo(map)

  map.pm.addControls({
    position: 'topleft',
    drawCircleMarker: false,
    rotateMode: false,
  })

  mpwkt = new LeafletMultiPolygonWKT(map)
}
function handleGeoJsonUpload(event) {
  const target = event.target 
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const result = e.target?.result
      if (typeof result !== 'string') {
        console.error('Invalid result type')
        return
      }
      uploadedGeojson = JSON.parse(result)
      console.log('Hasil JSON:', uploadedGeojson)


      // 🔥 buat layer baru
      var selectedLayer
      var geojsonLayer = new L.GeoJSON(uploadedGeojson, {
          style: {
            color: '#3388ff',
            weight: 2
          },
          onEachFeature: (feature, layer) => {
            layer.on('click', () => {
              // 🔥 reset highlight lama
              if (selectedLayer) {
                geojsonLayer.resetStyle(selectedLayer)
              }

              // 🔥 highlight layer baru
              layer.setStyle({
                color: 'yellow',
                weight: 4
              })

              selectedLayer = layer

              // 🔥 simpan geometry
              selectedGeometry = feature.geometry

              console.log('Selected geometry:', selectedGeometry)
            })
          }
        })
        if (map) {
          geojsonLayer.addTo(map)
          // 🔥 auto zoom ke data
          map.fitBounds(geojsonLayer.getBounds())
        }

    } catch (err) {
      console.error('JSON tidak valid:', err)
    }
  }

  reader.readAsText(file)
}
</script>

<style scoped>
</style>
