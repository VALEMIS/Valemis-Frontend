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
          <div class="col-lg-2 col-md-4">
            <div class="card bg-danger text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="mb-0">{{ litigationStats.negosiasiTahap1 }}</h5>
                    <small>Tahap 1</small>
                  </div>
                  <i class="bi bi-1-circle" style="font-size: 2rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-4">
            <div class="card bg-warning text-dark">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="mb-0">{{ litigationStats.negosiasiTahap2 }}</h5>
                    <small>Tahap 2</small>
                  </div>
                  <i class="bi bi-2-circle" style="font-size: 2rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-4">
            <div class="card bg-primary text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="mb-0">{{ litigationStats.negosiasiTahap3 }}</h5>
                    <small>Tahap 3</small>
                  </div>
                  <i class="bi bi-3-circle" style="font-size: 2rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card bg-success text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="mb-0">{{ litigationStats.putusanClear }}</h5>
                    <small>Putusan Clear</small>
                  </div>
                  <i class="bi bi-check-circle" style="font-size: 2rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card bg-info text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="mb-0">{{ litigationStats.putusanPengadilan }}</h5>
                    <small>Putusan Pengadilan</small>
                  </div>
                  <i class="bi bi-gavel" style="font-size: 2rem; opacity: 0.3;"></i>
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
                  <option value="Negosiasi Tahap 1">Negosiasi Tahap 1</option>
                  <option value="Negosiasi Tahap 2">Negosiasi Tahap 2</option>
                  <option value="Negosiasi Tahap 3">Negosiasi Tahap 3</option>
                  <option value="Putusan Clear">Putusan Clear</option>
                  <option value="Putusan Pengadilan">Putusan Pengadilan</option>
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
                    <option value="Negosiasi Tahap 1">Negosiasi Tahap 1</option>
                    <option value="Negosiasi Tahap 2">Negosiasi Tahap 2</option>
                    <option value="Negosiasi Tahap 3">Negosiasi Tahap 3</option>
                    <option value="Putusan Clear">Putusan Clear</option>
                    <option value="Putusan Pengadilan">Putusan Pengadilan</option>
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
              <div class="timeline-item" v-if="selectedCase.status.includes('Negosiasi')">
                <div class="timeline-marker bg-warning"></div>
                <div class="timeline-content">
                  <h6>{{ selectedCase.status }}</h6>
                  <p class="mb-0"><small>{{ selectedCase.startDate }}</small></p>
                  <p class="text-muted mb-0"><small>Proses negosiasi sedang berlangsung</small></p>
                </div>
              </div>
              <div class="timeline-item" v-if="selectedCase.status === 'Putusan Clear'">
                <div class="timeline-marker bg-success"></div>
                <div class="timeline-content">
                  <h6>Putusan Clear</h6>
                  <p class="mb-0"><small>{{ selectedCase.startDate }}</small></p>
                  <p class="text-muted mb-0"><small>Kasus diselesaikan dengan keputusan clear/bisa diselesaikan secara kekeluargaan</small></p>
                </div>
              </div>
              <div class="timeline-item" v-if="selectedCase.status === 'Putusan Pengadilan'">
                <div class="timeline-marker bg-info"></div>
                <div class="timeline-content">
                  <h6>Putusan Pengadilan</h6>
                  <p class="mb-0"><small>{{ selectedCase.startDate }}</small></p>
                  <p class="text-muted mb-0"><small>Kasus diselesaikan melalui putusan pengadilan</small></p>
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
import { litigationApi } from '../api/index'

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
  { id: 1, caseCode: 'LIT-2025-001', landCode: 'LND-VALE-001', caseType: 'Land Ownership', claimant: 'Ahmad Kusuma', description: 'Klaim kepemilikan lahan oleh warga lokal dengan bukti sertifikat lama', startDate: '2025-01-15', status: 'Negosiasi Tahap 1', priority: 'High' },
  { id: 2, caseCode: 'LIT-2025-002', landCode: 'LND-ACQ-001', caseType: 'Compensation Claim', claimant: 'Siti Rahayu', description: 'Klaim kompensasi tambahan untuk pembebasan lahan', startDate: '2025-02-10', status: 'Negosiasi Tahap 2', priority: 'Medium' },
  { id: 3, caseCode: 'LIT-2025-003', landCode: 'LND-VALE-002', caseType: 'Boundary Dispute', claimant: 'Budi Santoso', description: 'Sengketa batas lahan dengan area operasional Vale', startDate: '2025-01-20', status: 'Negosiasi Tahap 1', priority: 'High' },
  { id: 4, caseCode: 'LIT-2024-015', landCode: 'LND-ACQ-002', caseType: 'Compensation Claim', claimant: 'Dewi Lestari', description: 'Klaim kompensasi untuk kerusakan tanaman', startDate: '2024-11-05', status: 'Putusan Clear', priority: 'Low' },
  { id: 5, caseCode: 'LIT-2025-004', landCode: 'LND-IUPK-001', caseType: 'Environmental Claim', claimant: 'Kelompok Tani Sorowako', description: 'Klaim dampak lingkungan terhadap area pertanian', startDate: '2025-03-01', status: 'Negosiasi Tahap 3', priority: 'High' },
  { id: 6, caseCode: 'LIT-2024-020', landCode: 'LND-ACQ-003', caseType: 'Boundary Dispute', claimant: 'Hendra Wijaya', description: 'Perbedaan batas kepemilikan dengan area jalan akses', startDate: '2024-12-10', status: 'Putusan Clear', priority: 'Medium' },
  { id: 7, caseCode: 'LIT-2025-005', landCode: 'LND-VALE-003', caseType: 'Land Ownership', claimant: 'Keluarga Marzuki', description: 'Klaim kepemilikan berdasarkan warisan keluarga', startDate: '2025-02-28', status: 'Negosiasi Tahap 2', priority: 'High' },
  { id: 8, caseCode: 'LIT-2025-006', landCode: 'LND-OPS-001', caseType: 'Others', claimant: 'Yusuf Rahman', description: 'Klaim akses jalan yang terblokir operasional', startDate: '2025-03-15', status: 'Negosiasi Tahap 1', priority: 'Low' },
  { id: 9, caseCode: 'LIT-2024-018', landCode: 'LND-ACQ-004', caseType: 'Compensation Claim', claimant: 'Nina Fitriani', description: 'Klaim kompensasi untuk relokasi rumah', startDate: '2024-11-20', status: 'Putusan Pengadilan', priority: 'Medium' },
  { id: 10, caseCode: 'LIT-2025-007', landCode: 'LND-PPKH-001', caseType: 'Environmental Claim', claimant: 'LSM Lingkungan Luwu', description: 'Klaim dampak terhadap area konservasi', startDate: '2025-03-20', status: 'Negosiasi Tahap 3', priority: 'High' },
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

