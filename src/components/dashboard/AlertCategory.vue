<template>
  <div class="alert-category">
    <h5 class="category-title">{{ title }}</h5>
    <div class="category-alerts">
      <AlertItem v-for="alert in alerts" :key="alert.id" :alert="alert" @click="clickAlert" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AlertItem from './AlertItem.vue'

const props = defineProps<{ title: string; alerts: any[] }>()

const emit = defineEmits<{ (e: 'click-alert', alert: any): void }>()

const clickAlert = (alert: any) => emit('click-alert', alert)
</script>

<style scoped>
.alert-category {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-title {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 0.5rem;
  color: #374151;
}

.category-alerts {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
