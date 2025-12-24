<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Land Litigasi & Claim</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="bi bi-house-fill"></i></router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Litigasi & Claim</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <!-- Statistics Cards -->
        <div class="row mb-3">
          <div class="col-lg-3 col-md-6">
            <div class="card bg-danger text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0">{{ litigationStats.active }}</h3>
                    <small>Kasus Aktif</small>
                  </div>
                  <i class="bi bi-exclamation-triangle" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card bg-warning text-dark">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0">{{ litigationStats.underReview }}</h3>
                    <small>Dalam Proses</small>
                  </div>
                  <i class="bi bi-hourglass-split" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card bg-success text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0">{{ litigationStats.resolved }}</h3>
                    <small>Selesai</small>
                  </div>
                  <i class="bi bi-check-circle" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card bg-info text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0">{{ totalClaims }}</h3>
                    <small>Total Kasus</small>
                  </div>
                  <i class="bi bi-folder" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="row mb-3">
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <label class="form-label"><strong><i class="bi bi-funnel"></i> Filter Status</strong></label>
                <select v-model="selectedStatus" class="form-select">
                  <option value="all">Semua Status</option>
                  <option value="Active">Aktif</option>
                  <option value="Under Review">Dalam Proses</option>
                  <option value="Resolved">Selesai</option>
                  <option value="Dismissed">Ditolak</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <label class="form-label"><strong><i class="bi bi-filter"></i> Jenis Kasus</strong></label>
                <select v-model="selectedType" class="form-select">
                  <option value="all">Semua Jenis</option>
                  <option value="Land Ownership">Kepemilikan Lahan</option>
                  <option value="Boundary Dispute">Sengketa Batas</option>
                  <option value="Compensation Claim">Klaim Kompensasi</option>
                  <option value="Environmental Claim">Klaim Lingkungan</option>
                  <option value="Others">Lainnya</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card bg-light">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="mb-0">{{ filteredLitigations.length }} Kasus Ditampilkan</h5>
                    <small class="text-muted">Dari total {{ litigations.length }} kasus</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Table -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-folder-open"></i> Data Litigasi & Claim</h3>
                <div class="card-tools">
                  <button class="btn btn-sm btn-primary me-2" @click="addLitigation">
                    <i class="bi bi-plus-circle"></i> Tambah Kasus
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
                      <th>Kode Kasus</th>
                      <th>Kode Lahan</th>
                      <th>Jenis Kasus</th>
                      <th>Penggugat</th>
                      <th>Deskripsi</th>
                      <th>Tanggal Mulai</th>
                      <th>Status</th>
                      <th>Prioritas</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(litigation, index) in filteredLitigations" :key="litigation.id">
                      <td>{{ index + 1 }}</td>
                      <td><span class="badge bg-danger">{{ litigation.caseCode }}</span></td>
                      <td><span class="badge bg-info">{{ litigation.landCode }}</span></td>
                      <td><small>{{ litigation.caseType }}</small></td>
                      <td><strong>{{ litigation.claimant }}</strong></td>
                      <td><small>{{ litigation.description }}</small></td>
                      <td><small>{{ litigation.startDate }}</small></td>
                      <td>
                        <span class="badge" :class="getStatusClass(litigation.status)">
                          {{ litigation.status }}
                        </span>
                      </td>
                      <td>
                        <span class="badge" :class="getPriorityClass(litigation.priority)">
                          {{ litigation.priority }}
                        </span>
                      </td>
                      <td class="text-center" style="white-space: nowrap;">
                        <div class="btn-group" role="group">
                          <button class="btn btn-sm btn-info" @click="viewTimeline(litigation)" title="Timeline">
                            <i class="bi bi-clock-history"></i>
                          </button>
                          <button class="btn btn-sm btn-primary" @click="viewDocuments(litigation)" title="Dokumen">
                            <i class="bi bi-file-earmark-text"></i>
                          </button>
                          <button class="btn btn-sm btn-warning" @click="editLitigation(litigation)" title="Edit">
                            <i class="bi bi-pencil-square"></i>
                          </button>
                          <button class="btn btn-sm btn-danger" @click="deleteLitigation(litigation)" title="Hapus">
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
        </div>

        <!-- Case Type Breakdown -->
        <div class="row mt-3">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-pie-chart"></i> Breakdown per Jenis Kasus</h3>
              </div>
              <div class="card-body">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Jenis Kasus</th>
                      <th class="text-end">Total</th>
                      <th class="text-end">Aktif</th>
                      <th class="text-end">Selesai</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="type in caseTypeBreakdown" :key="type.name">
                      <td><small>{{ type.name }}</small></td>
                      <td class="text-end">{{ type.total }}</td>
                      <td class="text-end"><strong class="text-danger">{{ type.active }}</strong></td>
                      <td class="text-end"><strong class="text-success">{{ type.resolved }}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header bg-danger text-white">
                <h3 class="card-title"><i class="bi bi-exclamation-triangle"></i> Kasus Prioritas Tinggi</h3>
              </div>
              <div class="card-body">
                <div class="list-group">
                  <div v-for="item in highPriorityCases" :key="item.id" class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 class="mb-1">{{ item.caseCode }} - {{ item.claimant }}</h6>
                        <small class="text-muted">{{ item.caseType }}</small>
                      </div>
                      <span class="badge" :class="getStatusClass(item.status)">
                        {{ item.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div class="modal fade" id="litigationModal" tabindex="-1" ref="litigationModalRef">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditMode ? 'Edit Kasus' : 'Tambah Kasus Baru' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveLitigation">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Kode Kasus</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.caseCode" 
                    placeholder="Contoh: LIT-2025-001"
                    :disabled="isEditMode"
                    required 
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Kode Lahan</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.landCode" 
                    placeholder="Contoh: LND-VALE-001"
                    required 
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Jenis Kasus</strong> <span class="text-danger">*</span></label>
                  <select class="form-select" v-model="formData.caseType" required>
                    <option value="">Pilih Jenis Kasus</option>
                    <option value="Land Ownership">Kepemilikan Lahan</option>
                    <option value="Boundary Dispute">Sengketa Batas</option>
                    <option value="Compensation Claim">Klaim Kompensasi</option>
                    <option value="Environmental Claim">Klaim Lingkungan</option>
                    <option value="Others">Lainnya</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Nama Penggugat</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.claimant" 
                    placeholder="Nama penggugat"
                    required 
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label"><strong>Deskripsi Kasus</strong> <span class="text-danger">*</span></label>
                <textarea 
                  class="form-control" 
                  v-model="formData.description" 
                  rows="3"
                  placeholder="Deskripsi lengkap kasus"
                  required
                ></textarea>
              </div>

              <div class="row">
                <div class="col-md-4 mb-3">
                  <label class="form-label"><strong>Tanggal Mulai</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="date" 
                    class="form-control" 
                    v-model="formData.startDate" 
                    required 
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label"><strong>Status</strong> <span class="text-danger">*</span></label>
                  <select class="form-select" v-model="formData.status" required>
                    <option value="">Pilih Status</option>
                    <option value="Active">Aktif</option>
                    <option value="Under Review">Dalam Proses</option>
                    <option value="Resolved">Selesai</option>
                    <option value="Dismissed">Ditolak</option>
                  </select>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label"><strong>Prioritas</strong> <span class="text-danger">*</span></label>
                  <select class="form-select" v-model="formData.priority" required>
                    <option value="">Pilih Prioritas</option>
                    <option value="High">Tinggi</option>
                    <option value="Medium">Sedang</option>
                    <option value="Low">Rendah</option>
                  </select>
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

    <!-- Timeline Modal -->
    <div class="modal fade" id="timelineModal" tabindex="-1" ref="timelineModalRef">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Timeline Kasus</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div v-if="selectedCase" class="timeline">
              <div class="timeline-item">
                <div class="timeline-marker bg-danger"></div>
                <div class="timeline-content">
                  <h6>Kasus Dibuka</h6>
                  <p class="mb-0"><small>{{ selectedCase.startDate }}</small></p>
                  <p class="text-muted mb-0"><small>Kasus {{ selectedCase.caseCode }} dibuka untuk {{ selectedCase.claimant }}</small></p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker bg-warning"></div>
                <div class="timeline-content">
                  <h6>Verifikasi Dokumen</h6>
                  <p class="mb-0"><small>{{ selectedCase.startDate }}</small></p>
                  <p class="text-muted mb-0"><small>Dokumen klaim sedang diverifikasi oleh tim legal</small></p>
                </div>
              </div>
              <div class="timeline-item" v-if="selectedCase.status === 'Resolved'">
                <div class="timeline-marker bg-success"></div>
                <div class="timeline-content">
                  <h6>Kasus Selesai</h6>
                  <p class="mb-0"><small>{{ selectedCase.startDate }}</small></p>
                  <p class="text-muted mb-0"><small>Kasus telah diselesaikan dengan kesepakatan</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Litigation {
  id: number
  caseCode: string
  landCode: string
  caseType: string
  claimant: string
  description: string
  startDate: string
  status: string
  priority: string
}

interface FormData {
  id?: number
  caseCode: string
  landCode: string
  caseType: string
  claimant: string
  description: string
  startDate: string
  status: string
  priority: string
}

const selectedStatus = ref<string>('all')
const selectedType = ref<string>('all')
const litigationModalRef = ref<HTMLElement | null>(null)
const timelineModalRef = ref<HTMLElement | null>(null)
const selectedCase = ref<Litigation | null>(null)
let litigationModalInstance: any = null
let timelineModalInstance: any = null

const isEditMode = ref<boolean>(false)
const formData = ref<FormData>({
  caseCode: '',
  landCode: '',
  caseType: '',
  claimant: '',
  description: '',
  startDate: '',
  status: '',
  priority: ''
})

const litigations = ref<Litigation[]>([
  { id: 1, caseCode: 'LIT-2025-001', landCode: 'LND-VALE-001', caseType: 'Land Ownership', claimant: 'Ahmad Kusuma', description: 'Klaim kepemilikan lahan oleh warga lokal dengan bukti sertifikat lama', startDate: '2025-01-15', status: 'Active', priority: 'High' },
  { id: 2, caseCode: 'LIT-2025-002', landCode: 'LND-ACQ-001', caseType: 'Compensation Claim', claimant: 'Siti Rahayu', description: 'Klaim kompensasi tambahan untuk pembebasan lahan', startDate: '2025-02-10', status: 'Under Review', priority: 'Medium' },
  { id: 3, caseCode: 'LIT-2025-003', landCode: 'LND-VALE-002', caseType: 'Boundary Dispute', claimant: 'Budi Santoso', description: 'Sengketa batas lahan dengan area operasional Vale', startDate: '2025-01-20', status: 'Active', priority: 'High' },
  { id: 4, caseCode: 'LIT-2024-015', landCode: 'LND-ACQ-002', caseType: 'Compensation Claim', claimant: 'Dewi Lestari', description: 'Klaim kompensasi untuk kerusakan tanaman', startDate: '2024-11-05', status: 'Resolved', priority: 'Low' },
  { id: 5, caseCode: 'LIT-2025-004', landCode: 'LND-IUPK-001', caseType: 'Environmental Claim', claimant: 'Kelompok Tani Sorowako', description: 'Klaim dampak lingkungan terhadap area pertanian', startDate: '2025-03-01', status: 'Under Review', priority: 'High' },
  { id: 6, caseCode: 'LIT-2024-020', landCode: 'LND-ACQ-003', caseType: 'Boundary Dispute', claimant: 'Hendra Wijaya', description: 'Perbedaan batas kepemilikan dengan area jalan akses', startDate: '2024-12-10', status: 'Resolved', priority: 'Medium' },
  { id: 7, caseCode: 'LIT-2025-005', landCode: 'LND-VALE-003', caseType: 'Land Ownership', claimant: 'Keluarga Marzuki', description: 'Klaim kepemilikan berdasarkan warisan keluarga', startDate: '2025-02-28', status: 'Active', priority: 'High' },
  { id: 8, caseCode: 'LIT-2025-006', landCode: 'LND-OPS-001', caseType: 'Others', claimant: 'Yusuf Rahman', description: 'Klaim akses jalan yang terblokir operasional', startDate: '2025-03-15', status: 'Under Review', priority: 'Low' },
  { id: 9, caseCode: 'LIT-2024-018', landCode: 'LND-ACQ-004', caseType: 'Compensation Claim', claimant: 'Nina Fitriani', description: 'Klaim kompensasi untuk relokasi rumah', startDate: '2024-11-20', status: 'Dismissed', priority: 'Medium' },
  { id: 10, caseCode: 'LIT-2025-007', landCode: 'LND-PPKH-001', caseType: 'Environmental Claim', claimant: 'LSM Lingkungan Luwu', description: 'Klaim dampak terhadap area konservasi', startDate: '2025-03-20', status: 'Active', priority: 'High' },
])

const filteredLitigations = computed(() => {
  let result = litigations.value
  
  if (selectedStatus.value !== 'all') {
    result = result.filter(l => l.status === selectedStatus.value)
  }
  
  if (selectedType.value !== 'all') {
    result = result.filter(l => l.caseType === selectedType.value)
  }
  
  return result
})

const totalClaims = computed(() => litigations.value.length)

const litigationStats = computed(() => {
  return {
    active: litigations.value.filter(l => l.status === 'Active').length,
    underReview: litigations.value.filter(l => l.status === 'Under Review').length,
    resolved: litigations.value.filter(l => l.status === 'Resolved').length
  }
})

const caseTypeBreakdown = computed(() => {
  const types = ['Land Ownership', 'Boundary Dispute', 'Compensation Claim', 'Environmental Claim', 'Others']
  return types.map(type => {
    const items = litigations.value.filter(l => l.caseType === type)
    return {
      name: type,
      total: items.length,
      active: items.filter(l => l.status === 'Active').length,
      resolved: items.filter(l => l.status === 'Resolved').length
    }
  }).filter(t => t.total > 0)
})

const highPriorityCases = computed(() => {
  return litigations.value
    .filter(l => l.priority === 'High' && l.status !== 'Resolved')
    .slice(0, 5)
})

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Active': return 'bg-danger'
    case 'Under Review': return 'bg-warning'
    case 'Resolved': return 'bg-success'
    case 'Dismissed': return 'bg-secondary'
    default: return 'bg-secondary'
  }
}

