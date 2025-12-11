<template>
  <div>
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0">Land Compliance</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="bi bi-house-fill"></i></router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Land Compliance</li>
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
            <div class="card bg-success text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0">{{ complianceStats.compliant }}</h3>
                    <small>Compliant</small>
                  </div>
                  <i class="bi bi-check-circle" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card bg-warning text-dark">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0">{{ complianceStats.expiring }}</h3>
                    <small>Akan Expire (< 6 bln)</small>
                  </div>
                  <i class="bi bi-exclamation-triangle" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card bg-danger text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0">{{ complianceStats.expired }}</h3>
                    <small>Expired</small>
                  </div>
                  <i class="bi bi-x-circle" style="font-size: 3rem; opacity: 0.3;"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="card bg-secondary text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 class="mb-0">{{ complianceStats.pending }}</h3>
                    <small>Belum Ada Izin</small>
                  </div>
                  <i class="bi bi-clock-history" style="font-size: 3rem; opacity: 0.3;"></i>
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
                  <option value="Compliant">Compliant</option>
                  <option value="Expiring Soon">Akan Expire</option>
                  <option value="Expired">Expired</option>
                  <option value="No Permit">Belum Ada Izin</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <label class="form-label"><strong><i class="bi bi-filter"></i> Jenis Izin</strong></label>
                <select v-model="selectedPermitType" class="form-select">
                  <option value="all">Semua Jenis</option>
                  <option value="IUPK">IUPK</option>
                  <option value="PPKH">PPKH</option>
                  <option value="HGU">HGU</option>
                  <option value="SHM">SHM</option>
                  <option value="SHGB">SHGB</option>
                  <option value="IMB">IMB</option>
                  <option value="UKL-UPL">UKL-UPL</option>
                  <option value="AMDAL">AMDAL</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card bg-light">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="mb-0">{{ filteredCompliances.length }} Izin Ditampilkan</h5>
                    <small class="text-muted">Total dari {{ compliances.length }} izin lahan</small>
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
                <h3 class="card-title"><i class="bi bi-clipboard-check"></i> Data Compliance & Izin Lahan</h3>
                <div class="card-tools">
                  <button class="btn btn-sm btn-primary me-2" @click="addCompliance">
                    <i class="bi bi-plus-circle"></i> Tambah Izin
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
                      <th>Kode Lahan</th>
                      <th>Nama Lokasi</th>
                      <th>Jenis Izin</th>
                      <th>No. Izin</th>
                      <th>Tanggal Terbit</th>
                      <th>Tanggal Expire</th>
                      <th>Sisa Hari</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(compliance, index) in filteredCompliances" :key="compliance.id">
                      <td>{{ index + 1 }}</td>
                      <td><span class="badge bg-info">{{ compliance.landCode }}</span></td>
                      <td><strong>{{ compliance.locationName }}</strong></td>
                      <td><span class="badge bg-primary">{{ compliance.permitType }}</span></td>
                      <td><small>{{ compliance.permitNumber }}</small></td>
                      <td><small>{{ compliance.issueDate }}</small></td>
                      <td><small>{{ compliance.expiryDate || '-' }}</small></td>
                      <td class="text-center">
                        <span v-if="compliance.daysRemaining !== null">
                          {{ compliance.daysRemaining >= 0 ? compliance.daysRemaining + ' hari' : 'EXPIRED' }}
                        </span>
                        <span v-else>-</span>
                      </td>
                      <td>
                        <span class="badge" :class="getStatusClass(compliance.status)">
                          {{ compliance.status }}
                        </span>
                      </td>
                      <td class="text-center" style="white-space: nowrap;">
                        <div class="btn-group" role="group">
                          <button class="btn btn-sm btn-info" @click="viewDocument(compliance)" title="Lihat Dokumen">
                            <i class="bi bi-file-earmark-pdf"></i>
                          </button>
                          <button class="btn btn-sm btn-warning" @click="editCompliance(compliance)" title="Edit">
                            <i class="bi bi-pencil-square"></i>
                          </button>
                          <button class="btn btn-sm btn-success" @click="renewPermit(compliance)" title="Perpanjang" v-if="compliance.status !== 'Compliant'">
                            <i class="bi bi-arrow-repeat"></i>
                          </button>
                          <button class="btn btn-sm btn-danger" @click="deleteCompliance(compliance)" title="Hapus">
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

        <!-- Compliance by Type Breakdown -->
        <div class="row mt-3">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-pie-chart"></i> Breakdown per Jenis Izin</h3>
              </div>
              <div class="card-body">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Jenis Izin</th>
                      <th class="text-end">Jumlah</th>
                      <th class="text-end">Compliant</th>
                      <th class="text-end">Bermasalah</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="type in permitTypeBreakdown" :key="type.name">
                      <td><span class="badge bg-primary">{{ type.name }}</span></td>
                      <td class="text-end">{{ type.total }}</td>
                      <td class="text-end"><strong class="text-success">{{ type.compliant }}</strong></td>
                      <td class="text-end"><strong class="text-danger">{{ type.problematic }}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header bg-danger text-white">
                <h3 class="card-title"><i class="bi bi-exclamation-triangle"></i> Prioritas Renewal</h3>
              </div>
              <div class="card-body">
                <div class="list-group">
                  <div v-for="item in urgentRenewals" :key="item.id" class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 class="mb-1">{{ item.locationName }}</h6>
                        <small class="text-muted">{{ item.permitType }} - {{ item.permitNumber }}</small>
                      </div>
                      <span class="badge" :class="(item.daysRemaining ?? 0) < 0 ? 'bg-danger' : 'bg-warning'">
                        {{ (item.daysRemaining ?? 0) < 0 ? 'EXPIRED' : (item.daysRemaining ?? 0) + ' hari' }}
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
    <div class="modal fade" id="complianceModal" tabindex="-1" ref="complianceModalRef">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditMode ? 'Edit Izin' : 'Tambah Izin Baru' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveCompliance">
              <div class="row">
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
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Nama Lokasi</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.locationName" 
                    placeholder="Nama lokasi"
                    required 
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Jenis Izin</strong> <span class="text-danger">*</span></label>
                  <select class="form-select" v-model="formData.permitType" required>
                    <option value="">Pilih Jenis Izin</option>
                    <option value="IUPK">IUPK</option>
                    <option value="PPKH">PPKH</option>
                    <option value="HGU">HGU</option>
                    <option value="SHM">SHM</option>
                    <option value="SHGB">SHGB</option>
                    <option value="IMB">IMB</option>
                    <option value="UKL-UPL">UKL-UPL</option>
                    <option value="AMDAL">AMDAL</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>No. Izin</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="formData.permitNumber" 
                    placeholder="Nomor izin"
                    required 
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Tanggal Terbit</strong> <span class="text-danger">*</span></label>
                  <input 
                    type="date" 
                    class="form-control" 
                    v-model="formData.issueDate" 
                    required 
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label"><strong>Tanggal Expire</strong></label>
                  <input 
                    type="date" 
                    class="form-control" 
                    v-model="formData.expiryDate" 
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label"><strong>Catatan</strong></label>
                <textarea 
                  class="form-control" 
                  v-model="formData.notes" 
                  rows="3"
                  placeholder="Catatan tambahan"
                ></textarea>
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
import { ref, computed } from 'vue'

