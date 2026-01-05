/**
 * useDashboardFilters Composable
 * Manages global dashboard filters state
 */

import { ref, computed, watch } from 'vue'
import type { DashboardFilters, TimeRange } from '@/types/dashboard'

export function useDashboardFilters() {
  // Available options (would come from API in real implementation)
  const desaOptions = ref<string[]>([
    'Sorowako',
    'Magani',
    'Wewangriu',
    'Nikkel',
    'Tarowang',
    'Timampu',
    'Nuha'
  ])

  const projectOptions = ref<string[]>([
    'Project Alpha',
    'Project Beta',
    'Project Gamma'
  ])

  // Filter state
  const selectedDesa = ref<string[]>([])
  const selectedProject = ref<string[]>([])
  const selectedTimeRange = ref<TimeRange>('ALL')
  const customDateRange = ref<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  })

  // Computed filters object
  const filters = computed<DashboardFilters>(() => ({
    desa: selectedDesa.value,
    project: selectedProject.value,
    dateRange: customDateRange.value.start && customDateRange.value.end
      ? {
          start: customDateRange.value.start,
          end: customDateRange.value.end
        }
      : null
  }))

  // Check if any filters are active
  const hasActiveFilters = computed(() => {
    return (
      selectedDesa.value.length > 0 ||
      selectedProject.value.length > 0 ||
      (customDateRange.value.start !== null && customDateRange.value.end !== null)
    )
  })

  // Reset all filters
  const resetFilters = () => {
    selectedDesa.value = []
    selectedProject.value = []
    selectedTimeRange.value = 'ALL'
    customDateRange.value = { start: null, end: null }
  }

  // Update time range preset
  const updateTimeRange = (range: TimeRange) => {
    selectedTimeRange.value = range
    const now = new Date()
    let start: Date | null = null

    switch (range) {
      case '1M':
        start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        break
      case '3M':
        start = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
        break
      case '6M':
        start = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
        break
      case '1Y':
        start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
        break
      case 'ALL':
        start = null
        break
    }

    customDateRange.value = {
      start,
      end: range === 'ALL' ? null : now
    }
  }

  // Toggle desa selection
  const toggleDesa = (desa: string) => {
    const index = selectedDesa.value.indexOf(desa)
    if (index > -1) {
      selectedDesa.value = selectedDesa.value.filter(d => d !== desa)
    } else {
      selectedDesa.value = [...selectedDesa.value, desa]
    }
  }

  // Toggle project selection
  const toggleProject = (project: string) => {
    const index = selectedProject.value.indexOf(project)
    if (index > -1) {
      selectedProject.value = selectedProject.value.filter(p => p !== project)
    } else {
      selectedProject.value = [...selectedProject.value, project]
    }
  }

  // Watch for filter changes
  const onFilterChange = (callback: (filters: DashboardFilters) => void) => {
    watch(filters, (newFilters) => {
      callback(newFilters)
    }, { deep: true })
  }

  // Get filter summary string
  const filterSummary = computed(() => {
    const parts: string[] = []

    if (selectedDesa.value.length > 0) {
      parts.push(`${selectedDesa.value.length} Desa`)
    }

    if (selectedProject.value.length > 0) {
      parts.push(`${selectedProject.value.length} Project`)
    }

    if (customDateRange.value.start && customDateRange.value.end) {
      const formatDate = (date: Date) => date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
      parts.push(`${formatDate(customDateRange.value.start)} - ${formatDate(customDateRange.value.end)}`)
    }

    return parts.length > 0 ? parts.join(' | ') : 'All Data'
  })

  return {
    // Options
    desaOptions,
    projectOptions,

    // State
    selectedDesa,
    selectedProject,
    selectedTimeRange,
    customDateRange,

    // Computed
    filters,
    hasActiveFilters,
    filterSummary,

    // Methods
    resetFilters,
    updateTimeRange,
    toggleDesa,
    toggleProject,
    onFilterChange
  }
}
