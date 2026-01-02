<template>
  <div class="monitoring-charts">
    <!-- Section Header -->
    <div class="section-header mb-3">
      <div>
        <h3 class="text-xl font-semibold m-0 text-secondary">
          Cost Analysis
        </h3>
        <p class="text-500 text-sm mt-1">Monthly cost trends</p>
      </div>
      <Dropdown
        v-model="selectedPeriod"
        :options="periodOptions"
        optionLabel="label"
        optionValue="value"
        class="period-dropdown"
      />
    </div>

    <!-- Single Focused Chart -->
    <Card class="chart-card">
      <template #content>
        <div class="chart-wrapper">
          <canvas id="cost-analysis-chart"></canvas>
        </div>

        <!-- Value Badge -->
        <div class="value-badge">
          <span class="value-label">Latest</span>
          <span class="value-amount">{{ latestValue }}</span>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import { useChartJS } from '@/composables/useChartJS'

// Period options
const periodOptions = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Yearly', value: 'yearly' }
]

const selectedPeriod = ref('monthly')
const latestValue = ref('IDR 45.2 Miliar')

// Initialize chart
const { initChart } = useChartJS('cost-analysis-chart')

onMounted(() => {
  // Sample cost analysis chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [{
      label: 'Cost',
      data: [28, 30, 32, 35, 38, 42, 45, 48, 52, 55, 58],
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4
    }]
  }

  const chartConfig = {
    type: 'line' as const,
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 20,
          grid: {
            color: '#e5e7eb'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  }

  initChart(chartConfig)
})
</script>

<style scoped>
.monitoring-charts {
  margin-bottom: 2.5rem;
}

.period-dropdown {
  width: 150px;
}

.chart-card {
  position: relative;
  overflow: hidden;
}

.chart-wrapper {
  position: relative;
  height: 400px;
  padding: 1.5rem;
}

.value-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #22c55e;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.value-label {
  font-size: 0.75rem;
  opacity: 0.9;
  text-transform: uppercase;
  font-weight: 500;
}

.value-amount {
  font-size: 1rem;
  font-weight: 700;
}

:deep(.p-card) {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

:deep(.p-card:hover) {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

:deep(.p-dropdown) {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

:deep(.p-dropdown:not(.p-disabled):hover) {
  border-color: #22c55e;
}

:deep(.p-dropdown:not(.p-disabled).p-focus) {
  border-color: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .period-dropdown {
    width: 100%;
  }

  .chart-wrapper {
    height: 300px;
    padding: 1rem;
  }
}
</style>