const getPriorityClass = (priority: string): string => {
  switch (priority) {
    case 'High': return 'bg-danger'
    case 'Medium': return 'bg-warning'
    case 'Low': return 'bg-info'
    default: return 'bg-secondary'
  }
}

const addLitigation = () => {
  isEditMode.value = false
  formData.value = {
    caseCode: '',
    landCode: '',
    caseType: '',
    claimant: '',
    description: '',
    startDate: '',
    status: '',
    priority: ''
  }
  openLitigationModal()
}

const editLitigation = (litigation: Litigation) => {
  isEditMode.value = true
  formData.value = {
    id: litigation.id,
    caseCode: litigation.caseCode,
    landCode: litigation.landCode,
    caseType: litigation.caseType,
    claimant: litigation.claimant,
    description: litigation.description,
    startDate: litigation.startDate,
    status: litigation.status,
    priority: litigation.priority
  }
  openLitigationModal()
}

const saveLitigation = () => {
  if (isEditMode.value && formData.value.id) {
    const index = litigations.value.findIndex(l => l.id === formData.value.id)
    if (index !== -1 && formData.value.id && litigations.value[index]) {
      const currentLitigation = litigations.value[index]
      litigations.value[index] = {
        id: formData.value.id,
        caseCode: currentLitigation.caseCode,
        landCode: formData.value.landCode,
        caseType: formData.value.caseType,
        claimant: formData.value.claimant,
        description: formData.value.description,
        startDate: formData.value.startDate,
        status: formData.value.status,
        priority: formData.value.priority
      }
      alert('Kasus berhasil diupdate!')
    }
  } else {
    const newId = Math.max(...litigations.value.map(l => l.id)) + 1
    litigations.value.push({
      id: newId,
      caseCode: formData.value.caseCode,
      landCode: formData.value.landCode,
      caseType: formData.value.caseType,
      claimant: formData.value.claimant,
      description: formData.value.description,
      startDate: formData.value.startDate,
      status: formData.value.status,
      priority: formData.value.priority
    })
    alert('Kasus berhasil ditambahkan!')
  }

  closeLitigationModal()
}

