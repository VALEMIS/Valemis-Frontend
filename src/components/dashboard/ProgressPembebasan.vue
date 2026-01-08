<template>
    <div class="progress-pembebasan-section">
        <!-- Section Header -->
        <div class="section-header">
            <div class="header-text">
                <h4 class="section-title">Progress Pembebasan Lahan</h4>
                <p class="section-subtitle">Visualisasi sengketa dan progress per tahap</p>
            </div>
        </div>

        <!-- Charts Container -->
        <div class="charts-container">
            <!-- Sengketa Lahan - Pie Chart -->
            <div class="chart-card">
                <h5 class="chart-title">Status Klaim Sengketa</h5>
                <div class="chart-wrapper pie-chart-wrapper">
                    <canvas id="dispute-status-chart"></canvas>
                </div>
            </div>

            <!-- Progress per Project - Bar Chart -->
            <div class="chart-card">
                <h5 class="chart-title">Progress per Tahap</h5>
                <div class="chart-wrapper bar-chart-wrapper">
                    <canvas id="project-progress-chart"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useChartJS } from '@/composables/useChartJS'
import { disputeData, projectProgressData } from '@/mock-data/dashboardMock'

// Initialize charts
const { initChart: initPieChart } = useChartJS('dispute-status-chart')
const { initChart: initBarChart } = useChartJS('project-progress-chart')

onMounted(() => {
    // Pie Chart - Dispute Status
    const pieChartData = {
        labels: ['Baru', 'Proses', 'Mediasi', 'Selesai'],
        datasets: [{
            data: [
                disputeData.statusKlaim.baru,
                disputeData.statusKlaim.proses,
                disputeData.statusKlaim.mediasi,
                disputeData.statusKlaim.selesai
            ],
            backgroundColor: [
                '#ef4444',
                '#f59e0b',
                '#eab308',
                '#22c55e'
            ],
            borderWidth: 0,
            hoverOffset: 10
        }]
    }

    const pieChartConfig = {
        type: 'pie' as const,
        data: pieChartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom' as const,
                    labels: {
                        padding: 15,
                        font: {
                            size: 12,
                            weight: 500
                        },
                        color: '#6b7280',
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    padding: 12,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    titleColor: '#fff',
                    bodyColor: '#e5e7eb',
                    cornerRadius: 8,
                    callbacks: {
                        label(context: any) {
                            if (context.raw === 1) {
                                return `Tahap: ${context.dataset.label}`
                            }
                            return ''
                        },
                    },
                },
                datalabels: {
                    color: '#ffffff',
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    formatter: (value: number, context: any) => {
                        const label = context.chart.data.labels[context.dataIndex]
                        return `${value} ${label}`
                    },
                    anchor: 'center',
                    align: 'center'
                }
            },
        }
    }


    initPieChart(pieChartConfig as any)

    // Bar Chart - Project Progress per Stage
    const stages = [
        'Identifikasi',
        'Negosiasi',
        'Sepakat',
        'Bayar',
        'Sertifikasi',
    ]

    const stageColors = [
        '#9ca3af',
        '#facc15',
        '#3b82f6',
        '#8b5cf6',
        '#22c55e',
    ]

    // contoh projectProgressData
    // stages = 1 artinya sudah dilewati / aktif
    const barChartData = {
        labels: projectProgressData.map(p => p.projectName),
        datasets: stages.map((stage, stageIndex) => ({
            label: stage,
            data: projectProgressData.map(project => {
                const stageValues = [
                    project.stages.identifikasi,
                    project.stages.negosiasi,
                    project.stages.sepakat,
                    project.stages.bayar,
                    project.stages.sertifikasi,
                ]

                // progress logic (0 / 1)
                return stageValues[stageIndex]
            }),
            backgroundColor: stageColors[stageIndex],
            borderRadius: 6,
            barThickness: 25,
        })),
    }


    const barChartConfig = {
        type: 'bar' as const,
        data: barChartData,
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom' as const,
                    labels: {
                        padding: 15,
                        font: {
                            size: 12,
                            weight: 500
                        },
                        color: '#6b7280',
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    padding: 12,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    titleColor: '#fff',
                    bodyColor: '#e5e7eb',
                    cornerRadius: 8,
                    callbacks: {
                        label: function (context: any) {
                            return `${context.dataset.label}: ${context.parsed.x} bidang`
                        },
                        footer: function (tooltipItems: any[]) {
                            const stages = projectProgressData.find(p => p.projectName === tooltipItems[0].label)?.stages
                            if (!stages) return


                            const total = stages.identifikasi + stages.negosiasi + stages.sepakat + stages.bayar + stages.sertifikasi
                            return `Total: ${total} bidang`
                        }

                    }
                },
                datalabels: {
                    color: '#ffffff',
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    anchor: 'center',
                    align: 'center'
                }
            },
            responsive: true,
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: true,
                    grid: {
                        color: '#f3f4f6',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 12,
                            weight: 500
                        }
                    }
                },
                x: {
                    stacked: true,
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 12,
                            weight: 500
                        }
                    }
                }
            }
        }
    }

    initBarChart(barChartConfig as any)
})
</script>

<style scoped>
.progress-pembebasan-section {
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

.charts-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.chart-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
}

.chart-title {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 1rem 0;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #f3f4f6;
}

.chart-wrapper {
    position: relative;
}

.pie-chart-wrapper {
    height: 280px;
}

.bar-chart-wrapper {
    height: 300px;
}

@media (max-width: 768px) {
    .pie-chart-wrapper {
        height: 240px;
    }

    .bar-chart-wrapper {
        height: 220px;
    }
}
</style>
