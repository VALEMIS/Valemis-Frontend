/**
 * useDashboardData Composable
 * Manages data fetching and state for the dashboard
 */

import { ref, computed } from 'vue'
import type { DashboardData, KPICard, AlertCategory, MapLayer, ChartConfig } from '@/types/dashboard'
import { dashboardMockData, alertsCategoriesData, mapLayersData } from '@/mock-data/dashboardMock'
import { useProject } from './useProject'

export function useDashboardData() {
  // Get project context
  const { currentProjectId, getProjectRoute } = useProject()

  // Reactive state
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Generate KPI cards with dynamic routes
  const kpis = computed<KPICard[]>(() => {
    const baseKpis: KPICard[] = [
      // Acquisition KPIs
      {
        id: 'total-parcels',
        title: 'Total Parcels',
        value: 245,
        icon: 'bi bi-map',
        iconColor: '#3b82f6',
        trend: { value: 12, isPositive: true },
        targetRoute: currentProjectId.value ? getProjectRoute('/land-acquisition') : '/project'
      },
      {
        id: 'lahan-bebas',
        title: '% Lahan Bebas',
        value: 78,
        unit: '%',
        icon: 'bi bi-check-circle',
        iconColor: '#22c55e',
        progress: 78,
        targetRoute: currentProjectId.value ? getProjectRoute('/land-acquisition') : '/project'
      },
      {
        id: 'dalam-proses',
        title: 'Parcel Dalam Proses',
        value: 52,
        icon: 'bi bi-clock-history',
        iconColor: '#eab308',
        targetRoute: currentProjectId.value ? getProjectRoute('/land-acquisition') : '/project'
      },
      {
        id: 'sengketa',
        title: 'Parcel Sengketa',
        value: 8,
        icon: 'bi bi-exclamation-triangle',
        iconColor: '#ef4444',
        badge: { label: 'High Priority', severity: 'danger' },
        targetRoute: '/land-litigasi'
      },
      // Financial KPIs
      {
        id: 'total-biaya',
        title: 'Total Biaya Pembebasan',
        value: 45200000000,
        unit: 'IDR',
        icon: 'bi bi-cash-stack',
        iconColor: '#06b6d4',
        trend: { value: 8, isPositive: false },
        targetRoute: currentProjectId.value ? getProjectRoute('/land-acquisition') : '/project'
      },
      {
        id: 'biaya-m2',
        title: 'Rata-rata Biaya/m²',
        value: 250000,
        unit: 'IDR/m²',
        icon: 'bi bi-calculator',
        iconColor: '#6b7280',
        targetRoute: currentProjectId.value ? getProjectRoute('/land-acquisition') : '/project'
      },
      // Compliance KPIs
      {
        id: 'compliance-rate',
        title: 'Compliance Rate',
        value: 92,
        unit: '%',
        icon: 'bi bi-shield-check',
        iconColor: '#22c55e',
        progress: 92,
        badge: { label: 'Excellent', severity: 'success' },
        targetRoute: '/land-compliance'
      },
      {
        id: 'permits-expiring',
        title: 'Permits Expiring Soon',
        value: 5,
        icon: 'bi bi-calendar-x',
        iconColor: '#f97316',
        badge: { label: '< 30 Days', severity: 'warning' },
        targetRoute: '/land-compliance'
      },
      // Litigation KPIs
      {
        id: 'active-cases',
        title: 'Active Cases',
        value: 14,
        icon: 'bi bi-gavel',
        iconColor: '#8b5cf6',
        targetRoute: '/land-litigasi'
      },
      {
        id: 'high-priority-cases',
        title: 'High Priority Cases',
        value: 3,
        icon: 'bi bi-fire',
        iconColor: '#ef4444',
        badge: { label: 'Critical', severity: 'danger' },
        targetRoute: '/land-litigasi'
      }
    ]

    return baseKpis
  })

  // Use alerts directly from mock data (routes are already properly defined)
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
