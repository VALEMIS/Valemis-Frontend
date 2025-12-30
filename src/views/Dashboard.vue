<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Dashboard - Overview</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="bi bi-house-fill"></i></router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <!-- Statistics Cards -->
        <div class="row">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                <h3>53<sup style="font-size: 20px">Ha</sup></h3>
                <p>Total Area Lahan Vale</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-success">
              <div class="inner">
                <h3>15<sup style="font-size: 20px"> Desa</sup></h3>
                <p>Desa Terdampak Project</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>8<sup style="font-size: 20px"> Project</sup></h3>
                <p>Active Projects</p>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>78<sup style="font-size: 20px">%</sup></h3>
                <p>Progress Akuisisi</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Map Section - Interactive Map -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="bi bi-map"></i> Peta Seluruh Project Vale
                </h3>
                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="maximize">
                    <i class="fas fa-expand"></i>
                  </button>
                </div>
              </div>
              <div class="card-body">
                <!-- Leaflet Map Container -->
                <div id="map" ref="mapContainer" style="height: 600px; border-radius: 8px;"></div>
                
                <!-- Legend -->
                <div class="map-legend">
                  <h6 class="mb-3"><i class="bi bi-info-circle"></i> Keterangan</h6>
                  <div class="legend-item">
                    <div class="legend-symbol" style="border: 3px dashed #dc3545; background: rgba(220, 53, 69, 0.05);"></div>
                    <span class="legend-text"><strong>Total Lahan Vale</strong> <span class="badge bg-secondary">1 Area</span></span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-symbol" style="border: 2px solid #dc3545; background: rgba(220, 53, 69, 0.3);"></div>
                    <span class="legend-text"><strong>Desa Terdampak</strong> <span class="badge bg-danger">4 Desa</span></span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-symbol" style="border: 3px solid #800080; background: rgba(128, 0, 128, 0.25);"></div>
                    <span class="legend-text"><strong>Area Project</strong> <span class="badge bg-purple">3 Project</span></span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-symbol" style="background: #000; border: 2px solid #fff; border-radius: 50%; width: 12px; height: 12px;"></div>
                    <span class="legend-text"><strong>Titik Rumah</strong> <span class="badge bg-dark">16 Unit</span></span>
                  </div>
                  <div class="mt-3 text-muted small legend-hint">
                    <i class="bi bi-hand-index"></i> Klik pada area atau titik untuk melihat detail
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detail Panel -->
        <div v-if="selectedItem" class="row mt-3">
          <div class="col-12">
            <div class="card">
              <div class="card-header" :class="getHeaderClass()">
                <h3 class="card-title text-white">
                  <i :class="getIconClass()"></i> {{ selectedItem.name }}
                </h3>
                <div class="card-tools">
                  <button type="button" class="btn btn-tool text-white" @click="selectedItem = null">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <h5>Informasi Detail</h5>
                    <DataTable :value="Object.entries(selectedItem.details).map(([key, value]) => ({ key, value }))" stripedRows size="small">
                      <Column field="key" header="Field" style="width: 40%">
                        <template #body="{ data }">
                          <strong>{{ data.key }}</strong>
                        </template>
                      </Column>
                      <Column field="value" header="Value"></Column>
                    </DataTable>
                  </div>
                  <div class="col-md-6">
                    <div v-if="selectedItem.type === 'village'" class="alert alert-info">
                      <h6><i class="bi bi-lightbulb"></i> Info Desa</h6>
                      <p class="mb-1">Desa ini merupakan bagian dari <strong>Asset Inventory</strong> dengan {{ selectedItem.details['Jumlah KK'] }} kepala keluarga yang tercatat.</p>
                      <p class="mb-0"><small>Klik titik rumah untuk melihat detail kepemilikan.</small></p>
                    </div>
                    <div v-if="selectedItem.type === 'project'" class="alert alert-warning">
                      <h6><i class="bi bi-exclamation-triangle"></i> Info Project</h6>
                      <p class="mb-1">Area project ini sedang dalam tahap <strong>{{ selectedItem.details['Status'] }}</strong>.</p>
                      <p class="mb-0"><small>Desa terdampak: {{ selectedItem.details['Desa Terdampak'] }}</small></p>
                    </div>
                    <div v-if="selectedItem.type === 'house'" class="alert alert-success">
                      <h6><i class="bi bi-house-check"></i> Info Rumah</h6>
                      <p class="mb-1">Data detail kepemilikan dan status negosiasi tersedia di <strong>Land Acquisition</strong> module.</p>
                      <p class="mb-0">
                        <router-link to="/land-acquisition" class="btn btn-sm btn-primary">
                          <i class="bi bi-arrow-right-circle"></i> Lihat di Land Acquisition
                        </router-link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="row mt-3">
          <div class="col-md-3">
            <div class="info-box">
              <span class="info-box-icon bg-info"><i class="bi bi-file-earmark-text"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Asset Inventory</span>
                <span class="info-box-number">156 Parcels</span>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="info-box">
              <span class="info-box-icon bg-success"><i class="bi bi-check-circle"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Land Bebas</span>
                <span class="info-box-number">78 Parcels</span>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="info-box">
              <span class="info-box-icon bg-warning"><i class="bi bi-clock-history"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Dalam Negosiasi</span>
                <span class="info-box-number">45 Parcels</span>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="info-box">
              <span class="info-box-icon bg-danger"><i class="bi bi-exclamation-triangle"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Litigasi</span>
                <span class="info-box-number">12 Cases</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

