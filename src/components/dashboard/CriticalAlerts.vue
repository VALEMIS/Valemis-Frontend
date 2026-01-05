<template>
  <div class="critical-alerts">
    <!-- Section Header -->
    <div class="section-header">
      <div class="header-content">
        <div class="header-icon">
          <i class="bi bi-bell-fill"></i>
          <span v-if="recentAlerts.length > 0" class="alert-count">{{ recentAlerts.length }}</span>
        </div>
        <div>
          <h3 class="section-title">Recent Alerts</h3>
          <p class="section-subtitle">Tasks requiring immediate attention</p>
        </div>
      </div>
      <router-link to="/alerts" class="view-all-link">
        View All
        <i class="bi bi-arrow-right"></i>
      </router-link>
    </div>

    <!-- Alert Cards List -->
    <div class="alerts-container">
      <div v-if="recentAlerts.length > 0" class="alerts-grid">
        <div v-for="alert in recentAlerts" :key="alert.id" class="alert-card" :class="`alert-${alert.severity}`"
          @click="handleAlertClick(alert)">
          <div class="alert-indicator"></div>

          <div class="alert-icon-wrapper">
            <div class="alert-icon">
              <i :class="getAlertIcon(alert.severity)"></i>
            </div>
          </div>

          <div class="alert-content">
            <div class="alert-header">
              <h4 class="alert-title">{{ alert.title }}</h4>
              <span class="alert-badge" :class="`badge-${alert.severity}`">
                {{ getSeverityLabel(alert.severity) }}
              </span>
            </div>

            <!-- Project Badge (if project-specific) -->
            <div v-if="alert.project_name" class="project-badge-wrapper">
              <span class="project-badge">
                <i class="bi bi-folder"></i>
                {{ alert.project_name }}
              </span>
            </div>

            <p class="alert-message">{{ alert.message }}</p>
            <div class="alert-footer">
              <span class="alert-time">
                <i class="bi bi-clock"></i>
                {{ formatTime(alert.timestamp) }}
              </span>
              <span class="alert-action">
                <i class="bi bi-arrow-right-circle"></i>
                Take Action
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <i class="bi bi-check-circle"></i>
        </div>
        <h4 class="empty-title">All Clear!</h4>
        <p class="empty-message">No alerts at this time. Everything is running smoothly.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardData } from '@/composables/useDashboardData'

const router = useRouter()
const { alerts } = useDashboardData()

// Get recent alerts (combine all categories, limit to 6)
const recentAlerts = computed(() => {
  const allAlerts = alerts.value.flatMap(category =>
    category.alerts.map(alert => ({
      ...alert,
      severity: category.severity,
      timestamp: new Date() // Mock timestamp
    }))
  )
  return allAlerts.slice(0, 6)
})

// Get alert icon based on severity
const getAlertIcon = (severity: string) => {
  const iconMap: Record<string, string> = {
    'danger': 'bi bi-exclamation-triangle-fill',
    'warning': 'bi bi-exclamation-circle-fill',
    'info': 'bi bi-info-circle-fill',
    'success': 'bi bi-check-circle-fill'
  }
  return iconMap[severity] || 'bi bi-bell-fill'
}

// Get severity label
const getSeverityLabel = (severity: string) => {
  const labelMap: Record<string, string> = {
    'danger': 'Urgent',
    'warning': 'Warning',
    'info': 'Info',
    'success': 'Success'
  }
  return labelMap[severity] || severity
}

// Format timestamp
const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

// Handle alert click
const handleAlertClick = (alert: any) => {
  // Use the actionRoute directly from alert data
  // This route is already properly formatted (e.g., /project/7/asset-inventory or /land-compliance)
  if (alert.actionRoute) {
    router.push(alert.actionRoute)
  }
}
</script>

<style scoped>
.critical-alerts {
  margin-bottom: 2.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  position: relative;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.alert-count {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0 0;
}

.view-all-link {
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
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-all-link:hover {
  background: #f9fafb;
  border-color: #f59e0b;
  color: #f59e0b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
}

.alerts-container {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.alerts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
}

.alert-card {
  position: relative;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  display: flex;
  gap: 1rem;
}

.alert-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.alert-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.alert-card:hover::before {
  opacity: 1;
}

.alert-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  border-radius: 12px 0 0 12px;
}

.alert-danger .alert-indicator {
  background: linear-gradient(180deg, #ef4444 0%, #dc2626 100%);
}

.alert-warning .alert-indicator {
  background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%);
}

.alert-info .alert-indicator {
  background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
}

.alert-icon-wrapper {
  flex-shrink: 0;
}

.alert-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.alert-danger .alert-icon {
  background: #fee2e2;
  color: #dc2626;
}

.alert-warning .alert-icon {
  background: #fef3c7;
  color: #d97706;
}

.alert-info .alert-icon {
  background: #dbeafe;
  color: #2563eb;
}

.alert-content {
  flex: 1;
  min-width: 0;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.alert-title {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.4;
}

.project-badge-wrapper {
  margin: 0.5rem 0;
}

.project-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.project-badge i {
  font-size: 0.875rem;
}

.alert-badge {
  flex-shrink: 0;
  padding: 0.25rem 0.625rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-danger {
  background: #fee2e2;
  color: #991b1b;
}

.badge-warning {
  background: #fef3c7;
  color: #92400e;
}

.badge-info {
  background: #dbeafe;
  color: #1e40af;
}

.alert-message {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
}

.alert-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.alert-time {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: #9ca3af;
}

.alert-action {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #667eea;
}

.empty-state {
  text-align: center;
  padding: 3rem 1.5rem;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.empty-message {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .view-all-link {
    width: 100%;
    justify-content: center;
  }

  .alerts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
