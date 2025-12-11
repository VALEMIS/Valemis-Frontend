<template>
  <div class="modern-page">
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card gradient-primary">
        <div class="stat-label">Lahan Compliant</div>
        <div class="stat-value">187</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Perlu Review</div>
        <div class="stat-value dark">45</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Non-Compliant</div>
        <div class="stat-value dark">12</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Compliance Rate</div>
        <div class="stat-value dark">98<span class="unit">%</span></div>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="chart-card">
      <div class="card-header">
        <h3 class="card-title">Compliance Trend</h3>
        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-dot success"></span>
            <span>Compliant</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot warning"></span>
            <span>Review</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot danger"></span>
            <span>Non-Compliant</span>
          </div>
        </div>
      </div>
      <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-card">
      <div class="table-header">
        <h3 class="table-title">Land Compliance Status</h3>
        <div class="table-actions">
          <div class="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" placeholder="Search compliance..." v-model="searchQuery">
          </div>
          <button class="btn-export">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Report
          </button>
        </div>
      </div>

      <div class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Lahan</th>
              <th>Jenis Izin</th>
              <th>Masa Berlaku</th>
              <th>Status</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredData" :key="item.id">
              <td><span class="id-badge">{{ item.code }}</span></td>
              <td>
                <div class="land-info">
                  <span class="land-name">{{ item.name }}</span>
                </div>
              </td>
              <td><span class="badge badge-info">{{ item.permit }}</span></td>
              <td>{{ item.expiry }}</td>
              <td>
                <span :class="['badge', `badge-${getStatusColor(item.status)}`]">{{ item.status }}</span>
              </td>
              <td>
                <div class="score-container">
                  <div class="score-bar">
                    <div class="score-fill" :style="{ width: item.score + '%', background: getScoreColor(item.score) }"></div>
                  </div>
                  <span class="score-text">{{ item.score }}%</span>
                </div>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="btn-icon" title="View Details">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Audit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Download Report">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
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
import { onMounted, ref, computed } from 'vue'
import { Chart, type ChartConfiguration } from 'chart.js/auto'

const searchQuery = ref('')
const chartCanvas = ref<HTMLCanvasElement | null>(null)

const data = ref([
  { id: 1, code: 'CMP-001', name: 'Area IUPK Blok A', permit: 'HGU', expiry: '2028-12-31', status: 'Compliant', score: 95 },
  { id: 2, code: 'CMP-002', name: 'Kawasan PPKH Zone 1', permit: 'HGB', expiry: '2026-06-30', status: 'Review', score: 75 },
  { id: 3, code: 'CMP-003', name: 'Area IUPK Blok B', permit: 'HGU', expiry: '2029-03-15', status: 'Compliant', score: 92 },
  { id: 4, code: 'CMP-004', name: 'Buffer Zone Utara', permit: 'HP', expiry: '2024-12-31', status: 'Non-Compliant', score: 45 },
])

const filteredData = computed(() => {
  if (!searchQuery.value) return data.value
  
  const query = searchQuery.value.toLowerCase()
  return data.value.filter(item => 
    item.code.toLowerCase().includes(query) ||
    item.name.toLowerCase().includes(query)
  )
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Compliant': return 'success'
    case 'Review': return 'warning'
    case 'Non-Compliant': return 'danger'
    default: return 'secondary'
  }
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'linear-gradient(90deg, #10B981 0%, #059669 100%)'
  if (score >= 60) return 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)'
  return 'linear-gradient(90deg, #EF4444 0%, #DC2626 100%)'
}

onMounted(() => {
  if (chartCanvas.value) {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Compliant',
            data: [180, 182, 185, 183, 186, 187],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4
          },
          {
            label: 'Review',
            data: [50, 48, 47, 46, 45, 45],
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4
          },
          {
            label: 'Non-Compliant',
            data: [14, 15, 13, 16, 14, 12],
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    }
    new Chart(chartCanvas.value, config)
  }
})
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

.unit {
  font-size: 18px;
}

.chart-card, .table-card {
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

.chart-legend {
  display: flex;
  gap: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6B7280;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-dot.success { background: #10B981; }
.legend-dot.warning { background: #F59E0B; }
.legend-dot.danger { background: #EF4444; }

.chart-container {
  padding: 24px;
  height: 300px;
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

.btn-export {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-export:hover {
  background: #4F46E5;
  color: white;
  border-color: transparent;
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

.land-name {
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

.badge-success { background: #D1FAE5; color: #065F46; }
.badge-warning { background: #FEF3C7; color: #92400E; }
.badge-info { background: #DBEAFE; color: #1E40AF; }
.badge-danger { background: #FEE2E2; color: #991B1B; }

.score-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.score-bar {
  flex: 1;
  height: 8px;
  background: #F3F4F6;
  border-radius: 4px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.score-text {
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  min-width: 40px;
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
}

.btn-icon:hover {
  background: #4F46E5;
  color: white;
  transform: translateY(-2px);
}
</style>