interface Compliance {
  id: number
  landCode: string
  locationName: string
  permitType: string
  permitNumber: string
  issueDate: string
  expiryDate: string | null
  daysRemaining: number | null
  status: string
  notes: string
}

interface FormData {
  id?: number
  landCode: string
  locationName: string
  permitType: string
  permitNumber: string
  issueDate: string
  expiryDate: string
  notes: string
}

const selectedStatus = ref<string>('all')
const selectedPermitType = ref<string>('all')
const complianceModalRef = ref<HTMLElement | null>(null)
let complianceModalInstance: any = null

const isEditMode = ref<boolean>(false)
const formData = ref<FormData>({
  landCode: '',
  locationName: '',
  permitType: '',
  permitNumber: '',
  issueDate: '',
  expiryDate: '',
  notes: ''
})

// Helper function to calculate days remaining
const calculateDaysRemaining = (expiryDate: string | null): number | null => {
  if (!expiryDate) return null
  const today = new Date()
  const expiry = new Date(expiryDate)
  const diffTime = expiry.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Helper function to determine status
const determineStatus = (daysRemaining: number | null): string => {
  if (daysRemaining === null) return 'No Permit'
  if (daysRemaining < 0) return 'Expired'
  if (daysRemaining <= 180) return 'Expiring Soon'
  return 'Compliant'
}

const compliances = ref<Compliance[]>([
  { id: 1, landCode: 'LND-VALE-001', locationName: 'Vale Central Mining Area', permitType: 'IUPK', permitNumber: 'IUPK-001/2020', issueDate: '2020-01-15', expiryDate: '2030-01-15', daysRemaining: calculateDaysRemaining('2030-01-15'), status: 'Compliant', notes: '' },
  { id: 2, landCode: 'LND-VALE-001', locationName: 'Vale Central Mining Area', permitType: 'AMDAL', permitNumber: 'AMDAL-001/2019', issueDate: '2019-06-10', expiryDate: '2024-06-10', daysRemaining: calculateDaysRemaining('2024-06-10'), status: 'Expired', notes: 'Perlu renewal segera' },
  { id: 3, landCode: 'LND-VALE-002', locationName: 'Vale North Sector', permitType: 'HGU', permitNumber: 'HGU-002/2016', issueDate: '2016-03-20', expiryDate: '2026-03-20', daysRemaining: calculateDaysRemaining('2026-03-20'), status: 'Compliant', notes: '' },
  { id: 4, landCode: 'LND-VALE-003', locationName: 'Vale South Sector', permitType: 'HGU', permitNumber: 'HGU-003/2017', issueDate: '2017-07-15', expiryDate: '2027-07-15', daysRemaining: calculateDaysRemaining('2027-07-15'), status: 'Compliant', notes: '' },
  { id: 5, landCode: 'LND-VALE-001', locationName: 'Vale Central Mining Area', permitType: 'UKL-UPL', permitNumber: 'UKL-001/2021', issueDate: '2021-02-20', expiryDate: '2026-02-20', daysRemaining: calculateDaysRemaining('2026-02-20'), status: 'Expiring Soon', notes: '' },
  { id: 6, landCode: 'LND-ACQ-001', locationName: 'Sorowako Expansion Area', permitType: 'SHM', permitNumber: 'SHM-045/2020', issueDate: '2020-05-10', expiryDate: null, daysRemaining: null, status: 'Compliant', notes: 'SHM tidak expire' },
  { id: 7, landCode: 'LND-ACQ-002', locationName: 'Magani Buffer Zone', permitType: 'SHM', permitNumber: 'SHM-046/2021', issueDate: '2021-08-15', expiryDate: null, daysRemaining: null, status: 'Compliant', notes: '' },
  { id: 8, landCode: 'LND-IUPK-001', locationName: 'IUPK Block A', permitType: 'IUPK', permitNumber: 'IUPK-A/2010', issueDate: '2010-01-10', expiryDate: '2030-01-10', daysRemaining: calculateDaysRemaining('2030-01-10'), status: 'Compliant', notes: '' },
  { id: 9, landCode: 'LND-IUPK-001', locationName: 'IUPK Block A', permitType: 'IMB', permitNumber: 'IMB-001/2015', issueDate: '2015-05-20', expiryDate: '2025-05-20', daysRemaining: calculateDaysRemaining('2025-05-20'), status: 'Expiring Soon', notes: 'Proses renewal' },
  { id: 10, landCode: 'LND-PPKH-001', locationName: 'PPKH Conservation Area 1', permitType: 'PPKH', permitNumber: 'PPKH-001/2018', issueDate: '2018-03-15', expiryDate: '2028-03-15', daysRemaining: calculateDaysRemaining('2028-03-15'), status: 'Compliant', notes: '' },
  { id: 11, landCode: 'LND-OPS-002', locationName: 'Processing Plant Area', permitType: 'IMB', permitNumber: 'IMB-002/2020', issueDate: '2020-09-10', expiryDate: '2025-09-10', daysRemaining: calculateDaysRemaining('2025-09-10'), status: 'Expiring Soon', notes: '' },
  { id: 12, landCode: 'LND-OPS-002', locationName: 'Processing Plant Area', permitType: 'UKL-UPL', permitNumber: 'UKL-002/2019', issueDate: '2019-11-20', expiryDate: '2024-11-20', daysRemaining: calculateDaysRemaining('2024-11-20'), status: 'Expired', notes: 'Urgent renewal' },
])

// Update status for all compliances
compliances.value.forEach(c => {
  c.status = determineStatus(c.daysRemaining)
})

const filteredCompliances = computed(() => {
  let result = compliances.value
  
  if (selectedStatus.value !== 'all') {
    result = result.filter(c => c.status === selectedStatus.value)
  }
  
  if (selectedPermitType.value !== 'all') {
    result = result.filter(c => c.permitType === selectedPermitType.value)
  }
  
  return result
})

const complianceStats = computed(() => {
  return {
    compliant: compliances.value.filter(c => c.status === 'Compliant').length,
    expiring: compliances.value.filter(c => c.status === 'Expiring Soon').length,
    expired: compliances.value.filter(c => c.status === 'Expired').length,
    pending: compliances.value.filter(c => c.status === 'No Permit').length
  }
})

const permitTypeBreakdown = computed(() => {
  const types = ['IUPK', 'PPKH', 'HGU', 'SHM', 'SHGB', 'IMB', 'UKL-UPL', 'AMDAL']
  return types.map(type => {
    const items = compliances.value.filter(c => c.permitType === type)
    return {
      name: type,
      total: items.length,
      compliant: items.filter(c => c.status === 'Compliant').length,
      problematic: items.filter(c => c.status === 'Expired' || c.status === 'Expiring Soon').length
    }
  }).filter(t => t.total > 0)
})

const urgentRenewals = computed(() => {
  return compliances.value
    .filter(c => c.daysRemaining !== null && c.daysRemaining <= 180)
    .sort((a, b) => (a.daysRemaining || 0) - (b.daysRemaining || 0))
    .slice(0, 5)
})

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Compliant': return 'bg-success'
    case 'Expiring Soon': return 'bg-warning'
    case 'Expired': return 'bg-danger'
    case 'No Permit': return 'bg-secondary'
    default: return 'bg-secondary'
  }
}