const litigationStats = computed(() => {
  return {
    negosiasiTahap1: litigations.value.filter(l => l.status === 'Negosiasi Tahap 1').length,
    negosiasiTahap2: litigations.value.filter(l => l.status === 'Negosiasi Tahap 2').length,
    negosiasiTahap3: litigations.value.filter(l => l.status === 'Negosiasi Tahap 3').length,
    putusanClear: litigations.value.filter(l => l.status === 'Putusan Clear').length,
    putusanPengadilan: litigations.value.filter(l => l.status === 'Putusan Pengadilan').length
  }
})

const caseTypeBreakdown = computed(() => {
  const types = ['Land Ownership', 'Boundary Dispute', 'Compensation Claim', 'Environmental Claim', 'Others']
  return types.map(type => {
    const items = litigations.value.filter(l => l.caseType === type)
    return {
      name: type,
      total: items.length,
      active: items.filter(l => ['Negosiasi Tahap 1', 'Negosiasi Tahap 2', 'Negosiasi Tahap 3'].includes(l.status)).length,
      resolved: items.filter(l => ['Putusan Clear', 'Putusan Pengadilan'].includes(l.status)).length
    }
  }).filter(t => t.total > 0)
})

const highPriorityCases = computed(() => {
  return litigations.value
    .filter(l => l.priority === 'High' && !['Putusan Clear', 'Putusan Pengadilan'].includes(l.status))
    .slice(0, 5)
})

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Negosiasi Tahap 1': return 'bg-danger'
    case 'Negosiasi Tahap 2': return 'bg-warning'
    case 'Negosiasi Tahap 3': return 'bg-primary'
    case 'Putusan Clear': return 'bg-success'
    case 'Putusan Pengadilan': return 'bg-info'
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

const exportData = async () => {
  try {
    await litigationApi.exportCsv()
    alert('Data berhasil didownload dalam format CSV!')
  } catch (err) {
    alert('Gagal mendownload data: ' + (err instanceof Error ? err.message : 'Unknown error'))
    console.error('Export error:', err)
  }
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