const deleteLitigation = (litigation: Litigation) => {
  if (confirm(`Hapus kasus ${litigation.caseCode}?\n\nData akan dihapus secara permanen.`)) {
    const index = litigations.value.findIndex(l => l.id === litigation.id)
    if (index !== -1) {
      litigations.value.splice(index, 1)
      alert('Kasus berhasil dihapus!')
    }
  }
}

const viewTimeline = (litigation: Litigation) => {
  selectedCase.value = litigation
  openTimelineModal()
}

const viewDocuments = (litigation: Litigation) => {
  alert(`Feature: Lihat Dokumen\n\nKasus: ${litigation.caseCode}\nDokumen terkait akan ditampilkan`)
}

const openLitigationModal = () => {
  if (litigationModalRef.value) {
    const Modal = (window as any).bootstrap?.Modal
    if (Modal) {
      litigationModalInstance = new Modal(litigationModalRef.value)
      litigationModalInstance.show()
    }
  }
}

const closeLitigationModal = () => {
  if (litigationModalInstance) {
    litigationModalInstance.hide()
  }
}

const openTimelineModal = () => {
  if (timelineModalRef.value) {
    const Modal = (window as any).bootstrap?.Modal
    if (Modal) {
      timelineModalInstance = new Modal(timelineModalRef.value)
      timelineModalInstance.show()
    }
  }
}

const exportData = () => {
  const headers = ['No', 'Kode Kasus', 'Kode Lahan', 'Jenis Kasus', 'Penggugat', 'Deskripsi', 'Tanggal Mulai', 'Status', 'Prioritas']
  
  const rows = filteredLitigations.value.map((l, index) => [
    index + 1,
    l.caseCode,
    l.landCode,
    l.caseType,
    l.claimant,
    l.description,
    l.startDate,
    l.status,
    l.priority
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `land_litigation_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  alert('Data berhasil di-export!')
}
</script>

<style scoped>
.list-group-item {
  border-left: 4px solid #dc3545;
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline-item {
  position: relative;
  padding-bottom: 20px;
}

.timeline-item:before {
  content: '';
  position: absolute;
  left: -22px;
  top: 8px;
  bottom: -12px;
  width: 2px;
  background: #dee2e6;
}

.timeline-item:last-child:before {
  display: none;
}

.timeline-marker {
  position: absolute;
  left: -30px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #dee2e6;
}

.timeline-content {
  padding: 10px 15px;
  background: #f8f9fa;
  border-radius: 4px;
}
</style>
