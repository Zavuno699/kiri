export interface DashboardSurfaceModel {
  title: string
  subtitle: string
  metrics: Array<{
    id: string
    label: string
    value: string | number
    state: "normal" | "warning" | "critical"
  }>
}
