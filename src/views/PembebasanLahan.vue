<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Land Acquisition</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item"><router-link to="/"><i class="bi bi-house-fill"></i></router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Land Acquisition</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <!-- Filter Section -->
        <div class="row mb-3">
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <label class="form-label"><strong><i class="bi bi-funnel"></i> Filter per Project</strong></label>
                <select v-model="selectedProject" class="form-select" @change="filterData">
                  <option value="all">Semua Project</option>
                  <option value="Project Alpha - Mining Expansion">Project Alpha</option>
                  <option value="Project Beta - Infrastructure Development">Project Beta</option>
                  <option value="Project Gamma - Road Access">Project Gamma</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <label class="form-label"><strong><i class="bi bi-filter"></i> Status Negosiasi</strong></label>
                <select v-model="selectedStatus" class="form-select" @change="filterData">
                  <option value="all">Semua Status</option>
                  <option value="Bebas">Bebas</option>
                  <option value="Dalam Negosiasi">Dalam Negosiasi</option>
                  <option value="Belum Diproses">Belum Diproses</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-6">
                <div class="card bg-success text-white">
                  <div class="card-body">
                    <h4 class="mb-0">{{ stats.bebas }}</h4>
                    <small>Parcel Bebas</small>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card bg-warning">
                  <div class="card-body">
                    <h4 class="mb-0">{{ stats.negosiasi }}</h4>
                    <small>Dalam Negosiasi</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Projects Cards -->
        <div class="row mb-3">
          <div class="col-md-4" v-for="project in projectSummary" :key="project.name">
            <div class="card border-left-primary">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h5 class="mb-0">{{ project.name }}</h5>
                  <span class="badge bg-primary">{{ project.progress }}%</span>
                </div>
                <div class="progress mb-2" style="height: 8px;">
                  <div class="progress-bar bg-success" :style="{ width: project.progress + '%' }"></div>
                </div>
                <div class="row text-center">
                  <div class="col-3">
                    <small class="text-muted">Terdampak</small>
                    <p class="mb-0"><strong>{{ project.totalParcels }}</strong></p>
                  </div>
                  <div class="col-3">
                    <small class="text-muted">Bebas</small>
                    <p class="mb-0"><strong class="text-success">{{ project.bebas }}</strong></p>
                  </div>
                  <div class="col-6">
                    <small class="text-muted">Biaya</small>
                    <p class="mb-0" style="white-space: nowrap; overflow: visible;"><strong style="font-size: 0.9rem;">{{ formatRupiah(project.totalCost) }}</strong></p>
                  </div>
                </div>
                <button class="btn btn-sm btn-outline-primary mt-2 w-100" @click="filterByProject(project.name)">
                  <i class="bi bi-eye"></i> Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Table -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-table"></i> Data Land Acquisition per Parcel</h3>
                <div class="card-tools">
                  <button class="btn btn-sm btn-primary me-2" @click="addParcel">
                    <i class="bi bi-plus-circle"></i> Tambah Parcel
                  </button>
                  <button class="btn btn-sm btn-success" @click="exportData">
                    <i class="bi bi-file-earmark-excel"></i> Export Excel
                  </button>
                </div>
              </div>
              <div class="card-body table-responsive">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode Parcel</th>
                      <th>Project</th>
                      <th>Nama Pemilik</th>
                      <th>Desa</th>
                      <th>Luas (m²)</th>
                      <th>Status Negosiasi</th>
                      <th>Jumlah Bebas</th>
                      <th style="white-space: nowrap;">Biaya Pembebasan</th>
                      <th>Tanggal Negosiasi</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(parcel, index) in filteredParcels" :key="parcel.id">
                      <td>{{ index + 1 }}</td>
                      <td><span class="badge bg-info">{{ parcel.code }}</span></td>
                      <td><small>{{ parcel.project }}</small></td>
                      <td><strong>{{ parcel.ownerName }}</strong></td>
                      <td>{{ parcel.village }}</td>
                      <td class="text-end">{{ parcel.area.toLocaleString() }}</td>
                      <td>
                        <span class="badge" :class="getStatusClass(parcel.status)">
                          {{ parcel.status }}
                        </span>
                      </td>
                      <td>
                        <input 
                          v-if="parcel.status !== 'Bebas'" 
                          type="number" 
                          class="form-control form-control-sm" 
                          v-model="parcel.jumlahBebas"
                          @change="updateJumlahBebas(parcel)"
                          min="0"
                          :max="parcel.area"
                          style="width: 100px;"
                        />
                        <span v-else class="text-success"><strong>{{ parcel.jumlahBebas }} m²</strong></span>
                      </td>
                      <td style="white-space: nowrap;">
                        <input 
                          v-if="parcel.status !== 'Bebas'" 
                          type="text" 
                          class="form-control form-control-sm" 
                          v-model="parcel.biayaPembebasan"
                          @blur="formatBiaya(parcel)"
                          style="width: 150px;"
                        />
                        <span v-else class="text-success"><strong>{{ formatRupiah(parcel.biayaPembebasan) }}</strong></span>
                      </td>
                      <td><small>{{ parcel.negotiationDate }}</small></td>
                      <td class="text-center" style="white-space: nowrap;">
                        <div class="btn-group" role="group">
                          <button class="btn btn-sm btn-success" @click="markAsBebas(parcel)" v-if="parcel.status !== 'Bebas'" title="Mark as Bebas">
                            <i class="bi bi-check-circle"></i>
                          </button>
                          <button class="btn btn-sm btn-warning" @click="editParcel(parcel)" title="Edit">
                            <i class="bi bi-pencil-square"></i>
                          </button>
                          <button class="btn btn-sm btn-info" @click="viewHistory(parcel)" title="Lihat History">
                            <i class="bi bi-clock-history"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot v-if="filteredParcels.length > 0">
                    <tr class="table-secondary">
                      <td colspan="5" class="text-end"><strong>Total:</strong></td>
                      <td class="text-end" style="white-space: nowrap;"><strong>{{ totalArea.toLocaleString() }} m²</strong></td>
                      <td class="text-center"><strong>-</strong></td>
                      <td class="text-center"><strong>-</strong></td>
                      <td class="text-end" style="white-space: nowrap;"><strong>{{ formatRupiah(totalCost) }}</strong></td>
                      <td colspan="2"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Parcel Modal -->
    <div class="modal fade" id="parcelModal" tabindex="-1" aria-labelledby="parcelModalLabel" aria-hidden="true" ref="parcelModalRef">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="parcelModalLabel">
              {{ isEditMode ? 'Edit Parcel' : 'Tambah Parcel Baru' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveParcel">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Kode Parcel</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.code" 
                    placeholder="Contoh: PCL-ALP-001"
                    :disabled="isEditMode"
                    required 
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Project</strong> <span class="text-danger">*</span></label>
                  <select class="form-select" v-model="formData.project" required>
                    <option value="">Pilih Project</option>
                    <option value="Project Alpha - Mining Expansion">Project Alpha - Mining Expansion</option>
                    <option value="Project Beta - Infrastructure Development">Project Beta - Infrastructure Development</option>
                    <option value="Project Gamma - Road Access">Project Gamma - Road Access</option>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Nama Pemilik</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.ownerName" 
                    placeholder="Nama lengkap pemilik lahan"
                    required 
                  />
                </div>
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
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Luas Area (m²)</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model.number="formData.area" 
                    placeholder="Contoh: 500"
                    min="1"
                    required 
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Status Negosiasi</strong> <span class="text-danger">*</span></label>
                  <select class="form-select" v-model="formData.status" required>
                    <option value="">Pilih Status</option>
                    <option value="Belum Diproses">Belum Diproses</option>
                    <option value="Dalam Negosiasi">Dalam Negosiasi</option>
                    <option value="Bebas">Bebas</option>
                  </select>
                </div>
              </div>

              <div class="row" v-if="formData.status === 'Bebas'">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Jumlah Bebas (m²)</strong></label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model.number="formData.jumlahBebas" 
                    placeholder="Luas yang sudah dibebaskan"
                    min="0"
                    :max="formData.area"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Biaya Pembebasan (Rp)</strong></label>
                  <input 
                    type="number" 
                    class="form-control" 
                    v-model.number="formData.biayaPembebasan" 
                    placeholder="Total biaya pembebasan"
                    min="0"
                  />
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

    <!-- History Modal -->
    <div class="modal fade" id="historyModal" tabindex="-1" aria-labelledby="historyModalLabel" aria-hidden="true" ref="historyModalRef">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="historyModalLabel">
              <i class="bi bi-clock-history"></i> History Negosiasi - {{ selectedParcel?.code }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="selectedParcel">
              <div class="alert alert-info">
                <strong>Parcel:</strong> {{ selectedParcel.code }}<br>
                <strong>Pemilik:</strong> {{ selectedParcel.ownerName }}<br>
                <strong>Project:</strong> {{ selectedParcel.project }}<br>
                <strong>Status Saat Ini:</strong> <span class="badge" :class="getStatusClass(selectedParcel.status)">{{ selectedParcel.status }}</span>
              </div>

              <h6 class="mb-3"><strong>Timeline Negosiasi:</strong></h6>
              <div class="timeline">
                <div class="timeline-item mb-3">
                  <div class="d-flex">
                    <div class="timeline-badge bg-primary">
                      <i class="bi bi-plus-circle"></i>
                    </div>
                    <div class="timeline-panel ms-3">
                      <div class="timeline-heading">
                        <h6 class="mb-1">Parcel Ditambahkan</h6>
                        <p class="text-muted mb-0"><small>2024-08-15 10:30</small></p>
                      </div>
                      <div class="timeline-body">
                        <p class="mb-0">Parcel {{ selectedParcel.code }} ditambahkan ke sistem untuk project {{ selectedParcel.project }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="timeline-item mb-3" v-if="selectedParcel.status !== 'Belum Diproses'">
                  <div class="d-flex">
                    <div class="timeline-badge bg-warning">
                      <i class="bi bi-chat-dots"></i>
                    </div>
                    <div class="timeline-panel ms-3">
                      <div class="timeline-heading">
                        <h6 class="mb-1">Negosiasi Dimulai</h6>
                        <p class="text-muted mb-0"><small>2024-09-20 14:15</small></p>
                      </div>
                      <div class="timeline-body">
                        <p class="mb-0">Proses negosiasi dengan pemilik lahan {{ selectedParcel.ownerName }} telah dimulai</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="timeline-item mb-3" v-if="selectedParcel.status === 'Bebas'">
                  <div class="d-flex">
                    <div class="timeline-badge bg-success">
                      <i class="bi bi-check-circle"></i>
                    </div>
                    <div class="timeline-panel ms-3">
                      <div class="timeline-heading">
                        <h6 class="mb-1">Pembebasan Selesai</h6>
                        <p class="text-muted mb-0"><small>{{ selectedParcel.negotiationDate }}</small></p>
                      </div>
                      <div class="timeline-body">
                        <p class="mb-0">
                          Lahan berhasil dibebaskan<br>
                          <strong>Luas:</strong> {{ selectedParcel.jumlahBebas }} m²<br>
                          <strong>Biaya:</strong> {{ formatRupiah(selectedParcel.biayaPembebasan) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Parcel {
  id: number
  code: string
  project: string
  ownerName: string
  village: string
  area: number
  status: 'Bebas' | 'Dalam Negosiasi' | 'Belum Diproses'
  jumlahBebas: number
  biayaPembebasan: string | number
  negotiationDate: string
}

interface FormData {
  id?: number
  code: string
  project: string
  ownerName: string
  village: string
  area: number
  status: 'Bebas' | 'Dalam Negosiasi' | 'Belum Diproses' | ''
  jumlahBebas: number
  biayaPembebasan: number
}

const selectedProject = ref<string>('all')
const selectedStatus = ref<string>('all')
const parcelModalRef = ref<HTMLElement | null>(null)
const historyModalRef = ref<HTMLElement | null>(null)
let parcelModalInstance: any = null
let historyModalInstance: any = null

// Form state
const isEditMode = ref<boolean>(false)
const selectedParcel = ref<Parcel | null>(null)
const formData = ref<FormData>({
  code: '',
  project: '',
  ownerName: '',
  village: '',
  area: 0,
  status: '',
  jumlahBebas: 0,
  biayaPembebasan: 0
})

// Dummy data - lahan yang terdampak project
const parcels = ref<Parcel[]>([
  // Project Alpha parcels
  { id: 1, code: 'PCL-ALP-001', project: 'Project Alpha - Mining Expansion', ownerName: 'Budi Santoso', village: 'Desa Sorowako', area: 500, status: 'Bebas', jumlahBebas: 500, biayaPembebasan: 450000000, negotiationDate: '2024-10-15' },
  { id: 2, code: 'PCL-ALP-002', project: 'Project Alpha - Mining Expansion', ownerName: 'Ahmad Hidayat', village: 'Desa Sorowako', area: 450, status: 'Bebas', jumlahBebas: 450, biayaPembebasan: 425000000, negotiationDate: '2024-10-18' },
  { id: 3, code: 'PCL-ALP-003', project: 'Project Alpha - Mining Expansion', ownerName: 'Siti Rahma', village: 'Desa Sorowako', area: 600, status: 'Dalam Negosiasi', jumlahBebas: 0, biayaPembebasan: 0, negotiationDate: '2024-11-20' },
  { id: 4, code: 'PCL-ALP-004', project: 'Project Alpha - Mining Expansion', ownerName: 'Andi Suryanto', village: 'Desa Magani', area: 480, status: 'Bebas', jumlahBebas: 480, biayaPembebasan: 435000000, negotiationDate: '2024-10-22' },
  { id: 5, code: 'PCL-ALP-005', project: 'Project Alpha - Mining Expansion', ownerName: 'Maria Ulfa', village: 'Desa Magani', area: 550, status: 'Dalam Negosiasi', jumlahBebas: 0, biayaPembebasan: 0, negotiationDate: '2024-11-25' },
  { id: 6, code: 'PCL-ALP-006', project: 'Project Alpha - Mining Expansion', ownerName: 'Hasan Basri', village: 'Desa Magani', area: 470, status: 'Belum Diproses', jumlahBebas: 0, biayaPembebasan: 0, negotiationDate: '-' },
  
  // Project Beta parcels
  { id: 7, code: 'PCL-BTA-001', project: 'Project Beta - Infrastructure Development', ownerName: 'Usman Harun', village: 'Desa Wewangriu', area: 530, status: 'Bebas', jumlahBebas: 530, biayaPembebasan: 485000000, negotiationDate: '2024-09-10' },
  { id: 8, code: 'PCL-BTA-002', project: 'Project Beta - Infrastructure Development', ownerName: 'Fatimah Zahra', village: 'Desa Wewangriu', area: 510, status: 'Dalam Negosiasi', jumlahBebas: 0, biayaPembebasan: 0, negotiationDate: '2024-11-15' },
  { id: 9, code: 'PCL-BTA-003', project: 'Project Beta - Infrastructure Development', ownerName: 'Rahman Wiranto', village: 'Desa Wewangriu', area: 560, status: 'Belum Diproses', jumlahBebas: 0, biayaPembebasan: 0, negotiationDate: '-' },
  { id: 10, code: 'PCL-BTA-004', project: 'Project Beta - Infrastructure Development', ownerName: 'Nurul Huda', village: 'Desa Wewangriu', area: 495, status: 'Dalam Negosiasi', jumlahBebas: 0, biayaPembebasan: 0, negotiationDate: '2024-11-28' },
  
  // Project Gamma parcels
  { id: 11, code: 'PCL-GMA-001', project: 'Project Gamma - Road Access', ownerName: 'Bambang Trianto', village: 'Desa Nikkel', area: 540, status: 'Bebas', jumlahBebas: 540, biayaPembebasan: 495000000, negotiationDate: '2024-08-20' },
  { id: 12, code: 'PCL-GMA-002', project: 'Project Gamma - Road Access', ownerName: 'Dewi Anggraini', village: 'Desa Nikkel', area: 520, status: 'Bebas', jumlahBebas: 520, biayaPembebasan: 475000000, negotiationDate: '2024-08-25' },
  { id: 13, code: 'PCL-GMA-003', project: 'Project Gamma - Road Access', ownerName: 'Irfan Maulana', village: 'Desa Nikkel', area: 575, status: 'Bebas', jumlahBebas: 575, biayaPembebasan: 525000000, negotiationDate: '2024-09-01' },
  { id: 14, code: 'PCL-GMA-004', project: 'Project Gamma - Road Access', ownerName: 'Wulan Sari', village: 'Desa Nikkel', area: 505, status: 'Dalam Negosiasi', jumlahBebas: 0, biayaPembebasan: 0, negotiationDate: '2024-11-30' },
])

const filteredParcels = computed(() => {
  let result = parcels.value
  
  if (selectedProject.value !== 'all') {
    result = result.filter(p => p.project === selectedProject.value)
  }
  
  if (selectedStatus.value !== 'all') {
    result = result.filter(p => p.status === selectedStatus.value)
  }
  
  return result
})

const stats = computed(() => {
  return {
    bebas: filteredParcels.value.filter(p => p.status === 'Bebas').length,
    negosiasi: filteredParcels.value.filter(p => p.status === 'Dalam Negosiasi').length
  }
})

const totalArea = computed(() => {
  return filteredParcels.value.reduce((sum, p) => sum + p.area, 0)
})

const totalCost = computed(() => {
  return filteredParcels.value.reduce((sum, p) => {
    const cost = typeof p.biayaPembebasan === 'number' ? p.biayaPembebasan : 0
    return sum + cost
  }, 0)
})

const projectSummary = computed(() => {
  const projects = [
    'Project Alpha - Mining Expansion',
    'Project Beta - Infrastructure Development',
    'Project Gamma - Road Access'
  ]
  
  return projects.map(projectName => {
    const projectParcels = parcels.value.filter(p => p.project === projectName)
    const bebasParcels = projectParcels.filter(p => p.status === 'Bebas')
    const totalCostProject = projectParcels.reduce((sum, p) => {
      const cost = typeof p.biayaPembebasan === 'number' ? p.biayaPembebasan : 0
      return sum + cost
    }, 0)
    
    return {
      name: projectName.split(' - ')[0],
      fullName: projectName,
      totalParcels: projectParcels.length,
      bebas: bebasParcels.length,
      progress: projectParcels.length > 0 ? Math.round((bebasParcels.length / projectParcels.length) * 100) : 0,
      totalCost: totalCostProject
    }
  })
})

const filterData = () => {
  // Data will be automatically filtered via computed property
}

const filterByProject = (projectName: string) => {
  const fullProjectName = parcels.value.find(p => p.project.startsWith(projectName))?.project || projectName
  selectedProject.value = fullProjectName
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Bebas': return 'bg-success'
    case 'Dalam Negosiasi': return 'bg-warning'
    case 'Belum Diproses': return 'bg-secondary'
    default: return 'bg-secondary'
  }
}

const formatRupiah = (value: number | string) => {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(num)
}

const formatBiaya = (parcel: Parcel) => {
  // Convert string to number if needed
  if (typeof parcel.biayaPembebasan === 'string') {
    const cleaned = parcel.biayaPembebasan.replace(/[^0-9]/g, '')
    parcel.biayaPembebasan = cleaned ? parseInt(cleaned) : 0
  }
}

const updateJumlahBebas = (parcel: Parcel) => {
  if (parcel.jumlahBebas > parcel.area) {
    parcel.jumlahBebas = parcel.area
    alert('Jumlah bebas tidak boleh melebihi luas area')
  }
}

const markAsBebas = (parcel: Parcel) => {
  if (parcel.jumlahBebas === 0 || parcel.biayaPembebasan === 0) {
    alert('Mohon isi Jumlah Bebas dan Biaya Pembebasan terlebih dahulu')
    return
  }
  
  if (confirm(`Tandai parcel ${parcel.code} sebagai Bebas?`)) {
    parcel.status = 'Bebas'
    parcel.negotiationDate = new Date().toISOString().split('T')[0]
    alert('Status berhasil diupdate menjadi Bebas. Negosiasi telah di-clear.')
  }
}

const addParcel = () => {
  isEditMode.value = false
  formData.value = {
    code: '',
    project: '',
    ownerName: '',
    village: '',
    area: 0,
    status: '',
    jumlahBebas: 0,
    biayaPembebasan: 0
  }
  openParcelModal()
}

const editParcel = (parcel: Parcel) => {
  isEditMode.value = true
  formData.value = {
    id: parcel.id,
    code: parcel.code,
    project: parcel.project,
    ownerName: parcel.ownerName,
    village: parcel.village,
    area: parcel.area,
    status: parcel.status,
    jumlahBebas: parcel.jumlahBebas,
    biayaPembebasan: typeof parcel.biayaPembebasan === 'number' ? parcel.biayaPembebasan : 0
  }
  openParcelModal()
}

const saveParcel = () => {
  if (isEditMode.value && formData.value.id) {
    // Edit existing parcel
    const index = parcels.value.findIndex(p => p.id === formData.value.id)
    if (index !== -1) {
      parcels.value[index] = {
        id: parcels.value[index].id,
        code: parcels.value[index].code,
        project: formData.value.project,
        ownerName: formData.value.ownerName,
        village: formData.value.village,
        area: formData.value.area,
        status: formData.value.status as 'Bebas' | 'Dalam Negosiasi' | 'Belum Diproses',
        jumlahBebas: formData.value.status === 'Bebas' ? formData.value.jumlahBebas : 0,
        biayaPembebasan: formData.value.status === 'Bebas' ? formData.value.biayaPembebasan : 0,
        negotiationDate: formData.value.status === 'Bebas' ? new Date().toISOString().split('T')[0]! : '-'
      }
      alert(`Parcel ${formData.value.code} berhasil diupdate!`)
    }
  } else {
    // Add new parcel
    const newId = Math.max(...parcels.value.map(p => p.id)) + 1
    const projectPrefix = formData.value.project.includes('Alpha') ? 'ALP' : 
                          formData.value.project.includes('Beta') ? 'BTA' : 'GMA'
    const projectParcels = parcels.value.filter(p => p.code.includes(projectPrefix))
    const newNumber = String(projectParcels.length + 1).padStart(3, '0')
    const generatedCode = `PCL-${projectPrefix}-${newNumber}`
    
    parcels.value.push({
      id: newId,
      code: formData.value.code || generatedCode,
      project: formData.value.project,
      ownerName: formData.value.ownerName,
      village: formData.value.village,
      area: formData.value.area,
      status: formData.value.status as 'Bebas' | 'Dalam Negosiasi' | 'Belum Diproses',
      jumlahBebas: formData.value.status === 'Bebas' ? formData.value.jumlahBebas : 0,
      biayaPembebasan: formData.value.status === 'Bebas' ? formData.value.biayaPembebasan : 0,
      negotiationDate: formData.value.status === 'Bebas' ? new Date().toISOString().split('T')[0]! : '-'
    })
    alert(`Parcel ${formData.value.code || generatedCode} berhasil ditambahkan!`)
  }

  closeParcelModal()
}

const viewHistory = (parcel: Parcel) => {
  selectedParcel.value = parcel
  openHistoryModal()
}

const openParcelModal = () => {
  if (parcelModalRef.value) {
    const Modal = (window as any).bootstrap?.Modal
    if (Modal) {
      parcelModalInstance = new Modal(parcelModalRef.value)
      parcelModalInstance.show()
    } else {
      parcelModalRef.value.classList.add('show')
      parcelModalRef.value.style.display = 'block'
      document.body.classList.add('modal-open')
    }
  }
}

const closeParcelModal = () => {
  if (parcelModalInstance) {
    parcelModalInstance.hide()
  } else if (parcelModalRef.value) {
    parcelModalRef.value.classList.remove('show')
    parcelModalRef.value.style.display = 'none'
    document.body.classList.remove('modal-open')
  }
}

const openHistoryModal = () => {
  if (historyModalRef.value) {
    const Modal = (window as any).bootstrap?.Modal
    if (Modal) {
      historyModalInstance = new Modal(historyModalRef.value)
      historyModalInstance.show()
    } else {
      historyModalRef.value.classList.add('show')
      historyModalRef.value.style.display = 'block'
      document.body.classList.add('modal-open')
    }
  }
}

const closeHistoryModal = () => {
  if (historyModalInstance) {
    historyModalInstance.hide()
  } else if (historyModalRef.value) {
    historyModalRef.value.classList.remove('show')
    historyModalRef.value.style.display = 'none'
    document.body.classList.remove('modal-open')
  }
}

const exportData = () => {
  // Generate CSV data
  const headers = ['No', 'Kode Parcel', 'Project', 'Nama Pemilik', 'Desa', 'Luas (m²)', 'Status Negosiasi', 'Jumlah Bebas', 'Biaya Pembebasan', 'Tanggal Negosiasi']
  
  const rows = filteredParcels.value.map((parcel, index) => [
    index + 1,
    parcel.code,
    parcel.project,
    parcel.ownerName,
    parcel.village,
    parcel.area,
    parcel.status,
    parcel.jumlahBebas,
    typeof parcel.biayaPembebasan === 'number' ? parcel.biayaPembebasan : 0,
    parcel.negotiationDate
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `land_acquisition_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  alert('Data berhasil di-export ke CSV!')
}
</script>

<style scoped>
.border-left-primary {
  border-left: 4px solid #007bff;
}

.timeline {
  position: relative;
  padding: 0;
}

.timeline-item {
  position: relative;
}

.timeline-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.timeline-panel {
  flex: 1;
  padding: 10px 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #dee2e6;
}

.timeline-heading h6 {
  font-weight: 600;
  color: #333;
}

.timeline-body {
  margin-top: 8px;
}
</style>
