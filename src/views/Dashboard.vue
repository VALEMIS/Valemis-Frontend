<template>
  <div class="dashboard-container">
    <div class="app-content">
      <div class="container-fluid">
        <!-- Dashboard Title -->
        <div class="dashboard-header">
          <h3 class="page-title">Dashboard</h3>
          <!-- <p class="page-subtitle">Gambaran Umum Sistem Pengelolaan Lahan dan Aset</p> -->
        </div>

        <!-- 🗺️ ZONE 1: Unified Land Map (Top) -->
        <UnifiedLandMap />

        <!-- 🟦 ZONE 2: Executive KPI (Below Map) -->
        <ExecutiveKPI />

        <!-- 📊 ZONE 3: Two-Column Layout (Charts Left, Alerts Right) -->
        <div class="dashboard-bottom-grid">
          <div class="charts-column">
            <MonitoringCharts />

            <!-- 📄 Appraisal Documents Section -->
            <AppraisalDocuments />
          </div>
          <div class="alerts-column">
            <CriticalAlerts />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ExecutiveKPI from '@/components/dashboard/ExecutiveKPI.vue'
import CriticalAlerts from '@/components/dashboard/CriticalAlerts.vue'
import UnifiedLandMap from '@/components/dashboard/UnifiedLandMap.vue'
import MonitoringCharts from '@/components/dashboard/MonitoringCharts.vue'
import AppraisalDocuments from '@/components/dashboard/AppraisalDocuments.vue'
import { useProject } from '@/composables/useProject'

const router = useRouter()
const {
  currentProject,
  currentProjectId,
  projects,
  fetchProjects,
  setCurrentProject,
  initializeFromStorage
} = useProject()

const selectedProjectId = ref<number | null>(null)

const lastUpdated = ref(new Date().toLocaleString('id-ID', {
  dateStyle: 'long',
  timeStyle: 'short'
}))

// Handle project selection change
const handleProjectChange = () => {
  if (selectedProjectId.value) {
    const project = projects.value.find(p => p.id === selectedProjectId.value)
    if (project) {
      setCurrentProject(project)
    }
  } else {
    setCurrentProject(null)
  }
}

onMounted(async () => {
  // Initialize project from localStorage
  await initializeFromStorage()

  // Fetch all projects
  await fetchProjects()

  // Set selected project ID if there's a current project
  if (currentProject.value) {
    selectedProjectId.value = currentProject.value.id
  }

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
  background: #f5f7fa;
  background-attachment: fixed;
}

.app-content {
  padding: 3rem 0 2rem 0;
}

.dashboard-header {
  margin-bottom: 2rem;
  padding-top: 1rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #111827;
}

.page-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
  font-weight: 400;
}

.header-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}

.project-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f9fafb;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
}

.selector-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.project-select {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #111827;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.project-select:hover {
  border-color: #667eea;
}

.project-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.breadcrumb {
  background: transparent;
  margin: 0;
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border-radius: 12px;
}

.breadcrumb-item {
  font-size: 0.875rem;
  font-weight: 500;
}

.breadcrumb-item a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-item a:hover {
  color: #764ba2;
}

.breadcrumb-item.active {
  color: #6b7280;
}

.breadcrumb-item+.breadcrumb-item::before {
  content: "›";
  color: #9ca3af;
  padding: 0 0.5rem;
}

.project-notice {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 2px solid #e5e7eb;
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.notice-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  flex-shrink: 0;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
}

.notice-content {
  flex: 1;
}

.notice-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.notice-message {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.notice-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.notice-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  color: white;
}

.app-content {
  padding: 0 0 2rem 0;
}

.app-content>.container-fluid {
  max-width: 1400px;
}

.footer-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 2px solid #e5e7eb;
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.footer-text {
  flex: 1;
}

.footer-title {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.footer-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

/* Two-Column Bottom Grid */
.dashboard-bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.charts-column {
  min-width: 0;
}

.alerts-column {
  min-width: 0;
}

@media (max-width: 768px) {
  .app-content-header {
    padding: 1.5rem 0;
  }

  .header-title-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .title-icon {
    width: 48px;
    height: 48px;
    font-size: 1.5rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .page-subtitle {
    font-size: 0.875rem;
  }

  .header-actions {
    align-items: flex-start;
    width: 100%;
  }

  .project-selector {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .project-select {
    width: 100%;
  }

  .breadcrumb {
    margin-top: 0;
    width: 100%;
  }

  .project-notice {
    flex-direction: column;
    text-align: center;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .dashboard-bottom-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
