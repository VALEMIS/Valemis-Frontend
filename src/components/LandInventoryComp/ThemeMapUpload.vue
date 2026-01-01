<template>
  <div class="card">
    <div class="card-header d-flex ">
      <h5>Land Inventory Peta Tematik</h5>
      <button class="btn btn-sm btn-primary ms-auto" @click="openAdd">
        + Tambah Peta Tematik
      </button>
    </div>

    <div class="card-body">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul Peta</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(r, i) in rasters" :key="r.id_raster">
            <td>{{ i + 1 }}</td>
            <td>{{ r.nama_map }}</td>
            <td>
              <a :href="r.shp_path" target="_blank">
                Download
              </a>
            </td>
            <td>
              <button class="btn btn-sm btn-warning" @click="openEdit(r)">
                Edit
              </button>
              <button class="btn btn-sm btn-danger" @click="remove(r.id_raster)">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- MODAL -->
  <div class="modal fade" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="submit">
          <div class="modal-header">
            <h5>{{ isEdit ? 'Edit Raster' : 'Tambah Raster' }}</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>

          <div class="modal-body">
            <div class="mb-2">
              <label>Judul Peta</label>
              <input v-model="form.nama" class="form-control" required />
            </div>

            <div class="mb-2">
              <label>File Peta (Shapefile)</label>
              <input type="file" class="form-control" @change="onFile" />
              <small v-if="isEdit">Kosongkan jika tidak diganti</small>
            </div>
            <div id="map" style="width: 100%;height:400px"></div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" @click="close">
              Batal
            </button>
            <button class="btn btn-primary" type="submit">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  
</template>
<script setup>
import { ref, onMounted,watch,defineProps } from 'vue'
import axios from 'axios'
import { Modal } from 'bootstrap'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import shp from 'shpjs'
const props = defineProps(['id_project'])

const API = 'http://127.0.0.1:8000/api/spatial/LandInventoryThemeMap'
const API_BYPROJECT = `http://127.0.0.1:8000/api/spatial/LandInventoryThemeMap/?id_project=${props.id_project}`
const PROJECT_API = 'http://127.0.0.1:8000/api/spatial/Project'

const rasters = ref([])
const projects = ref([])
const isEdit = ref(false)
const modalRef = ref(null)
var geojson = ref(null)
let map = null
let modal


const form = ref({
  id_theme_map:null,
  id_project: props.id_project,
  nama_map: '',
  shp_path: null
})

onMounted(async () => {
  modal = new Modal(modalRef.value)
  await fetchData()
  await fetchProjects()  
})

async function fetchData() {
  const res = await axios.get(API_BYPROJECT)
  rasters.value = res.data
}

async function fetchProjects() {
  const res = await axios.get(PROJECT_API)
  projects.value = res.data
}

function openAdd() {
  reset()
  isEdit.value = false

  const onShown = () => {
    if (!map) {
      initMap()
    } else {
      map.invalidateSize()
    }

    modalRef.value.removeEventListener('shown.bs.modal', onShown)
  }

  modalRef.value.addEventListener('shown.bs.modal', onShown)
  modal.show()
}


function openEdit(row) {
  isEdit.value = true
  form.value = {
    id_project: row.id_project,
    nama_map: row.nama_peta,
    shp_path: null,
  }
  modal.show()
}

function close() {
  modal.hide()
}

async function onFile(e) {
  const file = e.target.files[0]
  if (!file) return

  form.value.shp_path = file

  // convert File → ArrayBuffer
  const buffer = await file.arrayBuffer()

  // parse shapefile zip → GeoJSON
  geojson.value = await shp(buffer)
}

async function submit() {
  const fd = new FormData()
  fd.append('id_project', props.id_project ?? '')
  fd.append('nama_map', form.value.nama_peta)

  if (form.value.shp_path) {
    fd.append('shp_path', form.value.shp_path)
  }

  if (isEdit.value) {
    await axios.put(`${API}/${form.value.id_theme_map}/`, fd)
  } else {
    await axios.post(API + '/', fd)
  }

  await fetchData()
  close()
}

async function remove(id) {
  if (!confirm('Hapus raster ini?')) return
  await axios.delete(`${API}/${id}/`)
  fetchData()
}

function reset() {
  form.value = {
    id_theme_map:null,
    id_project: props.id_project,
    nama_map: '',
    shp_path: null
  }
}



function initMap(){
  map = L.map('map').setView([-2.5650, 121.3450], 12)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)
  watch(geojson, (data) => {
    if (!data || !map) return

    L.geoJSON(data).addTo(map)
  })
}
</script>
