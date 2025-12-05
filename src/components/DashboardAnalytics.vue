<template>
  <div class="dashboard-analytics">
    <!-- Stats Cards -->
    <div class="row mb-4" v-if="showStats">
      <div
        v-for="stat in stats"
        :key="stat.id"
        :class="stat.colClass || 'col-lg-3 col-6'"
      >
        <div class="small-box" :class="stat.bgClass || 'bg-info'">
          <div class="inner">
            <h3>
              {{ stat.value }}
              <sup v-if="stat.unit" style="font-size: 20px">{{ stat.unit }}</sup>
            </h3>
            <p>{{ stat.label }}</p>
          </div>
          <div class="icon">
            <i :class="stat.icon || 'bi bi-bar-chart'"></i>
          </div>
          <a v-if="stat.link" :href="stat.link" class="small-box-footer">
            More info <i class="bi bi-arrow-right-circle"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="row mb-4" v-if="showCharts">
      <div :class="chartColClass">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ chartTitle }}</h5>
          </div>
          <div class="card-body">
            <div class="chart-placeholder" :style="{ height: chartHeight }">
              <div class="text-center d-flex align-items-center justify-content-center h-100">
                <div>
                  <i class="bi bi-graph-up" style="font-size: 3rem; color: #6c757d;"></i>
                  <p class="mt-2 text-muted">Chart Placeholder</p>
                  <small class="text-muted">Integrate with Chart.js, ECharts, or other library</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Chart if needed -->
      <div v-if="showSecondChart" :class="secondChartColClass">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ secondChartTitle }}</h5>
          </div>
          <div class="card-body">
            <div class="chart-placeholder" :style="{ height: chartHeight }">
              <div class="text-center d-flex align-items-center justify-content-center h-100">
                <div>
                  <i class="bi bi-pie-chart" style="font-size: 3rem; color: #6c757d;"></i>
                  <p class="mt-2 text-muted">Chart Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Bars -->
    <div class="row mb-4" v-if="showProgress && progressData.length > 0">
      <div :class="progressColClass">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ progressTitle }}</h5>
          </div>
          <div class="card-body">
            <div
              v-for="item in progressData"
              :key="item.id"
              class="mb-3"
            >
              <div class="d-flex justify-content-between mb-1">
                <label>{{ item.label }}</label>
                <strong>{{ item.value }}{{ item.unit || '%' }}</strong>
              </div>
              <div class="progress">
                <div
                  class="progress-bar"
                  :class="item.barClass || 'bg-primary'"
                  :style="{ width: item.percentage + '%' }"
                >
                  {{ item.percentage }}%
                </div>
              </div>
              <small v-if="item.description" class="text-muted">{{ item.description }}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Stats -->
      <div v-if="showSummary" :class="summaryColClass">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ summaryTitle }}</h5>
          </div>
          <div class="card-body">
            <div
              v-for="item in summaryData"
              :key="item.id"
              class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom"
            >
              <div>
                <i :class="item.icon" class="me-2"></i>
                <span>{{ item.label }}</span>
              </div>
              <strong :class="item.valueClass">{{ item.value }}</strong>
            </div>
            <button
              v-if="summaryAction"
              class="btn btn-primary btn-sm w-100 mt-2"
              @click="$emit('summaryAction')"
            >
              <i :class="summaryActionIcon || 'bi bi-file-earmark-pdf'"></i>
              {{ summaryActionLabel || 'Export Report' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity / Timeline -->
    <div class="row" v-if="showTimeline && timelineData.length > 0">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ timelineTitle }}</h5>
          </div>
          <div class="card-body">
            <div class="timeline">
              <div
                v-for="item in timelineData"
                :key="item.id"
                class="timeline-item"
              >
                <span class="time">
                  <i class="bi bi-clock"></i> {{ item.date }}
                </span>
                <h3 class="timeline-header">
                  <span v-if="item.badge" class="badge" :class="item.badgeClass">
                    {{ item.badge }}
                  </span>
                  {{ item.title }}
                </h3>
                <div class="timeline-body">
                  {{ item.description }}
                </div>
                <div v-if="item.user" class="timeline-footer">
                  <small class="text-muted">{{ item.user }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StatItem {
  id: string | number
  value: string | number
  label: string
  unit?: string
  icon?: string
  bgClass?: string
  colClass?: string
  link?: string
}

interface ProgressItem {
  id: string | number
  label: string
  value: string | number
  unit?: string
  percentage: number
  barClass?: string
  description?: string
}

interface SummaryItem {
  id: string | number
  label: string
  value: string | number
  icon?: string
  valueClass?: string
}

interface TimelineItem {
  id: string | number
  date: string
  title: string
  description: string
  badge?: string
  badgeClass?: string
  user?: string
}

interface Props {
  // Stats
  showStats?: boolean
  stats?: StatItem[]
  
  // Charts
  showCharts?: boolean
  chartTitle?: string
  chartHeight?: string
  chartColClass?: string
  showSecondChart?: boolean
  secondChartTitle?: string
  secondChartColClass?: string
  
  // Progress
  showProgress?: boolean
  progressTitle?: string
  progressData?: ProgressItem[]
  progressColClass?: string
  
  // Summary
  showSummary?: boolean
  summaryTitle?: string
  summaryData?: SummaryItem[]
  summaryColClass?: string
  summaryAction?: boolean
  summaryActionLabel?: string
  summaryActionIcon?: string
  
  // Timeline
  showTimeline?: boolean
  timelineTitle?: string
  timelineData?: TimelineItem[]
}

withDefaults(defineProps<Props>(), {
  showStats: true,
  stats: () => [],
  
  showCharts: false,
  chartTitle: 'Analytics Chart',
  chartHeight: '300px',
  chartColClass: 'col-md-8',
  showSecondChart: false,
  secondChartTitle: 'Distribution',
  secondChartColClass: 'col-md-4',
  
  showProgress: false,
  progressTitle: 'Progress Overview',
  progressData: () => [],
  progressColClass: 'col-md-8',
  
  showSummary: false,
  summaryTitle: 'Summary',
  summaryData: () => [],
  summaryColClass: 'col-md-4',
  summaryAction: false,
  
  showTimeline: false,
  timelineTitle: 'Recent Activity',
  timelineData: () => []
})

defineEmits<{
  summaryAction: []
}>()
</script>

<style scoped>
.chart-placeholder {
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
}

.timeline {
  position: relative;
  padding-left: 20px;
}

.timeline-item {
  border-left: 3px solid #007bff;
  padding-left: 20px;
  padding-bottom: 30px;
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #007bff;
  border: 2px solid #fff;
}

.timeline-item .time {
  color: #999;
  font-size: 0.9em;
  display: block;
  margin-bottom: 5px;
}

.timeline-header {
  font-size: 1.1em;
  margin: 10px 0;
  font-weight: 600;
}

.timeline-body {
  color: #666;
  margin-bottom: 8px;
}

.timeline-footer {
  margin-top: 8px;
}
</style>
