/**
 * Dashboard Mock Data
 * Comprehensive mock data for all 4 zones of the monitoring dashboard
 */

import type {
  DashboardData,
  KPICard,
  AlertCategory,
  MapLayer,
  MapLegend,
  ChartConfig
} from '@/types/dashboard'

// ============================================================
// ZONE 1: Executive KPI Mock Data
// ============================================================

export const kpiCardsData: KPICard[] = [
  // Acquisition KPIs
  {
    id: 'total-parcels',
    title: 'Total Parcels',
    value: 245,
    icon: 'bi bi-map',
    iconColor: '#3b82f6',
    trend: { value: 12, isPositive: true },
    targetRoute: '/project/7/land-acquisition'
  },
  {
    id: 'lahan-bebas',
    title: '% Lahan Bebas',
    value: 78,
    unit: '%',
    icon: 'bi bi-check-circle',
    iconColor: '#22c55e',
    progress: 78,
    targetRoute: '/project/7/land-acquisition'
  },
  {
    id: 'dalam-proses',
    title: 'Parcel Dalam Proses',
    value: 52,
    icon: 'bi bi-clock-history',
    iconColor: '#eab308',
    targetRoute: '/project/7/land-acquisition'
  },
  {
    id: 'sengketa',
    title: 'Parcel Sengketa',
    value: 8,
    icon: 'bi bi-exclamation-triangle',
    iconColor: '#ef4444',
    badge: { label: 'High Priority', severity: 'danger' },
    targetRoute: '/land-litigasi'
  },

  // Financial KPIs
  {
    id: 'total-biaya',
    title: 'Total Biaya Pembebasan',
    value: 45200000000,
    unit: 'IDR',
    icon: 'bi bi-cash-stack',
    iconColor: '#06b6d4',
    trend: { value: 8, isPositive: false },
    targetRoute: '/project/7/land-acquisition'
  },
  {
    id: 'biaya-m2',
    title: 'Rata-rata Biaya/m²',
    value: 250000,
    unit: 'IDR/m²',
    icon: 'bi bi-calculator',
    iconColor: '#6b7280',
    targetRoute: '/project/7/land-acquisition'
  },

  // Compliance KPIs
  {
    id: 'compliance-rate',
    title: 'Compliance Rate',
    value: 92,
    unit: '%',
    icon: 'bi bi-shield-check',
    iconColor: '#22c55e',
    progress: 92,
    badge: { label: 'Excellent', severity: 'success' },
    targetRoute: '/land-compliance'
  },
  {
    id: 'permits-expiring',
    title: 'Permits Expiring Soon',
    value: 5,
    icon: 'bi bi-calendar-x',
    iconColor: '#f97316',
    badge: { label: '< 30 Days', severity: 'warning' },
    targetRoute: '/land-compliance'
  },

  // Litigation KPIs
  {
    id: 'active-cases',
    title: 'Active Cases',
    value: 14,
    icon: 'bi bi-gavel',
    iconColor: '#8b5cf6',
    targetRoute: '/land-litigasi'
  },
  {
    id: 'high-priority-cases',
    title: 'High Priority Cases',
    value: 3,
    icon: 'bi bi-fire',
    iconColor: '#ef4444',
    badge: { label: 'Critical', severity: 'danger' },
    targetRoute: '/land-litigasi'
  }
]

// ============================================================
// ZONE 2: Critical Alerts Mock Data
// ============================================================

