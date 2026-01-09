<template>
  <div>
    <!-- Header -->
    <div class="app-content-header mb-3">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Vale Projects</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item">
                <router-link to="/">
                  <i class="bi bi-house-fill"></i>
                </router-link>
              </li>
              <li class="breadcrumb-item active">Project</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" id="mapContainer">
      <div class="card">
        <div class="card-header">
          <h5>Peta Project Vale</h5>
        </div>
        <div class="card-body">
          <div id="mapProject" style="height: 600px;"></div>
        </div>
      </div>
    </div>


    <!-- Content -->
    <div class="container-fluid mt-3">
      <div class="card">
        <div class="card-header">
          <h5>Project List</h5>
          <button class="btn btn-primary btn-sm mt-2" @click="openModal">
            + Add Project
          </button>
        </div>


        <div class="card-body">
          <div class="projects-container">
            <div v-if="projects.length === 0" class="no-data">
              No projects available
            </div>

            <div class="project-cards">
              <div v-for="(item, index) in projects" :key="item.id_project" class="project-card">
                <!-- Header -->
                <div class="card-header">
                  <h3 class="project-title">{{ item.nama_project }}</h3>
                  <span class="project-owner">Owner: {{ item.owner_project }}</span>
                  <span class="project-date">Tanggal Dibuat: {{ item.tanggal_dibuat }}</span>
                  <span class="project-date">Tanggal Projek Dimulai: {{ item.date_start }}</span>
                  <span class="project-date">Tanggal Projek Selesai: {{ item.date_end }}</span>
                  <!-- TODO: Luas -->
                  <span class="project-luas">Luas: {{ item.luas ?? "150" }} ha</span>
                </div>

                <!-- Stats / info badges -->
                <!-- TODO: Status Lahan -->
                <div class="card-info">
                  <span class="info-badge">Lahan Bebas: {{ item.lahan_bebas ?? 0 }}</span>
                  <span class="info-badge">Proses: {{ item.proses ?? 0 }}</span>
                  <span class="info-badge">Negosiasi: {{ item.negosiasi ?? 0 }}</span>
                  <span class="info-badge">Sengketa: {{ item.sengketa ?? 0 }}</span>
                </div>

                <!-- Footer -->
                <div class="card-footer">
                  <div class="card-qty">
                    <!-- <span class="qty-badge">{{ item.project_details.length }} item</span> -->
                  </div>
                  <div class="card-actions">
                    <button class="btn btn-primary" @click="router.push(`/project/${item.id_project}`)">
                      <i class="bi bi-arrow-right"></i> Open
                    </button>
                    <button class="btn btn-secondary" :disabled="!item.geom" @click="viewMap(item.geom)">
                      <i class="bi bi-map"></i> View Map
                    </button>
                    <button class="btn btn-danger" @click="deleteProject(item.id_project)">
                      <i class="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" ref="modalRef" tabindex="-1">
      <div class="modal-dialog">
        <form class="modal-content" @submit.prevent="submitProject">
          <div class="modal-header">
            <h5 class="modal-title">Add Project</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>

          <div class="modal-body grid grid-cols-3">
            <div class="mb-3">
              <label class="form-label">Nama Project</label>
              <input v-model="form.nama_project" type="text" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Owner Project</label>
              <input v-model="form.owner_project" type="text" class="form-control" />
            </div>
            <div id="map" style="width: 100%;height: 250px;"></div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { Modal } from 'bootstrap'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "../utils/drawMap.js"
import router from '../router/index.js'
import { wktToLayer } from "../utils/map.js"

const apiUrl = import.meta.env.VITE_APP_API_SPATIAL_URL;
const geoserverUrl = import.meta.env.VITE_APP_API_GS_URL;
// console.log(apiUrl)

const projects = ref([])
let mpwkt
const modalRef = ref(null)
const uploadGeometry = null
let modalInstance = null
let map = null
let projectMap = null

const form = ref({
  nama_project: '',
  owner_project: '',
})

const fetchProjects = async () => {
  const res = await axios.get(apiUrl + '/Project/?format=json')
  projects.value = res.data
}

const openModal = () => {
  modalRef.value.addEventListener(
    'shown.bs.modal',
    () => {
      if (!map) {
        initMap()
      } else {
        map.invalidateSize()
      }
    },
    { once: true } // penting: jangan dobel
  )
  // initMap()
  modalInstance.show()
}

