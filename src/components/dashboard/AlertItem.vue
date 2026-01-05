<template>
  <div
    class="alert-item p-3 mb-2 border-round transition-all hover:bg-white hover:shadow-md cursor-pointer"
    @click="handleClick"
  >
    <div class="flex justify-content-between align-items-start">
      <!-- Left: Alert Content -->
      <div class="flex-1">
        <div class="flex align-items-center mb-1">
          <Badge
            v-if="alert.count"
            :value="alert.count"
            :severity="getSeverity(alert.severity)"
            class="mr-2"
          />
          <span class="font-semibold text-sm">{{ alert.title }}</span>
        </div>
        <p class="text-500 text-sm m-0">{{ alert.message }}</p>

        <!-- Timestamp (if exists) -->
        <small v-if="alert.timestamp" class="text-400 block mt-1">
          <i class="bi bi-clock mr-1"></i>
          {{ formatTimestamp(alert.timestamp) }}
        </small>
      </div>

      <!-- Right: Actions -->
      <div class="flex gap-2 ml-3">
        <!-- Action Button -->
        <Button
          v-if="alert.actionLabel"
          :label="alert.actionLabel"
          size="small"
          text
          class="text-sm"
          @click.stop="handleActionClick"
        />

        <!-- Dismiss Button -->
        <Button
          v-if="alert.dismissible"
          icon="bi bi-x-lg"
          severity="secondary"
          text
          rounded
          size="small"
          @click.stop="handleDismiss"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import type { Alert } from '@/types/dashboard'

interface Props {
  alert: Alert
}

interface Emits {
  (e: 'dismiss', id: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const router = useRouter()

// Get PrimeVue severity from alert severity
const getSeverity = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'danger'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    case 'monitoring':
      return 'secondary'
    default:
      return 'info'
  }
}

// Format timestamp
const formatTimestamp = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }
  return 'Just now'
}

// Handle alert click
const handleClick = () => {
  if (props.alert.actionRoute) {
    router.push(props.alert.actionRoute)
  }
}

// Handle action button click
const handleActionClick = () => {
  if (props.alert.actionRoute) {
    router.push(props.alert.actionRoute)
  }
}

// Handle dismiss
const handleDismiss = () => {
  emit('dismiss', props.alert.id)
}
</script>

<style scoped>
.alert-item {
  background-color: var(--surface-ground);
  border-left: 4px solid transparent;
}

.alert-item:hover {
  border-left-color: var(--primary-color);
}

.alert-item.critical {
  border-left-color: var(--red-500);
}

.alert-item.warning {
  border-left-color: var(--yellow-500);
}

.alert-item.info {
  border-left-color: var(--blue-500);
}

.alert-item.monitoring {
  border-left-color: var(--surface-500);
}
</style>
