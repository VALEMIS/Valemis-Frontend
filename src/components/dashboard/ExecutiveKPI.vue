<template>
  <div class="executive-kpi">
    <!-- Section Header -->
    <div class="flex justify-content-between align-items-center mb-3">
      <div>
        <h3 class="text-xl font-semibold m-0 text-secondary">
          Executive KPI
        </h3>
        <p class="text-500 text-sm mt-1">Key performance indicators at a glance</p>
      </div>
      <Button
        icon="bi bi-arrow-clockwise"
        label="Refresh"
        severity="secondary"
        text
        @click="handleRefresh"
        :loading="loading"
      />
    </div>

    <!-- KPI Cards Grid -->
    <div class="kpi-cards-grid">
      <div
        v-for="kpi in kpis"
        :key="kpi.id"
        class="kpi-card-wrapper"
      >
        <KPICard :kpi="kpi" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
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

onMounted(() => {
  // Initial data load if needed
})
</script>

<style scoped>
.executive-kpi {
  margin-bottom: 2rem;
}

:deep(.p-button-text) {
  padding: 0.5rem 1rem;
}

.kpi-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 1200px) {
  .kpi-cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .kpi-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .kpi-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
