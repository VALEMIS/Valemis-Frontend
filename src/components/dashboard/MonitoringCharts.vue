<template>
  <div class="monitoring-charts">
    <!-- Section Header -->
    <div class="section-header">
      <div class="header-content">
        <div class="header-icon">
          <i class="bi bi-pie-chart-fill"></i>
        </div>
        <div>
          <h3 class="section-title">Data Visualization</h3>
          <p class="section-subtitle">Distribution and trends analysis</p>
        </div>
      </div>
    </div>

    <!-- Charts Container -->
    <div class="charts-container">
      <!-- Pie Chart -->
      <div class="chart-card">
        <h4 class="chart-title">Status Distribution</h4>
        <div class="chart-wrapper pie-chart-wrapper">
          <canvas id="status-pie-chart"></canvas>
        </div>
      </div>

      <!-- Bar Chart -->
      <div class="chart-card">
        <h4 class="chart-title">Monthly Progress</h4>
        <div class="chart-wrapper bar-chart-wrapper">
          <canvas id="progress-bar-chart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useChartJS } from '@/composables/useChartJS'

// Initialize charts
const { initChart: initPieChart } = useChartJS('status-pie-chart')
const { initChart: initBarChart } = useChartJS('progress-bar-chart')

onMounted(() => {
  // Pie Chart - Status Distribution
  const pieChartData = {
    labels: ['Lahan Bebas', 'Dalam Proses', 'Sengketa', 'Belum Diproses'],
    datasets: [{
      data: [180, 52, 8, 5],
      backgroundColor: [
        '#22c55e',
        '#eab308',
        '#ef4444',
        '#6b7280'
      ],
      borderWidth: 0,
      hoverOffset: 10
    }]
  }

  const pieChartConfig = {
    type: 'pie' as const,
    data: pieChartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            padding: 15,
            font: {
              size: 12,
              weight: '500'
            },
            color: '#6b7280',
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          padding: 12,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: '#e5e7eb',
          cornerRadius: 8,
          callbacks: {
            label: function (context: any) {
              const label = context.label || ''
              const value = context.parsed || 0
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
              const percentage = ((value / total) * 100).toFixed(1)
              return `${label}: ${value} (${percentage}%)`
            }
          }
        }
      }
    }
  }

  initPieChart(pieChartConfig)

  // Bar Chart - Monthly Progress
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Completed',
      data: [12, 19, 15, 25, 22, 30],
      backgroundColor: '#3b82f6',
      borderRadius: 6,
      barThickness: 30
    }]
  }

  const barChartConfig = {
    type: 'bar' as const,
    data: barChartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          padding: 12,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: '#e5e7eb',
          cornerRadius: 8,
          callbacks: {
            label: function (context: any) {
              return `Completed: ${context.parsed.y} parcels`
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#f3f4f6',
            drawBorder: false
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 12,
              weight: '500'
            }
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 12,
              weight: '500'
            }
          }
        }
      }
    }
  }

  initBarChart(barChartConfig)
})
</script>

<style scoped>
.monitoring-charts {
  margin-bottom: 0;
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
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
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

.charts-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.chart-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.chart-title {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
}

.chart-wrapper {
  position: relative;
}

.pie-chart-wrapper {
  height: 280px;
}

.bar-chart-wrapper {
  height: 250px;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .pie-chart-wrapper {
    height: 240px;
  }

  .bar-chart-wrapper {
    height: 220px;
  }
}
</style>
