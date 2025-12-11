<template>
  <div class="modern-page">
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card gradient-primary">
        <div class="stat-label">Total Claim</div>
        <div class="stat-value">{{ stats.total }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Proses Verifikasi</div>
        <div class="stat-value dark">{{ stats.verifikasi }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Selesai</div>
        <div class="stat-value dark">{{ stats.selesai }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Ditolak</div>
        <div class="stat-value dark">{{ stats.ditolak }}</div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-card">
      <div class="table-header">
        <h3 class="table-title">Daftar Claim Litigasi</h3>
        <div class="table-actions">
          <div class="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" placeholder="Search claim..." v-model="searchQuery">
          </div>
          <router-link to="/litigasi/tambah" class="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Tambah Claim
          </router-link>
        </div>
      </div>

      <div class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>ID Claim</th>
              <th>ID Parcel</th>
              <th>Tanggal</th>
              <th>Jenis</th>
              <th>Uraian</th>
              <th>Status</th>
              <th>Sumber</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredData" :key="item.id">
              <td><span class="id-badge">{{ item.claimId }}</span></td>
              <td><span class="parcel-badge">{{ item.parcelId }}</span></td>
              <td>{{ item.tanggal }}</td>
              <td><span class="badge badge-warning">{{ item.jenis }}</span></td>
              <td class="description-cell">{{ item.uraian }}</td>
              <td>
                <span :class="['badge', `badge-${getStatusColor(item.status)}`]">{{ item.status }}</span>
              </td>
              <td>{{ item.sumber }}</td>
              <td>
                <div class="action-buttons">
                  <router-link :to="`/litigasi/claim/${item.id}`" class="btn-icon" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </router-link>
                  <button class="btn-icon" title="View Location" @click="viewLocation(item)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </button>
                  <button class="btn-icon btn-danger" title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')

const stats = ref({
  total: 45,
  verifikasi: 12,
  selesai: 28,
  ditolak: 5
})

const data = ref([
  { id: 1, claimId: 'CLM001', parcelId: 'PARC001', tanggal: '2025-10-20', jenis: 'Tanah Sengketa', uraian: 'Klaim kepemilikan lahan oleh warga lokal', status: 'Proses Verifikasi', sumber: 'Data Masyarakat' },
  { id: 2, claimId: 'CLM002', parcelId: 'PARC002', tanggal: '2025-10-21', jenis: 'Batas Lahan', uraian: 'Perbedaan batas kepemilikan antar dua warga', status: 'Selesai', sumber: 'Survey Lapangan' },
  { id: 3, claimId: 'CLM003', parcelId: 'PARC003', tanggal: '2025-10-22', jenis: 'Ganti Rugi', uraian: 'Klaim ganti rugi pembebasan lahan', status: 'Proses Verifikasi', sumber: 'Data Masyarakat' },
  { id: 4, claimId: 'CLM004', parcelId: 'PARC004', tanggal: '2025-10-23', jenis: 'Tanah Sengketa', uraian: 'Sengketa lahan dengan pihak developer', status: 'Ditolak', sumber: 'Online' },
])

const filteredData = computed(() => {
  if (!searchQuery.value) return data.value
  
  const query = searchQuery.value.toLowerCase()
  return data.value.filter(item => 
    item.claimId.toLowerCase().includes(query) ||
    item.parcelId.toLowerCase().includes(query) ||
    item.jenis.toLowerCase().includes(query) ||
    item.uraian.toLowerCase().includes(query)
  )
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Selesai': return 'success'
    case 'Proses Verifikasi': return 'warning'
    case 'Ditolak': return 'danger'
    default: return 'secondary'
  }
}

const viewLocation = (item: any) => {
  console.log('View location for:', item.claimId)
}
</script>

<style scoped>
.modern-page {
  padding: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.stat-card.gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.stat-label {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-card.gradient-primary .stat-label {
  color: rgba(255, 255, 255, 0.95);
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
}

.stat-value.dark {
  color: #1E293B;
}

.table-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.table-header {
  padding: 24px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-title {
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
}

.table-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box svg {
  position: absolute;
  left: 12px;
  color: #9CA3AF;
}

.search-box input {
  padding: 10px 12px 10px 40px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
  min-width: 250px;
}

.search-box input:focus {
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.table-container {
  overflow-x: auto;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table thead {
  background: #F9FAFB;
}

.modern-table th {
  padding: 16px 20px;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #E5E7EB;
}

.modern-table tbody tr {
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
}

.modern-table tbody tr:hover {
  background: #F9FAFB;
}

.modern-table td {
  padding: 16px 20px;
  font-size: 14px;
  color: #374151;
}

.id-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #EEF2FF;
  color: #4F46E5;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
}

.parcel-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #F3F4F6;
  color: #374151;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.badge-success {
  background: #D1FAE5;
  color: #065F46;
}

.badge-warning {
  background: #FEF3C7;
  color: #92400E;
}

.badge-danger {
  background: #FEE2E2;
  color: #991B1B;
}

.description-cell {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #F3F4F6;
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-icon:hover {
  background: #4F46E5;
  color: white;
  transform: translateY(-2px);
}

.btn-icon.btn-danger:hover {
  background: #EF4444;
}
</style>
