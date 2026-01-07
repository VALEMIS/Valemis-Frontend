<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Detail Project</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/pembebasan-lahan">Pembebasan Lahan</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="card mb-4">
        <div class="card-header">
          <h5 class="card-title">Informasi Lahan</h5>
          <div class="card-tools">
            <router-link to="/project" class="btn btn-sm btn-secondary">
              <i class="bi bi-arrow-left"></i> Kembali
            </router-link>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-12 mb-3">
              <div id="map" style="height: 600px;"></div>
            </div>
          </div>
        </div>
        
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="card-title">Informasi Tampilan Layer</h5>
            </div>
            <div class="card-body">
              <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th width="40%">Project Id</th>
                      {{ projects.projectId }}
                    </tr> 
                    <tr>
                      <th>Nama Project</th>
                      <td>{{ projects.nama_project }}</td>
                    </tr>
                    <tr>
                      <th>Owner Project</th>
                      <td>{{projects.owner_project}}</td>
                    </tr>
                    
                    <tr>
                      <th>Luas Project</th>
                      <td>500 m²</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="card-title">Informasi Tampilan Layer</h5>
            </div>
            <div class="card-body">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th width="40%">Basemap</th>
                    <select v-model="selectedRaster" class="form-select" >
                      <option v-for="props in raster" :key="props.nama" :value="props.nama">
                        {{ props.nama }}
                      </option>
                    </select>
                  </tr>
                  <tr>
                    <th>IUPK</th>
                    <select v-model="selectedIupk" class="form-select" >
                      <option v-for="props in theme" :key="props.tbl_name" :value="props.tbl_name">
                        {{ props.nama_map }}
                      </option>
                    </select>
                  </tr>
                  <tr>
                    <th>Batas Admin</th>
                    <select v-model="selectedBatas" class="form-select" >
                      <option v-for="props in theme" :key="props.tbl_name" :value="props.tbl_name">
                        {{ props.nama_map }}
                      </option>
                    </select>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card-footer"> 
              <div class="card-tools">
                <button class="btn btn-sm btn-success" @click="saveLayer">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>

</template>

<script setup lang="js">
import { ref, onMounted, computed, nextTick, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { Modal } from 'bootstrap'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "../utils/drawMap.js"
import router from '../router/index.js'
import {addWms} from "../utils/addWms.js"
import wellknown from "wellknown"
import { useRoute } from 'vue-router'
const route = useRoute()
const projectId = route.params.id_project
const uploadGeometry = null

let mpwkt
let map = null
let isEditMode = false
let acquisitionParcel = ref([])
let acquisitionParcelCompute = ref([])
let parcelModalRef = ref(null)
let parcelModalInstance = null
const acquisition = ref([])
const projects = ref([])
let uploadedGeojson = null
let selectedGeometry = null 
const mapLayer = ref(null)
const raster = ref(null)
const theme = ref(null)
const selectedRaster = ref(null)
const selectedIupk = ref(null)
const selectedBatas = ref(null)
const apiUrl = import.meta.env.VITE_APP_API_SPATIAL_URL;
const fetchAcquisition = async () => {
  const resProject = await axios.get(apiUrl+`/Project/${projectId}`)
  projects.value = resProject.data

  const resProjectThemeMap = await axios.get(apiUrl+`/LandInventoryThemeMap/?id_project=${projectId}`)
  theme.value = resProjectThemeMap.data
  const resProjectRaster = await axios.get(apiUrl+`/LandInventoryRaster/?id_project=${projectId}`)
  raster.value = resProjectRaster.data
  selectedIupk.value = projects.value.iupk
  selectedRaster.value = projects.value.basemap
  selectedBatas.value = projects.value.batas_admin
}

// formData.value({
//     "nama_project": "",
//     "owner_project": "",
//     "project_details": [],
//     "basemap": "",
//     "iupk": "",
//     "batas_admin": "",
//     "geom": null
// })
async function saveLayer() {
  const pd = {
    "nama_project": projects.value.nama_project,
    "owner_project": projects.value.owner_project,
    "project_details": projects.value.project_details,
    "basemap": selectedRaster.value,
    "iupk": selectedIupk.value,
    "batas_admin": selectedBatas.value,
    "geom": projects.value.geom
  };

  await axios.put(`${apiUrl}/Project/${projectId}/`, pd);
  addWms(map,projectId)
}
onMounted(async () => {

  await fetchAcquisition ()
  map = L.map('map')

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  const resProject = await axios.get(apiUrl+`/Project/${projectId}`)
  
  // if (resProject.data.geom) {
  //   const geojson = wellknown.parse(resProject.data.geom)
  //   const geojsonLayerProject = new L.GeoJSON(geojson).addTo(map)
  //   map.fitBounds(geojsonLayerProject.getBounds())
  // }
  await addWms(map,projectId)
})
</script>

<style scoped>
</style>

