<template>
  <div class="executive-kpi">
    <!-- Section Header -->
    <div class="section-header">
      <div class="header-content">
        <div class="header-icon">
          <i class="bi bi-speedometer2"></i>
        </div>
        <div>
          <h3 class="section-title">Key Performance Indicators</h3>
          <p class="section-subtitle">Real-time metrics at a glance</p>
        </div>
      </div>
      <button class="refresh-btn" @click="handleRefresh" :disabled="loading">
        <i class="bi bi-arrow-clockwise" :class="{ 'spinning': loading }"></i>
        <span>Refresh</span>
      </button>
    </div>

    <!-- KPI Cards Grid -->
    <div class="kpi-grid">
      <KPICard v-for="kpi in kpis" :key="kpi.id" :kpi="kpi" class="kpi-item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPICard from './KPICard.vue'
import { useDashboardData } from '@/composables/useDashboardData'

const { kpis, refreshData } = useDashboardData()
const loading = ref(false)

// Handle refresh button
const handleRefresh = async () => {
  loading.value = true
  try {
    await refreshData()
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
}
</script>

<style scoped>
.executive-kpi {
  margin-bottom: 2.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-icon {
  font-size: 1.25rem;
  color: #111827;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0 0;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  color: #374151;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.refresh-btn i {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.refresh-btn i.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

@media (min-width: 1400px) {
  .kpi-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1200px) {
  .kpi-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .refresh-btn {
    width: 100%;
    justify-content: center;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
