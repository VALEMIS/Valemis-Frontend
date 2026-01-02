/**
 * useDashboardData Composable
 * Manages data fetching and state for the dashboard
 */

import { ref, computed } from 'vue'
import type { DashboardData, KPICard, AlertCategory, MapLayer, ChartConfig } from '@/types/dashboard'
import { dashboardMockData, kpiCardsData, alertsCategoriesData, mapLayersData } from '@/mock-data/dashboardMock'

export function useDashboardData() {
  // Reactive state
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed properties for each zone
  const kpis = computed<KPICard[]>(() => kpiCardsData)

  const alerts = computed<AlertCategory[]>(() => alertsCategoriesData)

  const mapLayers = computed<MapLayer[]>(() => mapLayersData)

  const charts = computed(() => dashboardMockData.charts)

  // Get specific chart by path
  const getChart = (tab: string, chartKey: string): ChartConfig | null => {
    try {
      // @ts-ignore - dynamic access
      return dashboardMockData.charts.charts[tab][chartKey]
    } catch (e) {
      console.error(`Chart not found: ${tab}.${chartKey}`)
      return null
    }
  }

  // Filter KPIs by category
  const getKPIsByCategory = (category: 'acquisition' | 'financial' | 'compliance' | 'litigation') => {
    return kpis.value.filter(kpi => {
      const id = kpi.id
      if (category === 'acquisition') {
        return ['total-parcels', 'lahan-bebas', 'dalam-proses', 'sengketa'].includes(id)
      } else if (category === 'financial') {
        return ['total-biaya', 'biaya-m2'].includes(id)
      } else if (category === 'compliance') {
        return ['compliance-rate', 'permits-expiring'].includes(id)
      } else if (category === 'litigation') {
        return ['active-cases', 'high-priority-cases'].includes(id)
      }
      return false
    })
  }

  // Get alert count by severity
  const getAlertCountBySeverity = (severity: string) => {
    const category = alerts.value.find(cat => cat.severity === severity)
    return category ? category.alerts.length : 0
  }

  // Get total alert count
  const totalAlerts = computed(() => {
    return alerts.value.reduce((total, category) => total + category.alerts.length, 0)
  })

  // Refresh data (simulated)
  const refreshData = async () => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // In real implementation, fetch from API
      // For now, just return mock data
      loading.value = false
      return dashboardMockData
    } catch (e) {
      loading.value = false
      error.value = 'Failed to load dashboard data'
      console.error('Error loading dashboard data:', e)
      return null
    }
  }

  return {
    // State
    loading,
    error,

    // Data
    kpis,
    alerts,
    mapLayers,
    charts,
    totalAlerts,

    // Methods
    getChart,
    getKPIsByCategory,
    getAlertCountBySeverity,
    refreshData
  }
}
