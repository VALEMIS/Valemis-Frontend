<template>
  <div class="modern-page">
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card gradient-primary">
        <div class="stat-label">Total Lahan Target</div>
        <div class="stat-value">150</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Sedang Negosiasi</div>
        <div class="stat-value dark">45</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Pending Approval</div>
        <div class="stat-value dark">25</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Belum Dimulai</div>
        <div class="stat-value dark">80</div>
      </div>
    </div>

    <!-- Progress Overview -->
    <div class="progress-card">
      <div class="card-header">
        <h3 class="card-title">LARAP Progress Overview</h3>
        <div class="progress-stats">
          <span class="progress-stat">Total Progress: <strong>46.7%</strong></span>
        </div>
      </div>
      <div class="card-body">
        <div class="progress-items">
          <div class="progress-item">
            <div class="progress-header">
              <span class="progress-label">Identifikasi & Survei</span>
              <span class="progress-value">85%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: 85%; background: linear-gradient(90deg, #10B981 0%, #059669 100%)"></div>
            </div>
          </div>
          <div class="progress-item">
            <div class="progress-header">
              <span class="progress-label">Negosiasi & Kesepakatan</span>
              <span class="progress-value">60%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: 60%; background: linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)"></div>
            </div>
          </div>
          <div class="progress-item">
            <div class="progress-header">
              <span class="progress-label">Pembayaran Kompensasi</span>
              <span class="progress-value">40%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: 40%; background: linear-gradient(90deg, #F59E0B 0%, #D97706 100%)"></div>
            </div>
          </div>
          <div class="progress-item">
            <div class="progress-header">
              <span class="progress-label">Relokasi & Resettlement</span>
              <span class="progress-value">20%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: 20%; background: linear-gradient(90deg, #8B5CF6 0%, #7C3AED 100%)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-card">
      <div class="table-header">
        <h3 class="table-title">LARAP Action Plan</h3>
        <div class="table-actions">
          <div class="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" placeholder="Search action..." v-model="searchQuery">
          </div>
          <button class="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Action
          </button>
        </div>
      </div>

      <div class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Lokasi</th>
              <th>Pemilik Lahan</th>
              <th>Luas (Ha)</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Target Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredData" :key="item.id">
              <td><span class="id-badge">{{ item.code }}</span></td>
              <td>{{ item.location }}</td>
              <td>
                <div class="owner-info">
                  <div class="owner-avatar">{{ item.owner.charAt(0) }}</div>
                  <span>{{ item.owner }}</span>
                </div>
              </td>
              <td class="area-cell">{{ item.area }} Ha</td>
              <td>
                <span :class="['badge', `badge-${getStatusColor(item.status)}`]">{{ item.status }}</span>
              </td>
              <td>
                <span :class="['priority-badge', item.priority.toLowerCase()]">{{ item.priority }}</span>
              </td>
              <td>{{ item.targetDate }}</td>
              <td>
                <div class="action-buttons">
                  <button class="btn-icon" title="View Details">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Timeline">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
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

const data = ref([
  { id: 1, code: 'LARAP-001', location: 'Desa Sukamaju, Kec. Muara Badak', owner: 'Ahmad Yani', area: 2.5, status: 'Negosiasi', priority: 'High', targetDate: '2024-06-30' },
  { id: 2, code: 'LARAP-002', location: 'Desa Teluk Dalam, Kec. Samboja', owner: 'Siti Aminah', area: 1.8, status: 'Pending', priority: 'Medium', targetDate: '2024-07-15' },
  { id: 3, code: 'LARAP-003', location: 'Desa Karang Asam, Kec. Sungai Kunjang', owner: 'Budi Santoso', area: 3.2, status: 'Belum Dimulai', priority: 'Low', targetDate: '2024-08-20' },
  { id: 4, code: 'LARAP-004', location: 'Desa Manggar, Kec. Balikpapan Timur', owner: 'Dewi Lestari', area: 1.5, status: 'Selesai', priority: 'High', targetDate: '2024-05-10' },
])

const filteredData = computed(() => {
  if (!searchQuery.value) return data.value
  
  const query = searchQuery.value.toLowerCase()
  return data.value.filter(item => 
    item.code.toLowerCase().includes(query) ||
    item.location.toLowerCase().includes(query) ||
    item.owner.toLowerCase().includes(query)
  )
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Selesai': return 'success'
    case 'Negosiasi': return 'info'
    case 'Pending': return 'warning'
    case 'Belum Dimulai': return 'secondary'
    default: return 'secondary'
  }
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

.progress-card, .table-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 24px;
}

.card-header {
  padding: 24px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
}

.progress-stats {
  font-size: 14px;
  color: #6B7280;
}

.progress-stats strong {
  color: #4F46E5;
  font-weight: 700;
}

.card-body {
  padding: 24px;
}

.progress-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.progress-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.progress-value {
  font-size: 14px;
  font-weight: 700;
  color: #4F46E5;
}

.progress-bar-container {
  height: 12px;
  background: #F3F4F6;
  border-radius: 6px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.5s ease;
}

.table-header {
  padding: 24px;
  border-bottom: 1px solid #F3F4F6;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.owner-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.owner-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
}

.area-cell {
  font-weight: 600;
  color: #10B981;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.badge-success { background: #D1FAE5; color: #065F46; }
.badge-info { background: #DBEAFE; color: #1E40AF; }
.badge-warning { background: #FEF3C7; color: #92400E; }
.badge-secondary { background: #F3F4F6; color: #6B7280; }

.priority-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.priority-badge.high { background: #FEE2E2; color: #991B1B; }
.priority-badge.medium { background: #FEF3C7; color: #92400E; }
.priority-badge.low { background: #DBEAFE; color: #1E40AF; }

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
}

.btn-icon:hover {
  background: #4F46E5;
  color: white;
  transform: translateY(-2px);
}
</style>
