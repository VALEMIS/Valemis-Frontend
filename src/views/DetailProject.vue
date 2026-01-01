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
              <div class="col-md-6">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th width="40%">Project Id</th>
                      <td>{{ projects.id_project }}</td>
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
              <div class="col-md-6">
                <div id="map" style="height: 400px;"></div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-12">
                <h6>Catatan:</h6>
                <p>Proses pembebasan lahan sedang dalam tahap negosiasi dengan pemilik lahan.</p>
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
const fetchAcquisition = async () => {
  const resProject = await axios.get(`http://127.0.0.1:8000/api/spatial/Project/${projectId}`)
  projects.value = resProject.data
}


onMounted(async () => {

await fetchAcquisition ()
  const map = L.map('map')

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  const resProject = await axios.get(`http://127.0.0.1:8000/api/spatial/Project/${projectId}`)
  
  if (resProject.data.geom) {
    const geojson = wellknown.parse(resProject.data.geom)
    const geojsonLayerProject = new L.GeoJSON(geojson).addTo(map)
    map.fitBounds(geojsonLayerProject.getBounds())
  }
})
</script>

<style scoped>
</style>