interface SelectedItem {
  type: 'village' | 'project' | 'house'
  name: string
  details: Record<string, string>
}

const selectedItem = ref<SelectedItem | null>(null)
const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null

// Koordinat center untuk area Vale Indonesia (area tambang, selatan Sorowako)
const valeCenter: [number, number] = [-2.5650, 121.3450]

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})

const initMap = () => {
  if (!mapContainer.value) return

  // Initialize map
  map = L.map('map').setView(valeCenter, 14)

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)

  // Total Vale Land Area (Large irregular polygon with dashed border)
  // Area tambang Vale di selatan, menghindari kota Sorowako dan bandara
  const valeTotalArea = [
    [-2.555, 121.338],
    [-2.556, 121.352],
    [-2.562, 121.355],
    [-2.569, 121.353],
    [-2.575, 121.348],
    [-2.576, 121.342],
    [-2.571, 121.336],
    [-2.564, 121.334],
    [-2.558, 121.336],
    [-2.555, 121.338]
  ] as [number, number][]

  L.polygon(valeTotalArea, {
    color: '#dc3545',
    weight: 3,
    opacity: 0.8,
    dashArray: '10, 10',
    fillColor: '#dc3545',
    fillOpacity: 0.05
  }).addTo(map)
    .bindPopup('<b>Total Lahan Vale</b><br>Luas: ~53 Ha')

  // Desa Sorowako - Irregular polygon (kiri atas, berdekatan)
  const desaSorowako = [
    [-2.558, 121.340],
    [-2.559, 121.344],
    [-2.562, 121.345],
    [-2.563, 121.343],
    [-2.561, 121.339],
    [-2.559, 121.339],
    [-2.558, 121.340]
  ] as [number, number][]

  const desaSorowakoPolygon = L.polygon(desaSorowako, {
    color: '#dc3545',
    weight: 2,
    fillColor: '#dc3545',
    fillOpacity: 0.3
  }).addTo(map)

  desaSorowakoPolygon.on('click', () => {
    selectArea('village', 'Desa Sorowako')
  })

  desaSorowakoPolygon.bindPopup('<b>Desa Sorowako</b><br>12 KK<br><small>Klik untuk detail</small>')

  // Add house markers for Desa Sorowako (dengan nama pemilik)
  const housesSorowako = [
    { pos: [-2.5595, 121.3415] as [number, number], owner: 'Budi Santoso' },
    { pos: [-2.5605, 121.3425] as [number, number], owner: 'Ahmad Hidayat' },
    { pos: [-2.5615, 121.3435] as [number, number], owner: 'Siti Rahma' },
    { pos: [-2.5610, 121.3410] as [number, number], owner: 'Joko Widodo' }
  ]
  addHouseMarkersWithOwner(map, housesSorowako, 'Desa Sorowako')

  // Desa Magani - Irregular polygon (kanan atas, berhimpitan dengan Sorowako)
  const desaMagani = [
    [-2.559, 121.345],
    [-2.560, 121.349],
    [-2.563, 121.350],
    [-2.564, 121.347],
    [-2.562, 121.344],
    [-2.560, 121.344],
    [-2.559, 121.345]
  ] as [number, number][]

  const desaMaganiPolygon = L.polygon(desaMagani, {
    color: '#dc3545',
    weight: 2,
    fillColor: '#dc3545',
    fillOpacity: 0.3
  }).addTo(map)

  desaMaganiPolygon.on('click', () => {
    selectArea('village', 'Desa Magani')
  })

  desaMaganiPolygon.bindPopup('<b>Desa Magani</b><br>15 KK<br><small>Klik untuk detail</small>')

  // Add house markers for Desa Magani
  const housesMagani = [
    { pos: [-2.5605, 121.3465] as [number, number], owner: 'Andi Suryanto' },
    { pos: [-2.5615, 121.3475] as [number, number], owner: 'Maria Ulfa' },
    { pos: [-2.5620, 121.3485] as [number, number], owner: 'Hasan Basri' },
    { pos: [-2.5612, 121.3460] as [number, number], owner: 'Ratna Dewi' }
  ]
  addHouseMarkersWithOwner(map, housesMagani, 'Desa Magani')

  // Desa Wewangriu - Irregular polygon (bawah kiri, berhimpitan)
  const desaWewangriu = [
    [-2.567, 121.341],
    [-2.568, 121.345],
    [-2.571, 121.346],
    [-2.572, 121.343],
    [-2.570, 121.340],
    [-2.568, 121.340],
    [-2.567, 121.341]
  ] as [number, number][]

  const desaWewangriuPolygon = L.polygon(desaWewangriu, {
    color: '#dc3545',
    weight: 2,
    fillColor: '#dc3545',
    fillOpacity: 0.3
  }).addTo(map)

  desaWewangriuPolygon.on('click', () => {
    selectArea('village', 'Desa Wewangriu')
  })

  desaWewangriuPolygon.bindPopup('<b>Desa Wewangriu</b><br>18 KK<br><small>Klik untuk detail</small>')

  // Add house markers for Desa Wewangriu
  const housesWewangriu = [
    { pos: [-2.5685, 121.3425] as [number, number], owner: 'Usman Harun' },
    { pos: [-2.5695, 121.3435] as [number, number], owner: 'Fatimah Zahra' },
    { pos: [-2.5705, 121.3445] as [number, number], owner: 'Rahman Wiranto' },
    { pos: [-2.5698, 121.3420] as [number, number], owner: 'Nurul Huda' }
  ]
  addHouseMarkersWithOwner(map, housesWewangriu, 'Desa Wewangriu')

  // Desa Nikkel - Irregular polygon (bawah kanan, berhimpitan)
  const desaNikkel = [
    [-2.568, 121.347],
    [-2.569, 121.351],
    [-2.572, 121.352],
    [-2.573, 121.349],
    [-2.571, 121.346],
    [-2.569, 121.346],
    [-2.568, 121.347]
  ] as [number, number][]

  const desaNikkelPolygon = L.polygon(desaNikkel, {
    color: '#dc3545',
    weight: 2,
    fillColor: '#dc3545',
    fillOpacity: 0.3
  }).addTo(map)

  desaNikkelPolygon.on('click', () => {
    selectArea('village', 'Desa Nikkel')
  })

  desaNikkelPolygon.bindPopup('<b>Desa Nikkel</b><br>20 KK<br><small>Klik untuk detail</small>')

  // Add house markers for Desa Nikkel
  const housesNikkel = [
    { pos: [-2.5695, 121.3485] as [number, number], owner: 'Bambang Trianto' },
    { pos: [-2.5705, 121.3495] as [number, number], owner: 'Dewi Anggraini' },
    { pos: [-2.5715, 121.3505] as [number, number], owner: 'Irfan Maulana' },
    { pos: [-2.5708, 121.3480] as [number, number], owner: 'Wulan Sari' }
  ]
  addHouseMarkersWithOwner(map, housesNikkel, 'Desa Nikkel')

  // Project Alpha - Mining Expansion (berada di dalam Desa Sorowako dan Magani)
  const projectAlpha = [
    [-2.5595, 121.3425],
    [-2.5605, 121.3480],
    [-2.5630, 121.3485],
    [-2.5635, 121.3450],
    [-2.5620, 121.3415],
    [-2.5595, 121.3425]
  ] as [number, number][]

  const projectAlphaPolygon = L.polygon(projectAlpha, {
    color: '#800080',
    weight: 3,
    fillColor: '#800080',
    fillOpacity: 0.25
  }).addTo(map)

  projectAlphaPolygon.on('click', () => {
    selectArea('project', 'Project Alpha - Mining Expansion')
  })

  projectAlphaPolygon.bindPopup('<b>Project Alpha</b><br>Mining Expansion<br>Di Desa Sorowako & Magani<br><small>Klik untuk detail</small>')

  // Project Beta - Infrastructure (berada di dalam Desa Wewangriu)
  const projectBeta = [
    [-2.5680, 121.3415],
    [-2.5690, 121.3450],
    [-2.5715, 121.3455],
    [-2.5720, 121.3430],
    [-2.5705, 121.3410],
    [-2.5680, 121.3415]
  ] as [number, number][]

  const projectBetaPolygon = L.polygon(projectBeta, {
    color: '#800080',
    weight: 3,
    fillColor: '#800080',
    fillOpacity: 0.25
  }).addTo(map)

  projectBetaPolygon.on('click', () => {
    selectArea('project', 'Project Beta - Infrastructure Development')
  })

  projectBetaPolygon.bindPopup('<b>Project Beta</b><br>Infrastructure Development<br>Di Desa Wewangriu<br><small>Klik untuk detail</small>')

  // Project Gamma - Road Access (berada di dalam Desa Nikkel)
  const projectGamma = [
    [-2.5685, 121.3475],
    [-2.5695, 121.3510],
    [-2.5720, 121.3515],
    [-2.5725, 121.3490],
    [-2.5710, 121.3470],
    [-2.5685, 121.3475]
  ] as [number, number][]

  const projectGammaPolygon = L.polygon(projectGamma, {
    color: '#800080',
    weight: 3,
    fillColor: '#800080',
    fillOpacity: 0.25
  }).addTo(map)

  projectGammaPolygon.on('click', () => {
    selectArea('project', 'Project Gamma - Road Access')
  })

  projectGammaPolygon.bindPopup('<b>Project Gamma</b><br>Road Access<br>Di Desa Nikkel<br><small>Klik untuk detail</small>')
}

