<template>
  <Card
    class="kpi-card cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
    @click="handleClick"
  >
    <template #content>
      <!-- Title -->
      <p class="kpi-title">{{ kpi.title }}</p>

      <!-- Value with unit -->
      <h2 class="kpi-value">
        {{ formattedValue }}
        <span v-if="kpi.unit" class="kpi-unit">{{ kpi.unit }}</span>
      </h2>

      <!-- Subtext/Badge (if exists) -->
      <div v-if="kpi.badge" class="kpi-badge">
        <Badge
          :value="kpi.badge.label"
          :severity="kpi.badge.severity"
        />
      </div>

      <!-- Trend (if exists) -->
      <div v-if="kpi.trend" class="kpi-trend">
        <i
          :class="[
            'bi mr-1',
            kpi.trend.isPositive ? 'bi-arrow-up text-success' : 'bi-arrow-down text-danger'
          ]"
        />
        <span :class="kpi.trend.isPositive ? 'text-success' : 'text-danger'">
          {{ Math.abs(kpi.trend.value) }}%
        </span>
        <span class="text-500 ml-1">vs last month</span>
      </div>

      <!-- Progress bar (if exists) -->
      <ProgressBar
        v-if="kpi.progress !== undefined"
        :value="kpi.progress"
        :showValue="false"
        :class="`mt-2 ${getProgressBarColor(kpi.progress)}`"
        style="height: 6px"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Badge from 'primevue/badge'
import ProgressBar from 'primevue/progressbar'
import type { KPICard as KPICardType } from '@/types/dashboard'

interface Props {
  kpi: KPICardType
}

const props = defineProps<Props>()
const router = useRouter()

// Format value based on type
const formattedValue = computed(() => {
  const value = props.kpi.value

  // If it's a number that should be formatted as currency
  if (props.kpi.unit === 'IDR' || props.kpi.id === 'total-biaya') {
    return formatCurrency(value as number)
  }

  // If it's a large number, add commas
  if (typeof value === 'number' && value > 1000) {
    return new Intl.NumberFormat('id-ID').format(value)
  }

  return value
})

// Format currency
const formatCurrency = (amount: number) => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)} Miliar`
  } else if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)} Juta`
  }
  return new Intl.NumberFormat('id-ID').format(amount)
}

// Get progress bar color class
const getProgressBarColor = (progress: number) => {
  if (progress >= 80) return 'bg-success'
  if (progress >= 50) return 'bg-warning'
  return 'bg-danger'
}

// Handle card click
const handleClick = () => {
  if (props.kpi.targetRoute) {
    router.push(props.kpi.targetRoute)
  }
}
</script>

<style scoped>
.kpi-card {
  border-left: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-height: 120px;
}

.kpi-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

:deep(.p-card-content) {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.kpi-title {
  color: #757575;
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.kpi-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #333;
  line-height: 1.2;
}

.kpi-unit {
  font-size: 1rem;
  font-weight: 400;
  color: #757575;
  margin-left: 0.25rem;
}

.kpi-badge {
  margin-top: 0.5rem;
}

.kpi-trend {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.p-progressbar-value) {
  border-radius: 4px;
}

@media (max-width: 768px) {
  .kpi-value {
    font-size: 1.5rem;
  }

  :deep(.p-card-content) {
    padding: 1rem;
  }
}
</style>