export const alertsCategoriesData: AlertCategory[] = [
  {
    severity: 'critical',
    title: 'Critical Alerts',
    icon: 'bi bi-exclamation-octagon',
    alerts: [
      {
        id: 1,
        severity: 'critical',
        module: 'compliance',
        title: 'Permits Expired',
        message: '3 permits have expired and require immediate renewal',
        count: 3,
        actionLabel: 'View Permits',
        actionRoute: '/land-compliance',
        timestamp: new Date('2026-01-01'),
        dismissible: false
      },
      {
        id: 2,
        severity: 'critical',
        module: 'acquisition',
        title: 'Overdue Negotiations',
        message: '5 parcels stuck in negotiation for over 90 days',
        count: 5,
        actionLabel: 'View Parcels',
        actionRoute: '/project/7/land-acquisition',
        timestamp: new Date('2026-01-01'),
        dismissible: false
      },
      {
        id: 3,
        severity: 'critical',
        module: 'litigation',
        title: 'High Priority Litigation',
        message: '2 high-stakes cases require executive attention',
        count: 2,
        actionLabel: 'View Cases',
        actionRoute: '/land-litigasi',
        timestamp: new Date('2026-01-01'),
        dismissible: false
      }
    ]
  },
  {
    severity: 'warning',
    title: 'Warning Alerts',
    icon: 'bi bi-exclamation-triangle',
    alerts: [
      {
        id: 4,
        severity: 'warning',
        module: 'compliance',
        title: 'Permits Expiring Soon',
        message: '5 permits will expire in the next 30 days',
        count: 5,
        actionLabel: 'View Permits',
        actionRoute: '/land-compliance',
        timestamp: new Date('2026-01-01'),
        dismissible: true
      },
      {
        id: 5,
        severity: 'warning',
        module: 'inventory',
        title: 'Certificates Expiring',
        message: '4 land certificates expiring within 6 months',
        count: 4,
        actionLabel: 'View Land',
        actionRoute: '/project/7/land-inventory',
        timestamp: new Date('2026-01-01'),
        dismissible: true
      },
      {
        id: 6,
        severity: 'warning',
        module: 'acquisition',
        title: 'Stalled Negotiations',
        message: '7 parcels in negotiation for over 60 days',
        count: 7,
        actionLabel: 'View Parcels',
        actionRoute: '/project/7/land-acquisition',
        timestamp: new Date('2026-01-01'),
        dismissible: true
      }
    ]
  },
  {
    severity: 'info',
    title: 'Information Alerts',
    icon: 'bi bi-info-circle',
    alerts: [
      {
        id: 7,
        severity: 'info',
        module: 'acquisition',
        title: 'Missing Appraisals',
        message: '12 parcels require appraisal before negotiation',
        count: 12,
        actionLabel: 'View Parcels',
        actionRoute: '/project/7/land-acquisition',
        timestamp: new Date('2026-01-01'),
        dismissible: true
      },
      {
        id: 8,
        severity: 'info',
        module: 'compliance',
        title: 'Non-Compliant Parcels',
        message: '8 parcels missing required documentation',
        count: 8,
        actionLabel: 'View Parcels',
        actionRoute: '/land-compliance',
        timestamp: new Date('2026-01-01'),
        dismissible: true
      },
      {
        id: 9,
        severity: 'info',
        module: 'litigation',
        title: 'New Litigation Cases',
        message: '2 new cases filed this week',
        count: 2,
        actionLabel: 'View Cases',
        actionRoute: '/land-litigasi',
        timestamp: new Date('2026-01-01'),
        dismissible: true
      }
    ]
  },
  {
    severity: 'monitoring',
    title: 'Monitoring Alerts',
    icon: 'bi bi-eye',
    alerts: [
      {
        id: 10,
        severity: 'monitoring',
        module: 'inventory',
        title: 'Newly Acquired Land',
        message: '6 newly acquired parcels this month',
        count: 6,
        actionLabel: 'View Land',
        actionRoute: '/project/7/land-inventory',
        timestamp: new Date('2026-01-01'),
        dismissible: true
      },
      {
        id: 11,
        severity: 'monitoring',
        module: 'asset',
        title: 'Large Household Assets',
        message: '3 households with >10 family members detected',
        count: 3,
        actionLabel: 'View Assets',
        actionRoute: '/project/7/asset-inventory',
        timestamp: new Date('2026-01-01'),
        dismissible: true
      },
      {
        id: 12,
        severity: 'monitoring',
        module: 'stakeholder',
        title: 'Key Stakeholder Changes',
        message: '2 high-influence stakeholders updated contact info',
        count: 2,
        actionLabel: 'View Stakeholders',
        actionRoute: '/stakeholder-management',
        timestamp: new Date('2026-01-01'),
        dismissible: true
      }
    ]
  }
]

