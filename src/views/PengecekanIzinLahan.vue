<template>
  <div>
    <div class="app-content">
      <div class="container-fluid">
        <div class="bg-gray-50 p-6 rounded-xl shadow-inner space-y-8">
          <!-- Form Upload Shapefile -->
          <div class="bg-white p-6 rounded-xl shadow-md">
            <h2 class="text-xl font-semibold mb-4 text-gray-700">
              Upload Data Shapefile (.zip)
            </h2>
            <form id="shpForm" class="flex flex-col gap-4" @submit.prevent="handleSubmit">
              <input
                type="file"
                name="shapefile"
                accept=".zip"
                class="border border-gray-300 p-3 rounded-md"
                required
              />
              <button
                type="submit"
                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Jalankan Analisis
              </button>
            </form>
          </div>

          <!-- Tabel Hasil Analisis -->
          <div class="bg-white p-4 rounded-xl shadow-md">
            <h2 class="text-lg font-semibold mb-3 text-gray-700">
              Hasil Analisis Spasial
            </h2>
            <table class="w-full text-sm border-collapse border border-gray-300">
              <thead>
                <tr class="bg-gray-200 text-gray-800">
                  <th class="border px-2 py-1">Layer</th>
                  <th class="border px-2 py-1">Jumlah Fitur</th>
                  <th class="border px-2 py-1">Luas (ha)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border px-2 py-1">ZNT_A</td>
                  <td class="border px-2 py-1">34</td>
                  <td class="border px-2 py-1">125.7</td>
                </tr>
                <tr>
                  <td class="border px-2 py-1">HGU_Expired</td>
                  <td class="border px-2 py-1">12</td>
                  <td class="border px-2 py-1">49.3</td>
                </tr>
                <tr>
                  <td class="border px-2 py-1">Kawasan_Lindung</td>
                  <td class="border px-2 py-1">7</td>
                  <td class="border px-2 py-1">301.9</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Peta -->
          <div class="bg-white p-4 rounded-xl shadow-md">
            <h2 class="text-lg font-semibold mb-3 text-gray-700">
              Peta Hasil Overlay
            </h2>
            <div id="map" ref="mapContainer" style="height: 500px; border-radius: 8px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement | null>(null)

const handleSubmit = () => {
  alert('Analisis akan dijalankan')
}

onMounted(() => {
  if (mapContainer.value) {
    // Dummy GeoJSON Input
    const inputGeoJSON = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: 'Area Input' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [121.58, -2.81],
                [121.62, -2.81],
                [121.62, -2.78],
                [121.58, -2.78],
                [121.58, -2.81]
              ]
            ]
          }
        }
      ]
    }

    // Dummy Layer Overlay
    const layersGeoJSON: any = {
      Kawasan_Lindung: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [121.6, -2.8],
                  [121.64, -2.8],
                  [121.64, -2.76],
                  [121.6, -2.76],
                  [121.6, -2.8]
                ]
              ]
            }
          }
        ]
      },
      HGU_Expired: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [121.56, -2.83],
                  [121.59, -2.83],
                  [121.59, -2.79],
                  [121.56, -2.79],
                  [121.56, -2.83]
                ]
              ]
            }
          }
        ]
      }
    }

    // Inisialisasi Peta
    const map = L.map(mapContainer.value).setView([-2.8, 121.6], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map)

    // Input polygon
    const inputLayer = L.geoJSON(inputGeoJSON as any, {
      style: { color: 'red', weight: 2, fillOpacity: 0 }
    }).addTo(map)

    map.fitBounds(inputLayer.getBounds())

    // Overlay layers
    const overlayLayers: any = {}
    const colors = ['#008000', '#0000FF', '#FFA500', '#800080']
    let i = 0

    for (const [name, geojson] of Object.entries(layersGeoJSON)) {
      overlayLayers[name] = L.geoJSON(geojson as any, {
        style: {
          color: colors[i % colors.length],
          weight: 1,
          fillOpacity: 0.4
        }
      }).addTo(map)
      i++
    }

    // Tambahkan kontrol layer
    L.control.layers(undefined, overlayLayers, { collapsed: false }).addTo(map)
  }
})
</script>

<style scoped>
</style>
