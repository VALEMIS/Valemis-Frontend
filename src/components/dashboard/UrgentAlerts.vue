<template>
    <div class="urgent-alerts">
        <div class="header">
            <h4 class="section-title">Urgent Alert</h4>
            <p class="section-subtitle">Peringatan yang memerlukan perhatian</p>
        </div>

        <div class="alerts-container">
            <AlertCategory v-for="category in categories" :key="category.name" :title="category.label"
                :alerts="category.data" @click-alert="handleAlertClick" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AlertCategory from './AlertCategory.vue'
import { urgentAlertsData } from '@/mock-data/dashboardMock'

const router = useRouter()

const categories = computed(() => [
    { name: 'legal', label: 'Legal / Compliance', data: urgentAlertsData.filter(a => a.category === 'legal') },
    { name: 'operational', label: 'Operasional', data: urgentAlertsData.filter(a => a.category === 'operational') },
    { name: 'social', label: 'Sosial', data: urgentAlertsData.filter(a => a.category === 'social') }
])

const handleAlertClick = (alert: any) => {
    if (alert.actionRoute) router.push(alert.actionRoute)
}
</script>

<style scoped>
.urgent-alerts {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.header {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
}

.section-subtitle {
    font-size: 0.875rem;
    color: #6b7280;
}

.alerts-container {
    background-color: #ffffff;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 2px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
</style>
