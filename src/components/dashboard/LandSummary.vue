<template>
    <div class="land-summary-section">
        <!-- Section Header -->
        <div class="section-header">
            <div class="header-text">
                <h4 class="section-title">Ringkasan Lahan</h4>
                <p class="section-subtitle">Gambaran umum status lahan</p>
            </div>
        </div>

        <!-- Summary Cards Grid -->
        <div class="summary-grid">
            <!-- Total Bidang Lahan -->
            <div class="summary-card">
                <div class="card-content">
                    <p class="card-title">Total Bidang Lahan</p>
                    <h2 class="card-value">{{ summary.totalBidangLahan }}</h2>
                    <p class="card-subtitle">bidang</p>
                </div>
            </div>

            <!-- Total Luas -->
            <div class="summary-card">
                <div class="card-content">
                    <p class="card-title">Total Luas (ha)</p>
                    <h2 class="card-value">{{ formatNumber(summary.totalLuasHa) }}</h2>
                    <p class="card-subtitle">hektar</p>
                </div>
            </div>

            <!-- Sudah Bebas -->
            <div class="summary-card">
                <div class="card-content">
                    <p class="card-title">Sudah Bebas</p>
                    <h2 class="card-value">{{ summary.sudahBebasPct }}%</h2>
                </div>
            </div>

            <!-- Dalam Proses -->
            <div class="summary-card">
                <div class="card-content">
                    <p class="card-title">Dalam Proses</p>
                    <h2 class="card-value">{{ summary.dalamProsesPct }}%</h2>
                </div>
            </div>

            <!-- Bermasalah -->
            <div class="summary-card">
                <div class="card-content">
                    <p class="card-title">Bermasalah</p>
                    <h2 class="card-value">{{ summary.bermasalahPct }}%</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { landSummaryData } from '@/mock-data/dashboardMock'

const summary = ref(landSummaryData)

const formatNumber = (num: number) => {
    return num.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}
</script>

<style scoped>
.land-summary-section {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 2px solid #e5e7eb;
}

.section-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f3f4f6;
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

.summary-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.875rem;
}

.summary-card {
    background: white;
    border-radius: 8px;
    padding: 1rem 1.25rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
    min-height: 85px;
}

.summary-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: #d1d5db;
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
}

.card-title {
    font-size: 0.8125rem;
    font-weight: 500;
    color: #6b7280;
    margin: 0;
    line-height: 1.4;
}

.card-value {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0.125rem 0;
    color: #111827;
    line-height: 1.2;
}

.card-subtitle {
    font-size: 0.75rem;
    color: #9ca3af;
    margin: 0;
    line-height: 1.4;
}

@media (max-width: 768px) {
    .summary-grid {
        grid-template-columns: repeat(1, 1fr);
    }

    .summary-card {
        padding: 1rem 1.25rem;
        min-height: 90px;
    }

    .card-value {
        font-size: 1.75rem;
    }
}
</style>
