<template>
  <div class="dashboard-container">
    <!-- Header -->
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <h3 class="mb-0 text-uppercase font-weight-bold">
              Monitoring Dashboard
            </h3>
            <p class="text-500 text-sm mt-1">Real-time overview of all land acquisition activities</p>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-end">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="bi bi-house-fill"></i></router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="app-content">
      <div class="container-fluid">
        <!-- 🟦 ZONE 1: Executive KPI -->
        <ExecutiveKPI />

        <!-- 🟨 ZONE 2: Critical Alerts -->
        <CriticalAlerts />

        <!-- 🗺️ ZONE 3: Unified Land Map -->
        <UnifiedLandMap />

        <!-- 📊 ZONE 4: Monitoring Charts -->
        <MonitoringCharts />

        <!-- Footer Info -->
        <div class="row mt-4">
          <div class="col-12">
            <Card class="footer-card">
              <template #content>
                <div class="text-center">
                  <p class="mb-2 text-secondary font-medium">
                    Dashboard Monitoring - Last updated: {{ lastUpdated }}
                  </p>
                  <p class="text-sm text-500 mb-0">
                    Data is refreshed automatically. Click on any KPI, alert, or chart for detailed analysis.
                  </p>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import ExecutiveKPI from '@/components/dashboard/ExecutiveKPI.vue'
import CriticalAlerts from '@/components/dashboard/CriticalAlerts.vue'
import UnifiedLandMap from '@/components/dashboard/UnifiedLandMap.vue'
import MonitoringCharts from '@/components/dashboard/MonitoringCharts.vue'

const lastUpdated = ref(new Date().toLocaleString('id-ID', {
  dateStyle: 'long',
  timeStyle: 'short'
}))

onMounted(() => {
  // Update timestamp every minute
  setInterval(() => {
    lastUpdated.value = new Date().toLocaleString('id-ID', {
      dateStyle: 'long',
      timeStyle: 'short'
    })
  }, 60000)
})
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: #f8f9fa;
}

:deep(.card) {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border: none;
}

:deep(.card:hover) {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

:deep(.card-header) {
  background-color: white;
  border-bottom: 1px solid var(--surface-border);
  border-radius: 12px 12px 0 0;
}

:deep(.breadcrumb) {
  background: transparent;
  margin: 0;
  padding: 0;
}

:deep(.breadcrumb-item + .breadcrumb-item::before) {
  content: ">";
  color: var(--text-secondary);
}

.app-content {
  padding-top: 2rem;
}

.app-content > .container-fluid {
  max-width: 1400px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.footer-card :deep(.p-card-content) {
  padding: 1.5rem;
}

.footer-card p {
  color: white;
}

.footer-card .text-500 {
  color: rgba(255, 255, 255, 0.9);
}
</style>