// ============================================================
// ZONE 3: Unified Land Map Mock Data
// ============================================================

export const mapLayersData: MapLayer[] = [
  {
    id: 'acquisitionStatus',
    label: 'Status Akuisisi',
    enabled: true,
    color: '#22c55e',
    data: []
  },
  {
    id: 'landStatus',
    label: 'Status Lahan',
    enabled: true,
    color: '#3b82f6',
    data: []
  },
  {
    id: 'compliance',
    label: 'Compliance',
    enabled: true,
    color: '#10b981',
    data: []
  },
  {
    id: 'litigation',
    label: 'Sengketa',
    enabled: false,
    color: '#ef4444',
    data: []
  },
  {
    id: 'project',
    label: 'Project Boundaries',
    enabled: true,
    color: '#8b5cf6',
    data: []
  },
  {
    id: 'desa',
    label: 'Desa Boundaries',
    enabled: true,
    color: '#f59e0b',
    data: []
  }
]

export const mapLegendsData: MapLegend[] = [
  { label: 'Lahan Bebas', color: '#22c55e', count: 180 },
  { label: 'Dalam Proses', color: '#eab308', count: 52 },
  { label: 'Sengketa', color: '#ef4444', count: 8 },
  { label: 'Belum Diproses', color: '#6b7280', count: 5 },
  { label: 'Project Alpha', color: '#8b5cf6', count: 92 },
  { label: 'Project Beta', color: '#ec4899', count: 78 },
  { label: 'Project Gamma', color: '#06b6d4', count: 75 }
]

// ============================================================
// ZONE 4: Monitoring Charts Mock Data
// ============================================================

// Acquisition Progress Chart
export const acquisitionProgressChart: ChartConfig = {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Actual Progress',
        data: [12, 18, 25, 32, 40, 48, 55, 62, 68, 72, 75, 78],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'Target',
        data: [15, 22, 30, 38, 45, 52, 60, 68, 75, 82, 88, 95],
        borderColor: '#94a3b8',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5]
      }
    ]
  }
}

// Cost by Desa Chart
export const costByDesaChart: ChartConfig = {
  type: 'bar',
  data: {
    labels: ['Sorowako', 'Magani', 'Wewangriu', 'Nikkel', 'Tarowang', 'Timampu', 'Nuha'],
    datasets: [
      {
        label: 'Biaya Pembebasan (Miliar IDR)',
        data: [8.5, 6.2, 5.8, 7.1, 4.3, 3.9, 9.4],
        backgroundColor: [
          '#3b82f6',
          '#22c55e',
          '#eab308',
          '#ef4444',
          '#8b5cf6',
          '#ec4899',
          '#06b6d4'
        ],
        borderWidth: 0
      }
    ]
  }
}

// Status Distribution Chart
export const statusDistributionChart: ChartConfig = {
  type: 'doughnut',
  data: {
    labels: ['Lahan Bebas', 'Dalam Proses', 'Sengketa', 'Belum Diproses'],
    datasets: [
      {
        data: [180, 52, 8, 5],
        backgroundColor: ['#22c55e', '#eab308', '#ef4444', '#6b7280'],
        borderWidth: 0
      }
    ]
  }
}

// Certificate Types Chart
export const certificateTypesChart: ChartConfig = {
  type: 'pie',
  data: {
    labels: ['SHM', 'SHGB', 'HGU', 'Belum Sertifikat'],
    datasets: [
      {
        data: [120, 85, 45, 15],
        backgroundColor: ['#3b82f6', '#22c55e', '#eab308', '#6b7280'],
        borderWidth: 0
      }
    ]
  }
}

// Land Categories Chart
export const landCategoriesChart: ChartConfig = {
  type: 'bar',
  data: {
    labels: ['Vale Owned', 'Acquired', 'IUPK', 'PPKH', 'Operational'],
    datasets: [
      {
        label: 'Luas (Hektar)',
        data: [850, 620, 420, 280, 150],
        backgroundColor: ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'],
        borderWidth: 0
      }
    ]
  }
}

// Permits Expiring Chart
export const permitsExpiringChart: ChartConfig = {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Permits Expiring',
        data: [2, 4, 7, 5, 3, 1],
        backgroundColor: '#ef4444',
        borderWidth: 0
      }
    ]
  }
}

