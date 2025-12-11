<template>
  <div class="modern-page">
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card gradient-primary">
        <div class="stat-label">Total Pengecekan</div>
        <div class="stat-value">{{ stats.total }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Layak Izin</div>
        <div class="stat-value dark">{{ stats.layak }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Perlu Review</div>
        <div class="stat-value dark">{{ stats.review }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Tidak Layak</div>
        <div class="stat-value dark">{{ stats.tidakLayak }}</div>
      </div>
    </div>

    <!-- Upload Section -->
    <div class="upload-card">
      <div class="upload-header">
        <h3 class="upload-title">Upload Data Shapefile</h3>
        <p class="upload-subtitle">Upload file .zip berisi shapefile untuk analisis spasial izin lahan</p>
      </div>
      <form @submit.prevent="handleSubmit" class="upload-form">
        <div class="file-input-wrapper">
          <input
            type="file"
            id="shapefile"
            name="shapefile"
            accept=".zip"
            ref="fileInput"
            @change="handleFileChange"
            class="file-input"
          />
          <label for="shapefile" class="file-label">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <span class="file-label-text" v-if="!selectedFile">Click to upload or drag and drop</span>
            <span class="file-label-text" v-else>{{ selectedFile.name }}</span>
            <span class="file-label-hint">ZIP files only (max. 50MB)</span>
          </label>
        </div>
        <button type="submit" class="btn-submit" :disabled="!selectedFile">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          Jalankan Analisis
        </button>
      </form>
    </div>

    <!-- Analysis Results -->
    <div class="table-card">
      <div class="table-header">
        <h3 class="table-title">Hasil Analisis Spasial</h3>
        <button class="btn-export">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Export Data
        </button>
      </div>

      <div class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Jumlah Fitur</th>
              <th>Luas (Ha)</th>
              <th>Status Izin</th>
              <th>Persentase</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in analysisResults" :key="item.id">
              <td>
                <div class="layer-info">
                  <span class="layer-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                  </span>
                  <span class="layer-name">{{ item.layer }}</span>
                </div>
              </td>
              <td class="feature-count">{{ item.fitur }}</td>
              <td class="area-cell">{{ item.luas.toFixed(1) }} Ha</td>
              <td>
                <span :class="['badge', `badge-${getStatusColor(item.status)}`]">{{ item.status }}</span>
              </td>
              <td>
                <div class="progress-container">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: item.persentase + '%' }"></div>
                  </div>
                  <span class="progress-text">{{ item.persentase }}%</span>
                </div>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="btn-icon" title="View on Map">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Download">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Details">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Map Section -->
    <div class="map-card">
      <div class="map-header">
        <h3 class="map-title">Peta Hasil Overlay Analisis</h3>
        <div class="map-controls">
          <button class="btn-control active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Layers
          </button>
          <button class="btn-control">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            3D View
          </button>
        </div>
      </div>
      <div id="map" ref="mapContainer" class="map-container"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement | null>(null)
const selectedFile = ref<File | null>(null)

const stats = ref({
  total: 89,
  layak: 62,
  review: 15,
  tidakLayak: 12
})

const analysisResults = ref([
  { id: 1, layer: 'ZNT_A', fitur: 34, luas: 125.7, status: 'Layak', persentase: 85 },
  { id: 2, layer: 'HGU_Expired', fitur: 12, luas: 49.3, status: 'Perlu Review', persentase: 45 },
  { id: 3, layer: 'Kawasan_Lindung', fitur: 7, luas: 301.9, status: 'Tidak Layak', persentase: 15 },
  { id: 4, layer: 'Zona_Industri', fitur: 28, luas: 87.4, status: 'Layak', persentase: 92 },
  { id: 5, layer: 'Area_Konservasi', fitur: 8, luas: 156.2, status: 'Perlu Review', persentase: 38 },
])

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0 && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

const handleSubmit = () => {
  if (selectedFile.value) {
    alert(`Analyzing ${selectedFile.value.name}...`)
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Layak': return 'success'
    case 'Perlu Review': return 'warning'
    case 'Tidak Layak': return 'danger'
    default: return 'secondary'
  }
}

onMounted(() => {
  if (mapContainer.value) {
    const map = L.map(mapContainer.value).setView([-2.81, 121.6], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    // Sample overlay layers
    const inputLayer = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: { name: 'Area Input' },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [121.58, -2.81], [121.62, -2.81], [121.62, -2.78], [121.58, -2.78], [121.58, -2.81]
          ]]
        }
      }]
    }

    L.geoJSON(inputLayer as any, {
      style: { color: '#4F46E5', weight: 2, fillColor: '#4F46E5', fillOpacity: 0.2 }
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

.upload-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 32px;
  margin-bottom: 24px;
}

.upload-header {
  text-align: center;
  margin-bottom: 32px;
}

.upload-title {
  font-size: 20px;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 8px 0;
}

.upload-subtitle {
  font-size: 14px;
  color: #6B7280;
  margin: 0;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.file-input-wrapper {
  position: relative;
}

.file-input {
  display: none;
}

.file-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  border: 2px dashed #E5E7EB;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  background: #F9FAFB;
}

.file-label:hover {
  border-color: #4F46E5;
  background: #EEF2FF;
}

.file-label svg {
  color: #9CA3AF;
  margin-bottom: 16px;
}

.file-label-text {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}

.file-label-hint {
  font-size: 13px;
  color: #9CA3AF;
}

.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.table-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 24px;
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

.btn-export {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-export:hover {
  background: #4F46E5;
  color: white;
  border-color: transparent;
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

.layer-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.layer-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #EEF2FF;
  color: #4F46E5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layer-name {
  font-weight: 600;
  color: #1F2937;
}

.feature-count {
  font-weight: 600;
  color: #6B7280;
}

.area-cell {
  font-weight: 600;
  color: #10B981;
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

.badge-danger {
  background: #FEE2E2;
  color: #991B1B;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #F3F4F6;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  min-width: 40px;
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

.map-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
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
</style>
