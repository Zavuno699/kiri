export interface DeviceStatusSummary {
  status: "healthy" | "degraded" | "failed"
  reason?: string
}