const closeModal = () => {
  modalInstance.hide()
}

async function deleteProject(projectId) {
  await axios.delete(apiUrl + `/Project/${projectId}/`)
}

const submitProject = async () => {
  const wkt = mpwkt.toWKT()
  form.value.geom = wkt
  await axios.post(apiUrl + '/Project/?format=json', form.value)

  // reset form
  form.value = {
    "nama_project": "",
    "owner_project": "",
  }
  // console.log(form.value)
  closeModal()
  fetchProjects()
}

// const fetchMap

function initMap() {
  map = L.map("map").setView([-2, 118], {
      center: [-2.5, 121.0],
      zoom: 10,
      zoomControl: true
    })

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    .addTo(map)

  map.pm.addControls({
    position: 'topleft',
    drawCircleMarker: false,
    rotateMode: false,
  })

  mpwkt = new LeafletMultiPolygonWKT(map)
}

function randomMapColor() {
  const hue = Math.floor(Math.random() * 360)
  const saturation = 70
  const lightness = 50

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

function initProjectMap(){
  projectMap = L.map("mapProject",{
      center: [-2.5, 121.0],
      zoom: 10,
      zoomControl: true
    })

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    .addTo(projectMap)
  let geojsonLayerProject
  // if (lands.value.length>0) 
  // console.log(projects.value.id_persil.geom)
  // console.log(projects.value)
  L.tileLayer.wms(
    geoserverUrl + "/vector_valemis/wms",
    {
      layers: "	vector_valemis:tbl_project",
      format: "image/png",
      transparent: true,
      styles: "sld_projek",
      version: "1.1.0"
    }
  ).addTo(projectMap)
  const features = []
  // projects.value.forEach((e)=>{
  //   // console.log(wellknown.parse(e.id_persil?.geom))
  //   if (e.id_persil?.geom!=null){
  //     const wkt = e.id_persil?.geom
  //   if (!wkt) return

  //   const geojson = wellknown.parse(wkt)

  //   // 🔥 inject properties manual
  //   geojson.properties = {
  //     id_project: e.id_project,
  //     nama_project: e.nama_project,
  //     owner: e.owner_project
  //   }

  //   features.push(geojson)
  //   L.geoJSON(features,{
  //     style: {
  //       color: '#ff7800',
  //       weight: 2,
  //       fillOpacity: 0.4
  //     },
  //     onEachFeature: (feature, layer) => {
  //       if (!feature.properties) return

  //       const props = feature.properties

  //        let html = `
  //           <b>${props.nama_project}</b><br/>
  //           Owner: ${props.owner}<br/>
  //           ID: ${props.id_project}
  //         `

  //         layer.bindPopup(html)
  //         layer.setStyle({
  //           color: randomMapColor(),
  //         })
  //     }
  //   }).addTo(projectMap)
  //   }
  // })
}

function viewMap(geom) {
  const layer = wktToLayer(geom)

  projectMap.flyToBounds(layer.getBounds());

  // scroll to id
  const el = document.getElementById('mapContainer')
  el.scrollIntoView({ behavior: 'smooth' })
}


onMounted(async () => {
  modalInstance = new Modal(modalRef.value)
  await fetchProjects()
  initProjectMap()
})
</script>

<style scoped>
.projects-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.no-data {
  text-align: center;
  color: #6b7280;
  font-style: italic;
}

.project-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.project-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
}

.project-owner,
.project-date,
.project-luas {
  font-size: 0.875rem;
  color: #6b7280;
}

.card-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.info-badge {
  background-color: #e5e7eb;
  color: #111827;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

.card-chart {
  margin-bottom: 0.75rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
}

.card-qty {
  display: flex;
  flex-grow: 1;
  align-items: center;
}

.qty-badge {
  padding: 0.25rem 0.5rem;
  background-color: #3b82f6;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 8px;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-primary {
  background-color: #3b82f6;
  color: #fff;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #6b7280;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #4b5563;
}

.btn-danger {
  background-color: #ef4444;
  color: #fff;
}

.btn-danger:hover {
  background-color: #b91c1c;
}

@media (max-width: 768px) {
  .project-cards {
    grid-template-columns: 1fr;
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>