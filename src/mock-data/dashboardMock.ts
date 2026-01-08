/**
 * Dashboard Mock Data
 * Comprehensive mock data for dashboard with 3 zones:
 * - Zona 1: Ringkasan Lahan (Land Summary)
 * - Zona 2: Urgent Alerts (3 categories: Legal/Compliance, Operational, Social)
 * - Zona 3: Progress Pembebasan Lahan (Dispute data + Project progress stages)
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
// ZONA 1: Ringkasan Lahan (Land Summary)
// ============================================================

export interface LandSummary {
  totalBidangLahan: number
  totalLuasHa: number
  sudahBebasPct: number
  dalamProsesPct: number
  bermasalahPct: number
}

export const landSummaryData: LandSummary = {
  totalBidangLahan: 245,
  totalLuasHa: 1850.5,
  sudahBebasPct: 73.5,
  dalamProsesPct: 21.2,
  bermasalahPct: 5.3
}

// ============================================================
// ZONA 2: Urgent Alerts (3 Categories)
// ============================================================

export interface UrgentAlert {
  id: number
  category: 'legal' | 'operational' | 'social'
  title: string
  description: string
  count?: number
  severity: 'critical' | 'warning' | 'info'
  actionRoute?: string
  timestamp: Date
}

export const urgentAlertsData: UrgentAlert[] = [
  // Legal / Compliance
  {
    id: 1,
    category: 'legal',
    title: 'Izin lahan akan expired 30 hari',
    description: '5 izin lahan akan berakhir dalam 30 hari ke depan',
    count: 5,
    severity: 'critical',
    actionRoute: '/land-compliance',
    timestamp: new Date('2026-01-08')
  },
  {
    id: 2,
    category: 'legal',
    title: 'Izin lahan akan expired 60 hari',
    description: '8 izin lahan akan berakhir dalam 60 hari ke depan',
    count: 8,
    severity: 'warning',
    actionRoute: '/land-compliance',
    timestamp: new Date('2026-01-08')
  },
  {
    id: 3,
    category: 'legal',
    title: 'Lahan belum compliant tapi sudah mau dipake',
    description: '3 lahan belum memenuhi compliance namun project date sudah dekat',
    count: 3,
    severity: 'critical',
    actionRoute: '/land-compliance',
    timestamp: new Date('2026-01-08')
  },
  {
    id: 4,
    category: 'legal',
    title: 'Overlap dengan kawasan hutan/sempadan',
    description: '2 bidang lahan terdeteksi overlap dengan kawasan hutan atau sempadan',
    count: 2,
    severity: 'warning',
    actionRoute: '/land-compliance',
    timestamp: new Date('2026-01-08')
  },

  // Operasional
  {
    id: 5,
    category: 'operational',
    title: 'Blok krusial belum bebas',
    description: '4 blok krusial (1 AOI atau persil) belum bebas dan project date mendekat',
    count: 4,
    severity: 'critical',
    actionRoute: '/project/8/land-acquisition',
    timestamp: new Date('2026-01-08')
  },

  // Sosial
  {
    id: 6,
    category: 'social',
    title: 'Stakeholder kontra aktif',
    description: '6 stakeholder dengan sikap kontra aktif terdeteksi',
    count: 6,
    severity: 'warning',
    actionRoute: '/stakeholder-management',
    timestamp: new Date('2026-01-08')
  },
  {
    id: 7,
    category: 'social',
    title: 'Konflik muncul di lokasi yang sama berulang',
    description: '2 lokasi mengalami konflik berulang dalam 3 bulan terakhir',
    count: 2,
    severity: 'critical',
    actionRoute: '/stakeholder-management',
    timestamp: new Date('2026-01-08')
  }
]

// ============================================================
// ZONA 3: Progress Pembebasan Lahan
// ============================================================

// Sengketa Lahan Data
export interface DisputeData {
  jumlahKlaimAktif: number
  statusKlaim: {
    baru: number
    proses: number
    mediasi: number
    selesai: number
  }
  klaimDiAreaOperasional: number
}

export const disputeData: DisputeData = {
  jumlahKlaimAktif: 14,
  statusKlaim: {
    baru: 3,
    proses: 6,
    mediasi: 3,
    selesai: 2
  },
  klaimDiAreaOperasional: 5
}

// Progress per Project Data
export interface ProjectProgress {
  projectName: string
  stages: {
    identifikasi: number
    negosiasi: number
    sepakat: number
    bayar: number
    sertifikasi: number
  }
  totalBidang: number
}

export const projectProgressData: ProjectProgress[] = [
  {
    projectName: 'Project MBB1',
    stages: {
      identifikasi: 45,
      negosiasi: 38,
      sepakat: 25,
      bayar: 18,
      sertifikasi: 12
    },
    totalBidang: 138
  },
  {
    projectName: 'Project Alpha',
    stages: {
      identifikasi: 32,
      negosiasi: 28,
      sepakat: 20,
      bayar: 15,
      sertifikasi: 10
    },
    totalBidang: 105
  }
]

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
    targetRoute: '/project/8/land-acquisition'
  },
  {
    id: 'lahan-bebas',
    title: '% Lahan Bebas',
    value: 78,
    unit: '%',
    icon: 'bi bi-check-circle',
    iconColor: '#22c55e',
    progress: 78,
    targetRoute: '/project/8/land-acquisition'
  },
  {
    id: 'dalam-proses',
    title: 'Parcel Dalam Proses',
    value: 52,
    icon: 'bi bi-clock-history',
    iconColor: '#eab308',
    targetRoute: '/project/8/land-acquisition'
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
    targetRoute: '/project/8/land-acquisition'
  },
  {
    id: 'biaya-m2',
    title: 'Rata-rata Biaya/m²',
    value: 250000,
    unit: 'IDR/m²',
    icon: 'bi bi-calculator',
    iconColor: '#6b7280',
    targetRoute: '/project/8/land-acquisition'
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
        title: 'Izin Telah Kadaluarsa',
        message: '3 izin telah kadaluarsa dan memerlukan perpanjangan segera',
        count: 3,
        actionLabel: 'Lihat Izin',
        actionRoute: '/land-compliance',
        timestamp: new Date('2026-01-01'),
        dismissible: false,
        project_id: null // General module, no project needed
      },
      {
        id: 2,
        severity: 'critical',
        module: 'acquisition',
        title: 'Negosiasi Terlambat - Project MBB1',
        message: '5 bidang terhenti dalam negosiasi lebih dari 90 hari di Project MBB1',
        count: 5,
        actionLabel: 'Lihat Bidang',
        actionRoute: '/project/8/land-acquisition',
        timestamp: new Date('2026-01-01'),
        dismissible: false,
        project_id: 8,
        project_name: 'Project MBB1'
      },
      {
        id: 3,
        severity: 'critical',
        module: 'litigation',
        title: 'Litigasi Prioritas Tinggi',
        message: '2 kasus penting memerlukan perhatian eksekutif',
        count: 2,
        actionLabel: 'Lihat Kasus',
        actionRoute: '/land-litigasi',
        timestamp: new Date('2026-01-01'),
        dismissible: false,
        project_id: null // General module
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
        title: 'Izin Segera Berakhir',
        message: '5 izin akan berakhir dalam 30 hari ke depan',
        count: 5,
        actionLabel: 'Lihat Izin',
        actionRoute: '/land-compliance',
        timestamp: new Date('2026-01-01'),
        dismissible: true,
        project_id: null
      },
      {
        id: 5,
        severity: 'warning',
        module: 'inventory',
        title: 'Sertifikat Segera Berakhir - Project MBB1',
        message: '4 sertifikat tanah akan berakhir dalam 6 bulan di Project MBB1',
        count: 4,
        actionLabel: 'Lihat Lahan',
        actionRoute: '/project/8/land-inventory',
        timestamp: new Date('2026-01-01'),
        dismissible: true,
        project_id: 8,
        project_name: 'Project MBB1'
      },
      {
        id: 6,
        severity: 'warning',
        module: 'acquisition',
        title: 'Negosiasi Terhenti - Project MBB1',
        message: '7 bidang dalam negosiasi lebih dari 60 hari di Project MBB1',
        count: 7,
        actionLabel: 'Lihat Bidang',
        actionRoute: '/project/8/land-acquisition',
        timestamp: new Date('2026-01-01'),
        dismissible: true,
        project_id: 8,
        project_name: 'Project MBB1'
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
        title: 'Penilaian Belum Lengkap - Project MBB1',
        message: '12 bidang memerlukan penilaian sebelum negosiasi di Project MBB1',
        count: 12,
        actionLabel: 'Lihat Bidang',
        actionRoute: '/project/9/land-acquisition',
        timestamp: new Date('2026-01-01'),
        dismissible: true,
        project_id: 9,
        project_name: 'Project MBB1'
      },
      {
        id: 8,
        severity: 'info',
        module: 'compliance',
        title: 'Bidang Tidak Sesuai Aturan',
        message: '8 bidang tidak memiliki dokumen yang diperlukan',
        count: 8,
        actionLabel: 'Lihat Bidang',
        actionRoute: '/land-compliance',
        timestamp: new Date('2026-01-01'),
        dismissible: true,
        project_id: null
      },
      {
        id: 9,
        severity: 'info',
        module: 'litigation',
        title: 'Kasus Litigasi Baru',
        message: '2 kasus baru diajukan minggu ini',
        count: 2,
        actionLabel: 'Lihat Kasus',
        actionRoute: '/land-litigasi',
        timestamp: new Date('2026-01-01'),
        dismissible: true,
        project_id: null
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
        title: 'Lahan Baru Diperoleh - Project MBB1',
        message: '6 bidang baru diperoleh bulan ini di Project MBB1',
        count: 6,
        actionLabel: 'Lihat Lahan',
        actionRoute: '/project/8/land-inventory',
        timestamp: new Date('2026-01-01'),
        dismissible: true,
        project_id: 8,
        project_name: 'Project MBB1'
      },
      {
        id: 11,
        severity: 'monitoring',
        module: 'asset',
        title: 'Aset Rumah Tangga Besar - Project MBB1',
        message: '3 rumah tangga dengan >10 anggota keluarga terdeteksi di Project MBB1',
        count: 3,
        actionLabel: 'Lihat Aset',
        actionRoute: '/project/8/asset-inventory',
        timestamp: new Date('2026-01-01'),
        dismissible: true,
        project_id: 8,
        project_name: 'Project MBB1'
      },
      {
        id: 12,
        severity: 'monitoring',
        module: 'stakeholder',
        title: 'Perubahan Pemangku Kepentingan Utama',
        message: '2 pemangku kepentingan berpengaruh tinggi memperbarui info kontak',
        count: 2,
        actionLabel: 'Lihat Pemangku Kepentingan',
        actionRoute: '/stakeholder-management',
        timestamp: new Date('2026-01-01'),
        dismissible: true,
        project_id: null
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
    labels: [],
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
