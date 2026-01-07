/**
 * Dashboard Type Definitions
 * Contains all interfaces for the monitoring dashboard
 */

// ============================================================
// ZONE 1: Executive KPI Types
// ============================================================

export interface KPICard {
  id: string
  title: string
  subtitle?: string
  value: number | string
  unit?: string
  icon: string
  iconColor: string
  trend?: {
    value: number
    isPositive: boolean
  }
  progress?: number
  targetRoute?: string
  badge?: {
    label: string
    severity: 'success' | 'info' | 'warning' | 'danger'
  }
}

export interface ExecutiveKPIData {
  acquisition: {
    totalParcels: number
    lahanBebasPct: number
    dalamProses: number
    sengketa: number
  }
  financial: {
    totalBiaya: number
    rataBiayaPerM2: number
  }
  compliance: {
    complianceRate: number
    permitsExpiring: number
  }
  litigation: {
    activeCases: number
    highPriorityCases: number
  }
}

// ============================================================
// ZONE 2: Critical Alerts Types
// ============================================================

export type AlertSeverity = 'critical' | 'warning' | 'info' | 'monitoring'
export type AlertModule = 'acquisition' | 'compliance' | 'litigation' | 'inventory' | 'stakeholder' | 'asset'

export interface Alert {
  id: number
  severity: AlertSeverity
  module: AlertModule
  title: string
  message: string
  count?: number
  actionLabel?: string
  actionRoute?: string
  timestamp: Date
  dismissible?: boolean
  project_id?: number | null
  project_name?: string
}

export interface AlertCategory {
  severity: AlertSeverity
  title: string
  icon: string
  alerts: Alert[]
}

export interface CriticalAlertsData {
  categories: AlertCategory[]
}

// ============================================================
// ZONE 3: Unified Land Map Types
// ============================================================

export type MapLayerType =
  | 'acquisitionStatus'
  | 'landStatus'
  | 'compliance'
  | 'litigation'
  | 'project'
  | 'desa'

export interface MapLayer {
  id: MapLayerType
  label: string
  enabled: boolean
  color: string
  data: any[] // GeoJSON or polygon data
}

export interface MapFilter {
  desa: string[]
  project: string[]
  status: string[]
}

export interface MapLegend {
  label: string
  color: string
  count: number
}

export interface MapData {
  layers: MapLayer[]
  filters: MapFilter
  legends: MapLegend[]
}

// ============================================================
// ZONE 4: Monitoring Charts Types
// ============================================================

export type ChartTab = 'acquisition' | 'distribution' | 'compliance' | 'stakeholder'
export type TimeRange = '1M' | '3M' | '6M' | '1Y' | 'ALL'

export interface ChartFilter {
  desa: string[]
  project: string[]
  dateRange: {
    start: Date
    end: Date
  } | null
  timeRange: TimeRange
}

export interface ChartDataset {
  label?: string
  data: number[] | { x: number; y: number }[]
  backgroundColor?: string | string[]
  borderColor?: string | string[]
  borderWidth?: number
  fill?: boolean
  borderDash?: number[]
  pointBackgroundColor?: string | string[]
  pointRadius?: number
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'scatter'
  data: {
    labels: string[]
    datasets: ChartDataset[]
  }
  options?: any
}

export interface MonitoringChartsData {
  filters: ChartFilter
  charts: {
    acquisition: {
      progressTimeline: ChartConfig
      costByDesa: ChartConfig
      cumulativeLand: ChartConfig
    }
    distribution: {
      statusDistribution: ChartConfig
      certificateTypes: ChartConfig
      landCategories: ChartConfig
    }
    compliance: {
      permitsExpiring: ChartConfig
      caseResolution: ChartConfig
      litigationTrend: ChartConfig
    }
    stakeholder: {
      influenceMatrix: ChartConfig
      typeDistribution: ChartConfig
      sentimentTrend: ChartConfig
    }
  }
}

// ============================================================
// Global Dashboard Types
// ============================================================

export interface DashboardFilters {
  desa: string[]
  project: string[]
  dateRange: {
    start: Date
    end: Date
  } | null
}

export interface DashboardData {
  kpis: ExecutiveKPIData
  alerts: CriticalAlertsData
  map: MapData
  charts: MonitoringChartsData
}

// ============================================================
// Component Props Types
// ============================================================

export interface KPICardProps {
  kpi: KPICard
}

export interface AlertItemProps {
  alert: Alert
  onDismiss?: (id: number) => void
}

export interface MapLayerControlProps {
  layers: MapLayer[]
  filters: MapFilter
  onLayerToggle: (layerId: MapLayerType) => void
  onFilterChange: (filter: MapFilter) => void
}

export interface MonitoringChartsProps {
  filters: ChartFilter
  onFilterChange: (filters: ChartFilter) => void
}
