export interface DashboardMetric {
  key: string
  label: string
  value: string
  delta?: string
  direction?: "up" | "down" | "flat"
  tone?: "blue" | "green" | "amber" | "red" | "purple"
}
