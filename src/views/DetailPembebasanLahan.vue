<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Detail Land Acquisition</h3>
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
          <!-- <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th width="40%">Project Id</th>
                      <td>{{ projects.id_project }}</td>
                    </tr>
                    <tr>
                      <th>Nama Project</th>
                      <td>{{ projects.nama_project }}</td>
                    </tr>
                    <tr>
                      <th>Owner Project</th>
                      <td>{{projects.owner_project}}</td>
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
          </div> -->
          <div class="col-md-12">
                <div id="map" style="height: 600px;"></div>
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
                      @change="updatejumlah_bebas(parcel)"
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
                      <button class="btn btn-sm btn-danger" @click="deleteParcel(parcel.id_parcel)" title="Hapus parcel">
                        <i class="bi bi-trash"></i>
                      </button>
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
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveParcel">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Kode Parcel</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.kode_parcel" 
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
                    v-model="formData.nama_pemilik" 
                    placeholder="Nama lengkap pemilik lahan"
                    required 
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Desa</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.desa" 
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
                    v-model.number="formData.luas" 
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
                    v-model.number="formData.jumlah_bebas" 
                    placeholder="Luas yang sudah dibebaskan"
                    min="0"
                    :max="formData.luas"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Biaya Pembebasan (Rp)</strong></label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model.number="formData.biaya_pembebasan" 
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
import { ref, onMounted, computed, nextTick, onBeforeUnmount } from 'vue'
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
const projectId = route.params.id_project
const uploadGeometry = null

const apiUrl = import.meta.env.VITE_API_SPATIAL_URL
const gsUrl = import.meta.env.VITE_API_GS_URL

let mpwkt
let map = null
let isEditMode = false
let acquisitionParcel = ref([])
let acquisitionParcelCompute = ref([])
let parcelModalRef = ref(null)
let parcelModalInstance = null
const acquisition = ref([])
const projects = ref([])
let uploadedGeojson = null
let selectedGeometry = null
const apiUrl = import.meta.env.VITE_APP_API_SPATIAL_URL;
const geoserverUrl = import.meta.env.VITE_APP_API_GEOSERVER_URL;
const fetchAcquisition = async () => {
  const res = await axios.get(apiUrl+`/LandAcquisition/?id_project=${projectId}`)
  acquisition.value = res.data
  // const resProject = await axios.get(apiUrl+`/Project/${projectId}`)
  // projects.value = resProject.data
  acquisitionParcel.value = res.data || []// acquisitionParcel = res.data.acquisitions
}


const formData = ref({
      kode_parcel: "",
      nama_pemilik: "",
      desa: "",
      luas: 0,
      status: "",
      jumlah_bebas: 0,
      biaya_pembebasan: 0,
    })
let  geojsonGeometry=  null

