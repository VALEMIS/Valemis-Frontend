<template>
  <div class="monitoring-charts">
    <!-- Section Header -->
    <div class="section-header">
      <div class="header-content">
        <div class="header-icon">
          <i class="bi bi-graph-up-arrow"></i>
        </div>
        <div>
          <h3 class="section-title">Cost Analysis</h3>
          <p class="section-subtitle">Monthly expenditure trends and projections</p>
        </div>
      </div>
      <div class="controls">
        <select v-model="selectedPeriod" class="period-select">
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button class="export-btn" @click="handleExport">
          <i class="bi bi-download"></i>
          Export
        </button>
      </div>
    </div>

    <!-- Chart Card -->
    <div class="chart-card">
      <!-- Stats Row -->
      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-label">Current Month</span>
          <span class="stat-value">{{ currentMonthValue }}</span>
          <span class="stat-change positive">
            <i class="bi bi-arrow-up"></i>
            12.5%
          </span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Average</span>
          <span class="stat-value">{{ averageValue }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Total YTD</span>
          <span class="stat-value">{{ totalValue }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Projected</span>
          <span class="stat-value">{{ projectedValue }}</span>
        </div>
      </div>

      <!-- Chart Container -->
      <div class="chart-wrapper">
        <canvas id="cost-analysis-chart"></canvas>
      </div>

      <!-- Legend -->
      <div class="chart-legend">
        <div class="legend-item">
          <span class="legend-dot" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"></span>
          <span class="legend-label">Actual Cost</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"></span>
          <span class="legend-label">Projected</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useChartJS } from '@/composables/useChartJS'

const selectedPeriod = ref('monthly')
const currentMonthValue = ref('IDR 58M')
const averageValue = ref('IDR 42M')
const totalValue = ref('IDR 462M')
const projectedValue = ref('IDR 620M')

// Initialize chart
const { initChart } = useChartJS('cost-analysis-chart')

onMounted(() => {
  // Sample cost analysis chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Actual Cost',
        data: [28, 30, 32, 35, 38, 42, 45, 48, 52, 55, 58, null],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Projected',
        data: [null, null, null, null, null, null, null, null, null, null, 58, 62],
        borderColor: '#f5576c',
        backgroundColor: 'rgba(245, 87, 108, 0.1)',
        borderWidth: 3,
        borderDash: [5, 5],
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#f5576c',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  }

  const chartConfig = {
    type: 'line' as const,
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false
      },
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
          displayColors: true,
          callbacks: {
            label: function (context: any) {
              let label = context.dataset.label || ''
              if (label) {
                label += ': '
              }
              if (context.parsed.y !== null) {
                label += 'IDR ' + context.parsed.y + 'M'
              }
              return label
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 20,
          max: 70,
          grid: {
            color: '#f3f4f6',
            drawBorder: false
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 12,
              weight: '500'
            },
            callback: function (value: any) {
              return 'IDR ' + value + 'M'
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

  initChart(chartConfig)
})

const handleExport = () => {
  console.log('Exporting chart data...')
  // Implement export functionality
}
</script>

<style scoped>
.monitoring-charts {
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
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
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

.controls {
  display: flex;
  gap: 0.75rem;
}

.period-select {
  padding: 0.75rem 1rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  color: #374151;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.period-select:hover {
  border-color: #10b981;
}

.period-select:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.export-btn {
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
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-btn:hover {
  background: #f9fafb;
  border-color: #10b981;
  color: #10b981;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.chart-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-change {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 700;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.chart-wrapper {
  position: relative;
  height: 400px;
  margin-bottom: 1.5rem;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.legend-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .controls {
    width: 100%;
    flex-direction: column;
  }

  .period-select,
  .export-btn {
    width: 100%;
    justify-content: center;
  }

  .stats-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .chart-wrapper {
    height: 300px;
  }

  .chart-legend {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
