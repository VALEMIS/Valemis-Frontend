<template>
  <div class="map-viewer-wrapper">
    <div class="map-container" :style="{ height: height }">
      <!-- Map Placeholder - Will be replaced with actual map library (Leaflet, OpenLayers, etc.) -->
      <div class="map-placeholder">
        <div class="text-center">
          <i class="bi bi-map" style="font-size: 3rem; color: #6c757d;"></i>
          <p class="mt-2 mb-1">{{ title }}</p>
          <small v-if="description" class="text-muted">{{ description }}</small>
        </div>
      </div>

      <!-- Map Controls -->
      <div v-if="showControls" class="map-controls">
        <div class="btn-group-vertical">
          <button
            class="btn btn-light btn-sm"
            @click="zoomIn"
            title="Zoom In"
          >
            <i class="bi bi-plus"></i>
          </button>
          <button
            class="btn btn-light btn-sm"
            @click="zoomOut"
            title="Zoom Out"
          >
            <i class="bi bi-dash"></i>
          </button>
          <button
            class="btn btn-light btn-sm"
            @click="fullExtent"
            title="Full Extent"
          >
            <i class="bi bi-arrows-fullscreen"></i>
          </button>
          <button
            v-if="showLocationControl"
            class="btn btn-light btn-sm"
            @click="myLocation"
            title="My Location"
          >
            <i class="bi bi-geo-alt"></i>
          </button>
        </div>
      </div>

      <!-- Custom Legend -->
      <div v-if="showLegend && legendItems.length > 0" class="map-legend">
        <h6 class="mb-2">{{ legendTitle }}</h6>
        <div
          v-for="item in legendItems"
          :key="item.id"
          class="legend-item"
        >
          <div
            class="legend-color"
            :style="{ background: item.color }"
          ></div>
          <span>{{ item.label }}</span>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div v-if="loading" class="map-loading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface LegendItem {
  id: string | number
  label: string
  color: string
}

interface Props {
  height?: string
  title?: string
  description?: string
  showControls?: boolean
  showLocationControl?: boolean
  showLegend?: boolean
  legendTitle?: string
  legendItems?: LegendItem[]
  center?: [number, number]
  zoom?: number
}

withDefaults(defineProps<Props>(), {
  height: '400px',
  title: 'Interactive Map Viewer',
  description: '',
  showControls: true,
  showLocationControl: true,
  showLegend: true,
  legendTitle: 'Legend',
  legendItems: () => [],
  center: () => [-2.5325, 121.3586], // Default: Sorowako coordinates
  zoom: 12
})

const emit = defineEmits<{
  zoomIn: []
  zoomOut: []
  fullExtent: []
  myLocation: []
  ready: []
}>()

const loading = ref(false)

onMounted(() => {
  // Initialize map here
  // Example: Initialize Leaflet, OpenLayers, or other map library
  initializeMap()
})

const initializeMap = () => {
  loading.value = true
  
  // Simulate map loading
  setTimeout(() => {
    loading.value = false
    emit('ready')
    
    // TODO: Initialize actual map library
    // Example for Leaflet:
    // const map = L.map('map').setView(props.center, props.zoom)
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
  }, 500)
}

const zoomIn = () => {
  emit('zoomIn')
  // TODO: Implement actual zoom in
}

const zoomOut = () => {
  emit('zoomOut')
  // TODO: Implement actual zoom out
}

const fullExtent = () => {
  emit('fullExtent')
  // TODO: Implement full extent
}

const myLocation = () => {
  emit('myLocation')
  // TODO: Implement get current location
}

// Expose methods for parent components
defineExpose({
  zoomIn,
  zoomOut,
  fullExtent,
  myLocation
})
</script>

<style scoped>
.map-viewer-wrapper {
  position: relative;
  width: 100%;
}

.map-container {
  position: relative;
  width: 100%;
  background: #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.map-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
}

.map-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
}

.map-controls .btn {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.map-legend {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 250px;
}

.map-legend h6 {
  margin-bottom: 10px;
  font-weight: 600;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.legend-item:last-child {
  margin-bottom: 0;
}

.legend-color {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 3px;
  border: 1px solid #dee2e6;
}

.map-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
</style>
