<template>
  <div class="unified-land-map">
    <!-- Map Container -->
    <div class="map-card">
      <div class="row">
        
        <div class="flex col-md-12">
          <!-- Map Area -->
          <div class="map-area flex-1">
            <div id="dashboard-map" class="map-container" ref="mapContainer"></div>

            <!-- Map Loading -->
            <div v-if="loading" class="map-loading-overlay">
              <ProgressSpinner strokeWidth="3" />
              <span class="block mt-2 text-sm">Loading map data...</span>
            </div>


          </div>
        </div>
      </div>
    </div>
    <!-- </template> -->

    <!-- Fullscreen Dialog -->
    <Dialog v-model:visible="fullscreenVisible" :style="{ width: '95vw', height: '90vh' }" :modal="true"
      :showHeader="false">
      <div id="dashboard-map-fullscreen" class="map-container-fullscreen"></div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import MapLayerControl from './MapLayerControl.vue'
import { useDashboardData } from '@/composables/useDashboardData'
import { useLeafletMap } from '@/composables/useLeafletMap'
import L from 'leaflet'
import axios from 'axios'
import type { MapLayer, MapFilter } from '@/types/dashboard'
const apiUrl = import.meta.env.VITE_APP_API_SPATIAL_URL
const gsUrl = import.meta.env.VITE_APP_API_GS_URL
const { mapLayers } = useDashboardData()

const mapContainer = ref<HTMLElement | null>(null)
const loading = ref(true)
const fullscreenVisible = ref(false)
const layerControlCollapsed = ref(false)
const visibleParcels = ref(245)
const selectedParcels = ref(0)

interface ThemeMap {
  nama_map: string
  tbl_name: string
  style: string
}

interface Raster {
  nama: string
  tbl_name?: string
}

const listThemeMap = ref<ThemeMap[]>([])
const listRaster = ref<Raster[]>([])

async function fetchThemeMap() {
  const res = await axios.get(`${apiUrl}/LandInventoryThemeMap`)
  listThemeMap.value = res.data
}
async function fetchRaster() {
  const res = await axios.get(`${apiUrl}/LandInventoryRaster`)
  listRaster.value = res.data
}
// Map filters
const mapFilters = ref<MapFilter>({
  desa: [],
  project: [],
  status: []
})

// Map legends (mock data - would come from API)
const mapLegends = computed(() => [
  { label: 'Lahan Bebas', color: '#22c55e', count: 180 },
  { label: 'Dalam Proses', color: '#eab308', count: 52 },
  { label: 'Sengketa', color: '#ef4444', count: 8 },
  { label: 'Belum Diproses', color: '#6b7280', count: 5 }
])

// Initialize map
let map: L.Map | null = null
onMounted(async () => {
  await fetchThemeMap()
  await fetchRaster()
})
onMounted(() => {

  if (mapContainer.value) {
    // Initialize Leaflet map
    map = L.map(mapContainer.value, {
      center: [-2.5, 121.0],
      zoom: 10,
      zoomControl: true
    })

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)
    const wmsLayer = L.tileLayer.wms(
      gsUrl + "/raster_valemis/wms",
      {
        layers: "raster_valemis:orthophoto_mbb1",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      }
    );

    wmsLayer.addTo(map);

    // const wmsLayerHutan = L.tileLayer.wms(
    //   gsUrl+"/vector_valemis/wms",
    //   {
    //     layers: "		vector_valemis:theme_7e0f4b08",
    //     format: "image/png",
    //     transparent: true,
    //     styles:"Style Kawasan Hutan",
    //     version: "1.1.0"
    //   }
    // );

    // wmsLayerHutan.addTo(map);

    const wmsLayerBatas = L.tileLayer.wms(
      gsUrl + "/vector_valemis/wms",
      {
        layers: "	vector_valemis:theme_ea895991",
        format: "image/png",
        transparent: true,
        styles: "Style Batas Desa",
        version: "1.1.0"
      }
    );

    wmsLayerBatas.addTo(map);
    const wmsLayerIUPK = L.tileLayer.wms(
      gsUrl + "/vector_valemis/wms",
      {
        layers: "	vector_valemis:theme_eab3f65a",
        format: "image/png",
        transparent: true,
        version: "1.1.0",
        styles: "sld_iupk_3",
        crs: L.CRS.EPSG4326,
      }
    );

    wmsLayerIUPK.addTo(map);

    // const wmsLayerAcquisition = L.tileLayer.wms(
    //   gsUrl + "/vector_valemis/wms",
    //   {
    //     layers: "	vector_valemis:tbl_acquisition",
    //     format: "image/png",
    //     transparent: true,
    //     version: "1.1.0",
    //     styles: "sld_persil",
    //     crs: L.CRS.EPSG4326,
    //   }
    // );

    // wmsLayerAcquisition.addTo(map);
    const wmsLayerAsset = L.tileLayer.wms(
      gsUrl + "/vector_valemis/wms",
      {
        layers: "	vector_valemis:census_kepala_keluarga",
        format: "image/png",
        transparent: true,
        version: "1.1.0",
        styles: "sld_asset_point",
        crs: L.CRS.EPSG4326,
      }
    );

    wmsLayerAsset.addTo(map);

    const wmsLayerProject = L.tileLayer.wms(
      gsUrl + "/vector_valemis/wms",
      {
        layers: "	vector_valemis:tbl_project",
        format: "image/png",
        transparent: true,
        version: "1.1.0",
        styles: "sld_projek",
        crs: L.CRS.EPSG4326,
      }
    );

    wmsLayerProject.addTo(map);
    // Add sample data (in real implementation, this would come from API)
    addSampleLayers()

    // Simulate loading
    setTimeout(() => {
      loading.value = false
    }, 1500)
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})

