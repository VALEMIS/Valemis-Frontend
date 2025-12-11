<template>
  <div class="modern-stakeholder">
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card gradient-primary">
        <div class="stat-label">Total Stakeholder</div>
        <div class="stat-value">{{ stakeholderStats.total }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">High Influence</div>
        <div class="stat-value dark">{{ stakeholderStats.highInfluence }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">High Interest</div>
        <div class="stat-value dark">{{ stakeholderStats.highInterest }}</div>
      </div>

      <div class="stat-card white">
        <div class="stat-label">Active Involvement</div>
        <div class="stat-value dark">{{ stakeholderStats.activeInvolvement }}</div>
      </div>
    </div>

    <!-- Matrix Chart -->
    <div class="chart-card">
      <div class="card-header">
        <h3 class="card-title">Stakeholder Influence & Interest Matrix</h3>
      </div>
      <div class="card-body">
        <canvas ref="matrixChart" height="300"></canvas>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-card">
      <div class="table-header">
        <h3 class="table-title">Daftar Stakeholder</h3>
        <div class="table-actions">
          <div class="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" placeholder="Search stakeholder..." v-model="searchQuery">
          </div>
          <router-link to="/stake-holder/tambah" class="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Tambah Stakeholder
          </router-link>
        </div>
      </div>

      <div class="table-container">
        <table class="modern-table">
          <thead>
            <tr>
              <th>SH_ID</th>
              <th>Nama</th>
              <th>Tipe</th>
              <th>Kategori</th>
              <th>Kontak</th>
              <th>Interest</th>
              <th>Influence</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sh in filteredStakeholders" :key="sh.id">
              <td><span class="id-badge">{{ sh.sh_id }}</span></td>
              <td>
                <div class="stakeholder-info">
                  <div class="avatar">{{ sh.nama.charAt(0) }}</div>
                  <span class="name">{{ sh.nama }}</span>
                </div>
              </td>
              <td><span class="badge badge-primary">{{ sh.tipe }}</span></td>
              <td><span class="badge badge-info">{{ sh.kategori }}</span></td>
              <td>{{ sh.kontak }}</td>
              <td>
                <div class="rating">
                  <span v-for="n in 5" :key="n" :class="['star', n <= sh.interest ? 'active' : '']">★</span>
                </div>
              </td>
              <td>
                <div class="rating">
                  <span v-for="n in 5" :key="n" :class="['star', n <= sh.influence ? 'active' : '']">★</span>
                </div>
              </td>
              <td>
                <div class="action-buttons">
                  <router-link :to="`/stake-holder/detail/${sh.id}`" class="btn-icon" title="Detail">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </router-link>
                  <button class="btn-icon" title="Edit" @click="editStakeholder(sh.id)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon" title="Social Media" @click="showSocialMedia(sh.id)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
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
import { ref, computed, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const matrixChart = ref<HTMLCanvasElement | null>(null)
const searchQuery = ref('')

const stakeholderStats = ref({
  total: 150,
  highInfluence: 45,
  highInterest: 38,
  activeInvolvement: 62
})

const stakeholders = ref([
  { id: 1, sh_id: 'SH001', nama: 'Ahmad Sulaiman', tipe: 'Individual', kategori: 'Pemilik Lahan', kontak: '0812-3456-7890', interest: 5, influence: 4 },
  { id: 2, sh_id: 'SH002', nama: 'PT Maju Jaya', tipe: 'Organization', kategori: 'Investor', kontak: '021-5555-1234', interest: 4, influence: 5 },
  { id: 3, sh_id: 'SH003', nama: 'Siti Nurhaliza', tipe: 'Individual', kategori: 'Warga Lokal', kontak: '0813-9876-5432', interest: 3, influence: 2 },
  { id: 4, sh_id: 'SH004', nama: 'Dinas Pertanahan', tipe: 'Government', kategori: 'Regulator', kontak: '021-7777-8888', interest: 5, influence: 5 },
  { id: 5, sh_id: 'SH005', nama: 'Budi Santoso', tipe: 'Individual', kategori: 'Konsultan', kontak: '0815-4321-8765', interest: 4, influence: 3 },
])

const filteredStakeholders = computed(() => {
  if (!searchQuery.value) return stakeholders.value
  
  const query = searchQuery.value.toLowerCase()
  return stakeholders.value.filter(sh => 
    sh.nama.toLowerCase().includes(query) ||
    sh.sh_id.toLowerCase().includes(query) ||
    sh.tipe.toLowerCase().includes(query) ||
    sh.kategori.toLowerCase().includes(query)
  )
})

const editStakeholder = (id: number) => {
  console.log('Edit stakeholder:', id)
}

const showSocialMedia = (id: number) => {
  console.log('Show social media for:', id)
}

onMounted(() => {
  if (matrixChart.value) {
    new Chart(matrixChart.value, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Stakeholders',
          data: stakeholders.value.map(sh => ({ x: sh.influence, y: sh.interest })),
          backgroundColor: 'rgba(99, 102, 241, 0.6)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 2,
          pointRadius: 8,
          pointHoverRadius: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: 'Influence Level', font: { size: 14, weight: 600, family: 'Inter' } },
            min: 0,
            max: 6,
            grid: { color: '#F3F4F6' }
          },
          y: {
            title: { display: true, text: 'Interest Level', font: { size: 14, weight: 600, family: 'Inter' } },
            min: 0,
            max: 6,
            grid: { color: '#F3F4F6' }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1F2937',
            padding: 12,
            titleFont: { size: 14, family: 'Inter' },
            bodyFont: { size: 13, family: 'Inter' },
            cornerRadius: 8,
            callbacks: {
              label: (context: any) => {
                const index = context.dataIndex
                const sh = stakeholders.value[index]
                if (!sh) return ''
                return `${sh.nama} - Influence: ${sh.influence}, Interest: ${sh.interest}`
              }
            }
          }
        }
      }
    } as any)
  }
})
</script>

<style scoped>
.modern-stakeholder {
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

.stat-card.white {
  background: white;
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
  letter-spacing: -0.5px;
}

.stat-value.dark {
  color: #1E293B;
}

/* Chart Card */
.chart-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.card-header {
  margin-bottom: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
}

.card-body {
  position: relative;
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

/* Modern Table */
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

.stakeholder-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.name {
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

.badge-primary {
  background: #DBEAFE;
  color: #1E40AF;
}

.badge-info {
  background: #D1FAE5;
  color: #065F46;
}

.rating {
  display: flex;
  gap: 2px;
}

.star {
  color: #D1D5DB;
  font-size: 16px;
}

.star.active {
  color: #F59E0B;
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
</style>