// Case Resolution Funnel
export const caseResolutionChart: ChartConfig = {
  type: 'bar',
  data: {
    labels: ['Tahap 1', 'Tahap 2', 'Tahap 3', 'Putusan Clear', 'Putusan Pengadilan'],
    datasets: [
      {
        label: 'Jumlah Kasus',
        data: [8, 6, 4, 3, 2],
        backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'],
        borderWidth: 0
      }
    ]
  }
}

// Litigation Trend
export const litigationTrendChart: ChartConfig = {
  type: 'line',
  data: {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Cases',
        data: [2, 3, 1, 4, 2, 2],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true
      }
    ]
  }
}

// Influence vs Interest Matrix
export const influenceMatrixChart: ChartConfig = {
  type: 'scatter',
  data: {
    datasets: [
      {
        label: 'Stakeholders',
        data: [
          { x: 4, y: 5 },
          { x: 2, y: 3 },
          { x: 5, y: 4 },
          { x: 3, y: 2 },
          { x: 1, y: 1 },
          { x: 4, y: 3 },
          { x: 2, y: 5 },
          { x: 3, y: 4 }
        ],
        backgroundColor: '#3b82f6',
        pointRadius: 8
      }
    ]
  }
}

// Stakeholder Type Distribution
export const stakeholderTypeChart: ChartConfig = {
  type: 'radar',
  data: {
    labels: ['Perusahaan', 'Pemerintah', 'Masyarakat', 'NGO', 'Media'],
    datasets: [
      {
        label: 'Jumlah Stakeholder',
        data: [15, 12, 28, 8, 5],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        pointBackgroundColor: '#3b82f6'
      }
    ]
  }
}

// Sentiment Trend
export const sentimentTrendChart: ChartConfig = {
  type: 'line',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Positive Sentiment',
        data: [65, 68, 72, 75],
        borderColor: '#22c55e',
        backgroundColor: 'transparent',
        borderWidth: 2
      },
      {
        label: 'Negative Sentiment',
        data: [15, 12, 10, 8],
        borderColor: '#ef4444',
        backgroundColor: 'transparent',
        borderWidth: 2
      },
      {
        label: 'Neutral Sentiment',
        data: [20, 20, 18, 17],
        borderColor: '#94a3b8',
        backgroundColor: 'transparent',
        borderWidth: 2
      }
    ]
  }
}

// ============================================================
// Complete Dashboard Data Export
// ============================================================

export const dashboardMockData: DashboardData = {
  kpis: {
    acquisition: {
      totalParcels: 245,
      lahanBebasPct: 78,
      dalamProses: 52,
      sengketa: 8
    },
    financial: {
      totalBiaya: 45200000000,
      rataBiayaPerM2: 250000
    },
    compliance: {
      complianceRate: 92,
      permitsExpiring: 5
    },
    litigation: {
      activeCases: 14,
      highPriorityCases: 3
    }
  },
  alerts: {
    categories: alertsCategoriesData
  },
  map: {
    layers: mapLayersData,
    filters: {
      desa: [],
      project: [],
      status: []
    },
    legends: mapLegendsData
  },
  charts: {
    filters: {
      desa: [],
      project: [],
      dateRange: null,
      timeRange: 'ALL'
    },
    charts: {
      acquisition: {
        progressTimeline: acquisitionProgressChart,
        costByDesa: costByDesaChart,
        cumulativeLand: acquisitionProgressChart // Reuse for now
      },
      distribution: {
        statusDistribution: statusDistributionChart,
        certificateTypes: certificateTypesChart,
        landCategories: landCategoriesChart
      },
      compliance: {
        permitsExpiring: permitsExpiringChart,
        caseResolution: caseResolutionChart,
        litigationTrend: litigationTrendChart
      },
      stakeholder: {
        influenceMatrix: influenceMatrixChart,
        typeDistribution: stakeholderTypeChart,
        sentimentTrend: sentimentTrendChart
      }
    }
  }
}

// Export individual datasets for convenience
export default dashboardMockData
