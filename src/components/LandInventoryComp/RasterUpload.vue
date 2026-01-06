<template>
  <div class="card">
    <div class="card-header d-flex align-items-center">
      <h5>Land Inventory Raster</h5>
      <button class="btn btn-sm btn-primary ms-auto" @click="openAdd">
        + Tambah Raster
      </button>
    </div>

    <div class="card-body">
        <table class="table table-bordered table-sm align-middle">
            <thead class="table-light">
            <tr>
                <th style="width: 60px" class="text-center">No</th>
                <th>Nama</th>
                <th style="width: 140px" class="text-end">Aksi</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(r, i) in rasters" :key="r.id_raster">
                <td class="text-center">{{ i + 1 }}</td>

                <td class="text-truncate">
                {{ r.nama }}
                </td>

                <td>
                <div class="d-flex justify-content-end gap-2">
                    <button
                    class="btn btn-sm btn-warning"
                    @click="openEdit(r)"
                    >
                    Edit
                    </button>

                    <button
                    class="btn btn-sm btn-danger"
                    @click="remove(r.id_raster)"
                    >
                    Hapus
                    </button>
                </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

  </div>

  <!-- MODAL -->
  <div class="modal fade" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="submit">
          <div class="modal-header">
            <h5>{{ isEdit ? 'Edit Raster' : 'Tambah Raster' }}</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>

          <div class="modal-body">
            <!-- <div class="mb-2">
              <label>Project</label>
              <select v-model="form.id_project" class="form-select">
                <option :value="null">-- Pilih Project --</option>
                <option v-for="p in projects" :key="p.id" :value="p.id">
                  {{ p.nama_project }} (id : {{ p.id_project }})
                </option>
              </select>
            </div> -->

            <div class="mb-2">
              <label>Store Name</label>
              <input v-model="form.store_name" class="form-control" required />
            </div>

            <div class="mb-2">
              <label>Nama Raster</label>
              <input v-model="form.nama" class="form-control" required />
            </div>

            <div class="mb-2">
              <label>File Raster</label>
              <input type="file" class="form-control" @change="onFile" />
              <small v-if="isEdit">Kosongkan jika tidak diganti</small>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" @click="close">
              Batal
            </button>
            <button class="btn btn-primary" type="submit">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted,defineProps } from 'vue'
import axios from 'axios'
import { Modal } from 'bootstrap'

const props = defineProps(['id_project'])

const API = `http://spatial.valemis.id/api/spatial/LandInventoryRaster`
const API_BYPROJECT = `http://spatial.valemis.id/api/spatial/LandInventoryRaster/?id_project=${props.id_project}`
const PROJECT_API = 'http://spatial.valemis.id/api/spatial/Project'


const rasters = ref([])
const projects = ref([])
const isEdit = ref(false)
const modalRef = ref(null)
let modal

const form = ref({
  id_raster: null,
  id_project: props.id_project,
  store_name: '',
  nama: '',
  raster_path: null
})

onMounted(async () => {
  modal = new Modal(modalRef.value)
  await fetchData()
  await fetchProjects()
})

async function fetchData() {
  const res = await axios.get(API_BYPROJECT)
  rasters.value = res.data
}

async function fetchProjects() {
  const res = await axios.get(PROJECT_API)
  projects.value = res.data
}

function openAdd() {
  reset()
  isEdit.value = false
  modal.show()
}

function openEdit(row) {
  isEdit.value = true
  form.value = {
    id_raster: row.id_raster,
    id_project: row.id_project,
    store_name: row.store_name,
    nama: row.nama,
    raster_path: null
  }
  modal.show()
}

function close() {
  modal.hide()
}

function onFile(e) {
  form.value.raster_path = e.target.files[0]
}

async function submit() {
  const fd = new FormData()
  fd.append('id_project', props.id_project ?? '')
  fd.append('store_name', form.value.store_name)
  fd.append('nama', form.value.nama)

  if (form.value.raster_path) {
    fd.append('raster_path', form.value.raster_path)
  }

  if (isEdit.value) {
    await axios.put(`${API}/${form.value.id_raster}/`, fd)
  } else {
    await axios.post(API + '/', fd)
  }

  await fetchData()
  close()
}

async function remove(id) {
  if (!confirm('Hapus raster ini?')) return
  await axios.delete(`${API}/${id}/`)
  fetchData()
}

function reset() {
  form.value = {
    id_raster: null,
    id_project: props.id_project,
    store_name: '',
    nama: '',
    raster_path: null
  }
}
</script>
