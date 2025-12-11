<template>
  <div class="modern-page">
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card gradient-primary">
        <div class="stat-label">Total Lahan Bebas</div>
        <div class="stat-value">{{ stats.total }} Ha</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Total Parsel</div>
        <div class="stat-value dark">{{ stats.parcels }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Pemilik Lahan</div>
        <div class="stat-value dark">{{ stats.owners }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Area Terverifikasi</div>
        <div class="stat-value dark">{{ stats.verified }}%</div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="map-card">
      <div class="map-header">
        <h3 class="map-title">Peta Lahan Bebas</h3>
        <div class="map-controls">
          <button class="btn-control active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Grid View
          </button>
          <button class="btn-control">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Heat Map
          </button>
        </div>
      </div>
      <div id="map" ref="mapContainer" class="map-container"></div>
      
      <div class="legend">
        <div class="legend-title">Legenda</div>
        <div class="legend-items">
          <div class="legend-item">
            <span class="legend-color" style="background: #10B981"></span>
            <span>Lahan Bebas ({{ parcels.filter(p => p.status === 'Bebas').length }})</span>
          </div>
          <div class="legend-item">
            <span class="legend-color" style="background: #4F46E5"></span>
            <span>Terverifikasi ({{ parcels.filter(p => p.verified).length }})</span>
          </div>
          <div class="legend-item">
            <span class="legend-color" style="background: #F59E0B"></span>
            <span>Pending ({{ parcels.filter(p => !p.verified).length }})</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Parcels Table -->
    <div class="table-card">
      <div class="table-header">
        <h3 class="table-title">Detail Parsel Lahan Bebas</h3>
        <div class="table-actions">
          <div class="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" placeholder="Search parsel..." v-model="searchQuery">
          </div>
        </div>
      </div>

      <div class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>Nomor Parsel</th>
              <th>Nama Pemilik</th>
              <th>Luas</th>
              <th>Koordinat</th>
              <th>Status</th>
              <th>Verifikasi</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="parcel in filteredParcels" :key="parcel.id">
              <td><span class="id-badge">{{ parcel.nomor }}</span></td>
              <td>
                <div class="owner-info">
                  <div class="owner-avatar">{{ parcel.pemilik.charAt(0) }}</div>
                  <span class="owner-name">{{ parcel.pemilik }}</span>
                </div>
              </td>
              <td class="luas-cell">{{ parcel.luas }} m²</td>
              <td class="coordinate-cell">{{ parcel.coordinates }}</td>
              <td><span class="badge badge-success">{{ parcel.status }}</span></td>
              <td>
                <span :class="['badge', parcel.verified ? 'badge-info' : 'badge-warning']">
                  {{ parcel.verified ? 'Terverifikasi' : 'Pending' }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="btn-icon" title="View on Map" @click="viewOnMap(parcel.id)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Detail">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Download">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement | null>(null)
const searchQuery = ref('')

const stats = ref({
  total: 53.2,
  parcels: 156,
  owners: 89,
  verified: 78
})

const parcels = ref([
  { id: 1, nomor: 'P001', pemilik: 'Andi Saputra', luas: 1200, coordinates: '119.800, -3.700', status: 'Bebas', verified: true },
  { id: 2, nomor: 'P002', pemilik: 'Siti Aminah', luas: 950, coordinates: '119.803, -3.701', status: 'Bebas', verified: true },
  { id: 3, nomor: 'P003', pemilik: 'Budi Santoso', luas: 1500, coordinates: '119.805, -3.702', status: 'Bebas', verified: false },
  { id: 4, nomor: 'P004', pemilik: 'Dewi Lestari', luas: 1100, coordinates: '119.802, -3.698', status: 'Bebas', verified: true },
])

const filteredParcels = computed(() => {
  if (!searchQuery.value) return parcels.value
  
  const query = searchQuery.value.toLowerCase()
  return parcels.value.filter(parcel => 
    parcel.nomor.toLowerCase().includes(query) ||
    parcel.pemilik.toLowerCase().includes(query)
  )
})

const viewOnMap = (parcelId: number) => {
  console.log('View parcel on map:', parcelId)
  alert(`Zooming to parcel ${parcelId}`)
}

onMounted(() => {
  if (mapContainer.value) {
    const map = L.map(mapContainer.value).setView([-3.7, 119.8], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    // Sample GeoJSON data
    const persilData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { nomor_persil: 'P001', nama_pemilik: 'Andi Saputra', luas: '1200 m²' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [119.8, -3.7], [119.802, -3.7], [119.802, -3.702], [119.8, -3.702], [119.8, -3.7]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: { nomor_persil: 'P002', nama_pemilik: 'Siti Aminah', luas: '950 m²' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [119.803, -3.701], [119.805, -3.701], [119.805, -3.703], [119.803, -3.703], [119.803, -3.701]
            ]]
          }
        }
      ]
    }

    L.geoJSON(persilData as any, {
      style: { color: '#10B981', weight: 2, fillColor: '#10B981', fillOpacity: 0.3 },
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
.modern-page {
  padding: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.stat-card.gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.stat-label {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-card.gradient-primary .stat-label {
  color: rgba(255, 255, 255, 0.95);
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
}

.stat-value.dark {
  color: #1E293B;
}

.map-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 24px;
}

.map-header {
  padding: 24px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.map-title {
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
}

.map-controls {
  display: flex;
  gap: 8px;
}

.btn-control {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-control:hover, .btn-control.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.map-container {
  height: 500px;
  width: 100%;
}

.legend {
  padding: 16px 24px;
  background: #F9FAFB;
  border-top: 1px solid #F3F4F6;
}

.legend-title {
  font-size: 13px;
  font-weight: 700;
  color: #6B7280;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.legend-items {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.table-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.table-header {
  padding: 24px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-title {
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
}

.table-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box svg {
  position: absolute;
  left: 12px;
  color: #9CA3AF;
}

.search-box input {
  padding: 10px 12px 10px 40px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
  min-width: 250px;
}

.search-box input:focus {
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.table-container {
  overflow-x: auto;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table thead {
  background: #F9FAFB;
}

.modern-table th {
  padding: 16px 20px;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #E5E7EB;
}

.modern-table tbody tr {
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
}

.modern-table tbody tr:hover {
  background: #F9FAFB;
}

.modern-table td {
  padding: 16px 20px;
  font-size: 14px;
  color: #374151;
}

.id-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #EEF2FF;
  color: #4F46E5;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
}

.owner-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.owner-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.owner-name {
  font-weight: 600;
  color: #1F2937;
}

.luas-cell {
  font-weight: 600;
  color: #10B981;
}

.coordinate-cell {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #6B7280;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.badge-success {
  background: #D1FAE5;
  color: #065F46;
}

.badge-warning {
  background: #FEF3C7;
  color: #92400E;
}

.badge-info {
  background: #DBEAFE;
  color: #1E40AF;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #F3F4F6;
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #4F46E5;
  color: white;
  transform: translateY(-2px);
}
</style>