const addHouseMarkersWithOwner = (map: L.Map, houses: Array<{ pos: [number, number], owner: string }>, village: string) => {
  houses.forEach((house) => {
    const houseIcon = L.divIcon({
      className: 'house-marker',
      html: '<div style="background: #000; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; cursor: pointer;"></div>',
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    })

    const marker = L.marker(house.pos, { icon: houseIcon }).addTo(map)
    
    marker.on('click', () => {
      selectArea('house', `${house.owner} - ${village}`)
    })

    marker.bindPopup(`<b>${house.owner}</b><br>${village}<br><small>Klik untuk detail</small>`)
  })
}

const selectArea = (type: 'village' | 'project' | 'house', name: string) => {
  if (type === 'village') {
    const villageData: Record<string, Record<string, string>> = {
      'Desa Sorowako': {
        'Nama Desa': 'Desa Sorowako',
        'Kecamatan': 'Kecamatan Nuha',
        'Jumlah KK': '12 Kepala Keluarga',
        'Luas Area': '8.5 Ha',
        'Status': 'Dalam Proses Akuisisi',
        'Total Rumah': '12 Unit',
        'Sudah Dibebaskan': '7 Unit (58%)',
        'Dalam Negosiasi': '3 Unit (25%)',
        'Belum Diproses': '2 Unit (17%)',
        'Koordinat': '-2.5605, 121.3420'
      },
      'Desa Magani': {
        'Nama Desa': 'Desa Magani',
        'Kecamatan': 'Kecamatan Nuha',
        'Jumlah KK': '15 Kepala Keluarga',
        'Luas Area': '11.2 Ha',
        'Status': 'Dalam Proses Akuisisi',
        'Total Rumah': '15 Unit',
        'Sudah Dibebaskan': '10 Unit (67%)',
        'Dalam Negosiasi': '4 Unit (27%)',
        'Belum Diproses': '1 Unit (6%)',
        'Koordinat': '-2.5615, 121.3470'
      },
      'Desa Wewangriu': {
        'Nama Desa': 'Desa Wewangriu',
        'Kecamatan': 'Kecamatan Nuha',
        'Jumlah KK': '18 Kepala Keluarga',
        'Luas Area': '14.8 Ha',
        'Status': 'Dalam Proses Akuisisi',
        'Total Rumah': '18 Unit',
        'Sudah Dibebaskan': '12 Unit (67%)',
        'Dalam Negosiasi': '5 Unit (28%)',
        'Belum Diproses': '1 Unit (5%)',
        'Koordinat': '-2.5695, 121.3430'
      },
      'Desa Nikkel': {
        'Nama Desa': 'Desa Nikkel',
        'Kecamatan': 'Kecamatan Wotu',
        'Jumlah KK': '20 Kepala Keluarga',
        'Luas Area': '17.5 Ha',
        'Status': 'Dalam Proses Akuisisi',
        'Total Rumah': '20 Unit',
        'Sudah Dibebaskan': '15 Unit (75%)',
        'Dalam Negosiasi': '4 Unit (20%)',
        'Belum Diproses': '1 Unit (5%)',
        'Koordinat': '-2.5705, 121.3490'
      }
    }
    
    selectedItem.value = {
      type: 'village',
      name: name,
      details: villageData[name] || {}
    }
  } else if (type === 'project') {
    const projectData: Record<string, Record<string, string>> = {
      'Project Alpha - Mining Expansion': {
        'Nama Project': 'Project Alpha - Mining Expansion',
        'Tahun': '2024-2026',
        'Luas Total': '28 Ha',
        'Progress': '78%',
        'Budget': 'Rp 45.000.000.000',
        'Desa Terdampak': 'Desa Sorowako, Desa Magani',
        'Total Parcels': '42 Parcels',
        'Status': 'Land Acquisition Phase',
        'Target Completion': 'Q2 2026',
        'PIC': 'Ir. Budi Santoso'
      },
      'Project Beta - Infrastructure Development': {
        'Nama Project': 'Project Beta - Infrastructure Development',
        'Tahun': '2025-2027',
        'Luas Total': '35 Ha',
        'Progress': '45%',
        'Budget': 'Rp 62.000.000.000',
        'Desa Terdampak': 'Desa Wewangriu',
        'Total Parcels': '58 Parcels',
        'Status': 'Planning & Negotiation',
        'Target Completion': 'Q4 2027',
        'PIC': 'Dr. Ahmad Wijaya'
      },
      'Project Gamma - Road Access': {
        'Nama Project': 'Project Gamma - Road Access',
        'Tahun': '2024-2025',
        'Luas Total': '12 Ha',
        'Progress': '92%',
        'Budget': 'Rp 18.000.000.000',
        'Desa Terdampak': 'Desa Nikkel',
        'Total Parcels': '15 Parcels',
        'Status': 'Final Documentation',
        'Target Completion': 'Q1 2025',
        'PIC': 'Ir. Siti Nurhaliza'
      }
    }
    
    selectedItem.value = {
      type: 'project',
      name: name,
      details: projectData[name] || {}
    }
  } else if (type === 'house') {
    // Extract owner name and village from the name parameter
    const ownerName = name.split(' - ')[0] || 'Unknown'
    const villageName = name.split(' - ')[1] || 'Unknown'
    
    const houseDetails: Record<string, string> = {
      'Nama Pemilik': ownerName,
      'Lokasi': villageName,
      'NIK': '7371xxxxxxxxxx',
      'No. KK': '737101xxxxxxxxxx',
      'Luas Tanah': '500 m²',
      'Luas Bangunan': '120 m²',
      'Status Sertifikat': 'SHM (Sertifikat Hak Milik)',
      'Nomor Sertifikat': 'SHM-00123/2020',
      'Status Negosiasi': 'Dalam Proses',
      'Penawaran Terakhir': 'Rp 450.000.000',
      'Tanggal Survey': '15 November 2024'
    }
    
    selectedItem.value = {
      type: 'house',
      name: name,
      details: houseDetails
    }
  }
}

