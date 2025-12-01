<template>
  <div>
    <div class="app-content">
      <div class="container-fluid">
        <div id="map" ref="mapContainer" style="height: 500px; border-radius: 8px; width: 100%"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (mapContainer.value) {
    // Inisialisasi peta
    const map = L.map(mapContainer.value).setView([-3.7, 119.8], 13)

    // Base map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    // Contoh data GeoJSON persil (dummy)
    const persilData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            nomor_persil: 'P001',
            nama_pemilik: 'Andi Saputra',
            luas: '1200 m²'
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [119.8, -3.7],
                [119.802, -3.7],
                [119.802, -3.702],
                [119.8, -3.702],
                [119.8, -3.7]
              ]
            ]
          }
        },
        {
          type: 'Feature',
          properties: {
            nomor_persil: 'P002',
            nama_pemilik: 'Siti Aminah',
            luas: '950 m²'
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [119.803, -3.701],
                [119.805, -3.701],
                [119.805, -3.703],
                [119.803, -3.703],
                [119.803, -3.701]
              ]
            ]
          }
        }
      ]
    }

    // Tambahkan ke peta
    L.geoJSON(persilData as any, {
      style: {
        color: '#007bff',
        weight: 2,
        fillColor: '#007bff',
        fillOpacity: 0.3
      },
      onEachFeature: (feature: any, layer: any) => {
        layer.bindPopup(`
          <b>Nomor Persil:</b> ${feature.properties.nomor_persil}<br>
          <b>Nama Pemilik:</b> ${feature.properties.nama_pemilik}<br>
          <b>Luas:</b> ${feature.properties.luas}
        `)
      }
    }).addTo(map)
  }
})
</script>

<style scoped>
</style>