const addCompliance = () => {
  isEditMode.value = false
  formData.value = {
    landCode: '',
    locationName: '',
    permitType: '',
    permitNumber: '',
    issueDate: '',
    expiryDate: '',
    notes: ''
  }
  openComplianceModal()
}

const editCompliance = (compliance: Compliance) => {
  isEditMode.value = true
  formData.value = {
    id: compliance.id,
    landCode: compliance.landCode,
    locationName: compliance.locationName,
    permitType: compliance.permitType,
    permitNumber: compliance.permitNumber,
    issueDate: compliance.issueDate,
    expiryDate: compliance.expiryDate || '',
    notes: compliance.notes
  }
  openComplianceModal()
}

const saveCompliance = () => {
  const daysRemaining = calculateDaysRemaining(formData.value.expiryDate || null)
  const status = determineStatus(daysRemaining)

  if (isEditMode.value && formData.value.id) {
    const index = compliances.value.findIndex(c => c.id === formData.value.id)
    if (index !== -1 && formData.value.id) {
      compliances.value[index] = {
        id: formData.value.id,
        landCode: formData.value.landCode,
        locationName: formData.value.locationName,
        permitType: formData.value.permitType,
        permitNumber: formData.value.permitNumber,
        issueDate: formData.value.issueDate,
        expiryDate: formData.value.expiryDate || null,
        daysRemaining,
        status,
        notes: formData.value.notes
      }
      alert('Izin berhasil diupdate!')
    }
  } else {
    const newId = Math.max(...compliances.value.map(c => c.id)) + 1
    compliances.value.push({
      id: newId,
      landCode: formData.value.landCode,
      locationName: formData.value.locationName,
      permitType: formData.value.permitType,
      permitNumber: formData.value.permitNumber,
      issueDate: formData.value.issueDate,
      expiryDate: formData.value.expiryDate || null,
      daysRemaining,
      status,
      notes: formData.value.notes
    })
    alert('Izin berhasil ditambahkan!')
  }

  closeComplianceModal()
}

