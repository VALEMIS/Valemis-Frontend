<template>
  <div class="kpi-card" @click="handleClick" :style="{ borderLeftColor: getAccentColor() }">
    <!-- Icon Section -->
    <div class="kpi-icon" :style="{ background: getIconBackground() }">
      <i :class="getIconClass()" :style="{ color: getAccentColor() }"></i>
    </div>

    <!-- Content Section -->
    <div class="kpi-content">
      <p class="kpi-title">{{ kpi.title }}</p>

      <div class="kpi-value-row">
        <h2 class="kpi-value">
          {{ formattedValue }}
        </h2>
        <span v-if="kpi.unit" class="kpi-unit">{{ kpi.unit }}</span>
      </div>

      <!-- Trend Indicator -->
      <div v-if="kpi.trend" class="kpi-trend">
        <div class="trend-badge" :class="kpi.trend.isPositive ? 'trend-up' : 'trend-down'">
          <i :class="kpi.trend.isPositive ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
          <span>{{ Math.abs(kpi.trend.value) }}%</span>
        </div>
        <span class="trend-label">vs bulan lalu</span>
      </div>

      <!-- Progress Bar -->
      <div v-if="kpi.progress !== undefined" class="kpi-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{
            width: kpi.progress + '%',
            background: getProgressColor(kpi.progress)
          }"></div>
        </div>
        <span class="progress-text">{{ kpi.progress }}% Complete</span>
      </div>

      <!-- Badge -->
      <div v-if="kpi.badge" class="kpi-badge-wrapper">
        <span class="kpi-badge" :class="`badge-${kpi.badge.severity}`">
          {{ kpi.badge.label }}
        </span>
      </div>
    </div>

    <!-- Hover Effect Overlay -->
    <div class="hover-overlay"></div>
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
  border-radius: 16px;
  padding: 1.5rem;
  border-left: 4px solid;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-height: 160px;
  display: flex;
  gap: 1rem;
}

.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.kpi-card:hover .hover-overlay {
  opacity: 1;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.kpi-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.kpi-card:hover .kpi-icon {
  transform: scale(1.1) rotate(5deg);
}

.kpi-icon i {
  font-size: 1.75rem;
}

.kpi-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.kpi-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.kpi-value-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.kpi-value {
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0;
  color: #111827;
  line-height: 1;
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.kpi-unit {
  font-size: 1rem;
  font-weight: 500;
  color: #9ca3af;
}

.kpi-trend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.trend-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
}

.trend-badge.trend-up {
  background: #dcfce7;
  color: #166534;
}

.trend-badge.trend-down {
  background: #fee2e2;
  color: #991b1b;
}

.trend-label {
  font-size: 0.75rem;
  color: #9ca3af;
}

.kpi-progress {
  margin-top: 0.5rem;
}

.progress-bar {
  height: 8px;
  background: #f3f4f6;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 0.375rem;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-text {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.kpi-badge-wrapper {
  margin-top: 0.5rem;
}

.kpi-badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-success {
  background: #dcfce7;
  color: #166534;
}

.badge-warning {
  background: #fef3c7;
  color: #92400e;
}

.badge-danger {
  background: #fee2e2;
  color: #991b1b;
}

.badge-info {
  background: #dbeafe;
  color: #1e40af;
}

@media (max-width: 768px) {
  .kpi-card {
    padding: 1.25rem;
    min-height: 140px;
  }

  .kpi-icon {
    width: 48px;
    height: 48px;
  }

  .kpi-icon i {
    font-size: 1.5rem;
  }

  .kpi-value {
    font-size: 1.875rem;
  }
}
</style>
