export type OperationalHealth =
  | "healthy"
  | "degraded"
  | "critical"
  | "unknown"

export type OperationalEventKind =
  | "lease"
  | "payment"
  | "lock"
  | "device"
  | "security"
  | "system"

export type OperationalSeverity =
  | "info"
  | "success"
  | "warning"
  | "danger"

export interface DashboardSummary {
  properties: number
  activeLeases: number
  paymentsToday: number
  locksOnline: number
  locksTotal: number
  securityAlerts: number
  healthyServices: number
  totalServices: number
}

export interface DashboardHealth {
  overall: OperationalHealth
  api: OperationalHealth
  database: OperationalHealth
  messaging: OperationalHealth
  devices: OperationalHealth
}

export interface OperationalEvent {
  id: string
  kind: OperationalEventKind
  severity: OperationalSeverity
  title: string
  description: string
  occurredAt: string
  reference?: string
}

export interface DashboardSnapshot {
  summary: DashboardSummary
  health: DashboardHealth
  recentEvents: OperationalEvent[]
}
