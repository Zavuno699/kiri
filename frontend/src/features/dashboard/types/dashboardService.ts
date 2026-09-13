export interface DashboardServiceStatus {
  name: string
  status: "healthy" | "degraded" | "offline" | "unknown"
  latencyMs?: number
  lastCheckedAt?: string
  detail?: string
}
