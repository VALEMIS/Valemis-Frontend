<template>
  <div class="container d-grid gap-0 row-gap-3">
    <h2>Compliance</h2>
    <div id="map"></div>
    <div class="card"> 
      <div class="card-header">
        <h5 class="card-title mb-0">Masukan Data Spasial</h5>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="fileInput" class="form-label">Pilih File</label>
          <input 
            type="file" 
            id="fileInput"
            class="form-control" 
            @change="onFile"
            accept=".shp,.geojson,.json,.kml,.zip"
          />
        <div class="form-text">Format yang didukung: SHP, GeoJSON, KML</div>
      </div>
        <!-- <button 
          @click="analyze" 
          class="btn btn-primary w-100"
        >
          <i class="bi bi-upload me-2"></i>Upload Data
        </button> -->
      </div>   
    </div>
    <div class="card"> 
      <div class="card-header">
        <h4>Tambahkan Asset untuk Overlay Spasial</h4>
      </div>
      <div class="card-tools d-grid gap-0 row-gap-3">
        <button class="btn btn-sm btn-primary me-2" id="addBtn" v-on:click="openForm()">
          <i class="bi bi-plus-circle"></i> Tambah Data
        </button>
      </div>
      <div class="card-body">
        <table>
          <thead>
            <tr>
              <th>Layer</th>
              <th>Tahun Terbit</th>
              <th>Luas (m²)</th>
              <th>Luas (ha)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in stats" :key="row.layer">
              <td>{{ row.layer }}</td>
              <td>{{ row.jumlah_fitur }}</td>
              <td>{{ row.luas_m2 }}</td>
              <td>{{ row.luas_ha }}</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">  
      <div class="card-header">
        <h4>Hasil Analisis</h4>
      </div>
      <div class="card-body">
        <table>
          <thead>
            <tr>
              <th>Layer</th>
              <th>Jumlah</th>
              <th>Luas (m²)</th>
              <th>Luas (ha)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in stats" :key="row.layer">
              <td>{{ row.layer }}</td>
              <td>{{ row.jumlah_fitur }}</td>
              <td>{{ row.luas_m2 }}</td>
              <td>{{ row.luas_ha }}</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="modal-bg" id="modal">
    <div class="modal-content-custom">
        <h4 id="modalTitle">Tambah Data</h4>
        <form id="form">
          <div class="form-floating">
            <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
              <option selected>Pilih Layer Spasial</option>
              <option v-for="value,i in layerSelection" :value="i">{{value.nama}}</option>
            </select>
            <label for="floatingSelect">Works with selects</label>
          </div>
        </form>
        <div class="mt-3 text-end">
            <button class="btn btn-secondary" id="closeModal" v-on:click="addLayer()">Batal</button>
            <button class="btn btn-primary" id="saveBtn" v-on:click="addLayer()">Simpan</button>
          
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed,watch } from "vue"
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Removed to prevent navigation conflicts
import "../utils/drawMap.js"
// import Select from 'primevue/select';
import shp from "shpjs"
import "leaflet/dist/leaflet.css"

interface StatRow {
  layer: string
  jumlah_fitur: number
  luas_m2: number
  luas_ha: number
}

const file = ref<File | null>(null)
const map = ref<L.Map | null>(null)
const layersOnMap = ref<any[]>([])
const stats = ref<StatRow[]>([])
let geojson:any = ref(null)
let inputLayer = ref<any>()
const 
const fileSelected = computed(() => file.value !== null)

function handleFile(e: Event) {
  const target = e.target as HTMLInputElement
  file.value = target.files?.[0] || null
  console.log(file.value)
}

function initMap() {
  map.value = L.map("map").setView([-2, 118], 5)
  if (map.value) {
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map.value as any)
  }
  watch(geojson, (data) => {
    if (!data || !map) return

    // inputLayer = new L.GeoJSON(data).addTo(map.value as any)
    const bounds = inputLayer.getBounds()
    if (bounds.isValid()) {
      (map.value as any).fitBounds(bounds, {
        padding: [20, 20]
      })
    }
  })
  
}

// function clearLayers() {
//   if (!map.value) return
//   layersOnMap.value.forEach(l => map.value!.removeLayer(l))
//   layersOnMap.value = []
// }

// function addGeoJSON(geojson: any, style: any) {
//   if (!geojson || !map.value) return
//   const layer = L.geoJSON(geojson, { style }).addTo(map.value as any)
//   layersOnMap.value.push(layer)
// }

async function analyze() {
  if (!file.value) {
    alert("Upload file dulu")
    return
  }

  const formData = new FormData()
  formData.append("file", file.value)

  const res = await fetch("http://127.0.0.1:8000/api/valemis/analyze/", {
    method: "POST",
    body: formData
  })

  const data = await res.json()

  clearLayers()
  for (const [_name, geo] of Object.entries(data.layers)) {
    addGeoJSON(geo, { color: "blue", weight: 1, opacity: 0.5 })
  }
  addGeoJSON(data.input, { color: "red", weight: 2 })
  stats.value = data.stats
}
async function onFile(e:any) {
  const file = e.target.files[0]
  
  if (!file) return
  const ext = file.name.split(".").slice(-1)[0].toLowerCase()
  if(ext=="zip"){
    const buffer = await file.arrayBuffer()
    geojson.value = await shp(buffer)
    inputLayer = new L.GeoJSON(geojson.value).addTo(map.value as any)
  }else if (ext=="geojson"){
    const buffer = await file.arrayBuffer()
    const text = new TextDecoder("utf-8").decode(buffer)
    const geojsonUpload = JSON.parse(text)
    geojson.value = geojsonUpload
    inputLayer = new L.GeoJSON(geojson.value).addTo(map.value as any)
  }
  console.log(geojson.value)
}
function addLayer(){
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "none";
  }
  // layerSelected.push()
}
function openForm(){
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "flex";
  }
}
onMounted(() => {
  initMap()
  map.value?.pm.addControls({
    position: 'topleft',
    drawCircleMarker: false,
    rotateMode: false,
  })

})

// Clean up map instance when navigating away
onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
  layersOnMap.value = []
})
</script>




<style scoped>
#map {
  height: 70vh;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

td, th {
  border: 1px solid #ccc;
  padding: 6px;
}

button {
  margin-left: 10px;
}
.modal-bg {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        .modal-content-custom {
            background: white;
            padding: 20px;
            border-radius: 12px;
            width: 400px;
        }
</style>