<template>
  <div class="modern-page">
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card gradient-primary">
        <div class="stat-label">Total Proyek</div>
        <div class="stat-value">{{ stats.total }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Proses</div>
        <div class="stat-value dark">{{ stats.proses }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Selesai</div>
        <div class="stat-value dark">{{ stats.selesai }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Total Biaya</div>
        <div class="stat-value dark stat-value-flex">
          <span class="currency">Rp</span>
          <span class="amount">{{ formatNumber(stats.totalBiaya) }}</span>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-card">
      <div class="table-header">
        <h3 class="table-title">Daftar Pembebasan Lahan</h3>
        <div class="table-actions">
          <div class="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" placeholder="Search..." v-model="searchQuery">
          </div>
          <router-link to="/pembebasan-lahan/tambah" class="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Tambah Proyek
          </router-link>
        </div>
      </div>

      <div class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Proyek</th>
              <th>Status</th>
              <th>Terdampak</th>
              <th>Bebas</th>
              <th>Biaya</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredData" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="project-info">
                  <span class="project-name">{{ item.nama }}</span>
                </div>
              </td>
              <td>
                <span :class="['badge', `badge-${getStatusColor(item.status)}`]">{{ item.status }}</span>
              </td>
              <td>{{ item.jmlTerdampak }}</td>
              <td>{{ item.jmlBebas }}</td>
              <td class="amount-cell">Rp {{ formatNumber(item.biaya) }}</td>
              <td>
                <div class="progress-bar-container">
                  <div class="progress-bar" :style="{ width: item.progress + '%' }"></div>
                </div>
                <span class="progress-text">{{ item.progress }}%</span>
              </td>
              <td>
                <div class="action-buttons">
                  <router-link :to="`/pembebasan-lahan/detail/${item.id}`" class="btn-icon" title="Detail">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </router-link>
                  <button class="btn-icon" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
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
  total: 23,
  proses: 8,
  selesai: 12,
  totalBiaya: 15750000000
})

const data = ref([
  { id: 1, nama: 'Pembebasan Lahan Desa Sukamaju', status: 'Proses', jmlTerdampak: 10, jmlBebas: 10, biaya: 750000000, progress: 75 },
  { id: 2, nama: 'Pembebasan Lahan Desa Mekar', status: 'Selesai', jmlTerdampak: 5, jmlBebas: 5, biaya: 420000000, progress: 100 },
  { id: 3, nama: 'Pembebasan Lahan Desa Mandiri', status: 'Belum Mulai', jmlTerdampak: 8, jmlBebas: 8, biaya: 600000000, progress: 0 },
  { id: 4, nama: 'Pembebasan Lahan Desa Sejahtera', status: 'Proses', jmlTerdampak: 12, jmlBebas: 12, biaya: 900000000, progress: 45 },
])

const filteredData = computed(() => {
  if (!searchQuery.value) return data.value
  
  const query = searchQuery.value.toLowerCase()
  return data.value.filter(item => 
    item.nama.toLowerCase().includes(query) ||
    item.status.toLowerCase().includes(query)
  )
})

const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Selesai': return 'success'
    case 'Proses': return 'warning'
    case 'Belum Mulai': return 'info'
    default: return 'secondary'
  }
}
</script>

<style scoped>
.modern-page {
  padding: 0;
}

/* Stats Grid */
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

.stat-value-flex {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.currency {
  font-size: 14px;
  font-weight: 600;
  color: #64748B;
}

.amount {
  font-size: clamp(18px, 2vw, 28px);
  font-weight: 700;
}

/* Table Card */
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

.project-name {
  font-weight: 600;
  color: #1F2937;
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

.badge-info {
  background: #DBEAFE;
  color: #1E40AF;
}

.amount-cell {
  font-weight: 600;
  color: #10B981;
}

.progress-bar-container {
  width: 80px;
  height: 6px;
  background: #E5E7EB;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s;
}

.progress-text {
  font-size: 12px;
  color: #6B7280;
  font-weight: 600;
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