const openParcelModal = () => {
  isEditMode = false
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
  isEditMode = true
  if (!parcelModalRef.value) return

  const Modal = window.bootstrap?.Modal
  
  if (!Modal) return
  formData.value = {
    id_parcel: parcel.id_parcel,
    kode_parcel: parcel.kode_parcel,
    project: parcel.nama_project,
    nama_pemilik: parcel.nama_pemilik,
    desa: parcel.desa,
    luas: parcel.luas,
    status: parcel.status,
    jumlah_bebas: parcel.jumlah_bebas,
    biaya_pembebasan: typeof parcel.biaya_pembebasan === 'number' ? parcel.biaya_pembebasan : 0
  }
  
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

onMounted(() => {
  if (!parcelModalRef.value) return

  parcelModalInstance = new Modal(parcelModalRef.value)

  parcelModalRef.value.addEventListener('hidden.bs.modal', handleHidden)
})

onBeforeUnmount(() => {
  parcelModalRef.value?.removeEventListener('hidden.bs.modal', handleHidden)
})

const handleHidden = () => {
  closeModal()
}

const closeModal = () => {
  formData.value = {
    kode_parcel: "",
    nama_pemilik: "",
    desa: "",
    luas: 0,
    status: "",
    jumlah_bebas: 0,
    biaya_pembebasan: 0,
  }
  isEditMode = !isEditMode
}

const getStatusClass = (status) => {
  switch (status) {
    case 'Bebas': return 'bg-success'
    case 'Dalam Negosiasi': return 'bg-warning'
    case 'Belum Diproses': return 'bg-secondary'
    default: return 'bg-secondary'
  }
  
}


const updatejumlah_bebas = (parcel) => {
  if (parcel.jumlah_bebas > parcel.luas) {
    parcel.jumlah_bebas = parcel.luas
    alert('Jumlah bebas tidak boleh melebihi luas area')
  }
}
const formatBiaya = (parcel) => {
  // Convert string to number if needed
  if (typeof parcel.biaya_pembebasan === 'string') {
    const cleaned = parcel.biaya_pembebasan.replace(/[^0-9]/g, '')
    parcel.biaya_pembebasan = cleaned ? parseInt(cleaned) : 0
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


const markAsBebas = async (parcelId) => {
  // console.log(parcel)
  const parcel = acquisitionParcel.value.find(
    p => p.id_parcel === parcelId
  )
  if (!parcel) return

  
  if (parcel.jumlah_bebas === 0 || parcel.biaya_pembebasan === 0) {
    alert('Mohon isi Jumlah Bebas dan Biaya Pembebasan terlebih dahulu')
    return
  }
  
  if (confirm(`Tandai parcel ${parcel.kode_parcel} sebagai Bebas?`)) {
    parcel.status = 'Bebas'
    parcel.negotiationDate = new Date().toISOString().split('T')[0] || '-'
    alert('Status berhasil diupdate menjadi Bebas. Negosiasi telah di-clear.')
  }
  console.log(parcel)
  await axios.put(apiUrl+'/LandAcquisition/'+parcelId+'/', parcel)
}

async function saveParcel() {
  const wkt = mpwkt.toWKT()
  console.log(formData)
  const payload = {
    id_project: projectId,
    kode_parcel: formData.value.kode_parcel,
    nama_pemilik: formData.value.nama_pemilik,
    desa: formData.value.desa,
    luas: formData.value.luas,
    status: formData.value.status,
    jumlah_bebas: formData.value.jumlah_bebas,
    biaya_pembebasan: formData.value.biaya_pembebasan,
    geom: wkt
  }
console.log(payload,isEditMode)
  if (isEditMode) {
    // UPDATE
    await axios.put(
      apiUrl+`/LandAcquisition/${formData.value.id_parcel}/`,
      payload
    )
  } else {
    // CREATE
    await axios.post(
      apiUrl+'/LandAcquisition/',
      payload
    )
  }

  await fetchAcquisition()
  
  const modal = bootstrap.Modal.getInstance(parcelModalRef.value)
  modal.hide()

  parcelModalRef.value.addEventListener(
    'hidden.bs.modal',
    async () => {
      await fetchAcquisition()
    },
    { once: true }
  )
}
async function deleteParcel(parcelId){
  await axios.delete(apiUrl+`/LandAcquisition/${parcelId}/`)
  await fetchAcquisition()
}


onMounted(async () => {
  // Initialize DataTable

  await fetchAcquisition().then(()=>{
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
  })

  const map = L.map('map')

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // console.log(acquisitionParcel.value)

  
  const wmsLayerAcquisition = L.tileLayer.wms(
    gsUrl+"/vector_valemis/wms",
    {
      layers: "	vector_valemis:tbl_acquisition",
      format: "image/png",
      transparent: true,
      version: "1.1.0",
      styles:"Acquisition_style",
      crs: L.CRS.EPSG4326,
      tiled:false
    }
  );

  wmsLayerAcquisition.addTo(map);
  var acquisitionLegend = L.control({ position: 'bottomright' });

  acquisitionLegend.onAdd = function () {
    const div = L.DomUtil.create('div', 'legend');
    
    div.innerHTML = `
    <div class="card p-2">
      <h6>Acquisition</h6>
      <img
        src=gsUrl+"/vector_valemis/wms?REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=vector_valemis:tbl_acquisition&STYLE=Acquisition_style&VERSION=1.1.0" alt="Legend"
      />
      </div>
    `;

    return div;
  };

  acquisitionLegend.addTo(map);
  const resProject = await axios.get(apiUrl+`/Project/${projectId}`)
  
  if (resProject.data.geom) {
    const geojson = wellknown.parse(resProject.data.geom)
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
      // console.log('Hasil JSON:', uploadedGeojson)


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
