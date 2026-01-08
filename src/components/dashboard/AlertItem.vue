<template>
  <div class="alert-item" :class="severityClass" @click="$emit('click', alert)">
    <div class="alert-main">
      <span class="severity-icon">{{ severityIcon }}</span>
      <div class="alert-text">
        <h6 class="alert-title">{{ alert.title }}</h6>
        <p class="alert-description">{{ alert.description }}</p>
      </div>
    </div>
    <div class="alert-right">
      <span class="alert-time">{{ formattedTime }}</span>
      <span v-if="alert.count" class="alert-count">{{ alert.count }} item</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ alert: any }>()

const severityClass = computed(() => {
  switch (props.alert.severity) {
    case 'critical': return 'severity-critical'
    case 'warning': return 'severity-warning'
    case 'info': return 'severity-info'
    default: return ''
  }
})

const severityIcon = computed(() => {
  switch (props.alert.severity) {
    case 'critical': return '❗'
    case 'warning': return '⚠️'
    case 'info': return 'ℹ️'
    default: return '•'
  }
})

const formattedTime = computed(() => {
  const now = new Date()
  const diff = now.getTime() - new Date(props.alert.timestamp).getTime()
  if (diff < 60000) return 'Baru saja'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`
  return `${Math.floor(diff / 86400000)} hari lalu`
})
</script>

<style scoped>
.alert-item {
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border-radius: 12px;
  background-color: #f9fafb;
  border: 2px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
}

.alert-item:hover {
  background-color: #f3f4f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.alert-main {
  display: flex;
  flex-grow: 1;
  gap: 0.5rem;
  align-items: center;
}

.severity-icon {
  font-size: 1.25rem;
}

.alert-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.alert-title {
  margin: 0;
  font-weight: 700;
  font-size: 0.9375rem;
  color: #111827;
}

.alert-description {
  margin: 0;
  font-size: 0.8125rem;
  color: #6b7280;
}

.alert-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #9ca3af;
}

.alert-count {
  background-color: #ffffff;
  padding: 0.25rem 0.625rem;
  border-radius: 8px;
  border: 2px solid;
  border-color: #898ebc;
  font-weight: 600;
  color: #374151;
}

/* Severity Colors */
.severity-critical {
  border-left: 4px solid #ef4444;
}

.severity-warning {
  border-left: 4px solid #f59e0b;
}

.severity-info {
  border-left: 4px solid #3b82f6;
}

@media (max-width: 768px) {
  .alert-right {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>
