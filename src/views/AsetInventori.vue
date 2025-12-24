<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Asset Inventory</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/"><i class="bi bi-house-fill"></i></router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Asset Inventory</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <!-- Filter Desa -->
        <div class="row mb-3">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <label class="form-label"><strong>Filter per Desa</strong></label>
                <select v-model="selectedVillage" class="form-select" @change="filterByVillage">
                  <option value="all">Semua Desa</option>
                  <option value="Desa Sorowako">Desa Sorowako</option>
                  <option value="Desa Magani">Desa Magani</option>
                  <option value="Desa Wewangriu">Desa Wewangriu</option>
                  <option value="Desa Nikkel">Desa Nikkel</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card bg-info">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="mb-0 text-white">{{ filteredAssets.length }} Asset</h5>
                    <small class="text-white">Total asset untuk {{ selectedVillage === 'all' ? 'semua desa' : selectedVillage }}</small>
                  </div>
                  <div>
                    <button class="btn btn-light btn-sm" @click="toggleView">
                      <i class="bi" :class="showMap ? 'bi-table' : 'bi-map'"></i>
                      {{ showMap ? 'Tampilkan Tabel' : 'Tampilkan Peta' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map View -->
        <div v-if="showMap" class="row mb-3">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-map"></i> Peta Asset per Desa</h3>
              </div>
              <div class="card-body">
                <div id="asset-map" ref="assetMapContainer" style="height: 500px; border-radius: 8px;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Table View -->
        <div v-else class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-table"></i> Daftar Asset Inventory</h3>
                <div class="card-tools">
                  <button class="btn btn-primary btn-sm" @click="addAsset">
                    <i class="bi bi-plus-circle"></i> Tambah Asset
                  </button>
                </div>
              </div>
              <div class="card-body table-responsive">
                <table class="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode Asset</th>
                      <th>Nama Pemilik</th>
                      <th>Desa</th>
                      <th>Luas Tanah (m²)</th>
                      <th>Luas Bangunan (m²)</th>
                      <th>Status Sertifikat</th>
                      <th>Koordinat</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(asset, index) in filteredAssets" :key="asset.id">
                      <td>{{ index + 1 }}</td>
                      <td><span class="badge bg-primary">{{ asset.code }}</span></td>
                      <td><strong>{{ asset.ownerName }}</strong></td>
                      <td>{{ asset.village }}</td>
                      <td class="text-end">{{ asset.landArea.toLocaleString() }}</td>
                      <td class="text-end">{{ asset.buildingArea.toLocaleString() }}</td>
                      <td>
                        <span class="badge" :class="getCertificateClass(asset.certificateStatus)">
                          {{ asset.certificateStatus }}
                        </span>
                      </td>
                      <td><small class="text-muted">{{ asset.coordinates }}</small></td>
                      <td class="text-center">
                        <button class="btn btn-sm btn-info me-1" @click="viewOnMap(asset)" title="Lihat di Peta">
                          <i class="bi bi-geo-alt-fill"></i>
                        </button>
                        <button class="btn btn-sm btn-warning me-1" @click="editAsset(asset)" title="Edit">
                          <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" @click="deleteAsset(asset)" title="Hapus">
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary per Desa -->
        <div class="row mt-3">
          <div class="col-md-3" v-for="village in villageSummary" :key="village.name">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ village.name }}</h5>
                <p class="mb-1"><strong>Total Asset:</strong> {{ village.totalAssets }}</p>
                <p class="mb-1"><strong>Total KK:</strong> {{ village.totalKK }}</p>
                <p class="mb-1"><strong>Luas Total:</strong> {{ village.totalArea.toLocaleString() }} m²</p>
                <button class="btn btn-sm btn-primary mt-2" @click="selectVillageFilter(village.name)">
                  <i class="bi bi-filter"></i> Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div class="modal fade" id="assetModal" tabindex="-1" aria-labelledby="assetModalLabel" aria-hidden="true" ref="assetModalRef">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="assetModalLabel">
              {{ isEditMode ? 'Edit Asset' : 'Tambah Asset Baru' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveAsset">
              <!-- Basic Asset Information -->
              <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                  <h6 class="mb-0"><strong>Informasi Dasar Asset</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Kode Asset</strong> <span class="text-danger">*</span></label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.code" 
                        placeholder="Contoh: AST-SRW-001"
                        :disabled="isEditMode"
                        required 
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Nama Pemilik</strong> <span class="text-danger">*</span></label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.ownerName" 
                        placeholder="Nama lengkap pemilik"
                        required 
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Desa</strong> <span class="text-danger">*</span></label>
                      <select class="form-select" v-model="formData.village" required>
                        <option value="">Pilih Desa</option>
                        <option value="Desa Sorowako">Desa Sorowako</option>
                        <option value="Desa Magani">Desa Magani</option>
                        <option value="Desa Wewangriu">Desa Wewangriu</option>
                        <option value="Desa Nikkel">Desa Nikkel</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Status Sertifikat</strong> <span class="text-danger">*</span></label>
                      <select class="form-select" v-model="formData.certificateStatus" required>
                        <option value="">Pilih Status</option>
                        <option value="SHM">SHM (Sertifikat Hak Milik)</option>
                        <option value="SHGB">SHGB (Sertifikat Hak Guna Bangunan)</option>
                        <option value="Girik">Girik</option>
                        <option value="Belum Sertifikat">Belum Sertifikat</option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Luas Tanah (m²)</strong> <span class="text-danger">*</span></label>
                      <input 
                        type="number" 
                        class="form-control" 
                        v-model.number="formData.landArea" 
                        placeholder="Contoh: 500"
                        min="1"
                        required 
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Luas Bangunan (m²)</strong> <span class="text-danger">*</span></label>
                      <input 
                        type="number" 
                        class="form-control" 
                        v-model.number="formData.buildingArea" 
                        placeholder="Contoh: 120"
                        min="1"
                        required 
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Latitude</strong> <span class="text-danger">*</span></label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.lat" 
                        placeholder="Contoh: -2.5595"
                        required 
                      />
                      <small class="text-muted">Format: -2.5595</small>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label"><strong>Longitude</strong> <span class="text-danger">*</span></label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.lng" 
                        placeholder="Contoh: 121.3415"
                        required 
                      />
                      <small class="text-muted">Format: 121.3415</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Identitas Kepala Keluarga -->
              <div class="card mb-3">
                <div class="card-header bg-light">
                  <h6 class="mb-0"><strong>Form Identitas Kepala Keluarga</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Depan</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaDepan" 
                        placeholder="Nama Depan"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Tengah</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaTengah" 
                        placeholder="Nama Tengah"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Belakang</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaBelakang" 
                        placeholder="Nama Belakang"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Ayah</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaAyah" 
                        placeholder="Nama Ayah"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Kakek</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaKakek" 
                        placeholder="Nama Kakek"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Pasangan</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaPasangan" 
                        placeholder="Nama Pasangan"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nomor Telepon</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.nomorTelepon" 
                        placeholder="0812xxxxxxx"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">NIK</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.nik" 
                        placeholder="16 digit NIK"
                        maxlength="16"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Kecamatan</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.kecamatan" 
                        placeholder="Kecamatan"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Kabupaten</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.kabupaten" 
                        placeholder="Kabupaten"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Provinsi</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.provinsi" 
                        placeholder="Provinsi"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Nama Responden</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.namaResponden" 
                        placeholder="Jika berbeda dengan Kepala Keluarga"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Hubungan Responden dengan Kepala Keluarga</label>
                      <select class="form-select" v-model="formData.hubunganResponden">
                        <option value="">Pilih hubungan</option>
                        <option value="Kepala Keluarga">Kepala Keluarga</option>
                        <option value="Istri/Suami">Istri/Suami</option>
                        <option value="Anak">Anak</option>
                        <option value="Orang Tua">Orang Tua</option>
                        <option value="Saudara">Saudara</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- A. Identifikasi Rumah Tangga dan PAP -->
              <div class="card mb-3">
                <div class="card-header bg-light">
                  <h6 class="mb-0"><strong>A. Identifikasi Rumah Tangga dan PAP</strong></h6>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">1. Kode Enumerator</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.kodeEnumerator" 
                        placeholder="Kode Enumerator"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">3. Tanggal (DD/MM/YYYY)</label>
                      <input 
                        type="date" 
                        class="form-control" 
                        v-model="formData.tanggalSurvei" 
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">4. Kode Foto Survei</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.kodeFotoSurvei" 
                        placeholder="Kode Foto Survei"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12 mb-3">
                      <label class="form-label">5. ID Unik (ID Entitas Terdampak) Dalam Rumah Tangga</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.idUnik" 
                        placeholder="ID Unik"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  <i class="bi bi-x-circle"></i> Batal
                </button>
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-save"></i> {{ isEditMode ? 'Update' : 'Simpan' }}
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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Asset {
  id: number
  code: string
  ownerName: string
  village: string
  landArea: number
  buildingArea: number
  certificateStatus: string
  coordinates: string
  lat: number
  lng: number
}

interface FormData {
  id?: number
  code: string
  ownerName: string
  village: string
  landArea: number
  buildingArea: number
  certificateStatus: string
  lat: string
  lng: string
  // Form Identitas Kepala Keluarga
  namaDepan: string
  namaTengah: string
  namaBelakang: string
  namaAyah: string
  namaKakek: string
  namaPasangan: string
  nomorTelepon: string
  nik: string
  kecamatan: string
  kabupaten: string
  provinsi: string
  namaResponden: string
  hubunganResponden: string
  // Identifikasi Rumah Tangga dan PAP
  kodeEnumerator: string
  tanggalSurvei: string
  kodeFotoSurvei: string
  idUnik: string
}


const selectedVillage = ref<string>('all')
const showMap = ref<boolean>(true)  // Default to show map first
const assetMapContainer = ref<HTMLElement | null>(null)
const assetModalRef = ref<HTMLElement | null>(null)
let assetMap: L.Map | null = null
let modalInstance: any = null

// Form state
const isEditMode = ref<boolean>(false)
const formData = ref<FormData>({
  code: '',
  ownerName: '',
  village: '',
  landArea: 0,
  buildingArea: 0,
  certificateStatus: '',
  lat: '',
  lng: '',
  // Form Identitas Kepala Keluarga
  namaDepan: '',
  namaTengah: '',
  namaBelakang: '',
  namaAyah: '',
  namaKakek: '',
  namaPasangan: '',
  nomorTelepon: '',
  nik: '',
  kecamatan: '',
  kabupaten: '',
  provinsi: '',
  namaResponden: '',
  hubunganResponden: '',
  // Identifikasi Rumah Tangga dan PAP
  kodeEnumerator: '',
  tanggalSurvei: '',
  kodeFotoSurvei: '',
  idUnik: ''
})

// Dummy data
const assets = ref<Asset[]>([
  { id: 1, code: 'AST-SRW-001', ownerName: 'Budi Santoso', village: 'Desa Sorowako', landArea: 500, buildingArea: 120, certificateStatus: 'SHM', coordinates: '-2.5595, 121.3415', lat: -2.5595, lng: 121.3415 },
  { id: 2, code: 'AST-SRW-002', ownerName: 'Ahmad Hidayat', village: 'Desa Sorowako', landArea: 450, buildingArea: 110, certificateStatus: 'SHM', coordinates: '-2.5605, 121.3425', lat: -2.5605, lng: 121.3425 },
  { id: 3, code: 'AST-SRW-003', ownerName: 'Siti Rahma', village: 'Desa Sorowako', landArea: 600, buildingArea: 150, certificateStatus: 'SHGB', coordinates: '-2.5615, 121.3435', lat: -2.5615, lng: 121.3435 },
  { id: 4, code: 'AST-SRW-004', ownerName: 'Joko Widodo', village: 'Desa Sorowako', landArea: 520, buildingArea: 130, certificateStatus: 'SHM', coordinates: '-2.5610, 121.3410', lat: -2.5610, lng: 121.3410 },
  
  { id: 5, code: 'AST-MGN-001', ownerName: 'Andi Suryanto', village: 'Desa Magani', landArea: 480, buildingArea: 115, certificateStatus: 'SHM', coordinates: '-2.5605, 121.3465', lat: -2.5605, lng: 121.3465 },
  { id: 6, code: 'AST-MGN-002', ownerName: 'Maria Ulfa', village: 'Desa Magani', landArea: 550, buildingArea: 140, certificateStatus: 'SHGB', coordinates: '-2.5615, 121.3475', lat: -2.5615, lng: 121.3475 },
  { id: 7, code: 'AST-MGN-003', ownerName: 'Hasan Basri', village: 'Desa Magani', landArea: 470, buildingArea: 125, certificateStatus: 'SHM', coordinates: '-2.5620, 121.3485', lat: -2.5620, lng: 121.3485 },
  { id: 8, code: 'AST-MGN-004', ownerName: 'Ratna Dewi', village: 'Desa Magani', landArea: 490, buildingArea: 120, certificateStatus: 'SHM', coordinates: '-2.5612, 121.3460', lat: -2.5612, lng: 121.3460 },
  
  { id: 9, code: 'AST-WWR-001', ownerName: 'Usman Harun', village: 'Desa Wewangriu', landArea: 530, buildingArea: 135, certificateStatus: 'SHM', coordinates: '-2.5685, 121.3425', lat: -2.5685, lng: 121.3425 },
  { id: 10, code: 'AST-WWR-002', ownerName: 'Fatimah Zahra', village: 'Desa Wewangriu', landArea: 510, buildingArea: 128, certificateStatus: 'SHGB', coordinates: '-2.5695, 121.3435', lat: -2.5695, lng: 121.3435 },
  { id: 11, code: 'AST-WWR-003', ownerName: 'Rahman Wiranto', village: 'Desa Wewangriu', landArea: 560, buildingArea: 145, certificateStatus: 'SHM', coordinates: '-2.5705, 121.3445', lat: -2.5705, lng: 121.3445 },
  { id: 12, code: 'AST-WWR-004', ownerName: 'Nurul Huda', village: 'Desa Wewangriu', landArea: 495, buildingArea: 122, certificateStatus: 'SHM', coordinates: '-2.5698, 121.3420', lat: -2.5698, lng: 121.3420 },
  
  { id: 13, code: 'AST-NKL-001', ownerName: 'Bambang Trianto', village: 'Desa Nikkel', landArea: 540, buildingArea: 138, certificateStatus: 'SHM', coordinates: '-2.5695, 121.3485', lat: -2.5695, lng: 121.3485 },
  { id: 14, code: 'AST-NKL-002', ownerName: 'Dewi Anggraini', village: 'Desa Nikkel', landArea: 520, buildingArea: 132, certificateStatus: 'SHGB', coordinates: '-2.5705, 121.3495', lat: -2.5705, lng: 121.3495 },
  { id: 15, code: 'AST-NKL-003', ownerName: 'Irfan Maulana', village: 'Desa Nikkel', landArea: 575, buildingArea: 148, certificateStatus: 'SHM', coordinates: '-2.5715, 121.3505', lat: -2.5715, lng: 121.3505 },
  { id: 16, code: 'AST-NKL-004', ownerName: 'Wulan Sari', village: 'Desa Nikkel', landArea: 505, buildingArea: 125, certificateStatus: 'SHM', coordinates: '-2.5708, 121.3480', lat: -2.5708, lng: 121.3480 },
])

const filteredAssets = computed(() => {
  if (selectedVillage.value === 'all') {
    return assets.value
  }
  return assets.value.filter(asset => asset.village === selectedVillage.value)
})

const villageSummary = computed(() => {
  const villages = ['Desa Sorowako', 'Desa Magani', 'Desa Wewangriu', 'Desa Nikkel']
  return villages.map(village => {
    const villageAssets = assets.value.filter(a => a.village === village)
    return {
      name: village,
      totalAssets: villageAssets.length,
      totalKK: villageAssets.length,
      totalArea: villageAssets.reduce((sum, a) => sum + a.landArea, 0)
    }
  })
})

onUnmounted(() => {
  if (assetMap) {
    assetMap.remove()
    assetMap = null
  }
})

const filterByVillage = () => {
  if (showMap.value && assetMap) {
    initAssetMap()
  }
}

const selectVillageFilter = (villageName: string) => {
  selectedVillage.value = villageName
  filterByVillage()
}

const toggleView = () => {
  showMap.value = !showMap.value
}

const initAssetMap = () => {
  if (assetMap) {
    assetMap.remove()
  }

  if (!assetMapContainer.value) return

  const centerCoords = filteredAssets.value.length > 0 && filteredAssets.value[0]
    ? [filteredAssets.value[0].lat, filteredAssets.value[0].lng] as [number, number]
    : [-2.5650, 121.3450] as [number, number]

  assetMap = L.map('asset-map').setView(centerCoords, 14)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(assetMap)

  // Add markers
  filteredAssets.value.forEach(asset => {
    const houseIcon = L.divIcon({
      className: 'custom-house-marker',
      html: `<div style="background: #dc3545; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    })

    const marker = L.marker([asset.lat, asset.lng], { icon: houseIcon }).addTo(assetMap!)
    
    marker.bindPopup(`
      <div style="min-width: 200px;">
        <h6><strong>${asset.ownerName}</strong></h6>
        <p class="mb-1"><small><strong>Kode:</strong> ${asset.code}</small></p>
        <p class="mb-1"><small><strong>Desa:</strong> ${asset.village}</small></p>
        <p class="mb-1"><small><strong>Luas Tanah:</strong> ${asset.landArea} m²</small></p>
        <p class="mb-1"><small><strong>Luas Bangunan:</strong> ${asset.buildingArea} m²</small></p>
        <p class="mb-0"><small><strong>Sertifikat:</strong> ${asset.certificateStatus}</small></p>
      </div>
    `)
  })

  // Draw IUPK Valemis boundary (larger area encompassing all villages)
  const iupkBoundary: [number, number][] = [
    [-2.556, 121.338],  // Northwest corner
    [-2.556, 121.353],  // Northeast corner
    [-2.574, 121.353],  // Southeast corner
    [-2.574, 121.338],  // Southwest corner
    [-2.556, 121.338]   // Close the polygon
  ]

  L.polygon(iupkBoundary, {
    color: '#0d6efd',        // Blue border
    weight: 3,               // Thicker border for visibility
    fillColor: '#0d6efd',    // Blue fill
    fillOpacity: 0.05,       // Very low opacity to not obscure villages
    dashArray: '10, 5'       // Dashed line for distinction
  }).addTo(assetMap!).bindPopup(`
    <div style="min-width: 200px;">
      <h6><strong>Area IUPK Valemis</strong></h6>
      <p class="mb-1"><small>Izin Usaha Pertambangan Khusus</small></p>
      <p class="mb-0"><small>Mencakup 4 desa: Sorowako, Magani, Wewangriu, Nikkel</small></p>
    </div>
  `)

  // Draw village polygons
  const villagePolygons: Record<string, [number, number][]> = {
    'Desa Sorowako': [[-2.558, 121.340], [-2.559, 121.344], [-2.562, 121.345], [-2.563, 121.343], [-2.561, 121.339], [-2.559, 121.339], [-2.558, 121.340]],
    'Desa Magani': [[-2.559, 121.345], [-2.560, 121.349], [-2.563, 121.350], [-2.564, 121.347], [-2.562, 121.344], [-2.560, 121.344], [-2.559, 121.345]],
    'Desa Wewangriu': [[-2.567, 121.341], [-2.568, 121.345], [-2.571, 121.346], [-2.572, 121.343], [-2.570, 121.340], [-2.568, 121.340], [-2.567, 121.341]],
    'Desa Nikkel': [[-2.568, 121.347], [-2.569, 121.351], [-2.572, 121.352], [-2.573, 121.349], [-2.571, 121.346], [-2.569, 121.346], [-2.568, 121.347]]
  }

  Object.entries(villagePolygons).forEach(([villageName, coords]) => {
    if (selectedVillage.value === 'all' || selectedVillage.value === villageName) {
      L.polygon(coords, { 
        color: '#dc3545', 
        weight: 2, 
        fillColor: '#dc3545', 
        fillOpacity: 0.1 
      }).addTo(assetMap!).bindPopup(`<strong>${villageName}</strong>`)
    }
  })
}

const getCertificateClass = (status: string) => {
  return status === 'SHM' ? 'bg-success' : 'bg-warning'
}

const viewOnMap = (asset: Asset) => {
  showMap.value = true
  nextTick(() => {
    initAssetMap()
    if (assetMap) {
      assetMap.setView([asset.lat, asset.lng], 17)
    }
  })
}

const addAsset = () => {
  isEditMode.value = false
  formData.value = {
    code: '',
    ownerName: '',
    village: '',
    landArea: 0,
    buildingArea: 0,
    certificateStatus: '',
    lat: '',
    lng: '',
    // Form Identitas Kepala Keluarga
    namaDepan: '',
    namaTengah: '',
    namaBelakang: '',
    namaAyah: '',
    namaKakek: '',
    namaPasangan: '',
    nomorTelepon: '',
    nik: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    namaResponden: '',
    hubunganResponden: '',
    // Identifikasi Rumah Tangga dan PAP
    kodeEnumerator: '',
    tanggalSurvei: '',
    kodeFotoSurvei: '',
    idUnik: ''
  }
  openModal()
}

const editAsset = (asset: Asset) => {
  isEditMode.value = true
  formData.value = {
    id: asset.id,
    code: asset.code,
    ownerName: asset.ownerName,
    village: asset.village,
    landArea: asset.landArea,
    buildingArea: asset.buildingArea,
    certificateStatus: asset.certificateStatus,
    lat: asset.lat.toString(),
    lng: asset.lng.toString(),
    // Form Identitas Kepala Keluarga - empty for existing data
    namaDepan: '',
    namaTengah: '',
    namaBelakang: '',
    namaAyah: '',
    namaKakek: '',
    namaPasangan: '',
    nomorTelepon: '',
    nik: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    namaResponden: '',
    hubunganResponden: '',
    // Identifikasi Rumah Tangga dan PAP - empty for existing data
    kodeEnumerator: '',
    tanggalSurvei: '',
    kodeFotoSurvei: '',
    idUnik: ''
  }
  openModal()
}

const saveAsset = () => {
  const lat = parseFloat(formData.value.lat)
  const lng = parseFloat(formData.value.lng)
  
  if (isNaN(lat) || isNaN(lng)) {
    alert('Koordinat tidak valid! Pastikan format latitude dan longitude benar.')
    return
  }

  const coordinates = `${lat}, ${lng}`

  if (isEditMode.value && formData.value.id) {
    // Edit existing asset
    const index = assets.value.findIndex(a => a.id === formData.value.id)
    if (index !== -1 && formData.value.id && assets.value[index]) {
      const currentAsset = assets.value[index]
      assets.value[index] = {
        id: formData.value.id,
        code: currentAsset.code,
        ownerName: formData.value.ownerName,
        village: formData.value.village,
        landArea: formData.value.landArea,
        buildingArea: formData.value.buildingArea,
        certificateStatus: formData.value.certificateStatus,
        coordinates,
        lat,
        lng
      }
      alert(`Asset ${formData.value.code} berhasil diupdate!`)
    }
  } else {
    // Add new asset
    const newId = Math.max(...assets.value.map(a => a.id)) + 1
    assets.value.push({
      id: newId,
      code: formData.value.code,
      ownerName: formData.value.ownerName,
      village: formData.value.village,
      landArea: formData.value.landArea,
      buildingArea: formData.value.buildingArea,
      certificateStatus: formData.value.certificateStatus,
      coordinates,
      lat,
      lng
    })
    alert(`Asset ${formData.value.code} berhasil ditambahkan!`)
  }

  closeModal()
  if (showMap.value) {
    initAssetMap()
  }
}

const openModal = () => {
  if (assetModalRef.value) {
    // Use Bootstrap 5 Modal API
    const Modal = (window as any).bootstrap?.Modal
    if (Modal) {
      modalInstance = new Modal(assetModalRef.value)
      modalInstance.show()
    } else {
      // Fallback if Bootstrap JS is not loaded
      assetModalRef.value.classList.add('show')
      assetModalRef.value.style.display = 'block'
      document.body.classList.add('modal-open')
    }
  }
}

const closeModal = () => {
  if (modalInstance) {
    modalInstance.hide()
  } else if (assetModalRef.value) {
    // Fallback
    assetModalRef.value.classList.remove('show')
    assetModalRef.value.style.display = 'none'
    document.body.classList.remove('modal-open')
  }
}

const deleteAsset = (asset: Asset) => {
  if (confirm(`Hapus asset ${asset.code} - ${asset.ownerName}?\n\nData akan dihapus secara permanen.`)) {
    const index = assets.value.findIndex(a => a.id === asset.id)
    if (index !== -1) {
      assets.value.splice(index, 1)
      alert('Asset berhasil dihapus!')
      if (showMap.value) {
        initAssetMap()
      }
    }
  }
}

// Initialize map on mount if showMap is true
onMounted(() => {
  if (showMap.value) {
    nextTick(() => {
      initAssetMap()
    })
  }
})

watch(showMap, (newVal) => {
  if (newVal) {
    nextTick(() => {
      initAssetMap()
    })
  }
})
</script>

<style scoped>
.custom-house-marker {
  background: transparent;
  border: none;
}
</style>