const getHeaderClass = () => {
  if (!selectedItem.value) return 'bg-primary'
  
  switch (selectedItem.value.type) {
    case 'village':
      return 'bg-danger'
    case 'project':
      return 'bg-purple'
    case 'house':
      return 'bg-success'
    default:
      return 'bg-primary'
  }
}

const getIconClass = () => {
  if (!selectedItem.value) return 'bi bi-info-circle-fill'
  
  switch (selectedItem.value.type) {
    case 'village':
      return 'bi bi-house-fill'
    case 'project':
      return 'bi bi-briefcase-fill'
    case 'house':
      return 'bi bi-house-door-fill'
    default:
      return 'bi bi-info-circle-fill'
  }
}
</script>

<style scoped>
.map-legend {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 18px 22px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  z-index: 1000;
  min-width: 300px;
  border: 1px solid rgba(0,0,0,0.1);
}

.map-legend h6 {
  margin: 0 0 15px 0;
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.legend-item:last-of-type {
  margin-bottom: 0;
}

.legend-symbol {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 4px;
}

.legend-text {
  font-size: 14px;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  line-height: 1.4;
}

.legend-text strong {
  color: #000;
  font-weight: 600;
}

.legend-hint {
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
  margin-top: 12px !important;
  color: #666 !important;
  font-size: 12px;
  font-weight: 500;
}

.bg-purple {
  background-color: #800080 !important;
  color: white !important;
}

.badge {
  font-size: 11px;
  padding: 4px 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
</style>