const deleteCompliance = (compliance: Compliance) => {
  if (confirm(`Hapus izin ${compliance.permitNumber}?\n\nData akan dihapus secara permanen.`)) {
    const index = compliances.value.findIndex(c => c.id === compliance.id)
    if (index !== -1) {
      compliances.value.splice(index, 1)
      alert('Izin berhasil dihapus!')
    }
  }
}

const viewDocument = (compliance: Compliance) => {
  alert(`Feature: Lihat Dokumen\n\nIzin: ${compliance.permitNumber}\nFile dokumen akan dibuka`)
}

const renewPermit = (compliance: Compliance) => {
  alert(`Feature: Perpanjang Izin\n\nIzin: ${compliance.permitNumber}\nForm perpanjangan izin akan dibuka`)
}

const openComplianceModal = () => {
  if (complianceModalRef.value) {
    const Modal = (window as any).bootstrap?.Modal
    if (Modal) {
      complianceModalInstance = new Modal(complianceModalRef.value)
      complianceModalInstance.show()
    }
  }
}

const closeComplianceModal = () => {
  if (complianceModalInstance) {
    complianceModalInstance.hide()
  }
}

const exportData = () => {
  const headers = ['No', 'Kode Lahan', 'Nama Lokasi', 'Jenis Izin', 'No. Izin', 'Tanggal Terbit', 'Tanggal Expire', 'Sisa Hari', 'Status', 'Catatan']
  
  const rows = filteredCompliances.value.map((c, index) => [
    index + 1,
    c.landCode,
    c.locationName,
    c.permitType,
    c.permitNumber,
    c.issueDate,
    c.expiryDate || '-',
    c.daysRemaining !== null ? (c.daysRemaining >= 0 ? c.daysRemaining + ' hari' : 'EXPIRED') : '-',
    c.status,
    c.notes
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `land_compliance_${new Date().toISOString().split('T')[0]}.csv`)
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
</style>

  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}


<style scoped>
.list-group-item {
  border-left: 4px solid #dc3545;
}
</style>