// Add sample layers
const addSampleLayers = () => {
  if (!map) return

}

// Handle layer toggle
const handleToggleLayer = (layerId: string) => {
  console.log('Toggle layer:', layerId)
  // In real implementation, show/hide layer on map
}

// Handle filter update
const handleUpdateFilter = (type: string, value: any) => {
  console.log('Update filter:', type, value)
  // In real implementation, filter map data
}

// Handle reset filters
const handleResetFilters = () => {
  mapFilters.value = {
    desa: [],
    project: [],
    status: []
  }
  // In real implementation, reset map to show all data
}

// Handle fit bounds
const handleFitBounds = () => {
  if (map) {
    map.fitBounds([
      [-2.6, 120.95],
      [-2.4, 121.3]
    ])
  }
}

// Handle fullscreen
const handleFullscreen = () => {
  fullscreenVisible.value = true

  // Initialize fullscreen map after dialog opens
  setTimeout(() => {
    const fullscreenContainer = document.getElementById('dashboard-map-fullscreen')
    if (fullscreenContainer && !map) {
      const fullscreenMap = L.map(fullscreenContainer, {
        center: [-2.5, 121.0],
        zoom: 10
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(fullscreenMap)

      // Add same layers
      addSampleLayersToMap(fullscreenMap)
    }
  }, 100)
}

// Handle zoom in
const handleZoomIn = () => {
  if (map) {
    map.zoomIn()
  }
}

// Handle zoom out
const handleZoomOut = () => {
  if (map) {
    map.zoomOut()
  }
}

// Add sample layers to any map instance
const addSampleLayersToMap = (targetMap: L.Map) => {
  // Reuse the same layer logic
  // In real implementation, this would be a shared function
}

// Handle export map
const handleExportMap = () => {
  if (map) {
    // In real implementation, export map as image
    console.log('Exporting map...')
  }
}
</script>

<style scoped>
.unified-land-map {
  margin-bottom: 2.5rem;
}

.map-card {
  overflow: hidden;
  background-color: white;
  box-shadow: black;
  border-radius: 1rem;
}

.map-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.search-input {
  width: 250px;
}

.map-area {
  position: relative;
  height: 600px;
}

.map-container {
  width: 100%;
  height: 100%;
  border-radius: 0;
  z-index: 1;
}

.map-container-fullscreen {
  width: 100%;
  height: 100%;
}

.map-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border-radius: 0 0 12px 12px;
}

.map-temperature-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

:deep(.p-card) {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

:deep(.p-card-content) {
  padding: 0;
}

:deep(.p-card:hover) {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

:deep(.p-inputtext) {
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 0.5rem 0.75rem;
}

@media (max-width: 768px) {
  .map-toolbar {
    flex-direction: column;
    gap: 0.75rem;
  }

  .search-input {
    width: 100%;
  }

  .map-area {
    height: 400px;
  }
}
</style>
