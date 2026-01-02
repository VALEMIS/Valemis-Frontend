<template>
  <div class="critical-alerts">
    <!-- Section Header -->
    <div class="section-header mb-3">
      <div>
        <h3 class="text-xl font-semibold m-0 text-secondary">
          Recent Due Jobs
        </h3>
        <p class="text-500 text-sm mt-1">Jobs requiring attention</p>
      </div>
      <a href="#" class="text-primary text-sm font-medium">See All</a>
    </div>

    <!-- Alert Cards List -->
    <div class="alerts-list">
      <div
        v-for="alert in recentAlerts"
        :key="alert.id"
        class="alert-card"
        @click="handleAlertClick(alert)"
      >
        <div class="flex gap-3">
          <!-- Icon -->
          <div class="alert-icon">
            <i class="bi bi-lightbulb text-warning"></i>
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h4 class="alert-title">{{ alert.title }}</h4>
            <p class="alert-message">{{ alert.message }}</p>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="recentAlerts.length === 0" class="empty-state">
        <i class="bi bi-check-circle text-success text-2xl mb-2 block"></i>
        <p class="text-500">No alerts at this time</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardData } from '@/composables/useDashboardData'

const router = useRouter()
const { alerts } = useDashboardData()

// Get recent alerts (combine all categories, limit to 5)
const recentAlerts = computed(() => {
  const allAlerts = alerts.value.flatMap(category =>
    category.alerts.map(alert => ({
      ...alert,
      severity: category.severity
    }))
  )
  return allAlerts.slice(0, 5)
})

// Handle alert click
const handleAlertClick = (alert: any) => {
  if (alert.actionRoute) {
    router.push(alert.actionRoute)
  }
}
</script>

<style scoped>
.critical-alerts {
  margin-bottom: 2.5rem;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.alert-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.alert-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.alert-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fef3c7;
  border-radius: 8px;
}

.alert-icon i {
  font-size: 1.25rem;
}

.alert-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.alert-message {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header a {
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.section-header a:hover {
  opacity: 0.8;
}
</style>
