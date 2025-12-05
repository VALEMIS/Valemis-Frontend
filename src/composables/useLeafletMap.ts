import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl
})

export interface MapOptions {
  center: [number, number]
  zoom: number
  minZoom?: number
  maxZoom?: number
}

export interface PolygonData {
  id: string | number
  coordinates: [number, number][]
  status: 'bebas' | 'nego' | 'belum'
  properties: {
    kode: string
    lokasi: string
    luas: number
    pemilik?: string
    [key: string]: any
  }
}

export function useLeafletMap(
  containerRef: Ref<HTMLElement | null>,
  options: MapOptions = { center: [-2.5325, 121.3586], zoom: 13 }
) {
  const map = ref<L.Map | null>(null)
  const layers = ref<Map<string, L.Layer>>(new Map())
  const isReady = ref(false)

  const getPolygonStyle = (status: string): L.PathOptions => {
    const styles: Record<string, L.PathOptions> = {
      bebas: {
        color: '#28a745',
        fillColor: '#28a745',
        fillOpacity: 0.5,
        weight: 2
      },
      nego: {
        color: '#ffc107',
        fillColor: '#ffc107',
        fillOpacity: 0.5,
        weight: 2
      },
      belum: {
        color: '#dc3545',
        fillColor: '#dc3545',
        fillOpacity: 0.5,
        weight: 2
      }
    }
    const defaultStyle: L.PathOptions = {
      color: '#dc3545',
      fillColor: '#dc3545',
      fillOpacity: 0.5,
      weight: 2
    }
    return styles[status] || defaultStyle
  }

  const initMap = () => {
    if (!containerRef.value) return

    try {
      // Create map
      map.value = L.map(containerRef.value, {
        minZoom: options.minZoom || 10,
        maxZoom: options.maxZoom || 18
      }).setView(options.center, options.zoom)

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map.value as L.Map)

      // Add scale control
      L.control.scale({ position: 'bottomright' }).addTo(map.value as L.Map)

      isReady.value = true
    } catch (error) {
      console.error('Error initializing map:', error)
    }
  }

  const addPolygon = (data: PolygonData) => {
    if (!map.value) return null

    const polygon = L.polygon(data.coordinates, getPolygonStyle(data.status))
    
    // Add popup
    const popupContent = `
      <div style="min-width: 150px;">
        <strong>${data.properties.kode}</strong><br>
        <small>Lokasi: ${data.properties.lokasi}</small><br>
        <small>Luas: ${data.properties.luas} Ha</small><br>
        <small>Status: <span style="color: ${getPolygonStyle(data.status).color}">${
          data.status === 'bebas' ? 'Bebas' : 
          data.status === 'nego' ? 'Negosiasi' : 'Belum Proses'
        }</span></small>
        ${data.properties.pemilik ? `<br><small>Pemilik: ${data.properties.pemilik}</small>` : ''}
      </div>
    `
    
    polygon.bindPopup(popupContent)
    polygon.addTo(map.value as L.Map)
    
    // Store layer reference
    layers.value.set(`polygon-${data.id}`, polygon)
    
    return polygon
  }

  const addMarker = (
    latlng: [number, number],
    popupContent?: string,
    id?: string
  ) => {
    if (!map.value) return null

    const marker = L.marker(latlng).addTo(map.value as L.Map)
    
    if (popupContent) {
      marker.bindPopup(popupContent)
    }
    
    if (id) {
      layers.value.set(`marker-${id}`, marker)
    }
    
    return marker
  }

  const removeLayer = (id: string) => {
    const layer = layers.value.get(id)
    if (layer && map.value) {
      (map.value as L.Map).removeLayer(layer as L.Layer)
      layers.value.delete(id)
    }
  }

  const clearAllLayers = () => {
    layers.value.forEach((layer) => {
      if (map.value) {
        (map.value as L.Map).removeLayer(layer as L.Layer)
      }
    })
    layers.value.clear()
  }

  const fitBounds = (bounds: L.LatLngBoundsExpression) => {
    map.value?.fitBounds(bounds, { padding: [50, 50] })
  }

  const zoomIn = () => {
    map.value?.zoomIn()
  }

  const zoomOut = () => {
    map.value?.zoomOut()
  }

  const resetView = () => {
    map.value?.setView(options.center, options.zoom)
  }

  const enableLocationPicker = (callback: (latlng: L.LatLng) => void) => {
    if (!map.value) return

    const handler = (e: L.LeafletMouseEvent) => {
      callback(e.latlng)
    }

    map.value.on('click', handler)

    // Return cleanup function
    return () => {
      map.value?.off('click', handler)
    }
  }

  const addGeoJSON = (geojsonData: any, styleFunction?: (feature: any) => L.PathOptions) => {
    if (!map.value) return null

    const geoJsonLayer = L.geoJSON(geojsonData, {
      style: styleFunction,
      onEachFeature: (feature, layer) => {
        if (feature.properties) {
          const popupContent = `
            <div style="min-width: 150px;">
              <strong>${feature.properties.kode || 'N/A'}</strong><br>
              ${Object.entries(feature.properties)
                .filter(([key]) => key !== 'kode')
                .map(([key, value]) => `<small>${key}: ${value}</small>`)
                .join('<br>')}
            </div>
          `
          layer.bindPopup(popupContent)
        }
      }
    }).addTo(map.value as L.Map)

    return geoJsonLayer
  }

  onMounted(() => {
    // Delay to ensure DOM is ready
    setTimeout(() => {
      initMap()
    }, 100)
  })

  onUnmounted(() => {
    if (map.value) {
      map.value.remove()
      map.value = null
    }
  })

  return {
    map,
    layers,
    isReady,
    addPolygon,
    addMarker,
    removeLayer,
    clearAllLayers,
    fitBounds,
    zoomIn,
    zoomOut,
    resetView,
    enableLocationPicker,
    addGeoJSON,
    getPolygonStyle
  }
}
