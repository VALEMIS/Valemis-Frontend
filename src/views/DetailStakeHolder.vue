<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Detail Stakeholder</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/stake-holder">Stakeholder</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <!-- Stakeholder Info -->
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title">Informasi Stakeholder</h5>
            <div class="card-tools">
              <router-link to="/stake-holder" class="btn btn-sm btn-secondary">
                <i class="bi bi-arrow-left"></i> Kembali
              </router-link>
              <button class="btn btn-sm btn-warning ms-2">
                <i class="bi bi-pencil"></i> Edit
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th width="40%">SH_ID</th>
                      <td>SH001</td>
                    </tr>
                    <tr>
                      <th>Nama</th>
                      <td>PT. Vale Indonesia</td>
                    </tr>
                    <tr>
                      <th>Tipe</th>
                      <td><span class="badge bg-primary">Perusahaan</span></td>
                    </tr>
                    <tr>
                      <th>Kategori</th>
                      <td><span class="badge bg-info">Primary</span></td>
                    </tr>
                    <tr>
                      <th>Alamat</th>
                      <td>Sorowako, Sulawesi Selatan</td>
                    </tr>
                    <tr>
                      <th>Kontak</th>
                      <td>0411-5221234</td>
                    </tr>
                    <tr>
                      <th>Interest Level</th>
                      <td>
                        <div class="rating">
                          <i v-for="n in 5" :key="n" class="bi bi-star-fill text-warning"></i>
                        </div>
                        <span class="badge bg-warning">5 - Very High</span>
                      </td>
                    </tr>
                    <tr>
                      <th>Influence Level</th>
                      <td>
                        <div class="rating">
                          <i v-for="n in 5" :key="n" class="bi bi-star-fill text-success"></i>
                        </div>
                        <span class="badge bg-success">5 - Very High</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6">
                <div id="map" style="height: 400px;"></div>
                <div class="mt-2">
                  <strong>SRID:</strong> 4326 (WGS84)<br>
                  <strong>Geometry:</strong> POINT(121.3509 -2.5289)
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Involvement History -->
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="card-title">Riwayat Keterlibatan (Stakeholder Involvement)</h5>
            <div class="card-tools">
              <button class="btn btn-sm btn-primary" @click="showAddInvolvement = true">
                <i class="bi bi-plus-circle"></i> Tambah Keterlibatan
              </button>
            </div>
          </div>
          <div class="card-body">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Object Type</th>
                  <th>Object ID</th>
                  <th>Peran</th>
                  <th>Sejak</th>
                  <th>Hingga</th>
                  <th>Status</th>
                  <th>Catatan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>INV001</td>
                  <td><span class="badge bg-primary">Pembebasan Lahan</span></td>
                  <td>PL001</td>
                  <td>Pemilik Lahan</td>
                  <td>2024-01-15</td>
                  <td>2024-06-30</td>
                  <td><span class="badge bg-success">Selesai</span></td>
                  <td>Pembebasan lahan selesai dengan kompensasi</td>
                  <td>
                    <button class="btn btn-sm btn-info">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning">
                      <i class="bi bi-pencil"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>INV002</td>
                  <td><span class="badge bg-warning">Litigasi</span></td>
                  <td>CLM001</td>
                  <td>Penggugat</td>
                  <td>2024-03-20</td>
                  <td>-</td>
                  <td><span class="badge bg-warning">Dalam Proses</span></td>
                  <td>Sedang dalam proses mediasi</td>
                  <td>
                    <button class="btn btn-sm btn-info">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning">
                      <i class="bi bi-pencil"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>INV003</td>
                  <td><span class="badge bg-info">Aset Inventori</span></td>
                  <td>AS001</td>
                  <td>Responden</td>
                  <td>2024-02-10</td>
                  <td>2024-02-15</td>
                  <td><span class="badge bg-success">Selesai</span></td>
                  <td>Data sudah lengkap</td>
                  <td>
                    <button class="btn btn-sm btn-info">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning">
                      <i class="bi bi-pencil"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Social Media Activity -->
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">
              <i class="bi bi-twitter-x"></i> Aktivitas Media Sosial & Sentiment
            </h5>
            <div class="card-tools">
              <button class="btn btn-sm btn-primary" @click="refreshSentiment">
                <i class="bi bi-arrow-clockwise"></i> Refresh Data
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-4">
                <div class="card text-bg-success">
                  <div class="card-body text-center">
                    <h3>68%</h3>
                    <p class="mb-0"><i class="bi bi-emoji-smile"></i> Positive</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card text-bg-secondary">
                  <div class="card-body text-center">
                    <h3>22%</h3>
                    <p class="mb-0"><i class="bi bi-emoji-neutral"></i> Neutral</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card text-bg-danger">
                  <div class="card-body text-center">
                    <h3>10%</h3>
                    <p class="mb-0"><i class="bi bi-emoji-frown"></i> Negative</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h6 class="card-title">Recent Posts (5 posts terakhir)</h6>
              </div>
              <div class="card-body">
                <div class="mb-3 p-3 border rounded">
                  <div class="d-flex justify-content-between mb-2">
                    <strong>@corporate_news</strong>
                    <span class="badge bg-success">positive</span>
                  </div>
                  <p class="mb-2">Vale Indonesia raih penghargaan lingkungan dari pemerintah! #sustainability</p>
                  <small class="text-muted">
                    <i class="bi bi-calendar"></i> 2024-11-30 | 
                    <i class="bi bi-heart"></i> 234 | 
                    <i class="bi bi-chat"></i> 45
                  </small>
                </div>

                <div class="mb-3 p-3 border rounded">
                  <div class="d-flex justify-content-between mb-2">
                    <strong>@local_voice</strong>
                    <span class="badge bg-success">positive</span>
                  </div>
                  <p class="mb-2">Program beasiswa Vale membantu banyak anak daerah! Terima kasih</p>
                  <small class="text-muted">
                    <i class="bi bi-calendar"></i> 2024-11-29 | 
                    <i class="bi bi-heart"></i> 156 | 
                    <i class="bi bi-chat"></i> 23
                  </small>
                </div>

                <div class="text-center">
                  <button class="btn btn-sm btn-outline-primary">Lihat Semua Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Involvement Modal -->
    <div v-if="showAddInvolvement" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Keterlibatan</h5>
            <button type="button" class="btn-close" @click="showAddInvolvement = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitInvolvement">
              <div class="mb-3">
                <label class="form-label">Object Type</label>
                <select class="form-select" required>
                  <option value="">Pilih tipe</option>
                  <option>Pembebasan Lahan</option>
                  <option>Litigasi</option>
                  <option>Aset Inventori</option>
                  <option>Geospasial</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Object ID</label>
                <input type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Peran</label>
                <input type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Sejak</label>
                <input type="date" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Hingga</label>
                <input type="date" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Catatan</label>
                <textarea class="form-control" rows="3"></textarea>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary" @click="showAddInvolvement = false">Batal</button>
                <button type="submit" class="btn btn-primary">Simpan</button>
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
import L from 'leaflet'

const showAddInvolvement = ref(false)

onMounted(() => {
  // Initialize map
  const map = L.map('map').setView([-2.5289, 121.3509], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // Add marker for stakeholder location
  L.marker([-2.5289, 121.3509])
    .addTo(map)
    .bindPopup('PT. Vale Indonesia<br>Sorowako, Sulawesi Selatan')
    .openPopup()
})

const refreshSentiment = () => {
  alert('Refreshing sentiment data...')
}

const submitInvolvement = () => {
  alert('Keterlibatan berhasil ditambahkan!')
  showAddInvolvement.value = false
}
</script>

<style scoped>
.rating i {
  font-size: 1rem;
}

.modal.show {
  display: block;
}
</style>
