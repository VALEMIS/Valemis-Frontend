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
    <div class="container-fluid">      
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
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Nama Project</th>
                <th>Owner</th>
                <th>Tanggal Dibuat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="projects.length === 0">
                <td colspan="4" class="text-center text-muted">
                  No data
                </td>
              </tr>

              <tr v-for="(item, index) in projects" :key="item.id_project">
                <td>{{ index+1 }}</td>
                <td>{{ item.nama_project }}</td>
                <td>{{ item.owner_project }}</td>
                <td>{{ item.tanggal_dibuat }}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-warning" @click="router.push(`/project/${item.id_project}`)"  title="Open Project">
                            <i class="bi bi-arrow-right"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" @click="deleteProject(item.id_project)" title="Hapus parcel">
                          <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" ref="modalRef" tabindex="-1">
      <div class="modal-dialog" >
        <form class="modal-content" @submit.prevent="submitProject">
          <div class="modal-header">
            <h5 class="modal-title">Add Project</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>

          <div class="modal-body grid grid-cols-3">
            <div class="mb-3">
              <label class="form-label">Nama Project</label>
              <input
                v-model="form.nama_project"
                type="text"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Owner Project</label>
              <input
                v-model="form.owner_project"
                type="text"
                class="form-control"
              />
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
import { ref, onMounted,watch } from 'vue'
import axios from 'axios'
import { Modal } from 'bootstrap'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "../utils/drawMap.js"
import router from '../router/index.js'
import wellknown from "wellknown"
const apiUrl = import.meta.env.VITE_APP_API_SPATIAL_URL;
const geoserverUrl = import.meta.env.VITE_APP_API_GEOSERVER_URL;
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
  const res = await axios.get(apiUrl+'Project/?format=json')
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
  await axios.delete(apiUrl+`Project/${projectId}/`)
}

const submitProject = async () => {
  const wkt = mpwkt.toWKT()
  form.value.geom = wkt
  await axios.post(apiUrl+'Project/?format=json', form.value)

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
  map = L.map("map").setView([-2, 118], 5)

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
  projectMap = L.map("mapProject").setView([-2, 118], 5)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    .addTo(projectMap)
    let geojsonLayerProject
  // if (lands.value.length>0) 
  // console.log(projects.value.id_persil.geom)
  // console.log(projects.value)
  L.tileLayer.wms(
    geoserverUrl+"vector_valemis/wms",
    {
      layers: "	vector_valemis:tbl_project",
      format: "image/png",
      transparent: true,
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


onMounted(async () => {
  modalInstance = new Modal(modalRef.value)
  await fetchProjects()
  initProjectMap()
})
</script>
