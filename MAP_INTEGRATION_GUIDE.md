# 🗺️ Map Integration Guide - Leaflet/OpenLayers

## Current Status
Map area sudah disiapkan dengan visual placeholder yang menampilkan sample polygon dan controls. Ready untuk integrasi dengan library GIS.

---

## 📦 Recommended Libraries

### Option 1: Leaflet (Recommended) ⭐
**Pros:**
- Lightweight (~40KB)
- Easy to use
- Large plugin ecosystem
- Mobile-friendly
- Excellent documentation

**Installation:**
```bash
npm install leaflet
npm install @types/leaflet --save-dev
```

**Import in component:**
```typescript
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
```

---

### Option 2: OpenLayers
**Pros:**
- More features out of the box
- Better for complex GIS applications
- Excellent projection support
- Advanced rendering capabilities

**Installation:**
```bash
npm install ol
```

**Import in component:**
```typescript
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
```

---

## 🚀 Quick Start - Leaflet Integration

### Step 1: Install Dependencies
```bash
npm install leaflet
npm install @types/leaflet --save-dev
```

### Step 2: Update PendataanGeospatialLahanBebas.vue

Replace the map placeholder section with:

```vue
<template>
  <!-- ... existing code ... -->
  
  <div class="col-md-9">
    <div ref="mapContainer" class="map-container" style="height: 600px;"></div>
  </div>
  
  <!-- ... existing code ... -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null

onMounted(() => {
  if (mapContainer.value) {
    // Initialize map
    map = L.map(mapContainer.value).setView([-2.5325, 121.3586], 13)
    
    // Add tile layer (basemap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)
    
    // Add sample polygons
    addSamplePolygons()
    
    // Add controls
    addMapControls()
  }
})

const addSamplePolygons = () => {
  if (!map) return
  
  // Polygon 1 - Bebas (Green)
  const polygon1 = L.polygon([
    [-2.5320, 121.3580],
    [-2.5318, 121.3590],
    [-2.5325, 121.3595],
    [-2.5330, 121.3585]
  ], {
    color: '#28a745',
    fillColor: '#28a745',
    fillOpacity: 0.5,
    weight: 2
  }).addTo(map)
  
  polygon1.bindPopup('<strong>LBB-001</strong><br>Status: Bebas<br>Luas: 2.5 Ha')
  
  // Add more polygons for other data...
}

const addMapControls = () => {
  if (!map) return
  
  // Add scale control
  L.control.scale({ position: 'bottomright' }).addTo(map)
  
  // Add custom controls as needed
}
</script>
```

---

## 🎨 Styling Polygons by Status

```typescript
const getPolygonStyle = (status: string) => {
  const styles: Record<string, any> = {
    'bebas': {
      color: '#28a745',
      fillColor: '#28a745',
      fillOpacity: 0.5
    },
    'nego': {
      color: '#ffc107',
      fillColor: '#ffc107',
      fillOpacity: 0.5
    },
    'belum': {
      color: '#dc3545',
      fillColor: '#dc3545',
      fillOpacity: 0.5
    }
  }
  return styles[status] || styles['belum']
}

// Usage:
const polygon = L.polygon(coordinates, getPolygonStyle('bebas')).addTo(map)
```

---

## 📍 Loading GeoJSON Data

```typescript
const loadGeoJSONData = async () => {
  try {
    const response = await fetch('/api/land-data/geojson')
    const geojsonData = await response.json()
    
    L.geoJSON(geojsonData, {
      style: (feature) => {
        return getPolygonStyle(feature.properties.status)
      },
      onEachFeature: (feature, layer) => {
        const popupContent = `
          <strong>${feature.properties.kode}</strong><br>
          Lokasi: ${feature.properties.lokasi}<br>
          Status: ${feature.properties.status}<br>
          Luas: ${feature.properties.luas} Ha
        `
        layer.bindPopup(popupContent)
      }
    }).addTo(map!)
  } catch (error) {
    console.error('Error loading GeoJSON:', error)
  }
}
```

---

## 🔧 Map Controls Implementation

### Zoom Controls
```typescript
const zoomIn = () => {
  map?.zoomIn()
}

const zoomOut = () => {
  map?.zoomOut()
}

const resetView = () => {
  map?.setView([-2.5325, 121.3586], 13)
}
```

### Layer Toggle
```typescript
const toggleLayer = (layerId: number, visible: boolean) => {
  // Implement layer visibility toggle
  // Store layers in a Map or object for easy access
}
```

### Location Picker for Project Input
```typescript
const enableLocationPicker = () => {
  if (!map) return
  
  map.on('click', (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng
    projectForm.value.koordinat = `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    
    // Add marker
    L.marker([lat, lng])
      .addTo(map!)
      .bindPopup('Selected Location')
      .openPopup()
  })
}
```

---

## 📦 Useful Leaflet Plugins

### 1. Leaflet Draw
For drawing and editing features:
```bash
npm install leaflet-draw
```

### 2. Leaflet.markercluster
For clustering markers:
```bash
npm install leaflet.markercluster
```

### 3. Leaflet.heat
For heatmap visualization:
```bash
npm install leaflet.heat
```

### 4. Leaflet-fullscreen
For fullscreen control:
```bash
npm install leaflet-fullscreen
```

---

## 🗂️ File Structure After Integration

```
src/
  views/
    PendataanGeospatialLahanBebas.vue  (with map integration)
  composables/
    useMap.ts                          (map initialization logic)
    useGeoJSON.ts                      (GeoJSON loading logic)
  utils/
    mapHelpers.ts                      (helper functions)
  types/
    map.types.ts                       (TypeScript interfaces)
```

---

## 📊 Sample Data Structure

```typescript
interface LandFeature {
  type: 'Feature'
  geometry: {
    type: 'Polygon'
    coordinates: number[][][]
  }
  properties: {
    kode: string
    lokasi: string
    status: 'bebas' | 'nego' | 'belum'
    luas: number
    pemilik: string
    koordinat: string
  }
}

interface GeoJSONData {
  type: 'FeatureCollection'
  features: LandFeature[]
}
```

---

## 🎯 Integration Checklist

- [ ] Install Leaflet/OpenLayers
- [ ] Create map container ref
- [ ] Initialize map on mount
- [ ] Add basemap tile layer
- [ ] Load GeoJSON data from API
- [ ] Style polygons by status
- [ ] Add popup/tooltip interactions
- [ ] Implement zoom controls
- [ ] Implement layer toggle
- [ ] Add location picker for project input
- [ ] Add legend
- [ ] Add scale control
- [ ] Test on mobile devices
- [ ] Optimize performance for large datasets

---

## 🚨 Common Issues & Solutions

### Issue 1: Map tiles not loading
**Solution:** Check CORS settings, use HTTPS for tile servers

### Issue 2: Markers not appearing
**Solution:** Import marker icons properly:
```typescript
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})
L.Marker.prototype.options.icon = DefaultIcon
```

### Issue 3: Map container size issues
**Solution:** Ensure parent has explicit height, call `map.invalidateSize()`

---

## 📚 Resources

- **Leaflet Docs:** https://leafletjs.com/reference.html
- **Leaflet Tutorials:** https://leafletjs.com/examples.html
- **OpenLayers Docs:** https://openlayers.org/en/latest/apidoc/
- **GeoJSON Spec:** https://geojson.org/

---

**Status:** Ready for Integration  
**Priority:** High  
**Estimated Time:** 2-4 hours
