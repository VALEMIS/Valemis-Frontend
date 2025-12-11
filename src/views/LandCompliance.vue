<template>
  <div class="container">
    <h2>Upload Spatial File</h2>

    <input type="file" @change="handleFile" />
    <button @click="analyze">Proses Intersect</button>

    <div id="map"></div>

    <h3>Hasil Analisis</h3>
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
</template>

<script setup>
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
</style>
