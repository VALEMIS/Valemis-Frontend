<template>
  <div>
    <!-- Header -->
    <div class="app-content-header mb-3">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Land Acquisition</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item">
                <router-link to="/">
                  <i class="bi bi-house-fill"></i>
                </router-link>
              </li>
              <li class="breadcrumb-item active">Land Acquisition</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="container-fluid">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <span>Project List</span>
          <button
            class="btn btn-primary btn-sm"
            @click="openModal"
          >
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
                <td>{{ item.id_project }}</td>
                <td>{{ item.nama_project }}</td>
                <td>{{ item.owner_project }}</td>
                <td>{{ item.tanggal_dibuat }}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-warning" @click="router.push(`/land-acquisition/detail/${item.id_project}`)"  title="Open Project">
                            <i class="bi bi-arrow-right"></i>
                        </button>
                        <!-- <button class="btn btn-sm btn-warning" @click="editParcel(parcel)" title="Edit">
                            <i class="bi bi-pencil-square"></i>
                        </button> -->
                        <!-- <button class="btn btn-sm btn-info" @click="viewHistory(parcel)" title="Lihat History">
                            <i class="bi bi-clock-history"></i>
                        </button> -->
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Modal } from 'bootstrap'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "../utils/drawMap.js"
import router from '../router/index.js'

const projects = ref([])
let mpwkt
const modalRef = ref(null)
const uploadGeometry = null
let modalInstance = null
let map = null

const form = ref({
  nama_project: '',
  owner_project: '',
  acquisitions:[]
})

const fetchProjects = async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/spatial/LandAcquisitionProject/?format=json')
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

const submitProject = async () => {
  const wkt = mpwkt.toWKT()
  form.value.id_persil = {geom:wkt}
  await axios.post('http://127.0.0.1:8000/api/spatial/LandAcquisitionProject/?format=json', form.value)

  // reset form
  form.value = {
    "nama_project": "",
    "owner_project": "",
    "acquisitions": []
    }
    // console.log(form.value)
  closeModal()
  fetchProjects()
}


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



onMounted(() => {
  modalInstance = new Modal(modalRef.value)
  fetchProjects()
})
</script>
