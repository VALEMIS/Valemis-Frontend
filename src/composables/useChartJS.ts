/**
 * useChartJS Composable
 * Helper wrapper for Chart.js integration
 */

import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { Chart, ChartConfiguration, ChartType } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Legend,
  Tooltip,
  Title,
  SubTitle,
  Decimation,
  Filler as FillerPlugin
} from 'chart.js'
import {
  LineController,
  BarController,
  DoughnutController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  // Scales
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,

  // Elements
  PointElement,
  LineElement,
  BarElement,
  ArcElement,

  // Controllers
  LineController,
  BarController,
  DoughnutController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,

  // Plugins
  FillerPlugin,
  Legend,
  Tooltip,
  Title,
  SubTitle,
  Decimation
)

export function useChartJS(canvasId: string) {
  const chartInstance = ref<Chart | null>(null)
  const isLoading = ref(false)

  // Initialize chart
  const initChart = (config: ChartConfiguration) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement

    if (!canvas) {
      console.error(`Canvas element with id "${canvasId}" not found`)
      return
    }

    // Destroy existing chart if any
    if (chartInstance.value) {
      chartInstance.value.destroy()
    }

    // Create new chart
    chartInstance.value = new ChartJS(canvas, config)
  }

  // Update chart data
  const updateChart = (newData: any) => {
    if (!chartInstance.value) {
      console.warn('Chart instance not initialized')
      return
    }

    chartInstance.value.data = newData
    chartInstance.value.update()
  }

  // Update chart options
  const updateOptions = (newOptions: any) => {
    if (!chartInstance.value) {
      console.warn('Chart instance not initialized')
      return
    }

    chartInstance.value.options = { ...chartInstance.value.options, ...newOptions }
    chartInstance.value.update()
  }

  // Destroy chart
  const destroyChart = () => {
    if (chartInstance.value) {
      chartInstance.value.destroy()
      chartInstance.value = null
    }
  }

  // Export chart as image
  const exportAsImage = (filename = 'chart.png') => {
    if (!chartInstance.value) {
      console.warn('Chart instance not initialized')
      return
    }

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (canvas) {
      const link = document.createElement('a')
      link.download = filename
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    destroyChart()
  })

  return {
    chartInstance,
    isLoading,
    initChart,
    updateChart,
    updateOptions,
    destroyChart,
    exportAsImage
  }
}

// Default Chart.js options for consistent styling
export const getDefaultChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 15,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 14
      },
      bodyFont: {
        size: 13
      },
      cornerRadius: 4
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11
        }
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          size: 11
        }
      }
    }
  }
})

// Options for pie/doughnut charts (no axes)
export const getPieChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: 'right' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      callbacks: {
        label: (context: any) => {
          const label = context.label || ''
          const value = context.parsed || 0
          const total = context.dataset.data.reduce((sum: number, val: number) => sum + val, 0)
          const percentage = ((value / total) * 100).toFixed(1)
          return `${label}: ${value} (${percentage}%)`
        }
      }
    }
  }
})

// Format number for display
export const formatNumber = (num: number, decimals = 0) => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num)
}

// Format currency for display
export const formatCurrency = (amount: number) => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)} Miliar IDR`
  } else if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)} Juta IDR`
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

// Convert mock data config to Chart.js format
export const convertToChartConfig = (mockConfig: any): ChartConfiguration => {
  return {
    type: mockConfig.type as ChartType,
    data: mockConfig.data,
    options: mockConfig.type === 'pie' || mockConfig.type === 'doughnut'
      ? getPieChartOptions()
      : getDefaultChartOptions()
  }
}
