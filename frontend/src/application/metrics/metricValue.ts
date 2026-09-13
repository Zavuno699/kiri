export interface MetricValue {
  value: number
  label: string
  unit?: string
  status?: "normal" | "warning" | "critical"
}
