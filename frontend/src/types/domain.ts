export type LeaseStatus =
  | "active"
  | "grace_period"
  | "locked"

export type LockState =
  | "active"
  | "locked"
  | "frozen"

export type DeviceStatus =
  | "connected"
  | "disconnected"
  | "unknown"

export interface DashboardMetric {
  label: string
  value: string
  description?: string
}
