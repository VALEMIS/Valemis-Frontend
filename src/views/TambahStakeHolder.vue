<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Tambah Stakeholder</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/stake-holder">Stakeholder</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Tambah</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title">Informasi Dasar Stakeholder</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="sh_id" class="form-label">SH_ID</label>
                  <input type="text" class="form-control" id="sh_id" v-model="formData.sh_id" required />
                  <small class="text-muted">ID unik stakeholder (auto-generated jika kosong)</small>
                </div>

                <div class="col-md-6">
                  <label for="nama" class="form-label">Nama Stakeholder</label>
                  <input type="text" class="form-control" id="nama" v-model="formData.nama" required />
                </div>

                <div class="col-md-4">
                  <label for="tipe" class="form-label">Tipe</label>
                  <select class="form-select" id="tipe" v-model="formData.tipe" required>
                    <option value="">Pilih tipe</option>
                    <option>Perusahaan</option>
                    <option>Pemerintah</option>
                    <option>Masyarakat</option>
                    <option>NGO</option>
                    <option>Media</option>
                    <option>Akademisi</option>
                    <option>Individu</option>
                  </select>
                </div>

                <div class="col-md-4">
                  <label for="kategori" class="form-label">Kategori</label>
                  <select class="form-select" id="kategori" v-model="formData.kategori" required>
                    <option value="">Pilih kategori</option>
                    <option>Primary</option>
                    <option>Secondary</option>
                    <option>Tertiary</option>
                  </select>
                </div>

                <div class="col-md-4">
                  <label for="kontak" class="form-label">Kontak</label>
                  <input type="text" class="form-control" id="kontak" v-model="formData.kontak" placeholder="Phone/Email" />
                </div>

                <div class="col-md-12">
                  <label for="alamat" class="form-label">Alamat</label>
                  <textarea class="form-control" id="alamat" v-model="formData.alamat" rows="2"></textarea>
                </div>

                <div class="col-md-6">
                  <label for="interest" class="form-label">Interest Level (1-5)</label>
                  <select class="form-select" id="interest" v-model="formData.interest_1_5_inCase" required>
                    <option value="">Pilih level</option>
                    <option value="1">1 - Very Low</option>
                    <option value="2">2 - Low</option>
                    <option value="3">3 - Medium</option>
                    <option value="4">4 - High</option>
                    <option value="5">5 - Very High</option>
                  </select>
                </div>

                <div class="col-md-6">
                  <label for="influence" class="form-label">Influence Level (1-5)</label>
                  <select class="form-select" id="influence" v-model="formData.influence_1_5_InCase" required>
                    <option value="">Pilih level</option>
                    <option value="1">1 - Very Low</option>
                    <option value="2">2 - Low</option>
                    <option value="3">3 - Medium</option>
                    <option value="4">4 - High</option>
                    <option value="5">5 - Very High</option>
                  </select>
                </div>
              </div>

              <h5 class="mt-4 mb-3">Lokasi Geografis</h5>
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label for="srid" class="form-label">SRID (Spatial Reference ID)</label>
                  <input type="text" class="form-control" id="srid" v-model="formData.srid" placeholder="Contoh: 4326" />
                  <small class="text-muted">Default: 4326 (WGS84)</small>
                </div>

                <div class="col-md-6">
                  <label for="geom_wkt" class="form-label">Geometry (WKT Format)</label>
                  <input type="text" class="form-control" id="geom_wkt" v-model="formData.geom_wkt" placeholder="POINT(longitude latitude)" />
                </div>

                <div class="col-12">
                  <div id="map" style="height: 400px;"></div>
                  <small class="text-muted">Klik pada peta untuk menentukan lokasi stakeholder</small>
                </div>
              </div>

              <div class="d-flex justify-content-between">
                <router-link to="/stake-holder" class="btn btn-secondary">
                  <i class="bi bi-arrow-left"></i> Batal
                </router-link>
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-save"></i> Simpan Stakeholder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import L from 'leaflet'

const router = useRouter()

const formData = ref({
  sh_id: '',
  nama: '',
  tipe: '',
  kategori: '',
  alamat: '',
  kontak: '',
  srid: '4326',
  geom_wkt: '',
  interest_1_5_inCase: '',
  influence_1_5_InCase: ''
})

let map: L.Map | null = null
let marker: L.Marker | null = null

onMounted(() => {
  // Initialize map
  map = L.map('map').setView([-2.5489, 118.0149], 5)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // Add click event to map
  map.on('click', (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng
    
    // Remove existing marker
    if (marker) {
      map?.removeLayer(marker)
    }
    
    // Add new marker
    marker = L.marker([lat, lng]).addTo(map!)
    
    // Update WKT format
    formData.value.geom_wkt = `POINT(${lng} ${lat})`
  })
})

const handleSubmit = () => {
  // Generate SH_ID if empty
  if (!formData.value.sh_id) {
    formData.value.sh_id = `SH${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
  }
  
  console.log('Stakeholder Data:', formData.value)
  alert('Stakeholder berhasil ditambahkan!')
  router.push('/stake-holder')
}
</script>

<style scoped>
</style>
