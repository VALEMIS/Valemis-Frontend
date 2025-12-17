<template>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Land Compliance</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="bi bi-house-fill"></i></router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Land Compliance</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="app-content">
       <div class="content-wrapper">
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <!-- Map Section (Kiri) -->
                    <div class="col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-header text-black">
                                <h5 class="mb-0"><i class="bi bi-map-fill me-2"></i>Claimed Area</h5>
                            </div>
                            <div class="card-body p-0">
                                <div id="map" style="height: 400px; width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Stats Cards (Kanan) - 2x2 Layout -->
                    <div class="col-md-6">
                        <div class="row g-3">
                            <!-- Row 1 -->
                            <div class="col-6">
                                <div class="small-box text-bg-primary h-100">
                                    <div class="inner p-3">
                                        <h3>3</h3>
                                        <p>Area Claim</p>
                                    </div>
                                    <div class="icon">
                                        <i class="bi bi-graph-up-arrow"></i>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-6">
                                <div class="small-box text-bg-danger h-100">
                                    <div class="inner p-3">
                                        <h3>2</h3>
                                        <p>Jumlah Perkara</p>
                                    </div>
                                    <div class="icon">
                                        <i class="bi bi-people-fill"></i>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Row 2 -->
                            <div class="col-6">
                                <div class="small-box text-bg-warning h-100">
                                    <div class="inner p-3">
                                        <h3>2</h3>
                                        <p>Putusan Menang</p>
                                    </div>
                                    <div class="icon">
                                        <i class="bi bi-check"></i>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-6">
                                <div class="small-box text-bg-info h-100">
                                    <div class="inner p-3">
                                        <h3>0</h3>
                                        <p>Putusan Kalah</p>
                                    </div>
                                    <div class="icon">
                                        <i class="bi bi-no"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="container-fluid flex flex-row gap-2 p-4">
        <data-table
            api="http://127.0.0.1:8000/api/valemis/polygonclaim/"
            title="Polygon Claim"
            data="polygon_claim_id"
            detail=""
        >
        </data-table>
        <data-table
            api="http://127.0.0.1:8000/api/valemis/parcel/"
            title="Parcel Polygon"
            data="id_parcel"
            detail=""
        >
        </data-table>
        <div class="card">
    <data-table
            api="http://127.0.0.1:8000/api/valemis/perkaratimeline/"
            title="Perkara Timeline"
            data="id_event"
            detail=""
        >
            </data-table>
        </div>
        
        
        </div>
    </div>
</template>

<script setup>
import "../components/DataTable/DataTable.js"
import { ref, onMounted } from "vue"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const file = ref(null)
const map = ref(null)
const layersOnMap = ref([])
const stats = ref([])

function handleFile(e) {
  file.value = e.target.files[0]
}

function initMap() {
  map.value = L.map("map").setView([-2, 118], 5)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map.value)
}

function clearLayers() {
  layersOnMap.value.forEach(l => map.value.removeLayer(l))
  layersOnMap.value = []
}

function addGeoJSON(geojson, style) {
  if (!geojson) return
  const layer = L.geoJSON(geojson, { style }).addTo(map.value)
  layersOnMap.value.push(layer)
}

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

  

  for (const [name, geo] of Object.entries(data.layers)) {
    addGeoJSON(geo, { color: "blue", weight: 1, opacity: 0.5 })
  }
  addGeoJSON(data.input, { color: "red", weight: 2 })
  stats.value = data.stats
}

onMounted(() => {
  initMap()
})
</script>

<style scoped>
#map {
  height: 400px;
  width: 600px;
  align-self: center;
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
.rating i {
  font-size: 0.9rem;
}

.modal.show {
  display: block;
}

.small-box .icon {
  font-size: 4rem;
  opacity: 0.3;
  position: absolute;
  right: 15px;
  top: 15px;
}
.map-legend {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 18px 22px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  z-index: 1000;
  min-width: 300px;
  border: 1px solid rgba(0,0,0,0.1);
}

.map-legend h6 {
  margin: 0 0 15px 0;
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.legend-item:last-of-type {
  margin-bottom: 0;
}

.legend-symbol {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 4px;
}

.legend-text {
  font-size: 14px;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  line-height: 1.4;
}

.legend-text strong {
  color: #000;
  font-weight: 600;
}

.legend-hint {
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
  margin-top: 12px !important;
  color: #666 !important;
  font-size: 12px;
  font-weight: 500;
}

.bg-purple {
  background-color: #800080 !important;
  color: white !important;
}

.badge {
  font-size: 11px;
  padding: 4px 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
</style>