<template>
  <div>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 600px; width: 100%"
    >
      <ol-view
        :center="center"
        :zoom="zoom"
        :projection="projection"
      />

      <!-- Base map -->
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>

      <!-- Main editable vector layer -->
      <ol-vector-layer ref="vectorLayer">
        <ol-source-vector ref="vectorSource">
          <!-- Drawing interaction -->
          <ol-interaction-draw
            v-if="drawEnabled"
            type="Polygon"
            @drawend="onDrawEnd"
          />

          <!-- Modify interaction (works on all selected features) -->
          <ol-interaction-modify
            :features="selectedFeatures"
            @modifyend="onModifyEnd"
          >
            <ol-style>
              <ol-style-circle :radius="6">
                <ol-style-fill color="#00ffcc" />
              </ol-style-circle>
              <ol-style-stroke color="#0066ff" :width="3" />
            </ol-style>
          </ol-interaction-modify>

          <!-- Default style for all features -->
          <ol-style>
            <ol-style-polygon>
              <ol-style-fill color="rgba(32, 128, 255, 0.25)" />
              <ol-style-stroke color="#1e90ff" :width="2" />
            </ol-style-polygon>
          </ol-style>
        </ol-source-vector>
      </ol-vector-layer>
    </ol-map>

    <div style="margin: 12px 0; display: flex; gap: 16px; flex-wrap: wrap;">
      <input type="file" accept=".zip" @change="onFile" />

      <button @click="toggleDraw">
        {{ drawEnabled ? "Stop Drawing" : "Draw Polygon" }}
      </button>

      <button @click="clearAll">Clear All</button>
    </div>

    <!-- <h4>All Geometries (WKT):</h4> -->
    <!-- <pre style="max-height: 300px; overflow: auto; background: #f5f5f5; padding: 12px;">
{{ allGeometries.join('\n\n') }}</pre> -->
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { GeoJSON } from 'ol/format'
import { WKT } from 'ol/format'
import { Collection } from 'ol'
import shp from 'shpjs'

const props = defineProps({
  geometries: Array
})
const emit = defineEmits(['update'])

const center = ref([121.5, -2.5])
const projection = ref('EPSG:4326')
const zoom = ref(10)

const vectorSource = ref(null)
const allGeometries = ref([])
const selectedFeatures = ref(new Collection())
const drawEnabled = ref(false)

const geojsonFormat = new GeoJSON()
const wktFormat = new WKT()


const reportChange = () => {
  emit('update', [...allGeometries.value])
}

// Toggle drawing mode
const toggleDraw = () => {
  drawEnabled.value = !drawEnabled.value
}

// When a new feature is drawn
const onDrawEnd = (event) => {
  const feature = event.feature
  const geom = feature.getGeometry()

  const wktString = wktFormat.writeGeometry(geom)
  allGeometries.value.push(wktString)

  // Auto-select the new feature for immediate editing
  selectedFeatures.value.clear()
  selectedFeatures.value.push(feature)
  reportChange()
  // Optional: turn off drawing after one polygon (you can remove this)
  // drawEnabled.value = false
}

// When modification is finished
const onModifyEnd = () => {
  allGeometries.value = []

  vectorSource.value.source.getFeatures().forEach((feature) => {
    const geom = feature.getGeometry()
    if (geom) {
      const wkt = wktFormat.writeGeometry(geom)
      allGeometries.value.push(wkt)
    }
  })
  reportChange()
}

// Upload & load shapefile (zip)
const onFile = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  if (!file.name.toLowerCase().endsWith('.zip')) {
    alert('Please upload a .zip shapefile!')
    return
  }

  try {
    const buffer = await file.arrayBuffer()
    const geojson = await shp(buffer)

    // Read features in EPSG:4326
    const features = geojsonFormat.readFeatures(geojson, {
      featureProjection: 'EPSG:4326'
    })

    // Clear previous features
    vectorSource.value.source.clear()

    // Add new features
    vectorSource.value.source.addFeatures(features)

    // Update WKT list
    updateAllWKT()

    // Optional: select all uploaded features
    selectedFeatures.value.clear()
    features.forEach(f => selectedFeatures.value.push(f))

  } catch (err) {
    console.error('Error loading shapefile:', err)
    alert('Failed to load shapefile. Check console for details.')
  }
  reportChange()
}

// Helper: update all geometries array from current source
const updateAllWKT = () => {
  allGeometries.value = vectorSource.value.source
    .getFeatures()
    .map(f => {
      const geom = f.getGeometry()
      return geom ? wktFormat.writeGeometry(geom) : ''
    })
    .filter(Boolean)
}
// const selectedToDelete(){

// }

// Clear everything
const clearAll = () => {
  vectorSource.value.source.clear()
  allGeometries.value = []
  selectedFeatures.value.clear()
  drawEnabled.value = false
  reportChange()
}
</script>