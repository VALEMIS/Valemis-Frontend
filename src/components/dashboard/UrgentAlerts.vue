<template>
    <div class="urgent-alerts">
        <!-- Section Header -->
        <div class="section-header">
            <div class="header-text">
                <h4 class="section-title">Urgent Alert</h4>
                <p class="section-subtitle">Peringatan yang memerlukan perhatian</p>
            </div>
        </div>

        <!-- Alerts Container -->
        <div class="urgent-alerts-section">
            <!-- Alerts List -->
            <div class="alerts-list">
                <!-- Legal / Compliance Alerts -->
                <div class="alert-category-section">
                    <h5 class="category-title">Legal / Compliance</h5>
                    <div v-for="alert in legalAlerts" :key="alert.id" class="alert-item"
                        :class="`severity-${alert.severity}`" @click="handleAlertClick(alert)">
                        <div class="alert-content">
                            <h6 class="alert-title">{{ alert.title }}</h6>
                            <p class="alert-description">{{ alert.description }}</p>
                            <div class="alert-footer">
                                <span v-if="alert.count" class="alert-count">{{ alert.count }} item</span>
                                <span class="alert-time">{{ formatTime(alert.timestamp) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Operasional Alerts -->
                <div class="alert-category-section">
                    <h5 class="category-title">Operasional</h5>
                    <div v-for="alert in operationalAlerts" :key="alert.id" class="alert-item"
                        :class="`severity-${alert.severity}`" @click="handleAlertClick(alert)">
                        <div class="alert-content">
                            <h6 class="alert-title">{{ alert.title }}</h6>
                            <p class="alert-description">{{ alert.description }}</p>
                            <div class="alert-footer">
                                <span v-if="alert.count" class="alert-count">{{ alert.count }} item</span>
                                <span class="alert-time">{{ formatTime(alert.timestamp) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sosial Alerts -->
                <div class="alert-category-section">
                    <h5 class="category-title">Sosial</h5>
                    <div v-for="alert in socialAlerts" :key="alert.id" class="alert-item"
                        :class="`severity-${alert.severity}`" @click="handleAlertClick(alert)">
                        <div class="alert-content">
                            <h6 class="alert-title">{{ alert.title }}</h6>
                            <p class="alert-description">{{ alert.description }}</p>
                            <div class="alert-footer">
                                <span v-if="alert.count" class="alert-count">{{ alert.count }} item</span>
                                <span class="alert-time">{{ formatTime(alert.timestamp) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { urgentAlertsData } from '@/mock-data/dashboardMock'

const router = useRouter()

const legalAlerts = computed(() => urgentAlertsData.filter(a => a.category === 'legal'))
const operationalAlerts = computed(() => urgentAlertsData.filter(a => a.category === 'operational'))
const socialAlerts = computed(() => urgentAlertsData.filter(a => a.category === 'social'))

const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / 3600000)

    if (hours < 1) return 'Baru saja'
    if (hours < 24) return `${hours} jam lalu`
    return `${Math.floor(hours / 24)} hari lalu`
}

const handleAlertClick = (alert: any) => {
    if (alert.actionRoute) {
        router.push(alert.actionRoute)
    }
}
</script>

<style scoped>
.urgent-alerts {
    margin-bottom: 0;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.header-text {
    flex: 1;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.25rem 0;
}

.section-subtitle {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
}

.urgent-alerts-section {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 2px solid #e5e7eb;
}

.alerts-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.alert-category-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.category-title {
    font-size: 0.875rem;
    font-weight: 700;
    color: #374151;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #f3f4f6;
}

.alert-item {
    background: #f9fafb;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.alert-item:hover {
    background: #f3f4f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.alert-item.severity-critical {
    border-left: 4px solid #ef4444;
}

.alert-item.severity-warning {
    border-left: 4px solid #f59e0b;
}

.alert-item.severity-info {
    border-left: 4px solid #3b82f6;
}

.alert-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.alert-title {
    font-size: 0.9375rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.4;
}

.alert-description {
    font-size: 0.8125rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
}

.alert-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.25rem;
}

.alert-count {
    font-size: 0.75rem;
    font-weight: 600;
    color: #374151;
    padding: 0.25rem 0.625rem;
    background: white;
    border-radius: 8px;
}

.alert-time {
    font-size: 0.75rem;
    color: #9ca3af;
}

@media (max-width: 768px) {
    .alert-footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}
</style>
