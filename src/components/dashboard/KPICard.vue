<template>
  <div class="kpi-card" @click="handleClick">
    <!-- Content Section -->
    <div class="kpi-content">
      <div class="kpi-header">
        <p class="kpi-title">{{ kpi.title }}</p>
      </div>

      <h2 class="kpi-value">
        {{ formattedValue }}
      </h2>

      <p v-if="kpi.subtitle" class="kpi-subtitle">{{ kpi.subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
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
    return `${(amount / 1000000000).toFixed(1)}M`
  } else if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}Jt`
  }
  return new Intl.NumberFormat('id-ID').format(amount)
}

// Get icon class based on KPI type
const getIconClass = () => {
  const iconMap: Record<string, string> = {
    'total-parcels': 'bi bi-grid-3x3-gap-fill',
    'lahan-bebas': 'bi bi-check-circle-fill',
    'dalam-proses': 'bi bi-hourglass-split',
    'sengketa': 'bi bi-exclamation-triangle-fill',
    'total-biaya': 'bi bi-cash-stack',
    'biaya-m2': 'bi bi-calculator-fill',
    'compliance-rate': 'bi bi-shield-check',
    'permits-expiring': 'bi bi-clock-history',
    'active-cases': 'bi bi-file-earmark-text',
    'high-priority-cases': 'bi bi-flag-fill'
  }
  return iconMap[props.kpi.id] || 'bi bi-graph-up'
}

// Get accent color based on KPI type
const getAccentColor = () => {
  const colorMap: Record<string, string> = {
    'total-parcels': '#3b82f6',
    'lahan-bebas': '#10b981',
    'dalam-proses': '#f59e0b',
    'sengketa': '#ef4444',
    'total-biaya': '#8b5cf6',
    'biaya-m2': '#06b6d4',
    'compliance-rate': '#10b981',
    'permits-expiring': '#f59e0b',
    'active-cases': '#6366f1',
    'high-priority-cases': '#ef4444'
  }
  return colorMap[props.kpi.id] || '#6b7280'
}

// Get icon background with opacity
const getIconBackground = () => {
  const color = getAccentColor()
  return color + '15' // Add 15% opacity
}

// Get progress color
const getProgressColor = (progress: number) => {
  if (progress >= 80) return 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
  if (progress >= 50) return 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'
  return 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
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
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 120px;
}

.kpi-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}

.kpi-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.kpi-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.kpi-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.kpi-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 0.25rem 0;
  color: #111827;
  line-height: 1.2;
}

.kpi-subtitle {
  font-size: 0.8125rem;
  color: #9ca3af;
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .kpi-card {
    padding: 1rem 1.25rem;
    min-height: 100px;
  }

  .kpi-value {
    font-size: 1.75rem;
  }
}
</style>
