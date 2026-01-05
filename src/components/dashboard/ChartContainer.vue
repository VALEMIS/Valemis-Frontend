<template>
  <Card class="chart-container">
    <template #header>
      <div class="flex justify-content-between align-items-center p-3">
        <h4 class="m-0 font-semibold">{{ title }}</h4>
        <div class="flex gap-2">
          <Button
            v-if="showExport"
            icon="bi bi-download"
            severity="secondary"
            text
            size="small"
            v-tooltip.top="'Export as Image'"
            @click="handleExport"
          />
          <Button
            v-if="showFullscreen"
            icon="bi bi-fullscreen"
            severity="secondary"
            text
            size="small"
            v-tooltip.top="'Fullscreen'"
            @click="handleFullscreen"
          />
        </div>
      </div>
    </template>

    <template #content>
      <div class="chart-wrapper" :style="{ height: height }">
        <canvas :id="canvasId"></canvas>
      </div>

      <!-- Loading overlay -->
      <div v-if="loading" class="chart-loading-overlay">
        <ProgressSpinner strokeWidth="3" />
      </div>
    </template>
  </Card>

  <!-- Fullscreen Dialog -->
  <Dialog
    v-model:visible="fullscreenVisible"
    :header="title"
    :style="{ width: '90vw', height: '90vh' }"
    :modal="true"
  >
    <div class="chart-wrapper-fullscreen">
      <canvas :id="`${canvasId}-fullscreen`"></canvas>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import Dialog from 'primevue/dialog'
import Tooltip from 'primevue/tooltip'
import { useChartJS, convertToChartConfig } from '@/composables/useChartJS'
import type { ChartConfig } from '@/types/dashboard'

interface Props {
  title: string
  icon: string
  canvasId: string
  chartConfig: ChartConfig | null
  height?: string
  showExport?: boolean
  showFullscreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  height: '400px',
  showExport: true,
  showFullscreen: true
})

const loading = ref(false)
const fullscreenVisible = ref(false)

const { initChart, destroyChart, exportAsImage } = useChartJS(props.canvasId)

// Initialize chart on mount
onMounted(() => {
  if (props.chartConfig) {
    loading.value = true
    setTimeout(() => {
      initChart(convertToChartConfig(props.chartConfig!))
      loading.value = false
    }, 100)
  }
})

// Watch for chart config changes
watch(() => props.chartConfig, (newConfig) => {
  if (newConfig) {
    loading.value = true
    setTimeout(() => {
      destroyChart()
      initChart(convertToChartConfig(newConfig))
      loading.value = false
    }, 100)
  }
}, { deep: true })

// Handle export
const handleExport = () => {
  const filename = `${props.title.toLowerCase().replace(/\s+/g, '-')}.png`
  exportAsImage(filename)
}

// Handle fullscreen
const handleFullscreen = () => {
  fullscreenVisible.value = true

  // Initialize fullscreen chart after dialog opens
  setTimeout(() => {
    const fullscreenCanvasId = `${props.canvasId}-fullscreen`
    const { initChart: initFullscreenChart } = useChartJS(fullscreenCanvasId)

    if (props.chartConfig) {
      initFullscreenChart(convertToChartConfig(props.chartConfig))
    }
  }, 100)
}
</script>

<style scoped>
.chart-container {
  margin-bottom: 0;
}

.chart-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.chart-wrapper-fullscreen {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 12px 12px;
}

:deep(.p-card) {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

:deep(.p-card:hover) {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

:deep(.p-card-content) {
  padding: 0;
}

:deep(.p-card-header) {
  background: white;
  border-bottom: 2px solid #f8f9fa;
  padding: 0;
}

:deep(.p-card-header h4) {
  color: #333;
  font-size: 1rem;
}
</style>
